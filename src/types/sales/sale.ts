export type Sales = Sale[]

export interface Sale {
  saleId: string
  movementId: string
  productName: string
  productLogo: string | null
  quantity: number
  sellPrice: number
  totalRevenue: number
  saleDate: string
  paid: boolean
}