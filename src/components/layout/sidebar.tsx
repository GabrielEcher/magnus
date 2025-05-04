"use client"

import { Boxes, Building2, ChevronUp, DollarSign, Home, LogOut, Moon, ShoppingBag, Sun } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserData } from "@/hooks/use-user-info"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/hooks/use-theme"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const items = [
  {
    title: "Início",
    url: "/app",
    icon: Home,
  },
  {
    title: "Produtos",
    url: "/app/products",
    icon: Boxes,
  },
  {
    title: "Vendas",
    url: "/app/sales",
    icon: DollarSign,
  },
  {
    title: "Compras",
    url: "/app/purchases",
    icon: ShoppingBag,
  },
  {
    title: "Empresa",
    url: "/app/company",
    icon: Building2,
  },
]

export function AppSidebar() {
  const { data: userData } = useUserData()
  const { signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!userData?.name) return "U"
    return userData.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="">
          {/* Logo for collapsed state */}
          <div className="ml-0.2 hidden h-12 w-full items-center justify-center group-data-[collapsible=icon]:flex">
            <img
              src={theme === "dark" ? "/magnus_logo_only.png" : "/logo_orange.png"}
              alt="Logo"
              className="h-8 w-8 object-contain transition-all duration-200"
            />
          </div>

          {/* Logo for expanded state */}
          <SidebarGroupLabel className="mb-4 mt-4 group-data-[collapsible=icon]:hidden">
            <img
              src={theme === "dark" ? "/magnus_white.png" : "/magnus_black.png"}
              alt="Magnus Logo"
              className="w-full object-contain"
            />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto py-2">
                  <Avatar className="h-8 w-8 border border-sidebar-border">
                    <AvatarImage src={userData?.avatarUrl || "/placeholder.svg"} alt={userData?.name || "User"} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{userData?.name}</span>
                    <span className="text-xs text-sidebar-foreground/70">{userData?.email || "user@example.com"}</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                    
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2">
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      {theme === "dark" ? "Tema Claro" : "Tema Escuro"}
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    signOut()
                  }}
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair do Sistema
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
