import {
  BINANCE_REST_BASE_URL,
  DEFAULT_CHART_INTERVAL,
  DEFAULT_CHART_LIMIT,
  MARKET_SYMBOLS,
} from "@/lib/constants/binance";
import type {
  Binance24hrTicker,
  BinanceKline,
  ChartPoint,
  MarketDetails,
  MarketListItem,
} from "@/types/market";
import { formatSymbol } from "@/lib/formatters/market";

async function fetchFromBinance<T>(path: string): Promise<T> {
  const response = await fetch(`${BINANCE_REST_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Binance API error: ${response.status}`);
  }

  return response.json();
}

export async function getMarkets24hr(): Promise<MarketListItem[]> {
  const symbolsParam = JSON.stringify(MARKET_SYMBOLS);
  const data = await fetchFromBinance<Binance24hrTicker[]>(
    `/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsParam)}`
  );

  return data.map((item) => ({
    symbol: item.symbol,
    displaySymbol: formatSymbol(item.symbol),
    lastPrice: item.lastPrice,
    priceChangePercent: item.priceChangePercent,
    highPrice: item.highPrice,
    lowPrice: item.lowPrice,
    volume: item.volume,
  }));
}

export async function getMarketDetails(symbol: string): Promise<MarketDetails> {
  const data = await fetchFromBinance<Binance24hrTicker>(
    `/api/v3/ticker/24hr?symbol=${symbol}`
  );

  return {
    symbol: data.symbol,
    lastPrice: data.lastPrice,
    priceChange: data.priceChange,
    priceChangePercent: data.priceChangePercent,
    highPrice: data.highPrice,
    lowPrice: data.lowPrice,
    volume: data.volume,
    bidPrice: data.bidPrice,
    askPrice: data.askPrice,
    updatedAt: data.closeTime,
  };
}

export async function getMarketChart(
  symbol: string,
  interval = DEFAULT_CHART_INTERVAL,
  limit = DEFAULT_CHART_LIMIT
): Promise<ChartPoint[]> {
  const data = await fetchFromBinance<BinanceKline[]>(
    `/api/v3/uiKlines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  );

  return data.map((item) => ({
    time: item[0],
    price: Number(item[4]),
  }));
}