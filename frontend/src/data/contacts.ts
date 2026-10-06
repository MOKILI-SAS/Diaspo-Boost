export const CONTACTS = {
  emails: ['contact@diaspoboost.com'] as const,
  phones: [
    { display: '+243 812 226 604', href: 'tel:+243812226604', whatsapp: true },
    { display: '+243 834 626 568', href: 'tel:+243834626568', whatsapp: false },
  ],
  whatsappHref: 'https://wa.me/243812226604?text=Bonjour%20DiaspoBoost%20%21',
  whatsappEvent: (label: string) =>
    `https://wa.me/243812226604?text=${encodeURIComponent(`Bonjour DiaspoBoost, je souhaite des informations : ${label}.`)}`,
  instagram: 'https://www.instagram.com/diaspo_boost/',
  x: 'https://x.com/Diaspoboost',
  linkedin: 'https://www.linkedin.com/company/diaspoboost',
  address: {
    fr: 'Kinshasa, République démocratique du Congo',
    en: 'Kinshasa, Democratic Republic of the Congo',
  },
} as const
