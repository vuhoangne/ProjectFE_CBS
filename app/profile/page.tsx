"use client"

import Link from "next/link"
import { User, Settings, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { useAuthStore, useBookingManagementStore } from "@/lib/store"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  )
}

function ProfileContent() {
  const { user } = useAuthStore()
  const { getBookingsByUser } = useBookingManagementStore()
  
  const userBookings = user ? getBookingsByUser(user.id) : []
  const completedBookings = userBookings.filter(b => b.status === 'completed').length
  const totalSpent = userBookings
    .filter(b => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      
      <div className="w-full py-8 flex justify-center">
        <div className="w-full max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hồ sơ cá nhân</h1>
            <p className="text-muted-foreground">Quản lý thông tin tài khoản và lịch sử đặt vé</p>
          </div>

          <div className="flex flex-col items-center space-y-8">
            {/* User Info Card */}
            <div className="w-full max-w-3xl">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                  <CardTitle className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    Thông tin cá nhân
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Họ và tên</label>
                      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user?.fullName || 'Chưa cập nhật'}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Tên đăng nhập</label>
                      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user?.username}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user?.email}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                      <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{user?.phone || 'Chưa cập nhật'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t flex justify-center">
                    <Button asChild>
                      <Link href="/profile/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Chỉnh sửa thông tin
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Card */}
            <div className="w-full max-w-2xl">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-center">Thống kê</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{userBookings.length}</div>
                      <div className="text-sm text-muted-foreground">Tổng số vé đã đặt</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{completedBookings}</div>
                      <div className="text-sm text-muted-foreground">Vé đã sử dụng</div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {totalSpent.toLocaleString('vi-VN')}đ
                      </div>
                      <div className="text-sm text-muted-foreground">Tổng chi tiêu</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Bookings */}
          {userBookings.length > 0 && (
            <div className="w-full max-w-3xl mt-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Đặt vé gần đây</span>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/profile/bookings">Xem tất cả</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">Mã đặt vé: {booking.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.totalAmount.toLocaleString('vi-VN')}đ</p>
                          <Badge 
                            variant={
                              booking.status === 'completed' ? 'default' : 
                              booking.status === 'confirmed' ? 'secondary' : 'destructive'
                            }
                          >
                            {booking.status === 'completed' ? 'Đã sử dụng' : 
                             booking.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}