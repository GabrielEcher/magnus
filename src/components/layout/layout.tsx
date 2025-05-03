import { SidebarProvider } from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie'
import { AppSidebar } from "./sidebar";
import { Header } from "./header";
export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const defaultOpen = Cookies.get("sidebar_state") === "true"

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex-1">
        <Header/>
        

        {children}
      </main>
    </SidebarProvider>
  )
}