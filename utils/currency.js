export function formatCurrency(value) {
  if (typeof value === "string") {
    return value;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
