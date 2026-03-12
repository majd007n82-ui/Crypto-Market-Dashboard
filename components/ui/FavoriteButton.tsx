"use client";

import { useFavorites } from "@/hooks/useFavorites";

type FavoriteButtonProps = {
  symbol: string;
};

export default function FavoriteButton({ symbol }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites(symbol);

  if (!isLoaded) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-500"
      >
        ☆ Favorite
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={[
        "inline-flex items-center rounded-xl border px-3 py-2 text-sm font-medium transition",
        isFavorite
          ? "border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400/15"
          : "border-slate-700 bg-slate-800/70 text-slate-200 hover:border-slate-600 hover:bg-slate-800",
      ].join(" ")}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${symbol} from favorites` : `Add ${symbol} to favorites`}
    >
      <span className="mr-2">{isFavorite ? "★" : "☆"}</span>
      {isFavorite ? "Favorited" : "Favorite"}
    </button>
  );
}