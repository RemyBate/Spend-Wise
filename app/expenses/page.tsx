export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Expenses</h1>
          <p className="mt-2 text-slate-600">Track and manage all your expenses.</p>
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
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Shopping</option>
        </select>
        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Groceries", "Food", "2026-04-01", "€85.00"],
              ["Internet Bill", "Bills", "2026-04-02", "€45.00"],
              ["Bus Ticket", "Transport", "2026-04-03", "€24.00"],
              ["Hair Products", "Shopping", "2026-04-04", "€30.00"],
            ].map(([title, category, date, amount]) => (
              <tr key={`${title}-${date}`} className="border-b border-slate-100">
                <td className="px-6 py-4 font-medium text-slate-800">{title}</td>
                <td className="px-6 py-4 text-slate-600">{category}</td>
                <td className="px-6 py-4 text-slate-600">{date}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{amount}</td>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}