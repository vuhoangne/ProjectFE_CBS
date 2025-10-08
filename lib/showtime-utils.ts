import type { Showtime } from "./mock-data"

// Kiểm tra xem suất chiếu đã qua chưa
export function isShowtimePassed(showtime: Showtime): boolean {
  const now = new Date()
  const showtimeDate = new Date(`${showtime.date} ${showtime.time}`)
  
  // Thêm buffer 30 phút (không cho đặt vé nếu còn ít hơn 30 phút)
  const bufferTime = 30 * 60 * 1000 // 30 minutes in milliseconds
  const cutoffTime = new Date(showtimeDate.getTime() - bufferTime)
  
  return now >= cutoffTime
}

// Lọc các suất chiếu còn có thể đặt
export function getAvailableShowtimes(showtimes: Showtime[]): Showtime[] {
  return showtimes.filter(showtime => !isShowtimePassed(showtime))
}

// Lấy thời gian còn lại để đặt vé (tính bằng phút)
export function getTimeUntilShowtime(showtime: Showtime): number {
  const now = new Date()
  const showtimeDate = new Date(`${showtime.date} ${showtime.time}`)
  const diffMs = showtimeDate.getTime() - now.getTime()
  return Math.floor(diffMs / (1000 * 60)) // Convert to minutes
}

// Format thời gian còn lại
export function formatTimeRemaining(minutes: number): string {
  if (minutes < 0) return "Đã qua"
  if (minutes < 60) return `${minutes} phút nữa`
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) return `${hours} giờ nữa`
  return `${hours}h${remainingMinutes}p nữa`
}