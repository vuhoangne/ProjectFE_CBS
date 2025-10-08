"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { theaters, showtimes, movies } from "@/lib/mock-data"
import { MapPin, Clock, Calendar, Star, Users, Zap, Crown, Filter, ChevronRight, Play, Heart, Share2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function ShowtimesSidebar() {
  const [selectedDate, setSelectedDate] = useState(0) // 0 = today, 1 = tomorrow, etc.
  const [selectedTheater, setSelectedTheater] = useState<number | null>(null)
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([])
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const today = new Date()
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return {
      date: date.toISOString().split("T")[0],
      display: date.toLocaleDateString('vi-VN', { 
        weekday: i === 0 ? 'long' : 'short', 
        day: 'numeric', 
        month: i === 0 ? 'long' : 'numeric' 
      }),
      isToday: i === 0,
      isTomorrow: i === 1
    }
  })

  const selectedDateString = dates[selectedDate].date
  const filteredShowtimes = showtimes.filter((showtime) => {
    const matchesDate = showtime.date === selectedDateString
    const matchesTheater = selectedTheater ? showtime.theaterId === selectedTheater : true
    return matchesDate && matchesTheater
  })

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    )
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10 // 10px threshold
      setIsScrolledToBottom(isAtBottom)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  console.log("[v0] Selected date:", selectedDateString)
  console.log("[v0] Available showtimes:", showtimes.length)
  console.log("[v0] Filtered showtimes:", filteredShowtimes.length)

  return (
    <Card className="sticky top-24 shadow-xl border-border/50 bg-card/95 backdrop-blur-sm w-full z-10">
      <CardHeader className="pb-4 flex-shrink-0 space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Lịch chiếu phim
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs px-2 py-1">
            {filteredShowtimes.length} suất
          </Badge>
        </div>

        {/* Date Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Chọn ngày chiếu</span>
          </div>
          <ScrollArea className="w-full">
            <div className="flex flex-wrap gap-2 pb-2">
              {dates.map((dateInfo, index) => (
                <Button
                  key={index}
                  variant={selectedDate === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate(index)}
                  className={`flex-shrink-0 h-12 px-3 flex flex-col items-center justify-center text-xs btn-interactive date-selector-btn ${
                    selectedDate === index 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "hover:bg-primary/10 hover:border-primary hover:text-primary"
                  }`}
                >
                  <span className="font-semibold">
                    {dateInfo.isToday ? "Hôm nay" : dateInfo.isTomorrow ? "Ngày mai" : dateInfo.display.split(' ')[0]}
                  </span>
                  <span className="text-xs opacity-80">
                    {dateInfo.display.split(' ').slice(1).join(' ')}
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Theater Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Lọc theo rạp</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTheater === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTheater(null)}
              className={`h-8 text-xs btn-interactive ${
                selectedTheater === null 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                  : "hover:bg-primary/10 hover:border-primary hover:text-primary"
              }`}
            >
              Tất cả
            </Button>
            {theaters.map((theater) => (
              <Button
                key={theater.id}
                variant={selectedTheater === theater.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTheater(theater.id)}
                className={`h-8 text-xs btn-interactive ${
                  selectedTheater === theater.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "hover:bg-primary/10 hover:border-primary hover:text-primary"
                }`}
              >
                {theater.name.split(' ')[0]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col overflow-hidden relative">
        <div ref={scrollRef} className="flex-1 max-h-[600px] overflow-y-auto pr-1 sidebar-scroll">
          <div className="space-y-6">
            {filteredShowtimes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Không có suất chiếu</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedTheater 
                    ? `Không có suất chiếu tại rạp này trong ngày ${dates[selectedDate].display}`
                    : `Không có suất chiếu nào trong ngày ${dates[selectedDate].display}`
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedDate(0)
                    setSelectedTheater(null)
                  }}
                >
                  Xem lịch hôm nay
                </Button>
              </div>
            ) : (
              theaters.map((theater) => {
                const theaterShowtimes = filteredShowtimes.filter((showtime) => showtime.theaterId === theater.id)

                if (theaterShowtimes.length === 0) return null

                return (
                  <div key={theater.id} className="space-y-4 p-4 rounded-xl border border-border/50 bg-gradient-to-br from-muted/10 to-muted/30 hover:from-muted/20 hover:to-muted/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-start gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center shadow-md">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-foreground text-sm">{theater.name}</h4>
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            {theaterShowtimes.length} phim
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {theater.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Group showtimes by movie */}
                      {Object.entries(
                        theaterShowtimes.reduce((acc, showtime) => {
                          const movie = movies.find((m) => m.id === showtime.movieId)
                          if (!movie) return acc
                          
                          if (!acc[movie.id]) {
                            acc[movie.id] = { movie, showtimes: [] }
                          }
                          acc[movie.id].showtimes.push(showtime)
                          return acc
                        }, {} as Record<number, { movie: any, showtimes: any[] }>)
                      ).map(([movieId, { movie, showtimes: movieShowtimes }]) => (
                        <div key={movieId} className="p-4 rounded-xl bg-background/60 hover:bg-background/80 transition-all duration-300 shadow-md hover:shadow-lg border border-border/30">
                          <div className="grid grid-cols-[auto,1fr] items-stretch gap-4">
                            <div className="relative w-36 h-full min-h-[176px] flex-shrink-0 rounded-xl overflow-hidden shadow-xl ring-1 ring-border/40 group">
                              <Image
                                src={movie.poster}
                                alt={movie.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="128px"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 space-y-3">
                              {/* Movie Info */}
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h5 className="text-sm font-bold text-foreground line-clamp-2 leading-tight">
                                    {movie.title}
                                  </h5>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                      onClick={() => toggleFavorite(movie.id)}
                                    >
                                      <Heart className={`h-3 w-3 ${favoriteMovies.includes(movie.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-blue-100 hover:text-blue-600"
                                    >
                                      <Share2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{movie.duration}p</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{movie.rating}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                    {movie.genre[0]}
                                  </Badge>
                                </div>
                                
                                <p className="text-sm text-muted-foreground line-clamp-4 md:line-clamp-6 leading-relaxed">
                                  {movie.synopsis}
                                </p>
                              </div>
                              
                              {/* Showtimes grid */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Zap className="h-3 w-3 text-primary" />
                                  <span className="text-xs font-medium text-foreground">Suất chiếu</span>
                                </div>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-2">
                                  {movieShowtimes.map((showtime) => (
                                    <Button
                                      key={showtime.id}
                                      asChild
                                      size="sm"
                                      className="h-9 w-full text-xs font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                      <Link href={`/booking/${showtime.id}`}>
                                        <Clock className="h-3 w-3 mr-1" />
                                        {showtime.time}
                                      </Link>
                                    </Button>
                                  ))}
                                </div>
                                
                                {/* Enhanced Price info */}
                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <div className="text-xs">
                                      <span className="text-muted-foreground">Thường: </span>
                                      <span className="font-semibold text-foreground">{movieShowtimes[0].price.regular.toLocaleString()}đ</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Crown className="h-4 w-4 text-yellow-500" />
                                    <div className="text-xs">
                                      <span className="text-muted-foreground">VIP: </span>
                                      <span className="font-semibold text-foreground">{movieShowtimes[0].price.vip.toLocaleString()}đ</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        
        {/* Dynamic scroll indicator */}
        {!isScrolledToBottom ? (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card via-card/95 to-transparent pointer-events-none z-10">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-indicator">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-2 scroll-indicator-glow border border-primary/20">
                <ChevronRight className="h-4 w-4 text-primary rotate-90 animate-pulse" />
              </div>
              <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                Kéo xuống
              </span>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card via-card/95 to-transparent pointer-events-none z-10">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-complete">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-green-400/10 flex items-center justify-center mb-2 border border-green-400/20 scroll-complete-glow">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs text-green-500 font-semibold bg-green-500/10 px-2 py-1 rounded-full border border-green-400/20">
                Đã xem hết
              </span>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-border/50 flex-shrink-0 space-y-3 relative z-20">
          
          {favoriteMovies.length > 0 && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  Phim yêu thích ({favoriteMovies.length})
                </span>
              </div>
              <p className="text-xs text-red-600 dark:text-red-400">
                Bạn đã thêm {favoriteMovies.length} phim vào danh sách yêu thích
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
