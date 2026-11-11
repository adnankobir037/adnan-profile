"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { hasContent } from "../lib/getData";

export default function AboutSection({ data }) {
  if (!hasContent(data)) return null;

  return (
    <motion.section
      id="about"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="about" />
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {hasContent(data.bio) && (
          <div className="card-surface rounded-lg border border-white/5 p-6 sm:p-8">
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              {data.bio}
            </p>
            {hasContent(data.location) && (
              <p className="mt-6 flex items-center gap-3 text-sm text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {data.location}
              </p>
            )}
          </div>
        )}
        {Array.isArray(data.stats) && data.stats.some(hasContent) && (
          <div className="grid grid-cols-2 gap-3">
            {data.stats.filter(hasContent).map((stat, index) => (
              <div
                key={`${stat.label || stat.value}-${index}`}
                className="card-surface rounded-lg border border-white/5 p-5 transition hover:border-amber-400/50"
              >
                {hasContent(stat.value) && (
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                )}
                {hasContent(stat.label) && (
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
