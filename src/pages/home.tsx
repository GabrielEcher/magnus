
import { CardFooter } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Activity } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { useSummary } from "@/hooks/dashboard/get-summary"
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
  const { data: insights } = useInsights()
  const { data: monthlyData } = useMonthlyReport()
  const { data: summary } = useSummary()

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="pl-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Indicadores da Sua Empresa</h1>
            <p className="text-muted-foreground">Monitore a performance do seu negócio</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Sales Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vendas</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {summary?.totalSales?.toLocaleString("pt-BR") || "0"}
                <span>
                  {summary?.totalReceivable > 0 && (
                    <Badge variant="outline" className="ml-2">
                      A receber: R$ {summary?.totalReceivable?.toLocaleString("pt-BR") || "0"}
                    </Badge>
                  )}
                  
                  </span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`flex items-center ${summary?.salesGrowthPaid >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {summary?.salesGrowthPaid >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {summary?.salesGrowthPaid >= 0 ? "+" : ""}
                  {summary?.salesGrowthPaid || 0}% desde o ano passado
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {summary?.totalRevenue?.toLocaleString("pt-BR") || "0"}</div>
              <p className="text-xs text-muted-foreground">Receita bruta do período</p>
            </CardContent>
          </Card>

          {/* Total Purchases Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gastos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {summary?.totalPurchases?.toLocaleString("pt-BR") || "0"}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`flex items-center ${summary?.purchasesGrowth >= 0 ? "text-orange-600" : "text-green-600"}`}
                >
                  {summary?.purchasesGrowth >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {summary?.purchasesGrowth >= 0 ? "+" : ""}
                  {summary?.purchasesGrowth || 0}% desde o ano passado
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Total Products Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary?.totalProductsSold?.toLocaleString("pt-BR") || "0"}</div>
              <p className="text-xs text-muted-foreground">Produtos vendidos no período</p>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Real Cash Flow Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fluxo de Caixa Real</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {Math.abs(summary?.cashFlowReal ?? 0).toLocaleString("pt-BR")}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant={summary?.cashFlowRealPositive ? "default" : "destructive"}
                  className={summary?.cashFlowRealPositive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                >
                  {summary?.cashFlowRealPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {summary?.cashFlowRealPositive ? "Positivo" : "Negativo"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {summary?.cashFlowRealPositive
                  ? "Seu negócio está gerando lucro real"
                  : "Revise seus gastos para melhorar o fluxo de caixa"}
              </p>
            </CardContent>
          </Card>

          {/* Theoretical Cash Flow Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fluxo de Caixa Teórico</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {Math.abs(summary?.cashFlowTheoretical ?? 0).toLocaleString("pt-BR")}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge
                  variant={summary?.cashFlowTheoreticalPositive ? "default" : "destructive"}
                  className={summary?.cashFlowTheoreticalPositive ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : ""}
                >
                  {summary?.cashFlowTheoreticalPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {summary?.cashFlowTheoreticalPositive ? "Positivo" : "Negativo"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Projeção baseada em vendas pendentes</p>
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

                    tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="dot" className="p-2 border shadow-lg rounded-md" />}
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
              <CardTitle className="text-lg">Insights de Negócio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Performance das Vendas</p>
                  <p className="text-sm text-muted-foreground">
                    {insights?.salesPerformance || "Dados não disponíveis"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 ${summary?.cashFlowRealPositive ? "bg-green-500" : "bg-red-500"} rounded-full mt-2`}
                ></div>
                <div>
                  <p className="font-medium">Status do Fluxo de Caixa Real</p>
                  <p className="text-sm text-muted-foreground">
                    {summary?.cashFlowRealPositive
                      ? "Fluxo de caixa positivo - negócio saudável"
                      : "Fluxo de caixa negativo - atenção necessária"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 ${summary?.cashFlowTheoreticalPositive ? "bg-blue-500" : "bg-orange-500"} rounded-full mt-2`}
                ></div>
                <div>
                  <p className="font-medium">Projeção Teórica</p>
                  <p className="text-sm text-muted-foreground">
                    {summary?.cashFlowTheoreticalPositive
                      ? "Projeção positiva considerando vendas pendentes"
                      : "Projeção indica necessidade de melhoria"}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Portfólio de Produtos</p>
                  <p className="text-sm text-muted-foreground">
                    {insights?.productPortfolio || `${summary?.totalProductsSold || 0} produtos vendidos no período`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Receita Total</span>
                <span className="text-sm font-bold">R$ {summary?.totalRevenue?.toLocaleString("pt-BR") || "0"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Vendas Realizadas</span>
                <span className="text-sm font-bold">R$ {summary?.totalSales?.toLocaleString("pt-BR") || "0"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gastos Totais</span>
                <span className="text-sm font-bold text-red-600">
                  -R$ {summary?.totalPurchases?.toLocaleString("pt-BR") || "0"}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Fluxo de Caixa Real</span>
                  <span
                    className={`text-sm font-bold ${summary?.cashFlowRealPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    {summary?.cashFlowRealPositive ? "+" : "-"}R${" "}
                    {Math.abs(summary?.cashFlowReal ?? 0).toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fluxo Teórico</span>
                <span
                  className={`text-sm font-bold ${summary?.cashFlowTheoreticalPositive ? "text-blue-600" : "text-orange-600"}`}
                >
                  {summary?.cashFlowTheoreticalPositive ? "+" : "-"}R${" "}
                  {Math.abs(summary?.cashFlowTheoretical ?? 0).toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Produtos Vendidos</span>
                <span className="text-sm font-bold">
                  {summary?.totalProductsSold?.toLocaleString("pt-BR") || "0"} unidades
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
