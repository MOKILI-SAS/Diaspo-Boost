import type { Localized } from '../shared/lib/locale'

export type Testimonial = {
  initials: string
  name: string
  role: Localized
  quote: Localized
}

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'SA',
    name: 'Sirine Assaki',
    role: { fr: 'Juriste — droit des affaires', en: 'Business lawyer' },
    quote: {
      fr: 'Le DiaspoBoost Summit Africa 2026 a mis en lumière le rôle stratégique des diasporas dans le développement de l’Afrique. J’ai particulièrement relevé les enjeux juridiques liés à l’investissement — fiscalité internationale, sécurisation des flux financiers et la place centrale du droit des affaires dans l’espace OHADA. Une réflexion qui confirme le droit comme levier essentiel du développement économique.',
      en: 'DiaspoBoost Summit Africa 2026 highlighted the strategic role of diasporas in Africa’s development. I particularly noted the legal issues around investment — international taxation, securing financial flows and the central place of business law in the OHADA space. A reminder that law is an essential lever of economic development.',
    },
  },
  {
    initials: 'NC',
    name: 'Dr. Nizar Chaari',
    role: { fr: 'Fondateur — Epik Leaders & Tunivisions Foundation', en: 'Founder — Epik Leaders & Tunivisions Foundation' },
    quote: {
      fr: 'C’est avec le cœur rempli de joie que je repars du DiaspoBoost Summit Africa 2026. La diaspora n’est pas seulement une source de transferts de fonds, c’est un moteur d’investissement productif, d’innovation et de rayonnement culturel. Un immense merci à Stéphanie Kimbulu pour sa vision et son organisation impeccable.',
      en: 'I left DiaspoBoost Summit Africa 2026 with a full heart. The diaspora is not only a source of remittances; it is a driver of productive investment, innovation and cultural reach. Immense thanks to Stéphanie Kimbulu for her vision and impeccable organisation.',
    },
  },
  {
    initials: 'BB',
    name: 'Bouchra Bayed',
    role: { fr: 'Présidente-fondatrice — Moroccan Pulse', en: 'Founding president — Moroccan Pulse' },
    quote: {
      fr: 'J’ai eu le plaisir de co-organiser ce rendez-vous aux côtés de Stéphanie Kimbulu, dont je tiens à saluer le travail considérable en faveur de la structuration et de la mobilisation de la diaspora congolaise. Ce temps fort maroco-congolais ouvre une série de travaux avec l’ambition de relier les compétences africaines et de faire émerger une dynamique de coopération durable entre nos communautés.',
      en: 'I had the pleasure of co-organising this gathering alongside Stéphanie Kimbulu, whose considerable work to structure and mobilise the Congolese diaspora I wish to acknowledge. This Morocco–Congo moment opens a series of workstreams to connect African skills and build lasting cooperation between our communities.',
    },
  },
  {
    initials: 'MP',
    name: 'Mélissia Mabrouka Pétesque',
    role: {
      fr: 'Genre, migration & engagement diasporas — OIM Belgique',
      en: 'Gender, migration & diaspora engagement — IOM Belgium',
    },
    quote: {
      fr: 'Je représenterai l’OIM Belgique et Luxembourg en tant que spécialiste de l’engagement des diasporas. Mon focus : mobiliser tout le potentiel des contributions de la diaspora pour le développement — au-delà des transferts. Merci à Business Congo Consulting et à Stéphanie Kimbulu de m’avoir associée à ce rendez-vous.',
      en: 'I will be representing IOM Belgium and Luxembourg as a diaspora engagement specialist. My focus: harnessing the full potential of diaspora contributions for development — beyond remittances. Thanks to Business Congo Consulting and Stéphanie Kimbulu for including me in this occasion.',
    },
  },
]
