"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, MapPin, Building, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { theaters, showtimes } from "@/lib/mock-data"

interface TheaterFormData {
  name: string
  location: string
  address: string
  phone: string
  email: string
  totalSeats: number
  description: string
  logo: string
}

export default function AdminTheatersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTheater, setSelectedTheater] = useState<(typeof theaters)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState<TheaterFormData>({
    name: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    totalSeats: 0,
    description: "",
    logo: "",
  })

  // Filter theaters based on search term
  const filteredTheaters = theaters.filter(
    (theater) =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get showtime count for each theater
  const getTheaterShowtimeCount = (theaterId: number) => {
    return showtimes.filter((showtime) => showtime.theaterId === theaterId).length
  }

  const handleAddTheater = () => {
    setFormData({
      name: "",
      location: "",
      address: "",
      phone: "",
      email: "",
      totalSeats: 0,
      description: "",
      logo: "",
    })
    setIsAddDialogOpen(true)
  }

  const handleEditTheater = (theater: (typeof theaters)[0]) => {
    setSelectedTheater(theater)
    setFormData({
      name: theater.name,
      location: theater.location,
      address: theater.location, // Using location as address for now
      phone: "0123-456-789", // Mock data
      email: `${theater.name.toLowerCase().replace(/\s+/g, "")}@cinema.vn`,
      totalSeats: 200, // Mock data
      description: `Rạp chiếu phim ${theater.name} với chất lượng âm thanh và hình ảnh tốt nhất.`,
      logo: theater.logo || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleDeleteTheater = (theaterId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa rạp chiếu phim này?")) {
      console.log("Deleting theater:", theaterId)
      alert("Chức năng xóa rạp sẽ được triển khai với API thực tế")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving theater:", formData)
    alert(selectedTheater ? "Cập nhật rạp thành công!" : "Thêm rạp mới thành công!")
    setIsAddDialogOpen(false)
    setIsEditDialogOpen(false)
    setSelectedTheater(null)
  }

  const TheaterForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên rạp</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Khu vực</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Địa chỉ chi tiết</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          rows={2}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalSeats">Tổng số ghế</Label>
          <Input
            id="totalSeats"
            type="number"
            min="50"
            max="500"
            value={formData.totalSeats}
            onChange={(e) => setFormData(prev => ({ ...prev, totalSeats: parseInt(e.target.value) || 0 }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">URL Logo</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
            setSelectedTheater(null)
          }}
        >
          Hủy
        </Button>
        <Button type="submit">
          {selectedTheater ? "Cập nhật" : "Thêm rạp"}
        </Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý rạp chiếu phim</h1>
          <p className="text-muted-foreground mt-2">Quản lý thông tin các rạp chiếu phim trong hệ thống</p>
        </div>
        <Button onClick={handleAddTheater}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm rạp mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số rạp</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{theaters.length}</div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng suất chiếu</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showtimes.length}</div>
            <p className="text-xs text-muted-foreground">Trên tất cả rạp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rạp hoạt động nhiều nhất</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              {
                theaters.reduce((prev, current) =>
                  getTheaterShowtimeCount(current.id) > getTheaterShowtimeCount(prev.id) ? current : prev,
                ).name
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {getTheaterShowtimeCount(
                theaters.reduce((prev, current) =>
                  getTheaterShowtimeCount(current.id) > getTheaterShowtimeCount(prev.id) ? current : prev,
                ).id,
              )}{" "}
              suất chiếu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm rạp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">{filteredTheaters.length} rạp</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Theaters Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên rạp</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Suất chiếu</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTheaters.map((theater) => (
                <TableRow key={theater.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{theater.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {theater.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{theater.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>0123-456-789</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{theater.name.toLowerCase().replace(/\s+/g, "")}@cinema.vn</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getTheaterShowtimeCount(theater.id)} suất
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">Hoạt động</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditTheater(theater)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTheater(theater.id)}
                        className="text-destructive hover:text-destructive"
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

      {/* Add Theater Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Thêm rạp chiếu phim mới</DialogTitle>
          </DialogHeader>
          <TheaterForm />
        </DialogContent>
      </Dialog>

      {/* Edit Theater Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin rạp</DialogTitle>
          </DialogHeader>
          <TheaterForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}