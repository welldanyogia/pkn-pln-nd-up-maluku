import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, PanelsTopLeft } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Menu } from './Menu.jsx';
import { Sheet, SheetHeader, SheetContent, SheetTrigger } from '@/Components/ui/sheet';

export function SheetMenu() {
    const appName = import.meta.env.VITE_APP_NAME || 'SMAK-PLN';
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden bg-[#F7EEEE]" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-72 px-3 h-full flex flex-col bg-[#F7EEEE]" side="left">
                <SheetHeader>
                    <Button
                        className="flex justify-center items-center pb-2 pt-1"
                        variant="link"
                        asChild
                    >
                        <Link to="/admin/dashboard" className="flex items-center gap-2">
                            {/*<PanelsTopLeft className="w-6 h-6 mr-1" />*/}
                            <img src={"/logo.png"} width={"80"} height={"80"} className='p-2 mr-1'/>
                            <h1 className="font-bold text-lg">{appName}</h1>
                        </Link>
                    </Button>
                </SheetHeader>
                <Menu isOpen/>
            </SheetContent>
        </Sheet>
    );
}
