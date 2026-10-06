import type { Localized } from '../shared/lib/locale'

export type MembershipPlan = {
  id: 'adulte' | 'etudiant'
  badge: Localized
  name: Localized
  monthly: string
  yearly: string
  perks: Localized[]
  note: Localized
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'adulte',
    badge: { fr: 'Membre adulte', en: 'Adult member' },
    name: { fr: 'Adhésion standard', en: 'Standard membership' },
    monthly: '100 €',
    yearly: '1 000 €',
    perks: [
      { fr: 'Accès prioritaire à tous les événements DiaspoBoost', en: 'Priority access to all DiaspoBoost events' },
      { fr: 'Annuaire privé des membres (50 pays)', en: 'Private member directory (50 countries)' },
      { fr: 'Webinaires mensuels exclusifs', en: 'Exclusive monthly webinars' },
      { fr: 'Lettre d’information et opportunités en avant-première', en: 'Newsletter and opportunities in advance' },
      { fr: 'Conseils et orientation (groupe WhatsApp privé)', en: 'Advice and orientation (private WhatsApp group)' },
      { fr: 'Badge « Membre officiel DiaspoBoost » LinkedIn', en: '“Official DiaspoBoost member” LinkedIn badge' },
      { fr: 'Fiche membre annuelle (formule annuelle uniquement)', en: 'Annual member sheet (yearly plan only)' },
    ],
    note: {
      fr: 'Mensuel sans engagement · annuel : deux mois offerts et fiche membre.',
      en: 'Monthly with no lock-in · yearly: two months included and a member sheet.',
    },
  },
  {
    id: 'etudiant',
    badge: { fr: 'Membre étudiant', en: 'Student member' },
    name: { fr: 'Adhésion jeunesse (moins de 25 ans)', en: 'Youth membership (under 25)' },
    monthly: '65 €',
    yearly: '650 €',
    perks: [
      { fr: 'Tous les avantages de l’adhésion adulte', en: 'All adult membership benefits' },
      { fr: 'Tarif jeunesse — moins de 25 ans', en: 'Youth rate — under 25' },
      { fr: 'Accès au réseau jeunesse DiaspoBoost', en: 'Access to the DiaspoBoost youth network' },
      { fr: 'Programme circulation des compétences et retour de talents', en: 'Skills circulation and talent-return programme' },
      { fr: 'Webinaires jeunesse et entrepreneuriat', en: 'Youth and entrepreneurship webinars' },
      { fr: 'Justificatif d’âge requis à l’inscription', en: 'Proof of age required at registration' },
    ],
    note: {
      fr: 'Justificatif d’âge obligatoire (pièce d’identité ou carte étudiante).',
      en: 'Proof of age is required (ID or student card).',
    },
  },
]
