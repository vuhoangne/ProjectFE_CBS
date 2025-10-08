"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Smartphone, Building2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useBookingStore, useAuthStore, useConcessionStore, useBookingManagementStore } from "@/lib/store"
import { validateCustomerInfo, validateCompleteBooking } from "@/lib/validation"
import { movies, theaters, showtimes, seatLayout } from "@/lib/mock-data"

const paymentMethods = [
  {
    id: "card",
    name: "Thẻ tín dụng/ghi nợ",
    icon: CreditCard,
    description: "Visa, Mastercard, JCB",
  },
  {
    id: "momo",
    name: "Ví MoMo",
    icon: Smartphone,
    description: "Thanh toán qua ví điện tử MoMo",
  },
  {
    id: "banking",
    name: "Internet Banking",
    icon: Building2,
    description: "Chuyển khoản ngân hàng",
  },
]

export function PaymentForm() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { selectedMovie, selectedShowtime, selectedTheater, selectedSeats, seatAmount, totalAmount, clearBooking } = useBookingStore()
  const { concessionOrders, getTotalConcessionAmount, clearConcession } = useConcessionStore()
  const { addBooking } = useBookingManagementStore()
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const handleCardInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setValidationErrors([])

    try {
      // Validate complete booking
      if (!user || !selectedMovie || !selectedShowtime || !selectedTheater) {
        throw new Error("Thông tin đặt vé không đầy đủ")
      }

      const customerInfo = {
        name: user.fullName,
        email: user.email,
        phone: user.phone
      }

      const validation = validateCompleteBooking({
        customerInfo,
        selectedSeats,
        showtimeId: selectedShowtime.id,
        regularPrice: selectedShowtime.price.regular,
        vipPrice: selectedShowtime.price.vip,
        vipRows: seatLayout.vipRows,
        concessionAmount: getTotalConcessionAmount(),
        totalAmount,
        occupiedSeats: seatLayout.occupied,
        showtimes
      })

      if (!validation.isValid) {
        setValidationErrors(validation.errors)
        return
      }

      // Validate payment method specific data
      if (selectedMethod === "card") {
        if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
          setValidationErrors(["Vui lòng điền đầy đủ thông tin thẻ"])
          return
        }
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create booking record
      const newBooking = {
        userId: user.id,
        showtimeId: selectedShowtime.id,
        seats: selectedSeats,
        seatAmount,
        concessionOrders,
        concessionAmount: getTotalConcessionAmount(),
        totalAmount,
        status: "confirmed" as const,
        customerInfo,
        paymentMethod: selectedMethod,
      }

      addBooking(newBooking)

      // Clear booking state and redirect to success
      clearBooking()
      clearConcession()
      router.push("/booking-success")
    } catch (error) {
      console.error("Payment failed:", error)
      setValidationErrors([error instanceof Error ? error.message : "Có lỗi xảy ra trong quá trình thanh toán"])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <h4 className="font-medium text-destructive mb-2">Có lỗi xảy ra:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-destructive">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Payment Methods */}
      <Card className="shadow-xl border-primary/20 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <CreditCard className="h-6 w-6 text-primary" />
            Chọn phương thức thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            {paymentMethods.map((method) => {
              const Icon = method.icon
              const isSelected = selectedMethod === method.id
              return (
                <div 
                  key={method.id} 
                  className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-muted hover:border-primary/50 hover:bg-muted/30'
                  }`}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="text-primary" />
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/10' : 'bg-muted/50'}`}>
                    <Icon className={`h-6 w-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={method.id} className="font-semibold cursor-pointer text-base">
                      {method.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                  </div>
                  {isSelected && (
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                  )}
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card Details */}
      {selectedMethod === "card" && (
        <Card className="shadow-xl border-primary/20 bg-gradient-to-br from-card to-card/50 animate-in slide-in-from-top-2 duration-300">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <CreditCard className="h-6 w-6 text-primary" />
              Thông tin thẻ tín dụng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <Label htmlFor="cardNumber" className="text-sm font-semibold">Số thẻ</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => handleCardInputChange("number", formatCardNumber(e.target.value))}
                maxLength={19}
                required
                className="h-12 text-lg font-mono border-2 focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="expiry" className="text-sm font-semibold">Ngày hết hạn</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => handleCardInputChange("expiry", formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                  className="h-12 text-lg font-mono border-2 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="cvv" className="text-sm font-semibold">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  required
                  className="h-12 text-lg font-mono border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="cardName" className="text-sm font-semibold">Tên chủ thẻ</Label>
              <Input
                id="cardName"
                placeholder="Nhập tên như trên thẻ"
                value={cardData.name}
                onChange={(e) => handleCardInputChange("name", e.target.value.toUpperCase())}
                required
                className="h-12 text-lg border-2 focus:border-primary transition-colors"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Information */}
      <Card className="shadow-xl border-primary/20 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <div className="h-3 w-3 bg-primary rounded-full"></div>
            Thông tin khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Họ và tên</Label>
              <Input 
                value={user?.fullName || ""} 
                disabled 
                className="h-12 bg-muted/50 border-2"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Email</Label>
              <Input 
                value={user?.email || ""} 
                disabled 
                className="h-12 bg-muted/50 border-2"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <Label className="text-sm font-semibold">Số điện thoại</Label>
              <Input 
                value={user?.phone || ""} 
                disabled 
                className="h-12 bg-muted/50 border-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="pt-6">
        <Button 
          type="submit" 
          size="lg" 
          className="w-full h-16 text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl" 
          disabled={isProcessing || validationErrors.length > 0}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Đang xử lý thanh toán...
            </>
          ) : (
            <>
              <Check className="h-6 w-6 mr-3" />
              Xác nhận thanh toán {totalAmount.toLocaleString("vi-VN")}đ
            </>
          )}
        </Button>
        
        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            Thanh toán được bảo mật bằng SSL 256-bit
          </p>
        </div>
      </div>
    </form>
  )
}
