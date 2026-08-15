"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        100
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSendMessage(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-3 bg-zinc-950/90 border-t border-zinc-800/80 rounded-b-2xl sm:rounded-b-3xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-end rounded-xl bg-zinc-900/90 border border-zinc-800/90 focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/40 transition-all duration-200 p-1.5">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Harshith's Digital Twin..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent py-1.5 pl-2.5 pr-2 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none resize-none max-h-24 scrollbar-none disabled:opacity-50"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || disabled}
            aria-label="Send Message"
            className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-900/30 focus:outline-none mb-0.5"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
      <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-zinc-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className="flex items-center gap-1 text-cyan-400/80">
          <Sparkles className="w-2.5 h-2.5" /> AI Digital Twin
        </span>
      </div>
    </div>
  );
};
