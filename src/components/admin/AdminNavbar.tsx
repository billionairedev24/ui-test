"use client"
import React from 'react'
import { Bell, Search, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import {useAuth} from "@/app/hooks/useAuth";

interface AdminNavbarProps {
    isSidebarCollapsed: boolean;
}

const AdminSidebar = ({ isSidebarCollapsed }: AdminNavbarProps) => {

    const { triggerLogin } = useAuth()
    return (
        <nav
            className={`fixed top-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-2.5 h-16 flex items-center transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'left-16' : 'left-64'}`}>
            <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/dashboard" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Admin Portal</span>
                    </Link>
                </div>
                <div className="flex items-center lg:order-2">
                    <div className="relative mr-3">
                        <Input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                            placeholder="Search"
                        />
                        <Button variant="ghost" size="sm" className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Search className="w-5 h-5 text-gray-500"/>
                        </Button>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-6 w-6"/>
                                <span className="sr-only">View notifications</span>
                                <div
                                    className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">8
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>New order received</DropdownMenuItem>
                            <DropdownMenuItem>Product out of stock</DropdownMenuItem>
                            <DropdownMenuItem>New user registered</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-3">
                                <User className="h-6 w-6"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem onClick={triggerLogin}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default AdminSidebar
