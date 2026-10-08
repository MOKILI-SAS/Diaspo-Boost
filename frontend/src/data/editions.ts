import type { Localized } from '../shared/lib/locale'

export type Edition = {
  id: string
  status: 'past' | 'upcoming'
  date: Localized
  title: Localized
  place: Localized
  text: Localized
  tags?: Localized[]
  prices?: Localized
  bilanSlug?: string
  waLabel?: string
  image: string
  imagePosition?: string
}

export const EDITIONS: Edition[] = [
  {
    id: 'bruxelles-2023-06',
    status: 'past',
    date: { fr: '3 juin 2023', en: '3 June 2023' },
    title: { fr: 'Comment constituer sa société en RD Congo', en: 'How to set up a company in the DR Congo' },
    place: { fr: 'Thon Hotel Bristol Stéphanie — Bruxelles', en: 'Thon Hotel Bristol Stéphanie — Brussels' },
    text: {
      fr: 'Première édition européenne. Plus de 150 participants. Information pratique pour créer une société en RDC.',
      en: 'First European edition. More than 150 participants. Practical briefing on incorporating a company in the DRC.',
    },
    image: '/editions/bruxelles-2023-06.jpg',
  },
  {
    id: 'bruxelles-2023-09',
    status: 'past',
    date: { fr: '30 septembre 2023', en: '30 September 2023' },
    title: { fr: 'Suite du cycle Bruxelles', en: 'Brussels cycle, second session' },
    place: { fr: 'Thon Hotel Bristol Stéphanie — Bruxelles', en: 'Thon Hotel Bristol Stéphanie — Brussels' },
    text: {
      fr: 'Plus de 200 participants, avec des représentants officiels de la RDC. Animation : Stéphanie Kimbulu.',
      en: 'More than 200 participants, with official DRC representatives. Hosted by Stéphanie Kimbulu.',
    },
    image: '/editions/bruxelles-2023-09.jpg',
  },
  {
    id: 'kinshasa-2024',
    status: 'past',
    date: { fr: '18–21 avril 2024', en: '18–21 April 2024' },
    title: { fr: 'Diaspora Summit RDC 2024', en: 'Diaspora Summit DRC 2024' },
    place: { fr: 'Pullman Kinshasa', en: 'Pullman Kinshasa' },
    text: {
      fr: 'Première édition africaine. Plus de 300 participants, ambassade de Belgique, accompagnement de PME.',
      en: 'First African edition. More than 300 participants, Embassy of Belgium, SME accompaniment.',
    },
    image: '/editions/kinshasa-2024.jpg',
  },
  {
    id: 'bruxelles-luxembourg-2024',
    status: 'past',
    date: { fr: '29–30 novembre 2024', en: '29–30 November 2024' },
    title: {
      fr: 'Mobilisation de la diaspora africaine et de la jeunesse dynamique pour le développement de l\'Afrique',
      en: 'Mobilisation of the African diaspora and dynamic youth for Africa’s development',
    },
    place: { fr: 'Chalet Robinson, Bruxelles · Sofitel Luxembourg', en: 'Chalet Robinson, Brussels · Sofitel Luxembourg' },
    text: {
      fr: 'Ouverture à la jeunesse et à la diaspora africaine, avec la Direction générale des impôts de la RDC.',
      en: 'Opening to youth and the African diaspora, with the DRC tax administration.',
    },
    bilanSlug: 'bilan-general',
    image: '/editions/bruxelles-luxembourg-2024.jpg',
  },
  {
    id: 'congo-congo-2025',
    status: 'past',
    date: { fr: '8–11 mai 2025', en: '8–11 May 2025' },
    title: { fr: 'Diaspora Summit RDC–Congo 2025', en: 'Diaspora Summit DRC–Congo 2025' },
    place: { fr: 'Kinshasa puis Brazzaville', en: 'Kinshasa then Brazzaville' },
    text: {
      fr: 'Édition bilatérale des deux Congo : immobilier, agri, énergie, technologies de rupture.',
      en: 'Bilateral edition of the two Congos: real estate, agri, energy, breakthrough technologies.',
    },
    image: '/editions/congo-congo-2025.jpg',
  },
  {
    id: 'casablanca-2026',
    status: 'past',
    date: { fr: '15–17 avril 2026', en: '15–17 April 2026' },
    title: { fr: 'DiaspoBoost Summit Africa', en: 'DiaspoBoost Summit Africa' },
    place: { fr: 'Palace d’Anfa — Casablanca', en: 'Palace d’Anfa — Casablanca' },
    text: {
      fr: 'Thème : diaspora et développement, le modèle marocain. Accords institutionnels, dialogue B2G, feuille de route vers Dakar.',
      en: 'Theme: diaspora and development, the Moroccan model. Institutional agreements, B2G dialogue, roadmap to Dakar.',
    },
    bilanSlug: 'casablanca-2026',
    image: '/editions/casablanca-2026.jpg',
    imagePosition: 'center top',
  },
  {
    id: 'kinshasa-2026',
    status: 'upcoming',
    date: { fr: '22–23 octobre 2026', en: '22–23 October 2026' },
    title: {
      fr: 'Colloque de la contribution de la Diaspora à l\'économie nationale à Kinshasa',
      en: 'Colloquium on the Diaspora\'s Contribution to the National Economy in Kinshasa',
    },
    place: { fr: 'Pullman Hôtel — Kinshasa', en: 'Pullman Hotel — Kinshasa' },
    text: {
      fr: 'Colloque de la contribution de la Diaspora à l\'économie nationale à Kinshasa. Deux jours d’échanges B2G et d’opportunités d’investissement.',
      en: 'Colloquium on the Diaspora\'s Contribution to the National Economy in Kinshasa. Two days of B2G dialogues and investment opportunities.',
    },
    tags: [
      { fr: 'Kinshasa', en: 'Kinshasa' },
      { fr: '2 jours', en: '2 days' },
    ],
    prices: {
      fr: 'Tarifs indicatifs : 100 USD Standard · 150 USD VIP. Inscription auprès de l’équipe, pas de paiement sur ce site.',
      en: 'Indicative fees: USD 100 Standard · USD 150 VIP. Register with the team; no payment is taken on this site.',
    },
    waLabel: 'Colloque de la contribution de la Diaspora à l\'économie nationale à Kinshasa — 22-23 octobre 2026',
    image: '/editions/agenda-diaspoboost.svg',
  },
  {
    id: 'anvers-2026-11',
    status: 'upcoming',
    date: { fr: '4 novembre 2026', en: '4 November 2026' },
    title: { fr: 'DiaspoBoost Investday à Anvers', en: 'DiaspoBoost Investday in Antwerp' },
    place: { fr: 'Anvers, Belgique', en: 'Antwerp, Belgium' },
    text: {
      fr: 'Journée d’investissement et de rencontres stratégiques pour la diaspora africaine et les investisseurs européens.',
      en: 'Investment day and strategic meetings for the African diaspora and European investors.',
    },
    tags: [
      { fr: 'Anvers', en: 'Antwerp' },
      { fr: 'Investday', en: 'Investday' },
    ],
    waLabel: 'DiaspoBoost Investday à Anvers — 4 novembre 2026',
    image: '/editions/agenda-diaspoboost.svg',
  },
  {
    id: 'dakar-2027',
    status: 'upcoming',
    date: { fr: '14–17 avril 2027', en: '14–17 April 2027' },
    title: { fr: 'DiaspoBoost Summit Africa — Dakar', en: 'DiaspoBoost Summit Africa — Dakar' },
    place: { fr: 'Dakar, Sénégal', en: 'Dakar, Senegal' },
    text: {
      fr: '« Diaspora africaine : levier de souveraineté et de renaissance continentale ». Quatre jours (14 au 17 avril 2027). Pré-inscription ouverte.',
      en: '“African diaspora: a lever of sovereignty and continental renaissance”. Four days (14 to 17 April 2027). Pre-registration is open.',
    },
    tags: [
      { fr: 'Dakar', en: 'Dakar' },
      { fr: '4 jours', en: '4 days' },
    ],
    waLabel: 'Pré-inscription Dakar 14-17 avril 2027',
    image: '/editions/agenda-diaspoboost.svg',
  },
]
