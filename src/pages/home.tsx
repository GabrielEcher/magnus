"use client"

import { CardFooter } from "@/components/ui/card"

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Activity } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { useSummary } from "@/hooks/dashboard/get-summary"
import { useFinancialSummary } from "@/hooks/dashboard/get-financial-summary"
import { useMonthlyReport } from "@/hooks/dashboard/get-monthly-report"
import { useInsights } from "@/hooks/dashboard/get-insights"

const chartConfig = {
  sales: {
    label: "Vendas (R$): ",
    color: "hsl(var(--chart-1))",
  },
  purchases: {
    label: "Gastos (R$): ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Home() {
  const { data: insights } = useInsights();
  const { data: monthlyData } = useMonthlyReport();
  const { data: summary } = useSummary();
  const { data: financialSummary } = useFinancialSummary();
  
  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="pl-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold ">Indicadores da Sua Empresa</h1>
            <p className="">Monitore a performance do seu negócio</p>
          </div>
          <div className="text-sm text-muted-foreground">Ultima atualização: {new Date().toLocaleDateString()}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Sales Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faturado</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R${summary?.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />+{summary?.salesGrowth}% desde o ano passado
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Total Purchases Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R${summary?.totalPurchases.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-orange-600 flex items-center">
                  
                    <TrendingUp className="h-3 w-3 mr-1" />
                  
                  {summary?.purchasesGrowth}% desde o ano passado
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Total Products Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary?.totalProductsSold.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center">
                  {/* <TrendingUp className="h-3 w-3 mr-1" /> */}
                  Produtos vendidos no ano atual
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Cash Flow Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R${Math.abs(summary?.cashFlow ?? 0).toLocaleString()}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant={summary?.cashFlowPositive ? "default" : "destructive"}
                  className={summary?.cashFlowPositive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                >
                  {summary?.cashFlowPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {summary?.cashFlowPositive ? "Positivo" : "Negativo"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {summary?.cashFlowPositive ? "Seu negócio está gerando lucro" : "Revise seus gastos para melhorar o fluxo de caixa"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Evolution Chart */}
        <div className="grid gap-6 md:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Vendas e Compras</CardTitle>
              <CardDescription>Comparação mensal da receita de vendas vs custos de compra</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={monthlyData}
                  margin={{
                    left: 12,
                    right: 12,
                    top: 12,
                    bottom: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip
                    
                    content={
                      <ChartTooltipContent indicator="dot" className=" p-2 border shadow-lg rounded-md" />
                    }
                    // formatter={(value, name) => [
                    //   `R$${Number(value).toLocaleString()}`,
                    //   name === "sales" ? " Vendas" : " Compras/Gastos",
                    // ]}
                    wrapperStyle={{ outline: "none" }}
                  />
                  <Bar dataKey="purchases" fill="var(--chart-3)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="sales" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    {insights?.salesPerformance} <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    Mostrando dados de compras e vendas do ano atual
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insights de negócio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Performance das Vendas</p>
                  <p className="text-sm text-muted-foreground">
                    {insights?.salesPerformance}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 ${summary?.cashFlowPositive ? "bg-green-500" : "bg-red-500"} rounded-full mt-2`}></div>
                <div>
                  <p className="font-medium">Status do Fluxo de Caixa</p>
                  <p className="text-sm text-muted-foreground">
                    {insights?.cashFlowStatus}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Portifólio de Produtos</p>
                  <p className="text-sm text-muted-foreground">
                    {insights?.productPortfolio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sumário Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Receita Bruta</span>
                <span className="text-sm font-bold">${financialSummary?.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gastos Totais</span>
                <span className="text-sm font-bold">-${financialSummary?.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Lucro Liquído</span>
                  <span className={`text-sm font-bold ${summary?.cashFlowPositive ? "text-green-600" : "text-red-600"}`}>
                    {financialSummary?.netProfit.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Margem de Lucro</span>
                <span className="text-sm font-bold">{financialSummary?.profitMargin}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
