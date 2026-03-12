"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/types/market";

type MarketPriceChartProps = {
  data: ChartPoint[];
};

function formatAxisTime(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function formatTooltipTime(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
}

export default function MarketPriceChart({ data }: MarketPriceChartProps) {
  if (!data.length) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/50">
        <p className="text-sm text-slate-400">No chart data available.</p>
      </div>
    );
  }

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="time"
            tickFormatter={formatAxisTime}
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={["auto", "auto"]}
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => Number(value).toFixed(2)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#ffffff",
            }}
            labelFormatter={(label) => formatTooltipTime(Number(label))}
            formatter={(value: number) => [`$${Number(value).toFixed(2)}`, "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.12}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}