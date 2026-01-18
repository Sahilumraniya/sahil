"use client";

import { Save, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFaqPage() {
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async () => {
        if (!question || !answer) {
            setFeedback({ type: 'error', message: 'Please fill in all fields' });
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);
        try {
            const res = await fetch('/api/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, answer }),
            });

            if (res.ok) {
                setFeedback({ type: 'success', message: 'FAQ created successfully!' });
                setTimeout(() => router.push('/admin/faqs'), 1500);
            } else {
                setFeedback({ type: 'error', message: 'Failed to create FAQ' });
            }
        } catch (error) {
            setFeedback({ type: 'error', message: 'Network error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Link href="/admin/faqs" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                <ArrowLeft size={18} />
                Back to FAQs
            </Link>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create New FAQ</h1>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    <Save size={18} />
                    {isSubmitting ? 'Saving...' : 'Save FAQ'}
                </button>
            </div>

            {feedback && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'}`}>
                    {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold">{feedback.message}</span>
                </div>
            )}

            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="e.g. What is your hourly rate?"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Answer</label>
                    <textarea
                        rows={5}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the detailed answer here..."
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                    <span className="text-sm text-slate-500">This FAQ will be publicly visible upon saving.</span>
                </div>
            </div>
        </div>
    );
}
