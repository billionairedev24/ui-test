import React from 'react';
import { LogIn, UserPlus, ShoppingBag, HelpCircle, User } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {MenuLink} from "@/components/customer/MenuLink";

interface AnonymousContentProps {
    handleLogin: () => void;
    onCloseAction: () => void;
    isLoading: boolean;
}

export const AnonymousContent: React.FC<AnonymousContentProps> = ({
                                                                      handleLogin,
                                                                      onCloseAction,
                                                                      isLoading
                                                                  }) => {
    return (
        <>
            <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                    </div>
                    <div>
                        <p className="text-lg sm:text-xl font-semibold text-black">Welcome, Guest!</p>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <Button
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 transition-colors duration-200"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    <LogIn className="w-5 h-5 mr-2" />
                    <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                </Button>

                <Button
                    variant="outline"
                    className="w-full border-yellow-400 text-black hover:bg-yellow-400/10 transition-colors duration-200"
                    asChild
                >
                    <Link
                        href="/register"
                        onClick={onCloseAction}
                    >
                        <UserPlus className="w-5 h-5 mr-2" />
                        <span>Create Account</span>
                    </Link>
                </Button>
            </div>

            <div className="border-t border-gray-100">
                <MenuLink href="/track-order" icon={<ShoppingBag />} onCloseAction={onCloseAction}>
                    Track Order
                </MenuLink>
                <MenuLink href="/help" icon={<HelpCircle />} onCloseAction={onCloseAction}>
                    Help Center
                </MenuLink>
            </div>
        </>
    );
};

