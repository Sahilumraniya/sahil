"use client";

import { ArrowLeft, ExternalLink, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const achievements = [
    {
        organization: "Oracle",
        title: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
        details:
            "Participated in training on deploying and optimizing generative AI solutions using Oracle Cloud Infrastructure.",
        date: "July 17, 2024",
        icon: "🏆",
        link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=1BBB15E94D645DE45156935112528F197168D2E99FF1C73FBB5D6779153A7E32",
    },
    {
        organization: "SAP | Code Unnati",
        title: "Advanced Course Certification: Machine Learning & IoT Training",
        details:
            "Participated in training on Machine Learning, IoT, Deep Learning, Computer Vision, and ABAP under the Code Unnati Program.",
        date: "May 01, 2024",
        icon: "📚",
        link: "https://codeunnati.edunetfoundation.com/verify-certificate/CU24_8889",
    },
    {
        organization: "Smartters Software",
        title: "Successfully Completion of Internship",
        details:
            "Successfully completed an internship at Smartters Software, where I gained valuable practical experience by contributing to real-world projects in software development and project management.",
        date: "August 31, 2024",
        icon: "💼",
        link: "https://drive.google.com/file/d/1YiFImKXrM7FwNQ0L7i9YBWoLQHUwWwHX/view?usp=drive_link",
    },
    {
        organization: "Royal Technosoft",
        title: "Advanced Java",
        details:
            "Participated in an Advanced Java course, focusing on complex programming concepts and Java application development.",
        date: "April 04, 2024",
        icon: "☕",
        link: "https://certopus.com/c/6f0242c3e46d42078ee4968f5ce8d5e4",
    },
];

export default function CertificatesSecrions() {
    return (

        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 sm:px-6">

                <SectionHeading title="Certifications & Achievements" description="Professional certifications and accomplishments that demonstrate my expertise and commitment to continuous learning." />

                <div className="max-w-4xl mx-auto grid gap-6">
                    {achievements.map((cert, idx) => (
                        <a
                            key={idx}
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-violet-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        >
                            <div className="flex items-start gap-6">
                                <div className="text-5xl flex-shrink-0">{cert.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div>
                                            <div className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-1">
                                                {cert.organization}
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors mb-2">
                                                {cert.title}
                                            </h3>
                                        </div>
                                        <ExternalLink
                                            size={20}
                                            className="text-slate-400 group-hover:text-violet-500 transition-colors flex-shrink-0 mt-1"
                                        />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                                        {cert.details}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                                        <Award size={16} />
                                        {cert.date}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>

    );
}
