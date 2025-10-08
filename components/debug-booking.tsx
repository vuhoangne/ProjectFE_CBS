"use client"

import { useBookingStore, useConcessionStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DebugBooking() {
  const { selectedMovie, selectedShowtime, selectedTheater, selectedSeats, seatAmount, totalAmount } = useBookingStore()
  const { concessionOrders, getTotalConcessionAmount } = useConcessionStore()

  return (
    <Card className="mt-4 border-blue-200">
      <CardHeader>
        <CardTitle className="text-sm text-blue-600">Debug Booking Store</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div>
          <strong>Movie:</strong> {selectedMovie?.title || 'None'}
        </div>
        <div>
          <strong>Theater:</strong> {selectedTheater?.name || 'None'}
        </div>
        <div>
          <strong>Showtime:</strong> {selectedShowtime ? `${selectedShowtime.date} ${selectedShowtime.time}` : 'None'}
        </div>
        <div>
          <strong>Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </div>
        <div>
          <strong>Seat Amount:</strong> {seatAmount.toLocaleString('vi-VN')}đ
        </div>
        <div>
          <strong>Concession:</strong> {concessionOrders.length} items ({getTotalConcessionAmount().toLocaleString('vi-VN')}đ)
        </div>
        <div>
          <strong>Total:</strong> {totalAmount.toLocaleString('vi-VN')}đ
        </div>
      </CardContent>
    </Card>
  )
}