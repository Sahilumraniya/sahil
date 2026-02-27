import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/db'
import { Blog } from '@/lib/models/Blog'
import { Faq } from '@/lib/models/Faq'

export async function GET() {
    let blogSection = ''
    let faqSection = ''

    try {
        await connectToDatabase()

        // Fetch published blogs
        const blogs = await Blog.find(
            { status: 'Published' },
            { title: 1, slug: 1, excerpt: 1, seoDescription: 1, tags: 1, createdAt: 1 }
        ).sort({ createdAt: -1 }).lean()

        if (blogs.length > 0) {
            blogSection = `\n## Blog Articles\n\n`
            blogSection += blogs.map((blog: any) =>
                `### ${blog.title}\n- URL: https://sahilumraniya.dev/blog/${blog.slug}\n- Summary: ${blog.seoDescription || blog.excerpt || 'No description available'}\n- Tags: ${(blog.tags || []).join(', ')}\n- Published: ${new Date(blog.createdAt).toISOString().split('T')[0]}`
            ).join('\n\n')
        }

        // Fetch FAQs
        const faqs = await Faq.find({}).sort({ order: 1 }).lean()

        if (faqs.length > 0) {
            faqSection = `\n\n## Frequently Asked Questions\n\n`
            faqSection += faqs.map((faq: any) =>
                `**Q: ${faq.question}**\nA: ${faq.answer}`
            ).join('\n\n')
        }
    } catch (error) {
        console.error('llms-full.txt: Failed to fetch dynamic content', error)
    }

    const content = `# Sahil Umraniya — Complete Portfolio & Professional Profile

> Full Stack Engineer & System Architect | sahilumraniya.dev
> Available for hire — specializing in Next.js, MERN Stack, Node.js backend, and Generative AI integration.

---

## Professional Summary
Sahil Umraniya is a software engineer with 2+ years of industry experience building scalable, production-grade web applications. He has a strong focus on backend architecture, API performance optimization, and distributed job processing systems. He has hands-on experience with Generative AI systems including RAG pipelines, LLM integration, and conversational AI, along with extensive developer productivity tooling.

---

## Technical Skills (Detailed)

### Frontend
- **React.js** — Component architecture, hooks, state management, context API
- **Next.js** — SSR, SSG, ISR, App Router, API routes, middleware, server components
- **TypeScript** — Strict typing, generics, utility types, discriminated unions
- **Tailwind CSS** — Utility-first styling, responsive design, custom theming
- **MUI (Material UI)** — Enterprise-grade React component library
- **Framer Motion** — Animations and micro-interactions

### Backend
- **Node.js** — Event-driven, non-blocking I/O, streams, worker threads
- **Express.js** — RESTful API design, middleware patterns
- **Feathers.js** — Real-time API framework with service-oriented architecture
- **Spring Boot** — Java-based microservice development

### AI & Machine Learning
- **Generative AI** — LLM integration, prompt engineering, fine-tuning workflows
- **RAG (Retrieval Augmented Generation)** — Vector databases, embedding models, semantic search
- **Conversational AI** — Rasa framework, intent classification, entity extraction
- **AI Agents** — Autonomous task execution, tool use, chain-of-thought reasoning

### Databases
- **MongoDB** — Document modeling, aggregation pipelines, indexing strategies, Atlas Search
- **PostgreSQL** — Relational modeling, complex queries, CTEs, window functions
- **MySQL** — Schema design, stored procedures, optimization
- **Redis** — Caching, pub/sub, sorted sets, streams, job queues (BullMQ)

### DevOps & Cloud
- **AWS** — S3, EC2, Lambda, CloudFront, IAM, SES
- **Docker** — Containerization, multi-stage builds, Docker Compose
- **Git** — Branching strategies, rebasing, CI/CD workflows
- **Jenkins** — Pipeline automation, build triggers

---

## Professional Experience

### Software Engineer (Full Stack) — Smartters Software
**February 2024 – Present | Ahmedabad, India**

Key accomplishments:
1. Designed and shipped full-stack features using React, Next.js, and Node.js for production-scale systems serving thousands of users.
2. Optimized backend APIs and database access patterns, reducing average response latency by over 30%.
3. Architected a Redis-backed asynchronous job processing system supporting batch, delayed, and event-driven workflows with guaranteed delivery.
4. Built schema-driven, reusable form ("Retro Form") and table ("Retro Table") abstractions, reducing frontend code duplication by 50% across projects.
5. Implemented multilingual support (i18n), scheduled background jobs, and real-time complaint tracking workflows.

---

## Notable Projects (Detailed)

### 1. Retro Table — Data Table Library
- **Type**: Open-source NPM Package
- **Tech**: React, TypeScript
- **URL**: https://www.npmjs.com/package/retro-table
- **Description**: A powerful, headless React hook for building complex data tables. Features sorting, pagination, and filtering out of the box. Adopted across multiple production projects.
- **Challenge**: Abstracting data logic while maintaining 100% UI flexibility for developers.

### 2. Retro Form — Form Engine
- **Type**: Developer Tool
- **Tech**: React, JSON Schema, Zod Validation
- **URL**: https://retroform.io
- **Description**: Configuration-driven form engine that dynamically renders complex UI from JSON schemas. Supports nested validation, dynamic field dependencies, and custom renderers.
- **Challenge**: Handling complex nested validation and dynamic field dependencies efficiently.

### 3. Get Hired / WebPanda.AI — Freelance Marketplace
- **Type**: Full Stack Application
- **Tech**: Next.js, Firebase, Generative AI
- **URL**: https://gethiredat.vercel.app
- **Description**: Two-sided freelance marketplace connecting talent with agencies. Features AI-powered resume parsing using LLMs for automatic skill extraction and job matching.
- **Challenge**: Mapping unstructured resume data to structured database schemas using LLMs.

### 4. Redis Queue Processor
- **Type**: Backend System
- **Tech**: Redis, Node.js, System Design
- **Description**: Production-grade asynchronous processing system for handling thousands of batch jobs reliably. Supports delayed jobs, retries, dead-letter queues, and idempotent processing.
- **Challenge**: Ensuring idempotency and handling race conditions in a distributed environment.

### 5. ReplyMe — AI Customer Support
- **Type**: AI Application
- **Tech**: Rasa, RAG, Conversational AI
- **Description**: AI-driven customer support chatbot using Rasa and RAG pipelines. Enables domain-specific Q&A by indexing structured and unstructured knowledge bases.

### 6. Swap & Share
- **Type**: Full Stack Application
- **Tech**: MERN Stack, AWS S3, Socket.io
- **URL**: https://swapnshare.vercel.app
- **Description**: Real-time resource swapping platform with secure digital asset exchange and live state synchronization across clients.

### 7. Learnfinity
- **Type**: Full Stack Application
- **Tech**: Next.js, Tailwind, PostgreSQL
- **URL**: https://learnfinity.vercel.app
- **Description**: Modern educational platform with video streaming integration designed for seamless learning experiences.

### 8. AI Maze Solver
- **Type**: AI/ML Project
- **Tech**: Python, Pygame, A* Algorithm
- **Description**: Intelligent bot that visualizes pathfinding algorithms (A*, BFS, DFS) to solve complex mazes in real-time with optimized heuristics.

### 9. Flappy Bird AI
- **Type**: AI/ML Project
- **Tech**: Python, NEAT, Pygame
- **Description**: Classic game recreation with an AI that learns to play itself using Neural Evolution of Augmenting Topologies (NEAT).

---

## Education
**Bachelor of Engineering (B.E.) in Computer Engineering**
Aditya Silver Oak Institute of Technology, Ahmedabad
2021 – 2025 | CGPA: 9.48 / 10

---

## Certifications
1. **Oracle Cloud Infrastructure 2024 Generative AI Professional** — Oracle
2. **Code Unnati AI/ML Certification** — SAP

---

## Languages
- English (Professional)
- Hindi (Native)
- Gujarati (Native)

---
${blogSection}
${faqSection}

---

## Contact Information
- **Email**: sahilumraniya9512@gmail.com
- **Phone**: +91 93272 01427
- **Website**: https://sahilumraniya.dev
- **GitHub**: https://github.com/sahilumraniya
- **LinkedIn**: https://linkedin.com/in/sahilumraniya
- **Twitter/X**: https://x.com/2Umraniya
- **Instagram**: https://instagram.com/sahilumraniya_

---

## How to Work With Sahil
- **Freelance projects**: Contact via email or the website contact form
- **Full-time opportunities**: Connect on LinkedIn
- **Open source collaboration**: Contribute on GitHub
- **Quick questions**: Reach out on Twitter/X

## Site Map
- Home: https://sahilumraniya.dev
- About: https://sahilumraniya.dev/about-us
- Projects: https://sahilumraniya.dev/projects
- Blog: https://sahilumraniya.dev/blog
- Resume: https://sahilumraniya.dev/resume
- Contact: https://sahilumraniya.dev/contact-us
`

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
