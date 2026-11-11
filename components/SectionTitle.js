import { displayLabel } from "../lib/getData";

export default function SectionTitle({ section, eyebrow }) {
  return (
    <div className="mb-9">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {displayLabel(section)}
        <span className="text-amber-400">.</span>
      </h2>
      <div className="section-rule mt-5 w-20" />
    </div>
  );
}
