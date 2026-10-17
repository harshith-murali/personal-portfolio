import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// Use a free-tier friendly default or allow environment override
const DEFAULT_HF_MODEL = process.env.HF_MODEL || "meta-llama/Llama-3.2-3B-Instruct";

// Extract raw text from public/profile.pdf
async function getPdfProfileText() {
  try {
    const pdfPath = path.join(process.cwd(), "public", "profile.pdf");
    if (fs.existsSync(pdfPath)) {
      const dataBuffer = fs.readFileSync(pdfPath);
      const pdfParseModule = require("pdf-parse");
      const pdfParse =
        typeof pdfParseModule === "function"
          ? pdfParseModule
          : pdfParseModule.default;
      if (typeof pdfParse === "function") {
        const parsed = await pdfParse(dataBuffer);
        return parsed.text;
      }
    }
  } catch (error) {
    console.error("Error reading/parsing profile.pdf:", error);
  }
  return null;
}

// Load structured profile fallback
function getProfileData(): any {
  try {
    const filePath = path.join(process.cwd(), "data", "profile.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading profile.json:", error);
    return null;
  }
}

// Save recruiter lead
function saveLead(leadData: {
  name: string;
  company: string;
  email: string;
  reason: string;
  notes?: string;
}) {
  try {
    const leadsPath = path.join(process.cwd(), "data", "leads.json");
    let leads: any[] = [];
    if (fs.existsSync(leadsPath)) {
      const content = fs.readFileSync(leadsPath, "utf8");
      leads = JSON.parse(content || "[]");
    }
    const newLead = {
      ...leadData,
      timestamp: new Date().toISOString(),
    };
    leads.push(newLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2), "utf8");
    console.log("Saved recruiter lead successfully:", newLead);
    return true;
  } catch (error) {
    console.error("Error saving lead:", error);
    return false;
  }
}

// Attempt to detect recruiter contact details from text
function detectAndSaveLead(text: string): string | null {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  const emailMatch = text.match(emailRegex);

  if (emailMatch) {
    const email = emailMatch[1];
    saveLead({
      name: "Website Visitor",
      company: "Inquired via Portfolio Chat",
      email: email,
      reason: "Direct outreach through AI Twin",
      notes: text,
    });
    return `\n\n*(Note: I've noted down your email address **${email}** and will reach out to you shortly!)*`;
  }
  return null;
}

// Intelligent Knowledge-Grounded Fallback Engine
// Generates articulate, first-person answers directly from profile.json when upstream LLMs are unavailable
function generateGroundedFallbackResponse(userPrompt: string, profile: any): string {
  const query = userPrompt.toLowerCase().trim();
  const info = profile?.personalInfo || {};
  const projects = profile?.projects || [];
  const experience = profile?.experience || [];
  const achievements = profile?.achievements || [];
  const skills = profile?.skills || [];

  // Check if user is leaving contact details
  const leadNotice = detectAndSaveLead(userPrompt) || "";

  // 1. Bharat Quest AI
  if (
    query.includes("bharat quest") ||
    query.includes("bharatquest") ||
    query.includes("classroom") ||
    query.includes("smartboard") ||
    query.includes("offline")
  ) {
    const bq = projects.find((p: any) => p.id === "bharat-quest");
    return (
      `**Bharat Quest AI** is an offline-first 3D educational learning game I built at Pranasya Technologies designed specifically for Indian classroom smartboards.\n\n` +
      `**Key Highlights & Architecture:**\n` +
      `• **Offline-First Resilience**: Runs entirely offline in classrooms using browser IndexedDB caching. Once network connectivity is restored, quiz attempts sync idempotently to PostgreSQL via \`ON CONFLICT (id) DO NOTHING\`, preventing any duplicate XP awarding.\n` +
      `• **3D Interactive Scene**: Built using React Three Fiber, Three.js, and Drei, featuring an animated 3D India map where a lion mascot drives between state checkpoints.\n` +
      `• **Python RAG Pipeline**: Engineered a 6-stage ingestion pipeline extracting NCERT Class 5–8 textbooks into a validated question bank with ChromaDB embeddings (all-MiniLM-L6-v2) and cosine similarity deduplication.\n` +
      `• **Fair Turn Scheduler**: Uses an algorithm prioritizing students who haven't had a turn, ensuring every child in the classroom gets to participate.\n\n` +
      `🔗 **Live Demo**: [bharat-quest-one.vercel.app](https://bharat-quest-one.vercel.app)\n` +
      `📦 **GitHub**: [github.com/harshith-murali/bharat-quest](https://github.com/harshith-murali/bharat-quest)${leadNotice}`
    );
  }

  // 2. Quantro
  if (
    query.includes("quantro") ||
    query.includes("stock") ||
    query.includes("portfolio") ||
    query.includes("backtest") ||
    query.includes("trading")
  ) {
    return (
      `**Quantro** is an AI-powered stock portfolio manager and backtesting platform tailored for the Indian stock market (NSE).\n\n` +
      `**Key Capabilities:**\n` +
      `• **SMA Crossover Backtesting Engine**: Deterministic quantitative simulation over historical OHLCV series computing Sharpe ratio, CAGR, win rate, and maximum drawdown (MDD).\n` +
      `• **Automated EOD Data Lake**: Scheduled GitHub Actions cron and AWS Lambda pipeline fetching end-of-day market data into an AWS S3 data lake at 5:30 PM IST post-market close.\n` +
      `• **AI Financial Advisor**: Natural language chat grounded in user portfolio holdings with Redis token-bucket rate limiting.\n` +
      `• **Simulated Trading & Fee Ledger**: Interactive trade execution with atomic wallet balance updates in PostgreSQL transactions and Excel (.xlsx) exports via SheetJS.\n\n` +
      `🔗 **Live Demo**: [quantro-landing.vercel.app](https://quantro-landing.vercel.app)\n` +
      `📦 **GitHub**: [github.com/harshith-murali/Quantro-AI-Portfolio-Manager](https://github.com/harshith-murali/Quantro-AI-Portfolio-Manager)${leadNotice}`
    );
  }

  // 3. WhatsApp Integration
  if (
    query.includes("whatsapp") ||
    query.includes("broadcast") ||
    query.includes("alert") ||
    query.includes("campaign")
  ) {
    return (
      `**WhatsApp Alert & Broadcast Platform** is an enterprise internal notification system built for scheduling, approving, and delivering WhatsApp campaigns at scale.\n\n` +
      `**Key Architectural Highlights:**\n` +
      `• **Granular 4-Tier RBAC**: Strict permissions for Super Admin, Admin, Operator, and Viewer roles with automatic PII phone masking (\`••••••1234\`) for non-privileged viewers.\n` +
      `• **Transactional Claim Locks**: Decoupled background worker daemon (\`message.worker.ts\`) using atomic MySQL claim locks (\`claimToken\` + TTL) to prevent duplicate sends across concurrent workers.\n` +
      `• **Exponential Backoff**: Multi-tier retry policy (30s / 2m / 10m) with deterministic mock testing suffixes (\`0001\` for instant success, \`0002\` for rate limits, \`0003\` for invalid numbers).\n` +
      `• **Hardened Security**: HttpOnly JWT cookies, CSRF tokens, Zod schema validation, and structured Winston logging.\n\n` +
      `🔗 **Live Demo**: [whatsapp-integration-iota.vercel.app](https://whatsapp-integration-iota.vercel.app)\n` +
      `📦 **GitHub**: [github.com/harshith-murali/whatsapp-integration](https://github.com/harshith-murali/whatsapp-integration)${leadNotice}`
    );
  }

  // 4. Sniply (URL Shortener)
  if (
    query.includes("sniply") ||
    query.includes("url shortener") ||
    query.includes("shortener") ||
    query.includes("redirect")
  ) {
    return (
      `**Sniply** is a high-performance, full-stack URL shortener and click analytics platform built with Next.js 16, React 19, and MongoDB.\n\n` +
      `**Key Highlights:**\n` +
      `• **Sub-20ms 307 Redirects**: Utilizes Next.js \`after()\` non-blocking background workers so redirects return immediately, deferring click telemetry, device parsing, and DB writes.\n` +
      `• **Rate Limiting**: Sliding-window rate limiters powered by Upstash Redis (\`@upstash/ratelimit\`) with fallback protection.\n` +
      `• **Custom Vanity Slugs**: Collision-proof alias resolution backed by MongoDB sparse unique indexes.\n` +
      `• **Comprehensive Analytics & QR Codes**: 30-day timeline charts, device/browser/referrer breakdowns with \`.lean()\` queries, and instant QR code generation.\n\n` +
      `🔗 **Live Demo**: [url-shortner-silk-nine.vercel.app](https://url-shortner-silk-nine.vercel.app)\n` +
      `📦 **GitHub**: [github.com/harshith-murali/Sniply-URL-Shortener](https://github.com/harshith-murali/Sniply-URL-Shortener)${leadNotice}`
    );
  }

  // 5. AlgoVisualiser / OS Simulator
  if (
    query.includes("algo") ||
    query.includes("os") ||
    query.includes("operating system") ||
    query.includes("simulator") ||
    query.includes("scheduling") ||
    query.includes("banker")
  ) {
    return (
      `**OS Algorithm Simulator** is an interactive visualizer built with Next.js 14, Tailwind CSS, Clerk, and Neon PostgreSQL for computer science students.\n\n` +
      `**Core Simulators:**\n` +
      `• **CPU Scheduling**: FCFS, SJF, SRTF, Round Robin (custom quantum), and Priority with an interactive, scrubbable Gantt playback engine computing turnaround and waiting times.\n` +
      `• **Page Replacement**: Frame-by-frame memory matrices for FIFO, LRU, and Optimal with hit/fault ratios and Belady's Anomaly analysis.\n` +
      `• **Disk Scheduling**: FCFS, SSTF, SCAN, C-SCAN, and LOOK tracking cylinder trajectory and total seek distance.\n` +
      `• **Banker's Algorithm**: Complete matrix safety checking and resource request evaluation for deadlock avoidance.\n\n` +
      `🔗 **Live Demo**: [algo-visualiser-xi.vercel.app](https://algo-visualiser-xi.vercel.app)\n` +
      `📦 **GitHub**: [github.com/harshith-murali/AlgoVisualiser](https://github.com/harshith-murali/AlgoVisualiser)${leadNotice}`
    );
  }

  // 6. Tech Stack & Skills
  if (
    query.includes("tech stack") ||
    query.includes("techstack") ||
    query.includes("technologies") ||
    query.includes("skills") ||
    query.includes("languages") ||
    query.includes("frameworks")
  ) {
    return (
      `Here is a summary of my technical toolkit:\n\n` +
      `• **Languages**: TypeScript, JavaScript, Python, C++, SQL\n` +
      `• **Frontend**: React 19/18, Next.js 15/14 (App Router), Vite, Tailwind CSS, Three.js, React Three Fiber, Framer Motion\n` +
      `• **Backend & APIs**: Node.js, Express.js, Fastify, REST APIs, Prisma ORM, JWT, RBAC\n` +
      `• **Databases & AI**: PostgreSQL, MySQL, MongoDB, ChromaDB (Vector DB), Claude API, Gemini API, OpenAI SDK\n` +
      `• **Cloud & DevOps**: AWS (Certified Cloud Practitioner — EC2, S3, Lambda, IAM), Docker, GitHub Actions CI/CD, Vercel\n` +
      `• **Core CS**: Data Structures & Algorithms (150+ LeetCode), Operating Systems, DBMS, Distributed Systems${leadNotice}`
    );
  }

  // 7. Projects Overview
  if (
    query.includes("projects") ||
    query.includes("portfolio") ||
    query.includes("what have you built")
  ) {
    return (
      `Here are my primary full-stack and AI projects:\n\n` +
      `1. **Bharat Quest AI**: Offline-first 3D smartboard quiz game with Python RAG & Three.js ([Demo](https://bharat-quest-one.vercel.app))\n` +
      `2. **Quantro**: AI stock portfolio manager & deterministic SMA backtesting engine ([Demo](https://quantro-landing.vercel.app))\n` +
      `3. **WhatsApp Broadcast Platform**: Enterprise campaign delivery engine with transactional claim locks ([Demo](https://whatsapp-integration-iota.vercel.app))\n` +
      `4. **Sniply**: URL shortener with sub-20ms redirects and Upstash Redis rate limiting ([Demo](https://url-shortner-silk-nine.vercel.app))\n` +
      `5. **OS Algorithm Simulator**: Interactive CPU, memory, and disk scheduling visualizer ([Demo](https://algo-visualiser-xi.vercel.app))\n\n` +
      `Feel free to ask me for a deeper dive into the architecture of any of these!${leadNotice}`
    );
  }

  // 8. Experience & Background
  if (
    query.includes("experience") ||
    query.includes("work") ||
    query.includes("pranasya") ||
    query.includes("job")
  ) {
    return (
      `**Current Role:**\n` +
      `I work as a **Full Stack Developer at Pranasya Technologies, Bangalore** (Aug 2026 - Present).\n\n` +
      `**Key Contributions:**\n` +
      `• Architected **Bharat Quest AI**, an offline-first classroom learning platform with a Python RAG pipeline extracting NCERT textbooks into ChromaDB, a Fastify + PostgreSQL backend, and a 3D Three.js smartboard interface.\n` +
      `• Engineered the **WhatsApp Broadcast Platform** with a 4-tier RBAC system, worker daemon utilizing transactional MySQL claim locks to eliminate duplicate sends, and API hardening (JWT cookies, CSRF, idempotency keys).${leadNotice}`
    );
  }

  // 9. Education & CGPA
  if (
    query.includes("education") ||
    query.includes("college") ||
    query.includes("bmsce") ||
    query.includes("cgpa") ||
    query.includes("marks") ||
    query.includes("degree")
  ) {
    return (
      `**Education:**\n` +
      `• **Degree**: B.E. in Computer Science & Engineering (2024 - 2028)\n` +
      `• **Institution**: BMS College of Engineering (BMSCE), Bangalore\n` +
      `• **Academic Standing**: **8.92 / 10 CGPA** (3rd Year)\n` +
      `• **Relevant Coursework**: Data Structures & Algorithms, Object-Oriented Programming (C++), Operating Systems, Database Management Systems, Computer Networks, Software Engineering.\n` +
      `• **Leadership**: Student Activity Coordinator for BMSCE IEEE Student Branch and Event Head for CodeSphere (PhaseShift 2025).${leadNotice}`
    );
  }

  // 10. Resume & Highlights
  if (
    query.includes("resume") ||
    query.includes("highlight") ||
    query.includes("summary") ||
    query.includes("cv")
  ) {
    return (
      `**Harshith M — Resume Highlights:**\n\n` +
      `• **Profile**: 3rd-year CS undergrad at BMS College of Engineering with an **8.92 CGPA** and production experience at Pranasya Technologies.\n` +
      `• **AWS Certified Cloud Practitioner** (2026).\n` +
      `• **Hackathon Winner**: 1st Place at CODEVERSE 24-hour Hackathon.\n` +
      `• **Problem Solving**: 150+ problems solved on LeetCode ([geekycoder11](https://leetcode.com/u/geekycoder11)).\n` +
      `• **Leadership**: Event Head for CodeSphere (PhaseShift 2025) hosting 300+ participant teams in collaboration with GeeksforGeeks.\n` +
      `• **Production Systems**: Shipped Bharat Quest AI, Quantro, WhatsApp Broadcast Platform, and Sniply.\n\n` +
      `You can also download my full resume PDF directly using the **Resume** button in the navbar!${leadNotice}`
    );
  }

  // 11. Achievements & Hackathons
  if (
    query.includes("hackathon") ||
    query.includes("achievement") ||
    query.includes("award") ||
    query.includes("certification") ||
    query.includes("aws") ||
    query.includes("leetcode")
  ) {
    return (
      `**Key Achievements & Certifications:**\n\n` +
      `• 🏆 **1st Place — CODEVERSE 24-hour Hackathon** (BMSCE IEEE Computer Society, 2025): Developed an end-to-end full-stack prototype under strict 24-hour time limits.\n` +
      `• ☁️ **AWS Certified Cloud Practitioner** (2026): Validated foundational proficiency in AWS cloud architecture, security, IAM, VPC, S3, and serverless compute.\n` +
      `• 💻 **150+ LeetCode Problems Solved**: Solid grounding in algorithmic problem solving across trees, graphs, dynamic programming, and systems.\n` +
      `• 🎯 **Event Head — CodeSphere**: Led BMSCE's flagship 24-hour global codeathon during PhaseShift 2025 with 300+ teams and GeeksforGeeks platform sponsorship.${leadNotice}`
    );
  }

  // 12. Contact / Hiring / Recruiter
  if (
    query.includes("hire") ||
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("interview") ||
    query.includes("reach") ||
    query.includes("recruiter") ||
    query.includes("internship")
  ) {
    return (
      `I am actively open to **Full-Stack Web Development, Frontend, and AI/Systems Engineering internship or role opportunities**!\n\n` +
      `**Direct Contact Details:**\n` +
      `• 📧 **Email**: [mharshith200@gmail.com](mailto:mharshith200@gmail.com)\n` +
      `• 📱 **Phone**: +91-7204621805\n` +
      `• 💼 **LinkedIn**: [linkedin.com/in/harshith-m-dev](https://linkedin.com/in/harshith-m-dev)\n` +
      `• 🐙 **GitHub**: [github.com/harshith-murali](https://github.com/harshith-murali)\n` +
      `• 📍 **Location**: Bangalore, India\n\n` +
      `Feel free to share your **Name, Company, and Email** right here in this chat, and I'll make sure it's logged and follow up with you promptly!${leadNotice}`
    );
  }

  // Default introductory / general response
  return (
    `Hi there! I am Harshith M's AI Digital Twin embedded on his portfolio website.\n\n` +
    `I can answer any questions about my:\n` +
    `• **Projects**: Bharat Quest AI, Quantro, WhatsApp Broadcast Platform, Sniply, or AlgoVisualiser\n` +
    `• **Production Experience**: Full Stack Developer at Pranasya Technologies\n` +
    `• **Education**: 3rd-year CS at BMSCE (8.92 CGPA)\n` +
    `• **Technical Stack**: Next.js, React, TypeScript, Python, AWS, PostgreSQL, Three.js\n` +
    `• **Resume & Contact Details**: Opportunities, hackathon wins, and certifications\n\n` +
    `What would you like to know more about?${leadNotice}`
  );
}

