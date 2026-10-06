export type UiLang = 'fr' | 'en'
export type Localized = { fr: string; en: string }

export function uiLang(language: string): UiLang {
  return language.startsWith('en') ? 'en' : 'fr'
}

export function loc(value: Localized, language: string): string {
  return value[uiLang(language)]
}
