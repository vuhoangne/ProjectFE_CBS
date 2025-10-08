"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check, X, Film } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
  required: boolean
  validation?: (value: string) => string | null
}

interface AuthFormProps {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { login, loginWithPassword, registerUser } = useAuthStore()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loginFields: FormField[] = [
    {
      name: "username",
      label: "Tên đăng nhập hoặc Email",
      type: "text",
      placeholder: "Nhập tên đăng nhập hoặc email",
      required: true,
      validation: (value) => value.trim() ? null : "Bắt buộc"
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      placeholder: "Nhập mật khẩu",
      required: true,
      validation: (value) => value.trim().length >= 6 ? null : "Mật khẩu tối thiểu 6 ký tự"
    },
  ]

  const registerFields: FormField[] = [
    {
      name: "username",
      label: "Tên đăng nhập",
      type: "text",
      placeholder: "Nhập tên đăng nhập",
      required: true,
      validation: (value) => {
        if (value.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự"
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Tên đăng nhập chỉ được chứa chữ, số và dấu gạch dưới"
        return null
      },
    },
    {
      name: "fullName",
      label: "Họ và tên",
      type: "text",
      placeholder: "Nhập họ và tên đầy đủ",
      required: true,
      validation: (value) => {
        if (value.length < 2) return "Họ tên phải có ít nhất 2 ký tự"
        return null
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Nhập địa chỉ email",
      required: true,
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Email không hợp lệ"
        return null
      },
    },
    {
      name: "phone",
      label: "Số điện thoại",
      type: "tel",
      placeholder: "Nhập số điện thoại",
      required: true,
      validation: (value) => {
        const phoneRegex = /^[0-9]{10,11}$/
        if (!phoneRegex.test(value)) return "Số điện thoại phải có 10-11 chữ số"
        return null
      },
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      placeholder: "Nhập mật khẩu",
      required: true,
      validation: (value) => {
        if (value.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự"
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
        return null
      },
    },
    {
      name: "confirmPassword",
      label: "Nhập lại mật khẩu",
      type: "password",
      placeholder: "Nhập lại mật khẩu",
      required: true,
      validation: (value) => {
        if (value !== formData.password) return "Mật khẩu không khớp"
        return null
      },
    },
  ]

  const fields = mode === "login" ? loginFields : registerFields

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const field = fields.find((f) => f.name === name)
    if (field?.validation) {
      const error = field.validation(value)
      setErrors((prev) => ({ ...prev, [name]: error || "" }))
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      const value = formData[field.name] || ""
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} là bắt buộc`
      } else if (field.validation) {
        const error = field.validation(value)
        if (error) newErrors[field.name] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (mode === "login") {
        const result = loginWithPassword(formData.username, formData.password)
        if (!result.success) {
          setErrors({ general: result.message })
          toast.error(result.message)
          return
        }
        toast.success("Đăng nhập thành công")
        router.push("/")
      } else {
        const registerResult = registerUser({
          username: formData.username,
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          password: formData.password,
        })
        if (!registerResult.success) {
          setErrors({ general: registerResult.message })
          toast.error(registerResult.message)
          return
        }
        toast.success("Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.")
        router.push("/login")
      }
    } catch (error) {
      setErrors({ general: "Đã có lỗi xảy ra. Vui lòng thử lại." })
      toast.error("Có lỗi xảy ra. Vui lòng thử lại")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const renderPasswordField = (field: FormField) => {
    const isConfirmPassword = field.name === "confirmPassword"
    const showPasswordState = isConfirmPassword ? showConfirmPassword : showPassword
    const setShowPasswordState = isConfirmPassword ? setShowConfirmPassword : setShowPassword

    return (
      <div key={field.name} className="space-y-2">
        <Label htmlFor={field.name}>{field.label}</Label>
        <div className="relative">
          <Input
            id={field.name}
            type={showPasswordState ? "text" : "password"}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={cn(
              "pr-10 transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/60 focus:border-primary/80 focus:bg-background/80",
              errors[field.name] && "border-destructive focus-visible:ring-destructive animate-shake",
              !errors[field.name] && formData[field.name] && "border-primary/60 bg-primary/5",
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPasswordState(!showPasswordState)}
          >
            {showPasswordState ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        {/* Password strength indicator for main password field */}
        {field.name === "password" && formData.password && mode === "register" && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    i < getPasswordStrength(formData.password) ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Mật khẩu mạnh cần có chữ hoa, chữ thường, số và ký tự đặc biệt
            </p>
          </div>
        )}

        {errors[field.name] && (
          <div className="flex items-center gap-1 text-sm text-destructive">
            <X className="h-3 w-3" />
            <span>{errors[field.name]}</span>
          </div>
        )}
      </div>
    )
  }

  const renderRegularField = (field: FormField) => (
    <div key={field.name} className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Input
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        value={formData[field.name] || ""}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        className={cn(
          "transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/60 focus:border-primary/80 focus:bg-background/80",
          errors[field.name] && "border-destructive focus-visible:ring-destructive animate-shake",
          !errors[field.name] && formData[field.name] && "border-primary/60 bg-primary/5",
        )}
      />
      {errors[field.name] && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <X className="h-3 w-3" />
          <span>{errors[field.name]}</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-primary/3 rounded-full blur-lg animate-bounce"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
            <div className="relative">
              <Film className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              CyberLearn Movies
            </span>
          </Link>
          <p className="text-muted-foreground text-sm">
            {mode === "login" ? "Chào mừng bạn trở lại!" : "Tham gia cộng đồng yêu phim"}
          </p>
        </div>

        <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl shadow-primary/5 animate-slide-up">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {mode === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ TÀI KHOẢN"}
            </CardTitle>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) =>
                field.type === "password" ? renderPasswordField(field) : renderRegularField(field),
              )}

              {errors.general && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <X className="h-3 w-3" />
                  <span>{errors.general}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25" 
                size="lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Đang xử lý...
                  </div>
                ) : (
                  mode === "login" ? "Đăng nhập" : "Đăng ký"
                )}
              </Button>

              <div className="text-center text-sm">
                {mode === "login" ? (
                  <>
                    <span className="text-muted-foreground">Chưa có tài khoản? </span>
                    <Link href="/register" className="text-primary hover:underline">
                      Đăng ký ngay
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground">Đã có tài khoản? </span>
                    <Link href="/login" className="text-primary hover:underline">
                      Đăng nhập
                    </Link>
                  </>
                )}
              </div>

              {mode === "login" && (
                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
