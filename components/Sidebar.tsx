"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Expenses", href: "/expenses" },
  { name: "Income", href: "/income" },
  { name: "Categories", href: "/categories" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-200 bg-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-6 py-5">
          <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900">
            Spend<span className="text-violet-600">Wise</span>
          </Link>
          <p className="mt-1 text-sm text-slate-500">Budget & expense tracker</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-4 md:flex-col md:overflow-visible">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}