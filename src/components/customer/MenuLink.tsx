import React from 'react';
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MenuLinkProps {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    badge?: number;
    className?: string;
    onCloseAction: () => void;
}

export const MenuLink: React.FC<MenuLinkProps> = ({ href, icon, children, badge, className, onCloseAction }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center px-4 sm:px-6 py-3 text-black hover:bg-yellow-400/5 transition-colors duration-200",
            className
        )}
        onClick={onCloseAction}
    >
        {React.cloneElement(icon as React.ReactElement, {
            className: "w-5 h-5 text-gray-600 mr-3",
            strokeWidth: 1.5
        })}
        <span className="text-sm sm:text-base">{children}</span>
        {badge !== undefined && badge > 0 && (
            <span className="ml-auto bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-medium">
                {badge}
            </span>
        )}
    </Link>
);

