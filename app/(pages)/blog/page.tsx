"use client";

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

export default function BlogPage() {
    return (

        <>
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">Engineering Blog</h1>
                <p className="text-slate-600 dark:text-slate-400">Thoughts on system design, AI, and full-stack development.</p>
            </div>

            <div className="max-w-4xl grid gap-6">
                {BLOG_POSTS.map((post) => (
                    <a
                        key={post.id}
                        href={post.slug}
                        className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-violet-500 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-violet-500 font-mono">{post.tag}</span>
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-500">{post.date}</span>
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-500">{post.readTime}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-500 transition-colors">
                            {post.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                    </a>
                ))}
            </div>
        </>
    );
}
