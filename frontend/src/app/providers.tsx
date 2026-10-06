import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
})

function LangSync({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  useEffect(() => {
    void queryClient.invalidateQueries()
  }, [i18n.language])
  return children
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LangSync>{children}</LangSync>
    </QueryClientProvider>
  )
}
