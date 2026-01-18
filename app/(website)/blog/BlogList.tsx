
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Hash, Search, ArrowLeft } from "lucide-react";

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
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-20">
            {/* Header / Hero */}
            <div className="bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-6">
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Blog</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-8">
                        Deep dives into modern web development, software architecture, and the future of tech.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl items-start md:items-center">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full md:min-w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                            />
                        </div>

                        {/* Tags Filter */}
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${!selectedTag ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                >
                                    All
                                </button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedTag === tag ? 'bg-violet-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
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
                                <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 50}ms` }}>
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
