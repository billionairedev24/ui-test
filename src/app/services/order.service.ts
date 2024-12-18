import { BehaviorSubject } from 'rxjs';
import {Order, OrderStatus} from "@/types/types";

// Mock orders data
const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-123456789',
        date: new Date('2024-03-10'),
        total: 299.99,
        status: 'delivered',
        items: [
            {
                id: 'ITEM-1',
                name: 'Fresh Strawberries Pack',
                quantity: 2,
                price: 149.99,
                imageUrl: '/images/product.jpg'
            }
        ],
        trackingNumber: '1Z999AA1234567890',
        estimatedDelivery: new Date('2024-03-15')
    },
    {
        id: 'ORD-987654321',
        date: new Date('2024-03-08'),
        total: 199.99,
        status: 'shipped',
        items: [
            {
                id: 'ITEM-2',
                name: 'Fresh Strawberries Pack',
                quantity: 1,
                price: 199.99,
                imageUrl: '/images/product.jpg'
            }
        ],
        trackingNumber: '1Z999AA0987654321',
        estimatedDelivery: new Date('2024-03-12')
    }
];

const ordersSubject = new BehaviorSubject(MOCK_ORDERS);

export const orderService = {
    orders: ordersSubject.asObservable(),

    async getUserOrders() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return ordersSubject.value;
    },

    async getOrderById(orderId: string) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return ordersSubject.value.find(order => order.id === orderId);
    },

    async createOrder(orderData: any) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newOrder = {
            id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date(),
            status: 'processing',
            ...orderData
        };

        const updatedOrders = [newOrder, ...ordersSubject.value];
        ordersSubject.next(updatedOrders);
        return newOrder;
    },

    async initiateReturn(orderId: string, reason: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const updatedOrders = ordersSubject.value.map(order => {
            if (order.id === orderId) {
                return { ...order, status: 'returned' as OrderStatus };
            }
            return order;
        });
        ordersSubject.next(updatedOrders);
    }
};