// Stream text cleanly with realistic micro-delays
function streamTextResponse(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Chunk into smaller word blocks
      const words = text.split(" ");
      for (let i = 0; i < words.length; i += 3) {
        const slice = words.slice(i, i + 3).join(" ") + (i + 3 < words.length ? " " : "");
        controller.enqueue(encoder.encode(slice));
        await new Promise((res) => setTimeout(res, 25));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

const recruiterTool: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "save_recruiter_lead",
    description:
      "Call this tool when a recruiter, hiring manager, or visitor expresses interest in hiring, interviewing, or contacting Harshith, and provides their contact details (name, company, email, reason).",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the recruiter or contact person.",
        },
        company: {
          type: "string",
          description: "The company or organization name.",
        },
        email: {
          type: "string",
          description: "The contact email address.",
        },
        reason: {
          type: "string",
          description:
            "Reason for reaching out (e.g., job offer, internship, project collaboration, interview request).",
        },
        notes: {
          type: "string",
          description: "Any additional details provided by the visitor.",
        },
      },
      required: ["name", "company", "email", "reason"],
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const lastUserMessage =
      [...messages].reverse().find((m: any) => m.role === "user")?.content || "";

    const profileData = getProfileData();
    const pdfText = await getPdfProfileText();
    const profileJsonString = profileData
      ? JSON.stringify(profileData, null, 2)
      : "";

    // Check available AI API providers
    // Prioritize Groq (free, high-speed) or Hugging Face Router
    const groqKey = process.env.GROQ_API_KEY;
    const hfKey = process.env.HF_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    let aiClient: OpenAI | null = null;
    let selectedModel = DEFAULT_HF_MODEL;

    if (groqKey) {
      aiClient = new OpenAI({
        apiKey: groqKey,
        baseURL: "https://api.groq.com/openai/v1",
      });
      selectedModel = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
    } else if (openaiKey) {
      aiClient = new OpenAI({
        apiKey: openaiKey,
      });
      selectedModel = process.env.OPENAI_MODEL || "gpt-4o-mini";
    } else if (hfKey) {
      aiClient = new OpenAI({
        apiKey: hfKey,
        baseURL: "https://router.huggingface.co/v1",
      });
      selectedModel = process.env.HF_MODEL || DEFAULT_HF_MODEL;
    }

    // If no external API key is set, immediately serve intelligent grounded fallback
    if (!aiClient) {
      console.log("No AI provider API key found. Using intelligent grounded fallback engine.");
      const fallbackResponse = generateGroundedFallbackResponse(lastUserMessage, profileData);
      return streamTextResponse(fallbackResponse);
    }

    const systemPrompt = `You are Harshith M's AI Digital Twin embedded on his portfolio website.
You speak directly as Harshith in the first person ("I", "my projects", "my experience", "my CGPA is 8.92", etc.).

PRIMARY TRUTH SOURCE (Uploaded Profile Document):
<truth_source_pdf>
${pdfText || "No PDF parsed; see fallback JSON below."}
</truth_source_pdf>

SUPPLEMENTARY KNOWLEDGE BASE:
<knowledge_base>
${profileJsonString}
</knowledge_base>

STRICT RULES & CONSTRAINTS:
1. Always speak directly as Harshith M. Be warm, professional, articulate, modern, and tech-savvy.
2. Answer questions accurately based ONLY on the provided primary truth source (profile.pdf) and knowledge base about your background, skills, experience, projects, resume, certifications, education, hackathons, and contact details.
3. IF ASKED SOMETHING UNKNOWN or not specified in your truth source, ALWAYS answer politely that you don't have that specific information in your records.
4. NEVER hallucinate, guess, or invent any experience, projects, skills, or background not explicitly present in your truth source.
5. If a visitor asks to hire you, contact you, get in touch, or requests an interview, politely ask for their details (Name, Company, Email, and Reason for contacting). When they provide these, USE THE 'save_recruiter_lead' tool to save their details.
6. Keep responses concise, well-structured, and easy to read. Use bullet points where appropriate.`;

    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
      [
        { role: "system", content: systemPrompt },
        ...messages.map(
          (msg: { role: string; content: string }) =>
            ({
              role: msg.role === "assistant" ? "assistant" : "user",
              content: msg.content,
            }) as OpenAI.Chat.Completions.ChatCompletionMessageParam
        ),
      ];

    const encoder = new TextEncoder();

    // Attempt upstream stream; on any upstream error (e.g. 402 out of credits), fallback gracefully without showing error
    try {
      const responseStream = await aiClient.chat.completions.create({
        model: selectedModel,
        max_tokens: 1024,
        messages: formattedMessages,
        tools: [recruiterTool],
        stream: true,
      });

      const stream = new ReadableStream({
        async start(controller) {
          try {
            const toolCalls: Record<
              number,
              { id: string; name: string; arguments: string }
            > = {};

            for await (const chunk of responseStream) {
              const delta = chunk.choices[0]?.delta;

              if (delta?.content) {
                controller.enqueue(encoder.encode(delta.content));
              }

              if (delta?.tool_calls) {
                for (const tc of delta.tool_calls) {
                  const idx = tc.index;
                  if (!toolCalls[idx]) {
                    toolCalls[idx] = {
                      id: tc.id || "",
                      name: tc.function?.name || "",
                      arguments: "",
                    };
                  }
                  if (tc.function?.name) {
                    toolCalls[idx].name = tc.function.name;
                  }
                  if (tc.function?.arguments) {
                    toolCalls[idx].arguments += tc.function.arguments;
                  }
                }
              }
            }

            // Handle tool call execution if the model triggered a tool
            for (const call of Object.values(toolCalls)) {
              if (call.name === "save_recruiter_lead") {
                try {
                  const input = JSON.parse(call.arguments) as {
                    name: string;
                    company: string;
                    email: string;
                    reason: string;
                    notes?: string;
                  };
                  const saved = saveLead(input);
                  if (saved) {
                    const confirmation = `\n\n[System: Thank you ${input.name}! Your inquiry from ${input.company} has been received. I've stored your contact info (${input.email}) and will get back to you promptly!]`;
                    controller.enqueue(encoder.encode(confirmation));
                  }
                } catch (parseErr) {
                  console.error("Error parsing tool call arguments:", parseErr);
                }
              }
            }

            controller.close();
          } catch (innerErr: any) {
            console.warn("Upstream stream reading failed; switching to grounded fallback:", innerErr?.message);
            // Fall back gracefully within the stream rather than printing an error
            const fallbackText = generateGroundedFallbackResponse(lastUserMessage, profileData);
            controller.enqueue(encoder.encode(fallbackText));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    } catch (createErr: any) {
      console.warn("Upstream completion initialization failed (e.g. 402/429/quota). Falling back seamlessly:", createErr?.message);
      // Seamlessly fall back without showing an error to the user
      const fallbackResponse = generateGroundedFallbackResponse(lastUserMessage, profileData);
      return streamTextResponse(fallbackResponse);
    }
  } catch (error: any) {
    console.error("Chat API route fatal error:", error);
    const profileData = getProfileData();
    const fallbackResponse = generateGroundedFallbackResponse("hello", profileData);
    return streamTextResponse(fallbackResponse);
  }
}
