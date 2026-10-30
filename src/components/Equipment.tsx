import { equipment, equipmentBrands, ideahubImage } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref } from '../routes';
import { BoardIllustration } from './BoardIllustration';
import { equipmentIcons } from './icons';
import { SpecList } from './SpecList';
import { Steps } from './Services';
import { btn, cardStatic, h2Class } from './ui';

/**
 * IT equipment page: generic categories, each asking for a price with the category pre-selected.
 * Brand names appear only once approved (equipmentBrands in config/site.ts).
 */
export function Equipment() {
  const { lang, t } = useLang();
  const e = t.equipment;
  return (
    <>
      <section className="surface-light bg-light py-16 text-navy lg:py-20">
        <div className="container-x">
          <h2 {...revealProps(0)} className={h2Class}>{e.heading}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {equipment.map((id, i) => {
              const Icon = equipmentIcons[id];
              const brands = equipmentBrands[id] ?? [];
              return (
                <li key={id} {...revealProps(i)} className={`flex flex-col rounded-xl border border-navy/12 bg-white p-6 sm:p-7 ${cardStatic}`}>
                  <div className="flex items-center gap-3">
                    <Icon className="size-7 shrink-0 text-deep-teal" />
                    <h3 className="text-2xl leading-tight font-extrabold text-balance">{t.products[id]}</h3>
                  </div>
                  <p className="mt-3 text-pretty text-navy/85">{e.items[id]}</p>
                  {brands.length > 0 && <p className="mt-3 text-sm font-extrabold text-navy/80">{brands.join(' · ')}</p>}
                  <div className="mt-auto pt-8">
                    <a href={inquireHref(id, lang)} className={btn('outlineOnLight', 'sm')}>
                      {t.cta}
                    </a>
                  </div>
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
          <div className="grid place-items-center bg-navy p-6 sm:p-8 lg:p-10">
            {ideahubImage ? (
              <img src={ideahubImage} alt={t.pages.ideahub.label} loading="lazy" className="max-h-72 w-auto object-contain" />
            ) : (
              <BoardIllustration className="h-auto w-full max-w-sm" />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
