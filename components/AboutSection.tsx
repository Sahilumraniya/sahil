'use client';

import { motion } from 'framer-motion';
import { User2, MapPin, GraduationCap, Coffee } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            More than just code. <br />
                            <span className="opacity-60">I build digital experiences.</span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            I am a **Computer Engineering Graduate** from Aditya Silver Oak Institute of Technology (Class of 2025).
                            With a strong academic foundation and over 2 years of hands-on development experience, I bridge the gap between complex backend logic and intuitive user interfaces.
                        </p>

                        {/* CHANGED SECTION BELOW */}
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            When I'm not debugging a race condition in Node.js or fine-tuning a React component, you can find me exploring the latest in Generative AI or architecting sophisticated developer tools work on <span className="text-violet-600 font-semibold">Retro Table</span>.
                        </p>

                        <div className="pt-4 border-l-4 border-violet-500 pl-6">
                            <p className="italic text-slate-500 dark:text-slate-400 font-serif text-xl">
                                "Always bet on JavaScript."
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.div whileHover={{ y: -5 }} className="ds-card p-6 shadow-sm">
                            <MapPin className="w-8 h-8 text-rose-500 mb-4" />
                            <h3 className="font-bold text-slate-900 dark:text-white">Ahmedabad, IN</h3>
                            <p className="text-sm text-slate-500">My home base</p>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="ds-card p-6 shadow-sm mt-8">
                            <GraduationCap className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="font-bold text-slate-900 dark:text-white">B.E. Comp Eng.</h3>
                            <p className="text-sm text-slate-500">Graduated 2025</p>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="ds-card p-6 shadow-sm">
                            <User2 className="w-8 h-8 text-violet-500 mb-4" />
                            <h3 className="font-bold text-slate-900 dark:text-white">Freelancer</h3>
                            <p className="text-sm text-slate-500">Available for hire</p>
                        </motion.div>
                        <motion.div whileHover={{ y: -5 }} className="ds-card p-6 shadow-sm mt-8">
                            <Coffee className="w-8 h-8 text-orange-500 mb-4" />
                            <h3 className="font-bold text-slate-900 dark:text-white">Tech Enthusiast</h3>
                            <p className="text-sm text-slate-500">Full Stack & AI</p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}