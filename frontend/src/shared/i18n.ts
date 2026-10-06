import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import { setApiLang } from './lib/api'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

setApiLang(i18n.language.startsWith('en') ? 'en' : 'fr')

i18n.on('languageChanged', (lng) => {
  const lang = lng.startsWith('en') ? 'en' : 'fr'
  document.documentElement.lang = lang
  setApiLang(lang)
})

document.documentElement.lang = i18n.language.startsWith('en') ? 'en' : 'fr'

export default i18n
