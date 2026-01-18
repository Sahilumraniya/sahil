
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ContactUsSection from "@/components/Contact";

export default function WebsiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <ContactUsSection />
            <Footer />
        </>
    );
}
