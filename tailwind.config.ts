import type { Config } from "tailwindcss";

const config: Config = {
    // CRITICAL: This allows next-themes to toggle the class on the HTML tag
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-outfit)', 'sans-serif'],
                mono: ['var(--font-jetbrains-mono)', 'monospace'],
            },
            animation: {
                'scroll-left': 'scroll-left 40s linear infinite',
                'scroll-right': 'scroll-right 40s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                'scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'scroll-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'shimmer': {
                    from: { backgroundPosition: '0 0' },
                    to: { backgroundPosition: '-200% 0' },
                },
            },
        },
    },
    plugins: [],
};
export default config;