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
  trailerUrl?: string
  isUpcoming?: boolean
}

export interface Theater {
  id: number
  name: string
  location: string
  logo: string
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
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Avengers: Endgame",
    titleEn: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 181,
    rating: 8.4,
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    synopsis:
      "Sau những sự kiện tàn khốc của Infinity War, vũ trụ đang trong tình trạng hỗn loạn. Với sự giúp đỡ của các đồng minh còn lại, các Avengers phải tập hợp một lần nữa để đảo ngược hành động của Thanos và khôi phục lại trật tự của vũ trụ.",
    releaseDate: "2019-04-26",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    titleEn: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 148,
    rating: 8.2,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
    synopsis:
      "Lần đầu tiên trong lịch sử điện ảnh của Spider-Man, danh tính của Người Nhện hàng xóm thân thiện được tiết lộ, khiến anh không còn có thể tách biệt cuộc sống bình thường với trách nhiệm siêu anh hùng.",
    releaseDate: "2021-12-17",
    trailerUrl: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
  },
  {
    id: 3,
    title: "Top Gun: Maverick",
    titleEn: "Top Gun: Maverick",
    poster: "https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    genre: ["Hành động", "Chính kịch"],
    duration: 130,
    rating: 8.3,
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
    synopsis:
      "Sau hơn ba thập kỷ phục vụ như một trong những phi công hàng đầu của Hải quân, Pete 'Maverick' Mitchell đang ở nơi anh thuộc về, thúc đẩy ranh giới như một phi công thử nghiệm dũng cảm.",
    releaseDate: "2022-05-27",
    trailerUrl: "https://www.youtube.com/watch?v=qSqVVswa420",
  },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    titleEn: "Black Panther: Wakanda Forever",
    poster: "https://image.tmdb.org/t/p/original/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    genre: ["Hành động", "Phiêu lưu", "Chính kịch"],
    duration: 161,
    rating: 6.7,
    director: "Ryan Coogler",
    cast: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira", "Winston Duke"],
    synopsis:
      "Nữ hoàng Ramonda, Shuri, M'Baku, Okoye và Dora Milaje chiến đấu để bảo vệ quốc gia của họ khỏi các thế lực can thiệp sau cái chết của Vua T'Challa.",
    releaseDate: "2022-11-11",
    trailerUrl: "https://www.youtube.com/watch?v=_Z3QKkl1WyM",
  },
  {
    id: 5,
    title: "Avatar: The Way of Water",
    titleEn: "Avatar: The Way of Water",
    poster: "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 192,
    rating: 7.6,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
    synopsis:
      "Jake Sully sống với gia đình mới được thành lập trên hành tinh Pandora. Khi một mối đe dọa quen thuộc trở lại để hoàn thành những gì đã bắt đầu trước đây, Jake phải làm việc với Neytiri và quân đội của chủng tộc Na'vi để bảo vệ hành tinh của họ.",
    releaseDate: "2022-12-16",
    trailerUrl: "https://www.youtube.com/watch?v=d9MyW72ELq0",
  },
  {
    id: 6,
    title: "Fast X",
    titleEn: "Fast X",
    poster: "https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    genre: ["Hành động", "Tội phạm", "Ly kỳ"],
    duration: 141,
    rating: 5.8,
    director: "Louis Leterrier",
    cast: ["Vin Diesel", "Michelle Rodriguez", "Jason Statham", "Jordana Brewster"],
    synopsis:
      "Dom Toretto và gia đình của anh ấy trở thành mục tiêu của con trai báo thù của trùm ma túy Brazil Hernan Reyes.",
    releaseDate: "2023-05-19",
    trailerUrl: "https://www.youtube.com/watch?v=32RAq6JzY-w",
  },
  {
    id: 11,
    title: "Dune: Part Two",
    titleEn: "Dune: Part Two",
    poster: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    genre: ["Khoa học viễn tưởng", "Phiêu lưu", "Chính kịch"],
    duration: 166,
    rating: 8.5,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    synopsis:
      "Paul Atreides hợp nhất với Chani và Fremen trong khi tìm cách trả thù những kẻ đã phá hủy gia đình mình.",
    releaseDate: "2024-03-01",
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
  },
  {
    id: 12,
    title: "Oppenheimer",
    titleEn: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    genre: ["Chính kịch", "Lịch sử", "Ly kỳ"],
    duration: 180,
    rating: 8.3,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    synopsis:
      "Câu chuyện về J. Robert Oppenheimer, nhà vật lý lý thuyết người đã giúp phát triển bom nguyên tử trong Thế chiến II.",
    releaseDate: "2023-07-21",
    trailerUrl: "https://www.youtube.com/watch?v=uYPbbksJxIg",
  },

]

