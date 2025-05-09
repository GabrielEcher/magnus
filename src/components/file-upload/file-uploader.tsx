"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { CloudUpload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploaderProps {
  onUpload: (files: File[]) => void
}

export function FileUploader({ onUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

      if (filesArray.length > 0) {
        onUpload(filesArray)
      }
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).filter((file) => file.type.startsWith("image/"))

      if (filesArray.length > 0) {
        onUpload(filesArray)
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card
      className={`border-2 border-dashed ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"} transition-colors`}
    >
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center gap-4 py-8"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="rounded-full bg-primary/10 p-4">
            <CloudUpload className="h-8 w-8 text-primary" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold">Arraste e largue as imagens dos produtos</h3>
            <p className="text-sm text-muted-foreground mt-1">Jogue as imagens dos produtos aqui, ou clique para busca-las</p>
            <p className="text-xs text-muted-foreground mt-2">Suporta: JPG, PNG, JPEG (Max 50MB)</p>
          </div>

          <Button onClick={handleButtonClick} variant="outline" className="mt-2">
            Selecionar Imagens
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  )
}
