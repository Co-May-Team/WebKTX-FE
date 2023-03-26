import { useEffect, useRef, useState } from 'react'

export default function useDebounce(value, delay) {
  // Khởi tạo state debouncedValue bằng giá trị đầu vào value
  const [debouncedValue, setDebouncedValue] = useState(value)

  // Khởi tạo biến timeoutRef để lưu trữ timeout hiện tại
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Xóa timeout hiện tại nếu có để tránh gọi liên tục hàm xử lý
    clearTimeout(timeoutRef.current)

    // Thiết lập timeout mới với thời gian chờ là delay
    timeoutRef.current = setTimeout(() => {
      // Cập nhật giá trị debounced mới bằng giá trị hiện tại của value
      setDebouncedValue(value)
    }, delay)

    // Cleanup function để xóa timeout khi component unmount hoặc giá trị delay thay đổi
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [value, delay])

  // Trả về giá trị debounced mới để sử dụng trong component
  return debouncedValue
}
