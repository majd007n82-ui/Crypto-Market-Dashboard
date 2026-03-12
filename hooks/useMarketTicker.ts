"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [lastLiveUpdateAt, setLastLiveUpdateAt] = useState<number | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const manuallyClosedRef = useRef(false);

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current !== null) {
      window.clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const closeCurrentSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, []);

  const retry = useCallback(() => {
    manuallyClosedRef.current = false;
    clearReconnectTimeout();
    closeCurrentSocket();
    setStatus("connecting");
    setRetryNonce((prev) => prev + 1);
  }, [clearReconnectTimeout, closeCurrentSocket]);

  useEffect(() => {
    if (!enabled || !symbol) {
      manuallyClosedRef.current = true;
      clearReconnectTimeout();
      closeCurrentSocket();
      return;
    }

    manuallyClosedRef.current = false;

    function connect() {
      setStatus((prev) =>
        prev === "connected" ? "connected" : prev === "reconnecting" ? "reconnecting" : "connecting"
      );

      const ws = new WebSocket(buildTickerStreamUrl(symbol));
      socketRef.current = ws;

      ws.onopen = () => {
        setStatus("connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as BinanceTickerStreamMessage;
          setTicker(data);
          setLastLiveUpdateAt(data.E);
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
      closeCurrentSocket();
    };
  }, [
    enabled,
    symbol,
    reconnectDelay,
    retryNonce,
    clearReconnectTimeout,
    closeCurrentSocket,
  ]);

  return {
    ticker,
    status: !enabled || !symbol ? "disconnected" : status,
    retry,
    hasLiveData: ticker !== null,
    lastLiveUpdateAt,
  };
}