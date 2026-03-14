"use client";

import { useEffect, useState } from "react";
import githubSlugger from "github-slugger";

const slugger = new githubSlugger();

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ content }: { content: string }) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Parse headings from markdown
        const regex = /^(#{2,3})\s+(.+)$/gm;
        const found: TOCItem[] = [];
        let match;

        slugger.reset();

        while ((match = regex.exec(content)) !== null) {
            const level = match[1].length; // 2 or 3
            // Strip markdown syntax (bold, italic, code) from the text
            const text = match[2]
                .replace(/\*\*(.*?)\*\*/g, '$1') // Bold **text**
                .replace(/__(.*?)__/g, '$1')     // Bold __text__
                .replace(/\*(.*?)\*/g, '$1')     // Italic *text*
                .replace(/_(.*?)_/g, '$1')       // Italic _text_
                .replace(/`([^`]+)`/g, '$1');    // Code `text`

            const id = slugger.slug(text);

            found.push({ id, text, level });
        }

        setHeadings(found);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="hidden xl:block w-72 shrink-0">
            <div className="sticky top-28 p-6 ds-card space-y-4">
                <h3 className="font-bold text-[var(--ds-text,currentColor)] uppercase tracking-widest text-xs opacity-70">Table of Contents</h3>
                <nav className="flex flex-col space-y-2">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(heading.id);
                            }}
                            className={`text-sm transition-colors py-1 block ${activeId === heading.id
                                ? "text-violet-600 dark:text-violet-400 font-bold border-l-2 border-violet-500 pl-3"
                                : "text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 pl-3 border-l-2 border-transparent"
                                } ${heading.level === 3 ? "ml-4 text-xs" : ""}`}
                        >
                            {heading.text}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}
