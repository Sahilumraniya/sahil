'use client';
import { CheckCircle2, ChevronDown, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react'

const SUBJECT_OPTIONS = [
    "I have a freelance project to discuss",
    "I want to hire you for a full-time role",
    "I need technical consultation or architecture review",
    "I want to collaborate on an open-source project",
    "General inquiry"
];

export function ContactForm() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [isSubjectOpen, setIsSubjectOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(SUBJECT_OPTIONS[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsSubjectOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        try {
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'), // Capture the phone number
                subject: formData.get('subject'),
                message: formData.get('message'),
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setFormState('success');
                form.reset();
                setTimeout(() => setFormState('idle'), 3000);
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormState('idle');
        }
    };

    const inputClasses = "ds-input w-full px-4 py-3.5 outline-none transition-all duration-300 placeholder:opacity-50 focus:ring-2 focus:ring-violet-500/50";
    const labelClasses = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1";

    return (
        <form
            onSubmit={handleSubmit}
            className="ds-card w-full p-8 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500"></div>

            <div className="space-y-6 mt-2">

                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Start a Conversation</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Tell me about your project. Average response time: <span className="font-semibold text-violet-600 dark:text-violet-400">under 4 hours</span>.
                    </p>
                </div>

                {/* Name - Full Width on Mobile, Half on Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="group md:col-span-2">
                        <label className={labelClasses}>Name</label>
                        <input
                            type="text"
                            name='name'
                            required
                            placeholder="John Doe"
                            className={inputClasses}
                        />
                    </div>

                    {/* Email */}
                    <div className="group">
                        <label className={labelClasses}>Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            placeholder="john@example.com"
                            className={inputClasses}
                        />
                    </div>

                    {/* Phone (Optional) */}
                    <div className="group">
                        <label className={labelClasses}>Phone <span className="text-slate-400 font-normal">(Optional)</span></label>
                        <input
                            type="tel"
                            name='phone'
                            placeholder="+91 9327201427"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="group relative" ref={dropdownRef}>
                    <label className={labelClasses}>What brings you here?</label>
                    <div className="relative">
                        <input type="hidden" name="subject" value={selectedSubject} />
                        <button
                            type="button"
                            className={`${inputClasses} flex items-center justify-between text-left`}
                            onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                        >
                            <span className="truncate pr-4">{selectedSubject}</span>
                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSubjectOpen && (
                            <div className="absolute z-50 w-full mt-2 ds-card py-2 shadow-2xl overflow-hidden focus:outline-none border border-slate-200 dark:border-white/10 max-h-60 overflow-y-auto">
                                {SUBJECT_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            setSelectedSubject(option);
                                            setIsSubjectOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${selectedSubject === option
                                            ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 font-semibold"
                                            : "text-[var(--ds-text,currentColor)] hover:bg-slate-100 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="group">
                    <label className={labelClasses}>Message</label>
                    <textarea
                        name='message'
                        required
                        rows={4}
                        placeholder="Tell me about your project needs, timeline, and tech stack..."
                        className={`${inputClasses} resize-none`}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={formState !== 'idle'}
                    className={`
                        ds-btn w-full py-4 font-bold transition-all duration-300 transform active:scale-[0.98]
                        flex items-center justify-center gap-2 hover:brightness-110 hover:-translate-y-0.5
                        ${formState === 'success' && '!bg-green-500 !text-white !border-green-500'}
                        disabled:opacity-70 disabled:cursor-not-allowed
                    `}
                >
                    {formState === 'submitting' ? (
                        <><Loader2 className="animate-spin" size={20} /> Sending...</>
                    ) : formState === 'success' ? (
                        <><CheckCircle2 size={20} /> Message Sent!</>
                    ) : (
                        <><Send size={20} /> Send Message</>
                    )}
                </button>
            </div>
        </form>
    );
};

const ContactUsSection = () => {

    const current_path = usePathname();
    if (current_path === '/contact-us') {
        return null; // Do not render the section on the /contact page
    }

    return (
        <section id="contact" className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-32 mb-24 sm:mb-32">
            <div className="ds-card text-slate-900 dark:text-white p-6 sm:p-10 lg:p-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-10"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Decorative Tech Pattern Illustration */}
                {/* <div className="absolute top-10 -right-20 w-[300px] h-[300px] opacity-[0.05] dark:opacity-[0.03] pointer-events-none -z-10 animate-float">
                    <Image
                        src="/tech-pattern.png"
                        alt="Geometric Pattern"
                        width={300}
                        height={300}
                        className="w-full h-full object-contain"
                    />
                </div> */}

                <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        {/* Photo */}
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/80 dark:border-white/10 shadow-lg mb-6 mx-auto lg:mx-0 group cursor-pointer">
                            <Image
                                src="/sahil-about.png"
                                alt="Sahil Umraniya"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="96px"
                            />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">Start Your Project Today</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-8">Looking for a reliable Full Stack Engineer for your next project or team? I&apos;m available for both freelance work and full-time opportunities. Let&apos;s create something extraordinary together.</p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-white/5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Based in Ahmedabad, Gujarat
                            </div>
                            <div className="flex gap-3 sm:gap-4 w-full lg:w-auto justify-center lg:justify-start">
                                <a href="https://linkedin.com/in/sahilumraniya" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Linkedin /></a>
                                <a href="https://github.com/sahilumraniya" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Github /></a>
                                <a href="mailto:sahilumraniya9512@gmail.com" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Mail /></a>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full"><ContactForm /></div>
                </div>
            </div>                </section>
    )
}

export default ContactUsSection;