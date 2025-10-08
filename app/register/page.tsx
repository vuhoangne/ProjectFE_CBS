import { AuthForm } from "@/components/auth-form"
import { DebugAuth } from "@/components/debug-auth"

export const metadata = {
  title: "Đăng ký tài khoản - CyberLearn Movies",
  description: "Tạo tài khoản CyberLearn Movies để đặt vé xem phim dễ dàng",
}

export default function RegisterPage() {
  return (
    <div>
      <AuthForm mode="register" />
      <div className="container max-w-md mx-auto">
        <DebugAuth />
      </div>
    </div>
  )
}
