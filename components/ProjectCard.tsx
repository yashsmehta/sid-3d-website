"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "100px" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block relative aspect-[16/10] rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:border-white/20"
        style={{ backgroundColor: "#111119" }}
      >
        {/* Gradient background — vivid */}
        <div
          className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${project.color}55 0%, transparent 60%),
              radial-gradient(ellipse at 80% 80%, ${project.color}33 0%, transparent 50%),
              linear-gradient(135deg, ${project.color}22 0%, transparent 100%)
            `,
          }}
        />

        {/* Subtle noise/texture feel via inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />

        {/* Category badge top-left */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{
              color: project.color,
              backgroundColor: `${project.color}18`,
              border: `1px solid ${project.color}44`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Hover arrow top-right */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Bottom overlay with text */}
        <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 z-10">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-display leading-tight">
                {project.title}
              </h3>
              <span className="text-sm text-white/40 font-mono mt-1 block">
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
