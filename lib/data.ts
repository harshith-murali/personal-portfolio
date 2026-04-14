import { Project, Experience, Skill, Achievement } from '@/types/index';

export const personalInfo = {
  name: 'Harshith M',
  title: 'Full-Stack Developer & Student',
  bio: 'Building scalable web applications with Next.js, React, and modern cloud technologies.',
  email: 'mharshith200@gmail.com',
  phone: '+91-7204621805',
  location: 'Bangalore, India',
  socials: {
    github: 'https://github.com/harshith-murali',
    linkedin: 'https://linkedin.com/in/harshith-m-dev',
    leetcode: 'https://leetcode.com/u/geekycoder11',
    twitter: 'https://twitter.com',
  },
};

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'C++', 'Python'],
  },
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'Tailwind CSS', 'HTML5', 'CSS3',],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'REST APIs', 'JWT', 'Arcjet'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'Mongoose', 'MongoDB Atlas'],
  },
  {
    category: 'Auth & Tools',
    items: ['Clerk', 'Nanoid', 'Git', 'GitHub', 'Vercel'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Vercel', 'AWS', 'MongoDB Atlas'],
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'UrbanTwins',
    description: 'Smart City Digital Twin Dashboard - Real-time simulation of traffic, energy, water, and disaster infrastructure across Bengaluru with AI-powered recommendations',
    technologies: ['Next.js', 'MongoDB', 'Leaflet', 'Clerk', 'Gemini API'],
    link: 'https://urban-digital-twins-track3.vercel.app',
    github: 'https://github.com/harshith-murali/urban-digital-twins-track3',
    featured: true,
  },
  {
    id: '2',
    title: 'Sniply',
    description: 'URL Shortener with Advanced Analytics - Custom aliases, click tracking, and detailed analytics including browser, OS, device, and referrer breakdowns',
    technologies: ['Next.js', 'MongoDB', 'Clerk', 'Nanoid'],
    link: 'https://url-shortner-silk-nine.vercel.app',
    github: 'https://github.com/harshith-murali/url-shortner',
    featured: true,
  },
  {
    id: '3',
    title: 'OpenVerse',
    description: 'Full-Stack Blog Platform - Complete CRUD functionality with Clerk authentication, MongoDB Atlas database, and a sleek Next.js frontend for seamless content creation and management',
    technologies: ['Next.js', 'MongoDB', 'Clerk', 'Tailwind CSS'],
    link: 'https://open-verse-arcjet.vercel.app/',
    github: 'https://github.com/harshith-murali/open-verse-arcjet',
    featured: false,
  },
  {
    id: '4',
    title: 'Auth System',
    description: 'Complete Authentication Flow - Sign-up, sign-in, logout, forgot password, OTP verification, and JWT-based session management',
    technologies: ['Next.js', 'JWT', 'Node.js'],
    link: 'https://auth-nextjs-theta-seven.vercel.app',
    github: 'https://github.com/harshith-murali/auth-nextjs',
    featured: false,
  },
];

export const experience: Experience[] = [
  {
    id: '1',
    title: 'B.E. in Computer Science & Engineering',
    company: 'BMS College of Engineering, Bangalore',
    duration: '2024 - 2028',
    type: 'education',
    description: ['CGPA: 9.04 / 10', 'Strong foundation in DSA and system design'],
  },
  {
    id: '2',
    title: 'Student Activity Coordinator',
    company: 'BMSCE IEEE Student Branch',
    duration: '2025 - Present',
    type: 'work',
    description: ['Coordinating technical events and student activities', 'Leading community engagement'],
  },
  {
    id: '3',
    title: 'Event Head - CodeSphere',
    company: 'PhaseShift 2025, BMSCE',
    duration: '2025',
    type: 'achievement',
    description: ['Led 24-hour global codeathon', 'Collaboration with GeeksforGeeks'],
  },
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'AWS Certified Cloud Practitioner',
    description: 'Industry-recognized certification in AWS cloud services and architecture',
    icon: '☁️',
    date: '2026',
    link: '#',
  },
  {
    id: '2',
    title: '1st Place - CODEVERSE 24hr Hackathon',
    description: 'Won BMSCE IEEE Computer Society hackathon competing college-wide',
    icon: '🏆',
    date: '2026',
    link: 'https://github.com/harshith-murali',
  },
  
  {
    id: '3',
    title: 'LeetCode',
    description: '150+ problems solved with focus on system design and algorithms',
    icon: '💻',
    date: 'Ongoing',
    link: 'https://leetcode.com/u/geekycoder11',
  },
];

export const about = {
  title: 'Full-Stack Developer & Student at BMS College of Engineering',
  description: `I'm a 2nd-year Computer Science student passionate about building scalable web applications. With expertise in Next.js, React, TypeScript, and MongoDB, I create real-world solutions that solve problems. I have a strong foundation in Data Structures & Algorithms (C++) and cloud technologies like AWS.

My focus is on clean code, performance optimization, and delivering exceptional user experiences. Whether it's building complex dashboards, developing authentication systems, or optimizing database queries, I bring both technical depth and creative problem-solving to every project.`,
  highlights: [
    'Full-Stack Web Development',
    'Real-time Systems & Dashboards',
    'Database Design & Optimization',
    'Cloud Architecture (AWS)',
    'API Development',
    'Performance Engineering',
  ],
};
