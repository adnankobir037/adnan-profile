"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { displayLabel, hasContent } from "../lib/getData";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroSection({ data }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", setProgress);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-10 flex min-h-[760px] scroll-mt-24 items-center pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="order-2 lg:order-1"
        >
          {hasContent(data.title) && (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-amber-400">
              {data.title}
            </p>
          )}
          {hasContent(data.name) && (
            <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {data.name}
              <span className="text-amber-400">.</span>
            </h1>
          )}
          {hasContent(data.tagline) && (
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              {data.tagline}
            </p>
          )}
          {hasContent(data.cvUrl) && (
            <a
              href={data.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded border border-amber-400/60 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-navy"
            >
              {data.cvLabel || displayLabel("cv")}
            </a>
          )}
        </motion.div>
        <div className="order-1 relative min-h-[320px] lg:order-2">
          <HeroScene progress={progress} />
          {hasContent(data.photo) && (
            <img
              src={data.photo}
              alt={data.name || ""}
              className="absolute bottom-5 right-4 h-20 w-20 rounded-full border border-amber-400/50 object-cover shadow-amber sm:bottom-8 sm:right-8 sm:h-24 sm:w-24"
            />
          )}
        </div>
      </div>
      <span className="absolute bottom-8 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-gradient-to-b from-amber-400/70 to-transparent sm:block" />
    </section>
  );
}
