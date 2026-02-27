import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    default: "Sahil Umraniya | Full Stack Engineer & AI Specialist",
    template: "%s | Sahil Umraniya"
  },
  description: "Sahil Umraniya is the best freelancer in Ahmedabad specializing in Next.js, MERN Stack, and Generative AI. Top-rated full stack engineer for high-performance websites in Ahmedabad, India.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Remote Full Stack Developer Ahmedabad",
    "Hire Indian Developer for Global Projects",
    "Global Custom Software Solutions",
    "Freelance Software Engineer India",
    "Offshore Development Partner Ahmedabad",
    "Custom Software Developer Ahmedabad",
    "Best freelancer in Ahmedabad",
    "Website developer in Ahmedabad",
    "Top freelancer for website in Ahmedabad",
    "Full Stack Engineer Ahmedabad",
    "Next.js Expert Ahmedabad",
    "Hire React Developer Ahmedabad",
    "Web Application Development Ahmedabad",
    "Freelance Software Engineer Gujarat",
    "AI Specialist Ahmedabad",
    "Generative AI Developer India",
    "MERN Stack Developer Ahmedabad",
    "Portfolio",
  ],

  metadataBase: new URL("https://sahilumraniya.dev"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Sahil Umraniya | Full Stack Engineer & AI Specialist",
    description: "Building scalable web applications with Next.js, Node.js, and Generative AI. 2+ years of experience in production-grade systems.",
    url: "https://sahilumraniya.dev",
    siteName: "Sahil Umraniya",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Sahil Umraniya — Full Stack Engineer & AI Specialist",
    }],
  },

  verification: {
    google: "EZCth_jgoQOWNUQ4Lab36S8Noqo9qfq8D-8IqIr8HSc",
    yandex: "108328dc714f9838",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sahil Umraniya | Full Stack & AI Developer",
    description: "Full Stack Engineer specializing in Next.js, MERN Stack, and Generative AI. Available for projects.",
    images: ["/og-image.png"],
    creator: "@2Umraniya",
    site: "@2Umraniya",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "google-site-verification": "EZCth_jgoQOWNUQ4Lab36S8Noqo9qfq8D-8IqIr8HSc",
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
};

// JSON-LD Structured Data — WebSite + Person + SearchAction
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sahilumraniya.dev/#website",
      url: "https://sahilumraniya.dev",
      name: "Sahil Umraniya",
      description: "Portfolio of Sahil Umraniya — Full Stack Engineer specializing in Next.js, MERN Stack, and Generative AI solutions.",
      publisher: { "@id": "https://sahilumraniya.dev/#person" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://sahilumraniya.dev/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": "https://sahilumraniya.dev/#person",
      name: "Sahil Umraniya",
      url: "https://sahilumraniya.dev",
      image: "https://sahilumraniya.dev/logo.png",
      jobTitle: "Full Stack Engineer",
      description: "Software engineer with 2+ years of experience building scalable web applications. Specializes in Next.js, MERN Stack, and Generative AI.",
      email: "sahilumraniya9512@gmail.com",
      telephone: "+919327201427",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Makarba",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380051",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Aditya Silver Oak Institute of Technology",
      },
      knowsAbout: [
        "React", "Next.js", "Node.js", "TypeScript", "MongoDB",
        "PostgreSQL", "Redis", "Generative AI", "LLMs", "RAG",
        "Docker", "AWS", "Full Stack Development",
      ],
      sameAs: [
        "https://github.com/sahilumraniya",
        "https://linkedin.com/in/sahilumraniya",
        "https://x.com/2Umraniya",
        "https://instagram.com/sahilumraniya_",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NR44ZS7M"
          height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Google Analytics — single instance via @next/third-parties */}
        <GoogleAnalytics gaId="G-2HK5K15GTV" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NR44ZS7M');`,
          }}
        />

        {/* Tawk.to Chat Widget */}
        <Script
          id="tawk-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            var Tawk_API = Tawk_API || { }, Tawk_LoadStart = new Date();
            (function () {
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/68cc50c4b4e505192359343b/1j5f1n0fr';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
          }}
        />

        {/* Structured Data — WebSite + Person (server-rendered for crawlers) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </body>
    </html>
  );
}