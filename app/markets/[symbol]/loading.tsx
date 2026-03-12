export default function MarketDetailsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-slate-800" />

      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="h-4 w-28 animate-pulse rounded bg-slate-800" />
            <div className="mt-3 h-10 w-56 animate-pulse rounded bg-slate-800" />
            <div className="mt-3 h-4 w-24 animate-pulse rounded bg-slate-800" />

            <div className="mt-5 flex gap-3">
              <div className="h-12 w-40 animate-pulse rounded bg-slate-800" />
              <div className="h-8 w-24 animate-pulse rounded-full bg-slate-800" />
              <div className="h-8 w-24 animate-pulse rounded-full bg-slate-800" />
            </div>

            <div className="mt-4 h-4 w-40 animate-pulse rounded bg-slate-800" />
          </div>

          <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-800" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-2xl border border-slate-800 bg-slate-900"
            />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 h-6 w-40 animate-pulse rounded bg-slate-800" />
          <div className="h-[260px] animate-pulse rounded-xl bg-slate-800/70" />
        </div>
      </section>
    </main>
  );
}