"use client"

import { useState } from "react"
import { Search, Filter, Eye, UserPlus, Edit, Trash2, Users, Crown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useBookingStore } from "@/lib/store"

// Mock users data
const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@cyberlearn.vn",
    fullName: "Quản trị viên",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    lastLogin: "2024-12-09T14:30:00Z",
    avatar: null,
  },
  {
    id: 2,
    username: "user1",
    email: "user1@example.com",
    fullName: "Nguyễn Văn A",
    role: "user",
    status: "active",
    createdAt: "2024-02-20T09:15:00Z",
    lastLogin: "2024-12-08T16:45:00Z",
    avatar: null,
  },
  {
    id: 3,
    username: "user2",
    email: "user2@example.com",
    fullName: "Trần Thị B",
    role: "user",
    status: "active",
    createdAt: "2024-03-10T11:30:00Z",
    lastLogin: "2024-12-07T20:15:00Z",
    avatar: null,
  },
  {
    id: 4,
    username: "user3",
    email: "user3@example.com",
    fullName: "Lê Văn C",
    role: "user",
    status: "inactive",
    createdAt: "2024-04-05T14:20:00Z",
    lastLogin: "2024-11-15T10:30:00Z",
    avatar: null,
  },
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { bookings } = useBookingStore()

  // Filter users
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Calculate stats
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter((user) => user.status === "active").length
  const adminUsers = mockUsers.filter((user) => user.role === "admin").length

  // Get user booking count
  const getUserBookingCount = (userId: number) => {
    // In real app, you'd match by user ID
    return Math.floor(Math.random() * 10) // Mock data
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "moderator":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "banned":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên"
      case "moderator":
        return "Điều hành viên"
      case "user":
        return "Người dùng"
      default:
        return role
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Hoạt động"
      case "inactive":
        return "Không hoạt động"
      case "banned":
        return "Bị cấm"
      default:
        return status
    }
  }

  const handleEditUser = (userId: number) => {
    console.log("Edit user:", userId)
    alert("Chức năng chỉnh sửa người dùng sẽ được triển khai với API thực tế")
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      console.log("Delete user:", userId)
      alert("Chức năng xóa người dùng sẽ được triển khai với API thực tế")
    }
  }

  const handleChangeRole = (userId: number, newRole: string) => {
    console.log("Change role:", userId, newRole)
    alert(`Thay đổi quyền thành ${getRoleText(newRole)} sẽ được triển khai với API thực tế`)
  }

  const handleChangeStatus = (userId: number, newStatus: string) => {
    console.log("Change status:", userId, newStatus)
    alert(`Thay đổi trạng thái thành ${getStatusText(newStatus)} sẽ được triển khai với API thực tế`)
  }

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
          <p className="text-muted-foreground mt-2">Quản lý tài khoản và quyền hạn người dùng</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Tất cả tài khoản</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Tài khoản hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">Tài khoản admin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đăng ký mới</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter((user) => {
                const today = new Date()
                const userDate = new Date(user.createdAt)
                return userDate.toDateString() === today.toDateString()
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Hôm nay</p>
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
                placeholder="Tìm kiếm theo tên, email, username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Lọc theo quyền" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả quyền</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="moderator">Điều hành viên</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
                <SelectItem value="banned">Bị cấm</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">{filteredUsers.length} kết quả</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Quyền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đặt vé</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Đăng nhập cuối</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                          {user.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleChangeRole(user.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                        <SelectItem value="moderator">Điều hành viên</SelectItem>
                        <SelectItem value="user">Người dùng</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onValueChange={(value) => handleChangeStatus(user.id, value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
                        <SelectItem value="banned">Bị cấm</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getUserBookingCount(user.id)} vé</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(user.lastLogin).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(user.lastLogin).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditUser(user.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-destructive hover:text-destructive"
                        disabled={user.role === "admin"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}