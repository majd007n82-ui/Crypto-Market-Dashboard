import MarketsGrid from "@/components/markets/MarketsGrid";
import { getMarkets24hr } from "@/lib/api/binance";

export default async function HomePage() {
  const markets = await getMarkets24hr();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          Track B Assignment
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Crypto Market Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-400 md:text-base">
          Browse live cryptocurrency markets, inspect detailed market data,
          and follow real-time price movements.
        </p>
      </header>

      <MarketsGrid markets={markets} />
    </main>
  );
}