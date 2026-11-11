"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { hasContent } from "../lib/getData";

export default function EducationSection({ data }) {
  if (!Array.isArray(data) || !data.some(hasContent)) return null;

  return (
    <motion.section
      id="education"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="education" />
      <div className="space-y-4">
        {data.filter(hasContent).map((item, index) => (
          <article
            key={`${item.degree || item.institute || "education"}-${index}`}
            className="card-surface relative rounded-lg border border-white/5 p-6 pl-8 transition hover:border-amber-400/50 sm:p-7 sm:pl-9"
          >
            <span className="absolute bottom-0 left-0 top-0 w-0.5 rounded bg-amber-400/70" />
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                {hasContent(item.degree) && (
                  <h3 className="text-lg font-semibold text-white">
                    {item.degree}
                  </h3>
                )}
                {hasContent(item.institute) && (
                  <p className="mt-2 text-slate-400">{item.institute}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {hasContent(item.year) && (
                  <span className="rounded bg-white/5 px-3 py-1 text-slate-300">
                    {item.year}
                  </span>
                )}
                {hasContent(item.result) && (
                  <span className="rounded border border-amber-400/20 px-3 py-1 text-amber-300">
                    {item.result}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
