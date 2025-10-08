import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Movie, Theater, Showtime } from "./mock-data"
import type { ConcessionOrder } from "./concession-data"

interface User {
  id: number
  username: string
  email: string
  fullName: string
  phone: string
}

interface RegisteredUser extends User {
  password: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  registeredUsers: RegisteredUser[]
  registerUser: (user: Omit<RegisteredUser, 'id'>) => { success: boolean; message: string }
  login: (user: User) => void
  loginWithPassword: (identifier: string, password: string) => { success: boolean; user?: User; message: string }
  logout: () => void
  clearAllUsers: () => void
}

interface Booking {
  id: string
  userId: number
  showtimeId: number
  seats: string[]
  seatAmount: number
  concessionOrders: ConcessionOrder[]
  concessionAmount: number
  totalAmount: number
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  paymentMethod: string
}

interface BookingStore {
  selectedMovie: Movie | null
  selectedShowtime: Showtime | null
  selectedTheater: Theater | null
  selectedSeats: string[]
  seatAmount: number
  totalAmount: number
  setSelectedMovie: (movie: Movie) => void
  setSelectedShowtime: (showtime: Showtime) => void
  setSelectedTheater: (theater: Theater) => void
  addSeat: (seat: string) => void
  removeSeat: (seat: string) => void
  clearBooking: () => void
  calculateSeatTotal: (regularPrice: number, vipPrice: number, vipRows: number[]) => void
  calculateGrandTotal: (concessionAmount: number) => void
}

interface ConcessionStore {
  concessionOrders: ConcessionOrder[]
  addItem: (item: ConcessionOrder) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearConcession: () => void
  getTotalConcessionAmount: () => number
}

interface BookingManagementStore {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void
  getBookingsByUser: (userId: number) => Booking[]
  getBookingsByDate: (date: string) => Booking[]
  getTotalRevenue: () => number
}

interface UIStore {
  isLoading: boolean
  isMobileMenuOpen: boolean
  setLoading: (loading: boolean) => void
  toggleMobileMenu: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [
        // Tài khoản test mặc định
        {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
          phone: '0901234567',
          password: '123456'
        }
      ],
      registerUser: (payload) => {
        const users = get().registeredUsers
        const normalizedUsername = payload.username.trim().toLowerCase()
        const normalizedEmail = payload.email.trim().toLowerCase()
        
        const exists = users.some(
          (u) => u.username.toLowerCase().trim() === normalizedUsername || u.email.toLowerCase().trim() === normalizedEmail,
        )
        
        if (exists) {
          return { success: false, message: 'Tên đăng nhập hoặc email đã tồn tại' }
        }
        
        const newUser: RegisteredUser = { 
          id: Date.now(), 
          ...payload,
          username: payload.username.trim(),
          email: payload.email.trim().toLowerCase()
        }
        set({ registeredUsers: [...users, newUser] })
        return { success: true, message: 'Đăng ký thành công' }
      },
      login: (user) => set({ user, isAuthenticated: true }),
      loginWithPassword: (identifier, password) => {
        const normalizedId = identifier.trim().toLowerCase()
        const providedPw = String(password || '').trim()
        
        if (!normalizedId || !providedPw) {
          return { success: false, message: 'Vui lòng nhập đầy đủ thông tin' }
        }
        
        // Admin test account
        if (normalizedId === 'admin' && providedPw === '123456') {
          const adminUser: User = {
            id: 0,
            username: 'admin',
            email: 'admin@example.com',
            fullName: 'Admin',
            phone: '0000000000',
          }
          set({ user: adminUser, isAuthenticated: true })
          return { success: true, user: adminUser, message: 'Đăng nhập thành công' }
        }
        
        const users = get().registeredUsers
        
        const found = users.find(
          (u) => u.username.toLowerCase().trim() === normalizedId || u.email.toLowerCase().trim() === normalizedId,
        )
        
        if (!found) {
          return { success: false, message: 'Tài khoản không tồn tại. Vui lòng đăng ký.' }
        }
        
        if (found.password.trim() !== providedPw) {
          return { success: false, message: 'Mật khẩu không đúng' }
        }
        
        const { password: _pw, ...sanitized } = found
        set({ user: sanitized, isAuthenticated: true })
        return { success: true, user: sanitized, message: 'Đăng nhập thành công' }
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      clearAllUsers: () => set({ registeredUsers: [] }), // Debug function to clear all users
    }),
    {
      name: "auth-storage",
    },
  ),
)

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
  selectedMovie: null,
  selectedShowtime: null,
  selectedTheater: null,
  selectedSeats: [],
  seatAmount: 0,
  totalAmount: 0,
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
  setSelectedShowtime: (showtime) => set({ selectedShowtime: showtime }),
  setSelectedTheater: (theater) => set({ selectedTheater: theater }),
  addSeat: (seat) => {
    const { selectedSeats } = get()
    if (selectedSeats.length < 8 && !selectedSeats.includes(seat)) {
      set({ selectedSeats: [...selectedSeats, seat] })
    }
  },
  removeSeat: (seat) => {
    const { selectedSeats } = get()
    set({ selectedSeats: selectedSeats.filter((s) => s !== seat) })
  },
  clearBooking: () =>
    set({
      selectedMovie: null,
      selectedShowtime: null,
      selectedTheater: null,
      selectedSeats: [],
      seatAmount: 0,
      totalAmount: 0,
    }),
  calculateSeatTotal: (regularPrice, vipPrice, vipRows) => {
    const { selectedSeats } = get()
    const seatTotal = selectedSeats.reduce((sum, seat) => {
      const row = seat.charAt(0)
      const rowIndex = row.charCodeAt(0) - 65 // A=0, B=1, etc.
      const isVip = vipRows.includes(rowIndex)
      return sum + (isVip ? vipPrice : regularPrice)
    }, 0)
    set({ seatAmount: seatTotal })
  },
  calculateGrandTotal: (concessionAmount) => {
    const { seatAmount } = get()
    set({ totalAmount: seatAmount + concessionAmount })
  },
}),
{
  name: "booking-storage",
}
)
)

