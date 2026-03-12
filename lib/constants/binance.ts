export const BINANCE_REST_BASE_URL = "https://data-api.binance.vision";
export const BINANCE_WS_BASE_URL = "wss://stream.binance.com:9443";

export const MARKET_SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "BNBUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "ADAUSDT",
  "DOGEUSDT",
  "AVAXUSDT",
  "DOTUSDT",
  "MATICUSDT",
] as const;

export const DEFAULT_CHART_INTERVAL = "1m";
export const DEFAULT_CHART_LIMIT = 30;

export const CHART_RANGE_OPTIONS = {
  "30m": {
    label: "30M",
    interval: "1m",
    limit: 30,
  },
  "1h": {
    label: "1H",
    interval: "1m",
    limit: 60,
  },
  "4h": {
    label: "4H",
    interval: "5m",
    limit: 48,
  },
  "1d": {
    label: "1D",
    interval: "15m",
    limit: 96,
  },
} as const;

export type ChartRangeKey = keyof typeof CHART_RANGE_OPTIONS;

export const DEFAULT_CHART_RANGE: ChartRangeKey = "1h";