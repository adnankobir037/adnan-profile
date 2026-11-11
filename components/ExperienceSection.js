"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { hasContent } from "../lib/getData";

export default function ExperienceSection({ data }) {
  if (!Array.isArray(data) || !data.some(hasContent)) return null;

  return (
    <motion.section
      id="experience"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="experience" />
      <div className="space-y-4">
        {data.filter(hasContent).map((item, index) => (
          <article
            key={`${item.role || item.title || "experience"}-${index}`}
            className="card-surface rounded-lg border border-white/5 p-6 transition hover:border-amber-400/50 sm:p-7"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                {hasContent(item.role || item.title) && (
                  <h3 className="text-lg font-semibold text-white">
                    {item.role || item.title}
                  </h3>
                )}
                {hasContent(item.company || item.organization) && (
                  <p className="mt-2 text-slate-400">
                    {item.company || item.organization}
                  </p>
                )}
              </div>
              {hasContent(item.period || item.year) && (
                <span className="text-sm text-amber-300">
                  {item.period || item.year}
                </span>
              )}
            </div>
            {hasContent(item.description) && (
              <p className="mt-4 leading-7 text-slate-400">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </motion.section>
  );
}
