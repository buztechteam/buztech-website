import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { categories, productMeta, site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { Building, Mail, Phone, Pin } from './icons';
import { btn, h2Class, leadClass } from './ui';

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error';
interface Errors {
  company?: string;
  email?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  'mt-2 w-full rounded-lg border border-navy/30 bg-white px-4 py-3 text-base text-navy placeholder:text-navy/55 aria-invalid:border-2 aria-invalid:border-navy';

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm font-extrabold text-navy">
      <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-navy text-xs text-white">
        !
      </span>
      {children}
    </p>
  );
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/8 text-brand-teal">{icon}</span>
      <div>
        <dt className="text-sm text-light/75">{label}</dt>
        <dd className="text-lg font-extrabold text-white">{children}</dd>
      </div>
    </div>
  );
}

const linkOnDark =
  'underline decoration-brand-teal decoration-2 underline-offset-4 transition-colors hover:text-brand-teal';

export function Contact({ inquiry, onPrivacy }: { inquiry: { product: string; nonce: number }; onPrivacy: () => void }) {
  const { t, lang } = useLang();
  const c = t.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [product, setProduct] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  /* A product card's button pre-selects that product here. */
  useEffect(() => {
    if (inquiry.product) setProduct(inquiry.product);
  }, [inquiry]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    /* Honeypot: real visitors never see or fill this field. */
    if (String(data.get('website') ?? '') !== '') {
      setStatus('success');
      return;
    }

    const company = String(data.get('company') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const productName = product === 'other' ? 'Other' : product;

    const next: Errors = {};
    if (!company) next.company = c.required;
    if (!email) next.email = c.required;
    else if (!EMAIL_PATTERN.test(email)) next.email = c.invalidEmail;
    setErrors(next);
    if (next.company) {
      companyRef.current?.focus();
      return;
    }
    if (next.email) {
      emailRef.current?.focus();
      return;
    }

    const endpoint = site.web3formsKey ? 'https://api.web3forms.com/submit' : site.formEndpoint;
    if (endpoint) {
      setStatus('sending');
      try {
        const payload = site.web3formsKey
          ? {
              access_key: site.web3formsKey,
              subject: `${c.mailSubject} — ${company}`,
              from_name: `${site.name} website`,
              replyto: email,
              company,
              email,
              product: productName || '-',
              message: message || '-',
              language: lang,
              botcheck: '',
            }
          : { company, email, product: productName, message, language: lang };
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        formRef.current?.reset();
        setProduct('');
        setStatus('success');
      } catch {
        setStatus('error');
      }
      return;
    }

    /* No endpoint configured: hand the request to the visitor's email app. */
    const body = [`${c.fields.company}: ${company}`, `${c.fields.email}: ${email}`, `${c.fields.product}: ${productName || '-'}`, '', message].join('\n');
    const subject = `${c.mailSubject} — ${company}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  };

  return (
    <section id="contact" className="bg-navy py-20 text-light lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className={`${h2Class} text-white`}>{c.heading}</h2>
          <p className={`${leadClass} text-light/85`}>{c.lead}</p>

          <dl className="mt-10 space-y-6">
            <InfoRow icon={<Building className="size-5" />} label={c.entity}>
              {site.legalName}
            </InfoRow>
            <InfoRow icon={<Pin className="size-5" />} label={c.location}>
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={linkOnDark}>
                {c.address}
              </a>
            </InfoRow>
            <InfoRow icon={<Phone className="size-5" />} label={c.phone}>
              <a href={site.phoneHref} className={linkOnDark}>
                {site.phone}
              </a>
            </InfoRow>
            <InfoRow icon={<Mail className="size-5" />} label={c.email}>
              <a href={`mailto:${site.email}`} className={`${linkOnDark} break-all`}>
                {site.email}
              </a>
            </InfoRow>
          </dl>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className="surface-light rounded-[1.25rem] bg-light p-6 text-navy sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="font-extrabold">
                {c.fields.company}
              </label>
              <input
                ref={companyRef}
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                placeholder={c.placeholders.company}
                aria-invalid={errors.company ? true : undefined}
                aria-describedby={errors.company ? 'company-error' : undefined}
                className={fieldClass}
              />
              {errors.company && <FieldError id="company-error">{errors.company}</FieldError>}
            </div>

            <div>
              <label htmlFor="email" className="font-extrabold">
                {c.fields.email}
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder={c.placeholders.email}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={fieldClass}
              />
              {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="product" className="font-extrabold">
              {c.fields.product}
            </label>
            <select
              id="product"
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={fieldClass}
            >
              <option value="">{c.selectPlaceholder}</option>
              {categories.map((cat) => (
                <optgroup key={cat.id} label={t.products.categories[cat.id].label}>
                  {cat.products.map((id) => (
                    <option key={id} value={productMeta[id].name}>
                      {productMeta[id].name}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value="other">{c.other}</option>
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="font-extrabold">
              {c.fields.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={c.placeholders.message}
              className={`${fieldClass} resize-y`}
            />
          </div>

          {/* honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p className="mt-5 text-sm text-navy/80">
            {c.privacyNote}{' '}
            <button type="button" onClick={onPrivacy} aria-haspopup="dialog" className="font-extrabold underline decoration-deep-teal decoration-2 underline-offset-4">
              {c.privacyLink}
            </button>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`${btn('primaryOnLight')} disabled:opacity-60`}
            >
              {status === 'sending' ? c.status.sending : t.cta}
            </button>
            <p role="status" aria-live="polite" className="min-h-6 flex-1 font-extrabold">
              {status === 'success' && c.status.success}
              {status === 'mailto' && c.status.mailto}
              {status === 'error' && c.status.error}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
