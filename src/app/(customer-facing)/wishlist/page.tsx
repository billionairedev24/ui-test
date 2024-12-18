"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import {wishlistService} from "@/app/services/wishlist.service";
import {WishlistItem} from "@/types/types";
import {cartService} from "@/app/services/cart.service";
import Link from "next/link";
import Image from "next/image";

const USD_CURRENCY = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const WishlistPage: React.FC = () => {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [addingToCart, setAddingToCart] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const subscription = wishlistService.wishlist.subscribe(setItems);
        return () => subscription.unsubscribe();
    }, []);

    const handleAddToCart = async (item: WishlistItem) => {
        setAddingToCart(prev => ({ ...prev, [item.id!]: true }));

        try {
            cartService.addToCart(item);
            wishlistService.removeFromWishlist(item.id!);
        } finally {
            setAddingToCart(prev => ({ ...prev, [item.id!]: false }));
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 -mt-64">
                <div className="text-center">
                    <Heart size={48} className="mx-auto mb-4 text-gray-400" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">Save items you&apos;d like to buy later!</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 -mt-28">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Shopping
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm divide-y">
                    {items.map((item) => {
                        const discountedPrice = item.discount
                            ? item.price * (1 - item.discount / 100)
                            : item.price;

                        return (
                            <div key={item.id} className="p-6">
                                <div className="flex items-center gap-6">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                        height={24}
                                        width={24}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                                            <span className="text-sm text-gray-500">({item.reviews})</span>
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div>
                                                {item.discount > 0 ? (
                                                    <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-red-500">
                              {USD_CURRENCY.format(discountedPrice)}
                            </span>
                                                        <span className="text-sm text-gray-500 line-through">
                              {USD_CURRENCY.format(item.price)}
                            </span>
                                                        <span className="text-sm text-red-500 font-medium">
                              ({item.discount}% off)
                            </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-bold text-gray-900">
                            {USD_CURRENCY.format(item.price)}
                          </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={addingToCart[item.id!]}
                                                    className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors disabled:opacity-50"
                                                >
                                                    {addingToCart[item.id!] ? (
                                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <ShoppingCart size={20} />
                                                    )}
                                                    Add to Cart
                                                </button>
                                                <button
                                                    onClick={() => wishlistService.removeFromWishlist(item.id!)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    title="Remove from wishlist"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    Added on {new Date(item.addedAt).toLocaleDateString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage