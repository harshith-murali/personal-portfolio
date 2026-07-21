import { Project, Experience, Skill, Achievement } from "@/types/index";

export const personalInfo = {
  name: "Harshith M",
  title: "Full-Stack Developer & Student",
  bio: "Building scalable web applications with Next.js, React, and modern cloud technologies.",
  email: "mharshith200@gmail.com",
  phone: "+91-7204621805",
  location: "Bangalore, India",
  socials: {
    github: "https://github.com/harshith-murali",
    linkedin: "https://linkedin.com/in/harshith-m-dev",
    leetcode: "https://leetcode.com/u/geekycoder11",
    twitter: "https://twitter.com",
  },
};

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "C++"],
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend & APIs",
    items: [
      "Node.js",
      "REST APIs",
      "JWT",
      "API Design",
      "Authentication & Authorization",
      "RBAC",
    ],
  },
  {
    category: "Databases",
    items: ["MongoDB", "Mongoose", "MongoDB Atlas"],
  },
  {
    category: "Auth & Tools",
    items: ["Clerk", "Git", "GitHub", "Vercel"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Vercel", "AWS (EC2, S3, Lambda, IAM)", "MongoDB Atlas"],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Quantro",
    description:
      "AI-powered stock portfolio platform for Indian investors with portfolio tracking, trade simulation, backtesting, risk-aware recommendations, and automated market-data processing.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Claude API",
      "AWS",
    ],
    github: "https://github.com/harshith-murali/ai-portfolio-manager",
    featured: true,
  },
  {
    id: "2",
    title: "Sniply",
    description:
      "Full-stack URL shortener with custom aliases, authenticated dashboards, asynchronous click tracking, and analytics for browsers, operating systems, devices, and referrers.",
    technologies: ["Next.js", "MongoDB", "Clerk", "Nanoid"],
    link: "https://url-shortner-silk-nine.vercel.app",
    github: "https://github.com/harshith-murali/url-shortner",
    featured: true,
  },
  {
    id: "3",
    title: "Repo Analyser",
    description:
      "GitHub portfolio analytics platform that synchronizes repository data, evaluates project quality, visualizes developer activity, and generates recruiter-ready public portfolio pages.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "GitHub API",
      "Claude API",
    ],
    github: "https://github.com/harshith-murali/repo-analyser",
    featured: true,
  },
  {
    id: "4",
    title: "UrbanTwins",
    description:
      "Smart-city digital twin dashboard that simulates traffic, energy, water, and disaster systems with interactive mapping, graph-based routing, and AI recommendations.",
    technologies: ["Next.js", "MongoDB", "Leaflet", "Clerk", "Gemini API"],
    link: "https://urban-digital-twins-track3.vercel.app",
    github: "https://github.com/harshith-murali/urban-digital-twins-track3",
    featured: false,
  },
  {
    id: "5",
    title: "OS Algorithm Simulator",
    description:
      "Interactive operating-systems visualizer with step-by-step simulations for CPU scheduling, page replacement, disk scheduling, and Banker's Algorithm.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    github: "https://github.com/harshith-murali/AlgoVisualiser",
    featured: false,
  },
];

export const experience: Experience[] = [
  {
    id: "1",
    title: "B.E. in Computer Science & Engineering",
    company: "BMS College of Engineering, Bangalore",
    duration: "2024 - 2028",
    type: "education",
    description: [
      "CGPA: 9.04 / 10",
      "Strong foundation in DSA and system design",
    ],
  },
  {
    id: "2",
    title: "Student Activity Coordinator",
    company: "BMSCE IEEE Student Branch",
    duration: "2025 - Present",
    type: "work",
    description: [
      "Coordinating technical events and student activities",
      "Leading community engagement",
    ],
  },
  {
    id: "3",
    title: "Event Head - CodeSphere",
    company: "PhaseShift 2025, BMSCE",
    duration: "2025",
    type: "achievement",
    description: [
      "Led 24-hour global codeathon",
      "Collaboration with GeeksforGeeks",
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "AWS Certified Cloud Practitioner",
    description:
      "Demonstrates foundational expertise in AWS cloud architecture, core services, security, and billing models",
    icon: "☁️",
    date: "2026",
    link: "http://credly.com/badges/4f7fd64b-9ca4-4ab6-95c3-d27a8402cb1a",
  },
  {
    id: "2",
    title: "1st Place - CODEVERSE 24hr Hackathon",
    description:
      "Secured 1st place at CODEVERSE 24-hour hackathon (IEEE Computer Society, BMSCE), competing among college-wide participants",
    icon: "🏆",
    date: "2026",
    link: "https://github.com/harshith-murali",
  },

  {
    id: "3",
    title: "LeetCode",
    description:
      "150+ problems solved with focus on system design and algorithms",
    icon: "💻",
    date: "Ongoing",
    link: "https://leetcode.com/u/geekycoder11",
  },
];

export const about = {
  title: "Full-Stack Developer & Student at BMS College of Engineering",
  description: `I'm a 2nd-year Computer Science student passionate about building scalable web applications. With expertise in Next.js, React, TypeScript, and MongoDB, I create real-world solutions that solve problems. I have a strong foundation in Data Structures & Algorithms (C++) and cloud technologies like AWS.

My focus is on clean code, performance optimization, and delivering exceptional user experiences. Whether it's building complex dashboards, developing authentication systems, or optimizing database queries, I bring both technical depth and creative problem-solving to every project.`,
  highlights: [
    "Full-Stack Web Development",
    "Real-time Systems & Dashboards",
    "Database Design & Optimization",
    "Cloud Architecture (AWS)",
    "API Development",
    "Performance Engineering",
  ],
};
