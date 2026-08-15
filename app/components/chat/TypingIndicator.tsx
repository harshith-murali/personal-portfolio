"use client";

import React from "react";
import { motion } from "framer-motion";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-3 bg-zinc-900/80 border border-zinc-800/80 rounded-2xl w-fit max-w-[80%] shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white text-xs font-bold mr-1">
        AI
      </div>
      <div className="flex items-center space-x-1.5 px-1 py-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};
