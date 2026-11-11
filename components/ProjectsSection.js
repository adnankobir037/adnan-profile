"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { hasContent } from "../lib/getData";

export default function ProjectsSection({ data }) {
  if (!Array.isArray(data) || !data.some(hasContent)) return null;

  return (
    <motion.section
      id="projects"
      className="scroll-mt-28 py-20 sm:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle section="projects" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.filter(hasContent).map((project, index) => (
          <article
            key={`${project.title || "project"}-${index}`}
            className="card-surface group flex flex-col overflow-hidden rounded-lg border border-white/5 transition duration-300 hover:-translate-y-1 hover:border-amber-400/50"
          >
            {hasContent(project.image) && (
              <img
                src={project.image}
                alt={project.title || ""}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                {hasContent(project.title) && (
                  <h3 className="text-lg font-semibold leading-snug text-white">
                    {project.title}
                  </h3>
                )}
                {hasContent(project.type) && (
                  <span className="shrink-0 rounded border border-amber-400/20 px-2 py-1 text-xs text-amber-300">
                    {project.type}
                  </span>
                )}
              </div>
              {hasContent(project.description) && (
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>
              )}
              {hasContent(project.role) && (
                <p className="mt-4 text-sm text-slate-300">{project.role}</p>
              )}
              {Array.isArray(project.tools) && project.tools.some(hasContent) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tools.filter(hasContent).map((tool, toolIndex) => (
                    <span
                      key={`${tool}-${toolIndex}`}
                      className="rounded bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
              {hasContent(project.link) && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 text-sm font-medium text-amber-300 transition group-hover:text-amber-200"
                >
                  {project.linkLabel || project.title}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
