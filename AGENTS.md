# AGENTS.md

## Overview

This project uses Codex as an **agentic developer + designer** to build a **high-end animated portfolio website**.

Codex must operate using a **self-annealing process**, iteratively improving output until it reaches production quality.

---

## Core Responsibilities

Codex is responsible for:

* Extracting structured data from:

  * Resume (PDF)
  * LinkedIn
  * GitHub
  * LeetCode
* Designing a premium UI/UX
* Writing complete, production-ready code
* Ensuring performance, accessibility, and SEO

---

## Tech Stack (Strict)

* Next.js (latest, App Router)
* TypeScript
* Tailwind CSS
* ShadCN UI
* Framer Motion

---

## Required Sections

1. Hero (animated tagline + CTA)
2. About (from real data)
3. Skills (categorized)
4. Projects (from GitHub)
5. Experience / Education (timeline)
6. Achievements:

   * AWS Certified Cloud Practitioner (AWS CCP)
   * LeetCode stats
7. Contact (form + social links)

---

## Animation Guidelines

* Use Framer Motion for:

  * Page transitions
  * Scroll-based reveals (stagger, fade, slide)
  * Hover interactions
  * Animated navbar
  * Subtle parallax
* Avoid excessive or distracting motion

---

## Self-Annealing Workflow (MANDATORY)

Codex MUST follow this loop:

### 1. Draft Phase

* Generate full codebase + structure
* Implement all sections and base animations

### 2. Critique Phase

Evaluate:

* UI quality (premium or not)
* Animation smoothness
* Responsiveness
* Code structure and modularity
* Performance issues
* Accessibility (a11y)
* SEO completeness

### 3. Refinement Phase

* Improve design consistency and hierarchy
* Optimize animations (timing, easing)
* Refactor code for clarity and reuse
* Fix performance and accessibility issues

### 4. Iteration

* Repeat critique + refinement 2–3 times
* Each iteration must improve quality

### 5. Final Output

* Return ONLY the final refined result

---

## Design Principles

* Dark mode by default
* Clean, minimal, modern UI
* Strong typography and spacing
* Fully responsive (mobile-first)
* Subtle, smooth animations

---

## Features Checklist

* SEO (meta tags, OpenGraph)
* Fast performance
* Accessibility (semantic HTML, ARIA where needed)
* Reusable components
* Clean folder structure

---

## Enhancements (Required)

* Scroll progress indicator
* Active navbar highlight on scroll
* Back-to-top button
* Loading screen / skeletons
* Animated background (subtle)

---

## Output Requirements

Codex must provide:

1. Full project folder structure
2. All code files (complete)
3. Setup instructions (step-by-step commands)
4. Environment variables (if applicable)

---

## Rules

* Do NOT skip sections
* Do NOT provide partial implementations
* Do NOT use placeholder data if real data is available
* Follow modern Next.js App Router patterns (async APIs)

---

## Goal

Deliver a **top 1% portfolio website** with:

* Exceptional UI/UX
* Smooth, premium animations
* Clean, scalable code
* Real user data integration

This project should feel comparable to **Awwwards-level portfolios**.
