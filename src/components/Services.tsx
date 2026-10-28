import { useLang } from '../i18n/LanguageContext';
import { serviceIcons } from './icons';

/** Services page: all six services as cards; the title and lead sit in the page's PageIntro. */
export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item) => {
            const Icon = serviceIcons[item.id];
            return (
              <li key={item.id} className="flex flex-col rounded-xl border border-navy/12 bg-white p-6 sm:p-7">
                <span className="grid size-12 place-items-center rounded-lg bg-navy text-brand-teal">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-5 text-xl leading-snug font-extrabold">{item.title}</h2>
                <p className="mt-2 text-navy/85">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * "How we work", for navy surfaces. `level` is the heading level of the block title (step titles sit one below),
 * so it fits under an h1 (Services, Contact) or under a section's h2 (category pages).
 */
export function Steps({ level = 3 }: { level?: 2 | 3 }) {
  const { t } = useLang();
  const s = t.services;
  const Title = level === 2 ? 'h2' : 'h3';
  const StepTitle = level === 2 ? 'h3' : 'h4';
  return (
    <>
      <Title className="text-2xl font-extrabold text-white">{s.stepsHeading}</Title>
      {/* The one place numbers are right: this really is a sequence. */}
      <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {s.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative lg:before:absolute lg:before:top-[1.125rem] lg:before:left-12 lg:before:h-px lg:before:w-[calc(100%-2rem)] lg:before:bg-white/20 lg:last:before:hidden"
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand-teal font-extrabold text-ink">
              {index + 1}
            </span>
            <StepTitle className="mt-4 text-lg font-extrabold text-white">{step.title}</StepTitle>
            <p className="mt-1 text-light/80">{step.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Steps as a section of their own (Services page). */
export function StepsSection() {
  return (
    <section className="bg-navy py-16 text-light lg:py-20">
      <div className="container-x">
        <Steps level={2} />
      </div>
    </section>
  );
}
