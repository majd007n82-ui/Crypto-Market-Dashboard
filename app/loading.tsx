export default function HomeLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
        <div className="mt-3 h-10 w-80 animate-pulse rounded bg-slate-800" />
        <div className="mt-3 h-4 w-[28rem] animate-pulse rounded bg-slate-800" />
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="h-6 w-28 animate-pulse rounded bg-slate-800" />
                <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-800" />
              </div>

              <div className="text-right">
                <div className="h-6 w-24 animate-pulse rounded bg-slate-800" />
                <div className="mt-2 h-5 w-16 animate-pulse rounded bg-slate-800" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="h-20 animate-pulse rounded-xl bg-slate-800/70" />
              <div className="h-20 animate-pulse rounded-xl bg-slate-800/70" />
              <div className="h-20 animate-pulse rounded-xl bg-slate-800/70" />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-800" />
              <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-800" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}