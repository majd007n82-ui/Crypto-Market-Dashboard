"use client";

import MarketsGrid from "@/components/markets/MarketsGrid";
import ConnectionStatusBadge from "@/components/ui/ConnectionStatusBadge";
import { useMarketsTickerStream } from "@/hooks/useMarketsTickerStream";
import type { MarketListItem } from "@/types/market";

type MarketsLiveSectionProps = {
  initialMarkets: MarketListItem[];
};

export default function MarketsLiveSection({
  initialMarkets,
}: MarketsLiveSectionProps) {
  const { markets, status, retry } = useMarketsTickerStream(initialMarkets);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ConnectionStatusBadge status={status} />
          <p className="text-sm text-slate-400">
            Live market list updates via combined WebSocket stream
          </p>
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

      <MarketsGrid markets={markets} />
    </section>
  );
}