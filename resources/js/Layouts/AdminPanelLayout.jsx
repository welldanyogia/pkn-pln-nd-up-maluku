import React from 'react';
import { cn } from '../lib/utils';
import { useStore } from '@/hooks/useStore.js';
import { Footer } from '@/Components/admin-panel/Footer.jsx';
import { Sidebar } from '@/Components/admin-panel/Sidebar.jsx';
import { useSidebarToggle } from '@/hooks/useSidebarToogle.js';

export default function AdminPanelLayout({ children }) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {/*<Footer />*/}
            </footer>
        </>
    );
}
