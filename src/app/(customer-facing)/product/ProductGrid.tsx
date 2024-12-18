"use client"

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {Product} from "@/types/types";
import {ProductCard} from "@/app/(customer-facing)/product/ProductCard";

const ITEMS_PER_PAGE = 20;

// Mock products data
const mockProduct: Product[] = Array.from({ length: 100 }, (_, i) => ({
    id: `${Math.random()}`,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 100) + 50,
    name: `Fresh Strawberries Pack ${i + 1}`,
    description: 'Sweet and juicy strawberries, freshly picked from local farms. Perfect for desserts, smoothies, or healthy snacking.',
    sku: `STR${String(i + 1).padStart(4, '0')}`,
    barcode: `978${String(i + 1).padStart(7, '0')}`,
    price: 4.99 + (Math.random() * 3),
    discount: Math.random() < 0.3 ? Math.floor(Math.random() * 20) + 10 : 0,
    imageUrl: '/images/product.jpg',
    tags: ['fruits', 'fresh', 'organic'],
    isActive: true,
    tax: 5,
    weight: 21 + (Math.floor(Math.random() * 4) * 50),
    marketId: 'market-1',
    categoryId: 'fruits',
    vendorId: `vendor-${Math.floor(Math.random() * 5) + 1}`
}));

export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();

    const loadMoreProducts = async () => {
        if (!hasMore || loading) return;

        setLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newProducts = mockProduct.slice(startIndex, endIndex);

            if (newProducts.length < ITEMS_PER_PAGE) {
                setHasMore(false);
            }

            setProducts(prev => [...prev, ...newProducts]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreProducts();
    });

    useEffect(() => {
        if (inView && hasMore && !loading) {
            loadMoreProducts();
        }
    }, [inView]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length === 0 && loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                            <div className="w-full h-48 bg-gray-200"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-8 bg-gray-200 rounded-full w-8"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Loading indicator */}
            {loading && products.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Intersection observer target */}
            <div ref={ref} className="h-20"></div>
        </div>
    );
};