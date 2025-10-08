import { notFound } from "next/navigation"
import { ConcessionPageClient } from "@/components/concession-page-client"
import { movies, theaters, showtimes } from "@/lib/mock-data"

interface ConcessionPageProps {
  params: {
    showtimeId: string
  }
}

export default async function ConcessionPage({ params }: ConcessionPageProps) {
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

  return (
    <ConcessionPageClient 
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

export async function generateMetadata({ params }: ConcessionPageProps) {
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
    title: `Chọn bắp nước - ${movie?.title || "phim"} - CyberLearn Movies`,
    description: `Chọn bắp nước và đồ ăn cho suất chiếu ${movie?.title || ""} tại CyberLearn Movies`,
  }
}