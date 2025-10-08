"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { movies, showtimes } from "@/lib/mock-data"
import { MovieForm } from "@/components/admin/movie-form"
import { useBookingManagementStore } from "@/lib/store"

export default function AdminMoviesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<(typeof movies)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { bookings } = useBookingManagementStore()

  // Filter movies based on search term
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get booking count for each movie
  const getMovieBookingCount = (movieId: number) => {
    return bookings.filter((booking) => {
      const showtime = showtimes.find((s) => s.id === booking.showtimeId)
      return showtime?.movieId === movieId
    }).length
  }

  // Get showtime count for each movie
  const getMovieShowtimeCount = (movieId: number) => {
    return showtimes.filter((showtime) => showtime.movieId === movieId).length
  }

  const handleEditMovie = (movie: (typeof movies)[0]) => {
    setSelectedMovie(movie)
    setIsEditDialogOpen(true)
  }

  const handleDeleteMovie = (movieId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      // In a real app, this would call an API
      console.log("Deleting movie:", movieId)
      alert("Chức năng xóa phim sẽ được triển khai với API thực tế")
    }
  }

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý phim</h1>
          <p className="text-muted-foreground mt-2">Quản lý danh sách phim đang chiếu tại rạp</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm phim mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm phim mới</DialogTitle>
            </DialogHeader>
            <MovieForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số phim</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{movies.length}</div>
            <p className="text-xs text-muted-foreground">Đang chiếu tại rạp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng suất chiếu</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showtimes.length}</div>
            <p className="text-xs text-muted-foreground">Trên tất cả rạp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phim phổ biến nhất</CardTitle>
            <Badge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">
              {
                movies.reduce((prev, current) =>
                  getMovieBookingCount(current.id) > getMovieBookingCount(prev.id) ? current : prev,
                ).title
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {getMovieBookingCount(
                movies.reduce((prev, current) =>
                  getMovieBookingCount(current.id) > getMovieBookingCount(prev.id) ? current : prev,
                ).id,
              )}{" "}
              lượt đặt vé
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
                placeholder="Tìm kiếm phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">{filteredMovies.length} phim</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Movies Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Poster</TableHead>
                <TableHead>Tên phim</TableHead>
                <TableHead>Thể loại</TableHead>
                <TableHead>Thời lượng</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Suất chiếu</TableHead>
                <TableHead>Đặt vé</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <div className="relative w-12 h-16">
                      <Image
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">{movie.titleEn}</p>
                      <p className="text-xs text-muted-foreground">Đạo diễn: {movie.director}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {movie.genre.slice(0, 2).map((genre, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                      {movie.genre.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{movie.genre.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{movie.duration} phút</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{movie.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getMovieShowtimeCount(movie.id)} suất</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getMovieBookingCount(movie.id) > 0 ? "default" : "outline"}>
                      {getMovieBookingCount(movie.id)} vé
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditMovie(movie)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMovie(movie.id)}
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

      {/* Edit Movie Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa phim</DialogTitle>
          </DialogHeader>
          {selectedMovie && (
            <MovieForm
              movie={selectedMovie}
              onClose={() => {
                setIsEditDialogOpen(false)
                setSelectedMovie(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
