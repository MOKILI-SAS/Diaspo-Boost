import axios from 'axios'
import type { BookingCreated, BookingPublic, NewsDto, ServiceDto } from '../types/api'
import {
  makeReference,
  postNetlifyForm,
  readLocalBooking,
  saveLocalBooking,
  staticNews,
  staticNewsItem,
  staticService,
  staticServices,
} from './staticCatalog'

function liveBase(): string | null {
  const raw = import.meta.env.VITE_API_URL?.trim()
  if (!raw) return null
  return raw.replace(/\/$/, '')
}

const base = liveBase()

export const api = axios.create({
  baseURL: base ? `${base}/api/v1` : '/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export function setApiLang(lang: string): void {
  if (!base) return
  api.defaults.headers.common['Accept-Language'] = lang
}

export async function fetchServices(): Promise<ServiceDto[]> {
  if (!base) return staticServices()
  try {
    const { data } = await api.get<{ data: ServiceDto[] }>('/services')
    return data.data
  } catch {
    return staticServices()
  }
}

export async function fetchService(slug: string): Promise<ServiceDto> {
  if (!base) {
    const row = staticService(slug)
    if (!row) throw new Error('NOT_FOUND')
    return row
  }
  const { data } = await api.get<{ data: ServiceDto }>(`/services/${slug}`)
  return data.data
}

export async function fetchNews(type?: 'communique' | 'alerte'): Promise<NewsDto[]> {
  if (!base) return staticNews(type)
  try {
    const { data } = await api.get<{ data: NewsDto[] }>('/news', { params: type ? { type } : undefined })
    return data.data
  } catch {
    return staticNews(type)
  }
}

export async function fetchNewsItem(slug: string): Promise<NewsDto> {
  if (!base) {
    const row = staticNewsItem(slug)
    if (!row) throw new Error('NOT_FOUND')
    return row
  }
  const { data } = await api.get<{ data: NewsDto }>(`/news/${slug}`)
  return data.data
}

export async function createBooking(payload: Record<string, unknown>): Promise<BookingCreated> {
  if (base) {
    const { data } = await api.post<BookingCreated>('/bookings', payload)
    return data
  }
  const createdAt = new Date().toISOString()
  const reference = makeReference()
  const service = staticService(String(payload.serviceSlug ?? ''))
  const serviceTitle = service?.title ?? String(payload.serviceSlug ?? '')
  try {
    await postNetlifyForm('booking', {
      reference,
      serviceSlug: String(payload.serviceSlug ?? ''),
      fullName: String(payload.fullName ?? ''),
      email: String(payload.email ?? ''),
      phone: String(payload.phone ?? ''),
      country: String(payload.country ?? ''),
      profile: String(payload.profile ?? ''),
      sector: String(payload.sector ?? ''),
      message: String(payload.message ?? ''),
    })
  } catch {
    /* Netlify Forms s’activent après le premier deploy ; la confirmation locale reste disponible. */
  }
  saveLocalBooking({
    reference,
    status: 'new',
    createdAt,
    fullName: String(payload.fullName ?? ''),
    email: String(payload.email ?? ''),
    country: String(payload.country ?? ''),
    profile: String(payload.profile ?? ''),
    sector: payload.sector ? String(payload.sector) : null,
    serviceTitle,
  })
  return { reference, serviceTitle, createdAt }
}

export async function fetchBooking(reference: string): Promise<BookingPublic> {
  if (base) {
    const { data } = await api.get<{ data: BookingPublic }>(`/bookings/${reference}`)
    return data.data
  }
  const local = readLocalBooking(reference)
  if (!local) throw new Error('NOT_FOUND')
  return local
}

export async function subscribeNewsletter(email: string, consent: boolean): Promise<{ created: boolean }> {
  if (base) {
    const { data } = await api.post<{ created: boolean }>('/newsletter', { email, consent, source: 'footer' })
    return data
  }
  await postNetlifyForm('newsletter', { email, consent: consent ? 'true' : 'false' })
  return { created: true }
}

export async function submitRdv(payload: Record<string, unknown>): Promise<BookingCreated> {
  const createdAt = new Date().toISOString()
  const reference = makeReference()
  const service = staticService(String(payload.serviceSlug ?? 'accompagnement-investissement'))
  const serviceTitle = service?.title ?? 'Accompagnement projet'
  const fields = {
    reference,
    serviceSlug: String(payload.serviceSlug ?? ''),
    fullName: String(payload.fullName ?? ''),
    email: String(payload.email ?? ''),
    phone: String(payload.phone ?? ''),
    country: String(payload.country ?? ''),
    slot: String(payload.slot ?? ''),
    timeZone: String(payload.timeZone ?? ''),
    notifyEmail: payload.notifyEmail ? 'oui' : 'non',
    notifyWhatsapp: payload.notifyWhatsapp ? 'oui' : 'non',
    notifyTelegram: payload.notifyTelegram ? 'oui' : 'non',
    telegram: String(payload.telegram ?? ''),
    message: String(payload.message ?? ''),
  }
  if (base) {
    try {
      const { data } = await api.post<BookingCreated>('/bookings', {
        ...payload,
        serviceSlug: payload.serviceSlug,
        consent: true,
      })
      return data
    } catch {
      /* fallback Netlify / local */
    }
  }
  try {
    await postNetlifyForm('rdv', fields)
  } catch {
    /* Netlify Forms s’activent après le premier deploy. */
  }
  saveLocalBooking({
    reference,
    status: 'rdv',
    createdAt,
    fullName: fields.fullName,
    email: fields.email,
    country: fields.country,
    profile: 'porteur_projet',
    sector: fields.slot,
    serviceTitle,
  })
  return { reference, serviceTitle, createdAt }
}

export async function sendContact(payload: Record<string, unknown>): Promise<void> {
  if (base) {
    await api.post('/contact', payload)
    return
  }
  await postNetlifyForm('contact', {
    fullName: String(payload.fullName ?? ''),
    email: String(payload.email ?? ''),
    subject: String(payload.subject ?? ''),
    message: String(payload.message ?? ''),
  })
}
