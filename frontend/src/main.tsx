import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from './app/ErrorBoundary'
import { AppProviders } from './app/providers'
import { router } from './app/router'
import './shared/i18n'
import './styles/index.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Root element missing')
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
)
