"use client"

import { useState } from "react"
import { Search, Filter, Eye, Calendar, DollarSign, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBookingManagementStore } from "@/lib/store"
import { movies, showtimes, theaters } from "@/lib/mock-data"
import { BookingDetail } from "@/components/admin/booking-detail"
import type { Booking } from "@/lib/store"

export default function AdminBookingsPage() {
  const { bookings, updateBookingStatus } = useBookingManagementStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerInfo.phone.includes(searchTerm) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const totalBookings = bookings.length
  const totalRevenue = bookings
    .filter((booking) => booking.status !== "cancelled")
    .reduce((sum, booking) => sum + booking.totalAmount, 0)
  const todayBookings = bookings.filter((booking) => {
    const today = new Date().toISOString().split("T")[0]
    return booking.createdAt.startsWith(today)
  }).length

  const getBookingInfo = (booking: Booking) => {
    const showtime = showtimes.find((s) => s.id === booking.showtimeId)
    const movie = showtime ? movies.find((m) => m.id === showtime.movieId) : null
    const theater = showtime ? theaters.find((t) => t.id === showtime.theaterId) : null
    return { showtime, movie, theater }
  }

  const handleStatusChange = (bookingId: string, newStatus: Booking["status"]) => {
    updateBookingStatus(bookingId, newStatus)
  }

  const handleViewDetail = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsDetailDialogOpen(true)
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

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quản lý đặt vé</h1>
        <p className="text-muted-foreground mt-2">Theo dõi và quản lý tất cả đặt vé của khách hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đặt vé</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">Tất cả thời gian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hôm nay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayBookings}</div>
            <p className="text-xs text-muted-foreground">Đặt vé mới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString("vi-VN")}đ</div>
            <p className="text-xs text-muted-foreground">Không bao gồm vé đã hủy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(bookings.map((b) => b.customerInfo.email)).size}</div>
            <p className="text-xs text-muted-foreground">Khách hàng duy nhất</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo tên, email, SĐT, mã đặt vé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">{filteredBookings.length} kết quả</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đặt vé</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Phim</TableHead>
                <TableHead>Rạp & Suất chiếu</TableHead>
                <TableHead>Ghế</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const { showtime, movie, theater } = getBookingInfo(booking)
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="font-medium">{booking.id}</div>
                      <div className="text-xs text-muted-foreground">{booking.paymentMethod}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customerInfo.name}</p>
                        <p className="text-sm text-muted-foreground">{booking.customerInfo.email}</p>
                        <p className="text-xs text-muted-foreground">{booking.customerInfo.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{movie?.title || "Phim không xác định"}</p>
                        <p className="text-xs text-muted-foreground">{movie?.duration} phút</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{theater?.name || "Rạp không xác định"}</p>
                        <p className="text-xs text-muted-foreground">
                          {showtime?.date} • {showtime?.time}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {booking.seats.slice(0, 3).map((seat, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {seat}
                          </Badge>
                        ))}
                        {booking.seats.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{booking.seats.length - 3}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{booking.seats.length} ghế</p>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.totalAmount.toLocaleString("vi-VN")}đ</div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={booking.status}
                        onValueChange={(value) => handleStatusChange(booking.id, value as Booking["status"])}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                          <SelectItem value="completed">Hoàn thành</SelectItem>
                          <SelectItem value="cancelled">Đã hủy</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(booking.createdAt).toLocaleDateString("vi-VN")}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(booking.createdAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetail(booking)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết đặt vé</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <BookingDetail
              booking={selectedBooking}
              onClose={() => {
                setIsDetailDialogOpen(false)
                setSelectedBooking(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
