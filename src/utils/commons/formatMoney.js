export default function formatMoney(value) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
  return formatter.format(value).replace(/₫/gi, "")
}
