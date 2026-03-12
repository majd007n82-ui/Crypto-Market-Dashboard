"use client";

import type { MarketDetails } from "@/types/market";
import { useMarketTicker } from "@/hooks/useMarketTicker";
import { formatPrice, formatSymbol, formatTimestamp } from "@/lib/formatters/market";
import ChangeBadge from "@/components/ui/ChangeBadge";
import FavoriteButton from "@/components/ui/FavoriteButton";
import ConnectionStatusBadge from "@/components/ui/ConnectionStatusBadge";
import MarketStatsGrid from "@/components/markets/MarketStatsGrid";

type MarketDetailsLiveProps = {
  initialMarket: MarketDetails;
};

export default function MarketDetailsLive({
  initialMarket,
}: MarketDetailsLiveProps) {
  const { ticker, status } = useMarketTicker(initialMarket.symbol);

  const market = {
    ...initialMarket,
    lastPrice: ticker?.c ?? initialMarket.lastPrice,
    priceChange: ticker?.p ?? initialMarket.priceChange,
    priceChangePercent: ticker?.P ?? initialMarket.priceChangePercent,
    highPrice: ticker?.h ?? initialMarket.highPrice,
    lowPrice: ticker?.l ?? initialMarket.lowPrice,
    volume: ticker?.v ?? initialMarket.volume,
    bidPrice: ticker?.b ?? initialMarket.bidPrice,
    askPrice: ticker?.a ?? initialMarket.askPrice,
    updatedAt: ticker?.E ?? initialMarket.updatedAt,
  };

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Market Details
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            {formatSymbol(market.symbol)}
          </h1>
          <p className="mt-2 text-sm text-slate-400">{market.symbol}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <p className="text-3xl font-bold text-white md:text-5xl">
              ${formatPrice(market.lastPrice)}
            </p>
            <ChangeBadge value={market.priceChangePercent} />
            <ConnectionStatusBadge status={status} />
          </div>

            <p className="mt-3 text-sm text-slate-400">
            Last updated: {formatTimestamp(market.updatedAt)}
            </p>

            {status === "reconnecting" && (
  <p className="mt-2 text-sm text-sky-300">
    Live connection lost. Reconnecting automatically...
  </p>
)}

{status === "connecting" && (
  <p className="mt-2 text-sm text-amber-300">
    Establishing live market connection...
  </p>
)}

{status === "disconnected" && (
  <p className="mt-2 text-sm text-slate-400">
    Live updates are unavailable right now. Showing the latest loaded market data.
  </p>
)}
        </div>

        <div className="flex items-center gap-3">
          <FavoriteButton symbol={market.symbol} />
        </div>
      </div>

      <div className="mt-8">
        <MarketStatsGrid
          highPrice={market.highPrice}
          lowPrice={market.lowPrice}
          volume={market.volume}
          bidPrice={market.bidPrice}
          askPrice={market.askPrice}
        />
      </div>
    </>
  );
}