'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, Package, ChevronRight, ArrowLeft, Loader2, X } from 'lucide-react'
import { OrderSummary, ShippingOption } from "@/types/types"
import { cartService } from "@/app/services/cart.service"
import { shippingService } from "@/app/services/shipping.service"
import { ShippingOptions } from "@/components/customer/ShippingOptions"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";

const USD_CURRENCY = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

interface Address {
    name: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    country: string
}

const Checkout = () => {
    const router = useRouter()
    const [orderSummary, setOrderSummary] = useState<OrderSummary>({
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        shipping: null,
        discount: 0
    })
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
    const [address, setAddress] = useState<Address>({
        name: "John Doe",
        address1: "123 Main St",
        address2: "Apt 4",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        country: "USA",
    })
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false)
    const [newAddress, setNewAddress] = useState<Address>({
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    })

    useEffect(() => {
        const loadOrderSummary = async () => {
            const cartSubscription = cartService.cart.subscribe(items => {
                setOrderSummary(prev => ({ ...prev, items }));
            });

            const subtotalSubscription = cartService.cartSubtotal.subscribe(subtotal => {
                setOrderSummary(prev => ({ ...prev, subtotal }));
            });

            const taxSubscription = cartService.cartTax.subscribe(tax => {
                setOrderSummary(prev => ({ ...prev, tax }));
            });

            const totalSubscription = cartService.checkoutTotal.subscribe(total => {
                setOrderSummary(prev => ({ ...prev, total }));
            });

            const discountSubscription = cartService.cartDiscount.subscribe(discount => {
                setOrderSummary(prev => ({ ...prev, discount }));
            });

            // Calculate shipping options
            const options = await shippingService.calculateShippingOptions(orderSummary.items);
            setShippingOptions(options);

            if (options.length > 0) {
                setSelectedShipping(options[0]);
                cartService.setShippingOption(options[0]);
            }

            setLoading(false);

            return () => {
                cartSubscription.unsubscribe();
                subtotalSubscription.unsubscribe();
                taxSubscription.unsubscribe();
                totalSubscription.unsubscribe();
                discountSubscription.unsubscribe();
            };
        };

        loadOrderSummary();
    }, [orderSummary.items]);

    const handleShippingChange = (option: ShippingOption) => {
        setSelectedShipping(option)
        cartService.setShippingOption(option)
    }

    const handleProceedToPayment = async () => {
        setProcessing(true)

        try {
            // Mock Stripe payment
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Simulate successful payment
            const success = Math.random() > 0.2 // 80% success rate

            if (success) {
                router.push('/order-confirmation?status=success&orderId=ORD123')
            } else {
                router.push('/order-confirmation?status=failed')
            }
        } catch (error) {
            console.error('Payment failed:', error)
            router.push('/order-confirmation?status=failed')
        } finally {
            setProcessing(false)
        }
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setAddress(newAddress)
        setIsAddressDialogOpen(false)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
                    <span className="text-gray-600">Loading checkout...</span>
                </div>
            </div>
        )
    }

    if (orderSummary.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 -mt-12">
                <Package className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Add some items to your cart to checkout</p>
                <Button onClick={() => router.push('/')} className="inline-flex items-center">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Continue Shopping
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 -mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-7">
                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                            <div className="divide-y divide-gray-200">
                                {orderSummary.items.map((item) => (
                                    <div key={item.id} className="py-4 flex items-center">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                            className="h-24 object-cover"
                                            quality={100}
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {USD_CURRENCY.format(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="border rounded-lg p-4">
                                <p className="font-medium text-gray-900">{address.name}</p>
                                <p className="text-gray-600">{address.address1}</p>
                                {address.address2 && <p className="text-gray-600">{address.address2}</p>}
                                <p className="text-gray-600">
                                    {address.city}, {address.state} {address.zip}
                                </p>
                                <p className="text-gray-600">{address.country}</p>
                            </div>
                            <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="mt-4">Change Address</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[550px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-semibold text-center mb-4">Change Shipping Address</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleAddressSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={newAddress.name}
                                                onChange={handleAddressChange}
                                                className="w-full"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address1" className="text-sm font-medium text-gray-700">
                                                Address Line 1
                                            </Label>
                                            <Input
                                                id="address1"
                                                name="address1"
                                                value={newAddress.address1}
                                                onChange={handleAddressChange}
                                                className="w-full"
                                                placeholder="123 Main St"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address2" className="text-sm font-medium text-gray-700">
                                                Address Line 2 (Optional)
                                            </Label>
                                            <Input
                                                id="address2"
                                                name="address2"
                                                value={newAddress.address2}
                                                onChange={handleAddressChange}
                                                className="w-full"
                                                placeholder="Apt, Suite, etc."
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                                    City
                                                </Label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    value={newAddress.city}
                                                    onChange={handleAddressChange}
                                                    className="w-full"
                                                    placeholder="New York"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                                                    State / Province
                                                </Label>
                                                <Input
                                                    id="state"
                                                    name="state"
                                                    value={newAddress.state}
                                                    onChange={handleAddressChange}
                                                    className="w-full"
                                                    placeholder="NY"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                                                    ZIP / Postal Code
                                                </Label>
                                                <Input
                                                    id="zip"
                                                    name="zip"
                                                    value={newAddress.zip}
                                                    onChange={handleAddressChange}
                                                    className="w-full"
                                                    placeholder="10001"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                                                    Country
                                                </Label>
                                                <Input
                                                    id="country"
                                                    name="country"
                                                    value={newAddress.country}
                                                    onChange={handleAddressChange}
                                                    className="w-full"
                                                    placeholder="United States"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full">Save Address</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Shipping Options */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <ShippingOptions
                                options={shippingOptions}
                                selectedOption={selectedShipping}
                                onSelect={handleShippingChange}
                            />
                        </div>
                    </div>

                    {/* Order Total */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{USD_CURRENCY.format(orderSummary.subtotal)}</span>
                                </div>

                                {orderSummary.discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Discount</span>
                                        <span>-{USD_CURRENCY.format(orderSummary.discount)}</span>
                                    </div>
                                )}

                                {selectedShipping && (
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping ({selectedShipping.name})</span>
                                        <span>{USD_CURRENCY.format(selectedShipping.price)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax</span>
                                    <span>{USD_CURRENCY.format(orderSummary.tax)}</span>
                                </div>

                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="text-base font-medium text-gray-900">Total</span>
                                    <span className="text-xl font-medium text-gray-900">
                    {USD_CURRENCY.format(orderSummary.total)}
                  </span>
                                </div>
                            </div>

                            <Button
                                onClick={handleProceedToPayment}
                                disabled={processing || !selectedShipping}
                                className="mt-6 w-full"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Proceed to Payment
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => router.push('/cart')}
                                className="mt-4 w-full"
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Return to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout