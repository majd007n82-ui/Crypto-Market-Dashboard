import Link from "next/link";

export default function MarketNotFound() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/80 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          Market not found
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white">
          This trading pair is not available
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          The market you requested is not part of the supported list in this dashboard.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            ← Back to markets
          </Link>
        </div>
      </section>
    </main>
  );
}