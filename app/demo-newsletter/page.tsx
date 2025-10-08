"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import NewsletterModal from "@/components/newsletter-modal"
import Link from "next/link"
import { ArrowLeft, Mail, Gift, Settings } from "lucide-react"

export default function DemoNewsletterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Demo: Newsletter Modal</h1>
            <p className="text-muted-foreground mt-2">
              Test modal đăng ký nhận ưu đãi với thông tin liên hệ động
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/contact">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Cài đặt liên hệ
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Về trang chủ
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Section */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Modal Demo */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Modal</h2>
            <div className="bg-card p-6 rounded-lg border space-y-4">
              <p className="text-muted-foreground">
                Nhấn nút bên dưới để mở modal đăng ký newsletter
              </p>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="gap-2 w-full"
              >
                <Gift className="h-4 w-4" />
                Mở Modal Ưu Đãi
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tính năng</h2>
            <div className="space-y-3">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Thông tin liên hệ động
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hotline và email được lấy từ API, cập nhật real-time
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Gift className="h-4 w-4 text-primary" />
                  Đăng ký newsletter
                </h3>
                <p className="text-sm text-muted-foreground">
                  Form đăng ký với validation và feedback
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="font-medium mb-2">🔗 Mạng xã hội</h3>
                <p className="text-sm text-muted-foreground">
                  Liên kết Facebook, Instagram, YouTube từ admin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hướng dẫn</h2>
          <div className="bg-card p-6 rounded-lg border">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-medium text-primary">Tự động hiển thị</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Modal tự động hiển thị sau 3 giây trên trang chủ</li>
                  <li>• Chỉ hiển thị 1 lần trong 24 giờ</li>
                  <li>• Lưu trạng thái trong localStorage</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-primary">Tùy chỉnh</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cập nhật thông tin liên hệ từ admin</li>
                  <li>• Thay đổi liên kết mạng xã hội</li>
                  <li>• Tùy chỉnh thời gian hiển thị</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="bg-black p-8 rounded-lg">
            <div className="max-w-sm mx-auto bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="text-center space-y-4">
                <div className="text-xs text-gray-400">423 đã dùng • 377 còn lại</div>
                <h3 className="text-xl font-bold text-white">Đăng ký nhận ưu đãi</h3>
                <p className="text-gray-400 text-sm">Nhận mã giảm giá 20% ngay lập tức</p>
                
                <div className="bg-gray-800 p-3 rounded border border-gray-600">
                  <div className="text-gray-400 text-sm text-left">your@email.com</div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black p-3 rounded font-semibold">
                  🎁 Nhận ưu đãi ngay
                </div>
                
                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                      <div className="text-yellow-500">📞</div>
                      <div className="text-white">Hotline</div>
                      <div className="text-gray-400">1900 1234</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-500">✉️</div>
                      <div className="text-white">Email</div>
                      <div className="text-gray-400">support@cinema.vn</div>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}