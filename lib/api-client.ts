// API client for frontend to communicate with backend
// Handles all HTTP requests and real-time updates

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  total?: number
  filters?: any
}

class ApiClient {
  private baseUrl: string
  private eventSource: EventSource | null = null
  private subscribers: Map<string, Set<(data: any) => void>> = new Map()

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  // Generic HTTP methods
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url)
  }

  private async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  private async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  private async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  // Movies API
  async getMovies(filters?: { status?: string, genre?: string }) {
    return this.get('/movies', filters)
  }

  async getMovie(id: number) {
    return this.get(`/movies/${id}`)
  }

  async createMovie(data: any) {
    return this.post('/movies', data)
  }

  async updateMovie(id: number, data: any) {
    return this.put(`/movies/${id}`, data)
  }

  async deleteMovie(id: number) {
    return this.delete(`/movies/${id}`)
  }

  // Theaters API
  async getTheaters(filters?: { status?: string }) {
    return this.get('/theaters', filters)
  }

  async getTheater(id: number) {
    return this.get(`/theaters/${id}`)
  }

  async createTheater(data: any) {
    return this.post('/theaters', data)
  }

  async updateTheater(id: number, data: any) {
    return this.put(`/theaters/${id}`, data)
  }

  // Showtimes API
  async getShowtimes(filters?: { movieId?: number, theaterId?: number, date?: string }) {
    return this.get('/showtimes', filters)
  }

  async getShowtime(id: number) {
    return this.get(`/showtimes/${id}`)
  }

  async createShowtime(data: any) {
    return this.post('/showtimes', data)
  }

  async updateShowtime(id: number, data: any) {
    return this.put(`/showtimes/${id}`, data)
  }

  // Bookings API
  async getBookings(filters?: { userId?: string, status?: string, date?: string }) {
    return this.get('/bookings', filters)
  }

  async getBooking(id: string) {
    return this.get(`/bookings/${id}`)
  }

  async createBooking(data: any) {
    return this.post('/bookings', data)
  }

  async updateBooking(id: string, data: any) {
    return this.put(`/bookings/${id}`, data)
  }

  async cancelBooking(id: string) {
    return this.put(`/bookings/${id}`, { bookingStatus: 'cancelled' })
  }

  // Auth API
  async login(username: string, password: string) {
    return this.post('/auth/login', { username, password })
  }

  async register(data: any) {
    return this.post('/auth/register', data)
  }

  // Admin API
  async getStats() {
    return this.get('/admin/stats')
  }

  async getUsers(filters?: { role?: string, status?: string }) {
    return this.get('/admin/users', filters)
  }

  // Real-time updates using Server-Sent Events
  subscribeToUpdates() {
    if (this.eventSource) {
      this.eventSource.close()
    }

    this.eventSource = new EventSource('/api/events')
    
    this.eventSource.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data)
        this.notifySubscribers(type, data)
      } catch (error) {
        console.error('Error parsing SSE data:', error)
      }
    }

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (this.eventSource?.readyState === EventSource.CLOSED) {
          this.subscribeToUpdates()
        }
      }, 5000)
    }
  }

  // Subscribe to specific event types
  subscribe(eventType: string, callback: (data: any) => void) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set())
    }
    this.subscribers.get(eventType)!.add(callback)

    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(eventType)
      if (subscribers) {
        subscribers.delete(callback)
        if (subscribers.size === 0) {
          this.subscribers.delete(eventType)
        }
      }
    }
  }

  private notifySubscribers(eventType: string, data: any) {
    const subscribers = this.subscribers.get(eventType)
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('Subscriber callback error:', error)
        }
      })
    }
  }

  // Cleanup
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    this.subscribers.clear()
  }
}

// Singleton instance
export const apiClient = new ApiClient()

// React hooks for easy integration
export function useApiClient() {
  return apiClient
}

// Custom hook for real-time data
export function useRealTimeData<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  eventTypes: string[] = [],
  dependencies: any[] = []
) {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Initial fetch
  React.useEffect(() => {
    let mounted = true
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetcher()
        
        if (mounted) {
          if (response.success) {
            setData(response.data || null)
          } else {
            setError(response.error || 'Failed to fetch data')
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()
    
    return () => {
      mounted = false
    }
  }, dependencies)

  // Subscribe to real-time updates
  React.useEffect(() => {
    const unsubscribers = eventTypes.map(eventType =>
      apiClient.subscribe(eventType, (updatedData) => {
        // Refetch data when relevant events occur
        fetcher().then(response => {
          if (response.success) {
            setData(response.data || null)
          }
        })
      })
    )

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe())
    }
  }, [eventTypes.join(','), ...dependencies])

  return { data, loading, error, refetch: () => fetcher() }
}

// Import React for hooks
import * as React from 'react'