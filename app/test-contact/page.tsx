"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function TestContactPage() {
  const [contactInfo, setContactInfo] = useState(null)
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  const testUpdate = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: "1900 6017 (Updated)",
          email: "support@cyberlearn.vn",
          address: "Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM (Updated)",
          website: "https://cyberlearn.vn",
          facebook: "https://facebook.com/cyberlearn",
          instagram: "https://instagram.com/cyberlearn",
          youtube: "https://youtube.com/cyberlearn",
          description: "Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam - Updated!"
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setContactInfo(data)
        alert("Cập nhật thành công!")
      }
    } catch (error) {
      console.error('Error updating contact info:', error)
      alert("Có lỗi xảy ra!")
    }
  }

  if (loading) {
    return <div className="p-8">Đang tải...</div>
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Test Contact API</h1>
      
      <div className="space-y-4">
        <Button onClick={loadContactInfo}>Tải lại thông tin</Button>
        <Button onClick={testUpdate} variant="outline">Test cập nhật</Button>
      </div>

      {contactInfo && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Thông tin liên hệ hiện tại:</h2>
          <pre className="text-sm">{JSON.stringify(contactInfo, null, 2)}</pre>
        </div>
      )}

      <div className="bg-black text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-400 mb-4">Liên hệ</h3>
        {contactInfo && (
          <>
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              📞 <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 mb-2">
              ✉️ <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              📍 <span>{contactInfo.address}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}