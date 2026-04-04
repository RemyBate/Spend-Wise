import Header from "@/components/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 rounded-full bg-violet-100 px-4 py-1 text-sm text-violet-600">
          Personal Budget Tracker
        </span>

        <h1 className="mb-4 text-4xl font-bold text-slate-900">SpendWise</h1>

        <p className="mb-6 max-w-xl text-slate-600">
          Track your monthly income, manage expenses, organize categories, and
          monitor your remaining balance in one clean dashboard.
        </p>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
          >
            Open Dashboard
          </Link>

          <Link
            href="/expenses"
            className="rounded-lg border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100"
          >
            View Expenses
          </Link>
        </div>
      </section>
    </div>
  );
}