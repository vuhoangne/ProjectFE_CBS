# 🎬 CyberLearn Movies

Hệ thống đặt vé xem phim trực tuyến hiện đại được xây dựng với Next.js 15, TypeScript và Tailwind CSS.

## ✨ Tính năng chính

### 🎫 Đặt vé phim
- Xem danh sách phim đang chiếu
- Chọn suất chiếu và ghế ngồi
- Thanh toán trực tuyến
- Quản lý vé đã đặt

### 👤 Quản lý tài khoản
- Đăng ký/Đăng nhập người dùng
- Cập nhật thông tin cá nhân
- Đổi mật khẩu bảo mật
- Lịch sử giao dịch

### 🎭 Quản lý phim
- Thêm/sửa/xóa phim
- Quản lý suất chiếu
- Cập nhật thông tin rạp
- Báo cáo doanh thu

### 🎨 Giao diện người dùng
- Thiết kế responsive
- Dark/Light mode
- Animations mượt mà
- UX/UI hiện đại

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Lucide React** - Icons
- **Zustand** - State management

### UI Components
- **shadcn/ui** - Modern components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Date-fns** - Date utilities

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn
- Git

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd cyberlearn-movies

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Scripts có sẵn
```bash
# Development
npm run dev          # Chạy server development

# Production
npm run build        # Build ứng dụng
npm run start        # Chạy production server

# Code quality
npm run lint         # Kiểm tra linting
```

## 📁 Cấu trúc dự án

```
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Trang đăng nhập
│   │   └── register/      # Trang đăng ký
│   ├── admin/             # Admin dashboard
│   │   ├── movies/        # Quản lý phim
│   │   ├── showtimes/     # Quản lý suất chiếu
│   │   └── users/         # Quản lý người dùng
│   ├── booking/           # Đặt vé
│   │   ├── seats/         # Chọn ghế
│   │   ├── payment/       # Thanh toán
│   │   └── success/       # Thành công
│   ├── profile/           # Hồ sơ người dùng
│   │   ├── bookings/      # Lịch sử đặt vé
│   │   └── settings/      # Cài đặt tài khoản
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── auth-guard.tsx    # Authentication guard
│   ├── navigation.tsx    # Navigation component
│   └── ...
├── lib/                  # Utilities & configurations
│   ├── store.ts          # Zustand store
│   ├── utils.ts          # Utility functions
│   └── validations.ts    # Zod schemas
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🎯 Tính năng chi tiết

### Đặt vé phim
1. **Chọn phim**: Duyệt danh sách phim đang chiếu
2. **Chọn suất**: Xem lịch chiếu và chọn suất phù hợp
3. **Chọn ghế**: Giao diện chọn ghế trực quan
4. **Thanh toán**: Nhiều phương thức thanh toán
5. **Xác nhận**: Nhận vé điện tử qua email

### Quản lý người dùng
- **Đăng ký**: Form đăng ký với validation
- **Đăng nhập**: Xác thực an toàn
- **Profile**: Cập nhật thông tin cá nhân
- **Lịch sử**: Xem lại các giao dịch

### Admin Dashboard
- **Quản lý phim**: CRUD operations cho phim
- **Suất chiếu**: Tạo và quản lý lịch chiếu
- **Báo cáo**: Thống kê doanh thu và người dùng
- **Cài đặt**: Cấu hình hệ thống

## 🎨 Thiết kế UI/UX

### Design System
- **Colors**: Palette màu hiện đại
- **Typography**: Font system nhất quán
- **Spacing**: Grid system 8px
- **Components**: Tái sử dụng cao

### Responsive Design
- **Mobile First**: Tối ưu cho mobile
- **Tablet**: Layout adaptive
- **Desktop**: Full features

### Accessibility
- **WCAG 2.1**: Tuân thủ tiêu chuẩn
- **Keyboard Navigation**: Hỗ trợ đầy đủ
- **Screen Readers**: Semantic HTML

## 🔐 Bảo mật

### Authentication
- **JWT Tokens**: Secure authentication
- **Password Hashing**: bcrypt encryption
- **Session Management**: Secure sessions

### Data Protection
- **Input Validation**: Zod schemas
- **XSS Protection**: Sanitized inputs
- **CSRF Protection**: Token-based

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Features per Device
- **Mobile**: Core booking features
- **Tablet**: Enhanced navigation
- **Desktop**: Full admin dashboard

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm run build
vercel --prod
```

### Docker
```bash
# Build Docker image
docker build -t cyberlearn-movies .

# Run container
docker run -p 3000:3000 cyberlearn-movies
```

## 🤝 Đóng góp

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit pull request

### Code Standards
- **TypeScript**: Strict mode
- **ESLint**: Airbnb config
- **Prettier**: Code formatting
- **Conventional Commits**: Commit messages

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.


## 📞 Liên hệ

- **Email**: vuhoangfcj.work@gmail.com
- **Website**: 
- **GitHub**: 

---

⭐ **Star this repo** nếu bạn thấy hữu ích!

🐛 **Report bugs** tại [Issues](https://github.com/username/cyberlearn-movies/issues)

💡 **Feature requests** welcome!