// Phim sắp chiếu
export const upcomingMovies: Movie[] = [
  {
    id: 7,
    title: "Deadpool & Wolverine",
    titleEn: "Deadpool & Wolverine",
    poster: "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    genre: ["Hành động", "Hài", "Khoa học viễn tưởng"],
    duration: 127,
    rating: 0, // Chưa có rating
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
    synopsis:
      "Wade Wilson tiếp tục cuộc phiêu lưu mới với Wolverine trong một câu chuyện đầy hành động và hài hước.",
    releaseDate: "2025-03-15",
    trailerUrl: "https://www.youtube.com/watch?v=Idh8n5XuYIA",
  },
  {
    id: 8,
    title: "The Batman Part II",
    titleEn: "The Batman Part II",
    poster: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    genre: ["Hành động", "Tội phạm", "Ly kỳ"],
    duration: 155,
    rating: 0,
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    synopsis:
      "Batman tiếp tục cuộc chiến chống tội phạm tại Gotham City với những thử thách mới và kẻ thù nguy hiểm hơn.",
    releaseDate: "2025-04-20",
    trailerUrl: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
  },
  {
    id: 9,
    title: "The Fantastic Four: First Steps",
    titleEn: "The Fantastic Four: First Steps",
    poster: "https://image.tmdb.org/t/p/original/x2RS3uTcsJJ9IfjNPcgDmukoEcQ.jpg",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 140,
    rating: 0,
    director: "Matt Shakman",
    cast: ["Pedro Pascal", "Vanessa Kirby", "Joseph Quinn"],
    synopsis:
      "Bốn nhà khoa học có được siêu năng lực sau một tai nạn vũ trụ và phải học cách sử dụng sức mạnh để bảo vệ Trái Đất.",
    releaseDate: "2025-05-25",
    trailerUrl: "https://www.youtube.com/watch?v=NYnQnNO_F3k",
  },
  {
    id: 10,
    title: "Jurassic World Rebirth",
    titleEn: "Jurassic World Rebirth",
    poster: "https://image.tmdb.org/t/p/original/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 147,
    rating: 0,
    director: "Gareth Edwards",
    cast: ["Scarlett Johansson", "Jonathan Bailey", "Mahershala Ali"],
    synopsis:
      "Một thế hệ mới khám phá thế giới khủng long với công nghệ tiên tiến và những nguy hiểm chưa từng có.",
    releaseDate: "2025-07-02",
    trailerUrl: "https://www.youtube.com/watch?v=fb5ELWi-ekk",
  },
]

export interface TheaterDetail {
  id: number
  name: string
  location: string
  logo: string
  features: string[]
  phone: string
  description: string
}

export const theaters: Theater[] = [
  {
    id: 1,
    name: "CGV Vincom Center",
    location: "Vincom Center, Quận 1, TP.HCM",
    logo: "/cgv-logo.svg",
  },
  {
    id: 2,
    name: "Galaxy Cinema Nguyễn Du",
    location: "Nguyễn Du, Quận 1, TP.HCM",
    logo: "/galaxy-logo.svg",
  },
  {
    id: 3,
    name: "Lotte Cinema Diamond Plaza",
    location: "Diamond Plaza, Quận 1, TP.HCM",
    logo: "/lotte-logo.svg",
  },
  {
    id: 4,
    name: "BHD Star Vincom Center",
    location: "Vincom Center, Quận 1, TP.HCM",
    logo: "/bhd-logo.svg",
  },
]

