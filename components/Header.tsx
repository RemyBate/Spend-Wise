"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Expenses", href: "/expenses" },
    { name: "Income", href: "/income" },
    { name: "Categories", href: "/categories" },
  ];

  return (
    <header className="w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-3xl font-bold text-violet-600">
          SpendWise
        </Link>

        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-violet-600"
                    : "text-slate-600 hover:text-violet-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}