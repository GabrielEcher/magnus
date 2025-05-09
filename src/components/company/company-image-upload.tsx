"use client"

import type React from "react"

import { useEffect, useState } from "react"

import { ImageIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string | null
  onChange: (value: string | null) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // This would typically handle file upload to a storage service
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-40 w-40 overflow-hidden rounded-md border border-border">
        {value ? (
          <div className="relative h-full w-full">
            <img src={value || "/placeholder.svg"} alt="Company logo" className="object-cover" />
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
          {value ? "Mudar logo" : "Carregar logo"}
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
