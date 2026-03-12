"use client";

type MarketErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MarketErrorPage({
  error,
  reset,
}: MarketErrorPageProps) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <section className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-red-200/80">
          Market error
        </p>
        <h1 className="mt-3 text-3xl font-bold text-red-100">
          Something went wrong while loading this market
        </h1>
        <p className="mt-3 text-sm text-red-100/90">
          Please retry. The market data source may be temporarily unavailable.
        </p>

        <p className="mt-4 text-xs text-red-100/70">
          {error.message || "Unknown error"}
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Retry
          </button>
        </div>
      </section>
    </main>
  );
}