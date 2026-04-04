"use client";

import type { DonutSlice } from "@/lib/chart-helpers";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

function formatEuro(value: number) {
    return `€${value.toFixed(2)}`;
}

export default function SpendingByCategoryDonut({ data }: { data: DonutSlice[] }) {
    if (data.length === 0) {
        return (
            <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
                No spending in this period yet
            </div>
        );
    }

    return (
        <div className="h-[300px] w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="46%"
                        innerRadius="52%"
                        outerRadius="78%"
                        paddingAngle={2}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={entry.fill}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number | string) =>
                            formatEuro(Number(value))
                        }
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ fontSize: 12 }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
