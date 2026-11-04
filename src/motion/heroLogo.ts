import { GEAR_PATH, WING_RADIUS, WINGS } from '../components/buzLogoPaths';

/**
 * The hero's living logo. The pre-rendered SVG (HeroLogo.tsx) is the logo at rest; this adds:
 * - the arrival, once per session: a sweep reveals the gear as it turns into place, then the
 *   dots appear and each wing grows out of its dot;
 * - the brand gradient, slowly flowing (WebGL; without it the CSS gradient stays);
 * - echoes of the gear outline, still, which a mouse "flashlight" lights up;
 * - a heartbeat every 7 s: light glides along hidden traces under the wings into the dots,
 *   a ring spreads from each dot, and the echoes glow and swell a touch;
 * - the pieces on soft springs: wings move out of the mouse's way, dots follow a moment
 *   later, and circling the gear turns it a few degrees like a dial;
 * - a press: a click makes the logo give, glow and bounce; press and hold charges it up.
 * Nothing spins or loops in a way that pulls the eye; under reduced motion only the still
 * picture is drawn.
 */

/** The SVG's viewBox, in logo units: the icon (706 x 508) with room for the pieces to move. */
export const HERO_VIEWBOX = { x: -60, y: -50, w: 826, h: 608 };
/** Left end of each wing bar (the chamfered tip), matching WINGS. */
export const WING_LEFT = [2, 66.8, 133.2];
const OPTICAL_X = 405; // the icon's optical centre, used as the press origin
const OPTICAL_Y = 254;

