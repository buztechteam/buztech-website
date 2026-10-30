import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref } from '../routes';
import { ClipboardCheck, serviceIcons } from './icons';
import { SpecList } from './SpecList';
import { btn, cardStatic } from './ui';

/**
 * Services page: the free licence audit leads (id="audit", the target of every "free audit" link),
 * then the three services after the sale. The title and lead sit in the page's PageIntro.
 */
export function Services() {
  const { lang, t } = useLang();
  const a = t.services.audit;
  return (
    <section id="services" className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x">
        <article
          id="audit"
          {...revealProps(0)}
          className="grid scroll-mt-24 gap-8 rounded-[1.25rem] bg-navy p-6 text-light sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:p-10"
        >
          <div className="flex flex-col items-start">
            <ClipboardCheck className="size-9 text-brand-teal" />
            <h2 className="mt-5 text-3xl leading-tight font-extrabold text-balance text-white sm:text-4xl">{a.title}</h2>
            <p className="mt-3 max-w-[32rem] text-lg text-pretty text-light/85">{a.text}</p>
            <a href={inquireHref('audit', lang)} className={`${btn('primary')} mt-8`}>
              {a.cta}
            </a>
          </div>
          <SpecList specs={a.points} iconClass="text-brand-teal" className="self-center text-lg font-extrabold text-white" />
        </article>

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = serviceIcons[item.id];
            return (
              <li key={item.id} {...revealProps(i + 1)} className={`flex flex-col rounded-xl border border-navy/12 bg-white p-6 sm:p-7 ${cardStatic}`}>
                <Icon className="size-8 text-deep-teal" />
                <h2 className="mt-4 text-xl leading-snug font-extrabold text-balance">{item.title}</h2>
                <p className="mt-2 text-pretty text-navy/85">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * Numbered steps for Navy surfaces: "How we work" (Services only) and "How sourcing works" (IT equipment).
 * `level` is the heading level of the block title (step titles sit one below).
 */
export function Steps({
  heading,
  steps,
  level = 3,
}: {
  heading: string;
  steps: { title: string; text: string }[];
  level?: 2 | 3;
}) {
  const Title = level === 2 ? 'h2' : 'h3';
  const StepTitle = level === 2 ? 'h3' : 'h4';
  return (
    <>
      <Title {...revealProps(0)} className="text-2xl font-extrabold text-white">{heading}</Title>
      {/* The one place numbers are right: this really is a sequence. */}
      <ol className={`mt-8 grid gap-8 lg:gap-6 ${steps.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
        {steps.map((step, index) => (
          <li
            key={step.title}
            {...revealProps(index)}
            className="relative lg:before:absolute lg:before:top-[1.125rem] lg:before:left-12 lg:before:h-px lg:before:w-[calc(100%-2rem)] lg:before:bg-white/20 lg:last:before:hidden"
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand-teal font-extrabold text-ink">
              {index + 1}
            </span>
            <StepTitle className="mt-4 text-lg font-extrabold text-balance text-white">{step.title}</StepTitle>
            <p className="mt-1 text-pretty text-light/80">{step.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

/** "How we work", as a section of its own. Shown on the Services page only. */
export function StepsSection() {
  const { t } = useLang();
  return (
    <section className="bg-navy py-16 text-light lg:py-20">
      <div className="container-x">
        <Steps heading={t.services.stepsHeading} steps={t.services.steps} level={2} />
      </div>
    </section>
  );
}
