import { categories, m365Apps, productImages, productMeta } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { CategoryId, ProductId } from '../i18n/types';
import { inquireHref } from '../routes';
import { BoardIllustration } from './BoardIllustration';
import { revealProps } from '../motion/reveal';
import { Check } from './icons';
import { btn } from './ui';

function SpecList({ specs, iconClass }: { specs: string[]; iconClass: string }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {specs.map((spec) => (
        <li key={spec} className="flex gap-2.5">
          <Check className={`mt-1 size-4 shrink-0 ${iconClass}`} strokeWidth={3} />
          <span>{spec}</span>
        </li>
      ))}
    </ul>
  );
}

/** Flagship: Microsoft 365 leads the mix, so it gets its own dark panel. */
function FlagshipM365() {
  const { lang, t } = useLang();
  const copy = t.products.items.m365;
  return (
    <article {...revealProps(0)} className="grid gap-8 rounded-[1.25rem] bg-navy p-6 text-light sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:p-10">
      <div className="flex flex-col items-start">
        <span className="rounded-md bg-brand-teal px-3 py-1 text-sm font-extrabold text-ink">
          {t.products.flagship}
        </span>
        <h3 className="mt-5 text-4xl leading-tight font-extrabold text-white sm:text-5xl">Microsoft 365</h3>
        <p className="mt-3 max-w-[30rem] text-lg text-light/85">{copy.tagline}</p>
        <SpecList specs={copy.specs} iconClass="text-brand-teal" />

        <p className="mt-7 text-sm text-light/75">{t.products.plansLabel}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {t.products.plans.map((plan) => (
            <li key={plan} className="rounded-md border border-brand-teal/70 px-3 py-1.5 text-sm font-extrabold text-white">
              {plan}
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-[30rem] text-sm text-light/75">{t.products.planNote}</p>

        <a href={inquireHref(productMeta.m365.name, lang)} className={`${btn('primary')} mt-8`}>
          {t.cta}
        </a>
      </div>

      <ul className="grid grid-cols-2 content-center gap-3 sm:grid-cols-3">
        {m365Apps.map((app) => (
          <li
            key={app}
            className="grid aspect-[4/3] place-items-center rounded-lg border border-white/12 bg-white/6 px-2 text-center text-lg font-extrabold text-white"
          >
            {app}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProductCard({ id, index }: { id: ProductId; index: number }) {
  const { lang, t } = useLang();
  const meta = productMeta[id];
  const copy = t.products.items[id];
  return (
    <article {...revealProps(index)} className="flex flex-col rounded-xl border border-navy/12 bg-white p-6 transition-colors hover:border-deep-teal">
      <h3 className="text-2xl leading-tight font-extrabold text-navy">{meta.name}</h3>
      {meta.line && <p className="mt-0.5 text-navy/75">{meta.line}</p>}
      <p className="mt-3 text-navy/85">{copy.tagline}</p>
      <SpecList specs={copy.specs} iconClass="text-deep-teal" />
      <div className="mt-auto pt-7">
        <a href={inquireHref(meta.name, lang)} className={btn('outlineOnLight', 'sm')}>
          {t.cta}
        </a>
      </div>
    </article>
  );
}

/** Wide card for a category with a single product. */
function FeaturedProduct({ id, index }: { id: ProductId; index: number }) {
  const { lang, t } = useLang();
  const meta = productMeta[id];
  const copy = t.products.items[id];
  const image = productImages[id];
  return (
    <article {...revealProps(index)} className="grid overflow-hidden rounded-[1.25rem] border border-navy/12 bg-white lg:grid-cols-2">
      <div className="flex flex-col items-start p-6 sm:p-8 lg:p-10">
        <h3 className="text-3xl leading-tight font-extrabold text-navy sm:text-4xl">{meta.name}</h3>
        <p className="mt-3 max-w-[28rem] text-lg text-navy/85">{copy.tagline}</p>
        <SpecList specs={copy.specs} iconClass="text-deep-teal" />
        <a href={inquireHref(meta.name, lang)} className={`${btn('primaryOnLight')} mt-8`}>
          {t.cta}
        </a>
      </div>
      <div className="grid place-items-center bg-navy p-6 sm:p-8 lg:p-10">
        {image ? (
          <img src={image} alt={meta.name} loading="lazy" className="max-h-72 w-auto object-contain" />
        ) : (
          <BoardIllustration className="h-auto w-full max-w-sm" />
        )}
      </div>
    </article>
  );
}

const gridClass: Record<CategoryId, string> = {
  licensing: 'mt-5 grid gap-5 md:grid-cols-2',
  servers: 'grid gap-5 md:grid-cols-3',
  networking: 'grid gap-5 md:grid-cols-2',
  workspaces: 'grid gap-5',
};

/** The products of one category. */
function CategoryPanel({ id }: { id: CategoryId }) {
  const { t } = useLang();
  const category = categories.find((c) => c.id === id) ?? categories[0];
  return (
    <>
      {id === 'licensing' && <FlagshipM365 />}

      <div className={gridClass[id]}>
        {category.products
          .filter((product) => !(id === 'licensing' && product === 'm365'))
          .map((product, i) =>
            id === 'workspaces' ? (
              <FeaturedProduct key={product} id={product} index={i} />
            ) : (
              <ProductCard key={product} id={product} index={i} />
            ),
          )}
      </div>

      {id === 'servers' && (
        <ul {...revealProps(0)} className="mt-5 flex flex-wrap gap-x-8 gap-y-3 rounded-xl border border-navy/12 bg-white px-6 py-4 font-extrabold">
          {t.products.serversNote.map((note) => (
            <li key={note} className="flex items-center gap-2.5">
              <Check className="size-4 shrink-0 text-deep-teal" strokeWidth={3} />
              {note}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Body of a category page; its title and summary sit in the page's PageIntro. */
export function ProductCategory({ id }: { id: CategoryId }) {
  return (
    <section className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x">
        <CategoryPanel id={id} />
      </div>
    </section>
  );
}
