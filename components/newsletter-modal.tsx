"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Gift, Phone, Mail } from "lucide-react"
import { toast } from "sonner"

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

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadContactInfo()
    }
  }, [isOpen])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Vui lòng nhập email của bạn")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || "Đăng ký thành công! Bạn sẽ nhận được ưu đãi qua email.")
        setEmail("")
        onClose()
      } else {
        toast.error(data.error || "Có lỗi xảy ra, vui lòng thử lại")
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black text-white border-gray-700 newsletter-modal">
        <DialogHeader className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-center space-y-2 pt-4">
            <div className="text-sm text-gray-400">423 đã dùng • 377 còn lại</div>
            <DialogTitle className="text-2xl font-bold text-white">
              Đăng ký nhận ưu đãi
            </DialogTitle>
            <p className="text-gray-400">Nhận mã giảm giá 20% ngay lập tức</p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 px-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 bg-transparent border-gray-600 text-white placeholder-gray-400 h-12"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold h-12 rounded-lg transition-all duration-200"
          >
            <Gift className="h-5 w-5 mr-2" />
            {loading ? "Đang xử lý..." : "Nhận ưu đãi ngay"}
          </Button>
        </form>

        {/* Contact Info Section */}
        <div className="border-t border-gray-700 pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center space-y-1">
              <Phone className="h-6 w-6 text-yellow-500 mx-auto" />
              <div className="text-sm font-medium text-white">Hotline</div>
              <div className="text-sm text-gray-400">
                {contactInfo?.phone || "1900 1234"}
              </div>
            </div>
            <div className="text-center space-y-1">
              <Mail className="h-6 w-6 text-yellow-500 mx-auto" />
              <div className="text-sm font-medium text-white">Email</div>
              <div className="text-sm text-gray-400">
                {contactInfo?.email || "support@cinema.vn"}
              </div>
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  )
}