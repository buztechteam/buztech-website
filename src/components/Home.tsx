import { equipment, ideahubImage } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { TeamId } from '../i18n/types';
import { revealProps } from '../motion/reveal';
import { inquireHref, pagePath } from '../routes';
import { BoardIllustration } from './BoardIllustration';
import { ContactActions } from './ContactBand';
import { ArrowRight, ClipboardCheck } from './icons';
import { SpecList } from './SpecList';
import { btn, cardArrow, cardLink, cardStatic, h2Class, leadClass } from './ui';

/**
 * Home page: Microsoft 365 leads, so it gets the dark panel and the plan line-up before anything else,
 * then the free licence audit that belongs to it.
 */
export function M365Teaser() {
  const { lang, t } = useLang();
  const m = t.home.m365;
  return (
    <section className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x">
        <div className="grid gap-10 rounded-[1.25rem] bg-navy p-6 text-light sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-12">
          <div className="flex flex-col items-start">
            <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{m.heading}</h2>
            <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{m.lead}</p>
            {/* The price is the primary action; comparing plans is the quieter one. */}
            <div {...revealProps(2)} data-hero-cta className="mt-8 flex flex-wrap gap-3">
              <a href={inquireHref('m365', lang)} className={btn('primary')}>
                {t.cta}
              </a>
              <a href={pagePath('microsoft-365', lang)} className={`${btn('ghostOnDark')} gap-2`}>
                {m.compare}
                <ArrowRight className="size-5" />
              </a>
            </div>
          </div>

          <ul className="self-center border-b border-white/12">
            {m.rows.map((row, i) => (
              <li key={row.name} {...revealProps(i)} className="border-t border-white/12 py-4 sm:py-5">
                <p className="text-lg leading-snug font-extrabold text-white sm:text-xl">{row.name}</p>
                <p className="mt-0.5 text-light/80">{row.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <AuditTeaser />
      </div>
    </section>
  );
}

/**
 * Home page: the free licence audit, under the Microsoft 365 panel and laid out like it (same columns and padding).
 * It uses the Services audit card's words (t.services.audit), so it adds no claim of its own. It is the quieter
 * action: the price request above stays the one filled button. A white card on the light section, not a second
 * Navy panel, so the two don't read as one heavy block.
 */
function AuditTeaser() {
  const { lang, t } = useLang();
  const a = t.services.audit;
  return (
    <article
      {...revealProps(0)}
      id="audit"
      aria-labelledby="home-audit"
      className={`mt-6 grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-8 rounded-[1.25rem] border border-navy/12 bg-white p-5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-12 ${cardStatic}`}
    >
      <div className="flex flex-col items-start">
        <ClipboardCheck className="size-9 text-deep-teal" />
        <h2 id="home-audit" className="mt-5 text-2xl leading-tight font-extrabold text-balance sm:text-3xl">{a.title}</h2>
        <p className="mt-3 max-w-[32rem] text-lg text-pretty text-navy/85">{a.text}</p>
        {/* Tighter sides on phones keep the Georgian label on one line from 354px; narrower, it may wrap rather than overflow. */}
        <a href={inquireHref('audit', lang)} className={`${btn('outlineOnLight')} mt-8 text-center max-sm:px-4 max-sm:whitespace-normal`}>
          {a.cta}
        </a>
      </div>
      <SpecList specs={a.points} iconClass="text-deep-teal" className="self-center text-lg font-extrabold" />
    </article>
  );
}

/**
 * Home page: everything that is not Microsoft, on request. The equipment categories as a plain list
 * leading to the IT equipment page, beside the one product we can show a real photo of, the IdeaHub.
 */
export function OnRequest() {
  const { lang, t } = useLang();
  const board = t.pages.ideahub;
  const rowFocus = 'focus-visible:outline-none';
  return (
    <section className="surface-light bg-white py-20 text-navy lg:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <h2 {...revealProps(0)} className={h2Class}>{t.home.onRequest.heading}</h2>
          <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{t.home.onRequest.lead}</p>
          <ul {...revealProps(2)} className="mt-8 border-b border-navy/15">
            {equipment.map((id) => (
              <li
                key={id}
                className="group relative flex items-center justify-between gap-4 border-t border-navy/15 py-4 transition-colors duration-(--dur-hover) ease-soft hover:border-deep-teal has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-deep-teal"
              >
                <a href={pagePath('it-equipment', lang)} className={`text-lg leading-snug font-extrabold after:absolute after:inset-0 sm:text-xl ${rowFocus}`}>
                  {t.products[id]}
                </a>
                <ArrowRight className={`size-5 shrink-0 text-deep-teal ${cardArrow}`} />
              </li>
            ))}
          </ul>
        </div>

        <article
          {...revealProps(3)}
          className={`group relative overflow-hidden rounded-[1.25rem] border border-navy/12 bg-light ${cardLink} hover:border-deep-teal has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-deep-teal`}
        >
          {ideahubImage ? (
            <img
              src={`${ideahubImage}-800.webp`}
              srcSet={`${ideahubImage}-480.webp 480w, ${ideahubImage}-800.webp 800w`}
              sizes="(min-width: 1024px) 35rem, 100vw"
              alt={t.ideahub.photoAlt}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              className="aspect-video h-auto w-full bg-navy object-cover"
            />
          ) : (
            <div className="grid aspect-video place-items-center bg-navy p-8">
              <BoardIllustration className="h-auto w-full max-w-xs" />
            </div>
          )}
          <div className="flex items-start gap-4 p-6 sm:p-7">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl leading-snug font-extrabold sm:text-2xl">
                <a href={pagePath('ideahub', lang)} className={`after:absolute after:inset-0 after:rounded-[1.25rem] ${rowFocus}`}>
                  {board.label}
                </a>
              </h3>
              <p className="mt-1 text-pretty text-navy/85">{board.summary}</p>
            </div>
            <ArrowRight className={`mt-1 size-5 shrink-0 text-deep-teal ${cardArrow}`} />
          </div>
        </article>
      </div>
    </section>
  );
}

/** The people shown on Home, in order (portraits live in /public/team). */
const team: TeamId[] = ['irakli', 'soso'];

/**
 * Home page: the owner's own line ("we are friends after they buy from us") beside the two people
 * a client deals with, each a real photo with a name and a role. It asks visitors to contact them directly
 * (owner: "that's why we tell them to contact us"): the price request, WhatsApp and the phone.
 * Phones read the heading and the invitation first, then the faces; from lg the photos sit on the left.
 */
export function AfterSale() {
  const { t } = useLang();
  const people = t.home.friends.people;
  return (
    <section className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 {...revealProps(0)} className={h2Class}>{t.home.friends.heading}</h2>
          <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{t.home.friends.lead}</p>
          <div {...revealProps(2)}>
            <ContactActions onLight className="mt-8" />
          </div>
        </div>
        <ul {...revealProps(3)} className="grid grid-cols-2 gap-4 sm:gap-5 lg:order-first">
          {team.map((id) => (
            <li key={id}>
              {/* The caption names the person, so the photo needs no text of its own. */}
              <figure>
                <img
                  src={`/team/${id}-720.webp`}
                  srcSet={`/team/${id}-360.webp 360w, /team/${id}-720.webp 720w`}
                  sizes="(min-width: 1024px) 17rem, 45vw"
                  alt=""
                  width={720}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] h-auto w-full rounded-[1.25rem] bg-navy/10 object-cover"
                />
                <figcaption className="mt-3">
                  <span className="block leading-snug font-extrabold">{people[id].name}</span>
                  <span className="mt-0.5 block text-sm text-navy/80">{people[id].role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
