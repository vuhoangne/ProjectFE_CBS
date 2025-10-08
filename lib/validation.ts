// Validation functions cho hệ thống đặt vé

export interface BookingValidation {
  isValid: boolean
  errors: string[]
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
}

// Validate thông tin khách hàng
export function validateCustomerInfo(customerInfo: CustomerInfo): BookingValidation {
  const errors: string[] = []

  // Validate tên
  if (!customerInfo.name || customerInfo.name.trim().length < 2) {
    errors.push("Tên phải có ít nhất 2 ký tự")
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!customerInfo.email || !emailRegex.test(customerInfo.email)) {
    errors.push("Email không hợp lệ")
  }

  // Validate số điện thoại Việt Nam
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/
  if (!customerInfo.phone || !phoneRegex.test(customerInfo.phone)) {
    errors.push("Số điện thoại không hợp lệ (phải là số điện thoại Việt Nam)")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate ghế đã chọn
export function validateSeatSelection(selectedSeats: string[]): BookingValidation {
  const errors: string[] = []

  if (selectedSeats.length === 0) {
    errors.push("Vui lòng chọn ít nhất 1 ghế")
  }

  if (selectedSeats.length > 8) {
    errors.push("Tối đa 8 ghế mỗi lần đặt")
  }

  // Validate format ghế (A1, B2, etc.)
  const seatRegex = /^[A-Z]\d+$/
  for (const seat of selectedSeats) {
    if (!seatRegex.test(seat)) {
      errors.push(`Ghế ${seat} không hợp lệ`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate tổng tiền
export function validateBookingAmount(
  selectedSeats: string[],
  regularPrice: number,
  vipPrice: number,
  vipRows: number[],
  concessionAmount: number,
  expectedTotal: number
): BookingValidation {
  const errors: string[] = []

  // Tính toán lại tiền ghế
  const calculatedSeatAmount = selectedSeats.reduce((sum, seat) => {
    const row = seat.charAt(0)
    const rowIndex = row.charCodeAt(0) - 65 // A=0, B=1, etc.
    const isVip = vipRows.includes(rowIndex)
    return sum + (isVip ? vipPrice : regularPrice)
  }, 0)

  const calculatedTotal = calculatedSeatAmount + concessionAmount

  if (Math.abs(calculatedTotal - expectedTotal) > 0.01) {
    errors.push(`Tổng tiền không chính xác. Tính toán: ${calculatedTotal.toLocaleString('vi-VN')}đ, Nhận được: ${expectedTotal.toLocaleString('vi-VN')}đ`)
  }

  if (regularPrice <= 0 || vipPrice <= 0) {
    errors.push("Giá vé không hợp lệ")
  }

  if (concessionAmount < 0) {
    errors.push("Tiền bắp nước không hợp lệ")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate suất chiếu
export function validateShowtime(showtimeId: number, showtimes: any[]): BookingValidation {
  const errors: string[] = []

  const showtime = showtimes.find(s => s.id === showtimeId)
  if (!showtime) {
    errors.push("Suất chiếu không tồn tại")
    return { isValid: false, errors }
  }

  // Kiểm tra thời gian chiếu
  const showtimeDate = new Date(`${showtime.date} ${showtime.time}`)
  const now = new Date()
  
  if (showtimeDate < now) {
    errors.push("Suất chiếu đã qua")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate ghế có bị trùng không
export function validateSeatAvailability(selectedSeats: string[], occupiedSeats: string[]): BookingValidation {
  const errors: string[] = []

  for (const seat of selectedSeats) {
    if (occupiedSeats.includes(seat)) {
      errors.push(`Ghế ${seat} đã có người đặt`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate toàn bộ booking
export function validateCompleteBooking(bookingData: {
  customerInfo: CustomerInfo
  selectedSeats: string[]
  showtimeId: number
  regularPrice: number
  vipPrice: number
  vipRows: number[]
  concessionAmount: number
  totalAmount: number
  occupiedSeats: string[]
  showtimes: any[]
}): BookingValidation {
  const allErrors: string[] = []

  // Validate từng phần
  const customerValidation = validateCustomerInfo(bookingData.customerInfo)
  const seatValidation = validateSeatSelection(bookingData.selectedSeats)
  const amountValidation = validateBookingAmount(
    bookingData.selectedSeats,
    bookingData.regularPrice,
    bookingData.vipPrice,
    bookingData.vipRows,
    bookingData.concessionAmount,
    bookingData.totalAmount
  )
  const showtimeValidation = validateShowtime(bookingData.showtimeId, bookingData.showtimes)
  const availabilityValidation = validateSeatAvailability(bookingData.selectedSeats, bookingData.occupiedSeats)

  // Gộp tất cả lỗi
  allErrors.push(...customerValidation.errors)
  allErrors.push(...seatValidation.errors)
  allErrors.push(...amountValidation.errors)
  allErrors.push(...showtimeValidation.errors)
  allErrors.push(...availabilityValidation.errors)

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  }
}