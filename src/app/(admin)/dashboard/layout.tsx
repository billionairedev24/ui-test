'use client'

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import {ResponsiveContainer} from "recharts";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <ResponsiveContainer>
            <div className="min-h-screen bg-background flex">
                <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed}/>
                <div
                    className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'sm:ml-16' : 'sm:ml-64'}`}>
                    <AdminNavbar isSidebarCollapsed={isSidebarCollapsed}/>
                    <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-auto mt-12">
                        {children}
                    </main>
                </div>
            </div>
        </ResponsiveContainer>
    )
}