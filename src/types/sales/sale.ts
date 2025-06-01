export type Sales = Sale[]

export interface Sale {
  saleId: string
  productName: string
  productLogo: string | null
  quantity: number
  sellPrice: number
  totalRevenue: number
  saleDate: string
}