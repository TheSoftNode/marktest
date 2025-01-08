"use client"

import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, User, UserPlus } from 'lucide-react';
import Logo from '../Landing/Logo';
import Link from 'next/link';
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () =>
{
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () =>
        {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`
        fixed top-0 left-0 right-0 h-20 z-50 px-4 md:px-8 
        transition-all duration-300
        ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-md'
                    : 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 backdrop-blur-sm'
                }
      `}
        >
            <div className="relative h-full flex items-center justify-between">
                {/* Logo area */}
                <Link href="/">
                    <div className="relative flex items-center">
                        <Logo />
                        <span className="relative top-[-16px] left-[2px] text-[0.8rem] font-extrabold">
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
                                TM
                            </span>
                            {/* Animated dot after TM */}
                            <span className="absolute -bottom-0.5 right-0 w-1 h-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></span>
                        </span>
                    </div>
                </Link>

                {/* Right side elements */}
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={`
                  group relative flex items-center justify-center 
                  w-10 h-10 rounded-full border border-indigo-700
                  transition-all duration-300 ease-in-out
                  overflow-hidden
                  ${isScrolled
                                        ? 'bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-600/10 hover:from-blue-600/20 hover:via-indigo-500/20 hover:to-purple-600/20'
                                        : 'bg-white/10 hover:bg-white/20'
                                    }
                  before:content-[''] before:absolute before:inset-0 
                  before:bg-gradient-to-r before:from-blue-600 before:via-indigo-500 before:to-purple-600 
                  before:opacity-0 before:transition-opacity before:duration-300
                  hover:before:opacity-20
                  after:content-[''] after:absolute after:inset-0 
                  after:bg-gradient-to-r after:from-blue-600 after:via-indigo-500 after:to-purple-600 
                  after:opacity-0 after:blur-xl after:transition-opacity after:duration-300
                  hover:after:opacity-20
                `}
                            >
                                <User
                                    size={20}
                                    className={`
                    relative z-10 text-indigo-600 
                    transition-all duration-300  
                    ${isScrolled
                                            ? 'text-gray-800 group-hover:text-indigo-600'
                                            : 'text-indigo-600  drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]'
                                        } 
                    group-hover:scale-110
                  `}
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-64 mt-2 p-2 bg-white/95 backdrop-blur-xl border-0 shadow-2xl shadow-indigo-500/10 
                         rounded-xl overflow-hidden relative"
                            sideOffset={8}
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-10"></div>

                            {!isAuthenticated ? (
                                <>
                                    <Link href="/login">
                                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 m-1 rounded-lg cursor-pointer
                      transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/10 hover:via-indigo-500/10 hover:to-purple-600/10
                      group relative overflow-hidden">
                                            <LogIn size={18} className="text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">Log In</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-2 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20" />
                                    <Link href="/signup">
                                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 m-1 rounded-lg cursor-pointer
                      transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/10 hover:via-indigo-500/10 hover:to-purple-600/10
                      group relative overflow-hidden">
                                            <UserPlus size={18} className="text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">Sign Up</span>
                                        </DropdownMenuItem>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/profile">
                                        <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 m-1 rounded-lg cursor-pointer
                      transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/10 hover:via-indigo-500/10 hover:to-purple-600/10
                      group relative overflow-hidden">
                                            <User size={18} className="text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                                            <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">Profile</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator className="my-2 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-600/20" />
                                    <DropdownMenuItem
                                        className="flex items-center gap-3 px-4 py-3 m-1 rounded-lg cursor-pointer
                      transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600/10 hover:to-red-600/10
                      group relative overflow-hidden"
                                        onClick={() => setIsAuthenticated(false)}
                                    >
                                        <LogOut size={18} className="text-red-600 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="font-medium text-red-600 group-hover:text-red-700 transition-colors duration-300">Log Out</span>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;