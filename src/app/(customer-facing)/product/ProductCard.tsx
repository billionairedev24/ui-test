"use client"

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import {cartService} from "@/app/services/cart.service";
import {Product} from "@/types/types";
import {wishlistService} from "@/app/services/wishlist.service";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isInCart, setIsInCart] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const cartSubscription = cartService.cart.subscribe(items => {
            setIsInCart(items.some(item => item.id === product.id));
        });

        setIsInWishlist(wishlistService.isInWishlist(product.id!));

        return () => {
            cartSubscription.unsubscribe();
        };
    }, [product.id]);

    const handleAddToCart = () => {
        if (isInCart || isAdding) return;

        setIsAdding(true);
        cartService.addToCart(product);

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const handleWishlistToggle = () => {
        const added = wishlistService.toggleWishlist(product);
        setIsInWishlist(added);
    };

    const discountedPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="relative">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-24 object-cover"
                    quality={90}
                />
                {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        -{product.discount}%
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

                {/*<div className="text-sm text-gray-500 mb-3">
                    <span>SKU: {product.sku}</span>
                    <span className="mx-2">•</span>
                    <span>{product.weight}g</span>
                </div>*/}

                <div className="flex items-center justify-between">
                    <div>
                        {product.discount > 0 ? (
                            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-500">
                  ${discountedPrice.toFixed(2)}
                </span>
                                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                            </div>
                        ) : (
                            <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            disabled={isInCart || isAdding}
                            className={`p-2 rounded-full transition-all duration-200 ${
                                isInCart
                                    ? 'bg-green-500 text-white'
                                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                            } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ShoppingCart size={20} />
                        </button>

                        <button
                            onClick={handleWishlistToggle}
                            className={`p-2 rounded-full transition-colors duration-200 ${
                                isInWishlist
                                    ? 'bg-red-50 text-red-500 hover:bg-red-100'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            <Heart
                                size={20}
                                className="transition-transform"
                                fill={isInWishlist ? 'currentColor' : 'none'}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};