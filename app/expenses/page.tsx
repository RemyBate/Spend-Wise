import FinanceChartsSection from "@/components/charts/finance-charts-section";
import { buildSpendingByCategoryData } from "@/lib/chart-helpers";
import { prisma } from "@/lib/prisma";
import {
  formatReportMonthLabel,
  REPORTING_MONTH,
  REPORTING_YEAR,
} from "@/lib/reporting-period";

export default async function ExpensesPage() {
  const user = await prisma.user.findUnique({
    where: { email: "demo@spendwise.com" },
    include: {
      incomes: true,
      categories: true,
      expenses: {
        include: {
          category: true,
        },
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
        <p className="text-red-600">Demo user not found.</p>
      </div>
    );
  }

  const expenses = user.expenses;

  const monthlyIncomeEntry = user.incomes.find(
    (income) =>
      income.month === REPORTING_MONTH && income.year === REPORTING_YEAR
  );
  const monthlyIncome = monthlyIncomeEntry?.amount ?? 0;

  const monthlyExpensesList = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() + 1 === REPORTING_MONTH &&
      expenseDate.getFullYear() === REPORTING_YEAR
    );
  });

  const monthlyExpenses = monthlyExpensesList.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals: Record<string, number> = {};
  for (const expense of monthlyExpensesList) {
    const categoryName = expense.category?.name ?? "Other";
    categoryTotals[categoryName] =
      (categoryTotals[categoryName] ?? 0) + expense.amount;
  }

  const donutData = buildSpendingByCategoryData(
    categoryTotals,
    user.categories
  );

  const monthLabel = formatReportMonthLabel(
    REPORTING_MONTH,
    REPORTING_YEAR
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
          <p className="mt-2 text-slate-600">
            Track and manage all your expenses.
          </p>
        </div>

        <button className="rounded-lg bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700">
          New Expense
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search expense..."
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500"
        />
        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500">
          <option>All Categories</option>
        </select>
        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500">
          <option>All Dates</option>
        </select>
      </div>

      <FinanceChartsSection
        donutData={donutData}
        monthLabel={monthLabel}
        income={monthlyIncome}
        expenses={monthlyExpenses}
      />

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Payment Method</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {expense.title}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {expense.category?.name ?? "Other"}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(expense.date).toISOString().split("T")[0]}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">
                  €{expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {expense.paymentMethod ?? "N/A"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200">
                      Edit
                    </button>
                    <button className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600 hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {expenses.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-slate-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}