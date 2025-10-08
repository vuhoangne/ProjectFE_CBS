"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TheaterLogo } from "@/components/theater-logo"
import { theaters, showtimes } from "@/lib/mock-data"
import { getAvailableShowtimes, isShowtimePassed, formatTimeRemaining, getTimeUntilShowtime } from "@/lib/showtime-utils"

interface ShowtimeSelectorProps {
  movieId: number
}

export function ShowtimeSelector({ movieId }: ShowtimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(0)

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  const selectedDateString = dates[selectedDate].toISOString().split("T")[0]
  const allMovieShowtimes = showtimes.filter(
    (showtime) => showtime.movieId === movieId && showtime.date === selectedDateString,
  )
  
  // Lọc các suất chiếu còn có thể đặt
  const movieShowtimes = getAvailableShowtimes(allMovieShowtimes)

  console.log("[v0] Movie ID:", movieId)
  console.log("[v0] Selected date:", selectedDateString)
  console.log("[v0] Movie showtimes found:", movieShowtimes.length)

  const formatDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return "Hôm nay"
    if (date.toDateString() === tomorrow.toDateString()) return "Ngày mai"
    return date.toLocaleDateString("vi-VN", { weekday: "short", day: "numeric", month: "numeric" })
  }

  return (
    <div className="showtime-section space-y-6">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">LỊCH CHIẾU</h2>
      </div>

      {/* Date Selector - Căn giữa */}
      <div className="w-full flex justify-center">
        <ScrollArea className="w-full max-w-4xl">
          <div className="flex gap-2 pb-2 justify-center flex-wrap px-4">
            {dates.map((date, index) => (
              <Button
                key={index}
                variant={selectedDate === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDate(index)}
                className={`whitespace-nowrap flex-shrink-0 min-w-[80px] btn-interactive date-selector-btn ${
                  selectedDate === index 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "bg-transparent hover:bg-primary/10 hover:border-primary hover:text-primary"
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">{formatDate(date)}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Theater Showtimes */}
      <div className="space-y-4">
        {theaters.map((theater) => {
          const theaterShowtimes = movieShowtimes.filter((showtime) => showtime.theaterId === theater.id)

          if (theaterShowtimes.length === 0) return null

          return (
            <Card key={theater.id} className="showtime-theater-card theater-card">
              <CardHeader className="pb-4">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 justify-center sm:justify-start">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <Image
                      src={theater.logo || "/placeholder.svg"}
                      alt={theater.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <CardTitle className="text-base sm:text-lg leading-tight">{theater.name}</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-tight">{theater.location}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  {/* Price Info */}
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <span>Ghế thường: {theaterShowtimes[0]?.price.regular.toLocaleString("vi-VN")}đ</span>
                    <span>•</span>
                    <span>Ghế VIP: {theaterShowtimes[0]?.price.vip.toLocaleString("vi-VN")}đ</span>
                  </div>

                  {/* Showtimes */}
                  <div className="showtime-buttons">
                    {/* Remove duplicates by using Set */}
                    {Array.from(new Set(theaterShowtimes.map(showtime => showtime.time)))
                      .map((time) => {
                        // Find the first showtime with this time
                        const showtime = theaterShowtimes.find(s => s.time === time);
                        if (!showtime) return null;
                        
                        const isPassed = isShowtimePassed(showtime);
                        const timeRemaining = getTimeUntilShowtime(showtime);
                        
                        if (isPassed) {
                          return (
                            <Badge
                              key={`showtime-${showtime.id}`}
                              variant="secondary"
                              className="px-4 py-2 text-sm min-h-[44px] flex items-center justify-center bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            >
                              {time} (Đã qua)
                            </Badge>
                          );
                        }
                        
                        return (
                          <Badge
                            key={`showtime-${showtime.id}`}
                            variant="outline"
                            className="cursor-pointer px-4 py-2 text-sm min-h-[44px] flex items-center justify-center bg-transparent border-primary/30 text-foreground font-semibold btn-interactive showtime-btn hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/25"
                            asChild
                          >
                            <Link href={`/booking/${showtime.id}`} className="no-underline">
                              {time}
                              {timeRemaining < 120 && timeRemaining > 0 && (
                                <span className="ml-1 text-xs opacity-75">
                                  ({formatTimeRemaining(timeRemaining)})
                                </span>
                              )}
                            </Link>
                          </Badge>
                        );
                      })
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {movieShowtimes.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              {allMovieShowtimes.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-muted-foreground">Tất cả suất chiếu trong ngày đã qua giờ đặt vé</p>
                  <p className="text-sm text-muted-foreground">Vui lòng chọn ngày khác</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Không có suất chiếu nào cho ngày đã chọn</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
