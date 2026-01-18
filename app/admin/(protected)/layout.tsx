
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto h-screen relative scroll-smooth">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 w-full max-w-7xl mx-auto">
                    <AdminHeader />
                    {children}
                </div>
            </main>
        </div>
    );
}
