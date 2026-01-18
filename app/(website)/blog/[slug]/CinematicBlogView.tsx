"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Eye, Share2, Copy, Linkedin, Twitter } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableOfContents from "@/components/blog/TableOfContents";

interface BlogPost {
    _id: string;
    title: string;
    content: string;
    image?: string;
    tags: string[];
    views: number;
    createdAt: string;
    slug: string;
    excerpt?: string;
    readTime?: number;
}

export default function CinematicBlogView({ blog }: { blog: BlogPost }) {
    const ref = useRef(null);
    const { scrollYProgress, scrollY } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax & Fade Effects
    const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
    const textY = useTransform(scrollY, [0, 300], [0, 50]);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to merge adjacent code blocks
    const processContent = (content: string) => {
        // Regex to find adjacent code blocks:
        // ```lang
        // code
        // ```
        // [whitespace/newlines]
        // ```lang
        // code
        // ```
        // It captures: 
        // 1. Language of first block
        // 2. Content of first block
        // 3. Language of second block (must match first or be empty/text)
        // 4. Content of second block


        let processed = content;

        // 1. Unescape headers (Fix for Tiptap escaping markdown headers as text)
        // Replaces "\## " with "## " at start of lines
        processed = processed.replace(/^\\(#+)\s/gm, '$1 ');

        // 2. Merge Adjacent Code Blocks
        const regex = /```(\w*)\n([\s\S]*?)```\s*```(\w*)\n([\s\S]*?)```/g;

        // Iteratively merge until no more adjacent matches found
        let match;
        while ((match = regex.exec(processed)) !== null) {
            // Only merge if languages match or one is missing (simplification)
            const lang1 = match[1] || '';
            const lang2 = match[3] || '';

            if (lang1 === lang2 || !lang1 || !lang2) {
                const merged = "```" + (lang1 || lang2) + "\n" + match[2] + "\n" + match[4] + "```";
                processed = processed.replace(match[0], merged);
                // Reset regex to start from top after replacement to handle 3+ blocks
                regex.lastIndex = 0;
            } else {
                // If languages differ significantly, maybe don't merge, but for now we skip
            }
        }
        return processed;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-200 font-sans selection:bg-violet-500/30 selection:text-violet-800 dark:selection:text-violet-200">

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 origin-left z-50 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                style={{ scaleX }}
            />

            {/* Cinematic Hero Section - Full Screen Parallax */}
            <div className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: yParallax, opacity: opacityHero }}
                >
                    {blog.image ? (
                        <Image src={blog.image} alt={blog.title} fill className="object-cover scale-105" priority />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-[#0a0a0a]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
                </motion.div>

                <motion.div
                    className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mt-20"
                    style={{ y: textY }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex justify-center gap-2 mb-6 flex-wrap">
                        {blog.tags && blog.tags.map((tag, i) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-slate-100 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl text-balance">
                        {blog.title}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium text-sm md:text-base"
                    >
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-black">SU</div>
                            <span className="text-white">Sahil Umraniya</span>
                        </div>
                        <span className="w-1 h-1 bg-slate-500 rounded-full" />
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-violet-400" />
                            {new Date(blog.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                        </div>
                        <span className="w-1 h-1 bg-slate-500 rounded-full" />
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-violet-400" />
                            <span>{blog.readTime || 5} min read</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Content Container - Overlapping the Hero */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-32">
                <Link href="/blog" className="hidden 2xl:flex fixed left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-slate-500 hover:text-violet-400 transition-colors group">
                    <div className="p-3 rounded-full border border-slate-800 bg-black/50 backdrop-blur-sm group-hover:border-violet-500/50 transition-all text-slate-400 group-hover:text-white">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="writing-mode-vertical text-xs font-bold tracking-widest opacity-50 group-hover:opacity-100">BACK</span>
                </Link>

                <div className="flex flex-col xl:flex-row gap-12 -mt-20">

                    {/* Main Content Column */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white dark:bg-[#0a0a0a] rounded-t-3xl border-t border-slate-200 dark:border-white/5 p-6 md:p-12 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
                            {/* Share Bar */}
                            <div className="flex justify-between items-center py-6 border-b border-white/5 mb-10">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Article</span>
                                <div className="flex gap-2">
                                    <button onClick={handleCopy} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all relative">
                                        <Copy size={18} />
                                        {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-violet-600 text-white text-xs rounded">Copied!</span>}
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-[#1DA1F2] hover:bg-white/10 rounded-full transition-all">
                                        <Twitter size={18} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-[#0A66C2] hover:bg-white/10 rounded-full transition-all">
                                        <Linkedin size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Pro Typography Content */}
                            {/* Pro Typography Content */}
                            <article className="prose prose-xl dark:prose-invert max-w-none 
                                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:leading-tight
                                prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8 prose-p:font-light prose-p:text-[1.125rem]
                                prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
                                prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:font-semibold prose-a:no-underline prose-a:border-b prose-a:border-violet-500/30 dark:prose-a:border-violet-400/30 hover:prose-a:border-violet-600 dark:hover:prose-a:border-violet-400 transition-all
                                prose-blockquote:border-l-2 prose-blockquote:border-violet-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-white/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200
                                prose-code:text-violet-600 dark:prose-code:text-violet-300 prose-code:bg-violet-100 dark:prose-code:bg-violet-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-slate-900 dark:prose-pre:bg-[#111] prose-pre:border prose-pre:border-slate-800 dark:prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:rounded-2xl prose-pre:p-0
                                prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/5 prose-img:w-full
                                prose-hr:border-slate-200 dark:prose-hr:border-white/5 prose-hr:my-16
                                prose-table:w-full prose-table:border-collapse prose-table:my-8 prose-table:border prose-table:border-slate-200 dark:prose-table:border-white/10 prose-table:rounded-xl prose-table:overflow-hidden
                                prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:bg-slate-100 dark:prose-th:bg-white/5 prose-th:border-b prose-th:border-slate-300 dark:prose-th:border-white/10 prose-th:text-slate-900 dark:prose-th:text-white prose-th:font-bold prose-th:uppercase prose-th:text-xs prose-th:tracking-wider
                                prose-td:px-6 prose-td:py-4 prose-td:border-b prose-td:border-slate-200 dark:prose-td:border-white/5 prose-td:text-slate-700 dark:prose-td:text-slate-300
                            ">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeSlug, rehypeRaw]}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ node, inline, className, children, ...props }: any) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            const lang = match ? match[1] : 'text'
                                            return !inline ? (
                                                <div className="rounded-xl overflow-hidden my-6 border border-white/10">
                                                    {match && (
                                                        <div className="px-4 py-2 bg-[#1e1e1e] border-b border-white/5 text-xs font-mono text-slate-500 flex justify-between">
                                                            <span>{lang}</span>
                                                            <span className="text-[10px] uppercase tracking-wider">Example</span>
                                                        </div>
                                                    )}
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={lang}
                                                        PreTag="div"
                                                        {...props}
                                                        customStyle={{
                                                            margin: 0,
                                                            padding: '1.5rem',
                                                            backgroundColor: '#111',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {processContent(blog.content)}
                                </ReactMarkdown>
                            </article>

                            {/* Call to Action Footer */}
                            <div className="mt-20 p-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-2xl">
                                <div className="bg-white dark:bg-[#111] rounded-xl p-8 md:p-12 text-center">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Did you enjoy this article?</h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">Check out more insights on AI, Agents, and Engineering on the main blog.</p>
                                    <Link href="/blog">
                                        <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform">
                                            Read More Articles
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Table of Contents */}
                    <TableOfContents content={blog.content} />

                </div>
            </div>
        </div>
    );
}
