"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id?: string;
  name: string;
  email?: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  }

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-violet-600">
          SpendWise
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/dashboard" className="hover:text-violet-600">
            Dashboard
          </Link>
          <Link href="/expenses" className="hover:text-violet-600">
            Expenses
          </Link>
          <Link href="/income" className="hover:text-violet-600">
            Income
          </Link>
          <Link href="/categories" className="hover:text-violet-600">
            Categories
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-slate-700">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-md bg-violet-600 px-4 py-2 text-white transition hover:bg-violet-700"
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