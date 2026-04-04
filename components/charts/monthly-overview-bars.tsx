"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function formatEuro(value: number) {
    return `€${value.toFixed(2)}`;
}

export default function MonthlyOverviewBars({
    monthLabel,
    income,
    expenses,
}: {
    monthLabel: string;
    income: number;
    expenses: number;
}) {
    const data = [
        {
            period: monthLabel,
            Income: income,
            Expenses: expenses,
        },
    ];

    return (
        <div className="h-[300px] w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 12, right: 16, left: 8, bottom: 8 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="period"
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <YAxis
                        tick={{ fill: "#64748b", fontSize: 12 }}
                        axisLine={{ stroke: "#e2e8f0" }}
                        tickFormatter={(v) =>
                            v >= 1000 ? `€${(v / 1000).toFixed(0)}k` : `€${v}`
                        }
                    />
                    <Tooltip
                        formatter={(value: number | string) =>
                            formatEuro(Number(value))
                        }
                    />
                    <Legend wrapperStyle={{ paddingTop: 8 }} />
                    <Bar
                        dataKey="Income"
                        fill="#7dd3fc"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={56}
                    />
                    <Bar
                        dataKey="Expenses"
                        fill="#ef4444"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={56}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
