import type { MarketListItem } from "@/types/market";
import MarketCard from "@/components/markets/MarketCard";

type MarketsGridProps = {
  markets: MarketListItem[];
};

export default function MarketsGrid({ markets }: MarketsGridProps) {
  if (!markets.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
        <h2 className="text-lg font-semibold text-white">No markets found</h2>
        <p className="mt-2 text-sm text-slate-400">
          There is no market data available right now.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {markets.map((market) => (
        <MarketCard key={market.symbol} market={market} />
      ))}
    </section>
  );
}