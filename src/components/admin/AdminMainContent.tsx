"use client"
import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {ColumnDef} from "@tanstack/react-table";
import {OrderType} from "@/types/types";
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DollarSign, Users, ShoppingCart, TrendingUp, MoreHorizontal} from 'lucide-react'
import {DataTable} from "@/components/admin/DataTable";
import {mockOrders} from "@/mocks/mocks";
import MetricCard from "@/components/admin/MetricCard";
import SmallCard from "@/components/admin/SmallCards";

const orderData = [
    {name: 'Today', orders: 900, pending: 500, processing: 450, delivered: 200},
    {name: 'Yesterday', orders: 800, pending: 450, processing: 400, delivered: 180},
    {name: 'This Week', orders: 5000, pending: 2500, processing: 2000, delivered: 1500},
    {name: 'This Month', orders: 20000, pending: 10000, processing: 8000, delivered: 6000},
]

const salesData = [
    {name: 'Jan', sales: 4000, revenue: 2400, profit: 2400},
    {name: 'Feb', sales: 3000, revenue: 1398, profit: 2210},
    {name: 'Mar', sales: 2000, revenue: 9800, profit: 2290},
    {name: 'Apr', sales: 2780, revenue: 3908, profit: 2000},
    {name: 'May', sales: 1890, revenue: 4800, profit: 2181},
    {name: 'Jun', sales: 2390, revenue: 3800, profit: 2500},
]


const columns: ColumnDef<OrderType>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "invoice_number",
        header: "INVOICE NUMBER",
    },
    {
        accessorKey: "customer_name",
        header: "CUSTOMER NAME"
    },
    {
        accessorKey: "payment_method",
        header: "PAYMENT METHOD"
    },
    {
        accessorKey: "amount",
        header: "AMOUNT",
    },
    {
        accessorKey: "status",
        header: "STATUS",
        cell: ({row}) => {
            return (
                <div
                    className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
                        "text-red-400": row.getValue("status") === "pending",
                        "text-orange-500": row.getValue("status") === "processing",
                        "text-green-500": row.getValue("status") === "success",
                        "text-red-600": row.getValue("status") === "failed"
                    })}
                >
                    {row.getValue("status")}
                </div>
            );
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(order.invoice_number as string)}
                        >
                            Copy Order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            View Order
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            View order details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
];


const AdminMainContent = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Revenue"
                    value="$45,231.89"
                    change="+20.1%"
                    trend="up"
                    icon={DollarSign}
                />
                <MetricCard
                    title="New Customers"
                    value="1,205"
                    change="+180.1%"
                    trend="up"
                    icon={Users}
                />
                <MetricCard
                    title="Total Orders"
                    value="12,234"
                    change="+19%"
                    trend="up"
                    icon={ShoppingCart}
                />
                <MetricCard
                    title="Sales Growth"
                    value="15.3%"
                    change="-5.4%"
                    trend="down"
                    icon={TrendingUp}
                />
            </div>

            {/* Stats */}
            <SmallCard />

            <div className="grid grid-cols-2 gap-4">
                {/* Chart */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={orderData}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="orders" fill="#4CAF50"/>
                            <Bar dataKey="pending" fill="#FFC107"/>
                            <Bar dataKey="processing" fill="#2196F3"/>
                            <Bar dataKey="delivered" fill="#9C27B0"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="sales" fill="#8884d8"/>
                            <Bar dataKey="revenue" fill="#82ca9d"/>
                            <Bar dataKey="profit" fill="#ffc658"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>


            {/* Table */}
            <DataTable columns={columns} data={mockOrders}/>

        </div>
    )
}

export default AdminMainContent
