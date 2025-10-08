import { AuthForm } from "@/components/auth-form"
import { ClearStorage } from "@/components/clear-storage"

export const metadata = {
  title: "Đăng nhập - CyberLearn Movies",
  description: "Đăng nhập vào tài khoản CyberLearn Movies để đặt vé xem phim",
}

export default function LoginPage() {
  return (
    <div>
      <AuthForm mode="login" />
      <div className="container max-w-md mx-auto">
        <ClearStorage />
      </div>
    </div>
  )
}
