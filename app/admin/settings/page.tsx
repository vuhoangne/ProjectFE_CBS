"use client"

import { useState, useEffect } from "react"
import { Save, Settings, Bell, Shield, Database, Mail, Globe, Palette } from "lucide-react"
import { useSettings } from "@/hooks/use-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  const { settings: apiSettings, isLoading: apiLoading, updateSettings } = useSettings()
  const [settings, setSettings] = useState(apiSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Update local settings when API settings change
  useEffect(() => {
    setSettings(apiSettings)
  }, [apiSettings])

  // Track changes to show unsaved indicator
  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(apiSettings)
    setHasUnsavedChanges(hasChanges)
  }, [settings, apiSettings])

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const result = await updateSettings(settings)
      
      if (result.success) {
        console.log("Settings saved successfully:", settings)
        showToastMessage("Cài đặt đã được lưu thành công!")
        setHasUnsavedChanges(false)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      showToastMessage("Có lỗi xảy ra khi lưu cài đặt. Vui lòng thử lại!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = async () => {
    if (confirm("Bạn có chắc chắn muốn khôi phục cài đặt mặc định?")) {
      try {
        setIsLoading(true)
        // Reset to API default settings
        const result = await updateSettings({
          siteName: "CyberLearn Movies",
          siteDescription: "Hệ thống đặt vé xem phim trực tuyến",
          contactEmail: "admin@cyberlearn.vn",
          supportPhone: "1900-1234",
          maxSeatsPerBooking: 8,
          bookingTimeLimit: 15,
          cancellationDeadline: 2,
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          requireEmailVerification: true,
          enableTwoFactor: false,
          sessionTimeout: 30,
          enableCreditCard: true,
          enableBankTransfer: true,
          enableEWallet: true,
          maintenanceMode: false,
          debugMode: false,
          cacheEnabled: true,
        })
        
        if (result.success) {
          console.log("Settings reset to default")
          showToastMessage("Đã khôi phục cài đặt mặc định!")
          setHasUnsavedChanges(false)
        } else {
          throw new Error(result.message)
        }
      } catch (error) {
        console.error('Error resetting settings:', error)
        showToastMessage("Có lỗi xảy ra khi khôi phục cài đặt!")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cài đặt hệ thống</h1>
          <p className="text-muted-foreground mt-2">Quản lý cấu hình và tùy chọn hệ thống</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Khôi phục mặc định
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className={hasUnsavedChanges ? "bg-orange-600 hover:bg-orange-700" : ""}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Đang lưu..." : hasUnsavedChanges ? "Lưu thay đổi" : "Lưu cài đặt"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="booking">Đặt vé</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="payment">Thanh toán</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Cài đặt chung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Tên website</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email liên hệ</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Mô tả website</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportPhone">Số điện thoại hỗ trợ</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings(prev => ({ ...prev, supportPhone: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Settings */}
        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cài đặt đặt vé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxSeats">Số ghế tối đa mỗi lần đặt</Label>
                  <Input
                    id="maxSeats"
                    type="number"
                    min="1"
                    max="20"
                    value={settings.maxSeatsPerBooking}
                    onChange={(e) => setSettings(prev => ({ ...prev, maxSeatsPerBooking: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Thời gian giữ ghế (phút)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    min="5"
                    max="60"
                    value={settings.bookingTimeLimit}
                    onChange={(e) => setSettings(prev => ({ ...prev, bookingTimeLimit: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellation">Hạn hủy vé (giờ trước suất chiếu)</Label>
                  <Input
                    id="cancellation"
                    type="number"
                    min="1"
                    max="24"
                    value={settings.cancellationDeadline}
                    onChange={(e) => setSettings(prev => ({ ...prev, cancellationDeadline: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo email</Label>
                    <p className="text-sm text-muted-foreground">
                      Gửi email xác nhận và thông báo đến khách hàng
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Gửi tin nhắn SMS xác nhận đặt vé
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo đẩy</Label>
                    <p className="text-sm text-muted-foreground">
                      Gửi thông báo đẩy qua trình duyệt
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cài đặt bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Yêu cầu xác thực email</Label>
                    <p className="text-sm text-muted-foreground">
                      Người dùng phải xác thực email trước khi đặt vé
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Xác thực hai yếu tố</Label>
                    <p className="text-sm text-muted-foreground">
                      Bật xác thực 2FA cho tài khoản admin
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableTwoFactor: checked }))}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Thời gian hết hạn phiên (phút)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="15"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Cài đặt thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thanh toán thẻ tín dụng</Label>
                    <p className="text-sm text-muted-foreground">
                      Cho phép thanh toán bằng thẻ tín dụng/ghi nợ
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableCreditCard}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableCreditCard: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Chuyển khoản ngân hàng</Label>
                    <p className="text-sm text-muted-foreground">
                      Cho phép thanh toán bằng chuyển khoản
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableBankTransfer}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableBankTransfer: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Ví điện tử</Label>
                    <p className="text-sm text-muted-foreground">
                      Cho phép thanh toán bằng ví điện tử (MoMo, ZaloPay, ...)
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableEWallet}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableEWallet: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Cài đặt hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Chế độ bảo trì</Label>
                    <p className="text-sm text-muted-foreground">
                      Tạm thời tắt website để bảo trì
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Chế độ debug</Label>
                    <p className="text-sm text-muted-foreground">
                      Hiển thị thông tin debug cho developer
                    </p>
                  </div>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, debugMode: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bật cache</Label>
                    <p className="text-sm text-muted-foreground">
                      Sử dụng cache để tăng tốc độ tải trang
                    </p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, cacheEnabled: checked }))}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Thao tác hệ thống</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">
                    Xóa cache
                  </Button>
                  <Button variant="outline">
                    Backup dữ liệu
                  </Button>
                  <Button variant="outline">
                    Xuất báo cáo
                  </Button>
                  <Button variant="destructive">
                    Khởi động lại hệ thống
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Simple Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-orange-100 border border-orange-300 text-orange-800 px-3 py-2 rounded-lg shadow-sm text-sm">
            Có thay đổi chưa được lưu
          </div>
        </div>
      )}
    </div>
  )
}