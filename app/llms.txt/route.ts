import { NextResponse } from 'next/server'

const LLMS_TXT = `# Sahil Umraniya — sahilumraniya.dev

> Full Stack Engineer & System Architect specializing in Next.js, MERN Stack, and Generative AI solutions.

## About
Sahil Umraniya is a software engineer with 2+ years of experience building scalable, production-grade web applications. Strong focus on backend architecture, API performance, and distributed job processing. Hands-on experience with Generative AI systems, RAG pipelines, and developer productivity tooling.

## Location
Ahmedabad, India

## Skills
- Frontend: React, Next.js, TypeScript, Tailwind CSS, MUI
- Backend: Node.js, Express.js, Feathers.js, Spring Boot
- AI/ML: Generative AI, LLMs, RAG, Prompt Engineering, Conversational AI (Rasa)
- Databases: MongoDB, PostgreSQL, MySQL, Redis
- DevOps: Git, Docker, AWS, Jenkins

## Services
- Full Stack Web Application Development (Next.js, MERN Stack)
- Backend Architecture & API Design (Node.js, Redis)
- AI Integration & Generative AI Solutions (LLMs, RAG)
- Cloud Infrastructure & DevOps (AWS, Docker)
- Developer Tooling & NPM Package Development

## Notable Projects
- Retro Table — Headless React hook for building complex data tables (NPM package)
- Retro Form — Schema-driven form generator from JSON/Zod schemas
- Get Hired Marketplace — Two-sided freelance marketplace with AI-powered resume parsing
- Redis Queue Processor — Production-grade async job processing system
- ReplyMe — AI customer support chatbot using Rasa and RAG pipelines

## Experience
Software Engineer (Full Stack) at Smartters Software — Feb 2024 to Present
- Designed full-stack features using React, Next.js, and Node.js for production-scale systems
- Optimized backend APIs reducing average response latency by over 30%
- Architected Redis-backed async job processing system
- Built schema-driven reusable form and table abstractions

## Education
B.E. in Computer Engineering — Aditya Silver Oak Institute of Technology (2021-2025) — CGPA: 9.48/10

## Certifications
- Oracle Cloud Infrastructure 2024 Gen AI Professional (Oracle)
- Code Unnati AI/ML Certification (SAP)

## Contact
- Email: sahilumraniya9512@gmail.com
- Phone: +91 93272 01427
- Website: https://sahilumraniya.dev
- GitHub: https://github.com/sahilumraniya
- LinkedIn: https://linkedin.com/in/sahilumraniya
- Twitter/X: https://x.com/2Umraniya

## Pages
- [Home](https://sahilumraniya.dev)
- [About](https://sahilumraniya.dev/about-us)
- [Projects](https://sahilumraniya.dev/projects)
- [Blog](https://sahilumraniya.dev/blog)
- [Resume](https://sahilumraniya.dev/resume)
- [Contact](https://sahilumraniya.dev/contact-us)
`

export async function GET() {
    return new NextResponse(LLMS_TXT, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    })
}
