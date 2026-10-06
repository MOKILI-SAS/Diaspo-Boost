import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { conflict, notFound } from './errors.js'
import { makeBookingReference, newId } from '../lib/ids.js'
import type {
  BookingRecord,
  ContactRecord,
  CreateBookingInput,
  DataStore,
  NewsRecord,
  NewsType,
  ServiceRecord,
  SubscriberRecord,
} from './storeTypes.js'

interface Catalog {
  services: ServiceRecord[]
  news: NewsRecord[]
}

interface Runtime {
  services: ServiceRecord[]
  news: NewsRecord[]
  bookings: BookingRecord[]
  subscribers: SubscriberRecord[]
  contacts: ContactRecord[]
}

const here = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.resolve(here, '../../data')
const catalogPath = path.join(dataDir, 'catalog.json')
const runtimePath = path.join(dataDir, 'runtime.json')

function nowIso(): string {
  return new Date().toISOString()
}

function stampServices(raw: Catalog['services']): ServiceRecord[] {
  const t = nowIso()
  return raw.map((s) => ({
    ...s,
    createdAt: s.createdAt ?? t,
    updatedAt: s.updatedAt ?? t,
  }))
}

function stampNews(raw: Catalog['news']): NewsRecord[] {
  const t = nowIso()
  return raw.map((n) => ({
    ...n,
    createdAt: n.createdAt ?? t,
    updatedAt: n.updatedAt ?? t,
  }))
}

export class JsonStore implements DataStore {
  private runtime!: Runtime

  init(): void {
    mkdirSync(dataDir, { recursive: true })
    const catalog = JSON.parse(readFileSync(catalogPath, 'utf8')) as Catalog
    if (!existsSync(runtimePath)) {
      this.runtime = {
        services: stampServices(catalog.services),
        news: stampNews(catalog.news),
        bookings: [],
        subscribers: [],
        contacts: [],
      }
      this.persist()
      return
    }
    this.runtime = JSON.parse(readFileSync(runtimePath, 'utf8')) as Runtime
    this.runtime.services = stampServices(catalog.services)
    this.runtime.news = stampNews(catalog.news)
    this.persist()
  }

  private persist(): void {
    writeFileSync(runtimePath, JSON.stringify(this.runtime, null, 2), 'utf8')
  }

  async ping(): Promise<boolean> {
    return true
  }

  async listActiveServices(): Promise<ServiceRecord[]> {
    return this.runtime.services.filter((s) => s.isActive)
  }

  async getActiveServiceBySlug(slug: string): Promise<ServiceRecord | null> {
    return this.runtime.services.find((s) => s.slug === slug && s.isActive) ?? null
  }

  async listPublishedNews(type?: NewsType): Promise<NewsRecord[]> {
    return this.runtime.news
      .filter((n) => n.isPublished)
      .filter((n) => (type ? n.type === type : true))
      .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  }

  async getPublishedNewsBySlug(slug: string): Promise<NewsRecord | null> {
    return this.runtime.news.find((n) => n.slug === slug && n.isPublished) ?? null
  }

  async createBooking(input: CreateBookingInput) {
    const service = await this.getActiveServiceBySlug(input.serviceSlug)
    if (!service) throw notFound('Service introuvable ou inactif')

    const email = input.email.toLowerCase()
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000
    const duplicate = this.runtime.bookings.some(
      (b) => b.email === email && b.serviceId === service.id && Date.parse(b.createdAt) > dayAgo,
    )
    if (duplicate) {
      throw conflict('Une demande pour ce service a déjà été envoyée avec cet e-mail au cours des dernières 24 heures.')
    }

    const booking: BookingRecord = {
      id: newId(),
      reference: makeBookingReference(),
      serviceId: service.id,
      fullName: input.fullName,
      email,
      phone: input.phone ?? null,
      country: input.country,
      profile: input.profile,
      sector: input.sector ?? null,
      message: input.message,
      status: 'new',
      createdAt: nowIso(),
    }
    this.runtime.bookings.push(booking)
    this.persist()
    return { ...booking, serviceTitleFr: service.titleFr, serviceTitleEn: service.titleEn }
  }

  async getBookingByReference(reference: string) {
    const booking = this.runtime.bookings.find((b) => b.reference === reference)
    if (!booking) return null
    const service = this.runtime.services.find((s) => s.id === booking.serviceId)
    return {
      ...booking,
      serviceTitleFr: service?.titleFr ?? '',
      serviceTitleEn: service?.titleEn ?? '',
    }
  }

  async listBookings() {
    return this.runtime.bookings
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((b) => {
        const service = this.runtime.services.find((s) => s.id === b.serviceId)
        return {
          ...b,
          serviceTitleFr: service?.titleFr ?? '',
          serviceSlug: service?.slug ?? '',
        }
      })
  }

  async subscribe(email: string, source: string) {
    const normalized = email.toLowerCase()
    const existing = this.runtime.subscribers.find((s) => s.email === normalized)
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true
        existing.consentAt = nowIso()
        this.persist()
        return { created: false }
      }
      return { created: false }
    }
    this.runtime.subscribers.push({
      id: newId(),
      email: normalized,
      consentAt: nowIso(),
      source,
      isActive: true,
      createdAt: nowIso(),
    })
    this.persist()
    return { created: true }
  }

  async createContact(input: { fullName: string; email: string; subject: string; message: string }) {
    const row: ContactRecord = {
      id: newId(),
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      subject: input.subject,
      message: input.message,
      createdAt: nowIso(),
    }
    this.runtime.contacts.push(row)
    this.persist()
    return row
  }
}
