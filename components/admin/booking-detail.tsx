"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin, User, Phone, Mail, CreditCard, Ticket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { movies, showtimes, theaters } from "@/lib/mock-data"
import type { Booking } from "@/lib/store"

interface BookingDetailProps {
  booking: Booking
  onClose: () => void
}

export function BookingDetail({ booking }: BookingDetailProps) {
  const showtime = showtimes.find((s) => s.id === booking.showtimeId)
  const movie = showtime ? movies.find((m) => m.id === showtime.movieId) : null
  const theater = showtime ? theaters.find((t) => t.id === showtime.theaterId) : null

  const getStatusText = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "completed":
        return "Hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  const getStatusBadgeVariant = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "completed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Thẻ tín dụng"
      case "bank_transfer":
        return "Chuyển khoản ngân hàng"
      case "e_wallet":
        return "Ví điện tử"
      default:
        return method
    }
  }

  return (
    <div className="space-y-6">
      {/* Booking Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Mã đặt vé: {booking.id}</h3>
          <p className="text-sm text-muted-foreground">Đặt vào {new Date(booking.createdAt).toLocaleString("vi-VN")}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(booking.status)}>{getStatusText(booking.status)}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Movie Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin phim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {movie && (
              <div className="flex gap-4">
                <div className="relative w-16 h-24 flex-shrink-0">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{movie.title}</h4>
                  <p className="text-sm text-muted-foreground">{movie.titleEn}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {movie.duration} phút
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {movie.rating}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{theater?.name}</p>
                  <p className="text-xs text-muted-foreground">{theater?.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">
                    {showtime?.date &&
                      new Date(showtime.date).toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                  <p className="text-xs text-muted-foreground">Suất chiếu: {showtime?.time}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin khách hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{booking.customerInfo.name}</p>
                <p className="text-sm text-muted-foreground">Khách hàng</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{booking.customerInfo.email}</p>
                <p className="text-xs text-muted-foreground">Email liên hệ</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{booking.customerInfo.phone}</p>
                <p className="text-xs text-muted-foreground">Số điện thoại</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">{getPaymentMethodText(booking.paymentMethod)}</p>
                <p className="text-xs text-muted-foreground">Phương thức thanh toán</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Ticket className="h-4 w-4" />
            Chi tiết đặt vé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Ghế đã chọn ({booking.seats.length} ghế)</h4>
              <div className="flex flex-wrap gap-2">
                {booking.seats.map((seat, index) => (
                  <Badge key={index} variant="outline">
                    {seat}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-medium">Tổng tiền:</span>
              <span className="text-lg font-bold text-primary">{booking.totalAmount.toLocaleString("vi-VN")}đ</span>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>• Giá vé đã bao gồm thuế VAT</p>
              <p>• Vé không thể hoàn trả sau khi đã xác nhận</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
