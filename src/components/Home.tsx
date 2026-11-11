import { equipment, ideahubImage } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref, pagePath } from '../routes';
import { BoardIllustration } from './BoardIllustration';
import { ArrowRight } from './icons';
import { btn, cardArrow, cardLink, h2Class, leadClass } from './ui';

/** Home page: Microsoft 365 leads, so it gets the dark panel and the plan line-up before anything else. */
export function M365Teaser() {
  const { lang, t } = useLang();
  const m = t.home.m365;
  return (
    <section className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x">
        <div className="grid gap-10 rounded-[1.25rem] bg-navy p-6 text-light sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-12">
          <div className="flex flex-col items-start">
            <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{m.heading}</h2>
            <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{m.lead}</p>
            <div {...revealProps(2)} className="mt-8 flex flex-wrap gap-3">
              <a href={pagePath('microsoft-365', lang)} className={`${btn('primary')} gap-2`}>
                {m.compare}
                <ArrowRight className="size-5" />
              </a>
              <a href={inquireHref('m365', lang)} className={btn('ghostOnDark')}>
                {t.cta}
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
      </div>
    </section>
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
              src={ideahubImage}
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

/**
 * Home page: the owner's own line ("we are friends after they buy from us") beside a real photo,
 * with what staying in touch means in practice. Leads to Services.
 */
export function AfterSale() {
  const { lang, t } = useLang();
  return (
    <section className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <img
          {...revealProps(0)}
          src="/events/people-960.webp"
          srcSet="/events/people-480.webp 480w, /events/people-960.webp 960w"
          sizes="(min-width: 1024px) 36rem, 100vw"
          alt={t.home.friends.photoAlt}
          width={960}
          height={720}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] h-auto w-full rounded-[1.25rem] bg-navy/10 object-cover"
        />
        <div>
          <h2 {...revealProps(1)} className={h2Class}>{t.home.friends.heading}</h2>
          <p {...revealProps(2)} className={`${leadClass} text-navy/85`}>{t.services.lead}</p>
          <a {...revealProps(3)} href={pagePath('services', lang)} className={`${btn('outlineOnLight')} mt-8 gap-2`}>
            {t.nav.services}
            <ArrowRight className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
