"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Film, 
  Calendar, 
  Users, 
  MapPin,
  Plus,
  Send,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react"

export function ApiTest() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const addResult = (operation: string, success: boolean, data: any, error?: string) => {
    const result = {
      id: Date.now(),
      operation,
      success,
      data,
      error,
      timestamp: new Date().toISOString()
    }
    setResults(prev => [result, ...prev.slice(0, 9)]) // Keep last 10 results
  }

  // Test creating a movie
  const testCreateMovie = async () => {
    setLoading(true)
    try {
      const movieData = {
        title: `Test Movie ${Date.now()}`,
        titleEn: `Test Movie EN ${Date.now()}`,
        poster: "https://image.tmdb.org/t/p/original/test.jpg",
        genre: ["Action", "Drama"],
        duration: 120,
        rating: 8.5,
        director: "Test Director",
        cast: ["Actor 1", "Actor 2"],
        synopsis: "This is a test movie created via API",
        releaseDate: new Date().toISOString().split('T')[0],
        status: "active"
      }

      const response = await apiClient.createMovie(movieData)
      addResult("Create Movie", response.success, response.data, response.error)
    } catch (error) {
      addResult("Create Movie", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Test creating a theater
  const testCreateTheater = async () => {
    setLoading(true)
    try {
      const theaterData = {
        name: `Test Theater ${Date.now()}`,
        location: "123 Test Street, Test City",
        logo: "/placeholder.svg",
        capacity: 200,
        facilities: ["IMAX", "3D", "Dolby Atmos"],
        status: "active"
      }

      const response = await apiClient.createTheater(theaterData)
      addResult("Create Theater", response.success, response.data, response.error)
    } catch (error) {
      addResult("Create Theater", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Test creating a showtime
  const testCreateShowtime = async () => {
    setLoading(true)
    try {
      const showtimeData = {
        movieId: 1, // Assuming movie ID 1 exists
        theaterId: 1, // Assuming theater ID 1 exists
        date: new Date().toISOString().split('T')[0],
        time: "19:30",
        price: {
          regular: 80000,
          vip: 120000
        },
        seats: {
          total: 100,
          available: 100,
          booked: 0
        },
        status: "active"
      }

      const response = await apiClient.createShowtime(showtimeData)
      addResult("Create Showtime", response.success, response.data, response.error)
    } catch (error) {
      addResult("Create Showtime", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Test creating a booking
  const testCreateBooking = async () => {
    setLoading(true)
    try {
      const bookingData = {
        userId: "USER123",
        showtimeId: 1, // Assuming showtime ID 1 exists
        seats: ["A1", "A2"],
        totalAmount: 160000,
        customerInfo: {
          name: "Test Customer",
          email: "test@example.com",
          phone: "0123456789"
        },
        paymentMethod: "credit_card"
      }

      const response = await apiClient.createBooking(bookingData)
      addResult("Create Booking", response.success, response.data, response.error)
    } catch (error) {
      addResult("Create Booking", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Test user registration
  const testRegisterUser = async () => {
    setLoading(true)
    try {
      const userData = {
        username: `testuser${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        fullName: "Test User",
        phone: "0123456789",
        password: "password123"
      }

      const response = await apiClient.register(userData)
      addResult("Register User", response.success, response.data, response.error)
    } catch (error) {
      addResult("Register User", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Test fetching data
  const testFetchMovies = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getMovies()
      addResult("Fetch Movies", response.success, response.data, response.error)
    } catch (error) {
      addResult("Fetch Movies", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const testFetchBookings = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getBookings()
      addResult("Fetch Bookings", response.success, response.data, response.error)
    } catch (error) {
      addResult("Fetch Bookings", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const testFetchStats = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getStats()
      addResult("Fetch Stats", response.success, response.data, response.error)
    } catch (error) {
      addResult("Fetch Stats", false, null, error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 api-test-interface admin-page">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API Testing Interface</h2>
        <Badge variant="outline">
          Real-time API Testing
        </Badge>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Data</TabsTrigger>
          <TabsTrigger value="fetch">Fetch Data</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Film className="h-5 w-5" />
                  Create Movie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testCreateMovie} 
                  disabled={loading}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test Movie
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  Create Theater
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testCreateTheater} 
                  disabled={loading}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test Theater
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Create Showtime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testCreateShowtime} 
                  disabled={loading}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test Showtime
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Create Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testCreateBooking} 
                  disabled={loading}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test Booking
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Register User
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testRegisterUser} 
                  disabled={loading}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Register Test User
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fetch" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Film className="h-5 w-5" />
                  Fetch Movies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testFetchMovies} 
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Get All Movies
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Fetch Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testFetchBookings} 
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Get All Bookings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Fetch Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testFetchStats} 
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Get Statistics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>API Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No test results yet. Run some API tests above.
            </p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <div key={result.id} className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium">{result.operation}</span>
                    </div>
                    <Badge variant={result.success ? "default" : "destructive"}>
                      {result.success ? "Success" : "Error"}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(result.timestamp).toLocaleString('vi-VN')}
                  </p>

                  {result.error && (
                    <p className="text-sm text-red-600 mb-2">{result.error}</p>
                  )}

                  {result.data && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                        View Response Data
                      </summary>
                      <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}