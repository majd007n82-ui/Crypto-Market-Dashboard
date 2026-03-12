import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CHART_RANGE_OPTIONS,
  DEFAULT_CHART_RANGE,
  MARKET_SYMBOLS,
  type ChartRangeKey,
} from "@/lib/constants/binance";
import { getMarketChart, getMarketDetails } from "@/lib/api/binance";
import MarketPriceChart from "@/components/markets/MarketPriceChart";
import MarketDetailsLive from "@/components/markets/MarketDetailsLive";
import MarketChartRangeSelector from "@/components/markets/MarketChartRangeSelector";

type MarketDetailsPageProps = {
  params: Promise<{
    symbol: string;
  }>;
  searchParams: Promise<{
    range?: string;
  }>;
};

export default async function MarketDetailsPage({
  params,
  searchParams,
}: MarketDetailsPageProps) {
  const { symbol } = await params;
  const { range } = await searchParams;

  const normalizedSymbol = symbol.toUpperCase();

  const isValidSymbol = MARKET_SYMBOLS.includes(
    normalizedSymbol as (typeof MARKET_SYMBOLS)[number]
  );

  if (!isValidSymbol) {
    notFound();
  }

  const selectedRange: ChartRangeKey =
    range && range in CHART_RANGE_OPTIONS
      ? (range as ChartRangeKey)
      : DEFAULT_CHART_RANGE;

  const chartConfig = CHART_RANGE_OPTIONS[selectedRange];

  const [market, chartData] = await Promise.all([
    getMarketDetails(normalizedSymbol),
    getMarketChart(
      normalizedSymbol,
      chartConfig.interval,
      chartConfig.limit
    ),
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
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Price Chart</h2>
              <p className="mt-1 text-sm text-slate-400">
                Recent price movement based on Binance market data.
              </p>
            </div>

            <MarketChartRangeSelector
              symbol={market.symbol}
              selectedRange={selectedRange}
            />
          </div>

          <MarketPriceChart data={chartData} />
        </div>
      </section>
    </main>
  );
}