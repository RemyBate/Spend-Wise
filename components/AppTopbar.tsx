"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { performClientLogout } from "@/lib/client-logout";

type User = {
  id?: string;
  name: string;
};

export default function AppTopbar() {
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
      } catch {
        /* fall through */
      }
      if (cancelled) return;
      const saved = localStorage.getItem("user");
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch {
          localStorage.removeItem("user");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <Link
              href="/"
              prefetch={false}
              className="text-2xl font-bold text-violet-600 transition hover:text-violet-700"
              aria-label="Home"
            >
              SpendWise
            </Link>
            <p className="text-sm text-slate-500">Personal budget tracker</p>
          </div>
          <Link
            href="/"
            prefetch={false}
            className="self-start rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:self-center"
          >
            Home
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="max-w-[100px] truncate text-sm font-medium text-slate-700 md:max-w-none">
              Hi, {user.name}
            </span>
            <button
              type="button"
              onClick={() => void performClientLogout()}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}