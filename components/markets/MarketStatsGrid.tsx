import { formatCompactNumber, formatPrice } from "@/lib/formatters/market";

type MarketStatsGridProps = {
  highPrice: string;
  lowPrice: string;
  volume: string;
  bidPrice: string;
  askPrice: string;
};

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

export default function MarketStatsGrid({
  highPrice,
  lowPrice,
  volume,
  bidPrice,
  askPrice,
}: MarketStatsGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard label="24h High" value={`$${formatPrice(highPrice)}`} />
      <StatCard label="24h Low" value={`$${formatPrice(lowPrice)}`} />
      <StatCard label="24h Volume" value={formatCompactNumber(volume)} />
      <StatCard label="Best Bid" value={`$${formatPrice(bidPrice)}`} />
      <StatCard label="Best Ask" value={`$${formatPrice(askPrice)}`} />
    </section>
  );
}