export function formatPrice(value: string): string {
  const num = parseFloat(value);
  return `৳${num.toLocaleString("en-US")}`;
}
