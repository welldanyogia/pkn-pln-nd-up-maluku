import React from 'react';
import { Link } from 'react-router-dom';
import { PanelsTopLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/useStore.js';
import { Button } from '@/Components/ui/button';
import { Menu } from './Menu.jsx';
import { useSidebarToggle } from '@/hooks/useSidebarToogle.js';
import { SidebarToggle } from './SideBarToogle.jsx';
// import 'dotenv/config'

export function Sidebar() {
    const appName = import.meta.env.VITE_APP_NAME || 'SMAK-PLN'; // Fallback value if env var is not set
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-[90px]" : "w-72"
            )}
        >
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
            <div className="relative h-full bg-[#F7EEEE] flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link to="/admin/dashboard" className="flex items-center gap-2 text-fountain-blue-500">
                        <img
                            src={"/aku-jago.png"}
                            alt="Logo"
                            className="p-2" // Menggunakan padding untuk jarak
                            style={{ width: 'auto', height: 'auto', maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} // Menjaga ukuran proporsional
                        />
                        <h1
                            className={cn(
                                "font-bold text-lg text-fountain-blue-400 whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                                sidebar?.isOpen === false
                                    ? "-translate-x-96 opacity-0 hidden"
                                    : "translate-x-0 opacity-100"
                            )}
                        >
                            {appName}
                        </h1>
                    </Link>
                </Button>

                <Menu isOpen={sidebar?.isOpen} />
            </div>
        </aside>
    );
}
