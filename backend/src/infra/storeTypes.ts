export type ProfileType =
  | 'diaspora'
  | 'porteur_projet'
  | 'institution'
  | 'partenaire'
  | 'media'

export type BookingStatus = 'new' | 'in_review' | 'contacted' | 'closed'
export type NewsType = 'communique' | 'alerte'

export interface ServiceRecord {
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
  createdAt: string
  updatedAt: string
}

export interface NewsRecord {
  id: string
  slug: string
  type: NewsType
  titleFr: string
  titleEn: string
  excerptFr: string
  excerptEn: string
  bodyFr: string
  bodyEn: string
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface BookingRecord {
  id: string
  reference: string
  serviceId: string
  fullName: string
  email: string
  phone: string | null
  country: string
  profile: ProfileType
  sector: string | null
  message: string
  status: BookingStatus
  createdAt: string
}

export interface SubscriberRecord {
  id: string
  email: string
  consentAt: string
  source: string
  isActive: boolean
  createdAt: string
}

export interface ContactRecord {
  id: string
  fullName: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export interface CreateBookingInput {
  serviceSlug: string
  fullName: string
  email: string
  phone?: string
  country: string
  profile: ProfileType
  sector?: string
  message: string
}

export interface DataStore {
  ping(): Promise<boolean>
  listActiveServices(): Promise<ServiceRecord[]>
  getActiveServiceBySlug(slug: string): Promise<ServiceRecord | null>
  listPublishedNews(type?: NewsType): Promise<NewsRecord[]>
  getPublishedNewsBySlug(slug: string): Promise<NewsRecord | null>
  createBooking(input: CreateBookingInput): Promise<BookingRecord & { serviceTitleFr: string; serviceTitleEn: string }>
  getBookingByReference(reference: string): Promise<(BookingRecord & { serviceTitleFr: string; serviceTitleEn: string }) | null>
  listBookings(): Promise<(BookingRecord & { serviceTitleFr: string; serviceSlug: string })[]>
  subscribe(email: string, source: string): Promise<{ created: boolean }>
  createContact(input: { fullName: string; email: string; subject: string; message: string }): Promise<ContactRecord>
}
