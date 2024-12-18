import React from 'react';
import { User, Package, Heart, CreditCard, Bell, Settings, LogOut, Gift, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {MenuLink} from "@/components/customer/MenuLink";
import {Customer} from "@/types/types";

interface LoggedInContentProps {
    customer: Customer
    wishlistCount: number;
    onCloseAction: () => void;
    handleLogout: () => void;
    isLoading: boolean;
}

const LoggedInContent: React.FC<LoggedInContentProps> = ({
    customer,
    wishlistCount,
    onCloseAction,
    handleLogout,
    isLoading
}) => {
    const formatLastLoggedIn = (date: Date) => {
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <>
            <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-black">
                            {customer.givenName?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-semibold text-black truncate">
                            {customer.givenName || 'User'}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                            {customer.email || 'No email provided'}
                        </p>
                        {customer.lastLoggedIn && <p className="text-xs text-gray-500 flex items-center mt-1 sm:mt-2">
                            <Clock className="w-3 h-3 mr-1" />
                            Last login: {formatLastLoggedIn(new Date(customer.lastLoggedIn))}
                        </p>}
                    </div>
                </div>
            </div>

            <div className="py-2">
                <MenuLink href="/account" icon={<User />} onCloseAction={onCloseAction}>
                    Your Account
                </MenuLink>
                <MenuLink href="/orders" icon={<Package />} onCloseAction={onCloseAction}>
                    Your Orders
                </MenuLink>
                <MenuLink href="/wishlist" icon={<Heart />} badge={wishlistCount} onCloseAction={onCloseAction}>
                    Wishlist
                </MenuLink>
                <MenuLink href="/account/payments" icon={<CreditCard />} onCloseAction={onCloseAction}>
                    Payment Methods
                </MenuLink>
                <MenuLink href="/account/notifications" icon={<Bell />} onCloseAction={onCloseAction}>
                    Notifications
                </MenuLink>
                <MenuLink href="/rewards" icon={<Gift />} onCloseAction={onCloseAction}>
                    Rewards & Points
                </MenuLink>
                <MenuLink href="/account/settings" icon={<Settings />} onCloseAction={onCloseAction}>
                    Account Settings
                </MenuLink>

                <div className="mt-2 px-4 pt-2 border-t border-gray-100">
                    <Button
                        variant="destructive"
                        className="w-full justify-start text-white hover:bg-red-600 transition-colors duration-200"
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="text-sm">
                            {isLoading ? 'Signing out...' : 'Sign Out'}
                        </span>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LoggedInContent