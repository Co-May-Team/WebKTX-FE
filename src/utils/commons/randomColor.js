export default function randomColor() {
  // tạo một mảng các chuỗi
  const strings = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
  ]

  // lấy ngẫu nhiên một phần tử từ mảng
  return strings[Math.floor(Math.random() * strings.length)]
}
