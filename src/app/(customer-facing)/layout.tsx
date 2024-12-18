"use client"
import React from "react";
import Footer from "@/components/customer/Footer";
import Navbar from "@/components/customer/Navbar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <div className="min-h-screen pt-20">
                <Navbar/>
                {children}
                <Footer/>
            </div>
    );
}