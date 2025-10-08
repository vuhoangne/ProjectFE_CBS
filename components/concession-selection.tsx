"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { concessionItems, type ConcessionOrder } from "@/lib/concession-data"
import { useConcessionStore } from "@/lib/store"

export function ConcessionSelection() {
  const { concessionOrders, addItem, removeItem, updateQuantity, getTotalConcessionAmount } = useConcessionStore()

  const getItemQuantity = (itemId: number) => {
    const order = concessionOrders.find(order => order.itemId === itemId)
    return order?.quantity || 0
  }

  const handleAddItem = (itemId: number) => {
    const item = concessionItems.find(item => item.id === itemId)
    if (item) {
      addItem({
        itemId: item.id,
        quantity: 1,
        price: item.price,
        name: item.name
      })
    }
  }

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const categories = [
    { key: 'combo', label: 'Combo tiết kiệm', icon: '🍿' },
    { key: 'popcorn', label: 'Bắp rang', icon: '🍿' },
    { key: 'drink', label: 'Nước uống', icon: '🥤' },
    { key: 'snack', label: 'Đồ ăn vặt', icon: '🍟' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Chọn bắp nước</h2>
        {concessionOrders.length > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            {concessionOrders.reduce((sum, order) => sum + order.quantity, 0)} món
          </Badge>
        )}
      </div>

      <Tabs defaultValue="combo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger key={category.key} value={category.key} className="text-xs sm:text-sm">
              <span className="mr-1">{category.icon}</span>
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.label.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.key} value={category.key} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {concessionItems
                .filter(item => item.category === category.key && item.available)
                .map((item) => {
                  const quantity = getItemQuantity(item.id)
                  return (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        {/* Placeholder for image */}
                        <div className="absolute inset-0 flex items-center justify-center text-4xl">
                          {category.icon}
                        </div>
                        {quantity > 0 && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            {quantity}
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-1">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {item.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        
                        {quantity === 0 ? (
                          <Button 
                            onClick={() => handleAddItem(item.id)}
                            className="w-full"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Thêm
                          </Button>
                        ) : (
                          <div className="flex items-center justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium px-4">{quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {concessionOrders.length > 0 && (
        <Card className="bg-secondary/20">
          <CardHeader>
            <CardTitle className="text-lg">Tóm tắt đơn hàng bắp nước</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {concessionOrders.map((order) => (
              <div key={order.itemId} className="flex justify-between items-center">
                <span className="text-sm">{order.name} x{order.quantity}</span>
                <span className="font-medium">
                  {(order.price * order.quantity).toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between items-center font-bold">
              <span>Tổng bắp nước:</span>
              <span className="text-primary">
                {getTotalConcessionAmount().toLocaleString('vi-VN')}đ
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}