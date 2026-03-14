
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Hash, Search } from "lucide-react";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    tags: string[];
    views: number;
    createdAt: string;
}

export default function BlogList({ initialBlogs }: { initialBlogs: BlogPost[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract unique tags from all blogs
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        initialBlogs.forEach(blog => blog.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [initialBlogs]);

    // Filter blogs based on search and tag
    const filteredBlogs = useMemo(() => {
        return initialBlogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true;
            return matchesSearch && matchesTag;
        });
    }, [initialBlogs, searchQuery, selectedTag]);

    const featured = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
    const rest = filteredBlogs.length > 0 ? filteredBlogs.slice(1) : [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-20 pt-8">
            {/* Header / Hero */}
            <div className="relative bg-[var(--ds-card-bg)] border-b border-[var(--ds-card-border)] transition-colors duration-300 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-gradient-to-b from-violet-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

                    <div className="space-y-2 mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-widest">
                            <span>Knowledge Base</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Blog</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed font-light">
                            Deep dives into modern web development, software architecture, and the future of tech—written for builders.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 max-w-3xl items-start md:items-center pt-4">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles by title or topic..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ds-input w-full pl-12 pr-4 py-4 text-base transition-all rounded-2xl border-slate-200 dark:border-white/10"
                            />
                        </div>

                        {/* Tags Filter */}
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 py-2">
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${!selectedTag ? 'bg-slate-900 dark:bg-violet-600 text-white border-transparent' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-800'}`}
                                >
                                    All
                                </button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedTag === tag ? 'bg-slate-900 dark:bg-violet-600 text-white border-transparent' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-800'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        <p className="text-xl font-medium">No posts found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                            className="mt-4 text-violet-600 hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured Post (First item of filtered list) */}
                        {!searchQuery && !selectedTag && featured && (
                            <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <Link href={`/blog/${featured.slug}`} className="group relative block overflow-hidden rounded-3xl h-[400px] md:h-[500px]">
                                    <div className="w-full h-full relative">
                                        {featured.image ? (
                                            <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-violet-600 to-indigo-900" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {featured.tags && featured.tags.map((tag: string) => (
                                                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-violet-200 transition-colors">
                                                {featured.title}
                                            </h2>
                                            {featured.excerpt && (
                                                <p className="text-lg text-slate-200 line-clamp-2 max-w-3xl mb-6 hidden md:block">
                                                    {featured.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} />
                                                    {new Date(featured.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Eye size={16} />
                                                    {featured.views} Views
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* If we are filtering, show all results. If not, show 'rest' (skipping featured) */}
                            {(searchQuery || selectedTag ? filteredBlogs : rest).map((blog: BlogPost, index) => (
                                <Link href={`/blog/${blog.slug}`} key={blog._id} className="ds-card group flex flex-col p-0 overflow-hidden hover:brightness-105 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        {blog.image ? (
                                            <Image src={blog.image} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <Hash className="text-slate-300 dark:text-slate-600" size={48} />
                                            </div>
                                        )}
                                        {/* Overlay Tag */}
                                        <div className="absolute top-4 left-4">
                                            {blog.tags && blog.tags[0] && (
                                                <span className="px-2 py-1 bg-black/50 backdrop-blur text-white text-xs font-bold rounded">
                                                    {blog.tags[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 p-6 flex flex-col">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-tight">
                                            {blog.title}
                                        </h3>
                                        {blog.excerpt && (
                                            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 flex-1 mb-4">
                                                {blog.excerpt}
                                            </p>
                                        )}
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-500 font-medium mt-auto">
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                            <span className="group-hover:translate-x-1 transition-transform">Read Article →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
