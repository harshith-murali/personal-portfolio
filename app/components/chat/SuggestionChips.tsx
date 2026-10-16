"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Award, Briefcase, FileText, Send } from "lucide-react";
import { SuggestionChip } from "@/types/chat";

export const DEFAULT_SUGGESTIONS: SuggestionChip[] = [
  {
    id: "bharat-quest",
    label: "Tell me about Bharat Quest AI",
    prompt: "Tell me about your Bharat Quest AI offline classroom learning platform.",
  },
  {
    id: "techstack",
    label: "What tech stack do you use?",
    prompt: "What technologies and frameworks do you specialize in?",
  },
  {
    id: "ai-projects",
    label: "Show your AI projects",
    prompt: "What AI and machine learning projects have you built?",
  },
  {
    id: "resume",
    label: "Show your resume highlights",
    prompt: "Can you summarize your resume highlights and education background?",
  },
  {
    id: "hackathon",
    label: "Tell me about your hackathons",
    prompt: "Tell me about your hackathon wins and leadership events like CODEVERSE.",
  },
  {
    id: "current-role",
    label: "What are you working on now?",
    prompt: "What are you currently working on at Pranasya Technologies?",
  },
  {
    id: "hire",
    label: "How can I hire or contact Harshith?",
    prompt: "I want to hire Harshith or get in touch with him.",
  },
];

interface SuggestionChipsProps {
  onSelectSuggestion: (prompt: string) => void;
  suggestions?: SuggestionChip[];
  compact?: boolean;
}

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  onSelectSuggestion,
  suggestions = DEFAULT_SUGGESTIONS,
  compact = false,
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "py-1" : "py-2"}`}>
      {suggestions.map((chip, index) => (
        <motion.button
          key={chip.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.03, translateY: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectSuggestion(chip.prompt)}
          className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-300 border border-zinc-800/90 hover:border-cyan-500/40 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span>{chip.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
