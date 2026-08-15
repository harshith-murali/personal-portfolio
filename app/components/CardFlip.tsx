"use client";

import { ArrowRight, ExternalLink, GitBranch, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Project } from "@/types/index";

export interface ProjectCardFlipProps {
  project: Project;
}

export default function ProjectCardFlip({ project }: ProjectCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[380px] w-full max-w-[360px] [perspective:1200px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-transform duration-300 ease-out",
          "motion-reduce:transition-none",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT OF CARD */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl p-6 flex flex-col justify-between",
            "bg-gradient-to-b from-zinc-900 via-zinc-900 to-black light:from-zinc-50 light:via-zinc-100 light:to-white",
            "border border-zinc-800 light:border-zinc-300",
            "shadow-xl light:shadow-md",
            "transition-colors duration-200",
            "group-hover:border-cyan-500/50 light:group-hover:border-amber-500/60"
          )}
        >
          {/* Subtle Background Accent */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-start justify-center pt-20 pointer-events-none opacity-30"
          >
            <div className="h-[120px] w-[220px] rounded-full bg-cyan-500/10 blur-2xl" />
          </div>

          {/* Front Header */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              {project.featured ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 light:bg-amber-500/10 light:text-amber-700 light:border-amber-500/30">
                  <Sparkles className="w-3 h-3 mr-1 text-cyan-400 light:text-amber-600" />
                  Featured
                </span>
              ) : (
                <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                  Project
                </span>
              )}
            </div>

            <h3 className="font-bold text-xl text-zinc-100 light:text-zinc-900 leading-snug tracking-tight group-hover:text-cyan-400 light:group-hover:text-amber-700 transition-colors">
              {project.title}
            </h3>

            <p className="line-clamp-5 text-xs sm:text-sm text-zinc-400 light:text-zinc-600 leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Front Footer */}
          <div className="relative z-10 pt-4 border-t border-zinc-800/80 light:border-zinc-200 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center space-x-1.5 overflow-hidden">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] bg-zinc-800/80 light:bg-zinc-200 text-zinc-300 light:text-zinc-700 border border-zinc-700/60 light:border-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[10px] text-zinc-500">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6 flex flex-col justify-between",
            "bg-gradient-to-b from-zinc-900 via-zinc-950 to-black light:from-zinc-100 light:to-white",
            "border border-zinc-700 light:border-zinc-300",
            "shadow-2xl light:shadow-xl"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 light:border-zinc-200 pb-3">
              <h3 className="font-bold text-lg text-zinc-100 light:text-zinc-900 tracking-tight">
                {project.title}
              </h3>
              <span className="text-[10px] uppercase font-semibold text-cyan-400 light:text-amber-600 tracking-wider">
                Tech Stack
              </span>
            </div>

            {/* Tech Stack List */}
            <div className="space-y-2 max-h-[180px] overflow-y-auto scrollbar-none pr-1">
              {project.technologies.map((tech, index) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 text-xs font-medium text-zinc-300 light:text-zinc-700"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3 w-3 text-cyan-400 light:text-amber-600 flex-shrink-0"
                  />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links on Back */}
          <div className="pt-4 border-t border-zinc-800 light:border-zinc-200 flex flex-col space-y-2">
            <div className="flex items-center justify-between gap-2">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold",
                    "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md transition-all",
                    "light:from-amber-500 light:to-amber-700 light:hover:from-amber-400 light:hover:to-amber-600"
                  )}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold",
                  "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all",
                  "light:bg-zinc-900 light:hover:bg-zinc-800 light:text-white light:border-zinc-900"
                )}
              >
                <span>GitHub Code</span>
                <GitBranch className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
