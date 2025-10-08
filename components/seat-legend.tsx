export function SeatLegend() {
  return (
    <div className="flex flex-wrap gap-6 justify-center text-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-t-lg bg-muted border-2 border-border" />
        <span className="text-muted-foreground">Ghế thường</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-t-lg bg-secondary border-2 border-secondary" />
        <span className="text-muted-foreground">Ghế VIP</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-t-lg bg-primary border-2 border-primary" />
        <span className="text-muted-foreground">Ghế đã chọn</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-t-lg bg-destructive border-2 border-destructive opacity-60" />
        <span className="text-muted-foreground">Ghế đã đặt</span>
      </div>
    </div>
  )
}
