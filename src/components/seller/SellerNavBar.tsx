"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SellerNavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSignIn = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <nav className="bg-black border-b border-yellow-400/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/seller" className="flex items-center space-x-3">
                        <div className="relative h-10 w-10">
                            <Image
                                src="/images/logo.png"
                                alt="AfroTransact Logo"
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <span className="text-yellow-400 text-xl font-bold">AfroTransact</span>
                    </Link>

                    {/* Auth Buttons / User Menu */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="text-yellow-400 hover:text-yellow-500">
                                        <UserCircle className="h-5 w-5 mr-2" />
                                        Demo User
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem>
                                        <Link href="/seller/profile" className="flex items-center w-full">
                                            Profile Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    className="text-yellow-400 hover:text-yellow-500"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </Button>
                                <Link href="/register?as=seller">
                                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SellerNavBar;