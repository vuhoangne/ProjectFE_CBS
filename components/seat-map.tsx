"use client"

import React from "react"
import { useBookingStore } from "@/lib/store"
import { Seat } from "./seat"
import { seatLayout } from "@/lib/mock-data"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SeatMapProps {
  occupiedSeats: string[]
  regularPrice: number
  vipPrice: number
}

export function SeatMap({ occupiedSeats, regularPrice, vipPrice }: SeatMapProps) {
  const { selectedSeats, addSeat, removeSeat, calculateSeatTotal } = useBookingStore()

  const handleSeatSelect = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      removeSeat(seatId)
    } else {
      addSeat(seatId)
    }
    // Recalculate total after seat selection
    setTimeout(() => calculateSeatTotal(regularPrice, vipPrice, seatLayout.vipRows), 0)
  }

  const generateSeatId = (rowIndex: number, seatIndex: number) => {
    const rowLetter = String.fromCharCode(65 + rowIndex) // A, B, C...
    const seatNumber = seatIndex + 1
    return `${rowLetter}${seatNumber}`
  }

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-64 sm:w-80 lg:w-96 h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          <div className="text-center mt-2 text-sm text-muted-foreground font-medium">MÀN HÌNH</div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Mobile: Horizontal scroll container */}
          <div className="block lg:hidden">
            <ScrollArea className="w-full">
              <div className="min-w-max px-4">
                <div className="space-y-2">
                  {Array.from({ length: seatLayout.rows }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-2">
                      {/* Row Label */}
                      <div className="w-6 text-center text-sm font-medium text-muted-foreground flex-shrink-0">
                        {String.fromCharCode(65 + rowIndex)}
                      </div>

                      {/* Seats */}
                      <div className="flex gap-1">
                        {Array.from({ length: seatLayout.seatsPerRow }, (_, seatIndex) => {
                          const seatId = generateSeatId(rowIndex, seatIndex)
                          const isOccupied = occupiedSeats.includes(seatId)
                          const isVip = seatLayout.vipRows.includes(rowIndex)
                          const isSelected = selectedSeats.includes(seatId)
                          const isDisabled = selectedSeats.length >= 8 && !isSelected

                          // Add gap in the middle for aisle
                          if (seatIndex === Math.floor(seatLayout.seatsPerRow / 2)) {
                            return (
                              <React.Fragment key={`gap-${rowIndex}-${seatIndex}`}>
                                <div className="w-3" />
                                <Seat
                                  seatId={seatId}
                                  isOccupied={isOccupied}
                                  isVip={isVip}
                                  isSelected={isSelected}
                                  onSelect={handleSeatSelect}
                                  disabled={isDisabled}
                                />
                              </React.Fragment>
                            )
                          }

                          return (
                            <Seat
                              key={seatId}
                              seatId={seatId}
                              isOccupied={isOccupied}
                              isVip={isVip}
                              isSelected={isSelected}
                              onSelect={handleSeatSelect}
                              disabled={isDisabled}
                            />
                          )
                        })}
                      </div>

                      {/* Row Label (Right) */}
                      <div className="w-6 text-center text-sm font-medium text-muted-foreground flex-shrink-0">
                        {String.fromCharCode(65 + rowIndex)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Desktop: Normal layout */}
          <div className="hidden lg:block">
            <div className="space-y-3">
              {Array.from({ length: seatLayout.rows }, (_, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-2 justify-center">
                  {/* Row Label */}
                  <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>

                  {/* Seats */}
                  <div className="flex gap-1">
                    {Array.from({ length: seatLayout.seatsPerRow }, (_, seatIndex) => {
                      const seatId = generateSeatId(rowIndex, seatIndex)
                      const isOccupied = occupiedSeats.includes(seatId)
                      const isVip = seatLayout.vipRows.includes(rowIndex)
                      const isSelected = selectedSeats.includes(seatId)
                      const isDisabled = selectedSeats.length >= 8 && !isSelected

                      // Add gap in the middle for aisle
                      if (seatIndex === Math.floor(seatLayout.seatsPerRow / 2)) {
                        return (
                          <React.Fragment key={`gap-${rowIndex}-${seatIndex}`}>
                            <div className="w-4" />
                            <Seat
                              seatId={seatId}
                              isOccupied={isOccupied}
                              isVip={isVip}
                              isSelected={isSelected}
                              onSelect={handleSeatSelect}
                              disabled={isDisabled}
                            />
                          </React.Fragment>
                        )
                      }

                      return (
                        <Seat
                          key={seatId}
                          seatId={seatId}
                          isOccupied={isOccupied}
                          isVip={isVip}
                          isSelected={isSelected}
                          onSelect={handleSeatSelect}
                          disabled={isDisabled}
                        />
                      )
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
