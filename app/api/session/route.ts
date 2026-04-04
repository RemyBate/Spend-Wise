import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getAuthSecretKey } from "@/lib/auth-secret";

export async function GET() {
    const token = (await cookies()).get("spendwise_token")?.value;

    if (!token) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    try {
        const { payload } = await jwtVerify(token, getAuthSecretKey());
        return NextResponse.json({
            user: {
                id: String(payload.id ?? ""),
                name: String(payload.name ?? ""),
                email: String(payload.email ?? ""),
            },
        });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}
