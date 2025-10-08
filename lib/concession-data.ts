// Dữ liệu bắp nước và đồ ăn
export interface ConcessionItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: 'popcorn' | 'drink' | 'combo' | 'snack'
  available: boolean
}

export const concessionItems: ConcessionItem[] = [
  // Bắp rang
  {
    id: 1,
    name: "Bắp rang bơ (Size S)",
    description: "Bắp rang bơ thơm ngon, size nhỏ",
    price: 45000,
    image: "/popcorn-s.jpg",
    category: "popcorn",
    available: true
  },
  {
    id: 2,
    name: "Bắp rang bơ (Size M)",
    description: "Bắp rang bơ thơm ngon, size vừa",
    price: 65000,
    image: "/popcorn-m.jpg",
    category: "popcorn",
    available: true
  },
  {
    id: 3,
    name: "Bắp rang bơ (Size L)",
    description: "Bắp rang bơ thơm ngon, size lớn",
    price: 85000,
    image: "/popcorn-l.jpg",
    category: "popcorn",
    available: true
  },
  
  // Nước uống
  {
    id: 4,
    name: "Coca Cola (Size S)",
    description: "Nước ngọt Coca Cola, size nhỏ",
    price: 35000,
    image: "/coke-s.jpg",
    category: "drink",
    available: true
  },
  {
    id: 5,
    name: "Coca Cola (Size M)",
    description: "Nước ngọt Coca Cola, size vừa",
    price: 45000,
    image: "/coke-m.jpg",
    category: "drink",
    available: true
  },
  {
    id: 6,
    name: "Coca Cola (Size L)",
    description: "Nước ngọt Coca Cola, size lớn",
    price: 55000,
    image: "/coke-l.jpg",
    category: "drink",
    available: true
  },
  {
    id: 7,
    name: "Nước suối",
    description: "Nước suối tinh khiết",
    price: 25000,
    image: "/water.jpg",
    category: "drink",
    available: true
  },
  
  // Combo
  {
    id: 8,
    name: "Combo Sweet (1 bắp M + 1 nước M)",
    description: "1 bắp rang bơ size M + 1 nước ngọt size M",
    price: 95000,
    image: "/combo-sweet.jpg",
    category: "combo",
    available: true
  },
  {
    id: 9,
    name: "Combo Family (1 bắp L + 2 nước M)",
    description: "1 bắp rang bơ size L + 2 nước ngọt size M",
    price: 155000,
    image: "/combo-family.jpg",
    category: "combo",
    available: true
  },
  {
    id: 10,
    name: "Combo Couple (2 bắp S + 2 nước S)",
    description: "2 bắp rang bơ size S + 2 nước ngọt size S",
    price: 140000,
    image: "/combo-couple.jpg",
    category: "combo",
    available: true
  },
  
  // Đồ ăn vặt
  {
    id: 11,
    name: "Khoai tây chiên",
    description: "Khoai tây chiên giòn rụm",
    price: 55000,
    image: "/fries.jpg",
    category: "snack",
    available: true
  },
  {
    id: 12,
    name: "Hotdog",
    description: "Xúc xích nướng kẹp bánh mì",
    price: 65000,
    image: "/hotdog.jpg",
    category: "snack",
    available: true
  },
  {
    id: 13,
    name: "Nachos phô mai",
    description: "Bánh tortilla giòn với sốt phô mai",
    price: 75000,
    image: "/nachos.jpg",
    category: "snack",
    available: true
  }
]

export interface ConcessionOrder {
  itemId: number
  quantity: number
  price: number
  name: string
}