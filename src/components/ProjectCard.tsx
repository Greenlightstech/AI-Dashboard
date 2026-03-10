"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const tagColors: Record<string, string> = {
  "Next.js": "bg-white/10 text-white",
  React: "bg-sky-500/15 text-sky-400",
  Python: "bg-yellow-500/15 text-yellow-400",
  TensorFlow: "bg-orange-500/15 text-orange-400",
  AI: "bg-purple-500/15 text-purple-400",
  Rust: "bg-orange-600/15 text-orange-300",
  WebAssembly: "bg-violet-500/15 text-violet-400",
  Cryptography: "bg-emerald-500/15 text-emerald-400",
  Go: "bg-cyan-500/15 text-cyan-400",
  CLI: "bg-gray-500/15 text-gray-300",
  "Data Pipeline": "bg-blue-500/15 text-blue-400",
  Mapbox: "bg-blue-500/15 text-blue-400",
  Tailwind: "bg-teal-500/15 text-teal-400",
  "Claude API": "bg-amber-500/15 text-amber-400",
  "Framer Motion": "bg-pink-500/15 text-pink-400",
};

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  if (project.isPlaceholder) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
        className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02]"
      >
        <div className="flex flex-col items-center gap-3 opacity-30">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-muted"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="text-sm font-medium text-text-muted">Coming Soon</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      onClick={onClick}
      className="group relative flex aspect-[4/3] cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] text-left transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View details for ${project.title}`}
    >
      {/* Background image */}
      {project.images?.[0] && (
        <div className="absolute inset-0">
          <Image
            src={project.images[0]}
            alt={`${project.title} hero`}
            fill
            className="object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        {/* Status indicator */}
        {project.status && (
          <div className="mb-auto flex items-center gap-1.5">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                project.status === "Completed" ? "bg-accent" : "bg-yellow-400"
              }`}
            />
            <span className="text-xs font-medium text-text-muted">{project.status}</span>
          </div>
        )}

        <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {project.title}
        </h3>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  tagColors[tag] || "bg-white/10 text-white/70"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
      </div>
    </motion.button>
  );
}
