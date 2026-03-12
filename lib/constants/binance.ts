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