export const theaterDetails: TheaterDetail[] = [
  {
    id: 1,
    name: "CGV Vincom Bà Triệu",
    location: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
    logo: "/cgv-logo.svg",
    features: ["IMAX", "4DX", "Dolby Atmos", "VIP"],
    phone: "1900 6017",
    description: "Rạp chiếu phim hiện đại với công nghệ IMAX và 4DX tiên tiến nhất"
  },
  {
    id: 2,
    name: "Lotte Cinema Liễu Giai",
    location: "54 Liễu Giai, Quận Ba Đình, Hà Nội",
    logo: "/lotte-logo.svg",
    features: ["Premium", "Dolby Atmos", "Super Plex"],
    phone: "1900 5555",
    description: "Trải nghiệm điện ảnh cao cấp với âm thanh Dolby Atmos sống động"
  },
  {
    id: 3,
    name: "Galaxy Cinema Nguyễn Du",
    location: "116 Nguyễn Du, Quận 1, TP.HCM",
    logo: "/galaxy-logo.svg",
    features: ["Starium", "Sweet Box", "Premium"],
    phone: "1900 6420",
    description: "Không gian thoải mái với phòng chiếu Sweet Box độc đáo"
  },
  {
    id: 4,
    name: "BHD Star Vincom Center",
    location: "72 Lê Thánh Tôn, Quận 1, TP.HCM",
    logo: "/bhd-logo.svg",
    features: ["IMAX", "Gold Class", "Premium"],
    phone: "1900 2099",
    description: "Hệ thống rạp chiếu phim cao cấp với dịch vụ Gold Class đẳng cấp"
  }
]

