"use client"

import React, { useEffect, useRef } from 'react';
import { Package, Heart, CreditCard, Bell, Settings, LogOut, LogIn, UserPlus, FileText, ShoppingBag, HelpCircle, UserIcon, Gift } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {useAuth} from "@/app/hooks/useAuth";
import LoggedInContent from "@/components/customer/LoggedInContent";
import {AnonymousContent} from "@/components/customer/AnonymousContent";

interface AccountDropdownProps {
    wishlistCount: number;
    show: boolean;
    onCloseAction: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
                                                                    wishlistCount,
                                                                    show,
                                                                    onCloseAction,
                                                                }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { customer, isLoading, triggerLogin, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onCloseAction();
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [show, onCloseAction]);

    const handleLogin = async () => {
        try {
            await triggerLogin();
            onCloseAction();
        } catch (err) {
            // Error is handled in the context
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            onCloseAction();
        } catch (err) {
            // Error is handled in the context
        }
    };


    if (!show) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onCloseAction}
            />

            {/* Dropdown */}
            <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
                {customer ? (
                    <LoggedInContent
                        customer={customer}
                        wishlistCount={wishlistCount}
                        onCloseAction={onCloseAction}
                        handleLogout={handleLogout}
                        isLoading={isLoading}
                    />
                ) : (
                    <AnonymousContent
                        handleLogin={handleLogin}
                        onCloseAction={onCloseAction}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </>
    );
};

