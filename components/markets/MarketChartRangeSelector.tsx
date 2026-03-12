import Link from "next/link";
import {
  CHART_RANGE_OPTIONS,
  type ChartRangeKey,
} from "@/lib/constants/binance";

type MarketChartRangeSelectorProps = {
  symbol: string;
  selectedRange: ChartRangeKey;
};

export default function MarketChartRangeSelector({
  symbol,
  selectedRange,
}: MarketChartRangeSelectorProps) {
  return (
    <div className="inline-flex rounded-xl border border-slate-800 bg-slate-950 p-1">
      {Object.entries(CHART_RANGE_OPTIONS).map(([key, option]) => {
        const isActive = key === selectedRange;

        return (
          <Link
            key={key}
            href={`/markets/${symbol}?range=${key}`}
            className={[
              "rounded-lg px-3 py-1.5 text-sm font-medium transition",
              isActive
                ? "bg-white text-slate-950"
                : "text-slate-300 hover:text-white",
            ].join(" ")}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}