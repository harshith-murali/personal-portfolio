import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const HF_MODEL = "Qwen/Qwen2.5-72B-Instruct";

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

    const apiKey = process.env.HF_API_KEY;

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
6. Keep responses concise, well-structured, and easy to read. Use bullet points or code snippets where appropriate.`;

    if (!apiKey) {
      // Fallback mock stream if API key is not configured yet
      const fallbackText =
        "Hello! I am Harshith's AI Digital Twin powered by profile.pdf. (Note: HF_API_KEY is not set in environment variables yet. Please add your key to `.env.local` to enable live responses!). In the meantime, I can tell you that I'm a 3rd-year CS student at BMSCE with an 8.92 CGPA, AWS Cloud Practitioner certified, and currently working at Pranasya Technologies on Bharat Quest AI and the WhatsApp Broadcast Platform. I've also built projects like Quantro, Sniply, and AlgoVisualiser!";

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = fallbackText.split(" ");
          for (const word of words) {
            controller.enqueue(encoder.encode(word + " "));
            await new Promise((res) => setTimeout(res, 40));
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

    const hf = new OpenAI({
      apiKey,
      baseURL: "https://router.huggingface.co/v1",
    });

    // Format conversation history for the HF router (OpenAI-compatible)
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
          const responseStream = await hf.chat.completions.create({
            model: HF_MODEL,
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
          console.error("Hugging Face Stream Error:", err);
          controller.enqueue(
            encoder.encode(
              `\n[Error: Unable to connect to AI Twin service (${err?.message || "Unknown error"}).]`
            )
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