const BEAT_EVERY = 7;
const RINGS = [
  { s: 1.32, a: 0.22 },
  { s: 1.7, a: 0.14 },
  { s: 2.15, a: 0.08 },
  { s: 2.65, a: 0 }, // the last two show only under the flashlight or in a heartbeat
  { s: 3.2, a: 0 },
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const outCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const outQuart = (x: number) => 1 - Math.pow(1 - x, 4);
const span = (t: number, start: number, dur: number) => clamp01((t - start) / dur);
const smooth = (a: number, b: number, x: number) => {
  const k = clamp01((x - a) / (b - a));
  return k * k * (3 - 2 * k);
};
const bell = (x: number) => (x > 0 && x < 1 ? Math.pow(Math.sin(Math.PI * x), 2) : 0); // 0 → 1 → 0
const white = (alpha: number) => `rgba(255,255,255,${alpha.toFixed(3)})`;

interface Spring {
  x: number;
  v: number;
}
const spring = (x = 0): Spring => ({ x, v: 0 });
const stepSpring = (s: Spring, target: number, k: number, c: number, dt: number) => {
  s.v += (k * (target - s.x) - c * s.v) * dt;
  s.x += s.v * dt;
};

export interface HeroLogoOptions {
  /** Play the arrival (otherwise start at rest). */
  intro: boolean;
  /** Reduced motion: draw the still picture only, with no animation or interaction. */
  still: boolean;
}

/** Starts the hero logo inside `art` (the [data-hero-art] wrapper). Returns a cleanup function. */
export function startHeroLogo(art: HTMLElement, { intro, still }: HeroLogoOptions): () => void {
  const section = art.closest('section');
  const svg = art.querySelector('svg');
  const q = <T extends Element>(sel: string): T[] => (section ? [...section.querySelectorAll<T>(sel)] : []);
  const [bg] = q<HTMLCanvasElement>('canvas[data-hl="bg"]');
  const [lc] = q<HTMLCanvasElement>('canvas[data-hl="lines"]');
  const [logo] = q<SVGGElement>('[data-hl="logo"]');
  const [gearEl] = q<SVGGElement>('[data-hl="gear"]');
  const [sweep] = q<SVGCircleElement>('[data-hl="sweep"]');
  const bars = q<SVGGElement>('[data-hl="bar"]');
  const dots = q<SVGGElement>('[data-hl="dot"]');
  const nodes = q<SVGCircleElement>('[data-hl="dot"] circle');
  const clips = q<SVGRectElement>('[data-hl="clip"]');
  const lx = lc?.getContext('2d');
  if (!section || !svg || !bg || !lc || !lx || !logo || !gearEl || !sweep || bars.length !== 3) return () => {};
  const gearPathEl = gearEl.querySelector('path')!;
  const maskUrl = `url(#${sweep.closest('mask')!.id})`;
  const clipUrl = (i: number) => `url(#${clips[i].closest('clipPath')!.id})`;

  // Gear centre (the C's round part) and where its material starts after the opening, so the
  // sweep runs round the C from one tip to the other and no piece arrives late.
  const bb = gearEl.getBBox();
  const cx = bb.x + bb.width - bb.height / 2, cy = bb.y + bb.height / 2;
  const len = gearPathEl.getTotalLength();
  const angles: number[] = [];
  for (let i = 0; i < 1440; i++) {
    const p = gearPathEl.getPointAtLength((i / 1440) * len);
    angles.push((Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI);
  }
  angles.sort((a, b) => a - b);
  let gap = 360 - angles[angles.length - 1] + angles[0], start = angles[0];
  for (let i = 1; i < angles.length; i++) {
    if (angles[i] - angles[i - 1] > gap) {
      gap = angles[i] - angles[i - 1];
      start = angles[i];
    }
  }
  sweep.setAttribute('cx', `${cx}`);
  sweep.setAttribute('cy', `${cy}`);
  sweep.setAttribute('transform', `rotate(${(start - 1.5).toFixed(2)} ${cx} ${cy})`);

  // ---- springs -------------------------------------------------------------------------
  const P = {
    w: WINGS.map(() => ({ y: spring(), s: spring(), k: spring() })),
    d: WINGS.map(() => spring()),
    ds: WINGS.map(() => spring(1)),
    g: spring(),
    p: spring(1),
    charge: 0,
  };
  const gearAngle = () => 4 * Math.tanh(P.g.x / 4); // soft limit, so the C keeps its shape
  const ptr = { x: -1e4, y: -1e4, dx: 0, dy: 0, on: false }; // the mouse, in logo units
  const press = { at: -10, amp: 1 };
  const hold = { down: null as number | null, wantDown: false, wantUp: false };
  let kicks: { at: number; i: number; s: number; c: number }[] = [];
  const chargeAt = (t: number) =>
    hold.down === null ? 0 : 1 - Math.pow(1 - clamp01((t - hold.down) / 1.1), 2);

  function releasePress(t: number) {
    const c = chargeAt(t), s = 1 + 0.5 * c; // the longer the hold, the bigger the release
    hold.down = null;
    if (c < 0.25) P.p.v -= 0.75; // a quick click: the logo gives a little
    press.at = t;
    press.amp = s;
    WINGS.forEach((_, i) => kicks.push({ at: t + i * 0.07, i, s, c }));
    P.g.v += 45 * s; // the gear's small wobble
  }

  function stepPieces(t: number, dt: number) {
    const on = ptr.on ? smooth(2.4, 3.2, t) : 0;
    WINGS.forEach((w, i) => {
      // how close the mouse is to this bar (to the bar, not to its middle)
      const ox = Math.max(WING_LEFT[i] - ptr.x, 0, ptr.x - w.cx), oy = ptr.y - w.cy;
      const near = on * Math.exp(-Math.pow(Math.hypot(ox, oy) / 85, 2));
      const away = Math.max(-1, Math.min(1, -oy / 30)); // up if the mouse is below, down if above
      stepSpring(P.w[i].y, 15 * away * near, 230, 13, dt);
      stepSpring(P.w[i].s, 0.045 * near, 230, 13, dt);
      stepSpring(P.d[i], P.w[i].y.x, 120, 8, dt); // the dot follows its bar a moment later
    });
    // moving the mouse round the gear drags it a few degrees, like turning a dial by hand
    const rx = ptr.x - cx, ry = ptr.y - cy, dist = Math.hypot(rx, ry) || 1;
    const grip = on * Math.exp(-Math.pow((dist - 260) / 140, 2));
    const spin = Math.max(-300, Math.min(300, (((rx * ptr.dy - ry * ptr.dx) / (dist * dist)) * 57.3) / dt));
    P.g.v += (spin * 0.5 - P.g.v) * Math.min(1, 10 * dt) * grip;
    stepSpring(P.g, 0, 45, 6, dt);
    ptr.dx = ptr.dy = 0;
    // while held, the logo gives a little, the dots shrink and the wings draw back
    const c = chargeAt(t);
    P.charge = c;
    stepSpring(P.p, 1 - 0.035 * c, 320, 11, dt);
    P.p.x = Math.max(0.9, P.p.x);
    // on release each dot pops and its wing flicks (a click) or shoots back out (after a
    // hold), then both spring back, a little past
    kicks = kicks.filter((k) => {
      if (t < k.at) return true;
      P.ds[k.i].v += 3.2 * k.s;
      P.w[k.i].k.v += k.c < 0.25 ? 2.4 : -1.2 * k.c;
      return false;
    });
    WINGS.forEach((_, i) => {
      stepSpring(P.ds[i], 1 - 0.14 * c, 300, 10, dt);
      stepSpring(P.w[i].k, 0.2 * c, 160 + 100 * (1 - c), 10, dt);
      P.ds[i].x = Math.max(0.8, Math.min(1.4, P.ds[i].x));
      P.w[i].k.x = Math.max(-0.1, Math.min(0.3, P.w[i].k.x));
    });
  }

  // ---- the logo (SVG) --------------------------------------------------------------------
  let plain: boolean | null = null; // true once the sweep mask and wing clips are off
  function drawLogo(t: number) {
    const sw = outCubic(span(t, 0.1, 1.3));
    sweep.setAttribute('stroke-dasharray', `${sw.toFixed(4)} 1`);
    const turn = outQuart(span(t, 0.1, 1.7)), grow = outCubic(span(t, 0.1, 1.2));
    const ang = -50 * (1 - turn) + gearAngle(), sc = 0.94 + 0.06 * grow;
    gearEl.setAttribute('transform', `translate(${cx} ${cy}) rotate(${ang.toFixed(2)}) scale(${sc.toFixed(4)}) translate(${-cx} ${-cy})`);
    // Once landed, drop the mask and clips (a masked shape that keeps changing can shimmer)
    // and switch on the shadow (a filter during the sweep makes the browser reuse a stale picture).
    const landed = t > 2.3;
    if (landed !== plain) {
      plain = landed;
      if (landed) gearPathEl.removeAttribute('mask');
      else gearPathEl.setAttribute('mask', maskUrl);
      bars.forEach((b, i) => {
        const path = b.querySelector('path')!;
        if (landed) path.removeAttribute('clip-path');
        else path.setAttribute('clip-path', clipUrl(i));
      });
    }
    svg!.toggleAttribute('data-landed', t > 2.4);
    WINGS.forEach((w, i) => {
      // each dot appears at the gear, then its bar grows out to the left
      const n = outCubic(span(t, 0.75 + i * 0.12, 0.45));
      nodes[i].setAttribute('opacity', n.toFixed(3));
      nodes[i].setAttribute('r', (WING_RADIUS * (0.6 + 0.4 * n)).toFixed(2));
      const g = outQuart(span(t, 1.0 + i * 0.12, 0.9));
      const x = w.cx - (w.cx - WING_LEFT[i] + 4) * g;
      clips[i].setAttribute('x', x.toFixed(1));
      clips[i].setAttribute('width', g > 0 ? (w.cx - x).toFixed(1) : '0');
      const sx = 1 - P.w[i].s.x - P.w[i].k.x, dy = P.w[i].y.x, ds = P.ds[i].x;
      bars[i].setAttribute('transform', `translate(${w.cx} ${(w.cy + dy).toFixed(2)}) scale(${sx.toFixed(4)} 1) translate(${-w.cx} ${-w.cy})`);
      dots[i].setAttribute('transform', `translate(0 ${P.d[i].x.toFixed(2)}) translate(${w.cx} ${w.cy}) scale(${ds.toFixed(4)}) translate(${-w.cx} ${-w.cy})`);
    });
    logo.setAttribute('transform', `translate(${OPTICAL_X} ${OPTICAL_Y}) scale(${P.p.x.toFixed(4)}) translate(${-OPTICAL_X} ${-OPTICAL_Y})`);
  }

  // ---- the living brand gradient (WebGL) --------------------------------------------------
  const gl = still ? null : bg.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  let uRes: WebGLUniformLocation | null = null, uTime: WebGLUniformLocation | null = null, uMouse: WebGLUniformLocation | null = null;
  if (gl) {
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision highp float;
      uniform vec2 r; uniform float t; uniform vec2 m;
      vec3 c1=vec3(.078,.753,.812), c2=vec3(.043,.498,.690), c3=vec3(.102,.247,.651);
      float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
      void main(){
        vec2 uv=gl_FragCoord.xy/r;
        vec2 q=vec2(uv.x*r.x/r.y,uv.y);
        vec2 w=q+.16*vec2(sin(q.y*2.2+t*.17),cos(q.x*1.6-t*.13));
        w+=.08*vec2(sin(w.y*4.1-t*.11+1.3),cos(w.x*3.3+t*.09));
        float k=(w.x/(r.x/r.y)+(1.-w.y))*.5;
        k-=.07*exp(-3.5*dot(uv-m,uv-m));
        k=clamp(k,0.,1.);
        vec3 col=k<.5?mix(c1,c2,k*2.):mix(c2,c3,k*2.-1.);
        col+=(h(gl_FragCoord.xy+t)-.5)/255.;
        gl_FragColor=vec4(col,1.);
      }`;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (gl.getProgramParameter(pr, gl.LINK_STATUS)) {
      gl.useProgram(pr);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      uRes = gl.getUniformLocation(pr, 'r');
      uTime = gl.getUniformLocation(pr, 't');
      uMouse = gl.getUniformLocation(pr, 'm');
      bg.style.opacity = '1';
    }
  }

  // ---- lines made from the logo (canvas 2D, above the gradient, below the logo) ------------
  const gearPath = new Path2D(GEAR_PATH);
  // where the gear sits on the lines canvas: G.x/G.y its centre, G.s logo units → canvas px
  const G = { x: 0, y: 0, s: 1, r: 1, d: 1 };
  function size() {
    const sr = section!.getBoundingClientRect(), ar = svg!.getBoundingClientRect();
    const d = Math.min(devicePixelRatio || 1, 2), k = ar.width / HERO_VIEWBOX.w;
    lc!.width = Math.round(sr.width * d);
    lc!.height = Math.round(sr.height * d);
    Object.assign(G, {
      x: (ar.left - sr.left + (cx - HERO_VIEWBOX.x) * k) * d,
      y: (ar.top - sr.top + (cy - HERO_VIEWBOX.y) * k) * d,
      s: k * d, r: 254 * k * d, d,
    });
    if (gl) {
      const gd = Math.min(devicePixelRatio || 1, 1.5);
      bg.width = Math.round(sr.width * gd);
      bg.height = Math.round(sr.height * gd);
      gl.viewport(0, 0, bg.width, bg.height);
    }
  }

  const hover = { aim: 0, v: 0 }; // how strongly the mouse flashlight is on
  const aim = { x: 0.75, y: 0.5 }, cur = { x: 0.75, y: 0.5 }; // the mouse, 0..1 over the section
  const beat = { at: null as number | null, next: 0 };
  const beatTime = (t: number) => {
    if (t >= beat.next) {
      beat.at = t;
      beat.next = t + BEAT_EVERY;
    }
    return beat.at === null ? -1 : t - beat.at;
  };

  function drawLines(t: number) {
    const W = lx!.canvas.width, H = lx!.canvas.height, ctx = lx!;
    ctx.clearRect(0, 0, W, H);
    const px = G.d, b = still ? -1 : beatTime(t);
    const mx = cur.x * W, my = cur.y * H;
    const toC = (ix: number, iy: number): [number, number] => [G.x + (ix - cx) * G.s, G.y + (iy - cy) * G.s];
    const radial = (x: number, y: number, r: number, a0: number, a1 = 0) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, white(a0));
      g.addColorStop(1, white(a1));
      return g;
    };

    // Hidden traces just below each wing turn up into its dot: invisible unless the mouse
    // lights them or the heartbeat's light runs along them.
    WINGS.forEach((w, i) => {
      const y0 = w.cy + 30;
      const pts = [toC(WING_LEFT[i] - 300, y0), toC(w.cx - 62, y0), toC(w.cx - 32, w.cy)];
      const cr = 26 * G.s, d1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]);
      const d2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]);
      const a: [number, number] = [pts[1][0] - cr, pts[1][1]];
      const c: [number, number] = [pts[1][0] + ((pts[2][0] - pts[1][0]) * cr) / d2, pts[1][1] + ((pts[2][1] - pts[1][1]) * cr) / d2];
      const trace = () => {
        ctx.beginPath();
        ctx.moveTo(...pts[0]);
        ctx.lineTo(...a);
        ctx.quadraticCurveTo(...pts[1], ...c);
        ctx.lineTo(...pts[2]);
      };
      const total = d1 + d2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (hover.v > 0.01 && t > 2.4) {
        trace();
        ctx.lineWidth = px;
        ctx.strokeStyle = radial(mx, my, 170 * px, 0.55 * hover.v);
        ctx.stroke();
      }
      if (b < 0) return;
      // a short comet glides along the trace and drains fully into the dot
      const TAIL = 90 * px, reach = total + TAIL;
      const p = span(b, i * 0.12, 1.5), e = 0.5 - 0.5 * Math.cos(Math.PI * p);
      if (p > 0 && p < 1) {
        const head = e * reach;
        for (const [l, al, lw] of [[90, 0.12, 2.2], [45, 0.3, 1.6], [16, 0.85, 1.6]]) {
          ctx.setLineDash([l * px, reach * 2]);
          ctx.lineDashOffset = -(head - l * px);
          ctx.lineWidth = lw * px;
          ctx.strokeStyle = white(al);
          trace();
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
      // a thin ring spreads softly from the dot the moment the light reaches it
      const arrive = i * 0.12 + (1.5 * Math.acos(1 - (2 * total) / reach)) / Math.PI;
      const qq = span(b, arrive, 1.3);
      if (qq > 0 && qq < 1) {
        const [nx, ny] = toC(w.cx, w.cy + P.d[i].x), qe = outCubic(qq);
        ctx.lineWidth = 1.2 * px;
        ctx.strokeStyle = white(0.55 * Math.pow(1 - qe, 1.5));
        ctx.beginPath();
        ctx.arc(nx, ny, WING_RADIUS * G.s * (1.1 + 0.9 * qe), 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // the press glow: a soft bloom behind the logo and around each dot (or building while held)
    const released = t >= press.at ? press.amp * Math.exp(-(t - press.at) * 2.2) * smooth(press.at, press.at + 0.06, t) : 0;
    const glow = Math.max(released, 0.6 * P.charge);
    if (glow > 0.01) {
      const g = ctx.createRadialGradient(G.x, G.y, G.r * 0.4, G.x, G.y, G.r * 1.9);
      g.addColorStop(0, white(0.13 * glow));
      g.addColorStop(1, white(0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      WINGS.forEach((w, i) => {
        const [nx, ny] = toC(w.cx, w.cy + P.d[i].x), rr = WING_RADIUS * G.s * 2.1;
        ctx.fillStyle = radial(nx, ny, rr, 0.3 * glow);
        ctx.beginPath();
        ctx.arc(nx, ny, rr, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Echoes of the gear grow out once as the logo lands, then stay still.
    RINGS.forEach((ring, i) => {
      const u = outCubic(span(t, 1.3 + i * 0.15, 1.4));
      if (!u) return;
      // the heartbeat: every echo brightens and grows a touch, inner to outer, and settles
      const lift = b < 0 ? 0 : bell(span(b, 1.75 + i * 0.13, 1.8));
      const sc = G.s * (1 + (ring.s - 1) * u) * (1 + 0.035 * lift);
      ctx.save();
      ctx.translate(G.x, G.y);
      ctx.scale(sc, sc);
      ctx.translate(-cx, -cy);
      ctx.lineCap = 'round';
      if (ring.a) {
        ctx.lineWidth = px / sc;
        ctx.strokeStyle = white(ring.a * u);
        ctx.stroke(gearPath);
        if (!still) {
          // a glint: one quick lap as the echo appears, then a calm glide
          const t1 = 1.3 + i * 0.15, k = Math.max(0, t - t1);
          const pos = 0.85 * outCubic(span(t, t1, 2.4)) + k / (40 + i * 9) + i * 0.33;
          const seg = len * 0.07;
          ctx.setLineDash([seg, len - seg]);
          ctx.lineDashOffset = -pos * len;
          ctx.lineWidth = (1.6 * px) / sc;
          ctx.strokeStyle = white(Math.min(0.6, ring.a * 2.6 * smooth(t1, t1 + 0.4, t)));
          ctx.stroke(gearPath);
          ctx.setLineDash([]);
        }
      }
      if (lift > 0.01) {
        ctx.lineWidth = (1.2 * px) / sc;
        ctx.strokeStyle = white((ring.a ? 0.2 : 0.09) * lift);
        ctx.stroke(gearPath);
      }
      if (glow > 0.01 && ring.a) {
        ctx.lineWidth = (1.2 * px) / sc;
        ctx.strokeStyle = white(ring.a * 0.8 * glow);
        ctx.stroke(gearPath);
      }
      // the flashlight: outlines near the mouse light up, the hidden outer ones too
      if (hover.v > 0.01) {
        const ix = (mx - G.x) / sc + cx, iy = (my - G.y) / sc + cy;
        ctx.strokeStyle = radial(ix, iy, (170 * px) / sc, 0.7 * hover.v);
        ctx.lineWidth = (1.3 * px) / sc;
        ctx.stroke(gearPath);
      }
      ctx.restore();
    });
  }

  function drawGradient(time: number) {
    if (!gl || !uRes) return;
    gl.uniform2f(uRes, bg.width, bg.height);
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMouse, cur.x, 1 - cur.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  // ---- still picture (reduced motion) ---------------------------------------------------
  if (still) {
    const drawStill = () => {
      size();
      drawLines(99);
    };
    lc.style.opacity = '1';
    art.setAttribute('data-live', '');
    drawStill();
    const ro = new ResizeObserver(drawStill);
    ro.observe(section);
    return () => ro.disconnect();
  }

  // ---- pointer -----------------------------------------------------------------------------
  const onMove = (e: PointerEvent) => {
    const sr = section.getBoundingClientRect(), ar = svg.getBoundingClientRect();
    aim.x = (e.clientX - sr.left) / sr.width;
    aim.y = (e.clientY - sr.top) / sr.height;
    if (e.pointerType === 'mouse') hover.aim = 1;
    const k = ar.width / HERO_VIEWBOX.w;
    const x = (e.clientX - ar.left) / k + HERO_VIEWBOX.x, y = (e.clientY - ar.top) / k + HERO_VIEWBOX.y;
    if (ptr.on) {
      ptr.dx += x - ptr.x;
      ptr.dy += y - ptr.y;
    }
    ptr.x = x;
    ptr.y = y;
    ptr.on = true;
  };
  const onLeave = () => {
    aim.x = 0.75;
    aim.y = 0.5;
    hover.aim = 0;
    ptr.on = false;
  };
  const onDown = (e: PointerEvent) => {
    if (e.button === 0) hold.wantDown = true;
  };
  const onUp = () => {
    hold.wantUp = true;
  };
  section.addEventListener('pointermove', onMove);
  section.addEventListener('pointerleave', onLeave);
  art.addEventListener('pointerdown', onDown);
  addEventListener('pointerup', onUp);
  addEventListener('pointercancel', onUp);

  // ---- one clock, paused while the hero is off screen -----------------------------------------
  let t = intro ? 0 : 3.5;
  beat.next = intro ? 3.4 : t + 1.2;
  let raf = 0, last: number | null = null, visible = true;
  function frame(now: number) {
    const dt = last === null ? 1 / 60 : Math.min(1 / 20, Math.max(1 / 240, (now - last) / 1000));
    last = now;
    t += dt;
    if (hold.wantDown && t > 2.4) hold.down = t;
    if (hold.wantUp && hold.down !== null) releasePress(t);
    hold.wantDown = hold.wantUp = false;
    stepPieces(t, dt);
    drawLogo(t);
    hover.v += (hover.aim - hover.v) * 0.08;
    drawLines(t);
    cur.x += (aim.x - cur.x) * 0.06;
    cur.y += (aim.y - cur.y) * 0.06;
    drawGradient(now / 1000);
    raf = requestAnimationFrame(frame);
  }
  const run = () => {
    if (!raf && visible && !document.hidden) {
      last = null;
      raf = requestAnimationFrame(frame);
    }
  };
  const halt = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) run();
    else halt();
  });
  io.observe(section);
  const onVisibility = () => (document.hidden ? halt() : run());
  document.addEventListener('visibilitychange', onVisibility);
  const ro = new ResizeObserver(() => {
    size();
    if (!raf) drawLines(t);
  });
  ro.observe(section);

  size();
  drawLogo(t);
  lc.style.opacity = '1';
  art.setAttribute('data-live', '');
  run();

  return () => {
    halt();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    section.removeEventListener('pointermove', onMove);
    section.removeEventListener('pointerleave', onLeave);
    art.removeEventListener('pointerdown', onDown);
    removeEventListener('pointerup', onUp);
    removeEventListener('pointercancel', onUp);
  };
}
