import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {fetchCustomerData} from "@/lib/uploadthing/getUser";

// Define the roles and their corresponding allowed paths
const rolePathMap: Record<string, string[]> = {
    SELLER: ['/seller', '/api', '/dashboard'],
    ADMIN: ['/dashboard', '/api', '/seller', '/cart', '/checkout', '/orders', '/order-confirmation', '/vendors', '/wishlist'],
    CUSTOMER: ['/cart', '/checkout', '/orders', '/order-confirmation', '/vendors', '/wishlist']
};

export async function middleware(request: NextRequest) {
   /* const customer = await fetchCustomerData();
    console.log("customer", customer)

    const allowedPaths = rolePathMap[customer.role!] || [];
    const requestedPath = request.nextUrl.pathname;

    if (!allowedPaths.some(path => requestedPath.startsWith(path))) {
        return NextResponse.redirect(new URL('/', request.url));
    }*/

    return NextResponse.next();
}

export const config = {
    matcher: ['/seller', '/api', '/dashboard','/cart', '/checkout', '/orders', '/order-confirmation', '/vendors', '/wishlist'],
};



/*

export function test(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set(
        'Access-Control-Allow-Origin',
        'http://localhost:8000'
    );
    response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return response;
}

export const configs = {
    matcher: '/api/:path*',
};*/
