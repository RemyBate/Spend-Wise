const SHORT_MONTHS = [
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

function toYmd(d: Date): string {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function daysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

/** Last `count` calendar days ending today (local), oldest first. */
export function getLastNDates(count: number): Date[] {
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const dates: Date[] = [];
    for (let i = count - 1; i >= 0; i--) {
        const d = new Date(end);
        d.setDate(end.getDate() - i);
        dates.push(d);
    }
    return dates;
}

export type CashFlowPoint = {
    label: string;
    income: number;
    expenses: number;
};

/**
 * One point per day: expenses = sum for that day; income = monthly income ÷ days in month (spread).
 */
export function buildLast7DaysCashFlow(
    expenses: { date: Date; amount: number }[],
    incomes: { month: number; year: number; amount: number }[]
): CashFlowPoint[] {
    const incomeByMonth = new Map<string, number>();
    for (const inc of incomes) {
        incomeByMonth.set(`${inc.year}-${inc.month}`, inc.amount);
    }

    const expenseByYmd = new Map<string, number>();
    for (const e of expenses) {
        const key = toYmd(new Date(e.date));
        expenseByYmd.set(key, (expenseByYmd.get(key) ?? 0) + e.amount);
    }

    return getLastNDates(7).map((d) => {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const dim = daysInMonth(y, m);
        const monthIncome = incomeByMonth.get(`${y}-${m}`) ?? 0;
        const dailyIncome = dim > 0 ? monthIncome / dim : 0;
        const ymd = toYmd(d);
        const dayExpenses = expenseByYmd.get(ymd) ?? 0;

        return {
            label: `${SHORT_MONTHS[m - 1]} ${d.getDate()}`,
            income: Math.round(dailyIncome * 100) / 100,
            expenses: Math.round(dayExpenses * 100) / 100,
        };
    });
}
