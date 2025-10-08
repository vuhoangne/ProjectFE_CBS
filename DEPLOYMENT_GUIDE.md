# 🚀 Hướng dẫn chạy Admin và Customer riêng biệt

## 📋 Tổng quan
Dự án được cấu hình để chạy 2 server riêng biệt:
- **Customer Site**: `http://localhost:3000` - Trang dành cho khách hàng
- **Admin Panel**: `http://localhost:3001` - Trang quản trị

## 🛠️ Cách chạy

### 1. Chạy cả 2 server cùng lúc (Khuyến nghị)
```bash
npm run dev:both
```

### 2. Chạy riêng từng server

#### Chỉ chạy Customer (Port 3000)
```bash
npm run dev:customer
```

#### Chỉ chạy Admin (Port 3001)
```bash
npm run dev:admin
```

## 🌐 Truy cập

### Customer Site (Port 3000)
- **URL**: http://localhost:3000
- **Tính năng**: 
  - Trang chủ
  - Đặt vé phim
  - Popup newsletter
  - Thông tin liên hệ
  - Tất cả tính năng customer

### Admin Panel (Port 3001)
- **URL**: http://localhost:3001
- **Tính năng**:
  - Dashboard quản trị
  - Quản lý phim
  - Quản lý đặt vé
  - Quản lý người dùng
  - **Cài đặt hệ thống** (Settings)
  - Tất cả tính năng admin

## ⚙️ Cài đặt hệ thống

### Truy cập Admin Settings
1. Mở http://localhost:3001
2. Vào **Cài đặt** trong sidebar
3. Thay đổi thông tin:
   - Tên website
   - Email liên hệ
   - Số điện thoại hỗ trợ
   - Các cài đặt khác

### Sync dữ liệu giữa Admin và Customer
- Khi bạn thay đổi cài đặt ở Admin (port 3001)
- Dữ liệu sẽ được lưu vào API
- Customer site (port 3000) sẽ tự động cập nhật thông tin mới

## 🔧 Cấu hình

### Files cấu hình
- `next.config.admin.js` - Cấu hình cho admin server
- `next.config.customer.js` - Cấu hình cho customer server
- `middleware.ts` - Phân tách routes
- `scripts/` - Scripts khởi động server

### Environment Variables
```bash
# Admin mode
ADMIN_MODE=true

# Customer mode  
CUSTOMER_MODE=true
```

## 🚨 Lưu ý quan trọng

1. **Chạy cả 2 server**: Để tính năng sync hoạt động đầy đủ, cần chạy cả 2 server
2. **API Endpoints**: Các API được share giữa 2 server
3. **Database**: Cùng sử dụng chung database/file storage
4. **Settings**: Thay đổi ở admin sẽ ảnh hưởng đến customer ngay lập tức

## 🎯 Workflow thực tế

1. **Developer**: Chạy `npm run dev:both` để test cả 2 site
2. **Admin**: Truy cập port 3001 để quản lý
3. **Customer**: Truy cập port 3000 để sử dụng
4. **Settings**: Thay đổi ở admin → tự động sync sang customer

## 🔍 Troubleshooting

### Port đã được sử dụng
```bash
# Kill process trên port 3000
npx kill-port 3000

# Kill process trên port 3001  
npx kill-port 3001
```

### Restart servers
```bash
# Dừng tất cả
Ctrl + C

# Chạy lại
npm run dev:both
```