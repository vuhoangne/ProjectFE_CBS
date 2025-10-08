"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Film, Facebook, Instagram, Youtube, Mail, Phone, MapPin, Globe } from "lucide-react"

interface ContactInfo {
  phone: string
  email: string
  address: string
  website: string
  facebook: string
  instagram: string
  youtube: string
  description: string
}

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setContactInfo(data)
      }
    } catch (error) {
      console.error('Error loading contact info:', error)
    }
  }
  return (
    <footer className="bg-card border-t border-border mt-8">
      <div className="main-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CyberLearn Movies
              </span>
            </div>
            <p className="text-base text-muted-foreground text-pretty leading-relaxed">
              Hệ thống rạp chiếu phim hiện đại với công nghệ tiên tiến và trải nghiệm giải trí tuyệt vời.
            </p>
            <div className="flex space-x-6">
              {contactInfo?.facebook && (
                <Link href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-200 transform hover:scale-110">
                  <Facebook className="h-6 w-6" />
                </Link>
              )}
              {contactInfo?.instagram && (
                <Link href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-200 transform hover:scale-110">
                  <Instagram className="h-6 w-6" />
                </Link>
              )}
              {contactInfo?.youtube && (
                <Link href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-200 transform hover:scale-110">
                  <Youtube className="h-6 w-6" />
                </Link>
              )}
              {contactInfo?.website && (
                <Link href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-200 transform hover:scale-110">
                  <Globe className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground text-lg">Liên kết nhanh</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/theaters" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Rạp chiếu phim
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Khuyến mãi
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Thành viên
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground text-lg">Hỗ trợ</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/booking-guide" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Hướng dẫn đặt vé
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-foreground text-lg">Liên hệ</h3>
            <div className="space-y-4 text-base">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href={`tel:${contactInfo?.phone?.replace(/\s/g, '') || '19006017'}`} className="hover:underline">
                  {contactInfo?.phone || '1900 6017'}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href={`mailto:${contactInfo?.email || 'support@cyberlearn.vn'}`} className="hover:underline">
                  {contactInfo?.email || 'support@cyberlearn.vn'}
                </a>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-200">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="text-pretty leading-relaxed">
                  {contactInfo?.address || 'Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-base text-muted-foreground">
            &copy; 2024 CyberLearn Movies. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
