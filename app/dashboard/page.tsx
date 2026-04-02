import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await prisma.user.findUnique({
    where: { email: "demo@spendwise.com" },
    include: {
      incomes: true,
      expenses: {
        include: {
          category: true,
        },
        orderBy: {
          date: "desc",
        },
      },
      categories: true,
    },
  });

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-red-600">Demo user not found.</p>
      </div>
    );
  }

  const currentMonth = 4;
  const currentYear = 2026;

  const monthlyIncomeEntry = user.incomes.find(
    (income) => income.month === currentMonth && income.year === currentYear
  );

  const monthlyIncome = monthlyIncomeEntry?.amount ?? 0;

  const monthlyExpensesList = user.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() + 1 === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const monthlyExpenses = monthlyExpensesList.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remainingBalance = monthlyIncome - monthlyExpenses;

  const budgetUsed =
    monthlyIncome > 0 ? (monthlyExpenses / monthlyIncome) * 100 : 0;

  const categoryTotals: Record<string, number> = {};

  for (const expense of monthlyExpensesList) {
    const categoryName = expense.category?.name ?? "Other";
    categoryTotals[categoryName] =
      (categoryTotals[categoryName] ?? 0) + expense.amount;
  }

  const topCategoryEntry = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topCategoryName = topCategoryEntry?.[0] ?? "None";
  const topCategoryAmount = topCategoryEntry?.[1] ?? 0;

  const recentExpenses = monthlyExpensesList
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);

  const summaryCards = [
    {
      title: "Monthly Income",
      value: `€${monthlyIncome.toFixed(2)}`,
      note: "Income for this month",
    },
    {
      title: "Monthly Expenses",
      value: `€${monthlyExpenses.toFixed(2)}`,
      note: "Total spending so far",
    },
    {
      title: "Remaining Balance",
      value: `€${remainingBalance.toFixed(2)}`,
      note: "Income minus expenses",
    },
    {
      title: "Budget Used",
      value: `${budgetUsed.toFixed(1)}%`,
      note: "Used from monthly income",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Overview of your income, expenses, and monthly balance.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {card.value}
            </h2>
            <p className="mt-2 text-sm text-slate-500">{card.note}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Expenses
            </h2>
            <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700">
              Add Expense
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Title</th>
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-slate-100"
                  >
                    <td className="py-4 pr-4 font-medium text-slate-800">
                      {expense.title}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {expense.category?.name ?? "Other"}
                    </td>
                    <td className="py-4 pr-4 text-slate-600">
                      {new Date(expense.date).toISOString().split("T")[0]}
                    </td>
                    <td className="py-4 font-semibold text-slate-900">
                      €{expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}

                {recentExpenses.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-slate-500"
                    >
                      No expenses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Budget Summary
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Income</span>
                <span>€{monthlyIncome.toFixed(2)}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-full rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Expenses</span>
                <span>€{monthlyExpenses.toFixed(2)}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-violet-600"
                  style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Remaining</span>
                <span>€{remainingBalance.toFixed(2)}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-sky-500"
                  style={{
                    width: `${
                      monthlyIncome > 0
                        ? Math.max(0, (remainingBalance / monthlyIncome) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Top spending category</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {topCategoryName}
            </p>
            <p className="text-sm text-slate-500">
              €{topCategoryAmount.toFixed(2)} spent this month
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}