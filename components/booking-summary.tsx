"use client"

import Link from "next/link"
import { ShoppingCart, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBookingStore, useAuthStore, useConcessionStore } from "@/lib/store"
import { seatLayout } from "@/lib/mock-data"
import { useEffect } from "react"

interface BookingSummaryProps {
  regularPrice: number
  vipPrice: number
  movieTitle: string
  theaterName: string
  showtime: string
  showDate: string
  currentStep?: 'seat' | 'concession' | 'payment'
  showtimeId?: number
}

export function BookingSummary({
  regularPrice,
  vipPrice,
  movieTitle,
  theaterName,
  showtime,
  showDate,
  currentStep = 'seat',
  showtimeId,
}: BookingSummaryProps) {
  const { selectedSeats, seatAmount, totalAmount, calculateSeatTotal, calculateGrandTotal } = useBookingStore()
  const { concessionOrders, getTotalConcessionAmount } = useConcessionStore()
  const { isAuthenticated } = useAuthStore()

  // Tính toán lại tổng tiền khi có thay đổi
  useEffect(() => {
    calculateSeatTotal(regularPrice, vipPrice, seatLayout.vipRows)
  }, [selectedSeats, regularPrice, vipPrice, calculateSeatTotal])

  useEffect(() => {
    const concessionAmount = getTotalConcessionAmount()
    calculateGrandTotal(concessionAmount)
  }, [concessionOrders, seatAmount, calculateGrandTotal, getTotalConcessionAmount])

  const getSeatDetails = () => {
    return selectedSeats.map((seatId) => {
      const rowIndex = seatId.charCodeAt(0) - 65 // A=0, B=1, etc.
      const isVip = seatLayout.vipRows.includes(rowIndex)
      return {
        seatId,
        isVip,
        price: isVip ? vipPrice : regularPrice,
      }
    })
  }

  const seatDetails = getSeatDetails()
  const regularSeats = seatDetails.filter((seat) => !seat.isVip)
  const vipSeats = seatDetails.filter((seat) => seat.isVip)

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <ShoppingCart className="h-5 w-5" />
          Thông tin đặt vé
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Movie Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-foreground line-clamp-2">{movieTitle}</h4>
          <p className="text-sm text-muted-foreground">{theaterName}</p>
          <p className="text-sm text-muted-foreground">
            {showDate} - {showtime}
          </p>
        </div>

        <Separator />

        {/* Selected Seats */}
        {selectedSeats.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Ghế đã chọn</h4>

            {/* Regular Seats */}
            {regularSeats.length > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ghế thường ({regularSeats.length} ghế)</span>
                  <span className="font-medium">{(regularSeats.length * regularPrice).toLocaleString("vi-VN")}đ</span>
                </div>
                <p className="text-xs text-muted-foreground">{regularSeats.map((seat) => seat.seatId).join(", ")}</p>
              </div>
            )}

            {/* VIP Seats */}
            {vipSeats.length > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ghế VIP ({vipSeats.length} ghế)</span>
                  <span className="font-medium">{(vipSeats.length * vipPrice).toLocaleString("vi-VN")}đ</span>
                </div>
                <p className="text-xs text-muted-foreground">{vipSeats.map((seat) => seat.seatId).join(", ")}</p>
              </div>
            )}

            <Separator />

            {/* Concession Items - Chỉ hiển thị từ bước concession trở đi */}
            {(currentStep === 'concession' || currentStep === 'payment') && concessionOrders.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Bắp nước</h5>
                {concessionOrders.map((order) => (
                  <div key={order.itemId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{order.name} x{order.quantity}</span>
                    <span className="font-medium">{(order.price * order.quantity).toLocaleString("vi-VN")}đ</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-medium">
                  <span>Tổng bắp nước:</span>
                  <span>{getTotalConcessionAmount().toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            )}

            <Separator />

            {/* Subtotals - Chỉ hiển thị khi có nhiều hơn 1 loại phí */}
            {((currentStep === 'concession' || currentStep === 'payment') && concessionOrders.length > 0) && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiền vé:</span>
                  <span className="font-medium">{seatAmount.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiền bắp nước:</span>
                  <span className="font-medium">{getTotalConcessionAmount().toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            )}

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">
                {currentStep === 'seat' ? 'Tổng tiền vé' : 'Tổng thanh toán'}
              </span>
              <span className="font-bold text-lg text-primary">
                {currentStep === 'seat' ? seatAmount.toLocaleString("vi-VN") : totalAmount.toLocaleString("vi-VN")}đ
              </span>
            </div>

            {/* Continue Button */}
            {currentStep === 'seat' && (
              <div className="space-y-2">
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/booking/${showtimeId}/concession`} className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Tiếp tục chọn bắp nước
                  </Link>
                </Button>
                {isAuthenticated ? (
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/payment" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Bỏ qua, thanh toán ngay
                    </Link>
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link href="/login" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Đăng nhập để thanh toán
                    </Link>
                  </Button>
                )}
              </div>
            )}
            
            {currentStep === 'concession' && (
              isAuthenticated ? (
                <Button size="lg" className="w-full" asChild>
                  <Link href="/payment" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Tiếp tục thanh toán
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="w-full" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Đăng nhập để thanh toán
                  </Link>
                </Button>
              )
            )}

            {currentStep === 'payment' && (
              <div className="text-center text-sm text-muted-foreground">
                Xem lại thông tin đặt vé
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">Vui lòng chọn ghế để tiếp tục</p>
          </div>
        )}

        {/* Seat Limit Warning */}
        {selectedSeats.length >= 8 && (
          <div className="text-center p-3 bg-secondary/20 rounded-lg">
            <p className="text-xs text-muted-foreground">Tối đa 8 ghế mỗi lần đặt</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
