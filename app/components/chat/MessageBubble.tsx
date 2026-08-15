"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Bot, User, ExternalLink } from "lucide-react";
import { ChatMessage } from "@/types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
}

// Markdown parser helper for formatting assistant responses
function renderMarkdown(content: string) {
  // Process code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const firstLineEnd = part.indexOf("\n");
      let language = "code";
      let code = "";

      if (firstLineEnd !== -1) {
        language = part.slice(3, firstLineEnd).trim() || "code";
        code = part.slice(firstLineEnd + 1, -3).trim();
      } else {
        code = part.slice(3, -3).trim();
      }

      return (
        <CodeBlock key={index} language={language} code={code} />
      );
    }

    // Process inline formatting (bold, links, bullet points, inline code)
    const lines = part.split("\n");
    return (
      <div key={index} className="space-y-1.5">
        {lines.map((line, lIdx) => {
          if (!line.trim()) return <div key={lIdx} className="h-1.5" />;

          // Bullet points
          const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*");
          const lineText = isBullet ? line.trim().replace(/^[•\-\*]\s*/, "") : line;

          return (
            <div
              key={lIdx}
              className={isBullet ? "flex items-start space-x-2 pl-1" : ""}
            >
              {isBullet && (
                <span className="text-cyan-400 mt-1 text-[10px]">•</span>
              )}
              <span className="leading-relaxed">
                {parseInlineFormatting(lineText)}
              </span>
            </div>
          );
        })}
      </div>
    );
  });
}

function parseInlineFormatting(text: string) {
  // Regex to match markdown links [label](url), bold **bold**, inline code `code`
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);

  return tokens.map((token, i) => {
    if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const match = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const [, label, url] = match;
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5 transition-colors"
          >
            {label}
            <ExternalLink className="w-3 h-3 inline ml-0.5" />
          </a>
        );
      }
    }

    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={i} className="font-semibold text-zinc-100">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-300 text-[11px] font-mono border border-zinc-700/60"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    return token;
  });
}

const CodeBlock: React.FC<{ language: string; code: string }> = ({
  language,
  code,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 rounded-xl border border-zinc-800 bg-zinc-950/90 overflow-hidden text-xs shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900/90 border-b border-zinc-800/80 text-zinc-400">
        <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 text-zinc-200 font-mono text-[11px] overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start space-x-2.5 my-3 ${
        isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mt-0.5 text-xs font-semibold shadow-md ${
          isUser
            ? "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white"
            : "bg-zinc-900 border border-cyan-500/30 text-cyan-400"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Bubble Container */}
      <div className="group relative max-w-[85%] sm:max-w-[80%] flex flex-col">
        <div
          className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-cyan-900/20"
              : "bg-zinc-900/90 text-zinc-200 border border-zinc-800/90 backdrop-blur-md rounded-tl-none"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="space-y-1">{renderMarkdown(message.content)}</div>
          )}
        </div>

        {/* Footer info: timestamp & copy button */}
        <div
          className={`flex items-center space-x-2 mt-1 text-[10px] text-zinc-500 px-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span>{message.timestamp}</span>
          {!isUser && (
            <button
              onClick={handleCopyMessage}
              aria-label="Copy AI response"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-cyan-400 flex items-center gap-0.5"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
