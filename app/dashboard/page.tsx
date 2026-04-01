export default function DashboardPage() {
  const summaryCards = [
    { title: "Monthly Income", value: "€2,500", note: "Income for this month" },
    { title: "Monthly Expenses", value: "€1,420", note: "Total spending so far" },
    { title: "Remaining Balance", value: "€1,080", note: "Income minus expenses" },
    { title: "Budget Used", value: "56.8%", note: "Used from monthly income" },
  ];

  const recentExpenses = [
    { title: "Groceries", category: "Food", amount: "€85.00", date: "2026-04-01" },
    { title: "Bus Ticket", category: "Transport", amount: "€24.00", date: "2026-04-02" },
    { title: "Internet Bill", category: "Bills", amount: "€45.00", date: "2026-04-03" },
    { title: "Hair Products", category: "Shopping", amount: "€30.00", date: "2026-04-04" },
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
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{card.value}</h2>
            <p className="mt-2 text-sm text-slate-500">{card.note}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Recent Expenses</h2>
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
                  <tr key={`${expense.title}-${expense.date}`} className="border-b border-slate-100">
                    <td className="py-4 pr-4 font-medium text-slate-800">{expense.title}</td>
                    <td className="py-4 pr-4 text-slate-600">{expense.category}</td>
                    <td className="py-4 pr-4 text-slate-600">{expense.date}</td>
                    <td className="py-4 font-semibold text-slate-900">{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Budget Summary</h2>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Income</span>
                <span>€2,500</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-full rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Expenses</span>
                <span>€1,420</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[57%] rounded-full bg-violet-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Remaining</span>
                <span>€1,080</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[43%] rounded-full bg-sky-500" />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Top spending category</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Food</p>
            <p className="text-sm text-slate-500">€420 spent this month</p>
          </div>
        </div>
      </section>
    </div>
  );
}