import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

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
function getProfileData() {
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

    const groqApiKey = process.env.GROQ_API_KEY?.trim();

    if (!groqApiKey) {
      return NextResponse.json(
        {
          error:
            "AI chat is not configured. Set GROQ_API_KEY in Vercel's Production environment variables and redeploy.",
        },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: groqApiKey,
      baseURL: "https://api.groq.com/openai/v1",
      timeout: 20000,
      maxRetries: 1,
    });
    const modelName = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-20b";

    // Load PDF truth source & JSON backup
    const pdfText = await getPdfProfileText();
    const profileData = getProfileData();
    const profileJsonString = profileData
      ? JSON.stringify(profileData, null, 2)
      : "";

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
3. IF ASKED SOMETHING UNKNOWN or not specified in your truth source, ALWAYS answer exactly: "I don't have enough information to answer that."
4. NEVER hallucinate, guess, or invent any experience, projects, skills, or background not explicitly present in your truth source.
5. If a visitor asks to hire you, contact you, get in touch, or requests an interview, politely ask for their details (Name, Company, Email, and Reason for contacting). When they provide these, USE THE 'save_recruiter_lead' tool to save their details, and confirm to them that their message has been logged and you will respond to their email promptly.
6. Format every reply as clean Markdown for a narrow chat window. Start with a brief direct answer. For longer project explanations, use short headings (### Overview, ### Tech stack, ### Highlights) separated by blank lines.
7. Use normal paragraphs for prose and '- ' only for actual list items. Never prefix a heading, paragraph, or blank line with a bullet. Write bold text with balanced pairs of double asterisks, such as **Frontend**.
8. Never use tables, pipe-separated columns, or side-by-side layouts, even for comparisons or when a visitor requests a table. Use clear headings and concise labeled bullets instead (for example '- **Frontend:** React and Three.js.'). For multiple projects or a comparison, give each item its own heading followed by bullets with consistent labels. Every reply must fit a mobile chat window without horizontal scrolling.
9. Use descriptive Markdown links such as [Live demo](https://example.com) and [Source code](https://github.com/example/repo). Keep most replies under 180 words unless the visitor asks for more detail. Do not wrap an entire reply in a code fence.`;

    // Format conversation history (OpenAI-compatible)
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

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const responseStream = await client.chat.completions.create({
            model: modelName,
            max_tokens: 1024,
            messages: formattedMessages,
            tools: [recruiterTool],
            stream: true,
          });

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
                  const confirmation = `\n\n[System: Thank you ${input.name}! Your inquiry from ${input.company} has been received. I've stored your contact info (${input.email}) and will get back to you shortly!]`;
                  controller.enqueue(encoder.encode(confirmation));
                }
              } catch (parseErr) {
                console.error("Error parsing tool call arguments:", parseErr);
              }
            }
          }

          controller.close();
        } catch (err: any) {
          console.error("Groq stream failed:", {
            status: err?.status,
            code: err?.code,
          });
          const errorMessage =
            err?.status === 429
              ? "AI chat is busy or has reached its usage limit. Please try again later."
              : "AI chat is temporarily unavailable. Please try again shortly or use the contact form.";
          controller.enqueue(
            encoder.encode(`\n[Error: ${errorMessage}]`)
          );
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
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
