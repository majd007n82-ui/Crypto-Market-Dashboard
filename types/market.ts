export type SocketConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting";

export interface BinanceTickerStreamMessage {
  e: string; // event type
  E: number; // event time
  s: string; // symbol
  p: string; // price change
  P: string; // price change percent
  c: string; // last price
  b: string; // best bid price
  a: string; // best ask price
  h: string; // high price
  l: string; // low price
  v: string; // total traded base asset volume
}

export interface BinanceCombinedTickerStreamMessage {
  stream: string;
  data: BinanceTickerStreamMessage;
}