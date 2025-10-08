"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Film, Ticket, Users, DollarSign, TrendingUp, Calendar, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data for demo - không dùng store để tránh lỗi
  const stats = {
    totalMovies: 12,
    totalBookings: 156,
    totalRevenue: 45600000,
    totalShowtimes: 48
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Tổng quan hệ thống quản lý rạp chiếu phim</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số phim</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMovies}</div>
            <p className="text-xs text-muted-foreground">Đang chiếu tại rạp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đặt vé</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12 hôm nay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString("vi-VN")}đ</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Tổng doanh thu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suất chiếu</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalShowtimes}</div>
            <p className="text-xs text-muted-foreground">Trên 3 rạp</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/movies">
                <Film className="h-4 w-4 mr-2" />
                Quản lý phim
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/bookings">
                <Ticket className="h-4 w-4 mr-2" />
                Xem đặt vé
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-2" />
                Quản lý người dùng
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/contact">
                <Users className="h-4 w-4 mr-2" />
                Thông tin liên hệ
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Phim phổ biến
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Avengers: Endgame</p>
                  <p className="text-xs text-muted-foreground">45 lượt đặt vé</p>
                </div>
                <Badge>#1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Spider-Man: No Way Home</p>
                  <p className="text-xs text-muted-foreground">38 lượt đặt vé</p>
                </div>
                <Badge variant="secondary">#2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">The Batman</p>
                  <p className="text-xs text-muted-foreground">32 lượt đặt vé</p>
                </div>
                <Badge variant="secondary">#3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Đặt vé mới</p>
                  <p className="text-xs text-muted-foreground">Avengers: Endgame - 2 ghế</p>
                </div>
                <Badge variant="outline">5 phút trước</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Người dùng mới</p>
                  <p className="text-xs text-muted-foreground">Nguyễn Văn A đã đăng ký</p>
                </div>
                <Badge variant="outline">10 phút trước</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Cập nhật phim</p>
                  <p className="text-xs text-muted-foreground">Thêm suất chiếu mới</p>
                </div>
                <Badge variant="outline">1 giờ trước</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
