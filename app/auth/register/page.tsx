"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      setMessage("Registration successful. Redirecting to login...");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1200);
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
            Sign up for a new account
          </p>

          <div className="mx-auto mt-3 h-[2px] w-16 rounded bg-slate-500/60" />
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-[#030d2b]/80 p-6 shadow-2xl backdrop-blur-sm">
          <p className="mb-6 text-base text-slate-300">
            Enter your details to create a new account
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter a username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400"
              />
            </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-slate-300">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-white underline underline-offset-2"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}