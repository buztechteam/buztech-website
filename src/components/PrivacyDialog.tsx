import { useEffect, useRef } from 'react';
import { site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { Close } from './icons';

export function PrivacyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const p = t.privacy;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="cert-dialog"
      aria-labelledby="privacy-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="surface-light max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.25rem] bg-light p-6 text-navy sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 id="privacy-dialog-title" className="text-3xl leading-tight font-extrabold">
            {p.title}
          </h3>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={t.a11y.close}
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-navy/25 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
          >
            <Close className="size-5" />
          </button>
        </div>
        <p className="mt-4 text-navy/85">{p.intro}</p>

        {p.sections.map((s) => (
          <section key={s.heading}>
            <h4 className="mt-6 text-lg font-extrabold">{s.heading}</h4>
            <p className="mt-2 text-navy/85">{s.body}</p>
          </section>
        ))}

        {site.analytics && p.analyticsOn && <p className="mt-6 text-navy/85">{p.analyticsOn}</p>}

        <p className="mt-8 border-t border-navy/15 pt-4 text-sm text-navy/75">
          {site.legalName} · {site.email} · {p.updated}
        </p>
      </div>
    </dialog>
  );
}
