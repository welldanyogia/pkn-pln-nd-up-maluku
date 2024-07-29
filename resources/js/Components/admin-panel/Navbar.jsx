import React from 'react';
// import { ModeToggle } from '@/Components/ui/mode-toogle';
import { UserNav } from '@/Components/admin-panel/UserNav.jsx';
import { SheetMenu } from '@/Components/admin-panel/SheetMenu.jsx';

export function Navbar({ title,user }) {
    // bg-background/95
    return (
        <header className="sticky top-0 z-10 w-full bg-gradient-to-r from-[#F7EEEE] to-fountain-blue-400 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1 className="font-bold text-fountain-blue-500">{title}</h1>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    {/*<ModeToggle />*/}
                    <UserNav user={user}/>
                </div>
            </div>
        </header>
    );
}
