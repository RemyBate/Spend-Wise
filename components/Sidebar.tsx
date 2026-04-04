"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch {
      /* ignore */
    }
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Expenses", href: "/expenses" },
    { name: "Income", href: "/income" },
    { name: "Categories", href: "/categories" },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col justify-between border-r border-slate-200 bg-white">
      <div>
        <div className="flex flex-col items-center border-b border-slate-200 px-6 py-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <p className="mt-3 text-base font-semibold text-slate-900">
            {user?.name || "User"}
          </p>
          <p className="text-sm text-slate-500">{user?.email || ""}</p>
        </div>

        <nav className="flex flex-col gap-2 px-4 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}