"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { hasContent } from "../lib/getData";

export default function CertificatesSection({ data }) {
  if (!Array.isArray(data) || !data.some(hasContent)) return null;

  return (
    <motion.section
      id="certificates"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="certificates" />
      <div className="grid gap-4 sm:grid-cols-2">
        {data.filter(hasContent).map((certificate, index) => (
          <article
            key={`${certificate.name || "certificate"}-${index}`}
            className="card-surface flex items-start gap-4 rounded-lg border border-white/5 p-5 transition hover:border-amber-400/50"
          >
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rotate-45 border border-amber-400" />
            <div>
              {hasContent(certificate.name) && (
                <h3 className="font-semibold text-white">{certificate.name}</h3>
              )}
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-400">
                {hasContent(certificate.issuer) && (
                  <span>{certificate.issuer}</span>
                )}
                {hasContent(certificate.year) && (
                  <span className="text-amber-300">{certificate.year}</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
