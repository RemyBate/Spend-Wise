"use client";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { CashFlowPoint } from "@/lib/cash-flow-series";

function formatEuro(value: number) {
    return `€${value.toFixed(2)}`;
}

export default function CashFlowLineChart({ data }: { data: CashFlowPoint[] }) {
    return (
        <div className="h-[320px] w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 12, right: 16, left: 8, bottom: 8 }}
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
                        tickFormatter={(v) =>
                            v >= 1000 ? `€${(v / 1000).toFixed(1)}k` : `€${v}`
                        }
                    />
                    <Tooltip
                        formatter={(value: number | string) =>
                            formatEuro(Number(value))
                        }
                    />
                    <Legend wrapperStyle={{ paddingTop: 12 }} />
                    <Line
                        type="monotone"
                        dataKey="income"
                        name="Income (daily share)"
                        stroke="#14b8a6"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#14b8a6", strokeWidth: 0 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="expenses"
                        name="Expenses"
                        stroke="#db2777"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#db2777", strokeWidth: 0 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
