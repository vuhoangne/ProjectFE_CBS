"use client"

import { useEffect, useState } from "react"
import { Check, MapPin, Calendar, Clock, Users, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useBookingManagementStore } from "@/lib/store"
import { movies, theaters, showtimes } from "@/lib/mock-data"

interface BookingConfirmationProps {
  bookingId?: string
}

export function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const { bookings } = useBookingManagementStore()
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    if (bookingId) {
      const foundBooking = bookings.find(b => b.id === bookingId)
      if (foundBooking) {
        const showtime = showtimes.find(s => s.id === foundBooking.showtimeId)
        const movie = showtime ? movies.find(m => m.id === showtime.movieId) : null
        const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null
        
        setBooking({
          ...foundBooking,
          showtime,
          movie,
          theater
        })
      }
    } else {
      // Get latest booking
      const latestBooking = bookings[bookings.length - 1]
      if (latestBooking) {
        const showtime = showtimes.find(s => s.id === latestBooking.showtimeId)
        const movie = showtime ? movies.find(m => m.id === showtime.movieId) : null
        const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null
        
        setBooking({
          ...latestBooking,
          showtime,
          movie,
          theater
        })
      }
    }
  }, [bookingId, bookings])

  if (!booking) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Không tìm thấy thông tin đặt vé</p>
        </CardContent>
      </Card>
    )
  }

  const showDate = booking.showtime ? new Date(booking.showtime.date).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }) : ""

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-700 dark:text-green-400">
                Đặt vé thành công!
              </h2>
              <p className="text-green-600 dark:text-green-300">
                Mã đặt vé: <span className="font-mono font-bold">{booking.id}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            Chi tiết đặt vé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Movie Info */}
          {booking.movie && booking.theater && booking.showtime && (
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg">{booking.movie.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{booking.theater.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{showDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{booking.showtime.time}</span>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Seats */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Ghế đã đặt
            </h4>
            <div className="flex gap-2 flex-wrap">
              {booking.seats.map((seat: string) => (
                <Badge key={seat} variant="secondary" className="bg-primary/10 text-primary">
                  {seat}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Tiền vé: <span className="font-medium">{booking.seatAmount.toLocaleString('vi-VN')}đ</span>
            </p>
          </div>

          {/* Concession Items */}
          {booking.concessionOrders && booking.concessionOrders.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  Bắp nước
                </h4>
                <div className="space-y-2">
                  {booking.concessionOrders.map((order: any) => (
                    <div key={order.itemId} className="flex justify-between text-sm">
                      <span>{order.name} x{order.quantity}</span>
                      <span className="font-medium">{(order.price * order.quantity).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Tổng bắp nước: <span className="font-medium">{booking.concessionAmount.toLocaleString('vi-VN')}đ</span>
                </p>
              </div>
            </>
          )}

          <Separator />

          {/* Customer Info */}
          <div className="space-y-3">
            <h4 className="font-medium">Thông tin khách hàng</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Họ tên: </span>
                <span className="font-medium">{booking.customerInfo.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Email: </span>
                <span className="font-medium">{booking.customerInfo.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Điện thoại: </span>
                <span className="font-medium">{booking.customerInfo.phone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Thanh toán: </span>
                <span className="font-medium">
                  {booking.paymentMethod === 'card' && 'Thẻ tín dụng'}
                  {booking.paymentMethod === 'momo' && 'Ví MoMo'}
                  {booking.paymentMethod === 'banking' && 'Internet Banking'}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
            <span className="font-semibold text-lg">Tổng thanh toán</span>
            <span className="font-bold text-xl text-primary">
              {booking.totalAmount.toLocaleString('vi-VN')}đ
            </span>
          </div>

          {/* Booking Time */}
          <div className="text-center text-sm text-muted-foreground">
            Đặt vé lúc: {new Date(booking.createdAt).toLocaleString('vi-VN')}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Lưu ý quan trọng:</h4>
          <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
            <li>• Vui lòng có mặt tại rạp trước giờ chiếu 15 phút</li>
            <li>• Mang theo mã đặt vé và giấy tờ tùy thân</li>
            <li>• Liên hệ hotline nếu cần hỗ trợ: 1900 6017</li>
            <li>• Vé đã mua không thể đổi trả</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}