import { useLang } from '../i18n/LanguageContext';
import { inquireHref, pagePath } from '../routes';
import { Check } from './icons';
import { HeroStack } from './HeroStack';
import { arriveProps } from '../motion/reveal';
import { btn } from './ui';

export function Hero() {
  const { lang, t } = useLang();
  return (
    <section id="home" className="relative isolate overflow-hidden bg-brand-gradient text-white">
      {/*
        The gradient's first stop (#14C0CF) is too light for white text (2.2:1).
        A Navy scrim fades out across the text column so the headline stays above 4.5:1
        while the gradient stays fully visible behind the artwork.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 from-navy/70 via-navy/25 to-transparent max-lg:bg-linear-to-b lg:bg-linear-to-r"
      />

      <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.12fr_0.88fr] lg:py-24">
        <div>
          <h1 {...arriveProps(0)} className="text-[clamp(2rem,1rem+2.7vw,3.375rem)] leading-[1.15] font-extrabold tracking-tight text-balance text-white">
            {t.hero.title}
          </h1>
          <p {...arriveProps(1)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-pretty text-light sm:text-xl">{t.hero.lead}</p>

          <ul {...arriveProps(2)} className="mt-8 flex flex-wrap gap-x-7 gap-y-3 font-extrabold text-white">
            {t.hero.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <Check className="size-5 shrink-0 text-light" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>

          <div {...arriveProps(3)} className="mt-10 flex flex-wrap items-center gap-4">
            <a href={inquireHref('m365', lang)} className={btn('primary')}>
              {t.cta}
            </a>
            <a href={`${pagePath('services', lang)}#audit`} className={btn('ghostOnDark')}>
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <HeroStack />
      </div>
    </section>
  );
}
