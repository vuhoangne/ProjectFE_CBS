"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import { PaymentForm } from "@/components/payment-form"
import { AuthGuard } from "@/components/auth-guard"
import { useBookingStore, useConcessionStore } from "@/lib/store"
import { movies, theaters, showtimes, seatLayout } from "@/lib/mock-data"
import { validateSeatSelection, validateBookingAmount } from "@/lib/validation"
import { useEffect, useState } from "react"
import { DebugBooking } from "@/components/debug-booking"



export default function PaymentPage() {
  return (
    <AuthGuard>
      <PaymentPageContent />
    </AuthGuard>
  )
}

function PaymentPageContent() {
  const { selectedMovie, selectedShowtime, selectedTheater, selectedSeats } = useBookingStore()
  
  // Redirect if no booking data
  if (!selectedMovie || !selectedShowtime || !selectedTheater || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Không có thông tin đặt vé
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Bạn cần chọn phim và ghế trước khi thanh toán.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
                <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Quy trình đặt vé:</h3>
                <ol className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>1. Chọn phim và suất chiếu</li>
                  <li>2. Chọn ghế ngồi</li>
                  <li>3. Chọn bắp nước (tùy chọn)</li>
                  <li>4. Thanh toán</li>
                </ol>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Về trang chủ đặt vé
                </Link>
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>Hoặc bạn có thể:</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/theaters">Xem rạp chiếu</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/#movies">Xem phim đang chiếu</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      <div className="container py-8">
        {/* Back Button - Left aligned */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Thanh toán
            </h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-lg px-4 py-2">
              Bước 3/3: Hoàn tất đặt vé
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <PaymentSummary />
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <PaymentForm />
              {/* Debug component - remove in production */}
              <DebugBooking />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentSummary() {
  const { selectedMovie, selectedShowtime, selectedTheater, selectedSeats, seatAmount, totalAmount } = useBookingStore()
  const { concessionOrders, getTotalConcessionAmount } = useConcessionStore()
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  useEffect(() => {
    if (selectedSeats.length > 0 && selectedShowtime) {
      // Validate seat selection
      const seatValidation = validateSeatSelection(selectedSeats)
      
      // Validate booking amount
      const amountValidation = validateBookingAmount(
        selectedSeats,
        selectedShowtime.price.regular,
        selectedShowtime.price.vip,
        seatLayout.vipRows,
        getTotalConcessionAmount(),
        totalAmount
      )

      const allErrors = [...seatValidation.errors, ...amountValidation.errors]
      setValidationErrors(allErrors)
    }
  }, [selectedSeats, selectedShowtime, totalAmount, getTotalConcessionAmount])

  if (!selectedMovie || !selectedShowtime || !selectedTheater || selectedSeats.length === 0) {
    return (
      <Card className="sticky top-20">
        <CardContent className="p-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Không có thông tin đặt vé. Vui lòng quay lại chọn ghế.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const showDate = new Date(selectedShowtime.date).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  const getSeatDetails = () => {
    return selectedSeats.map((seatId) => {
      const rowIndex = seatId.charCodeAt(0) - 65 // A=0, B=1, etc.
      const isVip = seatLayout.vipRows.includes(rowIndex)
      return {
        seatId,
        isVip,
        price: isVip ? selectedShowtime.price.vip : selectedShowtime.price.regular,
      }
    })
  }

  const seatDetails = getSeatDetails()
  const regularSeats = seatDetails.filter((seat) => !seat.isVip)
  const vipSeats = seatDetails.filter((seat) => seat.isVip)

  return (
    <div className="space-y-4 sticky top-20">
      <Card className="shadow-xl border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg pb-4">
          <CardTitle className="text-primary flex items-center justify-center gap-2 text-lg">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            Thông tin đặt vé
          </CardTitle>
        </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Movie Info */}
        <div className="space-y-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
          <div className="text-center">
            <h3 className="font-bold text-lg text-foreground mb-1">{selectedMovie.title}</h3>
            <p className="text-xs text-muted-foreground">{selectedMovie.genre.join(", ")} • {selectedMovie.duration} phút</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Rạp</span>
              </div>
              <span className="font-medium text-right">{selectedTheater.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Ngày</span>
              </div>
              <span className="font-medium">{showDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Giờ</span>
              </div>
              <span className="font-medium">{selectedShowtime.time}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-primary/20" />

        {/* Seat Details */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            Ghế đã chọn ({selectedSeats.length} ghế)
          </h4>
          <div className="space-y-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg">
            {/* Seat Display */}
            <div className="flex gap-1 flex-wrap justify-center">
              {regularSeats.map((seat) => (
                <div key={seat.seatId} className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {seat.seatId}
                </div>
              ))}
              {vipSeats.map((seat) => (
                <div key={seat.seatId} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {seat.seatId}⭐
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1 text-sm">
              {regularSeats.length > 0 && (
                <div className="flex justify-between">
                  <span>Ghế thường ({regularSeats.length})</span>
                  <span className="font-medium">
                    {(regularSeats.length * selectedShowtime.price.regular).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}
              {vipSeats.length > 0 && (
                <div className="flex justify-between">
                  <span>Ghế VIP ({vipSeats.length})</span>
                  <span className="font-medium">
                    {(vipSeats.length * selectedShowtime.price.vip).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Concession Items */}
        {concessionOrders.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              Bắp nước ({concessionOrders.length} món)
            </h4>
            <div className="space-y-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
              {concessionOrders.map((order) => (
                <div key={order.itemId} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{order.name} x{order.quantity}</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {(order.price * order.quantity).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator className="bg-primary/20" />

        {/* Subtotals */}
        <div className="space-y-2 p-3 bg-muted/20 rounded-lg text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tiền vé:</span>
            <span className="font-medium">{seatAmount.toLocaleString("vi-VN")}đ</span>
          </div>
          {concessionOrders.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tiền bắp nước:</span>
              <span className="font-medium">{getTotalConcessionAmount().toLocaleString("vi-VN")}đ</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="p-4 bg-gradient-to-r from-primary to-primary/80 rounded-lg text-white text-center">
          <p className="text-sm opacity-90 mb-1">Tổng thanh toán</p>
          <p className="text-2xl font-bold">{totalAmount.toLocaleString("vi-VN")}đ</p>
        </div>

        {/* Edit Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/booking/${selectedShowtime.id}`}>
              Sửa ghế
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/booking/${selectedShowtime.id}/concession`}>
              Sửa bắp nước
            </Link>
          </Button>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="font-medium text-green-700 dark:text-green-400">Bảo mật thanh toán</p>
          </div>
          <p className="text-green-600 dark:text-green-300">Thông tin thanh toán của bạn được mã hóa và bảo mật tuyệt đối.</p>
        </div>
      </CardContent>
    </Card>

      {/* Quick Info Card */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50 dark:border-amber-800/50">
        <CardContent className="p-3">
          <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2 text-sm flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-amber-500 rounded-full"></div>
            Lưu ý quan trọng
          </h4>
          <ul className="text-xs text-amber-600 dark:text-amber-300 space-y-1">
            <li>• Có mặt trước giờ chiếu 15 phút</li>
            <li>• Mang theo CMND/CCCD</li>
            <li>• Vé không thể đổi trả</li>
          </ul>
        </CardContent>
      </Card>
  </div>
  )
}
