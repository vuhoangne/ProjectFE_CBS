"use client"

import { Navigation } from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import { MovieCard } from "@/components/movie-card"
import { ShowtimesSidebar } from "@/components/showtimes-sidebar"
import { PromotionsWidget } from "@/components/promotions-widget"
import { Footer } from "@/components/footer"
import { movies, upcomingMovies } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroCarousel />

      {/* Main Content */}
      <div className="main-container">
        <div className="content-wrapper">
          {/* Movies Section - Left Side */}
          <div className="movies-section">
            {/* Phim đang chiếu */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">PHIM ĐANG CHIẾU</h2>
                <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
                  Khám phá những bộ phim hot nhất hiện tại với chất lượng hình ảnh và âm thanh tuyệt vời
                </p>
              </div>

              <div className="movie-grid mt-8">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>

            {/* Phim sắp chiếu */}
            <div className="mb-20 mt-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">PHIM SẮP CHIẾU</h2>
                <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
                  Đặt trước vé cho những bộ phim bom tấn sắp ra mắt
                </p>
              </div>

              <div className="movie-grid">
                {upcomingMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={{...movie, isUpcoming: true}} />
                ))}
              </div>
            </div>
          </div>

          {/* Showtimes Sidebar - Right Side */}
          <div className="schedule-sidebar space-y-2">
            <div className="relative">
              <ShowtimesSidebar />
            </div>
            <div className="relative" style={{ marginTop: '-30px' }}>
              <PromotionsWidget />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
