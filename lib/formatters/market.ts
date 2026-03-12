export function formatSymbol(symbol: string) {
  return symbol.replace("USDT", "/USDT");
}

export function formatPrice(value: string | number, digits = 2) {
  const num = Number(value);

  if (Number.isNaN(num)) return "-";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(num);
}

export function formatCompactNumber(value: string | number) {
  const num = Number(value);

  if (Number.isNaN(num)) return "-";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatPercentage(value: string | number) {
  const num = Number(value);

  if (Number.isNaN(num)) return "-";

  return `${num >= 0 ? "+" : ""}${num.toFixed(2)}%`;
}

export function formatTimestamp(timestamp: number) {
  if (!timestamp) return "-";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(timestamp));
}