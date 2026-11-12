import { eventPhotos } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { DistributorPhotoId } from '../i18n/types';
import { revealProps } from '../motion/reveal';
import { h2Class, leadClass } from './ui';

/**
 * About page: photos from events we attended, each with what it was, where and when.
 * Nobody, no organiser and no sponsor is named. Phones and tablets swipe the row, like the Microsoft 365 plans;
 * the row reveals as one, so a photo swiped into view is never left hidden.
 */
export function Events() {
  const { t } = useLang();
  const e = t.events;
  return (
    <section id="events" className="surface-light bg-white py-20 text-navy lg:py-24">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{e.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{e.lead}</p>
        <ul
          {...revealProps(2)}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {eventPhotos.map((id) => {
            const item = e.items[id];
            return (
              <li key={id} className="w-[85%] max-w-[26rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
                <figure>
                  <img
                    src={`/events/${id}-960.webp`}
                    srcSet={`/events/${id}-480.webp 480w, /events/${id}-960.webp 960w`}
                    sizes="(min-width: 1024px) 24rem, 85vw"
                    alt={item.alt}
                    width={960}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] h-auto w-full rounded-xl bg-navy/10 object-cover"
                  />
                  <figcaption className="mt-4">
                    <span className="block text-lg leading-snug font-extrabold text-balance">{item.title}</span>
                    <span className="mt-1 block text-navy/80">{item.place}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const distributorPhotos: DistributorPhotoId[] = ['guests', 'certificates'];

/**
 * About page: the Huawei eKit distribution agreement, said once, above two photos from the event that marked it.
 * Our own event, so it stands apart from the conferences we only attended. Nobody is named.
 */
export function Distributor() {
  const { t } = useLang();
  const d = t.distributor;
  return (
    <section id="huawei-ekit" className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{d.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{d.lead}</p>
        <ul {...revealProps(2)} className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-5">
          {distributorPhotos.map((id) => (
            <li key={id}>
              <figure>
                <img
                  src={`/events/ekit-${id}-960.webp`}
                  srcSet={`/events/ekit-${id}-480.webp 480w, /events/ekit-${id}-960.webp 960w`}
                  sizes="(min-width: 1280px) 36rem, (min-width: 640px) 50vw, 100vw"
                  alt={d.photos[id].alt}
                  width={960}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] h-auto w-full rounded-xl bg-navy/10 object-cover"
                />
                <figcaption className="mt-3 text-navy/80">{d.photos[id].caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
