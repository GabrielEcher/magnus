"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Phone,
  Mail,
  Moon,
  Sun,
  Menu,
} from "lucide-react"
import {  useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

export default function LandingPage() {
  const {theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { authenticated } = useAuth();

  if (authenticated) {
    const lastPath = localStorage.getItem("lastPath")

    return <Navigate to={lastPath ? lastPath : "/app"} replace />
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="px-4 h-16 flex items-center border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 lg:px-6">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg mr-3 md:w-12 md:h-12 md:mr-4">
          <img className="w-6 md:w-8" src="/planet.svg" alt="Magnus Logo" />
        </div>
        <div className="flex-1">
          <span className="text-lg font-bold md:text-xl">Magnus</span>
          <p className="text-xs text-muted-foreground md:text-sm">Gerenciamento Empresarial</p>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex ml-auto gap-4 items-center lg:gap-6">
          <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Funcionalidades
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Contato
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-2"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Funcionalidades
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contato
              </a>
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="justify-start"
              >
                <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 ml-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                Alternar tema
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="flex flex-col space-y-4 text-center lg:text-left">
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                    Solução para pequenas e médias empresas
                  </Badge>
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    Simplifique suas operações comerciais
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-[600px] mx-auto lg:mx-0">
                    Gerencie seu fluxo de caixa, estoque, vendas e compras, tudo em uma plataforma poderosa. Assuma o
                    controle do seu negócio com insights em tempo real.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Button onClick={() => navigate("/login")} size="lg" className="w-full sm:w-auto">
                    Acessar Sistema
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <a href="https://wa.me/5551980404660" target="_blank">
                    Entre em contato
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-4 w-4" />
                    
                  </Button>
                    </a>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
                  <Card className="relative bg-card/80 backdrop-blur-sm border shadow-2xl">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-center text-lg">Visão Geral</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2 md:h-8 md:w-8" />
                          <p className="text-xs font-medium md:text-sm">Crescimento Financeiro</p>
                          <p className="text-lg font-bold text-green-600 md:text-2xl">+24%</p>
                        </div>
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <Package className="h-6 w-6 text-blue-600 mx-auto mb-2 md:h-8 md:w-8" />
                          <p className="text-xs font-medium md:text-sm">Produtos</p>
                          <p className="text-lg font-bold text-blue-600 md:text-2xl">1,247</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <ShoppingCart className="h-6 w-6 text-purple-600 mx-auto mb-2 md:h-8 md:w-8" />
                          <p className="text-xs font-medium md:text-sm">Vendas</p>
                          <p className="text-lg font-bold text-purple-600 md:text-2xl">$45.2K</p>
                        </div>
                        <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <CreditCard className="h-6 w-6 text-orange-600 mx-auto mb-2 md:h-8 md:w-8" />
                          <p className="text-xs font-medium md:text-sm">Fluxo de Caixa</p>
                          <p className="text-lg font-bold text-orange-600 md:text-2xl">$12.8K</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-8 bg-muted/30 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <Badge variant="secondary">Funcionalidades do Sistema</Badge>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Explore as funcionalidades do sistema
                </h2>
                <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-[900px]">
                  Nossa plataforma abrangente fornece todas as ferramentas necessárias para otimizar as operações,
                  aumentar a eficiência e impulsionar o crescimento.
                </p>
              </div>
            </div>

            <div className="grid gap-6 py-8 md:py-12 lg:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20 w-fit">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Gerenciamento de Fluxo de Caixa</CardTitle>
                        <CardDescription className="text-sm">
                          Acompanhe receitas, despesas e posição de caixa em tempo real
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Monitoramento em tempo real do fluxo de caixa</li>
                      <li>• Insights financeiros</li>
                      <li>• Cobranças a receber</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 w-fit">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Gerenciamento de Produtos</CardTitle>
                        <CardDescription className="text-sm">
                          Organize e acompanhe todo o seu catálogo de produtos
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Acompanhamento de estoque</li>
                      <li>• Categorização de produto</li>
                      <li>• Alertas no estoque</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 w-fit">
                        <ShoppingCart className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Gerenciamento de Vendas</CardTitle>
                        <CardDescription className="text-sm">
                          Simplifique seu processo de vendas, do lead ao fechamento
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Acompanhamento das vendas</li>
                      <li>• Análise de Performance</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20 w-fit">
                        <CreditCard className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Gerenciamento de Compras</CardTitle>
                        <CardDescription className="text-sm">
                          Otimizar as compras e os relacionamentos com fornecedores
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Acompanhamento de custos</li>
                      <li>• Categorização de compras por produto</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="flex flex-col space-y-4 text-center lg:text-left">
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                    Por que escolher o Magnus?
                  </Badge>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                    Construído para empresas modernas
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-[600px] mx-auto lg:mx-0">
                    Nossa plataforma foi projetada com a mais recente tecnologia e as melhores práticas para garantir
                    que suas operações comerciais funcionem de forma tranquila e eficiente.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Zap className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Rápido como um raio</h3>
                      <p className="text-xs text-muted-foreground">Performance Otimizada</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Seguro e confiável</h3>
                      <p className="text-xs text-muted-foreground">Segurança de nível empresarial</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Análises Avançadas</h3>
                      <p className="text-xs text-muted-foreground">Insights baseados em dados</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Colaboração em time</h3>
                      <p className="text-xs text-muted-foreground">Trabalhe em conjunto perfeitamente</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20"></div>
                  <div className="relative bg-card rounded-3xl p-6 shadow-2xl border md:p-8">
                    <div className="text-center space-y-4">
                      <div className="text-3xl font-bold md:text-4xl">99.9%</div>
                      <p className="text-muted-foreground text-sm">Garantia de tempo de atividade</p>
                      <div className="text-3xl font-bold md:text-4xl">24/7</div>
                      <p className="text-muted-foreground text-sm">Suporte ao cliente</p>
                      <div className="text-2xl font-bold md:text-3xl">Pronta para evoluir</div>
                      <p className="text-muted-foreground text-sm">Estamos em constante evolução</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="w-full py-8 bg-gradient-to-r from-blue-600 to-purple-600 md:py-16 lg:py-24 xl:py-32"
        >
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  Pronto para transformar seu negócio?
                </h2>
                <p className="text-blue-100 text-base md:text-lg lg:text-xl max-w-[700px]">
                  Junte-se a nós para otimizar suas operações e impulsionar o crescimento. Comece hoje mesmo!
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full max-w-sm sm:flex-row sm:max-w-none sm:justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Acessar o sistema agora
                </Button>
                
                <a href="https://wa.me/5551980404660" target="_blank">
                  <Button
                
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  
                </Button>
                  
                  </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 py-6 w-full shrink-0 items-center px-4 border-t bg-muted/30 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          © 2024 Magnus. Todos direitos reservados.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Termos de Serviço
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Política de Privacidade
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Suporte
          </a>
        </nav>
      </footer>
    </div>
  )
}