export const useConcessionStore = create<ConcessionStore>()(
  persist(
    (set, get) => ({
      concessionOrders: [],
      addItem: (item) => {
        const { concessionOrders } = get()
        const existingIndex = concessionOrders.findIndex(order => order.itemId === item.itemId)
        
        if (existingIndex >= 0) {
          const updatedOrders = [...concessionOrders]
          updatedOrders[existingIndex].quantity += item.quantity
          set({ concessionOrders: updatedOrders })
        } else {
          set({ concessionOrders: [...concessionOrders, item] })
        }
      },
      removeItem: (itemId) => {
        const { concessionOrders } = get()
        set({ concessionOrders: concessionOrders.filter(order => order.itemId !== itemId) })
      },
      updateQuantity: (itemId, quantity) => {
        const { concessionOrders } = get()
        if (quantity <= 0) {
          set({ concessionOrders: concessionOrders.filter(order => order.itemId !== itemId) })
        } else {
          const updatedOrders = concessionOrders.map(order =>
            order.itemId === itemId ? { ...order, quantity } : order
          )
          set({ concessionOrders: updatedOrders })
        }
      },
      clearConcession: () => set({ concessionOrders: [] }),
      getTotalConcessionAmount: () => {
        const { concessionOrders } = get()
        return concessionOrders.reduce((total, order) => total + (order.price * order.quantity), 0)
      },
    }),
    {
      name: "concession-storage",
    }
  )
)

export const useBookingManagementStore = create<BookingManagementStore>()(
  persist(
    (set, get) => ({
      bookings: [
        {
          id: "BK001",
          userId: 1,
          showtimeId: 1,
          seats: ["A5", "A6"],
          seatAmount: 150000,
          concessionOrders: [
            { itemId: 8, quantity: 1, price: 95000, name: "Combo Sweet (1 bắp M + 1 nước M)" }
          ],
          concessionAmount: 95000,
          totalAmount: 245000,
          status: "confirmed",
          createdAt: new Date().toISOString(),
          customerInfo: {
            name: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            phone: "0901234567",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "BK002",
          userId: 2,
          showtimeId: 6,
          seats: ["C10", "C11", "C12"],
          seatAmount: 240000,
          concessionOrders: [
            { itemId: 2, quantity: 2, price: 65000, name: "Bắp rang bơ (Size M)" },
            { itemId: 5, quantity: 2, price: 45000, name: "Coca Cola (Size M)" }
          ],
          concessionAmount: 220000,
          totalAmount: 460000,
          status: "confirmed",
          createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          customerInfo: {
            name: "Trần Thị B",
            email: "tranthib@email.com",
            phone: "0912345678",
          },
          paymentMethod: "bank_transfer",
        },
        {
          id: "BK003",
          userId: 3,
          showtimeId: 10,
          seats: ["H8", "H9"],
          seatAmount: 270000,
          concessionOrders: [],
          concessionAmount: 0,
          totalAmount: 270000,
          status: "completed",
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          customerInfo: {
            name: "Lê Văn C",
            email: "levanc@email.com",
            phone: "0923456789",
          },
          paymentMethod: "e_wallet",
        },
      ],
      addBooking: (bookingData) => {
        const newBooking: Booking = {
          ...bookingData,
          id: `BK${String(Date.now()).slice(-6)}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ bookings: [...state.bookings, newBooking] }))
      },
      updateBookingStatus: (bookingId, status) => {
        set((state) => ({
          bookings: state.bookings.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)),
        }))
      },
      getBookingsByUser: (userId) => {
        return get().bookings.filter((booking) => booking.userId === userId)
      },
      getBookingsByDate: (date) => {
        return get().bookings.filter((booking) => booking.createdAt.startsWith(date))
      },
      getTotalRevenue: () => {
        return get()
          .bookings.filter((booking) => booking.status !== "cancelled")
          .reduce((total, booking) => total + booking.totalAmount, 0)
      },
    }),
    {
      name: "booking-management-storage",
    },
  ),
)

export const useUIStore = create<UIStore>((set) => ({
  isLoading: false,
  isMobileMenuOpen: false,
  setLoading: (loading) => set({ isLoading: loading }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}))

export type { Booking }
