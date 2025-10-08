# Hướng dẫn quản lý thông tin liên hệ

## 🎯 Tổng quan
Hệ thống quản lý thông tin liên hệ cho phép admin cập nhật thông tin liên hệ hiển thị trên toàn bộ website một cách dễ dàng và real-time.

## 📍 Các trang quan trọng

### 1. Trang tổng hợp Demo
**URL:** `/admin-demo`
- Trang chính với tất cả links và hướng dẫn
- Theo dõi tiến độ demo
- Quick actions và features overview

### 2. Trang quản lý Admin
**URL:** `/admin/contact`
- Giao diện quản lý đầy đủ với 3 tab:
  - **Thông tin cơ bản:** Số điện thoại, email, địa chỉ, website
  - **Mạng xã hội:** Facebook, Instagram, YouTube
  - **Xem trước:** Preview giao diện hiển thị

### 3. Newsletter Modal Demo
**URL:** `/demo-newsletter`
- Test popup đăng ký nhận ưu đãi
- Thông tin liên hệ động từ API
- Tích hợp mạng xã hội

### 4. Trang demo liên hệ
**URL:** `/demo-contact`
- Xem cách thông tin liên hệ được hiển thị
- Hướng dẫn sử dụng chi tiết
- Test tính năng real-time

### 5. Trang test API
**URL:** `/test-contact`
- Test API endpoints
- Xem dữ liệu JSON
- Test cập nhật thông tin

## 🔧 Cách sử dụng

### Bước 1: Truy cập trang quản lý
1. Vào `/admin/contact`
2. Đăng nhập với tài khoản admin (nếu cần)

### Bước 2: Cập nhật thông tin
1. **Tab "Thông tin cơ bản":**
   - Cập nhật số điện thoại
   - Thay đổi email hỗ trợ
   - Sửa địa chỉ
   - Cập nhật website

2. **Tab "Mạng xã hội":**
   - Thêm/sửa link Facebook
   - Cập nhật Instagram
   - Thay đổi YouTube channel

3. **Tab "Xem trước":**
   - Kiểm tra giao diện hiển thị
   - Đảm bảo thông tin chính xác

### Bước 3: Lưu thay đổi
1. Nhấn nút "Lưu thay đổi"
2. Hệ thống sẽ cập nhật toàn bộ website
3. Thông tin mới hiển thị ngay lập tức

## 🌟 Tính năng nổi bật

### ✨ Real-time Updates
- Thông tin cập nhật ngay lập tức trên toàn website
- Không cần reload trang
- Đồng bộ tự động

### 🔗 Liên kết thông minh
- Số điện thoại tự động tạo link gọi
- Email tự động tạo link gửi mail
- Địa chỉ có thể tích hợp Google Maps

### 📱 Mạng xã hội
- Quản lý tất cả liên kết social media
- Hiển thị icon đẹp mắt
- Mở trong tab mới

### 🎨 Giao diện đẹp
- Theme cinema với màu vàng gold
- Responsive trên mọi thiết bị
- Hiệu ứng hover mượt mà

## 🛠 API Endpoints

### GET /api/contact
Lấy thông tin liên hệ hiện tại
```bash
curl -X GET http://localhost:3000/api/contact
```

### PUT /api/contact
Cập nhật thông tin liên hệ
```bash
curl -X PUT http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "1900 6017",
    "email": "support@cyberlearn.vn",
    "address": "Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM",
    "website": "https://cyberlearn.vn",
    "facebook": "https://facebook.com/cyberlearn",
    "instagram": "https://instagram.com/cyberlearn",
    "youtube": "https://youtube.com/cyberlearn",
    "description": "Hệ thống đặt vé xem phim trực tuyến hàng đầu Việt Nam"
  }'
```

## 📂 Files được tạo/cập nhật

### Trang mới
- `app/admin/contact/page.tsx` - Trang quản lý admin
- `app/api/contact/route.ts` - API endpoints
- `app/demo-contact/page.tsx` - Trang demo
- `app/test-contact/page.tsx` - Trang test API
- `components/contact-info.tsx` - Component hiển thị thông tin

### Files cập nhật
- `app/admin/layout.tsx` - Thêm menu "Thông tin liên hệ"
- `components/footer.tsx` - Sử dụng thông tin động
- `lib/database.ts` - Thêm hỗ trợ contact info
- `app/globals.css` - Thêm CSS cho trang contact

## 🚀 Demo nhanh

1. **Trang chính:** Vào `/admin-demo` - Tổng hợp tất cả tính năng
2. **Newsletter Modal:** Vào `/demo-newsletter` - Test popup ưu đãi
3. **Quản lý liên hệ:** Vào `/admin/contact` - Cập nhật thông tin
4. **Xem demo:** Vào `/demo-contact` - Xem component hiển thị
5. **Test API:** Vào `/test-contact` - Kiểm tra API endpoints

## 💡 Lưu ý
- Thông tin được lưu trong memory database (demo)
- Trong production, cần kết nối database thật
- Có thể mở rộng thêm các trường thông tin khác
- Hỗ trợ đa ngôn ngữ nếu cần

## 🎉 Kết quả
Bây giờ bạn có thể dễ dàng quản lý thông tin liên hệ như trong hình ảnh bạn đã gửi:
- ✅ Số điện thoại: 1900 6017
- ✅ Email: support@cyberlearn.vn  
- ✅ Địa chỉ: Tầng 4, Tòa nhà Vincom Center, Quận 1, TP.HCM
- ✅ Giao diện đẹp với theme đen và màu xanh
- ✅ Cập nhật real-time từ admin panel
## 🎯 New
sletter Modal System

### Tính năng mới
- **Auto-popup:** Modal tự động hiển thị sau 3 giây trên trang chủ
- **Smart timing:** Chỉ hiển thị 1 lần trong 24 giờ
- **Dynamic content:** Thông tin liên hệ và mạng xã hội từ API
- **Form validation:** Kiểm tra email hợp lệ
- **API integration:** Gửi dữ liệu đăng ký qua API

### Cách test
1. Vào `/demo-newsletter` để test thủ công
2. Vào trang chủ `/` để xem auto-popup
3. Nhấn nút "Popup ưu đãi" trong sidebar để mở modal
4. Clear localStorage để reset timer auto-popup

### API Newsletter
- **POST /api/newsletter** - Đăng ký newsletter
- **GET /api/newsletter** - Lấy thống kê đăng ký

## 🎨 UI Components mới

### NewsletterModal
- Component modal đăng ký newsletter
- Tích hợp thông tin liên hệ động
- Responsive design với theme cinema

### useNewsletterModal Hook
- Quản lý trạng thái modal
- Auto-show logic với localStorage
- Timer management

### Promotions Widget Update
- Thêm nút mở newsletter modal
- Tích hợp với hệ thống ưu đãi hiện có