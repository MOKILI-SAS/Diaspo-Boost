import { CONTACTS } from '../../data/contacts'

export const TIMEZONES = [
  { id: 'Africa/Kinshasa', label: 'Kinshasa (UTC+1)', offset: '+01:00' },
  { id: 'Africa/Casablanca', label: 'Casablanca (UTC+1)', offset: '+01:00' },
  { id: 'Europe/Brussels', label: 'Bruxelles / Paris (UTC+2)', offset: '+02:00' },
  { id: 'UTC', label: 'UTC', offset: '+00:00' },
] as const

export type RdvRecord = {
  reference: string
  createdAt: string
  fullName: string
  email: string
  phone: string
  country: string
  slotLabel: string
  slotStartIso: string
  slotEndIso: string
  timeZone: string
  notify: string
  telegram: string
  message: string
  googleUrl: string
  ics: string
  whatsappUrl: string
  telegramUrl: string
  mailtoUrl: string
}

const RDV_PREFIX = 'db-rdv-'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function toUtcStamp(date: Date): string {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
}

export function parseSlot(startLocal: string, timeZone: string, durationMin = 30): { start: Date; end: Date } {
  const tz = TIMEZONES.find((item) => item.id === timeZone) ?? TIMEZONES[3]
  const start = new Date(`${startLocal}:00${tz.offset}`)
  const end = new Date(start.getTime() + durationMin * 60_000)
  return { start, end }
}

export function formatSlotLabel(start: Date, lang: string, timeZone: string): string {
  return `${new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(start)} (${timeZone})`
}

export function googleCalendarUrl(title: string, details: string, start: Date, end: Date): string {
  const dates = `${toUtcStamp(start)}/${toUtcStamp(end)}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates,
    details,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildIcs(opts: { uid: string; title: string; details: string; start: Date; end: Date }): string {
  const stamp = toUtcStamp(new Date())
  const desc = opts.details.replace(/\n/g, '\\n')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DiaspoBoost//RDV//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${opts.uid}@diaspoboost.netlify.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toUtcStamp(opts.start)}`,
    `DTEND:${toUtcStamp(opts.end)}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${desc}`,
    'LOCATION:Visio / à confirmer par DiaspoBoost',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}

export function downloadIcs(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function teamNotifyMessage(record: Omit<RdvRecord, 'whatsappUrl' | 'telegramUrl' | 'mailtoUrl'>): string {
  return [
    'Nouveau RDV — accompagnement projet DiaspoBoost',
    `Référence : ${record.reference}`,
    `Nom : ${record.fullName}`,
    `E-mail : ${record.email}`,
    `Téléphone : ${record.phone || '—'}`,
    `Pays : ${record.country}`,
    `Créneau : ${record.slotLabel}`,
    `Notification demandée : ${record.notify}`,
    record.telegram ? `Telegram : ${record.telegram}` : '',
    '',
    record.message,
    '',
    `Google Agenda : ${record.googleUrl}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export function withNotifyLinks(base: Omit<RdvRecord, 'whatsappUrl' | 'telegramUrl' | 'mailtoUrl'>): RdvRecord {
  const text = teamNotifyMessage(base)
  const whatsappUrl = `https://wa.me/243812226604?text=${encodeURIComponent(text)}`
  const telegramUrl = `https://t.me/share/url?text=${encodeURIComponent(text)}`
  const mailtoUrl = `mailto:${CONTACTS.emails.join(',')}?subject=${encodeURIComponent(`RDV ${base.reference} — accompagnement projet`)}&body=${encodeURIComponent(text)}`
  return { ...base, whatsappUrl, telegramUrl, mailtoUrl }
}

export function saveRdv(record: RdvRecord): void {
  sessionStorage.setItem(`${RDV_PREFIX}${record.reference}`, JSON.stringify(record))
}

export function readRdv(reference: string): RdvRecord | undefined {
  const raw = sessionStorage.getItem(`${RDV_PREFIX}${reference}`)
  if (!raw) return undefined
  return JSON.parse(raw) as RdvRecord
}
