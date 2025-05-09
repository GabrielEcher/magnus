export type Products = Product[]

export interface Product {
  publicId: string
  name: string
  price: number
  buyPrice: number
  categoryId: string
  categoryName: string
  stock: number
}

export type ProductImages = ProductImage[]
export interface ProductImage {
  imageId: string
  imageUrl: string
}