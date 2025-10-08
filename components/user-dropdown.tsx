"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, User, Settings, LogOut, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import { toast } from "sonner"

export function UserDropdown() {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    toast.success("Đã đăng xuất")
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">
            {user?.fullName || user?.username || "Người dùng"}
          </span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-border">
            <p className="font-medium text-sm">{user?.fullName || user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              Hồ sơ cá nhân
            </Link>
            
            <Link
              href="/profile/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Cài đặt tài khoản
            </Link>
            
            <Link
              href="/profile/bookings"
              className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <History className="h-4 w-4" />
              Lịch sử đặt vé
            </Link>
          </div>
          
          <div className="border-t border-border py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}