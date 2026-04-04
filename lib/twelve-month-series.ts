import { REPORTING_MONTH, REPORTING_YEAR } from "@/lib/reporting-period";

const SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export type TwelveMonthPoint = {
    label: string;
    income: number;
    expenses: number;
    profit: number;
};

/**
 * 12 consecutive calendar months ending at `anchorMonth` / `anchorYear` (inclusive).
 * Labels are short month names (unique within this window).
 */
export function buildLast12MonthsSeries(
    anchorYear: number,
    anchorMonth: number,
    incomes: { month: number; year: number; amount: number }[],
    expenses: { date: Date; amount: number }[]
): TwelveMonthPoint[] {
    const rows: TwelveMonthPoint[] = [];

    for (let i = 11; i >= 0; i--) {
        const d = new Date(anchorYear, anchorMonth - 1 - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;

        const income =
            incomes.find((inc) => inc.month === m && inc.year === y)?.amount ?? 0;

        const expenseSum = expenses
            .filter((e) => {
                const ed = new Date(e.date);
                return ed.getMonth() + 1 === m && ed.getFullYear() === y;
            })
            .reduce((s, e) => s + e.amount, 0);

        const profit = income - expenseSum;

        rows.push({
            label: SHORT[m - 1],
            income: Math.round(income * 100) / 100,
            expenses: Math.round(expenseSum * 100) / 100,
            profit: Math.round(profit * 100) / 100,
        });
    }

    return rows;
}

/** Uses reporting period month as the chart’s last month (matches dashboard demo). */
export function buildDashboardTwelveMonthSeries(
    incomes: { month: number; year: number; amount: number }[],
    expenses: { date: Date; amount: number }[]
): TwelveMonthPoint[] {
    return buildLast12MonthsSeries(
        REPORTING_YEAR,
        REPORTING_MONTH,
        incomes,
        expenses
    );
}
