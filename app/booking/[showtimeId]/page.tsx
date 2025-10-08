import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { BookingPageClient } from "@/components/booking-page-client"
import { movies, theaters, showtimes } from "@/lib/mock-data"
import { isShowtimePassed } from "@/lib/showtime-utils"

interface BookingPageProps {
  params: {
    showtimeId: string
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { showtimeId: showtimeIdParam } = await params
  const showtimeId = Number.parseInt(showtimeIdParam)
  const showtime = showtimes.find((s) => s.id === showtimeId)

  if (!showtime) {
    notFound()
  }

  const movie = movies.find((m) => m.id === showtime.movieId)
  const theater = theaters.find((t) => t.id === showtime.theaterId)

  if (!movie || !theater) {
    notFound()
  }

  // Kiểm tra suất chiếu đã qua chưa
  if (isShowtimePassed(showtime)) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Suất chiếu đã qua</h1>
          <p className="text-muted-foreground mb-8">
            Suất chiếu này đã qua giờ đặt vé. Vui lòng chọn suất chiếu khác.
          </p>
          <Button asChild>
            <Link href={`/movie/${movie.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại chọn suất chiếu
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <BookingPageClient 
      movie={movie}
      theater={theater}
      showtime={showtime}
      showtimeId={showtimeId}
    />
  )
}

export async function generateStaticParams() {
  return showtimes.map((showtime) => ({
    showtimeId: showtime.id.toString(),
  }))
}

export async function generateMetadata({ params }: BookingPageProps) {
  const { showtimeId: showtimeIdParam } = await params
  const showtimeId = Number.parseInt(showtimeIdParam)
  const showtime = showtimes.find((s) => s.id === showtimeId)

  if (!showtime) {
    return {
      title: "Suất chiếu không tồn tại",
    }
  }

  const movie = movies.find((m) => m.id === showtime.movieId)

  return {
    title: `Đặt vé ${movie?.title || "phim"} - CyberLearn Movies`,
    description: `Chọn ghế và đặt vé xem phim ${movie?.title || ""} tại CyberLearn Movies`,
  }
}
