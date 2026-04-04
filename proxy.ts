import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

async function verifyToken(token: string) {
    try {
        await jwtVerify(token, secret);
        return true;
    } catch {
        return false;
    }
}

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("spendwise_token")?.value;
    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/dashboard", "/expenses", "/income", "/categories"];
    const authRoutes = ["/auth/login", "/auth/register"];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isLoggedIn = token ? await verifyToken(token) : false;

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/expenses/:path*",
        "/income/:path*",
        "/categories/:path*",
        "/auth/login",
        "/auth/register",
    ],
};