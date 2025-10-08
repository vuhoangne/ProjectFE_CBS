"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Film, Ticket, Users, Settings, Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/movies", icon: Film, label: "Quản lý phim" },
  { href: "/admin/bookings", icon: Ticket, label: "Quản lý đặt vé" },
  { href: "/admin/users", icon: Users, label: "Quản lý người dùng" },
  { href: "/admin/contact", icon: Phone, label: "Thông tin liên hệ" },
  { href: "/admin/settings", icon: Settings, label: "Cài đặt" },
]

export default function SimpleAdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <div className="fixed top-0 right-0 left-0 lg:left-64 z-50 bg-card/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="hidden lg:block"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">A</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@cinema.vn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Film className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">CyberLearn Movies</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {adminNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 pt-16">
        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}