"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ConcessionSelection } from "@/components/concession-selection"
import { BookingSummary } from "@/components/booking-summary"
import { useBookingStore } from "@/lib/store"
import { useEffect } from "react"
import type { Movie, Theater, Showtime } from "@/lib/mock-data"

interface ConcessionPageClientProps {
  movie: Movie
  theater: Theater
  showtime: Showtime
  showtimeId: number
}

export function ConcessionPageClient({ movie, theater, showtime, showtimeId }: ConcessionPageClientProps) {
  const { setSelectedMovie, setSelectedShowtime, setSelectedTheater, selectedSeats } = useBookingStore()

  // Lưu thông tin vào store khi component mount
  useEffect(() => {
    setSelectedMovie(movie)
    setSelectedShowtime(showtime)
    setSelectedTheater(theater)
  }, [movie, showtime, theater, setSelectedMovie, setSelectedShowtime, setSelectedTheater])

  // Redirect nếu chưa chọn ghế
  if (selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Bạn chưa chọn ghế</h1>
          <p className="text-muted-foreground mb-8">Vui lòng chọn ghế trước khi chọn bắp nước</p>
          <Button asChild>
            <Link href={`/booking/${showtimeId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại chọn ghế
            </Link>
          </Button>
        </div>
      </div>
    )
  }

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
            <Link href={`/booking/${showtimeId}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại chọn ghế
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
            Bước 2/3: Chọn bắp nước
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Concession Selection - Centered */}
          <div className="lg:col-span-2">
            <ConcessionSelection />
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              regularPrice={showtime.price.regular}
              vipPrice={showtime.price.vip}
              movieTitle={movie.title}
              theaterName={theater.name}
              showtime={showtime.time}
              showDate={showDate}
              currentStep="concession"
              showtimeId={showtimeId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}