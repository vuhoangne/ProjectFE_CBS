"use client"

import { cn } from "@/lib/utils"

interface SeatProps {
  seatId: string
  isOccupied: boolean
  isVip: boolean
  isSelected: boolean
  onSelect: (seatId: string) => void
  disabled?: boolean
}

export function Seat({ seatId, isOccupied, isVip, isSelected, onSelect, disabled }: SeatProps) {
  const handleClick = () => {
    if (!isOccupied && !disabled) {
      onSelect(seatId)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isOccupied || disabled}
      className={cn(
        "w-7 h-7 sm:w-8 sm:h-8 rounded-t-lg border-2 transition-all duration-200 text-xs font-medium",
        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
        "touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px]",
        {
          // Available regular seats
          "bg-muted border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground":
            !isOccupied && !isVip && !isSelected,
          // Available VIP seats
          "bg-secondary border-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground":
            !isOccupied && isVip && !isSelected,
          // Occupied seats
          "bg-destructive border-destructive text-destructive-foreground cursor-not-allowed opacity-60": isOccupied,
          // Selected seats
          "bg-primary border-primary text-primary-foreground scale-110": isSelected,
          // Disabled state
          "opacity-50 cursor-not-allowed": disabled,
        },
      )}
      title={`Ghế ${seatId} ${isVip ? "(VIP)" : ""} ${isOccupied ? "- Đã đặt" : ""}`}
    >
      <span className="text-xs sm:text-sm">{seatId.slice(1)}</span>
    </button>
  )
}
