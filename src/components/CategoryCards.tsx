import { brandNames, categories } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { CategoryId } from '../i18n/types';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight, categoryIcons } from './icons';
import { cardArrow, cardIcon, cardLink, h2Class, leadClass } from './ui';

/** The whole card is clickable through its title link (stretched with ::after), so the link name stays short. */
const cardBase =
  `group relative flex flex-col rounded-[1.25rem] border p-6 ${cardLink} sm:p-8 has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-deep-teal`;
const stretchedLink = 'after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none';

function CategoryCard({ id, index }: { id: CategoryId; index: number }) {
  const { lang, t } = useLang();
  const Icon = categoryIcons[id];
  const cat = t.products.categories[id];
  const names = brandNames(id);
  const flagship = id === 'licensing';

  return (
    <li
      {...revealProps(index)}
      className={`${cardBase} ${
        flagship
          ? 'border-navy bg-navy text-light hover:border-brand-teal lg:col-span-3 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10'
          : 'border-navy/12 bg-white text-navy hover:border-deep-teal'
      }`}
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className={`grid size-12 place-items-center rounded-lg ${cardIcon} ${flagship ? 'bg-white/8 text-brand-teal' : 'bg-navy text-brand-teal'}`}
          >
            <Icon className="size-6" />
          </span>
          {flagship && (
            <span className="rounded-md bg-brand-teal px-3 py-1 text-sm font-extrabold text-ink">{t.products.flagship}</span>
          )}
        </div>
        <h3 className={`mt-5 leading-tight font-extrabold ${flagship ? 'text-3xl text-white sm:text-4xl' : 'text-2xl'}`}>
          <a href={pagePath(id, lang)} className={stretchedLink}>
            {cat.label}
          </a>
        </h3>
        <p className={`mt-3 max-w-[34rem] ${flagship ? 'text-lg text-light/85' : 'text-navy/85'}`}>{cat.summary}</p>
      </div>

      <div
        className={`flex items-end justify-between gap-4 ${flagship ? 'mt-6 lg:mt-0 lg:flex-col lg:items-end' : 'mt-auto pt-6'}`}
      >
        <ul className={`flex flex-wrap gap-2 ${flagship ? 'lg:justify-end' : ''}`}>
          {names.map((name) => (
            <li
              key={name}
              className={`rounded-md border px-3 py-1.5 text-sm font-extrabold ${
                flagship ? 'border-brand-teal/70 text-white' : 'border-navy/15 text-navy'
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
        <ArrowRight
          className={`size-6 shrink-0 ${cardArrow} ${flagship ? 'text-brand-teal' : 'text-deep-teal'}`}
        />
      </div>
    </li>
  );
}

/** Home page: one card per product category, each leading to its page. Licensing is the flagship. */
export function CategoryCards() {
  const { t } = useLang();
  return (
    <section id="products" className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{t.products.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{t.products.lead}</p>
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} id={cat.id} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
