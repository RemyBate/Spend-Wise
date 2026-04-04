import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Wrong login credentials." },
                { status: 401 }
            );
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Wrong login credentials." },
                { status: 401 }
            );
        }

        const token = await new SignJWT({
            id: user.id,
            name: user.name,
            email: user.email,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);

        const response = NextResponse.json(
            {
                message: "Login successful.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 200 }
        );

        response.cookies.set("spendwise_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return NextResponse.json(
            { message: "Something went wrong during login." },
            { status: 500 }
        );
    }
}