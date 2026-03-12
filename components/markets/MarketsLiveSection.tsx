"use client";

import { useMemo, useState } from "react";
import MarketsGrid from "@/components/markets/MarketsGrid";
import ConnectionStatusBadge from "@/components/ui/ConnectionStatusBadge";
import { useMarketsTickerStream } from "@/hooks/useMarketsTickerStream";
import { useFavorites } from "@/hooks/useFavorites";
import type { MarketListItem } from "@/types/market";

type MarketsLiveSectionProps = {
  initialMarkets: MarketListItem[];
};

type FilterMode = "all" | "favorites";

export default function MarketsLiveSection({
  initialMarkets,
}: MarketsLiveSectionProps) {
  const { markets, status, retry } = useMarketsTickerStream(initialMarkets);
  const { favorites } = useFavorites();
  const [filterMode, setFilterMode] = useState<FilterMode>("all");

  const filteredMarkets = useMemo(() => {
    if (filterMode === "all") return markets;
    return markets.filter((market) => favorites.includes(market.symbol));
  }, [favorites, filterMode, markets]);

  const favoritesCount = favorites.length;

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <ConnectionStatusBadge status={status} />
          <p className="text-sm text-slate-400">
            Live market list updates via combined WebSocket stream
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={[
                "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                filterMode === "all"
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:text-white",
              ].join(" ")}
            >
              All Markets
            </button>

            <button
              type="button"
              onClick={() => setFilterMode("favorites")}
              className={[
                "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                filterMode === "favorites"
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:text-white",
              ].join(" ")}
            >
              Favorites Only ({favoritesCount})
            </button>
          </div>

          {(status === "reconnecting" || status === "disconnected") && (
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-700"
            >
              Retry live updates
            </button>
          )}
        </div>
      </div>

      {status === "connecting" && (
        <p className="mb-4 text-sm text-amber-300">
          Establishing live market list connection...
        </p>
      )}

      {status === "reconnecting" && (
        <p className="mb-4 text-sm text-sky-300">
          Live list connection lost. Reconnecting automatically...
        </p>
      )}

      {status === "disconnected" && (
        <p className="mb-4 text-sm text-slate-400">
          Live list updates are unavailable right now. Showing the latest loaded
          market data.
        </p>
      )}

      {filterMode === "favorites" && favoritesCount === 0 && (
        <div className="mb-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center">
          <h2 className="text-lg font-semibold text-white">
            No favorites yet
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Mark markets as favorites to quickly access them here.
          </p>
        </div>
      )}

      <MarketsGrid markets={filteredMarkets} />
    </section>
  );
}