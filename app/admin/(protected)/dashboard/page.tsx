"use client";

import {
    Users,
    FileText,
    HelpCircle,
    TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        views: 0,
        blogs: 0,
        faqs: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [blogsRes, faqsRes] = await Promise.all([
                    fetch('/api/blogs'),
                    fetch('/api/faqs')
                ]);

                const blogsData = await blogsRes.json();
                const faqsData = await faqsRes.json();

                // Calculate total views from blogs
                const totalViews = Array.isArray(blogsData)
                    ? blogsData.reduce((acc: number, blog: any) => acc + (blog.views || 0), 0)
                    : 0;

                setStats({
                    views: totalViews,
                    blogs: Array.isArray(blogsData) ? blogsData.length : 0,
                    faqs: Array.isArray(faqsData) ? faqsData.length : 0
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statItems = [
        { label: "Total Views", value: stats.views.toLocaleString(), change: "+12%", icon: Users, color: "blue" },
        { label: "Total Blogs", value: stats.blogs.toString(), change: "+4", icon: FileText, color: "violet" },
        { label: "FAQs", value: stats.faqs.toString(), change: "+0", icon: HelpCircle, color: "emerald" },
        { label: "Engagement", value: "98%", change: "+2%", icon: TrendingUp, color: "amber" },
    ];

    if (loading) {
        return <div className="p-8 text-center text-slate-500 animate-pulse">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back. Here's what's happening with your content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statItems.map((stat) => (
                    <div key={stat.label} className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                            <span>Dashboard statistics synchronized</span>
                            <span className="ml-auto text-xs opacity-60">Just now</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
