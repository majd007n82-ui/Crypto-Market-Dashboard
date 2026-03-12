import { BINANCE_WS_BASE_URL } from "@/lib/constants/binance";

export function toStreamSymbol(symbol: string) {
  return symbol.toLowerCase();
}

export function buildTickerStreamUrl(symbol: string) {
  return `${BINANCE_WS_BASE_URL}/ws/${toStreamSymbol(symbol)}@ticker`;
}