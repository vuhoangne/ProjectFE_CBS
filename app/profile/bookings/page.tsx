"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock, Users, ShoppingCart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { useAuthStore, useBookingManagementStore } from "@/lib/store"
import { movies, theaters, showtimes } from "@/lib/mock-data"
import { useState } from "react"

export default function BookingsPage() {
  return (
    <AuthGuard>
      <BookingsContent />
    </AuthGuard>
  )
}

function BookingsContent() {
  const { user } = useAuthStore()
  const { bookings } = useBookingManagementStore()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  const userBookings = user ? bookings.filter(b => b.userId === user.id) : []
  
  const filteredBookings = statusFilter === 'all' 
    ? userBookings 
    : userBookings.filter(b => b.status === statusFilter)

  const getBookingDetails = (booking: any) => {
    const showtime = showtimes.find(s => s.id === booking.showtimeId)
    const movie = showtime ? movies.find(m => m.id === showtime.movieId) : null
    const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null
    
    return { showtime, movie, theater }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Đã sử dụng'
      case 'confirmed': return 'Đã xác nhận'
      case 'cancelled': return 'Đã hủy'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/profile" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại hồ sơ
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">Lịch sử đặt vé</h1>
            <p className="text-muted-foreground">Xem tất cả các vé đã đặt và trạng thái của chúng</p>
          </div>

          {/* Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Lọc theo trạng thái:</span>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                  >
                    Tất cả ({userBookings.length})
                  </Button>
                  <Button
                    variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('confirmed')}
                  >
                    Đã xác nhận ({userBookings.filter(b => b.status === 'confirmed').length})
                  </Button>
                  <Button
                    variant={statusFilter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('completed')}
                  >
                    Đã sử dụng ({userBookings.filter(b => b.status === 'completed').length})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => {
                const { showtime, movie, theater } = getBookingDetails(booking)
                
                if (!showtime || !movie || !theater) return null

                const showDate = new Date(showtime.date).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })

                return (
                  <Card key={booking.id} className="shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{movie.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{theater.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{showDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{showtime.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            Mã: {booking.id}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Seats */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="font-medium">Ghế đã đặt ({booking.seats.length} ghế)</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {booking.seats.map((seat) => (
                            <Badge key={seat} variant="secondary" className="bg-primary/10 text-primary">
                              {seat}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Concession */}
                      {booking.concessionOrders && booking.concessionOrders.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <ShoppingCart className="h-4 w-4 text-primary" />
                            <span className="font-medium">Bắp nước ({booking.concessionOrders.length} món)</span>
                          </div>
                          <div className="space-y-1">
                            {booking.concessionOrders.map((order) => (
                              <div key={order.itemId} className="flex justify-between text-sm">
                                <span>{order.name} x{order.quantity}</span>
                                <span>{(order.price * order.quantity).toLocaleString('vi-VN')}đ</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Separator />

                      {/* Pricing */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tiền vé:</span>
                          <span>{booking.seatAmount.toLocaleString('vi-VN')}đ</span>
                        </div>
                        {booking.concessionAmount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Tiền bắp nước:</span>
                            <span>{booking.concessionAmount.toLocaleString('vi-VN')}đ</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-lg">
                          <span>Tổng cộng:</span>
                          <span className="text-primary">{booking.totalAmount.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>

                      {/* Booking Info */}
                      <div className="pt-2 border-t text-xs text-muted-foreground">
                        <p>Đặt vé lúc: {new Date(booking.createdAt).toLocaleString('vi-VN')}</p>
                        <p>Thanh toán: {
                          booking.paymentMethod === 'card' ? 'Thẻ tín dụng' :
                          booking.paymentMethod === 'momo' ? 'Ví MoMo' :
                          booking.paymentMethod === 'banking' ? 'Internet Banking' :
                          booking.paymentMethod
                        }</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {statusFilter === 'all' ? 'Chưa có vé nào' : `Không có vé ${getStatusText(statusFilter).toLowerCase()}`}
                    </h3>
                    <p className="text-muted-foreground">
                      {statusFilter === 'all' 
                        ? 'Bạn chưa đặt vé nào. Hãy đặt vé để xem phim yêu thích!'
                        : 'Thử thay đổi bộ lọc để xem các vé khác.'
                      }
                    </p>
                  </div>
                  {statusFilter === 'all' && (
                    <Button asChild>
                      <Link href="/">Đặt vé ngay</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}