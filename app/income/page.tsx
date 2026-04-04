import CashFlowLineChart from "@/components/charts/cash-flow-line-chart";
import { buildLast7DaysCashFlow } from "@/lib/cash-flow-series";
import { formatReportMonthLabel } from "@/lib/reporting-period";
import { prisma } from "@/lib/prisma";

export default async function IncomePage() {
  const user = await prisma.user.findUnique({
    where: { email: "demo@spendwise.com" },
    include: {
      incomes: {
        orderBy: [{ year: "desc" }, { month: "desc" }],
      },
      expenses: {
        select: { date: true, amount: true },
      },
    },
  });

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Income</h1>
        <p className="text-red-600">Demo user not found.</p>
      </div>
    );
  }

  const cashFlowData = buildLast7DaysCashFlow(user.expenses, user.incomes);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Income</h1>
        <p className="mt-2 text-slate-600">
          Set and review your monthly income entries.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-violet-200 pb-3">
          <h2 className="text-lg font-semibold text-violet-600">
            Last 7 days cash flow
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Daily expenses vs your monthly income spread across each day (for
            comparison).
          </p>
        </div>
        <div className="mt-4">
          <CashFlowLineChart data={cashFlowData} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Add Monthly Income
          </h2>

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Month
              </label>
              <input
                type="month"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Income Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
            >
              Save Income
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Income Entries
          </h2>

          <div className="mt-6 space-y-4">
            {user.incomes.length === 0 ? (
              <p className="text-sm text-slate-500">No income entries yet.</p>
            ) : (
              user.incomes.map((inc) => (
                <div
                  key={inc.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {formatReportMonthLabel(inc.month, inc.year)}
                    </p>
                    <p className="text-sm text-slate-500">Monthly income entry</p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    €{inc.amount.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
