"use client";

import { useCallback, useEffect, useState } from "react";
import { buildCombinedTickerStreamUrl } from "@/lib/websocket/binance";
import type {
  BinanceCombinedTickerStreamMessage,
  MarketListItem,
  SocketConnectionStatus,
} from "@/types/market";

type UseMarketsTickerStreamOptions = {
  enabled?: boolean;
  reconnectDelay?: number;
};

export function useMarketsTickerStream(
  initialMarkets: MarketListItem[],
  options: UseMarketsTickerStreamOptions = {}
) {
  const { enabled = true, reconnectDelay = 3000 } = options;

  const [markets, setMarkets] = useState<MarketListItem[]>(initialMarkets);
  const [status, setStatus] = useState<SocketConnectionStatus>(
    enabled && initialMarkets.length ? "connecting" : "disconnected"
  );
  const [retryNonce, setRetryNonce] = useState(0);

  const retry = useCallback(() => {
    setStatus("connecting");
    setRetryNonce((prev) => prev + 1);
  }, []);

  useEffect(() => {
    setMarkets(initialMarkets);
  }, [initialMarkets]);

  useEffect(() => {
    if (!enabled || !initialMarkets.length) {
      return;
    }

    const symbols = initialMarkets.map((market) => market.symbol);
    let socket: WebSocket | null = null;
    let reconnectTimeout: number | null = null;
    let manuallyClosed = false;

    function clearReconnectTimeout() {
      if (reconnectTimeout !== null) {
        window.clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    }

    function connect() {
      socket = new WebSocket(buildCombinedTickerStreamUrl(symbols));

      socket.onopen = () => {
        setStatus("connected");
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(
            event.data
          ) as BinanceCombinedTickerStreamMessage;

          const ticker = message.data;

          setMarkets((currentMarkets) =>
            currentMarkets.map((market) =>
              market.symbol === ticker.s
                ? {
                    ...market,
                    lastPrice: ticker.c,
                    priceChangePercent: ticker.P,
                    highPrice: ticker.h,
                    lowPrice: ticker.l,
                    volume: ticker.v,
                  }
                : market
            )
          );
        } catch (error) {
          console.error("Failed to parse combined ticker message", error);
        }
      };

      socket.onerror = () => {
        socket?.close();
      };

      socket.onclose = () => {
        socket = null;

        if (manuallyClosed) {
          return;
        }

        setStatus("reconnecting");

        reconnectTimeout = window.setTimeout(() => {
          if (!manuallyClosed) {
            connect();
          }
        }, reconnectDelay);
      };
    }

    connect();

    return () => {
      manuallyClosed = true;
      clearReconnectTimeout();

      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, [enabled, initialMarkets, reconnectDelay, retryNonce]);

  return {
    markets,
    status: !enabled || !initialMarkets.length ? "disconnected" : status,
    retry,
  };
}