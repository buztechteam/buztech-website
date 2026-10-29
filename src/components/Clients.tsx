import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { Pin } from './icons';
import { h2Class, leadClass } from './ui';

/**
 * Named clients, typeset (no logos yet). White instead of Light so it reads as a pair
 * with the ISO certificates section that follows.
 */
export function Clients() {
  const { t } = useLang();
  const c = t.clients;
  return (
    <section id="clients" className="surface-light bg-white py-20 text-navy lg:py-28">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{c.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{c.lead}</p>

        <div className="mt-12 space-y-10">
          {c.groups.map((group) => (
            <div key={group.country}>
              <h3 {...revealProps(0)} className="flex items-center gap-2 text-xl font-extrabold">
                <Pin className="size-5 text-deep-teal" />
                {group.country}
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <li key={item.name} {...revealProps(i)} className="rounded-xl border border-navy/12 bg-light p-5">
                    <p className="text-lg leading-snug font-extrabold">{item.name}</p>
                    <p className="mt-1 text-sm text-navy/75">{item.sector}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p {...revealProps(0)} className="mt-10 max-w-[48rem] text-navy/85">{c.more}</p>
      </div>
    </section>
  );
}
