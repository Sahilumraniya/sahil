const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            <div className="fixed inset-0 -z-10 h-full w-full">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-200 dark:bg-violet-900/20 rounded-full blur-[120px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000 opacity-50"></div>
            </div>

            <main className="pt-8 pb-10">
                <div className="container mx-auto px-4 sm:px-6">
                    {children}
                </div>
            </main>

        </div>

    )
}

export default layout