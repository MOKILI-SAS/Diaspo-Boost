import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}>{children}</div>
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-14 sm:py-20', className)}>
      {children}
    </section>
  )
}

export function PageHero({ kicker, title, lead }: { kicker?: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <AfricaMark className="h-full w-full" />
      </div>
      <Container className="relative py-16 sm:py-20">
        {kicker ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-magenta">{kicker}</p> : null}
        <h1 className="font-display mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">{lead}</p> : null}
      </Container>
    </div>
  )
}

export function Spinner({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-navy" role="status">
      <span className="loading loading-spinner loading-md" />
      <span>{label}</span>
    </div>
  )
}

export function EmptyState({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-base-300 bg-base-200 px-6 py-12 text-center">
      <p className="text-navy/80">{title}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

export function ErrorState({ message, onRetry, retryLabel }: { message: string; onRetry: () => void; retryLabel: string }) {
  return (
    <EmptyState
      title={message}
      action={
        <button type="button" className="btn btn-primary rounded-full" onClick={onRetry}>
          {retryLabel}
        </button>
      }
    />
  )
}

export function AfricaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 12 C38 12 43 14 46 15 C50 14 53 11 55 13 C57 16 54 21 57 23 C62 23 68 18 73 21 C76 23 75 27 74 30 C76 34 81 37 84 41 C89 45 93 47 92 51 C89 54 85 53 82 56 C79 60 78 66 75 70 C72 75 68 81 65 86 C62 91 58 96 55 95 C51 93 51 86 49 82 C46 76 43 70 45 64 C43 60 38 57 33 57 C28 58 24 55 20 53 C15 50 10 46 9 40 C8 34 14 31 18 28 C21 25 21 21 24 18 C28 15 31 13 35 12 Z" />
      <path d="M82 66 C85 64 87 67 87 72 C87 77 84 83 81 85 C79 85 78 81 79 77 C80 73 80 68 82 66 Z" />
    </svg>
  )
}

export function ArmoiriesPlaceholder({ alt }: { alt: string }) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-navy/20 bg-white text-center"
      title={alt}
      role="img"
      aria-label={alt}
    >
      <svg viewBox="0 0 48 48" className="h-10 w-10 text-navy" aria-hidden="true">
        <path fill="currentColor" d="M24 4 8 12v10c0 11 7 18 16 22 9-4 16-11 16-22V12L24 4z" opacity="0.15" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          d="M24 6 10 13v9c0 10 6.2 16.2 14 20 7.8-3.8 14-10 14-20v-9L24 6z"
        />
        <text x="24" y="28" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">
          RDC
        </text>
      </svg>
    </div>
  )
}

export function BodyText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\n+/).filter((p) => p.trim())
  return (
    <div className={cn('space-y-4 text-base leading-relaxed text-neutral/80', className)}>
      {parts.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
    </div>
  )
}
