"use client"
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";
import {ourFileRouter} from "@/app/api/uploadthing/core";
import {Inter as FontSans} from "next/font/google";
import "@/style/globals.css";
import {cn} from "@/lib/utils";
import React, {useState} from "react";
import {Toaster} from "@/components/ui/toaster"
import {ApolloProvider} from "@apollo/client";
import {graphqlClient} from "@/graphql/setup";
import {AuthProvider} from "@/app/(auth)/provider/AuthProvider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning>

        <body className={cn("min-h-screen overscroll-none overflow-x-hidden font-sans flex flex-col antialiasing",
            fontSans.variable,
            {
                "debug-screens": process.env.NODE_ENV === "development"
            }
        )}>

        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
        <ApolloProvider client={graphqlClient}>
            <AuthProvider>
                {children}
                <Toaster/>
            </AuthProvider>
        </ApolloProvider>
        </body>
        </html>
    );
}
