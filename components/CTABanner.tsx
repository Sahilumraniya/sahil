'use client';

import { motion } from 'framer-motion';
import { Mail, Calendar, ArrowRight } from 'lucide-react';

export default function CTABanner() {
    return (
        <section className="px-4 sm:px-6 relative overflow-hidden flex justify-center">

            {/* --- 1. Ambient Background Animation (Matches ImpactStats) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
                />
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto relative z-10 max-w-5xl">

                {/* --- 2. The Glass Container --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[3rem] overflow-hidden p-[1px]" // Padding for border gradient
                >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-white/10 rounded-[3rem]"></div>

                    {/* Inner Glass Card */}
                    <div className="relative bg-black/40 backdrop-blur-3xl rounded-[2.9rem] px-6 py-20 sm:px-12 sm:py-24 text-center border-t border-white/10 shadow-2xl">

                        {/* Inner Highlight */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                                Ready to build something <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-indigo-200">extraordinary?</span>
                            </h2>

                            <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
                                I am currently accepting new freelance projects and full-time opportunities.
                                Let's turn your vision into a high-performance reality.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">

                                {/* Primary Button: High Contrast White */}
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/contact-us"
                                    className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow flex items-center justify-center gap-3"
                                >
                                    <Mail size={20} className="text-black" />
                                    <span>Send a Message</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </motion.a>

                                {/* Secondary Button: Glassy */}
                                <motion.a
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    href="https://calendly.com/sahilumraniya9512/30min"
                                    target="_blank"
                                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg hover:border-white/30 transition-all flex items-center justify-center gap-3"
                                >
                                    <Calendar size={20} />
                                    <span>Schedule Call</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}