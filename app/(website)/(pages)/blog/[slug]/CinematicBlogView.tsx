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
    const [imgError, setImgError] = useState(false);
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
        let processed = content;
        processed = processed.replace(/^\\(#+)\s/gm, '$1 ');
        const regex = /```(\w*)\n([\s\S]*?)```\s*```(\w*)\n([\s\S]*?)```/g;
        let match;
        while ((match = regex.exec(processed)) !== null) {
            const lang1 = match[1] || '';
            const lang2 = match[3] || '';

            if (lang1 === lang2 || !lang1 || !lang2) {
                const merged = "```" + (lang1 || lang2) + "\n" + match[2] + "\n" + match[4] + "```";
                processed = processed.replace(match[0], merged);
                regex.lastIndex = 0;
            }
        }
        return processed;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-200 font-sans selection:bg-violet-500/30 selection:text-violet-800 dark:selection:text-violet-200">

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 origin-left z-50 shadow-[0_0_12px_rgba(124,58,237,0.6)]"
                style={{ scaleX }}
            />

            {/* Cinematic Hero Section - Full Screen Parallax */}
            <div className="relative w-full h-[75vh] min-h-[550px] overflow-hidden flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y: yParallax, opacity: opacityHero }}
                >
                    {blog.image && !imgError ? (
                        <Image 
                            src={blog.image} 
                            alt={blog.title} 
                            fill 
                            className="object-cover scale-105" 
                            priority 
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-violet-950 via-slate-900 to-[#0a0a0a]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-black/30" />
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
                        <div className="ds-card p-6 md:p-12">
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
                            <article className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                                prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
                                prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:pb-3 prose-h1:border-b prose-h1:border-slate-200 dark:prose-h1:border-white/10
                                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200/60 dark:prose-h2:border-white/5
                                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-[1.05rem] prose-p:my-5
                                prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
                                prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-disc prose-ul:pl-6
                                prose-ol:my-6 prose-ol:space-y-3 prose-ol:list-decimal prose-ol:pl-6
                                prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:leading-relaxed prose-li:my-1.5
                                prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline transition-all
                                prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-violet-50/50 dark:prose-blockquote:bg-white/[0.03] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-6
                                prose-code:text-violet-600 dark:prose-code:text-violet-300 prose-code:bg-violet-100/80 dark:prose-code:bg-violet-500/15 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                prose-hr:border-slate-200 dark:prose-hr:border-white/10 prose-hr:my-10
                            ">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeSlug, rehypeRaw]}
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        table({ children }: any) {
                                            return (
                                                <div className="my-8 w-full overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white dark:bg-[#111827]/60 backdrop-blur-sm">
                                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                                        {children}
                                                    </table>
                                                </div>
                                            );
                                        },
                                        thead({ children }: any) {
                                            return (
                                                <thead className="bg-slate-100/90 dark:bg-white/[0.06] border-b border-slate-200 dark:border-white/10">
                                                    {children}
                                                </thead>
                                            );
                                        },
                                        th({ children }: any) {
                                            return (
                                                <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-violet-300 font-mono">
                                                    {children}
                                                </th>
                                            );
                                        },
                                        tr({ children }: any) {
                                            return (
                                                <tr className="border-b border-slate-100 dark:border-white/[0.04] transition-colors hover:bg-violet-50/50 dark:hover:bg-white/[0.02]">
                                                    {children}
                                                </tr>
                                            );
                                        },
                                        td({ children }: any) {
                                            return (
                                                <td className="px-6 py-4.5 text-sm md:text-base text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                                                    {children}
                                                </td>
                                            );
                                        },
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
                            <div className="mt-20 p-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-[calc(var(--ds-radius)+0.25rem)]">
                                <div className="ds-card p-8 md:p-12 text-center">
                                    <h3 className="text-2xl font-bold text-[var(--ds-text,currentColor)] mb-4">Did you enjoy this article?</h3>
                                    <p className="opacity-70 mb-8 max-w-md mx-auto">Check out more insights on AI, Agents, and Engineering on the main blog.</p>
                                    <Link href="/blog">
                                        <button className="ds-btn px-8 py-3 font-bold hover:scale-105 transition-transform">
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
