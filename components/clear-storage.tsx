"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ClearStorage() {
  const clearAllStorage = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.reload()
  }

  return (
    <Card className="mt-4 border-red-200">
      <CardHeader>
        <CardTitle className="text-sm text-red-600">Debug Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={clearAllStorage} 
          variant="destructive" 
          size="sm"
          className="w-full"
        >
          Clear All Storage & Reload
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Xóa tất cả dữ liệu lưu trữ và tải lại trang
        </p>
      </CardContent>
    </Card>
  )
}