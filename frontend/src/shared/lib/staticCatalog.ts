import catalog from '../../data/catalog.json'
import type { BookingPublic, NewsDto, ServiceDto } from '../types/api'

type Lang = 'fr' | 'en'

interface CatalogService {
  id: string
  slug: string
  category: string
  titleFr: string
  titleEn: string
  summaryFr: string
  summaryEn: string
  descriptionFr: string
  descriptionEn: string
  audienceFr: string
  audienceEn: string
  outcomesFr: string
  outcomesEn: string
  isActive: boolean
  ctaLabelFr: string
  ctaLabelEn: string
}

interface CatalogNews {
  id: string
  slug: string
  type: 'communique' | 'alerte'
  titleFr: string
  titleEn: string
  excerptFr: string
  excerptEn: string
  bodyFr: string
  bodyEn: string
  isPublished: boolean
  publishedAt: string | null
}

function currentLang(): Lang {
  if (typeof document !== 'undefined' && document.documentElement.lang.startsWith('en')) return 'en'
  return 'fr'
}

function pick(lang: Lang, fr: string, en: string): string {
  if (lang === 'en' && en.trim()) return en
  return fr
}

export function presentService(s: CatalogService, lang: Lang = currentLang()): ServiceDto {
  return {
    id: s.id,
    slug: s.slug,
    category: s.category,
    isActive: s.isActive,
    title: pick(lang, s.titleFr, s.titleEn),
    summary: pick(lang, s.summaryFr, s.summaryEn),
    description: pick(lang, s.descriptionFr, s.descriptionEn),
    audience: pick(lang, s.audienceFr, s.audienceEn),
    outcomes: pick(lang, s.outcomesFr, s.outcomesEn),
    ctaLabel: pick(lang, s.ctaLabelFr, s.ctaLabelEn),
    i18n: {
      fr: {
        title: s.titleFr,
        summary: s.summaryFr,
        description: s.descriptionFr,
        audience: s.audienceFr,
        outcomes: s.outcomesFr,
        ctaLabel: s.ctaLabelFr,
      },
      en: {
        title: s.titleEn,
        summary: s.summaryEn,
        description: s.descriptionEn,
        audience: s.audienceEn,
        outcomes: s.outcomesEn,
        ctaLabel: s.ctaLabelEn,
      },
    },
  }
}

export function presentNews(n: CatalogNews, lang: Lang = currentLang()): NewsDto {
  return {
    id: n.id,
    slug: n.slug,
    type: n.type,
    publishedAt: n.publishedAt,
    title: pick(lang, n.titleFr, n.titleEn),
    excerpt: pick(lang, n.excerptFr, n.excerptEn),
    body: pick(lang, n.bodyFr, n.bodyEn),
    i18n: {
      fr: { title: n.titleFr, excerpt: n.excerptFr, body: n.bodyFr },
      en: { title: n.titleEn, excerpt: n.excerptEn, body: n.bodyEn },
    },
  }
}

export function staticServices(): ServiceDto[] {
  return (catalog.services as CatalogService[]).filter((s) => s.isActive).map((s) => presentService(s))
}

export function staticService(slug: string): ServiceDto | undefined {
  const row = (catalog.services as CatalogService[]).find((s) => s.slug === slug && s.isActive)
  return row ? presentService(row) : undefined
}

export function staticNews(type?: 'communique' | 'alerte'): NewsDto[] {
  return (catalog.news as CatalogNews[])
    .filter((n) => n.isPublished)
    .filter((n) => (type ? n.type === type : true))
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
    .map((n) => presentNews(n))
}

export function staticNewsItem(slug: string): NewsDto | undefined {
  const row = (catalog.news as CatalogNews[]).find((n) => n.slug === slug && n.isPublished)
  return row ? presentNews(row) : undefined
}

const BOOKING_PREFIX = 'db-booking-'

export function makeReference(date = new Date()): string {
  const ymd = date.toISOString().slice(0, 10).replaceAll('-', '')
  const rand = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')
  return `DB-${ymd}-${rand}`
}

export function saveLocalBooking(booking: BookingPublic): void {
  sessionStorage.setItem(`${BOOKING_PREFIX}${booking.reference}`, JSON.stringify(booking))
}

export function readLocalBooking(reference: string): BookingPublic | undefined {
  const raw = sessionStorage.getItem(`${BOOKING_PREFIX}${reference}`)
  if (!raw) return undefined
  return JSON.parse(raw) as BookingPublic
}

export async function postNetlifyForm(formName: string, fields: Record<string, string>): Promise<void> {
  const body = new URLSearchParams({ 'form-name': formName, ...fields })
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) {
    throw new Error('NETLIFY_FORM_FAILED')
  }
}
