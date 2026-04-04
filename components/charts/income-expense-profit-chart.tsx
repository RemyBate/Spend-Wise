"use client";

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { TwelveMonthPoint } from "@/lib/twelve-month-series";

function formatEuro(value: number) {
    return `€${value.toFixed(2)}`;
}

export default function IncomeExpenseProfitChart({
    data,
}: {
    data: TwelveMonthPoint[];
}) {
    return (
        <div className="h-[380px] w-full min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{ top: 16, right: 16, left: 8, bottom: 8 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="label"
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <YAxis
                        tick={{ fill: "#64748b", fontSize: 11 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickFormatter={(v) => {
                            const abs = Math.abs(Number(v));
                            if (abs >= 1000) {
                                return `€${(Number(v) / 1000).toFixed(1)}k`;
                            }
                            return `€${v}`;
                        }}
                    />
                    <Tooltip
                        formatter={(value: number | string) =>
                            formatEuro(Number(value))
                        }
                    />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ paddingBottom: 8 }}
                    />
                    <Bar
                        dataKey="income"
                        name="Income"
                        fill="#1e40af"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={28}
                    />
                    <Bar
                        dataKey="expenses"
                        name="Expenses"
                        fill="#7dd3fc"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={28}
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        name="Profit"
                        stroke="#dc2626"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#dc2626", strokeWidth: 0 }}
                        activeDot={{ r: 6 }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
