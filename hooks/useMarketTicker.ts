"use client";

import { useEffect, useRef, useState } from "react";
import { buildTickerStreamUrl } from "@/lib/websocket/binance";
import type {
  BinanceTickerStreamMessage,
  SocketConnectionStatus,
} from "@/types/market";

type UseMarketTickerOptions = {
  enabled?: boolean;
  reconnectDelay?: number;
};

export function useMarketTicker(
  symbol: string,
  options: UseMarketTickerOptions = {}
) {
  const { enabled = true, reconnectDelay = 3000 } = options;

  const [status, setStatus] = useState<SocketConnectionStatus>(
    enabled && symbol ? "connecting" : "disconnected"
  );
  const [ticker, setTicker] = useState<BinanceTickerStreamMessage | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const manuallyClosedRef = useRef(false);

  useEffect(() => {
    function clearReconnectTimeout() {
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    }

    if (!enabled || !symbol) {
      manuallyClosedRef.current = true;
      clearReconnectTimeout();

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      return;
    }

    manuallyClosedRef.current = false;

    function connect() {
      const ws = new WebSocket(buildTickerStreamUrl(symbol));
      socketRef.current = ws;

      ws.onopen = () => {
        setStatus("connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as BinanceTickerStreamMessage;
          setTicker(data);
        } catch (error) {
          console.error("Failed to parse ticker message", error);
        }
      };

      ws.onerror = () => {
        ws.close();
      };

      ws.onclose = () => {
        socketRef.current = null;

        if (manuallyClosedRef.current) {
          return;
        }

        setStatus("reconnecting");

        reconnectTimeoutRef.current = window.setTimeout(() => {
          if (!manuallyClosedRef.current) {
            connect();
          }
        }, reconnectDelay);
      };
    }

    connect();

    return () => {
      manuallyClosedRef.current = true;
      clearReconnectTimeout();

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [enabled, reconnectDelay, symbol]);

  return {
    ticker,
    status: !enabled || !symbol ? "disconnected" : status,
  };
}