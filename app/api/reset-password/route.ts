import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: "Token and new password are required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired reset token." },
                { status: 400 }
            );
        }

        const hashedPassword = await argon2.hash(password);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json(
            { message: "Password reset successful. Redirecting to login..." },
            { status: 200 }
        );
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        return NextResponse.json(
            { message: "Something went wrong while resetting password." },
            { status: 500 }
        );
    }
}