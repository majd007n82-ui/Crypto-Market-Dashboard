type ChangeBadgeProps = {
  value: string | number;
};

export default function ChangeBadge({ value }: ChangeBadgeProps) {
  const numericValue = Number(value);
  const isPositive = numericValue >= 0;

  const formatted = `${isPositive ? "+" : ""}${numericValue.toFixed(2)}%`;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        isPositive
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-red-500/15 text-red-400",
      ].join(" ")}
    >
      {formatted}
    </span>
  );
}