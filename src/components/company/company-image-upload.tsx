"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string | null
  onChange: (file: File | null) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedImage])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedImage(file)
    onChange(file)
  }

  const handleRemove = () => {
    setSelectedImage(null)
    // Não chama onChange(null), assim mantemos o value original
  }

  const showImage = previewUrl || value

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-40 w-40 overflow-hidden rounded-md border border-border">
        {showImage ? (
          <div className="relative h-full w-full">
            <img src={showImage} alt="Company logo" className="object-cover w-full h-full" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-2 top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => document.getElementById("logo-upload")?.click()}
        >
          {value || previewUrl ? "Mudar logo" : "Carregar logo"}
        </Button>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
