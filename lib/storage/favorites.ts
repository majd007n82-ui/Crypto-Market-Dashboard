const FAVORITES_STORAGE_KEY = "crypto-dashboard-favorites";

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function getFavoritesStorageSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]";
}

export function parseFavoritesSnapshot(snapshot: string): string[] {
  try {
    const parsed = JSON.parse(snapshot);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item) => typeof item === "string");
  } catch {
    return [];
  }
}

export function saveStoredFavorites(favorites: string[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  emitChange();
}

export function toggleStoredFavorite(symbol: string): string[] {
  const current = parseFavoritesSnapshot(getFavoritesStorageSnapshot());

  const nextFavorites = current.includes(symbol)
    ? current.filter((item) => item !== symbol)
    : [...current, symbol];

  saveStoredFavorites(nextFavorites);
  return nextFavorites;
}

export function subscribeToFavorites(listener: () => void) {
  listeners.add(listener);

  function handleStorage(event: StorageEvent) {
    if (event.key === FAVORITES_STORAGE_KEY) {
      listener();
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}