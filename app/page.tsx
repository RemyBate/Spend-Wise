import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main
        className="relative flex min-h-[calc(100vh-73px)] items-center justify-center text-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white/55" />

        <div className="relative z-10 max-w-2xl px-6">
          <span className="mb-4 inline-block rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">
            Personal Budget Tracker
          </span>

          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            SpendWise
          </h1>

          <p className="text-lg text-slate-700">
            Track your monthly income, manage expenses, organize categories, and
            monitor your remaining balance in one clean dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}