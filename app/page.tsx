import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">
          Personal Budget Tracker
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          SpendWise
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
          Track your monthly income, manage expenses, organize categories, and
          monitor your remaining balance in one clean dashboard.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Open Dashboard
          </Link>

          <Link
            href="/expenses"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            View Expenses
          </Link>
        </div>
      </div>
    </main>
  );
}