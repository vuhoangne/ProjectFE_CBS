export default function TestAdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard Test</h1>
      <p className="text-gray-600 mb-8">Trang admin đơn giản để test</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Tổng số phim</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500">Đang chiếu tại rạp</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Tổng đặt vé</h3>
          <p className="text-3xl font-bold text-green-600">156</p>
          <p className="text-sm text-gray-500">+12 hôm nay</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Doanh thu</h3>
          <p className="text-3xl font-bold text-purple-600">45,600,000đ</p>
          <p className="text-sm text-gray-500">Tổng doanh thu</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-2">Suất chiếu</h3>
          <p className="text-3xl font-bold text-orange-600">48</p>
          <p className="text-sm text-gray-500">Trên 3 rạp</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold mb-4">Thao tác nhanh</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/movies" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Quản lý phim
          </a>
          <a href="/admin/bookings" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Xem đặt vé
          </a>
          <a href="/admin/users" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Quản lý người dùng
          </a>
          <a href="/admin/contact" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Thông tin liên hệ
          </a>
        </div>
      </div>
    </div>
  )
}