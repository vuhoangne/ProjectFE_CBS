"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Movie } from "@/lib/mock-data"

interface MovieFormProps {
  movie?: Movie
  onClose: () => void
}

export function MovieForm({ movie, onClose }: MovieFormProps) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    titleEn: movie?.titleEn || "",
    poster: movie?.poster || "",
    genre: movie?.genre || [],
    duration: movie?.duration || 0,
    rating: movie?.rating || 0,
    director: movie?.director || "",
    cast: movie?.cast || [],
    synopsis: movie?.synopsis || "",
    releaseDate: movie?.releaseDate || "",
    trailerUrl: movie?.trailerUrl || "",
  })

  const [newGenre, setNewGenre] = useState("")
  const [newCastMember, setNewCastMember] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would call an API
    console.log("Saving movie:", formData)
    alert(movie ? "Cập nhật phim thành công!" : "Thêm phim mới thành công!")
    onClose()
  }

  const addGenre = () => {
    if (newGenre.trim() && !formData.genre.includes(newGenre.trim())) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, newGenre.trim()],
      }))
      setNewGenre("")
    }
  }

  const removeGenre = (genreToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreToRemove),
    }))
  }

  const addCastMember = () => {
    if (newCastMember.trim() && !formData.cast.includes(newCastMember.trim())) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, newCastMember.trim()],
      }))
      setNewCastMember("")
    }
  }

  const removeCastMember = (castToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((c) => c !== castToRemove),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tên phim (Tiếng Việt)</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleEn">Tên phim (Tiếng Anh)</Label>
          <Input
            id="titleEn"
            value={formData.titleEn}
            onChange={(e) => setFormData((prev) => ({ ...prev, titleEn: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="poster">URL Poster</Label>
        <Input
          id="poster"
          value={formData.poster}
          onChange={(e) => setFormData((prev) => ({ ...prev, poster: e.target.value }))}
          placeholder="https://example.com/poster.jpg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Thời lượng (phút)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) || 0 }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Đánh giá (1-10)</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="1"
            max="10"
            value={formData.rating}
            onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number.parseFloat(e.target.value) || 0 }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Ngày phát hành</Label>
          <Input
            id="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, releaseDate: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="director">Đạo diễn</Label>
        <Input
          id="director"
          value={formData.director}
          onChange={(e) => setFormData((prev) => ({ ...prev, director: e.target.value }))}
          required
        />
      </div>

      {/* Genre Management */}
      <div className="space-y-2">
        <Label>Thể loại</Label>
        <div className="flex gap-2">
          <Input
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="Nhập thể loại mới"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addGenre())}
          />
          <Button type="button" onClick={addGenre}>
            Thêm
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.genre.map((genre, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {genre}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeGenre(genre)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Cast Management */}
      <div className="space-y-2">
        <Label>Diễn viên</Label>
        <div className="flex gap-2">
          <Input
            value={newCastMember}
            onChange={(e) => setNewCastMember(e.target.value)}
            placeholder="Nhập tên diễn viên"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCastMember())}
          />
          <Button type="button" onClick={addCastMember}>
            Thêm
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.cast.map((cast, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {cast}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeCastMember(cast)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="synopsis">Tóm tắt nội dung</Label>
        <Textarea
          id="synopsis"
          value={formData.synopsis}
          onChange={(e) => setFormData((prev) => ({ ...prev, synopsis: e.target.value }))}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="trailerUrl">URL Trailer (tùy chọn)</Label>
        <Input
          id="trailerUrl"
          value={formData.trailerUrl}
          onChange={(e) => setFormData((prev) => ({ ...prev, trailerUrl: e.target.value }))}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">{movie ? "Cập nhật" : "Thêm phim"}</Button>
      </div>
    </form>
  )
}
