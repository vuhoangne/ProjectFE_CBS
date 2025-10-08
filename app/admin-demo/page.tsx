"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Settings,
  Eye,
  Phone,
  Mail,
  MapPin,
  Gift,
  Users,
  BarChart3,
  TestTube,
  ExternalLink,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function AdminDemoPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const demoSteps = [
    {
      id: 1,
      title: "Quản lý thông tin liên hệ",
      description: "Cập nhật số điện thoại, email, địa chỉ từ admin panel",
      icon: <Phone className="h-5 w-5" />,
      links: [
        {
          label: "Admin Panel",
          href: "/admin/contact",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          label: "Demo",
          href: "/demo-contact",
          icon: <Eye className="h-4 w-4" />,
        },
        {
          label: "Test API",
          href: "/test-contact",
          icon: <TestTube className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 2,
      title: "Newsletter Modal",
      description: "Popup đăng ký nhận ưu đãi với thông tin liên hệ động",
      icon: <Gift className="h-5 w-5" />,
      links: [
        {
          label: "Demo Modal",
          href: "/demo-newsletter",
          icon: <Eye className="h-4 w-4" />,
        },
        {
          label: "Trang chủ (Auto)",
          href: "/",
          icon: <ExternalLink className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 3,
      title: "Admin Dashboard",
      description: "Quản lý phim, rạp, người dùng, đặt vé",
      icon: <BarChart3 className="h-5 w-5" />,
      links: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: <BarChart3 className="h-4 w-4" />,
        },
        {
          label: "Quản lý phim",
          href: "/admin/movies",
          icon: <Settings className="h-4 w-4" />,
        },
        {
          label: "Quản lý người dùng",
          href: "/admin/users",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
  ];

  const features = [
    {
      title: "Real-time Updates",
      description: "Thông tin cập nhật ngay lập tức trên toàn website",
      icon: "⚡",
      status: "active",
    },
    {
      title: "Dynamic Contact Info",
      description: "Quản lý thông tin liên hệ từ admin panel",
      icon: "📞",
      status: "active",
    },
    {
      title: "Newsletter System",
      description: "Modal đăng ký với thông tin liên hệ tự động",
      icon: "📧",
      status: "active",
    },
    {
      title: "Social Media Links",
      description: "Quản lý liên kết Facebook, Instagram, YouTube",
      icon: "🔗",
      status: "active",
    },
    {
      title: "API Integration",
      description: "RESTful API cho tất cả tính năng",
      icon: "🔌",
      status: "active",
    },
    {
      title: "Responsive Design",
      description: "Giao diện đẹp trên mọi thiết bị",
      icon: "📱",
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🎬 CyberLearn Movies - Admin Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hệ thống quản lý thông tin liên hệ và newsletter hoàn chỉnh với giao
            diện admin hiện đại
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/admin">
              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                Vào Admin Panel
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Xem Website
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">🚀 Hướng dẫn Demo</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {demoSteps.map((step) => (
              <Card key={step.id} className="relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {step.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {completedSteps.includes(step.id) && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {step.links.map((link, index) => (
                    <Link key={index} href={link.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-between group"
                        onClick={() => markStepComplete(step.id)}
                      >
                        <div className="flex items-center gap-2">
                          {link.icon}
                          {link.label}
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            ✨ Tính năng nổi bật
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        ✅ Hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">⚡ Thao tác nhanh</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/contact">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-2">
                  <Phone className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Sửa liên hệ</h3>
                  <p className="text-xs text-muted-foreground">
                    Cập nhật thông tin
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/demo-newsletter">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-2">
                  <Gift className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Test Modal</h3>
                  <p className="text-xs text-muted-foreground">
                    Xem popup ưu đãi
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/admin">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Dashboard</h3>
                  <p className="text-xs text-muted-foreground">
                    Quản lý hệ thống
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/test-contact">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center space-y-2">
                  <TestTube className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Test API</h3>
                  <p className="text-xs text-muted-foreground">Kiểm tra API</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">
            Tiến độ demo: {completedSteps.length}/{demoSteps.length}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(completedSteps.length / demoSteps.length) * 100}%`,
              }}
            ></div>
          </div>
          {completedSteps.length === demoSteps.length && (
            <div className="text-green-600 font-semibold">
              🎉 Hoàn thành tất cả demo!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
