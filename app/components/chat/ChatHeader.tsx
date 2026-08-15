"use client";

import React from "react";
import { Sparkles, X, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl rounded-t-2xl sm:rounded-t-3xl">
      <div className="flex items-center space-x-3">
        {/* Avatar with pulse ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          {/* Online status indicator badge */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-950"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-sm font-semibold text-zinc-100 tracking-wide">
              AI Digital Twin
            </h3>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-2.5 h-2.5 mr-0.5" />
              Verified Twin
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-zinc-400">
            <span>Ask me anything about Harshith</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              ● Online
            </span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        aria-label="Close AI Chat"
        className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      >
        <X className="w-5 h-5" />
      </motion.button>
    </div>
  );
};
