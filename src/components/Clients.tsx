import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { Sectors } from './TrustStrip';
import { h2Class, leadClass } from './ui';

/** About page: who our clients are, by kind and country, and the sectors. No names until clients approve them. */
export function Clients() {
  const { t } = useLang();
  const c = t.clients;
  return (
    <section id="clients" className="surface-light bg-white py-20 text-navy lg:py-24">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{c.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{c.more}</p>
        <div {...revealProps(2)} className="mt-12">
          <h3 className="text-xl font-extrabold">{c.sectorsHeading}</h3>
          <div className="mt-5">
            <Sectors />
          </div>
        </div>
      </div>
    </section>
  );
}
