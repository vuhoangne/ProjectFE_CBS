import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { MovieInfo } from "@/components/movie-info"
import { ShowtimeSelector } from "@/components/showtime-selector"
import { Footer } from "@/components/footer"
import { movies } from "@/lib/mock-data"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params
  const movieId = Number.parseInt(id)
  const movie = movies.find((m) => m.id === movieId)

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại trang chủ
            </Link>
          </Button>

          {/* Movie Information */}
          <MovieInfo movie={movie} />

          {/* Showtimes */}
          <ShowtimeSelector movieId={movieId} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }))
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params
  const movieId = Number.parseInt(id)
  const movie = movies.find((m) => m.id === movieId)

  if (!movie) {
    return {
      title: "Phim không tồn tại",
    }
  }

  return {
    title: `${movie.title} - CyberLearn Movies`,
    description: movie.synopsis,
  }
}
