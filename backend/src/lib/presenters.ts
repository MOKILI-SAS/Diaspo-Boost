import type { Lang } from '../lib/lang.js'
import { pickLocalized } from '../lib/lang.js'
import type { NewsRecord, ServiceRecord } from '../infra/storeTypes.js'

export function presentService(s: ServiceRecord, lang: Lang) {
  return {
    id: s.id,
    slug: s.slug,
    category: s.category,
    isActive: s.isActive,
    title: pickLocalized(lang, s.titleFr, s.titleEn),
    summary: pickLocalized(lang, s.summaryFr, s.summaryEn),
    description: pickLocalized(lang, s.descriptionFr, s.descriptionEn),
    audience: pickLocalized(lang, s.audienceFr, s.audienceEn),
    outcomes: pickLocalized(lang, s.outcomesFr, s.outcomesEn),
    ctaLabel: pickLocalized(lang, s.ctaLabelFr, s.ctaLabelEn),
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

export function presentNews(n: NewsRecord, lang: Lang) {
  return {
    id: n.id,
    slug: n.slug,
    type: n.type,
    publishedAt: n.publishedAt,
    title: pickLocalized(lang, n.titleFr, n.titleEn),
    excerpt: pickLocalized(lang, n.excerptFr, n.excerptEn),
    body: pickLocalized(lang, n.bodyFr, n.bodyEn),
    i18n: {
      fr: { title: n.titleFr, excerpt: n.excerptFr, body: n.bodyFr },
      en: { title: n.titleEn, excerpt: n.excerptEn, body: n.bodyEn },
    },
  }
}
