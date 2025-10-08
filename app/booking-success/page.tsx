"use client"

import Link from "next/link"
import { Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { BookingConfirmation } from "@/components/booking-confirmation"



export default function BookingSuccessPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-green-950/20 dark:via-background dark:to-blue-950/20">
        <Navigation />

        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Chúc mừng!
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                Cảm ơn bạn đã sử dụng dịch vụ của CyberLearn Movies.
              </p>
            </div>

            {/* Booking Confirmation */}
            <BookingConfirmation />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mt-8 mb-10">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Download className="h-5 w-5 mr-3" />
                Tải vé PDF
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 h-14 text-lg font-semibold border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Share2 className="h-5 w-5 mr-3" />
                Chia sẻ
              </Button>
            </div>

            {/* Navigation */}
            <div className="text-center">
              <Button 
                asChild 
                size="lg"
                className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
