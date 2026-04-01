export default function IncomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Income</h1>
        <p className="mt-2 text-slate-600">Set and review your monthly income entries.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Add Monthly Income</h2>

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
          <h2 className="text-xl font-semibold text-slate-900">Recent Income Entries</h2>

          <div className="mt-6 space-y-4">
            {[
              { month: "April 2026", amount: "€2,500" },
              { month: "March 2026", amount: "€2,300" },
              { month: "February 2026", amount: "€2,400" },
            ].map((item) => (
              <div
                key={item.month}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-slate-800">{item.month}</p>
                  <p className="text-sm text-slate-500">Monthly income entry</p>
                </div>
                <p className="text-lg font-semibold text-slate-900">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}