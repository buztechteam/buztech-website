import { categoryServices } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { CategoryId } from '../i18n/types';
import { pagePath, productPages } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight, categoryIcons } from './icons';
import { Steps } from './Services';
import { h2Class } from './ui';

/** Category page: the services that come with these products, then how we work. */
export function CategoryServices({ id }: { id: CategoryId }) {
  const { t } = useLang();
  /* In the mapping's order, so the category's own service leads. */
  const items = categoryServices[id].flatMap((sid) => t.services.items.filter((item) => item.id === sid));

  return (
    <section className="bg-navy py-16 text-light lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{t.services.heading}</h2>
        <ul className={`mt-8 grid gap-4 ${items.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {items.map((item, i) => (
            <li key={item.id} {...revealProps(i)} className="rounded-xl border border-white/12 bg-white/5 p-6">
              <h3 className="text-xl leading-snug font-extrabold text-white">{item.title}</h3>
              <p className="mt-2 text-light/85">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-white/12 pt-12">
          <Steps />
        </div>
      </div>
    </section>
  );
}

/** Links to the product categories: the other three on a category page, all four elsewhere (Services). */
export function OtherCategories({ current }: { current?: CategoryId }) {
  const { lang, t } = useLang();
  return (
    <section className="surface-light bg-white py-16 text-navy lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className="text-2xl leading-tight font-extrabold">{t.products.heading}</h2>
        <ul className={`mt-6 grid gap-4 ${current ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {productPages
            .filter((id) => id !== current)
            .map((id, i) => {
              const Icon = categoryIcons[id];
              const cat = t.products.categories[id];
              return (
                <li
                  key={id}
                  {...revealProps(i)}
                  className="group relative flex items-start gap-4 rounded-xl border border-navy/12 bg-light p-5 transition-colors hover:border-deep-teal has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-deep-teal"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-navy text-brand-teal">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg leading-snug font-extrabold">
                      <a
                        href={pagePath(id, lang)}
                        className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none"
                      >
                        {cat.label}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-navy/80">{cat.summary}</p>
                  </div>
                  <ArrowRight className="mt-1 size-5 shrink-0 text-deep-teal transition-transform group-hover:translate-x-1" />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
