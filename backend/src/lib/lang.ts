import type { Request } from 'express'

export type Lang = 'fr' | 'en'

export function resolveLang(req: Request): Lang {
  const q = req.query['lang']
  if (q === 'en' || q === 'fr') return q
  const header = req.header('accept-language') ?? ''
  const first = header.split(',')[0]?.trim().toLowerCase() ?? ''
  if (first.startsWith('en')) return 'en'
  return 'fr'
}

export function pickLocalized(
  lang: Lang,
  fr: string,
  en: string,
): string {
  if (lang === 'en' && en.trim()) return en
  return fr
}
