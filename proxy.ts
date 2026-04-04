import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getAuthSecretKey } from "@/lib/auth-secret";

async function isValidSessionToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, getAuthSecretKey());
        return true;
    } catch {
        return false;
    }
}

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("spendwise_token")?.value;
    const { pathname } = req.nextUrl;

    const authRoutes = ["/auth/login", "/auth/register"];
    const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isLoggedIn = token ? await isValidSessionToken(token) : false;

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/login", "/auth/register"],
};
