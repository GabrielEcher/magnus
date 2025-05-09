
import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import type { ImageFile } from "./product-gallery"
import { ConfirmDeleteImageDialog } from "./delete-image-dialog"

interface ImageGridProps {
  images: ImageFile[]
  productId: string
  selectedImages: string[]
  onSelectImage: (id: string) => void
  onDeleteImage: (id: string) => void
}

export function ImageGrid({ images, selectedImages, onSelectImage, onDeleteImage }: ImageGridProps) {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
  
  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }))
  }

  const handleImageError = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }))
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className={`
            relative group aspect-square rounded-md overflow-hidden border-2 cursor-pointer
            ${selectedImages.includes(image.id) ? "border-primary" : "border-transparent hover:border-muted-foreground/30"}
          `}
          onClick={() => image.origin !== "existing" && onSelectImage(image.id)}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            {loadingImages[image.id] !== false && <Loader2 className="h-8 w-8 text-white animate-spin" />}
          </div>

          <img
            src={image.url || "/placeholder.svg"}
            alt={image.name}
            
            className={`
              object-cover transition-all duration-200
              ${loadingImages[image.id] !== false ? "opacity-0" : "opacity-100"}
              ${selectedImages.includes(image.id) ? "" : "group-hover:scale-105"}
            `}
            onLoad={() => handleImageLoad(image.id)}
            onError={() => handleImageError(image.id)}
          />
          {image.origin === "existing" && (
  <div className="absolute top-2 left-2 z-20">
    <ConfirmDeleteImageDialog onConfirm={() => onDeleteImage(image.id)} />
  </div>
)}

          {selectedImages.includes(image.id) && (
            <div className="absolute top-2 right-2 z-20 bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  )
}
