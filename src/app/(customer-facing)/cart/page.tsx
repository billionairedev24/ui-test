"use client"

import React, {useEffect, useState} from 'react';
import {ArrowLeft, Trash2, Plus, X, Minus, ChevronRight} from 'lucide-react';
import {cartService} from "@/app/services/cart.service";
import {CartItem, Coupon} from "@/types/types";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const USD_CURRENCY = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [couponSuccess, setCouponSuccess] = useState('');
    const [discount, setDiscount] = useState(0);
    const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);

    useEffect(() => {
        const cartSubscription = cartService.cart.subscribe(setItems);
        const subtotalSubscription = cartService.cartSubtotal.subscribe(setSubtotal);
        const taxSubscription = cartService.cartTax.subscribe(setTax);
        const totalSubscription = cartService.cartTotal.subscribe(setTotal);
        const discountSubscription = cartService.cartDiscount.subscribe(setDiscount);
        const couponSubscription = cartService.currentCoupon.subscribe((coupon) => {
            setCurrentCoupon(coupon);
            if (coupon) {
                setCouponSuccess(
                    `Coupon applied! ${
                        coupon.type === 'percentage'
                            ? coupon.discount + '% off'
                            : '$' + coupon.discount + ' off'
                    }`
                );
            } else {
                setCouponSuccess('');
            }
        });

        return () => {
            cartSubscription.unsubscribe();
            subtotalSubscription.unsubscribe();
            taxSubscription.unsubscribe();
            totalSubscription.unsubscribe();
            discountSubscription.unsubscribe();
            couponSubscription.unsubscribe();
        };
    }, []);

    const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
        if (newQuantity < 1) return;
        cartService.updateQuantity(itemId, newQuantity);
    };

    const handleRemoveItem = (itemId: string | number) => {
        cartService.removeFromCart(itemId);
    };

    const handleApplyCoupon = async () => {
        const result = await cartService.applyCoupon(couponCode);
        if (result.success) {
            setCouponError('');
            setCouponCode('');
        } else {
            setCouponError(result.message);
            setCouponSuccess('');
        }
    };

    const handleRemoveCoupon = () => {
        cartService.removeCoupon();
        setCouponCode('');
        setCouponError('');
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven&lsquo;t added any items to your cart yet.</p>
                    <Link href="/">
                        <Button
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5"/>
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-lg shadow-sm">
                        {items.map((item) => (
                            <div key={item.id} className="p-6 border-b last:border-b-0">
                                <div className="flex items-center">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="h-24 object-cover rounded-lg"
                                        quality={100}
                                    />
                                    <div className="ml-6 flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Button
                                                    onClick={() => handleQuantityChange(item.id!, item.quantity - 1)}
                                                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                                >
                                                    <Minus size={16}/>
                                                </Button>
                                                <span className="text-gray-900">{item.quantity}</span>
                                                <Button
                                                    onClick={() => handleQuantityChange(item.id!, item.quantity + 1)}
                                                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                                                >
                                                    <Plus size={16}/>
                                                </Button>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-medium text-gray-900">
                                                    {USD_CURRENCY.format(
                                                        item.discount
                                                            ? (item.price * (1 - item.discount / 100)) * item.quantity
                                                            : item.price * item.quantity
                                                    )}
                                                </span>
                                                <Button
                                                    onClick={() => handleRemoveItem(item.id!)}
                                                    className="bg-neutral-50 text-gray-400 hover:text-red-500 hover:bg-neutral-100"
                                                >
                                                    <Trash2 size={20}/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 mt-8 lg:mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>{USD_CURRENCY.format(subtotal)}</span>
                            </div>

                            {discount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span>-{USD_CURRENCY.format(discount)}</span>
                                </div>
                            )}

                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Tax</span>
                                <span>{USD_CURRENCY.format(tax)}</span>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <span>Total</span>
                                    <span>{USD_CURRENCY.format(total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            {!currentCoupon && (
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                                    />
                                    <Button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            )}

                            {couponError && (
                                <p className="mt-2 text-sm text-red-600">{couponError}</p>
                            )}

                            {currentCoupon && couponSuccess && (
                                <div
                                    className="mt-2 flex items-center justify-between bg-green-50 px-3 py-2 rounded-md">
                                    <p className="text-sm text-green-600">{couponSuccess}</p>
                                    <button
                                        onClick={handleRemoveCoupon}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={16}/>
                                    </button>
                                </div>
                            )}
                        </div>

                        <Link href="/checkout">
                            <Button
                                className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                Proceed to Checkout
                                <ChevronRight className="ml-2 h-5 w-5"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;