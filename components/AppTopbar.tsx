"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function AppTopbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-8 py-5">
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

        <div className="text-right">
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="font-medium text-slate-900">{user?.name || "User"}</p>
        </div>
      </div>
    </header>
  );
}