"use client";

import { Plus, Search, Edit, Trash2, Eye, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BlogForm from "@/components/admin/BlogForm";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    status: string;
    views: number;
    createdAt: string;
    readTime?: number;
    image?: string;
    content?: string;
    excerpt?: string;
    tags?: string[];
    seoDescription?: string;
}

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);

    const router = useRouter();

    const fetchBlogs = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.set("search", search);
            if (statusFilter !== "All Status") queryParams.set("status", statusFilter);

            const res = await fetch(`/api/blogs?${queryParams.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error("Failed to fetch blogs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [search, statusFilter]);

    const handleCreate = () => {
        setSelectedBlog(undefined);
        setIsDialogOpen(true);
    };

    const handleEdit = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsDialogOpen(true);
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        fetchBlogs();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to move this post to trash?")) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
            if (res.ok) {
                if (statusFilter === 'Deleted') {
                    setBlogs(blogs.filter((b) => b._id !== id));
                } else {
                    setBlogs(blogs.filter((b) => b._id !== id));
                }
                fetchBlogs();
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            alert("Error deleting post");
        }
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog Posts</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your articles and tutorials.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
                >
                    <Plus size={18} />
                    Write New Post
                </button>
            </div>

            {/* Search / Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option className="text-red-500 font-bold">Deleted</option>
                </select>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden min-h-[300px]">
                {loading ? (
                    <div className="p-8 text-center text-slate-500 animate-pulse">Loading posts...</div>
                ) : blogs.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <p>No posts found.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/5 text-xs uppercase tracking-wider text-slate-500 font-bold bg-slate-50 dark:bg-white/5">
                                <th className="p-4">Post</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Views</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-white/10 overflow-hidden relative shrink-0">
                                                {blog.image ? (
                                                    <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                        <Eye size={16} />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{blog.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${blog.status === "Published"
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                            : blog.status === "Deleted"
                                                ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                                                : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                                            }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-400 font-mono text-sm">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1" title="Views">
                                                <Eye size={14} />
                                                {blog.views}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs opacity-70" title="Read Time">
                                                <span className="font-bold">{blog.readTime || '<1'}</span> min read
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(blog)}
                                                className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal Dialog */}
            <AnimatePresence>
                {isDialogOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDialogOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-4 md:inset-10 bg-white dark:bg-[#111] rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                        >
                            <BlogForm
                                initialData={selectedBlog}
                                onSuccess={handleSuccess}
                                onCancel={() => setIsDialogOpen(false)}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
