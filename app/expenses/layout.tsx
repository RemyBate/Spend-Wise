import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function ExpensesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}