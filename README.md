<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" />
</p>

# Harshith M — AI & Full Stack Systems Portfolio

> A production-grade, animated portfolio website featuring an **interactive AI Digital Twin chatbot**, 3D interactive cards, live project showcases, and smooth Framer Motion micro-interactions.

🔗 **Live Demo:** [harshith-portfolio.vercel.app](https://harshith-portfolio.vercel.app)  
📦 **GitHub Profile:** [github.com/harshith-murali](https://github.com/harshith-murali)

---

## 🌟 Key Features

### 🤖 AI Digital Twin Chatbot
- **Interactive Conversational AI**: Recruiter and visitor assistant powered by Hugging Face Inference Router (`Qwen/Qwen2.5-72B-Instruct`).
- **Grounded Resume Context**: Answers questions about technical skills, project architectures, hackathon achievements, and education with high accuracy.
- **Interactive Suggestion Chips**: One-click quick prompts (Bharat Quest, Quantro, tech stack, resume summary).
- **Graceful Offline/Fallback Mode**: Continues to provide structured profile responses if API quotas or keys are unavailable.

### 🎨 Visual & Motion Design
- **Framer Motion Animations**: Staggered fade-ins, spring physics, and viewport scroll reveals.
- **Card Flip & Mouse Glow**: Custom 3D perspective tilts and dynamic cursor radial gradient lighting (`MouseEffectCard`, `CardFlip`).
- **Dynamic Typewriter**: Animated role switcher with text transitions.
- **Scroll Progress & Floating Actions**: Real-time gradient scroll progress bar and smooth back-to-top navigation.
- **Theme Support**: High-contrast dark mode with cyan and violet accents.

### 📂 Centralized Data Architecture
- All content (profile, projects, work experience, hackathons, LeetCode milestones, and skill taxonomies) is centrally configured and maintained in `data/profile.json`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS + CSS custom properties |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **AI Runtime** | OpenAI SDK pointing to Hugging Face Router (`router.huggingface.co/v1`) |
| **Email Dispatch** | Nodemailer |
| **Deployment** | Vercel Edge Platform |

---

## 📂 Project Structure

```text
portfolio-website/
├── app/
│   ├── api/
│   │   ├── chat/route.ts         # Streaming AI Digital Twin chat endpoint
│   │   └── contact/route.ts      # Nodemailer contact submission endpoint
│   ├── components/
│   │   ├── chat/                 # AI ChatInterface, SuggestionChips, ChatDrawer
│   │   ├── Hero.tsx              # Animated hero section with typewriter title
│   │   ├── About.tsx             # Bio, education, and career philosophy
│   │   ├── Projects.tsx          # Featured full-stack & AI project showcases
│   │   ├── Skills.tsx            # Categorized technical skill grid
│   │   ├── Experience.tsx        # Timeline of professional and academic milestones
│   │   ├── Achievements.tsx      # Hackathons, certifications, and awards
│   │   ├── Contact.tsx           # Interactive contact form
│   │   ├── CardFlip.tsx          # Interactive 3D card component
│   │   ├── MouseEffectCard.tsx   # Dynamic mouse glow container
│   │   └── Navbar.tsx            # Desktop & mobile responsive header
│   ├── globals.css               # Design tokens, gradients, and scrollbars
│   ├── layout.tsx                # Metadata, SEO tags, and root HTML layout
│   └── page.tsx                  # Single-page assembly
├── data/
│   └── profile.json              # Single source of truth for all portfolio data
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** or **yarn**

### 1. Clone & Install
```bash
git clone https://github.com/harshith-murali/harshith-portfolio.git
cd harshith-portfolio
npm install
```

### 2. Configure Environment Variables
Create `.env.local` in the project root:
```env
# AI Digital Twin Chat (Hugging Face Inference)
HUGGINGFACE_API_KEY="hf_..."
HUGGINGFACE_MODEL="Qwen/Qwen2.5-72B-Instruct"

# Optional Contact Form Email Dispatch
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_TO="your-email@gmail.com"
```

### 3. Run Development Server
```bash
npm run dev
# Running at http://localhost:3000
```

---

## 🧪 Validation & Production Build

```bash
npm run type-check    # TypeScript validation (tsc --noEmit)
npm run lint          # Next.js ESLint validation
npm run build         # Next.js production build bundle
npm start             # Start production server
```

---

## 👨‍💻 Author

**Harshith M**
- GitHub: [@harshith-murali](https://github.com/harshith-murali)
- LinkedIn: [harshith-m-dev](https://linkedin.com/in/harshith-m-dev)
- LeetCode: [geekycoder11](https://leetcode.com/u/geekycoder11)

---

## 📄 License
MIT License. Built with Next.js, TypeScript, and Framer Motion.
