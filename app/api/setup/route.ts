import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    let user = await prisma.user.findUnique({
        where: { email: "demo@spendwise.com" },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                name: "Demo User",
                email: "demo@spendwise.com",
                password: "password123",
            },
        });
    }

    const categoryData = [
        { name: "Food", color: "#8b5cf6" },
        { name: "Transport", color: "#06b6d4" },
        { name: "Bills", color: "#f59e0b" },
        { name: "Shopping", color: "#ec4899" },
        { name: "Health", color: "#10b981" },
    ];

    for (const item of categoryData) {
        const existing = await prisma.category.findFirst({
            where: {
                name: item.name,
                userId: user.id,
            },
        });

        if (!existing) {
            await prisma.category.create({
                data: {
                    name: item.name,
                    color: item.color,
                    userId: user.id,
                },
            });
        }
    }

    const existingIncome = await prisma.income.findFirst({
        where: {
            userId: user.id,
            month: 4,
            year: 2026,
        },
    });

    if (!existingIncome) {
        await prisma.income.create({
            data: {
                month: 4,
                year: 2026,
                amount: 2500,
                note: "Monthly salary",
                userId: user.id,
            },
        });
    }

    const categories = await prisma.category.findMany({
        where: { userId: user.id },
    });

    const categoryMap = Object.fromEntries(
        categories.map((category) => [category.name, category.id])
    );

    const existingExpenses = await prisma.expense.findMany({
        where: { userId: user.id },
    });

    if (existingExpenses.length === 0) {
        await prisma.expense.create({
            data: {
                title: "Groceries",
                amount: 85,
                date: new Date("2026-04-01"),
                paymentMethod: "Card",
                note: "Weekly shopping",
                userId: user.id,
                categoryId: categoryMap["Food"],
            },
        });

        await prisma.expense.create({
            data: {
                title: "Bus Ticket",
                amount: 24,
                date: new Date("2026-04-02"),
                paymentMethod: "Cash",
                note: "Transport to work",
                userId: user.id,
                categoryId: categoryMap["Transport"],
            },
        });

        await prisma.expense.create({
            data: {
                title: "Internet Bill",
                amount: 45,
                date: new Date("2026-04-03"),
                paymentMethod: "Bank Transfer",
                note: "Monthly internet",
                userId: user.id,
                categoryId: categoryMap["Bills"],
            },
        });

        await prisma.expense.create({
            data: {
                title: "Hair Products",
                amount: 30,
                date: new Date("2026-04-04"),
                paymentMethod: "Card",
                note: "Beauty shopping",
                userId: user.id,
                categoryId: categoryMap["Shopping"],
            },
        });
    }

    return NextResponse.json({
        success: true,
        message: "Demo data created successfully",
    });
}