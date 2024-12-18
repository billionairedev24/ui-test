'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { CheckCircle, XCircle, Package, ArrowLeft, Printer } from 'lucide-react'
import { useRouter, useSearchParams } from "next/navigation"
import { cartService } from "@/app/services/cart.service"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const OrderConfirmationContent = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState<string | null>(null)
    const [orderId, setOrderId] = useState<string | null>(null)

    useEffect(() => {
        setStatus(searchParams.get('status'))
        setOrderId(searchParams.get('orderId'))

        if (searchParams.get('status') === 'success') {
            // Clear the cart after successful order
            cartService.clearCart()
        }
    }, [searchParams])

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 py-12 -mt-32">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-center mb-8">
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                            <h1 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
                            <p className="mt-2 text-gray-600">
                                Thank you for your purchase. Your order has been successfully placed.
                            </p>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4 my-6">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-gray-600">Order Number:</span>
                                <span className="text-gray-900">{orderId}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span className="font-medium text-gray-600">Estimated Delivery:</span>
                                <span className="text-gray-900">3-5 Business Days</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={() => window.print()}
                                variant="outline"
                                className="w-full"
                            >
                                <Printer className="mr-2 h-5 w-5" />
                                Print Receipt
                            </Button>

                            <Button
                                asChild
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                            >
                                <Link href={`/orders/${orderId}`}>
                                    <Package className="mr-2 h-5 w-5" />
                                    Track Order
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 -mt-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <XCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h1 className="mt-4 text-2xl font-bold text-gray-900">Payment Failed</h1>
                    <p className="mt-2 text-gray-600">
                        We couldn&apos;t process your payment. Please try again.
                    </p>

                    <div className="mt-8 space-y-4">
                        <Button
                            onClick={() => router.push('/checkout')}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                        >
                            Try Again
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="w-full"
                        >
                            <Link href="/cart">
                                Return to Cart
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OrderConfirmation = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderConfirmationContent />
        </Suspense>
    )
}

export default OrderConfirmation
