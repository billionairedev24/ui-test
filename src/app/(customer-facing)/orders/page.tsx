"use client"
import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import {orderService} from "@/app/services/order.service";
import Link from "next/link";
import {Order} from "@/types/types";
import Image from "next/image";

const USD_CURRENCY = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'processing':
            return 'text-blue-600 bg-blue-50';
        case 'shipped':
            return 'text-yellow-600 bg-yellow-50';
        case 'delivered':
            return 'text-green-600 bg-green-50';
        case 'cancelled':
            return 'text-red-600 bg-red-50';
        case 'returned':
            return 'text-gray-600 bg-gray-50';
    }
};

const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
        case 'processing':
            return <RefreshCw className="w-5 h-5" />;
        case 'shipped':
            return <Truck className="w-5 h-5" />;
        case 'delivered':
            return <CheckCircle className="w-5 h-5" />;
        case 'cancelled':
            return <AlertTriangle className="w-5 h-5" />;
        case 'returned':
            return <Package className="w-5 h-5" />;
    }
};

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const userOrders = await orderService.getUserOrders();
                setOrders(userOrders);
            } catch (error) {
                console.error('Failed to load orders:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <RefreshCw className="w-6 h-6 text-yellow-400 animate-spin" />
                    <span className="text-gray-600">Loading orders...</span>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <Package className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 -mt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Order #{order.id}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Placed on {new Date(order.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`flex items-center px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span className="ml-2 text-sm font-medium capitalize">
                      {order.status}
                    </span>
                                    </div>
                                </div>

                                <div className="border-t border-b border-gray-200 py-4 mb-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center py-2">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="h-16 w-16 object-cover rounded-md"
                                                quality={100}
                                            />
                                            <div className="ml-4 flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {USD_CURRENCY.format(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-lg font-medium text-gray-900">
                                            {USD_CURRENCY.format(order.total)}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500"
                                    >
                                        View Details
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage