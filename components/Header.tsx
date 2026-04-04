"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { performClientLogout } from "@/lib/client-logout";

type User = {
  id?: string;
  name: string;
  email?: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/session", { credentials: "include" });
        const data = await res.json();
        if (cancelled) return;

        if (res.ok && data.user?.id) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          return;
        }

        setUser(null);
        localStorage.removeItem("user");
      } catch {
        if (cancelled) return;
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem("user");
          }
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          prefetch={false}
          className="shrink-0 text-2xl font-bold text-violet-600 transition hover:text-violet-700"
          aria-label="Home"
        >
          SpendWise
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium text-slate-700">
          <Link
            href="/dashboard"
            prefetch={false}
            className="hover:text-violet-600"
          >
            Dashboard
          </Link>
          <Link
            href="/expenses"
            prefetch={false}
            className="hover:text-violet-600"
          >
            Expenses
          </Link>
          <Link
            href="/income"
            prefetch={false}
            className="hover:text-violet-600"
          >
            Income
          </Link>
          <Link
            href="/categories"
            prefetch={false}
            className="hover:text-violet-600"
          >
            Categories
          </Link>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3">
          {user ? (
            <>
              <span className="max-w-[120px] truncate text-sm font-medium text-slate-700 sm:max-w-none">
                Hi, {user.name}
              </span>
              <button
                type="button"
                onClick={() => void performClientLogout()}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-md bg-violet-600 px-4 py-2 text-sm text-white transition hover:bg-violet-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}