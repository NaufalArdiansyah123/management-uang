export default function formatCurrency(value: number | string | null | undefined) {
  const n = Number(value ?? 0)
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}
