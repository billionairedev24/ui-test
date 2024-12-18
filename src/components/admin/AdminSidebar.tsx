'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    UserCheck,
    UserCog,
    Settings,
    Globe,
    ShoppingBag,
    FileText,
    List,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Tag,
    Ticket, TicketSlash,
} from 'lucide-react'
import Link from "next/link";
import Image from "next/image";


const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", color: "text-blue-500", href: '/dashboard' },
    {
        icon: ShoppingCart,
        label: "Catalogue",
        color: "text-green-500",
        href: '/dashboard/catalogue',
        subItems: [
            { icon: Tag, label: "Products", color: "text-emerald-500", href: '/dashboard/products', },
            { icon: List, label: "Categories", color: "text-lime-500", href: '/dashboard/categories', },
            { icon: TicketSlash, label: "Banners", color: "text-teal-500" , href: '/dashboard/banners',},
            { icon: Ticket, label: "Coupons", color: "text-cyan-500", href: '/dashboard/coupons', },
        ],
    },
    { icon: ShoppingCart, label: "Orders", color: "text-yellow-500",href:'/dashboard/orders' },
    { icon: Users, label: "Customers", color: "text-purple-500", href: '/dashboard/customers' },
    { icon: UserCheck, label: "Sellers", color: "text-pink-500", href: '/dashboard/sellers' },
    { icon: UserCog, label: "Staff", color: "text-indigo-500", href: '/dashboard/staff' },
    { icon: Settings, label: "Settings", color: "text-gray-500", href: '/dashboard/settings' },
    { icon: Globe, label: "International", color: "text-red-500", href: '/dashboard/i8n'},
    { icon: ShoppingBag, label: "Shop", color: "text-teal-500", href: '/dashboard/shop' },
    { icon: FileText, label: "Pages", color: "text-orange-500", href: '/dashboard/pages' },
    { icon: List, label: "Logs", color: "text-cyan-500", href: '/dashboard/logs' },
]

interface AdminSideBarProps {
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

const AdminSidebar = ({ isCollapsed, setIsCollapsed }: AdminSideBarProps) => {
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label)
    }

    return (
        <aside
            className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col`}
        >
            <div className="flex items-center justify-between p-4 h-16">
                <Image  width={8} height={8} src="/images/logo.png" alt="Logo" className="h-8 w-8" />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto"
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2 p-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item?.subItems ? (
                                <Collapsible open={openSubmenu === item.label && !isCollapsed}>
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-between ${isCollapsed ? 'px-2' : ''}`}
                                            onClick={() => toggleSubmenu(item.label)}
                                        >
                                            <div className="flex items-center">
                                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                                {!isCollapsed && <span className="ml-3">{item.label}</span>}
                                            </div>
                                            {!isCollapsed && (openSubmenu === item.label ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        {!isCollapsed && item?.subItems.map((subItem, subIndex) => (
                                            <Link key={subIndex} href={subItem.href}>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start pl-9"
                                                >
                                                    <subItem.icon className={`w-5 h-5 ${subItem.color}`} />
                                                    <span className="ml-3">{subItem.label}</span>
                                                </Button>
                                            </Link>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <Link href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}
                                    >
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                        {!isCollapsed && <span className="ml-3">{item.label}</span>}
                                    </Button>
                                </Link>

                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default AdminSidebar