import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Define Admin Routes
    const isAdminRoute = path.startsWith('/admin');
    const isLoginRoute = path === ('/admin/login');

    // 2. Get Token
    const token = request.cookies.get('admin_token')?.value;
    const verifiedToken = token && await verifyToken(token);

    // 3. Protection Logic
    if (isAdminRoute && !isLoginRoute) {
        if (!verifiedToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 4. Redirect if already logged in
    if (isLoginRoute && verifiedToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
