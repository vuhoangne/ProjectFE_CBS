"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/lib/mock-data"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const isUpcoming = movie.isUpcoming || new Date(movie.releaseDate) > new Date()
  const releaseDate = new Date(movie.releaseDate)
  
  // Determine specific poster positioning based on movie
  const getPosterClass = (movieTitle: string) => {
    const title = movieTitle.toLowerCase()
    if (title.includes('top gun')) return 'movie-poster movie-poster-top-gun'
    if (title.includes('avengers')) return 'movie-poster movie-poster-avengers'
    if (title.includes('spider-man')) return 'movie-poster movie-poster-spider-man'
    if (title.includes('oppenheimer')) return 'movie-poster movie-poster-oppenheimer'
    if (title.includes('dune')) return 'movie-poster movie-poster-dune'
    if (title.includes('batman')) return 'movie-poster movie-poster-batman'
    return 'movie-poster movie-poster-default'
  }
  
  return (
    <Card className="movie-card group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-400 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col transform hover:scale-105 hover:-translate-y-2">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          fill
          className={`${getPosterClass(movie.title)} object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110`}
          sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
          quality={95}
          priority
          unoptimized={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          {isUpcoming ? (
            <Badge className="bg-orange-500/90 text-white font-bold px-2 py-1 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Sắp chiếu
            </Badge>
          ) : (
            <Badge className="bg-primary/90 text-primary-foreground font-bold px-2 py-1 text-xs">
              <Star className="h-3 w-3 fill-current mr-1" />
              {movie.rating}
            </Badge>
          )}
        </div>

        {/* Hover Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-150">
          <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs border-white/50 text-white bg-black/30">
                  {genre}
                </Badge>
              ))}
            </div>
            <Button asChild size="sm" className={`w-full transform hover:scale-105 transition-all duration-200 ${
              isUpcoming 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-primary hover:bg-primary/90'
            }`}>
              <Link href={`/movie/${movie.id}`}>
                <span className="font-semibold text-sm">
                  {isUpcoming ? 'Đặt trước' : 'Đặt vé ngay'}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-3 flex-1 flex flex-col card-content">
        <div className="flex-1 space-y-2">
          <h3 className="font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 min-h-[3.25rem] leading-6">
            {movie.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-[2rem] items-start">
          {movie.genre.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs px-2.5 py-0.5 hover:bg-primary/20 transition-colors duration-200">
              {genre}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{movie.duration} phút</span>
          </div>
          <div className="flex items-center gap-2 hover:text-primary transition-colors duration-200">
            {isUpcoming ? (
              <>
                <Calendar className="h-4 w-4" />
                <span className="font-bold text-orange-500">
                  {releaseDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </span>
              </>
            ) : (
              <>
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-bold text-primary">{movie.rating}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
