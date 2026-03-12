import type { SocketConnectionStatus } from "@/types/market";

type ConnectionStatusBadgeProps = {
  status: SocketConnectionStatus;
};

const STATUS_STYLES: Record<SocketConnectionStatus, string> = {
  connecting: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  connected: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  disconnected: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  reconnecting: "bg-sky-500/15 text-sky-300 border-sky-500/30",
};

export default function ConnectionStatusBadge({
  status,
}: ConnectionStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize",
        STATUS_STYLES[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}