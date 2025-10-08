"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, Clock, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { movies } from "@/lib/mock-data"

const featuredMovies = movies.slice(0, 3)

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsAutoPlaying(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Touch gestures
  useEffect(() => {
    let startX = 0
    let startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = startX - endX
      const diffY = startY - endY

      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
    }

    const carousel = document.querySelector('.hero-carousel')
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart)
      carousel.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('touchstart', handleTouchStart)
        carousel.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div className="hero-carousel relative h-screen overflow-hidden">
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100 z-10" 
              : "opacity-0 scale-110 z-0"
          }`}
        >
          <Image
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            fill
            className={`object-cover transition-all duration-[12000ms] ease-out ${
              index === currentSlide 
                ? "scale-100" 
                : "scale-110"
            }`}
            style={{ objectPosition: 'center 25%' }}
            priority={index === 0}
            sizes="100vw"
            quality={100}
            unoptimized={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

          <div className="absolute inset-0 flex items-center">
            <div className="main-container">
              <div className={`max-w-2xl lg:max-w-4xl space-y-4 sm:space-y-5 text-white ml-[50px] transition-all duration-1000 ${
                index === currentSlide 
                  ? "translate-x-0 opacity-100" 
                  : "translate-x-[-50px] opacity-0"
              }`}>
                <div className={`space-y-3 transition-all duration-1200 delay-200 ${
                  index === currentSlide 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-8 opacity-0"
                }`}>
                  <div className={`flex items-center gap-3 text-primary transition-all duration-800 delay-300 ${
                    index === currentSlide 
                      ? "translate-x-0 opacity-100" 
                      : "translate-x-[-30px] opacity-0"
                  }`}>
                    <div className={`h-0.5 bg-primary transition-all duration-1000 delay-400 ${
                      index === currentSlide ? "w-12" : "w-0"
                    }`}></div>
                    <span className="text-sm font-semibold tracking-wider uppercase">Phim mới</span>
                  </div>
                  <h1 className={`text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-balance leading-tight tracking-tight transition-all duration-1000 delay-500 ${
                    index === currentSlide 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-12 opacity-0"
                  }`}>
                    {movie.title}
                  </h1>
                </div>
                
                <div className={`space-y-3 transition-all duration-1000 delay-600 ${
                  index === currentSlide 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-8 opacity-0"
                }`}>
                  <div className="flex items-center gap-6 text-sm sm:text-base">
                    <div className={`flex items-center gap-2 transition-all duration-800 delay-700 ${
                      index === currentSlide 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-[-20px] opacity-0"
                    }`}>
                      <Star className="h-5 w-5 fill-primary text-primary animate-pulse" />
                      <span className="font-semibold">{movie.rating}</span>
                    </div>
                    <div className={`flex items-center gap-2 transition-all duration-800 delay-800 ${
                      index === currentSlide 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-[-20px] opacity-0"
                    }`}>
                      <Clock className="h-5 w-5" />
                      <span>{movie.duration} phút</span>
                    </div>
                    <div className={`hidden sm:flex items-center gap-2 transition-all duration-800 delay-900 ${
                      index === currentSlide 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-[-20px] opacity-0"
                    }`}>
                      <span className="px-3 py-1 bg-primary/20 rounded-full text-xs font-medium backdrop-blur-sm">
                        {movie.genre[0]}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-base sm:text-lg lg:text-xl text-gray-200 line-clamp-3 text-pretty leading-relaxed max-w-3xl transition-all duration-1000 delay-1000 ${
                    index === currentSlide 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-6 opacity-0"
                  }`}>
                    {movie.synopsis}
                  </p>
                </div>

                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 transition-all duration-1000 delay-1100 ${
                  index === currentSlide 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-8 opacity-0"
                }`}>
                  <Button 
                    size="lg" 
                    asChild 
                    className={`w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 ${
                      index === currentSlide 
                        ? "animate-pulse" 
                        : ""
                    }`}
                  >
                    <Link href={`/movie/${movie.id}`}>
                      Đặt vé ngay
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group w-full sm:w-auto px-8 py-4 text-lg font-semibold bg-white/10 border-white/30 text-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                    style={{
                      '--hover-bg': '#ffffff',
                      '--hover-text': '#000000',
                      '--hover-border': '#ffffff'
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff'
                      e.currentTarget.style.color = '#000000'
                      e.currentTarget.style.borderColor = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    Xem trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Subtle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white/60 hover:text-white border-0 w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 group z-20 opacity-50 hover:opacity-100"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:-translate-x-0.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white/60 hover:text-white border-0 w-10 h-10 sm:w-12 sm:h-12 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 group z-20 opacity-50 hover:opacity-100"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:translate-x-0.5" />
      </Button>

      {/* Play/Pause Button - Subtle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-black/15 hover:bg-black/30 text-white/50 hover:text-white/80 border-0 w-8 h-8 sm:w-10 sm:h-10 backdrop-blur-sm transition-all duration-300 group z-20 opacity-40 hover:opacity-80"
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
      >
        {isAutoPlaying ? (
          <Pause className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300" />
        ) : (
          <Play className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300" />
        )}
      </Button>

      {/* Dots Indicator - Subtle */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`group relative transition-all duration-300 ${
              index === currentSlide ? "scale-110" : "hover:scale-105"
            }`}
            onClick={() => goToSlide(index)}
          >
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-white/90 shadow-lg shadow-white/30" 
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
            {index === currentSlide && (
              <div className="absolute inset-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20 animate-ping" />
            )}
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-1000 ease-out shadow-lg shadow-primary/20"
          style={{ 
            width: `${((currentSlide + 1) / featuredMovies.length) * 100}%` 
          }}
        />
        <div className="absolute top-0 right-0 w-2 h-full bg-primary/50 animate-pulse" />
      </div>
    </div>
  )
}
