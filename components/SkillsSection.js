"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { hasContent } from "../lib/getData";

export default function SkillsSection({ data }) {
  if (!Array.isArray(data) || !data.some(hasContent)) return null;

  return (
    <motion.section
      id="skills"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="skills" />
      <div className="grid gap-5 md:grid-cols-2">
        {data.filter(hasContent).map((group, groupIndex) => (
          <article
            key={`${group.group || "skills"}-${groupIndex}`}
            className="card-surface rounded-lg border border-white/5 p-6 sm:p-7"
          >
            {hasContent(group.group) && (
              <h3 className="mb-6 text-lg font-semibold text-white">
                {group.group}
              </h3>
            )}
            <div className="space-y-5">
              {Array.isArray(group.items) &&
                group.items.filter(hasContent).map((skill, index) => {
                  const level = Number.isFinite(Number(skill.level))
                    ? Math.max(0, Math.min(100, Number(skill.level)))
                    : 0;

                  return (
                    <div key={`${skill.name || "skill"}-${index}`}>
                      <div className="mb-2 flex justify-between gap-4 text-sm">
                        {hasContent(skill.name) && (
                          <span className="text-slate-300">{skill.name}</span>
                        )}
                        {hasContent(skill.level) && (
                          <span className="text-amber-300">{skill.level}%</span>
                        )}
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/70">
                        <motion.div
                          className="h-full rounded-full bg-amber-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.85, delay: index * 0.06 }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
