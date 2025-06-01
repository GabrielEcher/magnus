export type MonthlyReport = MonthlyData[]

export interface MonthlyData {
  month: string
  sales: number
  purchases: number
}