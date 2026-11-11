"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { displayLabel, hasContent } from "../lib/getData";

function normalizedPhone(value) {
  return String(value).replace(/[^\d+]/g, "");
}

export default function ContactSection({ data }) {
  if (!hasContent(data)) return null;
  const entries = Object.entries(data).filter(
    ([key, value]) => key !== "social" && hasContent(value),
  );

  return (
    <motion.section
      id="contact"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="contact" />
      <div className="card-surface grid gap-4 rounded-lg border border-white/5 p-6 sm:grid-cols-2 sm:p-8">
        {entries.map(([key, value]) => {
          const href =
            key.toLowerCase() === "email"
              ? `mailto:${value}`
              : ["phone", "whatsapp"].includes(key.toLowerCase())
                ? `tel:${normalizedPhone(value)}`
                : null;

          return (
            <div key={key} className="rounded border border-white/5 p-4">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                {displayLabel(key)}
              </p>
              {href ? (
                <a className="break-all text-slate-200 hover:text-amber-300" href={href}>
                  {String(value)}
                </a>
              ) : (
                <p className="text-slate-200">{String(value)}</p>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
