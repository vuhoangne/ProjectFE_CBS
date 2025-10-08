import Link from "next/link"
import { Home, Film } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Film className="h-24 w-24 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Không tìm thấy trang</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-pretty">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>
        <Button asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
        </Button>
      </div>
    </div>
  )
}
