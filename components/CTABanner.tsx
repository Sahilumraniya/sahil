'use client';

import { motion } from 'framer-motion';
import { Mail, Calendar, ArrowRight } from 'lucide-react';

export default function CTABanner() {
    return (
        <section className="px-4 sm:px-6 relative overflow-hidden flex justify-center">
            <div className="container mx-auto relative z-10 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[3rem] overflow-hidden"
                >
                    {/* Rich design system background */}
                    <div className="
                        relative px-6 py-20 sm:px-12 sm:py-24 text-center
                        ds-card border-[3px] border-transparent dark:border-[var(--ds-card-border)]
                    ">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

                        {/* Top highlight shine */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg text-slate-900 dark:text-white">
                                Let&apos;s Engineer Your <br />
                                <span className="text-violet-600 dark:text-violet-400">Next Product</span>
                            </h2>

                            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300">
                                Whether you need a full-stack engineer for your team or a freelance partner
                                for your next project — I deliver production-ready solutions on time.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">

                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/contact-us"
                                    className="group ds-btn w-full sm:w-auto px-8 py-4 font-bold text-lg hover:brightness-110 flex items-center justify-center gap-3"
                                >
                                    <Mail size={20} />
                                    <span>Start a Conversation</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://calendly.com/sahilumraniya9512/30min"
                                    target="_blank"
                                    className="ds-btn bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white w-full sm:w-auto px-8 py-4 font-bold text-lg hover:brightness-90 transition-all flex items-center justify-center gap-3"
                                >
                                    <Calendar size={20} />
                                    <span>Schedule a Call</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}