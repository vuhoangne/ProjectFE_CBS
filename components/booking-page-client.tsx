"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { SeatMap } from "@/components/seat-map"
import { SeatLegend } from "@/components/seat-legend"
import { BookingSummary } from "@/components/booking-summary"
import { seatLayout } from "@/lib/mock-data"
import { useBookingStore } from "@/lib/store"
import { useEffect } from "react"
import type { Movie, Theater, Showtime } from "@/lib/mock-data"

interface BookingPageClientProps {
  movie: Movie
  theater: Theater
  showtime: Showtime
  showtimeId: number
}

export function BookingPageClient({ movie, theater, showtime, showtimeId }: BookingPageClientProps) {
  const { setSelectedMovie, setSelectedShowtime, setSelectedTheater } = useBookingStore()

  // Lưu thông tin vào store khi component mount
  useEffect(() => {
    setSelectedMovie(movie)
    setSelectedShowtime(showtime)
    setSelectedTheater(theater)
  }, [movie, showtime, theater, setSelectedMovie, setSelectedShowtime, setSelectedTheater])

  const showDate = new Date(showtime.date).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-6">
        {/* Back Button - Left aligned */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/movie/${movie.id}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
          <Badge variant="secondary" className="self-start lg:self-center">
            Bước 1/3: Chọn ghế
          </Badge>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Seat Selection */}
          <div className="xl:col-span-3 space-y-8">
            <SeatMap
              occupiedSeats={seatLayout.occupied}
              regularPrice={showtime.price.regular}
              vipPrice={showtime.price.vip}
            />

            {/* Legend */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Chú thích</h3>
              <SeatLegend />
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Ghế thường: {showtime.price.regular.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-muted-foreground">Ghế VIP: {showtime.price.vip.toLocaleString("vi-VN")}đ</p>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="xl:col-span-1">
            <BookingSummary
              regularPrice={showtime.price.regular}
              vipPrice={showtime.price.vip}
              movieTitle={movie.title}
              theaterName={theater.name}
              showtime={showtime.time}
              showDate={showDate}
              currentStep="seat"
              showtimeId={showtimeId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}