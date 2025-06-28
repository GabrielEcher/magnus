export type Purchases = Purchase[]

export interface Purchase {
  purchaseId: string
  productName: string
  productLogo?: string
  quantity: number
  buyPrice: number
  totalSpent: number
  purchaseDate: string
  movementId: string
}