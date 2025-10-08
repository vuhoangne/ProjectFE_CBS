"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api-client"
import { 
  Users, 
  Film, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react"

interface Stats {
  totalMovies: number
  activeMovies: number
  totalTheaters: number
  activeTheaters: number
  totalBookings: number
  todayBookings: number
  totalRevenue: number
  todayRevenue: number
  totalUsers: number
  activeUsers: number
}

interface RecentActivity {
  id: string
  type: string
  message: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

export function RealTimeDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch initial stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.getStats()
        if (response.success) {
          setStats(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Setup real-time connection
  useEffect(() => {
    // Subscribe to real-time updates
    apiClient.subscribeToUpdates()

    // Subscribe to specific events
    const unsubscribers = [
      apiClient.subscribe('connected', () => {
        setIsConnected(true)
        addActivity('system', 'Connected to real-time updates', 'success')
      }),

      apiClient.subscribe('heartbeat', () => {
        // Keep connection alive
      }),

      apiClient.subscribe('booking:created', (booking) => {
        addActivity('booking', `New booking created: ${booking.id}`, 'success')
        refreshStats()
      }),

      apiClient.subscribe('booking:updated', (booking) => {
        addActivity('booking', `Booking updated: ${booking.id} - ${booking.bookingStatus}`, 'warning')
        refreshStats()
      }),

      apiClient.subscribe('movie:created', (movie) => {
        addActivity('movie', `New movie added: ${movie.title}`, 'success')
        refreshStats()
      }),

      apiClient.subscribe('movie:updated', (movie) => {
        addActivity('movie', `Movie updated: ${movie.title}`, 'warning')
        refreshStats()
      }),

      apiClient.subscribe('showtime:created', (showtime) => {
        addActivity('showtime', `New showtime created for movie ID: ${showtime.movieId}`, 'success')
        refreshStats()
      }),

      apiClient.subscribe('showtime:updated', (showtime) => {
        addActivity('showtime', `Showtime updated: ${showtime.id}`, 'warning')
        refreshStats()
      }),

      apiClient.subscribe('user:created', (user) => {
        addActivity('user', `New user registered: ${user.username}`, 'success')
        refreshStats()
      })
    ]

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe())
      apiClient.disconnect()
      setIsConnected(false)
    }
  }, [])

  const addActivity = (type: string, message: string, status: 'success' | 'warning' | 'error') => {
    const activity: RecentActivity = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message,
      timestamp: new Date().toISOString(),
      status
    }

    setRecentActivity(prev => [activity, ...prev.slice(0, 9)]) // Keep only last 10 activities
  }

  const refreshStats = async () => {
    try {
      const response = await apiClient.getStats()
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.error('Failed to refresh stats:', error)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="h-4 w-4" />
      case 'movie': return <Film className="h-4 w-4" />
      case 'showtime': return <Clock className="h-4 w-4" />
      case 'user': return <Users className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded animate-pulse w-20"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded animate-pulse w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded animate-pulse w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6 real-time-dashboard admin-page">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Real-time Dashboard</h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <Button variant="outline" size="sm" onClick={refreshStats}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMovies}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeMovies} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Theaters</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTheaters}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeTheaters} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.todayBookings} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalRevenue.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.todayRevenue.toLocaleString('vi-VN')}đ today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.todayRevenue.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-xs text-muted-foreground">
                From {stats.todayBookings} bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Movies</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeMovies}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.activeMovies / stats.totalMovies) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Theaters</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTheaters}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.activeTheaters / stats.totalTheaters) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent activity. Real-time updates will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}