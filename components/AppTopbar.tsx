"use client";

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
        <div>
          <h1 className="text-2xl font-bold text-slate-900">SpendWise</h1>
          <p className="text-sm text-slate-500">Personal budget tracker</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="font-medium text-slate-900">{user?.name || "User"}</p>
        </div>
      </div>
    </header>
  );
}