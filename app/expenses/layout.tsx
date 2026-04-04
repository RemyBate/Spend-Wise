import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import AppTopbar from "@/components/AppTopbar";

export default function ExpensesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1">
        <AppTopbar />

        <main className="px-8 py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}