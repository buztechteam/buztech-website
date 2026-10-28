import { useLang } from '../i18n/LanguageContext';
import { h2Class, leadClass } from './ui';

/** `intro={false}` when the page's PageIntro already shows the heading and lead. */
export function Services({ intro = true }: { intro?: boolean }) {
  const { t } = useLang();
  const s = t.services;
  return (
    <section id="services" className="bg-navy py-20 text-light lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          {intro && (
            <>
              <h2 className={`${h2Class} text-white`}>{s.heading}</h2>
              <p className={`${leadClass} text-light/85`}>{s.lead}</p>
            </>
          )}

          <dl className={`${intro ? 'mt-10' : ''} border-b border-white/15`}>
            {s.facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline gap-5 border-t border-white/15 py-4">
                <dd className="order-1 w-24 shrink-0 text-4xl leading-none font-extrabold text-white">{fact.value}</dd>
                <dt className="order-2 text-light/85">{fact.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ul className="divide-y divide-white/15 border-y border-white/15 lg:col-span-8">
          {s.items.map((item) => (
            <li key={item.id} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <h3 className="text-xl leading-snug font-extrabold text-white">{item.title}</h3>
              <p className="text-light/85">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-16 lg:mt-24">
        <Steps />
      </div>
    </section>
  );
}

/** "How we work", for navy sections (Services and the category pages). */
export function Steps() {
  const { t } = useLang();
  const s = t.services;
  return (
    <>
      <h3 className="text-2xl font-extrabold text-white">{s.stepsHeading}</h3>
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
            <h4 className="mt-4 text-lg font-extrabold text-white">{step.title}</h4>
            <p className="mt-1 text-light/80">{step.text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
