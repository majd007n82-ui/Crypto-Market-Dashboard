import Link from "next/link";
import type { MarketListItem } from "@/types/market";
import {
  formatCompactNumber,
  formatPrice,
} from "@/lib/formatters/market";
import ChangeBadge from "@/components/ui/ChangeBadge";
import FavoriteButton from "@/components/ui/FavoriteButton";

type MarketCardProps = {
  market: MarketListItem;
};

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {market.displaySymbol}
          </h2>
          <p className="mt-1 text-sm text-slate-400">{market.symbol}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-white">
            ${formatPrice(market.lastPrice)}
          </p>
          <div className="mt-2">
            <ChangeBadge value={market.priceChangePercent} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl bg-slate-800/60 p-3">
          <p className="text-slate-400">24h High</p>
          <p className="mt-1 font-medium text-white">
            ${formatPrice(market.highPrice)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-3">
          <p className="text-slate-400">24h Low</p>
          <p className="mt-1 font-medium text-white">
            ${formatPrice(market.lowPrice)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800/60 p-3">
          <p className="text-slate-400">Volume</p>
          <p className="mt-1 font-medium text-white">
            {formatCompactNumber(market.volume)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <FavoriteButton symbol={market.symbol} />

        <Link
          href={`/markets/${market.symbol}`}
          className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}