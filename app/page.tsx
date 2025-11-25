import {
  Code2, Globe, Zap, Layout, Server, Cpu, Database, Briefcase,
  Award, Package, Github, ExternalLink, ArrowRight, CheckCircle2,
  Loader2, Send, Linkedin, Mail, Download, Eye, Printer, Star
} from 'lucide-react';
import ClientShell from "@/components/client-shell"; // We will create this next

/* --- DATA CONSTANTS (Server Side Data) --- */
const RESUME_DATA = {
  name: "Sahil Umraniya",
  role: "Full-Stack Engineer • AI Specialist",
  summary: "Full-stack developer with 1.5+ years focused on Generative AI and high-performance backends. Skilled in Node.js, Python, React, Next.js. Built a Redis-backed async job queue that improved API responsiveness by 30%. Experienced with LLM integrations, event-driven systems, and cloud (Firebase, AWS). Oracle Generative AI certified."
};

const EXPERIENCES = [
  {
    title: "Software Developer",
    company_name: "Smartters Software",
    date: "Feb 2024 - Present",
    points: [
      "Optimized database access and API logic, cutting average response times by 30%+ and improving UX at scale.",
      "Built internal toolkit (Retro Form & Retro Table) to automate form/table generation, reducing boilerplate by up to 50%.",
      "Designed a Redis-backed async job queue for Feathers.js/Express with batch, delay, and event-driven tracking.",
      "Delivered multilingual support, scheduled tasks, and real-time complaint tracking."
    ],
  },
];

const PROJECTS = [
  {
    title: "Retro Form & Table",
    tech: ["NPM", "React", "AI"],
    tag: "Tools",
    desc: "AI-Powered SaaS tool accelerating UI creation. Published core as public NPM package.",
    github: "https://www.npmjs.com/package/retro-table",
    host: "https://www.npmjs.com/package/retro-table",
    challenge: "Abstracting complex validation logic.",
    featured: true
  },
  {
    title: "Get Hired Marketplace",
    tech: ["Next.js", "Firebase", "GenAI"],
    tag: "Full Stack",
    desc: "Two-sided freelance marketplace with AI resume parsing.",
    github: "https://github.com/Sahilumraniya",
    host: "https://gethiredat.vercel.app",
    challenge: "Mapping unstructured resume data.",
    featured: true
  },
  {
    title: "Redis Queue Processor",
    tech: ["Redis", "Node.js", "System Design"],
    tag: "Backend",
    desc: "Production-grade async processing system for batch jobs.",
    github: "https://github.com/sahilumraniya",
    host: "#",
    challenge: "Ensuring idempotency in distributed systems.",
    featured: true
  },
  {
    title: "Swap & Share",
    tech: ["MERN", "AWS S3"],
    tag: "Full Stack",
    desc: "Resource swapping platform with secure file handling.",
    github: "https://github.com/Sahilumraniya/ShwapNShare/",
    host: "https://swapnshare.vercel.app/",
    challenge: "Real-time state synchronization."
  },
  {
    title: "AI Maze Solver",
    tech: ["Python", "Pathfinding"],
    tag: "AI/ML",
    desc: "Intelligent bot solving complex mazes using A* algorithm.",
    github: "https://github.com/Sahilumraniya/Maze_Game",
    host: "#",
    challenge: "Optimizing heuristics."
  },
  {
    title: "Learnfinity",
    tech: ["Next.js", "Tailwind"],
    tag: "Full Stack",
    desc: "Educational platform for seamless learning experiences.",
    github: "https://github.com/Sahilumraniya/Learnfinity",
    host: "https://learnfinity.vercel.app/",
    challenge: "SEO optimization."
  },
];

const SKILL_CATEGORIES = [
  {
    title: "Frontend Core",
    icon: <Layout className="text-blue-500" />,
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    border: "border-blue-500/20",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5", "CSS3", "MUI"]
  },
  {
    title: "Backend & DB",
    icon: <Server className="text-green-500" />,
    bg: "bg-green-500/10 dark:bg-green-500/10",
    border: "border-green-500/20",
    skills: ["Node.js", "Express", "Redis", "MongoDB", "PostgreSQL", "Feathers", "Spring Boot"]
  },
  {
    title: "AI & Data",
    icon: <Cpu className="text-purple-500" />,
    bg: "bg-purple-500/10 dark:bg-purple-500/10",
    border: "border-purple-500/20",
    skills: ["Python", "GenAI", "Prompt Eng.", "NumPy", "Pandas", "Scikit-learn"]
  },
  {
    title: "DevOps & Tools",
    icon: <Globe className="text-orange-500" />,
    bg: "bg-orange-500/10 dark:bg-orange-500/10",
    border: "border-orange-500/20",
    skills: ["Docker", "AWS", "Git", "Firebase", "Postman"]
  }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Optimizing Feathers.js for High Scale",
    excerpt: "How I designed a Redis-backed job queue to handle 10k+ daily requests and reduce API latency by 30%.",
    date: "Nov 2024",
    readTime: "5 min read",
    tag: "Backend",
    slug: "#"
  },
  {
    id: 2,
    title: "Building 'Retro Form': From Idea to NPM Package",
    excerpt: "The engineering challenges of abstracting complex UI logic into a reusable React hook and publishing it for the community.",
    date: "Oct 2024",
    readTime: "7 min read",
    tag: "Engineering",
    slug: "#"
  },
  {
    id: 3,
    title: "Integrating GenAI into Legacy Systems",
    excerpt: "Lessons learned from adding AI resume parsing to the 'Get Hired' platform without breaking existing flows.",
    date: "Sep 2024",
    readTime: "6 min read",
    tag: "AI/ML",
    slug: "#"
  }
];

export default function Home() {
  return (
    <ClientShell
      resumeData={RESUME_DATA}
      experiences={EXPERIENCES}
      projects={PROJECTS}
      skillCategories={SKILL_CATEGORIES}
      blogPosts={BLOG_POSTS}
    />
  );
}