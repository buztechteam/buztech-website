import { equipment, equipmentBrands, ideahubImage } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref } from '../routes';
import { BoardIllustration } from './BoardIllustration';
import { PriceLink } from './Microsoft365';
import { SpecList } from './SpecList';
import { Steps } from './Services';
import { btn, cardStatic, h2Class } from './ui';

/**
 * IT equipment page: generic categories, each asking for a price with the category pre-selected.
 * Brand names appear only once approved (equipmentBrands in config/site.ts).
 */
export function Equipment() {
  const { t } = useLang();
  const e = t.equipment;
  return (
    <>
      <section className="surface-light bg-light py-16 text-navy lg:py-20">
        <div className="container-x">
          <h2 {...revealProps(0)} className={h2Class}>{e.heading}</h2>
          {/* A supplier's line list, like the Microsoft add-ons: what it is, what's in it, ask for a price. */}
          <ul className="mt-8 border-b border-navy/15 sm:mt-10">
            {equipment.map((id, i) => {
              const brands = equipmentBrands[id] ?? [];
              return (
                <li
                  key={id}
                  {...revealProps(i)}
                  className="grid gap-2 border-t border-navy/15 py-5 sm:py-7 md:grid-cols-[17rem_1fr_auto] md:items-center md:gap-8"
                >
                  <h3 className="text-2xl leading-tight font-extrabold text-balance">{t.products[id]}</h3>
                  <div>
                    <p className="max-w-[38rem] text-pretty text-navy/85">{e.items[id]}</p>
                    {brands.length > 0 && <p className="mt-2 text-sm font-extrabold text-navy/80">{brands.join(' · ')}</p>}
                  </div>
                  <PriceLink product={id} className="justify-self-start" />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-navy py-16 text-light lg:py-20">
        <div className="container-x">
          <Steps heading={e.howHeading} steps={e.how} level={2} />
        </div>
      </section>
    </>
  );
}

/** Huawei IdeaHub page: the board's one-line promise, what it does, and a photo once there is one. */
export function IdeaHub() {
  const { lang, t } = useLang();
  const copy = t.ideahub;
  return (
    <section className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x">
        <article {...revealProps(0)} className={`grid overflow-hidden rounded-[1.25rem] border border-navy/12 bg-white lg:grid-cols-2 ${cardStatic}`}>
          <div className="flex flex-col items-start p-6 sm:p-8 lg:p-10">
            <h2 className="text-3xl leading-tight font-extrabold text-balance sm:text-4xl">{copy.tagline}</h2>
            <SpecList specs={copy.specs} iconClass="text-deep-teal" className="mt-6" />
            <p className="mt-6 max-w-[28rem] text-pretty text-navy/85">{copy.ask}</p>
            <a href={inquireHref('ideahub', lang)} className={`${btn('primaryOnLight')} mt-8`}>
              {t.cta}
            </a>
          </div>
          {ideahubImage ? (
            /* A room photo fills its half of the card edge to edge; the board sits in the middle, so cropping keeps it.
               Not lazy: it sits near the top of the page. */
            <div className="bg-navy max-lg:aspect-video">
              <img
                src={ideahubImage}
                alt={copy.photoAlt}
                width={800}
                height={450}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="grid place-items-center bg-navy p-6 sm:p-8 lg:p-10">
              <BoardIllustration className="h-auto w-full max-w-sm" />
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
