"use client"

import { Boxes, Building2, ChevronUp, DollarSign, Home, LogOut, ShoppingBag, User2 } from "lucide-react"

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useUserData } from "@/hooks/use-user-info"
import { useAuth } from "@/hooks/use-auth"

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
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="">
          {/* Logo for collapsed state */}
          <div className="ml-0.2 hidden h-12 w-full items-center justify-center group-data-[collapsible=icon]:flex">
            <img
              src="/logo_orange.png"
              alt="Logo"
              className="h-8 w-8 object-contain transition-all duration-200"
            />
          </div>

          {/* Logo for expanded state */}
          <SidebarGroupLabel className="mb-4 mt-4 group-data-[collapsible=icon]:hidden">
            <img src="/magnus_white.png" alt="Magnus Logo" className="w-full object-contain" />
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
                <SidebarMenuButton className="h-12">
                  <User2 />
                  <span className="truncate">{userData?.name}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    signOut()
                  }}
                >
                  <span className="flex items-center gap-2">
                    <LogOut />
                    Sign out
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
