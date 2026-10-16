"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Code, Briefcase, GraduationCap, Award, Mail } from "lucide-react";
import { SuggestionChips } from "./SuggestionChips";

interface WelcomeScreenProps {
  onSelectSuggestion: (prompt: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSelectSuggestion,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-start justify-center p-5 space-y-5 my-auto"
    >
      {/* Bot Icon Hero Graphic */}
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/30 text-cyan-400 shadow-inner">
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">
            Hi! I&apos;m Harshith&apos;s AI Digital Twin 👋
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Powered by Harshith&apos;s profile &amp; verified portfolio data.
          </p>
        </div>
      </div>

      {/* Capabilities Box */}
      <div className="w-full p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300 space-y-2.5 backdrop-blur-sm">
        <p className="font-semibold text-zinc-200 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          You can ask me about:
        </p>
        <div className="grid grid-cols-2 gap-2 text-zinc-400 pt-1">
          <div className="flex items-center space-x-2">
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>Projects &amp; Demos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Skills &amp; Tech Stack</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Experience &amp; Leadership</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Hackathons &amp; AWS CCP</span>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>BMSCE &amp; CGPA (8.92)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-purple-400" />
            <span>Recruiter &amp; Hiring Info</span>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="w-full space-y-2">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Suggested Questions:
        </p>
        <SuggestionChips onSelectSuggestion={onSelectSuggestion} />
      </div>
    </motion.div>
  );
};
