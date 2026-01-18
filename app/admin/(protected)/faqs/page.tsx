"use client";

import { Plus, Search, Edit, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import FAQForm from "@/components/admin/FAQForm";
import { useEffect, useState } from "react";

interface Faq {
    _id: string;
    question: string;
    answer: string;
    createdAt: string;
    order: number;
}

export default function AdminFaqsPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState<Faq | undefined>(undefined);

    const fetchFaqs = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.set("search", search);

            const res = await fetch(`/api/faqs?${queryParams.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setFaqs(data);
            }
        } catch (error) {
            console.error("Failed to fetch FAQs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, [search]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this FAQ?")) return;

        try {
            const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
            if (res.ok) {
                setFaqs(faqs.filter((f) => f._id !== id));
            } else {
                alert("Failed to delete FAQ");
            }
        } catch (error) {
            alert("Error deleting FAQ");
        }
    };

    const handleReorder = async (reorderedFaqs: Faq[]) => {
        // Optimistically update the 'order' property for each item based on new index
        const updatedFaqs = reorderedFaqs.map((faq, index) => ({
            ...faq,
            order: index
        }));

        setFaqs(updatedFaqs);

        // Debounce or just save
        try {
            const payload = {
                faqs: updatedFaqs.map((f) => ({ _id: f._id, order: f.order }))
            };
            await fetch('/api/faqs', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error("Failed to save order");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">FAQs</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your frequently asked questions.</p>
                </div>
                <button
                    onClick={() => {
                        setSelectedFaq(undefined);
                        setIsDialogOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
                >
                    <Plus size={18} />
                    Add New FAQ
                </button>
            </div>

            {/* Search / Filters */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search FAQs..."
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                />
            </div>

            {/* List */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden min-h-[200px]">
                {loading ? (
                    <div className="p-8 text-center text-slate-500 animate-pulse">Loading FAQs...</div>
                ) : faqs.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <p>No FAQs found.</p>
                    </div>
                ) : (
                    <div className="bg-slate-50 dark:bg-black/20">
                        <Reorder.Group axis="y" values={faqs} onReorder={handleReorder} className="divide-y divide-slate-200 dark:divide-white/5">
                            {faqs.map((faq) => (
                                <Reorder.Item
                                    key={faq._id}
                                    value={faq}
                                    className="p-4 flex justify-between items-start bg-white dark:bg-[#111] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group relative"
                                >
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-2">
                                        <GripVertical size={20} />
                                    </div>
                                    <div className="pl-10 max-w-3xl">
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">{faq.question}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{faq.answer}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                setSelectedFaq(faq);
                                                setIsDialogOpen(true);
                                            }}
                                            className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq._id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>

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
                            className="fixed inset-4 md:inset-auto md:top-20 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 flex flex-col pointer-events-none"
                        >
                            <div className="pointer-events-auto">
                                <FAQForm
                                    initialData={selectedFaq}
                                    onSuccess={() => {
                                        setIsDialogOpen(false);
                                        fetchFaqs();
                                    }}
                                    onCancel={() => setIsDialogOpen(false)}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div >
    );
}
