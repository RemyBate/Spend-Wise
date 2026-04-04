"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email?: string;
};

function UserAvatarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      <path d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate display name from localStorage after mount
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Expenses", href: "/expenses" },
    { name: "Income", href: "/income" },
    { name: "Categories", href: "/categories" },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex flex-col items-center border-b border-slate-200 px-6 py-8">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-600 bg-violet-50 text-violet-600"
            aria-hidden
          >
            <UserAvatarIcon className="h-8 w-8" />
          </div>
          <p className="mt-3 text-center text-base font-semibold text-slate-900">
            {user?.name || "User"}
          </p>
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
    </aside>
  );
}