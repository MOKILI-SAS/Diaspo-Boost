import type { Localized } from '../shared/lib/locale'

export type PressOutlet = {
  name: string
  country: Localized
  href: string
  group: 'tv' | 'maroc' | 'afrique' | 'rdc'
}

export const PRESS: PressOutlet[] = [
  { name: '2M TV', country: { fr: 'Maroc', en: 'Morocco' }, href: 'https://2m.ma', group: 'tv' },
  { name: 'TV5 Monde', country: { fr: 'International', en: 'International' }, href: 'https://www.tv5monde.com', group: 'tv' },
  { name: 'RTBF', country: { fr: 'Belgique', en: 'Belgium' }, href: 'https://www.rtbf.be', group: 'tv' },
  {
    name: 'Morocco World News',
    country: { fr: 'Maroc', en: 'Morocco' },
    href: 'https://www.moroccoworldnews.com/2026/04/287492/diaspoboost-summit-in-casablanca-explores-moroccos-diaspora-model/',
    group: 'maroc',
  },
  {
    name: 'La Vie Éco',
    country: { fr: 'Maroc', en: 'Morocco' },
    href: 'https://www.lavieeco.com/influences/diaspora-le-role-strategique-du-maroc-mis-en-avant-au-diaspoboost-summit-africa-2026/',
    group: 'maroc',
  },
  {
    name: 'Libération Maroc',
    country: { fr: 'via MAP', en: 'via MAP' },
    href: 'https://www.libe.ma/Casablanca-accueille-le-DiaspoBoost-Summit-Africa-2026_a160665.html',
    group: 'maroc',
  },
  {
    name: 'Le Reporter.ma',
    country: { fr: 'Maroc', en: 'Morocco' },
    href: 'https://www.lereporter.ma/maroc-le-diaspoboost-summit-africa-2026-les-16-et-17-avril-a-casablanca/',
    group: 'maroc',
  },
  {
    name: 'Le Courrier de l’Atlas',
    country: { fr: 'France–Maroc', en: 'France–Morocco' },
    href: 'https://www.lecourrierdelatlas.com/diaspora-africaine-casablanca-diaspoboost-summit-2026/',
    group: 'maroc',
  },
  {
    name: 'Yabiladi',
    country: { fr: 'Maroc', en: 'Morocco' },
    href: 'https://en.yabiladi.com/articles/details/191879/casablanca-host-diaspoboost-summit-africa.html',
    group: 'maroc',
  },
  {
    name: 'AllAfrica',
    country: { fr: 'International', en: 'International' },
    href: 'https://fr.allafrica.com/stories/202604150570.html',
    group: 'afrique',
  },
  {
    name: 'L’Œil d’Afrique',
    country: { fr: 'Afrique', en: 'Africa' },
    href: 'https://oeildafrique.com/2026/04/17/casablanca-accueille-le-diaspoboost-summit-africa-la-diaspora-africaine-cherche-a-passer-des-transferts-a-linvestissement/',
    group: 'afrique',
  },
  {
    name: 'Médiateur Info',
    country: { fr: 'Kinshasa', en: 'Kinshasa' },
    href: 'https://www.mediateur-info.net/2025/05/09/diasposummit-2025-lance-a-kinshasa-stephanie-kimbulu-appelle-a-lunite-de-la-diaspora-pour-batir-lafrique-de-demain/',
    group: 'afrique',
  },
  {
    name: 'Pepele News',
    country: { fr: 'Kinshasa', en: 'Kinshasa' },
    href: 'https://pepelenews.com/?s=DiaspoBoost',
    group: 'rdc',
  },
  {
    name: 'ACP',
    country: { fr: 'Agence officielle RDC', en: 'Official DRC agency' },
    href: 'https://acp.cd/search/DiaspoBoost',
    group: 'rdc',
  },
  {
    name: 'Tribune d’Actualité',
    country: { fr: 'RDC', en: 'DRC' },
    href: 'https://www.tribuneactualite.com/?s=DiaspoBoost',
    group: 'rdc',
  },
]

export const PRESS_GROUPS: { id: PressOutlet['group']; label: Localized }[] = [
  { id: 'tv', label: { fr: 'Télévision', en: 'Television' } },
  { id: 'maroc', label: { fr: 'Presse Maroc', en: 'Morocco press' } },
  { id: 'afrique', label: { fr: 'Afrique & international', en: 'Africa & international' } },
  { id: 'rdc', label: { fr: 'RDC & Congo', en: 'DRC & Congo' } },
]
