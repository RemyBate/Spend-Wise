import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { message: "No account found with this email address." },
                { status: 404 }
            );
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

        await prisma.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset your SpendWise password",
            html: `
        <p>Hello,</p>
        <p>You requested to reset your password.</p>
        <p>Click the link below to set a new password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>This link will expire in 30 minutes.</p>
      `,
        });

        return NextResponse.json(
            { message: "Reset link sent successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        return NextResponse.json(
            { message: "Something went wrong while sending reset email." },
            { status: 500 }
        );
    }
}