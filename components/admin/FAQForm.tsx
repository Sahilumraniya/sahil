"use client";

import { Save, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface FAQFormProps {
    initialData?: {
        _id?: string;
        question: string;
        answer: string;
    };
    onSuccess: () => void;
    onCancel: () => void;
}

export default function FAQForm({ initialData, onSuccess, onCancel }: FAQFormProps) {
    const [question, setQuestion] = useState(initialData?.question || "");
    const [answer, setAnswer] = useState(initialData?.answer || "");
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
            const url = initialData?._id ? `/api/faqs/${initialData._id}` : '/api/faqs';
            const method = initialData?._id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, answer }),
            });

            if (res.ok) {
                setFeedback({ type: 'success', message: initialData?._id ? 'Updated successfully!' : 'Created successfully!' });
                setTimeout(() => onSuccess(), 1000);
            } else {
                setFeedback({ type: 'error', message: 'Failed to save FAQ' });
            }
        } catch (error) {
            setFeedback({ type: 'error', message: 'Network error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl w-full max-w-2xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {initialData?._id ? "Edit FAQ" : "New FAQ"}
                </h2>
                <button
                    onClick={onCancel}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                    Close
                </button>
            </div>

            {feedback && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'}`}>
                    {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-bold">{feedback.message}</span>
                </div>
            )}

            <div className="space-y-4">
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
            </div>

            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
                <Save size={18} />
                {isSubmitting ? 'Saving...' : 'Save FAQ'}
            </button>
        </div>
    );
}
