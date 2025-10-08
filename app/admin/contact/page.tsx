"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, Save, RefreshCw, Globe, Facebook, Instagram, Youtube } from "lucide-react"
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

export default function ContactManagementPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "1900 6017",
    email: "support@cyberlearn.vn",
    address: "Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM",
    website: "https://cyberlearn.vn",
    facebook: "https://facebook.com/cyberlearn",
    instagram: "https://instagram.com/cyberlearn",
    youtube: "https://youtube.com/cyberlearn",
    description: "Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam"
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    setLoading(true)
    try {
      // First try to load from localStorage for immediate display
      if (typeof window !== 'undefined') {
        const localData = localStorage.getItem('cyberlearn_contact_info')
        if (localData) {
          const parsedData = JSON.parse(localData)
          setContactInfo(parsedData)
          console.log('Loaded contact info from localStorage:', parsedData)
        }
      }

      // Then load from server API
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setContactInfo(data)
        console.log('Loaded contact info from server:', data)
        
        // Update localStorage with server data
        if (typeof window !== 'undefined') {
          localStorage.setItem('cyberlearn_contact_info', JSON.stringify(data))
        }
      }
    } catch (error) {
      console.error('Error loading contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      })

      if (response.ok) {
        const updatedData = await response.json()
        console.log('Contact info saved:', updatedData)
        toast.success("✅ Thông tin liên hệ đã được lưu thành công! Dữ liệu sẽ được giữ nguyên khi bạn quay lại.")
        
        // Also save to localStorage for immediate persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('cyberlearn_contact_info', JSON.stringify(updatedData))
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save contact info')
      }
    } catch (error) {
      console.error('Error saving contact info:', error)
      toast.error("❌ Có lỗi xảy ra khi lưu thông tin liên hệ: " + (error as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Đang tải thông tin liên hệ...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 admin-contact-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý thông tin liên hệ</h1>
          <p className="text-muted-foreground">
            Cập nhật thông tin liên hệ hiển thị trên website
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2 save-button">
          {saving ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
          <TabsTrigger value="preview">Xem trước</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="contact-form-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Thông tin liên hệ chính
                </CardTitle>
                <CardDescription>
                  Cập nhật số điện thoại, email và địa chỉ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="1900 6017"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email hỗ trợ</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="support@cyberlearn.vn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="contact-form-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Thông tin bổ sung
                </CardTitle>
                <CardDescription>
                  Website và mô tả về dịch vụ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={contactInfo.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://cyberlearn.vn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả dịch vụ</Label>
                  <Textarea
                    id="description"
                    value={contactInfo.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Mô tả về dịch vụ của bạn"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="contact-form-card">
            <CardHeader>
              <CardTitle>Liên kết mạng xã hội</CardTitle>
              <CardDescription>
                Cập nhật các liên kết đến trang mạng xã hội của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  value={contactInfo.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/cyberlearn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={contactInfo.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/cyberlearn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  value={contactInfo.youtube}
                  onChange={(e) => handleInputChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/cyberlearn"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Xem trước thông tin liên hệ</CardTitle>
              <CardDescription>
                Đây là cách thông tin sẽ hiển thị trên website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-white p-6 rounded-lg space-y-4 contact-preview">
                <h3 className="text-xl font-bold text-blue-400">Liên hệ</h3>
                
                <div className="flex items-center gap-3 text-gray-300 contact-item">
                  <Phone className="h-5 w-5" />
                  <span>{contactInfo.phone}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300 contact-item">
                  <Mail className="h-5 w-5" />
                  <span>{contactInfo.email}</span>
                </div>
                
                <div className="flex items-start gap-3 text-gray-300 contact-item">
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <span>{contactInfo.address}</span>
                </div>

                {contactInfo.description && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-300 text-sm">{contactInfo.description}</p>
                  </div>
                )}

                <div className="flex gap-4 mt-4 social-links">
                  {contactInfo.facebook && (
                    <a href={contactInfo.facebook} className="text-blue-400 hover:text-blue-300">
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {contactInfo.instagram && (
                    <a href={contactInfo.instagram} className="text-pink-400 hover:text-pink-300">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {contactInfo.youtube && (
                    <a href={contactInfo.youtube} className="text-red-400 hover:text-red-300">
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}