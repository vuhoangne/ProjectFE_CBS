// In-memory database for real-time data management
// In production, this would be replaced with a real database like PostgreSQL, MongoDB, etc.

export interface Movie {
  id: number
  title: string
  titleEn: string
  poster: string
  genre: string[]
  duration: number
  rating: number
  director: string
  cast: string[]
  synopsis: string
  releaseDate: string
  status: 'active' | 'inactive' | 'coming_soon'
  createdAt: string
  updatedAt: string
}

export interface Theater {
  id: number
  name: string
  location: string
  logo: string
  capacity: number
  facilities: string[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Showtime {
  id: number
  movieId: number
  theaterId: number
  date: string
  time: string
  price: {
    regular: number
    vip: number
  }
  seats: {
    total: number
    available: number
    booked: number
  }
  status: 'active' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  showtimeId: number
  movieId: number
  theaterId: number
  seats: string[]
  totalAmount: number
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  bookingStatus: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  phone: string
  role: 'customer' | 'admin'
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  website: string
  facebook: string
  instagram: string
  youtube: string
  description: string
  updatedAt: string
}

// In-memory storage
class Database {
  private movies: Movie[] = []
  private theaters: Theater[] = []
  private showtimes: Showtime[] = []
  private bookings: Booking[] = []
  private users: User[] = []
  private contactInfo: ContactInfo
  private subscribers: Set<(event: string, data: any) => void> = new Set()

  constructor() {
    // Initialize contact info with default values
    this.contactInfo = {
      phone: "1900 6017",
      email: "support@cyberlearn.vn",
      address: "Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM",
      website: "https://cyberlearn.vn",
      facebook: "https://facebook.com/cyberlearn",
      instagram: "https://instagram.com/cyberlearn",
      youtube: "https://youtube.com/cyberlearn",
      description: "Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam",
      updatedAt: new Date().toISOString()
    }
    this.loadPersistedData()
    this.initializeData()
  }

  private loadPersistedData() {
    try {
      // Load contact info from persistent storage if available
      const { persistentStorage } = require('./persistent-storage')
      const savedContactInfo = persistentStorage.loadContactInfo()
      if (savedContactInfo) {
        this.contactInfo = savedContactInfo
        console.log('[Database] Loaded contact info from persistent storage')
      }
    } catch (error) {
      console.log('[Database] No persistent data found, using defaults')
    }
  }

  // Event system for real-time updates
  subscribe(callback: (event: string, data: any) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  emit(event: string, data: any) {
    this.subscribers.forEach(callback => {
      try {
        callback(event, data)
      } catch (error) {
        console.error('Subscriber error:', error)
      }
    })
  }

  // Contact Info
  getContactInfo() {
    return this.contactInfo
  }

  updateContactInfo(data: Partial<Omit<ContactInfo, 'updatedAt'>>) {
    this.contactInfo = {
      ...this.contactInfo,
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    // Save to persistent storage
    try {
      const { persistentStorage } = require('./persistent-storage')
      persistentStorage.saveContactInfo(this.contactInfo)
      console.log('[Database] Contact info saved to persistent storage')
    } catch (error) {
      console.error('[Database] Error saving to persistent storage:', error)
    }
    
    this.emit('contact:updated', this.contactInfo)
    return this.contactInfo
  }

  // Movies
  getMovies(filters?: { status?: string, genre?: string }) {
    let result = this.movies
    if (filters?.status) {
      result = result.filter(movie => movie.status === filters.status)
    }
    if (filters?.genre) {
      result = result.filter(movie => movie.genre.includes(filters.genre))
    }
    return result
  }

  getMovie(id: number) {
    return this.movies.find(movie => movie.id === id)
  }

  createMovie(data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>) {
    const movie: Movie = {
      ...data,
      id: Math.max(0, ...this.movies.map(m => m.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.movies.push(movie)
    this.emit('movie:created', movie)
    return movie
  }

  updateMovie(id: number, data: Partial<Movie>) {
    const index = this.movies.findIndex(movie => movie.id === id)
    if (index === -1) return null
    
    this.movies[index] = {
      ...this.movies[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    this.emit('movie:updated', this.movies[index])
    return this.movies[index]
  }

  deleteMovie(id: number) {
    const index = this.movies.findIndex(movie => movie.id === id)
    if (index === -1) return false
    
    const movie = this.movies[index]
    this.movies.splice(index, 1)
    this.emit('movie:deleted', movie)
    return true
  }

  // Theaters
  getTheaters(filters?: { status?: string }) {
    let result = this.theaters
    if (filters?.status) {
      result = result.filter(theater => theater.status === filters.status)
    }
    return result
  }

  getTheater(id: number) {
    return this.theaters.find(theater => theater.id === id)
  }

  createTheater(data: Omit<Theater, 'id' | 'createdAt' | 'updatedAt'>) {
    const theater: Theater = {
      ...data,
      id: Math.max(0, ...this.theaters.map(t => t.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.theaters.push(theater)
    this.emit('theater:created', theater)
    return theater
  }

  // Showtimes
  getShowtimes(filters?: { movieId?: number, theaterId?: number, date?: string }) {
    let result = this.showtimes
    if (filters?.movieId) {
      result = result.filter(showtime => showtime.movieId === filters.movieId)
    }
    if (filters?.theaterId) {
      result = result.filter(showtime => showtime.theaterId === filters.theaterId)
    }
    if (filters?.date) {
      result = result.filter(showtime => showtime.date === filters.date)
    }
    return result
  }

  getShowtime(id: number) {
    return this.showtimes.find(showtime => showtime.id === id)
  }

  createShowtime(data: Omit<Showtime, 'id' | 'createdAt' | 'updatedAt'>) {
    const showtime: Showtime = {
      ...data,
      id: Math.max(0, ...this.showtimes.map(s => s.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.showtimes.push(showtime)
    this.emit('showtime:created', showtime)
    return showtime
  }

  updateShowtime(id: number, data: Partial<Showtime>) {
    const index = this.showtimes.findIndex(showtime => showtime.id === id)
    if (index === -1) return null
    
    this.showtimes[index] = {
      ...this.showtimes[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    this.emit('showtime:updated', this.showtimes[index])
    return this.showtimes[index]
  }

  // Bookings
  getBookings(filters?: { userId?: string, status?: string, date?: string }) {
    let result = this.bookings
    if (filters?.userId) {
      result = result.filter(booking => booking.userId === filters.userId)
    }
    if (filters?.status) {
      result = result.filter(booking => booking.bookingStatus === filters.status)
    }
    if (filters?.date) {
      result = result.filter(booking => booking.createdAt.startsWith(filters.date))
    }
    return result
  }

  getBooking(id: string) {
    return this.bookings.find(booking => booking.id === id)
  }

  createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) {
    const booking: Booking = {
      ...data,
      id: `BK${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.bookings.push(booking)
    
    // Update showtime seats
    const showtime = this.getShowtime(booking.showtimeId)
    if (showtime) {
      this.updateShowtime(booking.showtimeId, {
        seats: {
          ...showtime.seats,
          available: showtime.seats.available - booking.seats.length,
          booked: showtime.seats.booked + booking.seats.length
        }
      })
    }
    
    this.emit('booking:created', booking)
    return booking
  }

  updateBooking(id: string, data: Partial<Booking>) {
    const index = this.bookings.findIndex(booking => booking.id === id)
    if (index === -1) return null
    
    const oldBooking = this.bookings[index]
    this.bookings[index] = {
      ...oldBooking,
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    // Handle seat updates if booking is cancelled
    if (data.bookingStatus === 'cancelled' && oldBooking.bookingStatus !== 'cancelled') {
      const showtime = this.getShowtime(oldBooking.showtimeId)
      if (showtime) {
        this.updateShowtime(oldBooking.showtimeId, {
          seats: {
            ...showtime.seats,
            available: showtime.seats.available + oldBooking.seats.length,
            booked: showtime.seats.booked - oldBooking.seats.length
          }
        })
      }
    }
    
    this.emit('booking:updated', this.bookings[index])
    return this.bookings[index]
  }

  // Users
  getUsers(filters?: { role?: string, status?: string }) {
    let result = this.users
    if (filters?.role) {
      result = result.filter(user => user.role === filters.role)
    }
    if (filters?.status) {
      result = result.filter(user => user.status === filters.status)
    }
    return result
  }

  getUser(id: string) {
    return this.users.find(user => user.id === id)
  }

  getUserByUsername(username: string) {
    return this.users.find(user => user.username === username)
  }

  createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    const user: User = {
      ...data,
      id: `USER${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.users.push(user)
    this.emit('user:created', user)
    return user
  }

  // Statistics for admin
  getStats() {
    const today = new Date().toISOString().split('T')[0]
    const todayBookings = this.bookings.filter(b => b.createdAt.startsWith(today))
    
    return {
      totalMovies: this.movies.length,
      activeMovies: this.movies.filter(m => m.status === 'active').length,
      totalTheaters: this.theaters.length,
      activeTheaters: this.theaters.filter(t => t.status === 'active').length,
      totalBookings: this.bookings.length,
      todayBookings: todayBookings.length,
      totalRevenue: this.bookings
        .filter(b => b.paymentStatus === 'completed')
        .reduce((sum, b) => sum + b.totalAmount, 0),
      todayRevenue: todayBookings
        .filter(b => b.paymentStatus === 'completed')
        .reduce((sum, b) => sum + b.totalAmount, 0),
      totalUsers: this.users.length,
      activeUsers: this.users.filter(u => u.status === 'active').length
    }
  }

  private initializeData() {
    // Initialize with mock data from existing mock-data.ts
    // This would be replaced with actual database seeding in production
    
    // Add default admin user
    this.createUser({
      username: 'admin',
      email: 'admin@moviebooking.com',
      fullName: 'System Administrator',
      phone: '0123456789',
      role: 'admin',
      status: 'active'
    })

    // Add sample customer user
    this.createUser({
      username: 'customer',
      email: 'customer@example.com',
      fullName: 'Test Customer',
      phone: '0987654321',
      role: 'customer',
      status: 'active'
    })

    // Initialize sample movies
    const sampleMovies = [
      {
        title: "Avengers: Endgame",
        titleEn: "Avengers: Endgame",
        poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
        duration: 181,
        rating: 8.4,
        director: "Anthony Russo, Joe Russo",
        cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
        synopsis: "Sau sự kiện của Infinity War, vũ trụ đang trong tình trạng hỗn loạn...",
        releaseDate: "2019-04-26",
        status: 'active' as const
      },
      {
        title: "Spider-Man: No Way Home",
        titleEn: "Spider-Man: No Way Home",
        poster: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
        duration: 148,
        rating: 8.2,
        director: "Jon Watts",
        cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
        synopsis: "Peter Parker phải đối mặt với những hậu quả khi danh tính được tiết lộ...",
        releaseDate: "2021-12-17",
        status: 'active' as const
      }
    ]

    sampleMovies.forEach(movie => this.createMovie(movie))

    // Initialize sample theaters
    const sampleTheaters = [
      {
        name: "CGV Vincom Center",
        location: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
        logo: "/cgv-logo.svg",
        capacity: 200,
        facilities: ["IMAX", "4DX", "Dolby Atmos"],
        status: 'active' as const
      },
      {
        name: "Galaxy Cinema Nguyễn Du",
        location: "116 Nguyễn Du, Hai Bà Trưng, Hà Nội",
        logo: "/galaxy-logo.svg",
        capacity: 180,
        facilities: ["3D", "Dolby Atmos"],
        status: 'active' as const
      }
    ]

    sampleTheaters.forEach(theater => this.createTheater(theater))

    // Initialize sample showtimes
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    const sampleShowtimes = [
      {
        movieId: 1,
        theaterId: 1,
        date: today,
        time: "14:30",
        price: { regular: 80000, vip: 120000 },
        seats: { total: 100, available: 95, booked: 5 },
        status: 'active' as const
      },
      {
        movieId: 1,
        theaterId: 1,
        date: today,
        time: "19:30",
        price: { regular: 90000, vip: 130000 },
        seats: { total: 100, available: 88, booked: 12 },
        status: 'active' as const
      },
      {
        movieId: 2,
        theaterId: 2,
        date: tomorrow,
        time: "16:00",
        price: { regular: 85000, vip: 125000 },
        seats: { total: 80, available: 80, booked: 0 },
        status: 'active' as const
      }
    ]

    sampleShowtimes.forEach(showtime => this.createShowtime(showtime))

    // Create some sample bookings
    this.createBooking({
      userId: "USER123",
      showtimeId: 1,
      movieId: 1,
      theaterId: 1,
      seats: ["A1", "A2"],
      totalAmount: 160000,
      customerInfo: {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0123456789"
      },
      paymentMethod: "credit_card",
      paymentStatus: "completed",
      bookingStatus: "confirmed"
    })

    console.log("[Database] Initialized with sample data")
  }
}

// Singleton instance
export const database = new Database()