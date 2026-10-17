"use client";

import React, { isValidElement, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, ExternalLink } from "lucide-react";

export function ChatMarkdown({ content }: { content: string }) {
  return (
    <div className="min-w-0 leading-7 [overflow-wrap:anywhere]
      [&_p]:my-3 [&>:first-child]:mt-0 [&>:last-child]:mb-0
      [&_h1]:text-base [&_h2]:text-base [&_h3]:text-sm
      [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold
      [&_h4]:font-semibold [&_h5]:font-semibold [&_h6]:font-semibold
      [&_h1]:text-zinc-50 [&_h2]:text-zinc-50 [&_h3]:text-cyan-300
      [&_h1]:mt-5 [&_h2]:mt-5 [&_h3]:mt-4
      [&_h1]:mb-2 [&_h2]:mb-2 [&_h3]:mb-2
      [&_strong]:font-semibold [&_strong]:text-zinc-50
      [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2
      [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2
      [&_li]:pl-1 [&_li::marker]:text-cyan-400 [&_li>p]:my-1
      [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-cyan-500/50
      [&_blockquote]:pl-3 [&_blockquote]:text-zinc-400
      [&_hr]:my-4 [&_hr]:border-zinc-700">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        disallowedElements={["img"]}
        components={{
          a: ({ href, children }) => href ? (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="text-cyan-400 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">
              {children}<ExternalLink aria-hidden="true" className="ml-1 inline h-3 w-3" />
            </a>
          ) : <span>{children}</span>,
          table: ({ children }) => (
            <div role="region" aria-label="Response table" tabIndex={0}
              className="my-4 max-w-full overflow-x-auto rounded-lg border border-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">
              <table className="w-full border-collapse text-left text-xs leading-5">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border-b border-zinc-700 bg-zinc-800 px-3 py-2 align-top font-semibold text-zinc-100">{children}</th>,
          td: ({ children }) => <td className="border-b border-zinc-800 px-3 py-2 align-top">{children}</td>,
          code: ({ children, className }) => (
            <code className={className || "rounded border border-zinc-700/60 bg-zinc-800 px-1 py-0.5 font-mono text-xs text-cyan-300"}>{children}</code>
          ),
          pre: ({ children }) => {
            if (!isValidElement<{ children?: React.ReactNode; className?: string }>(children)) {
              return <pre className="overflow-x-auto">{children}</pre>;
            }
            const language = /language-(\S+)/.exec(children.props.className || "")?.[1] || "code";
            return <CodeBlock language={language} code={String(children.props.children ?? "").replace(/\n$/, "")} />;
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
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

