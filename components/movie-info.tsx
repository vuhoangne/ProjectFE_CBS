"use client"

import { Calendar, Clock, Star, User, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoviePoster } from "@/components/movie-poster"
import type { Movie } from "@/lib/mock-data"

interface MovieInfoProps {
  movie: Movie
}

export function MovieInfo({ movie }: MovieInfoProps) {
  console.log("Movie poster URL:", movie.poster);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {/* Movie Poster */}
        <div className="md:col-span-1 flex justify-center md:justify-start">
          <div className="w-full max-w-[300px] md:ml-[100px]">
            <MoviePoster
              src={movie.poster}
              alt={movie.title}
              title={movie.title}
            />
          </div>
        </div>

        {/* Movie Details */}
        <div className="md:col-span-1 xl:col-span-2 space-y-4 lg:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs sm:text-sm">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Movie Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate">{movie.duration} phút</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-primary fill-primary flex-shrink-0" />
              <span className="truncate">{movie.rating}/10</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate">{new Date(movie.releaseDate).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate">T13</span>
            </div>
          </div>

          {/* Director and Cast */}
          <div className="space-y-3 lg:space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Đạo diễn</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{movie.director}</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Diễn viên</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{movie.cast.join(", ")}</p>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Nội dung phim</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty text-sm sm:text-base">{movie.synopsis}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2">
            <Button size="lg" className="flex items-center gap-2 w-full sm:w-auto">
              <Play className="h-4 w-4" />
              Xem trailer
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Chia sẻ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
