import { randomBytes } from 'node:crypto'

export function makeBookingReference(date = new Date()): string {
  const ymd = date.toISOString().slice(0, 10).replaceAll('-', '')
  const rand = randomBytes(2).toString('hex').toUpperCase()
  return `DB-${ymd}-${rand}`
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  const head = local.slice(0, 1)
  return `${head}***@${domain}`
}

export function newId(): string {
  return randomBytes(12).toString('hex')
}
