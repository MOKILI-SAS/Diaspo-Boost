import { loc, type Localized } from '../shared/lib/locale'

const PHONE = '243812226604'

export const WA_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbD7xuRLdQegNgFCcU45'

export function waLink(text: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
}

export function waHref(message: Localized, language: string): string {
  return waLink(loc(message, language))
}

const blank = { fr: '________', en: '________' }

export const WA_MSG = {
  start: {
    fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je suis intéressé(e) par votre initiative et j’aimerais me faire accompagner.

Pourriez-vous me proposer un créneau pour un échange en visio ?

Merci.`,
    en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I am interested in your initiative and would like accompaniment.

Could you propose a slot for a video meeting?

Thank you.`,
  },
  equipe: {
    fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite vous écrire au sujet de DiaspoBoost.

Merci de me revenir, si possible avec un créneau pour un échange.`,
    en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to write to you about DiaspoBoost.

Please come back to me, if possible with a slot for a conversation.`,
  },
  communaute: {
    fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite rejoindre la communauté DiaspoBoost et accéder au réseau.

Je suis prêt(e) à régler ce qu’il faut pour cela.
Pouvez-vous m’indiquer le moyen de paiement, ainsi que les formules disponibles ?

Merci.`,
    en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to join the DiaspoBoost community and access the network.

I am ready to pay what is required.
Could you tell me the payment method, and the available plans?

Thank you.`,
  },
  services: {
    'sommets-networking': {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite participer à un sommet / à une rencontre networking DiaspoBoost.

Pouvez-vous m’indiquer les prochaines éditions et un créneau pour en parler ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to take part in a DiaspoBoost summit / networking meeting.

Could you share the next editions and a slot to discuss this?`,
    },
    'accompagnement-investissement': {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite investir / me faire accompagner sur un projet en Afrique.

Pouvez-vous me proposer un créneau pour un échange de cadrage ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to invest / be accompanied on a project in Africa.

Could you propose a slot for a scoping conversation?`,
    },
    'matchmaking-projets': {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
J’aimerais proposer ou étudier un projet (matchmaking).

Pouvez-vous me donner un créneau pour un meet ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to submit or review a project (matchmaking).

Could you give me a slot for a meeting?`,
    },
    'briefings-sectoriels': {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite un briefing sectoriel (immobilier, agri, énergie, tech…).

Quel créneau serait possible pour en discuter ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like a sector briefing (real estate, agri, energy, tech…).

What slot would be possible to discuss this?`,
    },
    'partenariats-institutionnels': {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je représente une institution / un partenaire et je souhaite explorer une coopération.

Pouvez-vous me proposer un créneau ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I represent an institution / partner and would like to explore cooperation.

Could you propose a slot?`,
    },
    'communaute-media': {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite relayer vos communiqués / rejoindre le canal média.

Merci de me dire comment procéder, et un créneau si un échange est utile.`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to relay your releases / join the media channel.

Please tell me how to proceed, and a slot if a conversation would help.`,
    },
  },
  participer: {
    sommets: {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite participer à un sommet DiaspoBoost (Kinshasa, Casablanca, Dakar…).

Je suis prêt(e) à régler les frais d’inscription s’il y en a.
Pouvez-vous me confirmer le format, et m’indiquer le moyen de paiement ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to attend a DiaspoBoost summit (Kinshasa, Casablanca, Dakar…).

I am ready to pay registration fees if there are any.
Could you confirm the format, and tell me the payment method?`,
    },
    projet: {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite proposer ou étudier un projet avec vous (matchmaking).

Pouvez-vous me donner un créneau pour un meet, et m’indiquer s’il y a des frais ainsi que le moyen de paiement ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to submit or review a project with you (matchmaking).

Could you give me a slot for a meeting, and tell me if there are fees and how to pay?`,
    },
    partenaire: {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite devenir partenaire ou sponsor.

Pouvez-vous m’envoyer le dossier, les modalités, et le moyen de paiement s’il y a une contribution ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to become a partner or sponsor.

Could you send the file, the terms, and the payment method if a contribution is required?`,
    },
    media: {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite suivre / relayer le canal officiel DiaspoBoost (presse, communiqués, invitations).

Merci de m’indiquer la marche à suivre.`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to follow / relay the official DiaspoBoost channel (press, releases, invitations).

Please tell me the next step.`,
    },
    membres: {
      fr: `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ${blank.fr}.
Je souhaite devenir membre (adulte ou jeunesse) pour accéder au réseau DiaspoBoost.

Je suis prêt(e) à régler ce qu’il faut.
Pouvez-vous me confirmer les formules et m’indiquer le moyen de paiement ?`,
      en: `Hello DiaspoBoost team,

I am Mr / Ms ${blank.en}.
I would like to become a member (adult or youth) to access the DiaspoBoost network.

I am ready to pay what is required.
Could you confirm the plans and tell me the payment method?`,
    },
  },
} as const

export function serviceWaHref(slug: string, language: string): string {
  const msg = WA_MSG.services[slug as keyof typeof WA_MSG.services] ?? WA_MSG.start
  return waHref(msg, language)
}

export type ParticiperWaKey = keyof typeof WA_MSG.participer

export function isParticiperWaKey(value: string | undefined): value is ParticiperWaKey {
  return Boolean(value && value in WA_MSG.participer)
}

export function participerWaHref(key: ParticiperWaKey, language: string): string {
  return waHref(WA_MSG.participer[key], language)
}

export function equipeFormWaHref(
  language: string,
  values: { fullName: string; email?: string; subject?: string; message?: string },
): string {
  const en = language.startsWith('en')
  const name = values.fullName.trim() || (en ? 'Mr / Ms ________' : 'M. / Mme ________')
  const text = en
    ? `Hello DiaspoBoost team,

I am ${name}.
Email: ${values.email ?? ''}
Subject: ${values.subject ?? ''}

${values.message ?? ''}

Could you come back to me, if possible with a slot for a conversation?`
    : `Bonjour l’équipe DiaspoBoost,

Je suis ${name}.
E-mail : ${values.email ?? ''}
Objet : ${values.subject ?? ''}

${values.message ?? ''}

Merci de me revenir, si possible avec un créneau pour un échange.`
  return waLink(text)
}

export function membresPlanWaHref(planName: string, language: string): string {
  const en = language.startsWith('en')
  const text = en
    ? `Hello DiaspoBoost team,

I am Mr / Ms ________.
I would like to join the DiaspoBoost community and access the network (${planName}).

I am ready to pay what is required.
Could you tell me the payment method?`
    : `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ________.
Je souhaite rejoindre la communauté DiaspoBoost et accéder au réseau (${planName}).

Je suis prêt(e) à régler ce qu’il faut.
Pouvez-vous m’indiquer le moyen de paiement ?`
  return waLink(text)
}

export function eventInviteWaHref(label: string, language: string): string {
  const en = language.startsWith('en')
  const text = en
    ? `Hello DiaspoBoost team,

I am Mr / Ms ________.
I would like information / an invitation: ${label}.

Could you propose a slot if a conversation is useful?`
    : `Bonjour l’équipe DiaspoBoost,

Je suis M. / Mme ________.
Je souhaite des informations / une invitation : ${label}.

Pouvez-vous me proposer un créneau si un échange est utile ?`
  return waLink(text)
}
