"use client"

import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugAuth() {
  const { registeredUsers, clearAllUsers } = useAuthStore()

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Debug Auth (Chỉ để test)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Registered Users ({registeredUsers.length}):</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {registeredUsers.map((user) => (
              <div key={user.id} className="text-xs p-2 bg-muted rounded">
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
              </div>
            ))}
          </div>
        </div>
        <Button 
          onClick={clearAllUsers} 
          variant="destructive" 
          size="sm"
        >
          Clear All Users (Reset)
        </Button>
      </CardContent>
    </Card>
  )
}