"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MouseEffectCardProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  topText?: string;
  topSubtext?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  footerText?: string;
  ariaLabel?: string;
  skillsList?: string[];
}

export default function MouseEffectCard({
  className,
  children,
  title = "Technical Skills",
  subtitle,
  topText,
  topSubtext,
  primaryCtaText,
  primaryCtaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
  footerText,
  ariaLabel,
  skillsList,
}: MouseEffectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    cardRef.current?.style.setProperty("--spot-opacity", "1");
  };

  const handleMouseLeave = () => {
    cardRef.current?.style.setProperty("--spot-opacity", "0");
  };

  return (
    <Card
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-black p-0 shadow-xl transition-all duration-300 hover:border-cyan-500/50 light:border-zinc-300 light:bg-white",
        className
      )}
    >
      <CardContent
        aria-label={ariaLabel ?? `${title} — ${subtitle}`}
        className="relative min-h-[320px] w-full overflow-hidden p-6 flex flex-col justify-between"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={cardRef}
        style={
          {
            "--spot-opacity": 0,
            "--spot-x": "50%",
            "--spot-y": "50%",
          } as React.CSSProperties
        }
      >
        {/* Cursor-follow spotlight, pure CSS var — no JS animation loop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: "var(--spot-opacity)",
            background:
              "radial-gradient(220px circle at var(--spot-x) var(--spot-y), rgb(34 211 238 / 0.18), transparent 70%)",
          }}
        />

        {topText && (
          <div className="absolute top-4 left-6 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-black/80 blur-md light:bg-white/80" />
              <div className="relative flex flex-col gap-0.5">
                <p className="font-bold text-xs text-cyan-400 light:text-amber-700 uppercase tracking-wider">
                  {topText}
                </p>
                {topSubtext && (
                  <p className="font-medium text-[10px] text-zinc-400 light:text-zinc-600">
                    {topSubtext}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col justify-between space-y-6 pt-6">
          <div className="space-y-2">
            <div className="relative">
              <h3 className="relative font-bold text-xl text-zinc-100 dark:text-white light:text-zinc-900 tracking-tight">
                {title}
              </h3>
            </div>
            {subtitle && (
              <p className="relative text-xs text-zinc-400 light:text-zinc-600">
                {subtitle}
              </p>
            )}
          </div>

          {skillsList && skillsList.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-2 py-2">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-zinc-900/90 light:bg-zinc-100 text-zinc-200 light:text-zinc-800 text-xs font-medium rounded-full border border-zinc-800 light:border-zinc-300 hover:border-cyan-500/60 light:hover:border-amber-600 transition-all duration-200 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {children}

          {(primaryCtaText || secondaryCtaText) && (
            <div className="mt-4 flex items-center gap-3 relative z-10">
              {primaryCtaText && (
                <Button asChild className="rounded-full shadow-lg text-xs" size="sm">
                  <a
                    href={primaryCtaUrl || "#"}
                    onClick={(e) => {
                      if (!primaryCtaUrl || primaryCtaUrl === "#") {
                        e.preventDefault();
                      }
                    }}
                  >
                    {primaryCtaText}
                  </a>
                </Button>
              )}
              {secondaryCtaText && (
                <Button
                  asChild
                  className="rounded-full text-xs"
                  size="sm"
                  variant="outline"
                >
                  <a
                    href={secondaryCtaUrl || "#"}
                    onClick={(e) => {
                      if (!secondaryCtaUrl || secondaryCtaUrl === "#") {
                        e.preventDefault();
                      }
                    }}
                  >
                    {secondaryCtaText}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {footerText && (
          <div className="relative z-10 pt-4 border-t border-zinc-800/80 light:border-zinc-200">
            <p className="font-medium text-[11px] text-zinc-500 light:text-zinc-600">
              {footerText}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
