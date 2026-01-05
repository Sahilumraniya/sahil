import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ContactUsSection from "@/components/Contact";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    default: "Sahil Umraniya | Full Stack Engineer",
    template: "%s | Sahil Umraniya" // Useful for other pages like "Blog | Sahil Umraniya"
  },
  description: "Portfolio of Sahil Umraniya - Full Stack Engineer specializing in Next.js, MERN Stack, and Generative AI solutions.",

  // 1. CLEANER KEYWORDS
  keywords: [
    "Sahil Umraniya",
    "Full Stack Engineer",
    "Next.js Developer",
    "MERN Stack",
    "Generative AI",
    "Web Developer India",
    "React Specialist",
    "Freelance Developer",
    "Software Engineer",
    "Ahmedabad Developer" // Local SEO is easier to rank for initially
  ],

  // 2. SELF-REFERENCE (Canonical is crucial)
  metadataBase: new URL("https://sahilumraniya.dev"),
  alternates: {
    canonical: "/",
  },

  // 3. OPEN GRAPH (For LinkedIn/Twitter/WhatsApp previews)
  openGraph: {
    title: "Sahil Umraniya | Full Stack Engineer",
    description: "Building scalable web apps with Next.js and AI.",
    url: "https://sahilumraniya.dev",
    siteName: "Sahil Umraniya",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/og-image.png", // Make sure this image exists in your /public folder!
      width: 1200,
      height: 630,
    }],
  },

  // 4. VERIFICATION (This is where you paste the real codes)
  verification: {
    google: "EZCth_jgoQOWNUQ4Lab36S8Noqo9qfq8D-8IqIr8HSc",
    yandex: "108328dc714f9838", // Optional, mostly for Russia/Eastern Europe
  },

  // 5. REMOVED: facebook, itunes, appLinks (unless you actually have a mobile app)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        {/* <meta name="google-site-verification" content="EZCth_jgoQOWNUQ4Lab36S8Noqo9qfq8D-8IqIr8HSc" /> */}
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <ContactUsSection />
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-2HK5K15GTV" />
      </body>
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
      {/* Inside your page component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sahil Umraniya",
            url: "https://sahilumraniya.dev",
            jobTitle: "Full Stack Engineer",
            sameAs: [
              "https://github.com/sahilumraniya",
              "https://linkedin.com/in/sahilumraniya"
            ]
          })
        }}
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-2HK5K15GTV"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2HK5K15GTV');
          `,
        }}
      />
    </html>
  );
}