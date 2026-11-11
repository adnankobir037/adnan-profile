"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 47 + 13) % 100}%`,
  top: `${(index * 61 + 9) % 100}%`,
  delay: (index % 7) * 0.55,
  duration: 7 + (index % 5),
}));

export default function BlueprintGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="blueprint-background absolute inset-0 opacity-80" />
      <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-amber-400/[0.035] blur-3xl" />
      <div className="absolute -right-40 top-[45%] h-96 w-96 rounded-full bg-blue-400/[0.025] blur-3xl" />
      {!reduceMotion &&
        particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-amber-300/40"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -16, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
