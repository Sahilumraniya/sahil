"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Tag as TagIcon, Edit, X } from "lucide-react";

interface Tag {
    _id: string;
    name: string;
    slug: string;
}

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTagName, setNewTagName] = useState("");
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTags = async () => {
        try {
            const res = await fetch("/api/tags");
            if (res.ok) {
                const data = await res.json();
                setTags(data);
            }
        } catch (error) {
            console.error("Failed to fetch tags");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTagName.trim()) return;

        setIsSubmitting(true);
        try {
            const method = editingTag ? "PUT" : "POST";
            const body = editingTag ? { _id: editingTag._id, name: newTagName } : { name: newTagName };

            const res = await fetch("/api/tags", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setNewTagName("");
                setEditingTag(null);
                fetchTags();
            } else {
                alert("Failed to save tag (possibly duplicate)");
            }
        } catch (error) {
            console.error("Error saving tag");
        } finally {
            setIsSubmitting(false);
        }
    };

    const startEdit = (tag: Tag) => {
        setEditingTag(tag);
        setNewTagName(tag.name);
    };

    const cancelEdit = () => {
        setEditingTag(null);
        setNewTagName("");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this tag?")) return;

        try {
            const res = await fetch(`/api/tags/${id}`, { method: "DELETE" });
            if (res.ok) {
                setTags(tags.filter((t) => t._id !== id));
            } else {
                alert("Failed to delete tag");
            }
        } catch (error) {
            console.error("Error deleting tag");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Tags</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage master tags for blog posts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Create/Edit Tag Form */}
                <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-slate-200 dark:border-white/10 h-fit">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                            {editingTag ? "Edit Tag" : "Add New Tag"}
                        </h2>
                        {editingTag && (
                            <button onClick={cancelEdit} className="text-slate-400 hover:text-red-500">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tag Name</label>
                            <input
                                type="text"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                placeholder="e.g. React"
                                className="w-full mt-2 px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !newTagName.trim()}
                            className={`w-full flex justify-center items-center gap-2 px-4 py-3 text-white rounded-xl font-bold transition-all disabled:opacity-50 ${editingTag ? "bg-blue-600 hover:bg-blue-700" : "bg-violet-600 hover:bg-violet-700"
                                }`}
                        >
                            {editingTag ? <Edit size={18} /> : <Plus size={18} />}
                            {isSubmitting ? "Saving..." : editingTag ? "Update Tag" : "Add Tag"}
                        </button>
                    </form>
                </div>

                {/* Tags List */}
                <div className="md:col-span-2 bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500 animate-pulse">Loading tags...</div>
                    ) : tags.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">No tags found. Add one to get started.</div>
                    ) : (
                        <div className="divide-y divide-slate-200 dark:divide-white/5">
                            {tags.map((tag) => (
                                <div key={tag._id} className="p-4 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
                                            <TagIcon size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">{tag.name}</p>
                                            <p className="text-xs text-slate-500 font-mono">slug: {tag.slug}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEdit(tag)}
                                            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(tag._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
