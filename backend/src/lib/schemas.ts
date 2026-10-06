import { z } from 'zod'

export const profileEnum = z.enum([
  'diaspora',
  'porteur_projet',
  'institution',
  'partenaire',
  'media',
])

const phoneRegex = /^\+?[0-9 ()./-]{7,20}$/

function optionalPhone(value: unknown) {
  if (value === undefined || value === null || value === '') return undefined
  return value
}

export const bookingBodySchema = z.object({
  serviceSlug: z.string().trim().min(2).max(80),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.preprocess(optionalPhone, z.string().trim().regex(phoneRegex, 'Téléphone invalide').optional()),
  country: z.string().trim().min(2).max(80),
  profile: profileEnum,
  sector: z.preprocess(optionalPhone, z.string().trim().max(80).optional()),
  message: z.string().trim().min(20).max(2000),
  consent: z.literal(true),
})

export const newsletterBodySchema = z.object({
  email: z.string().trim().email().max(180),
  consent: z.literal(true),
  source: z.string().trim().max(40).optional(),
})

export const contactBodySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(20).max(2000),
  consent: z.literal(true),
})

export const newsQuerySchema = z.object({
  type: z.enum(['communique', 'alerte']).optional(),
  lang: z.enum(['fr', 'en']).optional(),
})
