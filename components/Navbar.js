"use client";

import { useState } from "react";
import { displayLabel, hasContent } from "../lib/getData";

export default function Navbar({ data, sections }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = sections.filter((section) => section !== "hero");

  if (!hasContent(data.meta?.siteTitle) && links.length === 0) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-navy/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {hasContent(data.meta?.siteTitle) && (
          <a
            href="#top"
            className="max-w-[70%] truncate text-sm font-bold tracking-wide text-white sm:max-w-none"
          >
            {data.meta.siteTitle}
          </a>
        )}
        {links.length > 0 && (
          <button
            type="button"
            className="rounded border border-white/10 px-3 py-2 text-xs uppercase tracking-widest text-slate-300 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
        )}
        {links.length > 0 && (
          <div
            className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-white/10 bg-navy px-5 py-3 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
          >
            {links.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="py-2 text-sm text-slate-400 transition hover:text-amber-400 md:py-0"
                onClick={() => setMenuOpen(false)}
              >
                {displayLabel(section)}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
