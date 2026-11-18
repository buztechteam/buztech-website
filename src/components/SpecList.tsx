import { Check } from './icons';

/** A checked list: what a plan, product or service includes. */
export function SpecList({ specs, iconClass, className = 'mt-5' }: { specs: string[]; iconClass: string; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {specs.map((spec) => (
        <li key={spec} className="flex gap-2.5">
          <Check className={`mt-1 size-4 shrink-0 ${iconClass}`} strokeWidth={3} />
          {/* min-w-0: a long Georgian word (დუბლირებული) wraps instead of widening a narrow phone page. */}
          <span className="min-w-0 break-words">{spec}</span>
        </li>
      ))}
    </ul>
  );
}
