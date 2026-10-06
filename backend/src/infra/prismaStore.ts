import { PrismaClient } from '@prisma/client'
import { conflict, notFound } from './errors.js'
import { makeBookingReference } from '../lib/ids.js'
import type { CreateBookingInput, DataStore, NewsType } from './storeTypes.js'

function mapService(s: {
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
  createdAt: Date
  updatedAt: Date
}) {
  return {
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }
}

export class PrismaStore implements DataStore {
  constructor(private readonly prisma: PrismaClient) {}

  async ping(): Promise<boolean> {
    await this.prisma.$queryRaw`SELECT 1`
    return true
  }

  async listActiveServices() {
    const rows = await this.prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    })
    return rows.map(mapService)
  }

  async getActiveServiceBySlug(slug: string) {
    const row = await this.prisma.service.findFirst({ where: { slug, isActive: true } })
    return row ? mapService(row) : null
  }

  async listPublishedNews(type?: NewsType) {
    const rows = await this.prisma.news.findMany({
      where: { isPublished: true, ...(type ? { type } : {}) },
      orderBy: { publishedAt: 'desc' },
    })
    return rows.map((n) => ({
      ...n,
      publishedAt: n.publishedAt?.toISOString() ?? null,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    }))
  }

  async getPublishedNewsBySlug(slug: string) {
    const n = await this.prisma.news.findFirst({ where: { slug, isPublished: true } })
    if (!n) return null
    return {
      ...n,
      publishedAt: n.publishedAt?.toISOString() ?? null,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    }
  }

  async createBooking(input: CreateBookingInput) {
    const service = await this.prisma.service.findFirst({
      where: { slug: input.serviceSlug, isActive: true },
    })
    if (!service) throw notFound('Service introuvable ou inactif')

    const email = input.email.toLowerCase()
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const duplicate = await this.prisma.booking.findFirst({
      where: { email, serviceId: service.id, createdAt: { gt: since } },
    })
    if (duplicate) {
      throw conflict('Une demande pour ce service a déjà été envoyée avec cet e-mail au cours des dernières 24 heures.')
    }

    const booking = await this.prisma.booking.create({
      data: {
        reference: makeBookingReference(),
        serviceId: service.id,
        fullName: input.fullName,
        email,
        phone: input.phone,
        country: input.country,
        profile: input.profile,
        sector: input.sector,
        message: input.message,
      },
    })
    return {
      ...booking,
      phone: booking.phone,
      sector: booking.sector,
      createdAt: booking.createdAt.toISOString(),
      serviceTitleFr: service.titleFr,
      serviceTitleEn: service.titleEn,
    }
  }

  async getBookingByReference(reference: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { reference },
      include: { service: true },
    })
    if (!booking) return null
    return {
      id: booking.id,
      reference: booking.reference,
      serviceId: booking.serviceId,
      fullName: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      country: booking.country,
      profile: booking.profile,
      sector: booking.sector,
      message: booking.message,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      serviceTitleFr: booking.service.titleFr,
      serviceTitleEn: booking.service.titleEn,
    }
  }

  async listBookings() {
    const rows = await this.prisma.booking.findMany({
      include: { service: true },
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((b) => ({
      id: b.id,
      reference: b.reference,
      serviceId: b.serviceId,
      fullName: b.fullName,
      email: b.email,
      phone: b.phone,
      country: b.country,
      profile: b.profile,
      sector: b.sector,
      message: b.message,
      status: b.status,
      createdAt: b.createdAt.toISOString(),
      serviceTitleFr: b.service.titleFr,
      serviceSlug: b.service.slug,
    }))
  }

  async subscribe(email: string, source: string) {
    const normalized = email.toLowerCase()
    const existing = await this.prisma.subscriber.findUnique({ where: { email: normalized } })
    if (existing) {
      if (!existing.isActive) {
        await this.prisma.subscriber.update({
          where: { email: normalized },
          data: { isActive: true, consentAt: new Date(), source },
        })
      }
      return { created: false }
    }
    await this.prisma.subscriber.create({
      data: { email: normalized, consentAt: new Date(), source },
    })
    return { created: true }
  }

  async createContact(input: { fullName: string; email: string; subject: string; message: string }) {
    const row = await this.prisma.contactMessage.create({
      data: { ...input, email: input.email.toLowerCase() },
    })
    return { ...row, createdAt: row.createdAt.toISOString() }
  }
}
