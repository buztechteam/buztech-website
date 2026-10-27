import { useEffect, useRef, useState } from 'react';
import { certs } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { CertId } from '../i18n/types';
import { certIcons, Check, Close } from './icons';
import { btn, h2Class, leadClass } from './ui';

function CertDialog({ certId, onClose }: { certId: CertId | null; onClose: () => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  /* Keep the last certificate so the content does not vanish while the dialog closes. */
  const [shown, setShown] = useState<CertId>('iso9001');

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (certId) {
      setShown(certId);
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [certId]);

  const cert = certs.find((c) => c.id === shown) ?? certs[0];
  const copy = t.certs.items[cert.id];
  const Icon = certIcons[cert.id];
  const details = [
    { label: t.certs.standardLabel, value: cert.standard },
    cert.issuer ? { label: t.certs.issuer, value: cert.issuer } : null,
    cert.number ? { label: t.certs.number, value: cert.number } : null,
    cert.validUntil ? { label: t.certs.valid, value: cert.validUntil } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  return (
    <dialog
      ref={ref}
      className="cert-dialog"
      aria-labelledby="cert-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        /* a click on the backdrop lands on the <dialog> element itself */
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="surface-light max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.25rem] bg-light p-6 text-navy sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-14 place-items-center rounded-xl bg-navy text-brand-teal">
            <Icon className="size-7" />
          </span>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={t.a11y.close}
            className="grid size-11 place-items-center rounded-lg border border-navy/25 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <Close className="size-5" />
          </button>
        </div>

        <h3 id="cert-dialog-title" className="mt-5 text-4xl leading-tight font-extrabold">
          {cert.code}
        </h3>
        <p className="mt-1 text-xl font-extrabold text-navy/85">{copy.name}</p>
        <p className="mt-4 text-navy/85">{copy.summary}</p>

        <h4 className="mt-7 text-lg font-extrabold">{t.certs.benefitsTitle}</h4>
        <ul className="mt-3 space-y-2.5">
          {copy.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2.5">
              <Check className="mt-1 size-4 shrink-0 text-deep-teal" strokeWidth={3} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-7 grid gap-x-6 gap-y-3 border-t border-navy/15 pt-5 sm:grid-cols-2">
          {details.map((row) => (
            <div key={row.label}>
              <dt className="text-sm text-navy/75">{row.label}</dt>
              <dd className="font-extrabold">{row.value}</dd>
            </div>
          ))}
        </dl>

        {cert.file && (
          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn('outlineOnLight', 'sm')} mt-6`}
          >
            {t.certs.view}
          </a>
        )}
      </div>
    </dialog>
  );
}

export function Certifications() {
  const { t } = useLang();
  const [openId, setOpenId] = useState<CertId | null>(null);

  return (
    <section id="certifications" className="surface-light bg-light py-20 text-navy lg:py-28">
      <div className="container-x">
        <h2 className={h2Class}>{t.certs.heading}</h2>
        <p className={`${leadClass} text-navy/85`}>{t.certs.lead}</p>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {certs.map((cert) => {
            const Icon = certIcons[cert.id];
            const copy = t.certs.items[cert.id];
            return (
              <li key={cert.id}>
                <article className="flex h-full flex-col rounded-xl border border-navy/12 bg-white p-6">
                  <span className="grid size-12 place-items-center rounded-lg bg-navy text-brand-teal">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-3xl leading-tight font-extrabold">{cert.code}</h3>
                  <p className="mt-1 font-extrabold text-navy/85">{copy.name}</p>
                  <p className="mt-3 text-navy/85">{copy.summary}</p>
                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setOpenId(cert.id)}
                      className={btn('outlineOnLight', 'sm')}
                    >
                      {t.certs.details}
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <CertDialog certId={openId} onClose={() => setOpenId(null)} />
    </section>
  );
}
