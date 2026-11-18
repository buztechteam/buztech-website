import type { ReactNode } from 'react';
import { revealProps } from '../motion/reveal';
import { h2Class, leadClass } from './ui';

/** One real photo: `src` is the path without the size, e.g. '/work/setup' for /work/setup-480.webp and -960.webp. */
export type Photo = { id: string; src: string; caption: string; alt: string };

const ratios = {
  '4/3': { className: 'aspect-[4/3]', height: 720 },
  '3/2': { className: 'aspect-[3/2]', height: 640 },
};

/**
 * A heading, a lead and a row of real photos with captions. The caller wraps it in its section,
 * so it can sit inside a section that already has its own background. `children` sit under the lead (a price link).
 */
export function PhotoBlock({
  heading,
  lead,
  photos,
  ratio = '4/3',
  className = '',
  children,
}: {
  heading: string;
  lead: string;
  photos: Photo[];
  ratio?: keyof typeof ratios;
  className?: string;
  children?: ReactNode;
}) {
  const r = ratios[ratio];
  const three = photos.length > 2;
  return (
    <div className={className}>
      <h2 {...revealProps(0)} className={h2Class}>{heading}</h2>
      <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{lead}</p>
      {children && <div {...revealProps(2)}>{children}</div>}
      <ul {...revealProps(children ? 3 : 2)} className={`mt-10 grid gap-6 sm:grid-cols-2 sm:gap-5 ${three ? 'lg:grid-cols-3' : ''}`}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <figure>
              <img
                src={`${photo.src}-960.webp`}
                srcSet={`${photo.src}-480.webp 480w, ${photo.src}-960.webp 960w`}
                sizes={three ? '(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw' : '(min-width: 1280px) 36rem, (min-width: 640px) 50vw, 100vw'}
                alt={photo.alt}
                width={960}
                height={r.height}
                loading="lazy"
                decoding="async"
                className={`${r.className} h-auto w-full rounded-xl bg-navy/10 object-cover`}
              />
              <figcaption className="mt-3 text-navy/80">{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
