'use client';
import { CheckCircle2, ChevronDown, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export function ContactForm() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

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

    const inputClasses = "w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 outline-none text-slate-900 dark:text-white transition-all duration-300 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";
    const labelClasses = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1";

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500"></div>

            <div className="space-y-6 mt-2">

                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Let's Collaborate</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Send me a message and I'll get back to you within 24 hours.
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
                            placeholder="+91 98765 43210"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="group relative">
                    <label className={labelClasses}>What brings you here?</label>
                    <div className="relative">
                        <select className={`${inputClasses} appearance-none cursor-pointer`} name='subject'>
                            <option>I have a freelance project</option>
                            <option>I want to hire you full-time</option>
                            <option>I need technical consultation</option>
                            <option>Just wanted to say hi!</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
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
                        w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98]
                        flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20
                        ${formState === 'success'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 hover:-translate-y-0.5'
                        }
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
            <div className="bg-white/90 dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 lg:p-24 relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-noise opacity-10"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">Ready to build?</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-8">I'm available for freelance projects and full-time roles. Let's create something extraordinary together.</p>
                        <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">
                            <a href="https://linkedin.com/in/sahilumraniya" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Linkedin /></a>
                            <a href="https://github.com/sahilumraniya" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Github /></a>
                            <a href="mailto:sahilumraniya9512@gmail.com" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Mail /></a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full"><ContactForm /></div>
                </div>
            </div>                </section>
    )
}

export default ContactUsSection;