import { ProductGallery } from "@/components/products/product-gallery"
import { useSearchParams } from "react-router-dom"
import { Badge } from "../ui/badge";
import { Dot, GalleryVerticalEnd } from "lucide-react";

export default function ProductImagesPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id")
  const productName = searchParams.get("name")
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 "><GalleryVerticalEnd/>  Galeria <Dot size={25}/> <Badge className="text-xl">{productName}</Badge></h1>
      <ProductGallery productId={productId ?? ""} productName={productName ?? ""} />
    </main>
  )
}
