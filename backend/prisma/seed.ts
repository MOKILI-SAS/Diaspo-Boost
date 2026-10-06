import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const here = path.dirname(fileURLToPath(import.meta.url))
const catalogPath = path.resolve(here, '../data/catalog.json')

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

async function seed() {
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8')) as {
    services: CatalogService[]
    news: CatalogNews[]
  }

  for (const s of catalog.services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: {
        id: s.id,
        slug: s.slug,
        category: s.category,
        titleFr: s.titleFr,
        titleEn: s.titleEn,
        summaryFr: s.summaryFr,
        summaryEn: s.summaryEn,
        descriptionFr: s.descriptionFr,
        descriptionEn: s.descriptionEn,
        audienceFr: s.audienceFr,
        audienceEn: s.audienceEn,
        outcomesFr: s.outcomesFr,
        outcomesEn: s.outcomesEn,
        isActive: s.isActive,
        ctaLabelFr: s.ctaLabelFr,
        ctaLabelEn: s.ctaLabelEn,
      },
      update: {
        category: s.category,
        titleFr: s.titleFr,
        titleEn: s.titleEn,
        summaryFr: s.summaryFr,
        summaryEn: s.summaryEn,
        descriptionFr: s.descriptionFr,
        descriptionEn: s.descriptionEn,
        audienceFr: s.audienceFr,
        audienceEn: s.audienceEn,
        outcomesFr: s.outcomesFr,
        outcomesEn: s.outcomesEn,
        isActive: s.isActive,
        ctaLabelFr: s.ctaLabelFr,
        ctaLabelEn: s.ctaLabelEn,
      },
    })
  }

  for (const n of catalog.news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      create: {
        id: n.id,
        slug: n.slug,
        type: n.type,
        titleFr: n.titleFr,
        titleEn: n.titleEn,
        excerptFr: n.excerptFr,
        excerptEn: n.excerptEn,
        bodyFr: n.bodyFr,
        bodyEn: n.bodyEn,
        isPublished: n.isPublished,
        publishedAt: n.publishedAt ? new Date(n.publishedAt) : null,
      },
      update: {
        type: n.type,
        titleFr: n.titleFr,
        titleEn: n.titleEn,
        excerptFr: n.excerptFr,
        excerptEn: n.excerptEn,
        bodyFr: n.bodyFr,
        bodyEn: n.bodyEn,
        isPublished: n.isPublished,
        publishedAt: n.publishedAt ? new Date(n.publishedAt) : null,
      },
    })
  }

  console.log(`Seeded ${catalog.services.length} services, ${catalog.news.length} news`)
}

seed()
  .catch((err: unknown) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
