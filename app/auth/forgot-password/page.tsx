"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send reset link.");
        setLoading(false);
        return;
      }

      setMessage(data.message || "Reset link sent successfully. Please check your email.");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020b23] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-xl border border-slate-700/60 bg-[#030d2b]/80 p-6 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold">Forgot Password</h1>
        <p className="mb-6 text-slate-300">
          Enter your email address to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-md border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-white py-3 font-medium text-slate-900 transition hover:bg-slate-200 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>

          <p className="text-center text-sm text-slate-300">
            Back to{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-white underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}