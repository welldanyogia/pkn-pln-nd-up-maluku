import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LayoutGrid, LogOut, User} from 'lucide-react';
import {Button} from '@/Components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/Components/ui/avatar';
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from '@/Components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu';
import axios from 'axios';
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.jsx";
import {router} from "@inertiajs/react";

// import { handleSignOut } from '../actions/signout';

export function UserNav({user}) {
    // const [user, setUser] = useState(null);
    // const [initials, setInitials] = useState('');
    const navigate = useNavigate();
    const nameParts = user.name.split(' ');
    const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[1][0] : nameParts[0][0];

    const handleSignOut = async () => {
        try {
            await router.post(route('logout'));
            // Inertia::navigate('/')
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-10 w-54 max-sm:w-auto max-sm:gap-0 rounded-xl bg-fountain-blue-400 text-white hover:bg-gradient-to-r from-white to-fountain-blue-400 gap-4  hover:text-fountain-blue-500"
                            >
                                <div className="flex flex-col space-y-1 max-sm:hidden">
                                    <p className="text-sm text-left font-medium leading-none border-b-2 ">{user?.name}</p>
                                    <p className="text-xs text-left leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                                <Avatar className="h-8 w-8 border-2 border-white">
                                    <AvatarImage src="#" alt="Avatar"/>
                                    <AvatarFallback className="bg-transparent">{initials.toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <a href="/dashboard" className="flex items-center">
                            <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
                            Dashboard
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <a href="/profile" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground"/>
                            Profil
                        </a>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="hover:cursor-pointer"
                    onClick={() => {
                        handleSignOut()
                    }}
                >
                    {/*<Link href={route('logout')}  >*/}
                        <LogOut className="w-4 h-4 mr-3 text-muted-foreground"/>
                        Sign out
                    {/*</Link>*/}
                    {/*<ResponsiveNavLink method="post" href={route('logout')} as="button">*/}
                    {/*    <LogOut className="w-4 h-4 mr-3 text-muted-foreground"/>*/}

                    {/*    Sign Out*/}
                    {/*</ResponsiveNavLink>*/}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
