import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-base-100 p-6">
          <div className="max-w-md text-center">
            <h1 className="font-display text-2xl font-bold text-navy">DiaspoBoost</h1>
            <p className="mt-3 text-neutral/70">Une erreur est survenue. Rechargez la page.</p>
            <button type="button" className="btn btn-primary mt-6 rounded-full" onClick={() => window.location.reload()}>
              Recharger
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
