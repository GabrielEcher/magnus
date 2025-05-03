import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2 } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "../theme/mode-toggle"
import { useUserData } from "@/hooks/use-user-info"


export function Header() {
  const { data: userData } = useUserData()
  

  return (
    <header className="border-b bg-background sticky">
      <div className=" flex h-14 items-center justify-between py-4">
        <div className="flex items-center gap-4 p-4">
          <h1 className="text-xl font-bold"><SidebarTrigger/> Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4 mr-4">
        <ModeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-14 h-8 rounded-full">
                <Avatar className="w-14 h-10">
                  <AvatarImage className="object-cover" src="/aura.jpg" alt="Company Logo" />
                  <AvatarFallback>
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData?.companyName}</p>
                  <p className="text-xs leading-none text-muted-foreground">CNPJ: {userData?.cnpj}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-xs font-semibold">Address</span>
                <span className="text-xs"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-xs font-semibold">Phone</span>
                <span className="text-xs"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start">
                <span className="text-xs font-semibold">Email</span>
                <span className="text-xs">{userData?.email}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
