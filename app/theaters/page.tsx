import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { theaterDetails } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Star, Navigation as NavigationIcon } from "lucide-react"

export const metadata = {
  title: "Rạp chiếu phim - CyberLearn Movies",
  description: "Tìm hiểu về các rạp chiếu phim CyberLearn Movies trên toàn quốc",
}

const theaterDetails = [
  {
    id: 1,
    name: "CGV Vincom Center",
    location: "Vincom Center, 72 Lê Thánh Tôn, Quận 1, TP.HCM",
    phone: "1900 6017",
    openHours: "9:00 - 23:00",
    rating: 4.5,
    screens: 8,
    features: ["IMAX", "4DX", "Dolby Atmos", "VIP"],
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop&crop=center",
    description: "Rạp chiếu phim hiện đại với công nghệ âm thanh và hình ảnh tiên tiến nhất."
  },
  {
    id: 2,
    name: "Galaxy Cinema Nguyễn Du",
    location: "116 Nguyễn Du, Quận 1, TP.HCM",
    phone: "1900 6420",
    openHours: "8:30 - 23:30",
    rating: 4.3,
    screens: 6,
    features: ["Premium", "Dolby 7.1", "Couple Seat"],
    image: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=800&h=400&fit=crop&crop=center",
    description: "Không gian thoải mái với dịch vụ chăm sóc khách hàng tận tình."
  },
  {
    id: 3,
    name: "Lotte Cinema Diamond Plaza",
    location: "Diamond Plaza, 34 Lê Duẩn, Quận 1, TP.HCM",
    phone: "1900 5555",
    openHours: "9:30 - 22:30",
    rating: 4.4,
    screens: 10,
    features: ["Super Plex", "Gold Class", "Family Box"],
    image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=800&h=400&fit=crop&crop=center",
    description: "Hệ thống rạp chiếu phim cao cấp với nhiều loại phòng chiếu đa dạng."
  },
  {
    id: 4,
    name: "Cinestar Quốc Thanh",
    location: "271 Nguyễn Trãi, Quận 1, TP.HCM",
    phone: "1900 6099",
    openHours: "8:00 - 24:00",
    rating: 4.4,
    screens: 9,
    features: ["IMAX", "4DX", "VIP Lounge", "Dolby Atmos"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop&crop=center",
    description: "Rạp chiếu phim hiện đại với thiết kế độc đáo và công nghệ âm thanh vượt trội."
  }
]

export default function TheatersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="main-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Hệ thống rạp chiếu</h1>
          <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
            Trải nghiệm điện ảnh đẳng cấp tại các rạp chiếu hiện đại với công nghệ tiên tiến nhất
          </p>
        </div>

        {/* Theaters Grid - 2 rows, 2 columns, 30% width, centered */}
        <div className="flex justify-center mb-20">
          <div className="grid grid-cols-2 gap-8 max-w-4xl">
            {theaterDetails.map((theater) => (
              <Card key={theater.id} className="w-full max-w-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={theater.image}
                    alt={theater.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white text-xs">
                      {theater.screens} phòng
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="truncate">{theater.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{theater.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <p className="text-muted-foreground text-xs line-clamp-2">{theater.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-xs line-clamp-2">{theater.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-primary" />
                      <span className="text-xs">{theater.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-primary" />
                      <span className="text-xs">{theater.openHours}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-xs">Tiện ích:</h4>
                    <div className="flex flex-wrap gap-1">
                      {theater.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs px-1 py-0">
                          {feature}
                        </Badge>
                      ))}
                      {theater.features.length > 3 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{theater.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 text-xs">
                      Xem lịch chiếu
                    </Button>
                    <Button size="sm" variant="outline" className="px-2">
                      <NavigationIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


      </div>

      <Footer />
    </div>
  )
}