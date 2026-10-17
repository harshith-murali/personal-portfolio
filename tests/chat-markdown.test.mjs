import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/chat-markdown.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;
const { remarkTablesToSections } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const render = (content) => renderToStaticMarkup(React.createElement(Markdown, {
  remarkPlugins: [remarkGfm, remarkTablesToSections],
}, content));

const table = "| Project | Role | Highlights |\n| --- | --- | --- |\n| **Bharat Quest AI** | Full-stack developer | Offline learning |\n| Quantro | Developer | Portfolio insights |";

test("replaces every table row with a heading and labeled bullets", () => {
  const html = render(table);
  assert.doesNotMatch(html, /<table|<tr|<td|<th/);
  assert.match(html, /<h3><strong>Bharat Quest AI<\/strong><\/h3>/);
  assert.match(html, /<h3>Quantro<\/h3>/);
  assert.match(html, /<li><strong>Role<\/strong>: Full-stack developer<\/li>/);
  assert.match(html, /<li><strong>Highlights<\/strong>: Offline learning<\/li>/);
});

test("preserves links, emphasis, escaped pipes, and inline code", () => {
  const html = render("| Project | Stack | Demo |\n| --- | --- | --- |\n| Bharat Quest | **Python** and `React` \\| Three.js | [Live demo](https://example.com) |");
  assert.match(html, /<strong>Python<\/strong>/);
  assert.match(html, /<code>React<\/code> \| Three.js/);
  assert.match(html, /href="https:\/\/example.com"/);
});

test("converts tables nested inside blockquotes", () => {
  const html = render(table.split("\n").map(line => `> ${line}`).join("\n"));
  assert.match(html, /<blockquote>/);
  assert.match(html, /<h3>Quantro<\/h3>/);
  assert.doesNotMatch(html, /<table/);
});

test("handles every streaming prefix without rendering table elements", () => {
  for (let length = 1; length <= table.length; length++) {
    assert.doesNotMatch(render(table.slice(0, length)), /<table|<tr|<td|<th/);
  }
});

test("preserves ordinary headings, bullets, and fenced code", () => {
  const html = render("### Tech stack\n\n- **Frontend:** React\n\n```text\n| A | B |\n| --- | --- |\n```");
  assert.match(html, /<h3>Tech stack<\/h3>/);
  assert.match(html, /<li><strong>Frontend:<\/strong> React<\/li>/);
  assert.match(html, /<pre><code class="language-text">\| A \| B \|/);
});
