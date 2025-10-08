"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserDropdown } from "@/components/user-dropdown"
import { useAuthStore, useUIStore } from "@/lib/store"

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="nav-container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-4 group cursor-pointer-important">
          <Film className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-200" />
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CyberLearn Movies
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12 flex-1 justify-center">
          <Link 
            href="/" 
            className={`transition-all duration-300 font-semibold text-xl relative group px-4 py-2 rounded-full cursor-pointer-important ${
              isActive('/') 
                ? 'text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 glow' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Trang chủ
            {!isActive('/') && (
              <span className="absolute -bottom-1 left-4 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-[calc(100%-2rem)]"></span>
            )}
          </Link>
          <Link 
            href="/theaters" 
            className={`transition-all duration-300 font-semibold text-xl relative group px-4 py-2 rounded-full cursor-pointer-important ${
              isActive('/theaters') 
                ? 'text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 glow' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Rạp chiếu
            {!isActive('/theaters') && (
              <span className="absolute -bottom-1 left-4 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-[calc(100%-2rem)]"></span>
            )}
          </Link>
          <Link 
            href="/contact" 
            className={`transition-all duration-300 font-semibold text-xl relative group px-4 py-2 rounded-full cursor-pointer-important ${
              isActive('/contact') 
                ? 'text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 glow' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Liên hệ
            {!isActive('/contact') && (
              <span className="absolute -bottom-1 left-4 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-[calc(100%-2rem)]"></span>
            )}
          </Link>
        </nav>

        {/* User Actions - Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="px-6 py-2 text-base"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--primary))'
                  e.currentTarget.style.color = 'hsl(var(--primary-foreground))'
                  e.currentTarget.style.borderColor = 'hsl(var(--primary))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'hsl(var(--foreground))'
                  e.currentTarget.style.borderColor = 'hsl(var(--border))'
                }}
              >
                <Link href="/register">Đăng ký</Link>
              </Button>
              <Button size="lg" asChild className="px-6 py-2 text-base">
                <Link href="/login">Đăng nhập</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 space-y-4">
            <Link
              href="/"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Trang chủ
            </Link>
            <Link
              href="/theaters"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Rạp chiếu
            </Link>
            <Link
              href="/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              Liên hệ
            </Link>

            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-muted-foreground">Xin chào, {user?.fullName || user?.username}</p>
                  <Link
                    href="/profile"
                    className="block text-foreground hover:text-primary transition-colors py-2"
                    onClick={toggleMobileMenu}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="block text-foreground hover:text-primary transition-colors py-2"
                    onClick={toggleMobileMenu}
                  >
                    Cài đặt tài khoản
                  </Link>
                  <Link
                    href="/profile/bookings"
                    className="block text-foreground hover:text-primary transition-colors py-2"
                    onClick={toggleMobileMenu}
                  >
                    Lịch sử đặt vé
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { logout(); toggleMobileMenu(); }} 
                    className="w-full mt-2"
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-full"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(var(--primary))'
                      e.currentTarget.style.color = 'hsl(var(--primary-foreground))'
                      e.currentTarget.style.borderColor = 'hsl(var(--primary))'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'hsl(var(--foreground))'
                      e.currentTarget.style.borderColor = 'hsl(var(--border))'
                    }}
                  >
                    <Link href="/register" onClick={toggleMobileMenu}>
                      Đăng ký
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <Link href="/login" onClick={toggleMobileMenu}>
                      Đăng nhập
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
