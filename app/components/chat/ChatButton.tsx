"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

export const ChatButton: React.FC<ChatButtonProps> = ({
  onClick,
  isOpen,
  unreadCount = 0,
}) => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <motion.button
        onClick={onClick}
        aria-label={isOpen ? "Close AI Twin Chat" : "Open AI Twin Chat"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-zinc-950/90 text-white border border-cyan-500/40 shadow-2xl backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      >
        {/* Idle Pulsing Glow Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 opacity-40 blur-md group-hover:opacity-75 animate-pulse transition duration-500" />

        {/* Inner Gradient Circle */}
        <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 group-hover:border-cyan-400/60 transition-colors">
          <Bot className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />

          {/* Sparkle Floating Badge */}
          <span className="absolute -top-1 -right-1 p-1 rounded-full bg-cyan-500 text-zinc-950 shadow-md">
            <Sparkles className="w-3 h-3" />
          </span>
        </div>

        {/* Tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-100 text-xs font-medium border border-zinc-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Ask Harshith&apos;s AI Twin ⚡
        </span>
      </motion.button>
    </div>
  );
};
