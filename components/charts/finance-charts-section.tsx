import type { DonutSlice } from "@/lib/chart-helpers";
import MonthlyOverviewBars from "@/components/charts/monthly-overview-bars";
import SpendingByCategoryDonut from "@/components/charts/spending-by-category-donut";

export default function FinanceChartsSection({
    donutData,
    monthLabel,
    income,
    expenses,
}: {
    donutData: DonutSlice[];
    monthLabel: string;
    income: number;
    expenses: number;
}) {
    return (
        <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-violet-600">
                    Spending by Category
                </h2>
                <p className="mt-1 text-sm text-slate-500">This month</p>
                <div className="mt-4">
                    <SpendingByCategoryDonut data={donutData} />
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-violet-600">
                    Monthly Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">Income vs expenses</p>
                <div className="mt-4">
                    <MonthlyOverviewBars
                        monthLabel={monthLabel}
                        income={income}
                        expenses={expenses}
                    />
                </div>
            </div>
        </section>
    );
}
