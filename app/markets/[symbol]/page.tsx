import Link from "next/link";
import { notFound } from "next/navigation";
import { MARKET_SYMBOLS } from "@/lib/constants/binance";
import { getMarketChart, getMarketDetails } from "@/lib/api/binance";
import MarketPriceChart from "@/components/markets/MarketPriceChart";
import MarketDetailsLive from "@/components/markets/MarketDetailsLive";

type MarketDetailsPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

export default async function MarketDetailsPage({
  params,
}: MarketDetailsPageProps) {
  const { symbol } = await params;
  const normalizedSymbol = symbol.toUpperCase();

  const isValidSymbol = MARKET_SYMBOLS.includes(
    normalizedSymbol as (typeof MARKET_SYMBOLS)[number]
  );

  if (!isValidSymbol) {
    notFound();
  }

  const [market, chartData] = await Promise.all([
    getMarketDetails(normalizedSymbol),
    getMarketChart(normalizedSymbol),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to markets
        </Link>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-sm">
        <MarketDetailsLive initialMarket={market} />

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Price Chart</h2>
            <p className="mt-1 text-sm text-slate-400">
              Recent price movement based on Binance market data.
            </p>
          </div>

          <MarketPriceChart data={chartData} />
        </div>
      </section>
    </main>
  );
}