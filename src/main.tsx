import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }
  })
}
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>
    
  </StrictMode>,
)
