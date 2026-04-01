export default function CategoriesPage() {
  const categories = [
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Health",
    "Entertainment",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
        <p className="mt-2 text-slate-600">Organize your expenses by category.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Add Category</h2>

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Enter category name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
            >
              Save Category
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Saved Categories</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}