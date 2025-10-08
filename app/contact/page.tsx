import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, CreditCard } from "lucide-react"

export const metadata = {
  title: "Liên hệ - CyberLearn Movies",
  description: "Liên hệ với CyberLearn Movies để được hỗ trợ và giải đáp thắc mắc",
}

const contactInfo = [
  {
    icon: Phone,
    title: "Hotline",
    content: "1900 6969",
    description: "Hỗ trợ 24/7"
  },
  {
    icon: Mail,
    title: "Email",
    content: "support@cyberlearnmovies.com",
    description: "Phản hồi trong 24h"
  },
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    description: "Trụ sở chính"
  },
  {
    icon: Clock,
    title: "Giờ làm việc",
    content: "8:00 - 22:00",
    description: "Thứ 2 - Chủ nhật"
  }
]

const supportCategories = [
  { icon: MessageCircle, title: "Hỗ trợ chung", description: "Câu hỏi về dịch vụ và thông tin" },
  { icon: CreditCard, title: "Thanh toán", description: "Vấn đề về thanh toán và hoàn tiền" },
  { icon: Headphones, title: "Kỹ thuật", description: "Lỗi website và ứng dụng" }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="main-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Liên hệ với chúng tôi</h1>
          <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Gửi tin nhắn cho chúng tôi</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Họ</Label>
                      <Input id="firstName" placeholder="Nhập họ của bạn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Tên</Label>
                      <Input id="lastName" placeholder="Nhập tên của bạn" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" placeholder="0901234567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Loại hỗ trợ</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại hỗ trợ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Hỗ trợ chung</SelectItem>
                        <SelectItem value="payment">Thanh toán</SelectItem>
                        <SelectItem value="technical">Kỹ thuật</SelectItem>
                        <SelectItem value="booking">Đặt vé</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tin nhắn</Label>
                    <Textarea
                      id="message"
                      placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        <p className="text-foreground">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Các loại hỗ trợ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">{category.title}</h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium mb-2">Câu hỏi thường gặp</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tìm câu trả lời nhanh chóng cho các câu hỏi phổ biến
                  </p>
                  <Button variant="outline" className="w-full">
                    Xem FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Vị trí trụ sở</h2>
          <Card className="overflow-hidden">
            <div className="h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4967667869835!2d106.69252631533309!3d10.773395992323135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3328eb59%3A0x92dcba2950430867!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuSENNIC0gQ1M0!5e0!3m2!1svi!2s!4v1635789012345!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{border: 0, borderRadius: '20px'}} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí CyberLearn Movies"
              />
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}