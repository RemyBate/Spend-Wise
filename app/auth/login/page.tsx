"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Wrong login credentials.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Login successful. Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020b23] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            SpendWise
          </h1>

          <p className="mt-3 text-lg italic text-slate-300">
            Sign in to your account
          </p>

          <div className="mx-auto mt-3 h-[2px] w-16 rounded bg-slate-500/60" />
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-[#030d2b]/80 p-6 shadow-2xl backdrop-blur-sm">
          <h2 className="mb-2 text-4xl font-bold text-white">Sign In</h2>
          <p className="mb-6 text-base text-slate-300">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400"
              />
            </div>

            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-slate-300 underline underline-offset-2 hover:text-white"
              >
                Forgot password?
              </Link>
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
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-white underline underline-offset-2"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}