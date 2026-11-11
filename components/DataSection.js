"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { displayLabel, formatValue, hasContent } from "../lib/getData";

function DataValue({ value }) {
  if (Array.isArray(value)) {
    const items = value.filter(hasContent);
    if (!items.length) return null;
    return (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded border border-white/5 bg-white/[0.02] px-4 py-3"
          >
            {typeof item === "object" ? (
              <DataRecord value={item} />
            ) : (
              formatValue(item)
            )}
          </li>
        ))}
      </ul>
    );
  }
  if (value && typeof value === "object") return <DataRecord value={value} />;
  return <p className="text-slate-300">{formatValue(value)}</p>;
}

function DataRecord({ value }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {Object.entries(value)
        .filter(([, item]) => hasContent(item))
        .map(([key, item]) => (
          <div key={key}>
            <dt className="mb-1 text-xs uppercase tracking-wider text-slate-500">
              {displayLabel(key)}
            </dt>
            <dd className="break-words text-sm text-slate-300">
              {Array.isArray(item) ? (
                <DataValue value={item} />
              ) : typeof item === "object" ? (
                <DataRecord value={item} />
              ) : (
                formatValue(item)
              )}
            </dd>
          </div>
        ))}
    </dl>
  );
}

export default function DataSection({ section, data }) {
  if (!hasContent(data)) return null;

  return (
    <motion.section
      id={section}
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section={section} />
      <div className="card-surface rounded-lg border border-white/5 p-6 sm:p-8">
        <DataValue value={data} />
      </div>
    </motion.section>
  );
}
