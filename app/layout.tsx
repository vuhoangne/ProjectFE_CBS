import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "CyberLearn Movies - Đặt vé xem phim online",
  description: "Hệ thống đặt vé xem phim trực tuyến hiện đại với trải nghiệm người dùng tốt nhất",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="dark">
      <body className={`font-sans ${inter.variable} antialiased`}>
        {children}
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  )
}
