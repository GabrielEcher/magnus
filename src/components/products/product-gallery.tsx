import { useEffect, useRef, useState } from "react"
import { FileUploader } from "@/components/file-upload/file-uploader"
import { ImageGrid } from "./image-grid"
import { Button } from "@/components/ui/button"
import { CloudUpload, LoaderCircle, Trash2 } from "lucide-react"
import { useUploadProductImage } from "@/hooks/products/upload-product-image"
import { useProductImages } from "@/hooks/products/get-product-image"
import { useDeleteProductImage } from "@/hooks/products/delete-product-image"

export type ImageFile = {
  id: string
  url: string
  name: string
  origin: "existing" | "uploaded"
}

interface ProductGalleryProps {
  productId: string
  productName: string
}

export function ProductGallery({ productId }: ProductGalleryProps) {
  const [existingImages, setExistingImages] = useState<ImageFile[]>([])
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const { mutateAsync: uploadImages, isPending } = useUploadProductImage();
  const { mutateAsync: deleteImage } = useDeleteProductImage()
  const { data: imagesData } = useProductImages(productId)

  const filesRef = useRef<File[]>([]);

  useEffect(() => {
    if (imagesData?.data) {
      const formatted = imagesData.data.map((img) => ({
        id: img.imageId,
        url: img.imageUrl,
        name: img.imageUrl.split('/').pop() || 'Imagem',
        origin: "existing" as const,
      }))
      setExistingImages(formatted)
    }
  }, [imagesData])

  const handleUpload = (files: File[]) => {
    filesRef.current = [...filesRef.current, ...files]

    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      origin: "uploaded" as const,
    }))

    setUploadedImages((prev) => [...prev, ...newImages])
  }

  const toggleSelectImage = (id: string) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]))
  }

  const deleteSelected = () => {
    setUploadedImages((prev) => prev.filter((img) => !selectedImages.includes(img.id)))
    setSelectedImages([])
  }

  const handleDeleteImage = async (imageId: string) => {
    await deleteImage({productId, imageId})
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  }


  const handleSaveImages = async () => {

    if (!productId || filesRef.current.length === 0) return;

    await uploadImages({ productId, files: filesRef.current });
    filesRef.current = [];
    setUploadedImages([]);
  };
  const allImages = [...existingImages, ...uploadedImages]
  return (
    <div className="space-y-6">
      <FileUploader onUpload={handleUpload} />

      {allImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Imagens ({allImages.length})</h2>
            <div className="flex items-center gap-2">
              {uploadedImages.length > 0 && 
              <Button onClick={handleSaveImages} disabled={isPending}>

                {isPending ? <LoaderCircle className="animate-spin" /> : <CloudUpload />}
                Salvar imagens
              </Button>
              
              }
              
              {selectedImages.length > 0 && (
                <Button variant="destructive" size="sm" onClick={deleteSelected} className="flex items-center gap-1">
                  <Trash2 className="h-4 w-4" />
                  Excluir selecionadas ({selectedImages.length})
                </Button>
              )}
            </div>

          </div>
          <ImageGrid
            productId={productId}
            images={allImages}
            selectedImages={selectedImages}
            onSelectImage={toggleSelectImage}
            onDeleteImage={handleDeleteImage}
          />
        </div>
      )}
    </div>
  )
}
