const AVERAGE_READING_SPEED = 200 // Tốc độ đọc trung bình của một người (từ/phút)

export default function readingTime(content) {
  const words = content?.split(" ").length
  const timeInMinutes = words / AVERAGE_READING_SPEED
  return `${Math.round(timeInMinutes)} phút đọc`
}
