/** SYNC with backend presenters */

export interface LocalizedBlock {
  title: string
  summary?: string
  description?: string
  excerpt?: string
  body?: string
  audience?: string
  outcomes?: string
  ctaLabel?: string
}

export interface ServiceDto {
  id: string
  slug: string
  category: string
  isActive: boolean
  title: string
  summary: string
  description: string
  audience: string
  outcomes: string
  ctaLabel: string
  i18n: { fr: LocalizedBlock; en: LocalizedBlock }
}

export interface NewsDto {
  id: string
  slug: string
  type: 'communique' | 'alerte'
  publishedAt: string | null
  title: string
  excerpt: string
  body: string
  i18n: { fr: LocalizedBlock; en: LocalizedBlock }
}

export interface BookingCreated {
  reference: string
  serviceTitle: string
  createdAt: string
}

export interface BookingPublic {
  reference: string
  status: string
  createdAt: string
  fullName: string
  email: string
  country: string
  profile: string
  sector: string | null
  serviceTitle: string
}

export type ProfileType =
  | 'diaspora'
  | 'porteur_projet'
  | 'institution'
  | 'partenaire'
  | 'media'
