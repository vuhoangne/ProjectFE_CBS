"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { theaters, showtimes, movies } from "@/lib/mock-data"
import { MapPin, Clock, Calendar, Star, Users, Zap, Crown, Filter, Play, Heart, Share2, Gift, Percent, Mail, Sparkles, Phone, Trophy, Target, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"

export function CinemaSidebar() {
  // Showtimes state
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTheater, setSelectedTheater] = useState<number | null>(null)
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([])
  
  // Promotions state
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("showtimes")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const today = new Date()
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return {
      date: date.toISOString().split("T")[0],
      weekday: i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : date.toLocaleDateString('vi-VN', { weekday: 'short' }),
      dayMonth: date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' }),
      isToday: i === 0,
      isTomorrow: i === 1
    }
  })  const se
lectedDateString = dates[selectedDate].date
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
      setPhone("")
    }, 5000)
  }

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const hotPromotions = [
    {
      id: 1,
      title: "Flash Sale - Giảm 70% vé cuối tuần",
      description: "Áp dụng cho tất cả suất chiếu từ 18h-22h",
      discount: "70%",
      code: "FLASH70",
      icon: <Zap className="h-5 w-5" />,
      color: "from-red-500 to-orange-500",
      timeLeft: "23:45:30",
      isHot: true,
      used: 1247,
      total: 2000
    },
    {
      id: 2,
      title: "Combo Family - Tiết kiệm 150k",
      description: "4 vé + 2 combo bắp nước lớn",
      discount: "150K",
      code: "FAMILY150",
      icon: <Users className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-500",
      timeLeft: "5 ngày",
      isHot: false,
      used: 856,
      total: 1500
    },
    {
      id: 3,
      title: "VIP Experience - Miễn phí nâng cấp",
      description: "Nâng cấp ghế VIP miễn phí cho 2 vé đầu tiên",
      discount: "FREE",
      code: "VIPFREE",
      icon: <Crown className="h-5 w-5" />,
      color: "from-purple-500 to-pink-500",
      timeLeft: "3 ngày",
      isHot: false,
      used: 423,
      total: 800
    }
  ] 
 return (
    <Card className="sticky top-24 shadow-xl border-border/50 bg-card/95 backdrop-blur-sm w-full max-w-full z-10 overflow-hidden">
      <CardHeader className="pb-2 p-3">
        <CardTitle className="text-primary text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Rạp Chiếu Phim
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Lịch chiếu và ưu đãi đặc biệt
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3 max-w-full overflow-hidden p-3">
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/20">
            <TabsTrigger 
              value="showtimes" 
              className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-primary/10"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Lịch chiếu
            </TabsTrigger>
            <TabsTrigger 
              value="promotions" 
              className="text-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-primary/10"
            >
              <Gift className="h-4 w-4 mr-2" />
              Ưu đãi
            </TabsTrigger>
          </TabsList>

          {/* Showtimes Tab */}
          <TabsContent value="showtimes" className="space-y-4 mt-4">
            {/* Date Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Chọn ngày chiếu</span>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs px-1.5 py-0.5">
                  {filteredShowtimes.length} suất
                </Badge>
              </div>
              
              {/* Date Dropdown Select */}
              <div className="relative">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(parseInt(e.target.value))}
                  className="w-full h-8 px-2 py-1 bg-background border border-border rounded text-foreground text-xs focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                >
                  {dates.map((date, index) => (
                    <option key={index} value={index}>
                      {date.weekday} - {date.dayMonth}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>     
       {/* Theater Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Lọc theo rạp</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTheater(null)}
                  className={`h-8 text-xs transition-all duration-200 border ${
                    selectedTheater === null
                      ? "bg-primary text-white border-primary shadow-md transform scale-105"
                      : "bg-background text-primary border-primary/30 hover:!bg-primary hover:!text-white hover:!border-primary hover:shadow-sm [&:hover]:!text-white [&:hover]:!bg-primary"
                  }`}
                >
                  Tất cả
                </Button>
                {theaters.slice(0, 3).map((theater) => (
                  <Button
                    key={theater.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTheater(theater.id)}
                    className={`h-8 text-xs transition-all duration-200 border ${
                      selectedTheater === theater.id
                        ? "bg-primary text-white border-primary shadow-md transform scale-105"
                        : "bg-background text-primary border-primary/30 hover:!bg-primary hover:!text-white hover:!border-primary hover:shadow-sm [&:hover]:!text-white [&:hover]:!bg-primary"
                    }`}
                  >
                    {theater.name.split(' ')[0]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Showtimes List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {filteredShowtimes.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">Không có suất chiếu</p>
                  </div>
                ) : (
                  theaters.map((theater) => {
                    const theaterShowtimes = filteredShowtimes.filter((showtime) => showtime.theaterId === theater.id)
                    if (theaterShowtimes.length === 0) return null

                    return (
                      <div key={theater.id} className="space-y-3 p-3 rounded-lg border border-border/50 bg-muted/10">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground text-sm">{theater.name}</h4>
                          <Badge variant="outline" className="text-xs px-2 py-0.5 ml-auto">
                            {theaterShowtimes.length} phim
                          </Badge>
                        </div>   
                     <div className="space-y-3">
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
                            <div key={movieId} className="p-3 rounded-lg bg-background/60 border border-border/30">
                              <div className="flex items-start gap-3">
                                <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                                  <Image
                                    src={movie.poster}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0 space-y-2">
                                  <div>
                                    <h5 className="text-sm font-bold text-foreground line-clamp-1">
                                      {movie.title}
                                    </h5>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>{movie.duration}p</span>
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span>{movie.rating}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-1">
                                    {movieShowtimes.slice(0, 4).map((showtime) => (
                                      <Button
                                        key={showtime.id}
                                        asChild
                                        size="sm"
                                        className="h-7 text-xs font-bold bg-primary text-white hover:bg-primary/80 hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
                                      >
                                        <Link href={`/booking/${showtime.id}`}>
                                          {showtime.time}
                                        </Link>
                                      </Button>
                                    ))}
                                  </div>
                                  
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Thường: {movieShowtimes[0].price.regular.toLocaleString()}đ</span>
                                    <span>VIP: {movieShowtimes[0].price.vip.toLocaleString()}đ</span>
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
          </TabsContent>       
   {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-4 mt-4">
            {/* Flash Sale Countdown */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-200/50 dark:border-red-800/50">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-red-500" />
                <span className="font-bold text-red-600 dark:text-red-400 text-sm">FLASH SALE</span>
                <Badge variant="destructive" className="text-xs px-2 py-0.5 animate-pulse">
                  HOT
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Giảm 70% vé cuối tuần</span>
                  <span className="text-lg font-bold text-red-600">70% OFF</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Kết thúc trong:</span>
                  <div className="flex gap-1 font-mono font-bold text-red-600">
                    <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                <Progress value={62} className="h-2" />
              </div>
            </div>

            {/* Promotions List */}
            <div className="space-y-3">
              {hotPromotions.map((promo) => (
                <div 
                  key={promo.id} 
                  className="p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-200 border border-border/30"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${promo.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                      {promo.icon}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground line-clamp-1">
                            {promo.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {promo.description}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs px-2 py-1">
                          {promo.discount}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs px-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
                          onClick={() => copyPromoCode(promo.code)}
                        >
                          {copiedCode === promo.code ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              {promo.code}
                            </>
                          )}
                        </Button>
                        <div className="text-xs text-muted-foreground">
                          Còn {promo.timeLeft}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>   
         {/* Registration Form */}
            {!isSubmitted ? (
              <div className="space-y-4 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                <div className="text-center">
                  <h3 className="font-bold text-foreground mb-1">Đăng ký nhận ưu đãi</h3>
                  <p className="text-xs text-muted-foreground">Nhận mã giảm giá 20% ngay lập tức</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary text-sm"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="0123 456 789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary text-sm"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-10 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transform hover:scale-105 transition-all duration-200 text-sm"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Nhận ưu đãi ngay
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/50 dark:border-green-800/50">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Đăng ký thành công!</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Mã giảm giá đã được gửi về email và SMS
                  </p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-3 py-1">
                    WELCOME20 - Giảm 20%
                  </Badge>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/30">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <Phone className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">Hotline</p>
                <p className="text-xs text-muted-foreground">1900 1234</p>
              </div>
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <Mail className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-xs font-medium">Email</p>
                <p className="text-xs text-muted-foreground">support@cinema.vn</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}