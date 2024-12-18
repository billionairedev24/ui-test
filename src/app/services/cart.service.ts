import {BehaviorSubject, combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {CartItem, Product, Coupon, ShippingOption} from '@/types/types';
import {taxService} from "@/app/services/tax.services";
import Cookies from "js-cookie";

// Session cookie names
const CART_COOKIE = 'cart_session';
const COUPON_COOKIE = 'coupon_session';
const SHIPPING_COOKIE = 'shipping_session';

// Mock API endpoints
const API_ENDPOINTS = {
    cart: '/api/cart',
    coupon: '/api/coupon',
    shipping: '/api/shipping'
};

const validCoupons: Record<string, Coupon> = {
    'SAVE10': {code: 'SAVE10', type: 'percentage', discount: 10},
    'SAVE20': {code: 'SAVE20', type: 'percentage', discount: 20},
    'FLAT25': {code: 'FLAT25', type: 'fixed', discount: 25},
};

// Initialize subjects with data from session cookies
const cartSubject = new BehaviorSubject<CartItem[]>(
    JSON.parse(Cookies.get(CART_COOKIE) ?? '[]')
);

const couponSubject = new BehaviorSubject<Coupon | null>(null);

const shippingSubject = new BehaviorSubject<ShippingOption | null>(
    JSON.parse(Cookies.get(SHIPPING_COOKIE) ?? 'null')
);

// Mock API calls
const mockApiCall = async (endpoint: string, method: string, data?: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    switch (endpoint) {
        case API_ENDPOINTS.cart:
            // Mock cart API response
            return {success: true, data};
        case API_ENDPOINTS.coupon:
            // Mock coupon validation
            if (method === 'DELETE') {
                return {success: true};
            }
            const coupon = validCoupons[data?.code?.toUpperCase()];
            return {
                success: !!coupon,
                data: coupon
            };
        case API_ENDPOINTS.shipping:
            // Mock shipping API response
            return {success: true, data};
        default:
            return {success: false, error: 'Invalid endpoint'};
    }
};

// Helper functions
const calculateSubtotal = (items: CartItem[]) => {
    return items.reduce((total, item) => {
        const itemPrice = item.price;
        const itemDiscount = item.discount || 0;
        const discountedPrice = itemPrice * (1 - itemDiscount / 100);
        return total + (discountedPrice * item.quantity);
    }, 0);
};

const calculateCouponDiscount = (coupon: Coupon | null, subtotal: number): number => {
    if (!coupon || subtotal <= 0) {
        return 0;
    }

    if (coupon.type === 'percentage') {
        return (subtotal * coupon.discount) / 100;
    } else {
        // For fixed amount coupons
        return Math.min(coupon.discount, subtotal);
    }
};

// Cart service implementation
export const cartService = {
    // Observables
    cart: cartSubject.asObservable(),
    currentCoupon: couponSubject.asObservable(),
    currentShipping: shippingSubject.asObservable(),

    // Derived observables
    cartSubtotal: cartSubject.pipe(
        map(calculateSubtotal)
    ),

    cartDiscount: combineLatest([cartSubject, couponSubject]).pipe(
        map(([items, coupon]) => {
            const subtotal = calculateSubtotal(items);
            return calculateCouponDiscount(coupon, subtotal);
        })
    ),

    cartTax: combineLatest([cartSubject, couponSubject]).pipe(
        switchMap(async ([items, coupon]) => {
            const subtotal = calculateSubtotal(items);
            const couponDiscount = calculateCouponDiscount(coupon, subtotal);
            const taxableAmount = Math.max(0, subtotal - couponDiscount);
            const {tax} = await taxService.calculateTax(items, 'TX', taxableAmount);
            return tax;
        })
    ),

    cartTotal: combineLatest([cartSubject, couponSubject, shippingSubject]).pipe(
        switchMap(async ([items, coupon, shipping]) => {
            const subtotal = calculateSubtotal(items);
            const couponDiscount = calculateCouponDiscount(coupon, subtotal);
            const {tax} = await taxService.calculateTax(items, 'TX', subtotal - couponDiscount);
            const shippingCost = shipping?.price ?? 0;
            return Math.max(0, subtotal - couponDiscount + tax);
        })
    ),

    checkoutTotal: combineLatest([cartSubject, couponSubject, shippingSubject]).pipe(
        switchMap(async ([items, coupon, shipping]) => {
            const subtotal = calculateSubtotal(items);
            const couponDiscount = calculateCouponDiscount(coupon, subtotal);
            const {tax} = await taxService.calculateTax(items, 'TX', subtotal - couponDiscount);
            const shippingCost = shipping?.price ?? 0;
            return Math.max(0, subtotal - couponDiscount + tax + shippingCost);
        })
    ),

    cartCount: cartSubject.pipe(
        map(items => items.reduce((count, item) => count + item.quantity, 0))
    ),

    // Cart operations
    async addToCart(product: Product) {
        try {
            const currentCart = cartSubject.value;
            const existingItem = currentCart.find(item => item.id === product.id);

            if (existingItem) {
                await this.updateQuantity(product.id!, existingItem.quantity + 1);
            } else {
                const newCart = [...currentCart, {...product, quantity: 1}];
                await this.updateCart(newCart);
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            throw error;
        }
    },

    async removeFromCart(productId: string | number) {
        try {
            const response = await mockApiCall(API_ENDPOINTS.cart, 'DELETE', {productId});
            if (response.success) {
                const newCart = cartSubject.value.filter(item => item.id !== productId);
                await this.updateCart(newCart);
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
            throw error;
        }
    },

    async updateQuantity(productId: string | number, quantity: number) {
        try {
            if (quantity < 1) {
                await this.removeFromCart(productId);
                return;
            }

            const response = await mockApiCall(API_ENDPOINTS.cart, 'PATCH', {productId, quantity});
            if (response.success) {
                const newCart = cartSubject.value.map(item =>
                    item.id === productId ? {...item, quantity} : item
                );
                await this.updateCart(newCart);
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        }
    },

    // Coupon operations
    async applyCoupon(code: string): Promise<{ success: boolean; message: string }> {
        try {
            const response = await mockApiCall(API_ENDPOINTS.coupon, 'POST', {code});

            if (response.success && response.data) {
                const coupon = response.data;
                couponSubject.next(coupon);
                Cookies.set(COUPON_COOKIE, JSON.stringify(coupon), {expires: 1});

                return {
                    success: true,
                    message: `Coupon applied! ${coupon.type === 'percentage' ? coupon.discount + '% off' : '$' + coupon.discount + ' off'}`
                };
            }

            couponSubject.next(null);
            Cookies.remove(COUPON_COOKIE);
            return {
                success: false,
                message: 'Invalid coupon code'
            };
        } catch (error) {
            console.error('Failed to apply coupon:', error);
            couponSubject.next(null);
            Cookies.remove(COUPON_COOKIE);
            return {
                success: false,
                message: 'Failed to apply coupon'
            };
        }
    },

    async removeCoupon() {
        try {
            const response = await mockApiCall(API_ENDPOINTS.coupon, 'DELETE');
            if (response.success) {
                couponSubject.next(null);
                Cookies.remove(COUPON_COOKIE);
            }
        } catch (error) {
            console.error('Failed to remove coupon:', error);
            throw error;
        }
    },

    // Shipping operations
    async setShippingOption(option: ShippingOption | null) {
        try {
            const response = await mockApiCall(API_ENDPOINTS.shipping, 'POST', option);
            if (response.success) {
                shippingSubject.next(option);
                if (option) {
                    Cookies.set(SHIPPING_COOKIE, JSON.stringify(option), {expires: 1});
                } else {
                    Cookies.remove(SHIPPING_COOKIE);
                }
            }
        } catch (error) {
            console.error('Failed to set shipping option:', error);
            throw error;
        }
    },

    // Cart management
    async clearCart() {
        try {
            const response = await mockApiCall(API_ENDPOINTS.cart, 'DELETE');
            if (response.success) {
                cartSubject.next([]);
                couponSubject.next(null);
                shippingSubject.next(null);

                Cookies.remove(CART_COOKIE);
                Cookies.remove(COUPON_COOKIE);
                Cookies.remove(SHIPPING_COOKIE);
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        }
    },

    async updateCart(cart: CartItem[]) {
        try {
            const response = await mockApiCall(API_ENDPOINTS.cart, 'PUT', cart);
            if (response.success) {
                cartSubject.next(cart);
                Cookies.set(CART_COOKIE, JSON.stringify(cart), {expires: 1});
            }
        } catch (error) {
            console.error('Failed to update cart:', error);
            throw error;
        }
    }
};