"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  getFavoritesStorageSnapshot,
  parseFavoritesSnapshot,
  subscribeToFavorites,
  toggleStoredFavorite,
} from "@/lib/storage/favorites";

export function useFavorites(symbol?: string) {
  const snapshot = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesStorageSnapshot,
    () => "[]"
  );

  const favorites = useMemo(() => {
    return parseFavoritesSnapshot(snapshot);
  }, [snapshot]);

  const isFavorite = symbol ? favorites.includes(symbol) : false;

  const toggleFavorite = useCallback(() => {
    if (!symbol) return;
    toggleStoredFavorite(symbol);
  }, [symbol]);

  return {
    isFavorite,
    toggleFavorite,
    favorites,
    isLoaded: true,
  };
}