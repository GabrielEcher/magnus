import { Toaster } from "sonner"
import AuthProvider from "./context/auth-provider"
import { AppRouter } from "./routes/routes"
import { ThemeProvider } from "./components/theme/theme-provider"


function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster richColors duration={4000} position='bottom-right' closeButton />
        <AppRouter />
      </ThemeProvider>


    </AuthProvider>
  )
}

export default App