export function getCurrentShowtimes(): Showtime[] {
  const today = new Date()
  const showtimeData: Showtime[] = []
  let showtimeId = 1

  // Different movie schedules for each day - more realistic and dynamic
  const dailySchedules = [
    // Day 0 - Today (Full schedule)
    {
      movies: [
        { movieId: 1, theaters: [1, 2], times: ["09:00", "12:30", "16:00", "19:30", "22:00"], price: { regular: 75000, vip: 120000 } },
        { movieId: 2, theaters: [2, 3], times: ["10:15", "13:45", "17:15", "20:45"], price: { regular: 80000, vip: 130000 } },
        { movieId: 3, theaters: [1, 4], times: ["11:00", "14:30", "18:00", "21:30"], price: { regular: 85000, vip: 135000 } },
        { movieId: 4, theaters: [3], times: ["15:30", "19:00"], price: { regular: 80000, vip: 125000 } },
        { movieId: 5, theaters: [4], times: ["14:00", "18:30"], price: { regular: 90000, vip: 140000 } },
        { movieId: 6, theaters: [2], times: ["16:45", "20:15"], price: { regular: 75000, vip: 120000 } },
      ]
    },
    // Day 1 - Tomorrow (Different schedule)
    {
      movies: [
        { movieId: 1, theaters: [3, 4], times: ["10:00", "13:00", "17:00", "20:30"], price: { regular: 75000, vip: 120000 } },
        { movieId: 2, theaters: [1], times: ["09:30", "14:15", "18:45", "21:45"], price: { regular: 80000, vip: 130000 } },
        { movieId: 3, theaters: [2, 3], times: ["12:00", "15:30", "19:15"], price: { regular: 85000, vip: 135000 } },
        { movieId: 5, theaters: [1, 2], times: ["11:30", "16:30", "20:00"], price: { regular: 90000, vip: 140000 } },
        { movieId: 6, theaters: [4], times: ["13:30", "17:30", "21:00"], price: { regular: 75000, vip: 120000 } },
      ]
    },
    // Day 2 - Weekend schedule
    {
      movies: [
        { movieId: 1, theaters: [1, 2, 3], times: ["09:30", "12:45", "16:15", "19:45", "22:30"], price: { regular: 85000, vip: 135000 } },
        { movieId: 2, theaters: [2, 4], times: ["10:45", "14:00", "17:30", "21:15"], price: { regular: 90000, vip: 140000 } },
        { movieId: 3, theaters: [1], times: ["11:15", "15:00", "18:30"], price: { regular: 95000, vip: 145000 } },
        { movieId: 4, theaters: [3, 4], times: ["13:15", "16:45", "20:15"], price: { regular: 85000, vip: 130000 } },
        { movieId: 6, theaters: [1, 3], times: ["12:15", "19:00"], price: { regular: 80000, vip: 125000 } },
      ]
    },
    // Day 3 - Reduced schedule
    {
      movies: [
        { movieId: 1, theaters: [2], times: ["14:00", "18:00", "21:00"], price: { regular: 75000, vip: 120000 } },
        { movieId: 2, theaters: [1, 3], times: ["15:30", "19:30"], price: { regular: 80000, vip: 130000 } },
        { movieId: 3, theaters: [4], times: ["16:00", "20:00"], price: { regular: 85000, vip: 135000 } },
        { movieId: 5, theaters: [2, 4], times: ["17:00", "21:30"], price: { regular: 90000, vip: 140000 } },
      ]
    },
    // Day 4 - Special evening shows
    {
      movies: [
        { movieId: 2, theaters: [1, 2, 4], times: ["18:00", "20:30", "22:45"], price: { regular: 80000, vip: 130000 } },
        { movieId: 3, theaters: [2, 3], times: ["17:30", "21:00"], price: { regular: 85000, vip: 135000 } },
        { movieId: 4, theaters: [1], times: ["19:15", "22:00"], price: { regular: 80000, vip: 125000 } },
        { movieId: 6, theaters: [3, 4], times: ["18:30", "21:45"], price: { regular: 75000, vip: 120000 } },
      ]
    },
    // Day 5 - Limited shows
    {
      movies: [
        { movieId: 1, theaters: [1, 3], times: ["19:00", "21:30"], price: { regular: 75000, vip: 120000 } },
        { movieId: 5, theaters: [2], times: ["18:30", "21:00"], price: { regular: 90000, vip: 140000 } },
        { movieId: 6, theaters: [4], times: ["20:00"], price: { regular: 75000, vip: 120000 } },
      ]
    },
    // Day 6 - Weekend special
    {
      movies: [
        { movieId: 1, theaters: [1, 2, 3, 4], times: ["10:00", "13:30", "17:00", "20:30"], price: { regular: 85000, vip: 135000 } },
        { movieId: 2, theaters: [1, 3], times: ["11:30", "15:00", "18:30", "22:00"], price: { regular: 90000, vip: 140000 } },
        { movieId: 3, theaters: [2, 4], times: ["12:30", "16:00", "19:30"], price: { regular: 95000, vip: 145000 } },
      ]
    }
  ]

  // Generate showtimes for next 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + dayOffset)
    const dateString = currentDate.toISOString().split("T")[0]

    const daySchedule = dailySchedules[dayOffset] || dailySchedules[0] // Fallback to day 0

    daySchedule.movies.forEach((movieSchedule) => {
      movieSchedule.theaters.forEach((theaterId) => {
        movieSchedule.times.forEach((time) => {
          showtimeData.push({
            id: showtimeId++,
            movieId: movieSchedule.movieId,
            theaterId: theaterId,
            date: dateString,
            time: time,
            price: movieSchedule.price,
          })
        })
      })
    })
  }

  return showtimeData
}

export const showtimes: Showtime[] = getCurrentShowtimes()

export const seatLayout = {
  rows: 10,
  seatsPerRow: 16,
  vipRows: [7, 8, 9],
  occupied: ["A5", "A6", "B10", "C3", "D12", "E8", "F15"],
  pricing: { regular: 75000, vip: 120000 },
}
