"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ContactInfo from "@/components/contact-info"
import Link from "next/link"
import { ArrowLeft, Settings, Eye } from "lucide-react"

export default function DemoContactPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Demo: Quản lý thông tin liên hệ</h1>
            <p className="text-muted-foreground mt-2">
              Xem cách thông tin liên hệ được hiển thị và quản lý trong hệ thống
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/contact">
              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                Quản lý Admin
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

        {/* Demo Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Info Component */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Component thông tin liên hệ</h2>
              <Button onClick={handleRefresh} size="sm" variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            <div key={refreshKey}>
              <ContactInfo />
            </div>
            <p className="text-sm text-muted-foreground">
              Component này sẽ tự động cập nhật khi admin thay đổi thông tin liên hệ
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Hướng dẫn sử dụng</h2>
            <div className="bg-card p-6 rounded-lg border space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-primary">1. Truy cập trang quản lý</h3>
                <p className="text-sm text-muted-foreground">
                  Vào <strong>/admin/contact</strong> để chỉnh sửa thông tin liên hệ
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-primary">2. Cập nhật thông tin</h3>
                <p className="text-sm text-muted-foreground">
                  Thay đổi số điện thoại, email, địa chỉ, và các liên kết mạng xã hội
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-primary">3. Xem trước</h3>
                <p className="text-sm text-muted-foreground">
                  Sử dụng tab "Xem trước" để kiểm tra giao diện hiển thị
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-primary">4. Lưu thay đổi</h3>
                <p className="text-sm text-muted-foreground">
                  Nhấn "Lưu thay đổi" để cập nhật toàn bộ website
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tính năng</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium mb-2">✨ Cập nhật real-time</h3>
              <p className="text-sm text-muted-foreground">
                Thông tin được cập nhật ngay lập tức trên toàn bộ website
              </p>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium mb-2">🔗 Liên kết tự động</h3>
              <p className="text-sm text-muted-foreground">
                Số điện thoại và email tự động tạo liên kết gọi/gửi mail
              </p>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-medium mb-2">📱 Mạng xã hội</h3>
              <p className="text-sm text-muted-foreground">
                Quản lý liên kết Facebook, Instagram, YouTube dễ dàng
              </p>
            </div>
          </div>
        </div>

        {/* API Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Test API</h2>
          <div className="bg-card p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-3">
              API endpoints có sẵn:
            </p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">GET</span>
                <span>/api/contact</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">PUT</span>
                <span>/api/contact</span>
              </div>
            </div>
            <Link href="/test-contact" className="inline-block mt-3">
              <Button size="sm" variant="outline">
                Xem trang test API
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}