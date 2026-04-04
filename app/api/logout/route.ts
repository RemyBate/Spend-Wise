import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { message: "Logout successful." },
        { status: 200 }
    );

    response.cookies.set("spendwise_token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });

    return response;
}