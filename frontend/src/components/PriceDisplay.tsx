import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: string;
  originalPrice?: string;
  discountPercent?: number;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({ price, originalPrice, discountPercent, size = "md" }: PriceDisplayProps) {
  const hasDiscount = originalPrice && discountPercent && discountPercent > 0;

  const saleClasses = size === "lg"
    ? "text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100"
    : size === "sm"
      ? "text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-100"
      : "text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100";

  const originalClasses = size === "sm"
    ? "text-[11px] line-through text-gray-400 dark:text-zinc-500 tracking-tight"
    : "text-sm line-through text-gray-400 dark:text-zinc-500 tracking-tight";

  const badgeClasses = size === "sm"
    ? "px-1.5 py-[1px] rounded-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold tracking-wide text-[9px] leading-tight"
    : "px-2 py-0.5 rounded-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold tracking-wide text-[10px]";

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <span className={saleClasses}>{formatPrice(price)}</span>
      {hasDiscount && (
        <>
          <span className={originalClasses}>{formatPrice(originalPrice)}</span>
          <span className={badgeClasses}>-{discountPercent}%</span>
        </>
      )}
    </div>
  );
}
