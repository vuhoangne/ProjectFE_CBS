"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Gift, Percent, Star, Mail, Sparkles, Phone, Clock, Users, Crown, Zap, Calendar, Trophy, Target, Copy, Check } from "lucide-react"

export function PromotionsWidget() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("promotions")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  const isValidEmail = (val: string) => /.+@.+\..+/.test(val)
  const isFormValid = isValidEmail(email)

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

  const membershipBenefits = [
    {
      title: "Tích điểm mỗi lần xem phim",
      description: "1000đ = 1 điểm, đổi vé miễn phí",
      icon: <Star className="h-4 w-4" />,
      points: "x2"
    },
    {
      title: "Ưu tiên đặt vé sớm",
      description: "Đặt vé trước 24h so với khách thường",
      icon: <Clock className="h-4 w-4" />,
      points: "24h"
    },
    {
      title: "Sinh nhật đặc biệt",
      description: "Vé miễn phí + combo trong tháng sinh nhật",
      icon: <Gift className="h-4 w-4" />,
      points: "FREE"
    }
  ]

  return (
    <Card className="shadow-xl border-border/50 bg-card/95 backdrop-blur-sm w-full glass-morphism relative">
      <CardHeader className="pb-1 pt-4">
        <CardTitle className="text-primary text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Ưu đãi đặc biệt
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Đăng ký nhận thông tin khuyến mãi độc quyền
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3 pt-2">
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
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Đã sử dụng: 1,247</span>
                  <span>Còn lại: 753</span>
                </div>
              </div>
            </div>

            {/* Tabs for different sections */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-9">
                <TabsTrigger value="promotions" className="text-xs">Khuyến mãi</TabsTrigger>
                <TabsTrigger value="membership" className="text-xs">Thành viên</TabsTrigger>
                <TabsTrigger value="rewards" className="text-xs">Tích điểm</TabsTrigger>
              </TabsList>

              <TabsContent value="promotions" className="space-y-4 mt-4">
                <div className="space-y-3">
                  {hotPromotions.map((promo) => (
                    <div 
                      key={promo.id} 
                      className="p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all duration-200 border border-border/30 hover:border-primary/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${promo.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                          {promo.icon}
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-foreground line-clamp-1">
                                {promo.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {promo.description}
                              </p>
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs px-2 py-1 flex-shrink-0">
                              {promo.discount}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs px-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
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
                              {promo.isHot && (
                                <Badge variant="destructive" className="text-xs px-2 py-0.5 animate-pulse">
                                  HOT
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Còn {promo.timeLeft}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Progress value={(promo.used / promo.total) * 100} className="h-1.5" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{promo.used.toLocaleString()} đã dùng</span>
                              <span>{(promo.total - promo.used).toLocaleString()} còn lại</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="membership" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50">
                    <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-bold text-foreground mb-1">Thành viên VIP</h3>
                    <p className="text-xs text-muted-foreground">Đăng ký miễn phí - Nhận ngay ưu đãi</p>
                  </div>
                  
                  {membershipBenefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {benefit.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {benefit.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {benefit.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-1">
                        {benefit.points}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                    <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-bold text-foreground mb-1">Hệ thống tích điểm</h3>
                    <p className="text-xs text-muted-foreground">Xem phim càng nhiều - Ưu đãi càng lớn</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-muted/20 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Điểm hiện tại</span>
                        <span className="text-lg font-bold text-primary">2,450 điểm</span>
                      </div>
                      <Progress value={75} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Còn 550 điểm nữa để lên hạng Vàng</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-lg bg-muted/20 text-center">
                        <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-xs font-medium">Hạng Bạc</p>
                        <p className="text-xs text-muted-foreground">Giảm 10%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 text-center">
                        <Users className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                        <p className="text-xs font-medium">15 phim</p>
                        <p className="text-xs text-muted-foreground">Đã xem</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Registration Form (Email only to avoid overlap and ensure clarity) */}
            {!isSubmitted ? (
              <div className="space-y-4 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                <div className="text-center">
                  <h3 className="font-bold text-foreground mb-1">Đăng ký nhận ưu đãi</h3>
                  <p className="text-xs text-muted-foreground">Nhận mã giảm giá 20% ngay lập tức</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 flex items-center justify-center rounded-md bg-muted/20 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`flex-1 h-10 bg-background border-border focus:border-primary text-sm ${
                        email && !isValidEmail(email) ? "border-destructive/70 focus:border-destructive" : ""
                      }`}
                      required
                    />
                  </div>
                  {email && !isValidEmail(email) && (
                    <p className="text-[11px] text-destructive">Email không hợp lệ</p>
                  )}

                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={!isFormValid || isSubmitted}
                    className="w-full h-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold transition-all duration-200 text-xs disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Gift className="h-3 w-3 mr-1" />
                    Nhận ưu đãi
                  </Button>


                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200/50 dark:border-green-800/50">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground">Đăng ký thành công!</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mã giảm giá đã được gửi về email và SMS
                  </p>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm px-4 py-2 block">
                      WELCOME20 - Giảm 20%
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm px-4 py-2 block">
                      COMBO50 - Combo giảm 50%
                    </Badge>
                  </div>
                </div>
              </div>
            )}
        
      </CardContent>
      

    </Card>
  )
}