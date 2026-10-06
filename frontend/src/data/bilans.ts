import type { Localized } from '../shared/lib/locale'

export type BilanSection = {
  heading: Localized
  paragraphs: Localized[]
}

export type BilanDoc = {
  slug: string
  file: string
  pages: number
  heavy?: boolean
  kicker: Localized
  title: Localized
  subtitle: Localized
  meta: Localized
  extractLead: Localized
  sections: BilanSection[]
}

export const BILANS: BilanDoc[] = [
  {
    slug: 'bilan-general',
    file: '/docs/diaspoboost-bilan-general-luxembourg.pdf',
    pages: 43,
    heavy: true,
    kicker: { fr: 'Document officiel', en: 'Official document' },
    title: {
      fr: 'Mobilisation de la diaspora africaine et de la jeunesse dynamique pour le développement de l\'Afrique',
      en: 'Mobilisation of the African diaspora and dynamic youth for Africa’s development',
    },
    subtitle: {
      fr: 'DiaspoBoost Bilan Général — Luxembourg & Bruxelles.',
      en: 'DiaspoBoost General Report — Luxembourg & Brussels.',
    },
    meta: {
      fr: '43 pages · PDF officiel',
      en: '43 pages · official PDF',
    },
    extractLead: {
      fr: 'Ce document retrace le parcours de DiaspoBoost avant l’internationalisation continentale de Casablanca. Ci-dessous, un extrait fidèle ; le PDF complet se lit et se télécharge sur cette page.',
      en: 'This document traces DiaspoBoost’s path before the continental step in Casablanca. Below is a faithful extract; the full PDF can be read and downloaded on this page.',
    },
    sections: [
      {
        heading: { fr: 'Une plateforme, cinq éditions', en: 'One platform, five editions' },
        paragraphs: [
          {
            fr: 'Le bilan général présente cinq éditions : trois en Europe, deux en Afrique. L’objectif est constant : informer, relier et accompagner la diaspora pour investir et entreprendre sur le continent, loin du seul transfert d’urgence.',
            en: 'The general report presents five editions: three in Europe, two in Africa. The aim is constant: inform, connect and accompany the diaspora to invest and build businesses on the continent, beyond emergency remittances.',
          },
        ],
      },
      {
        heading: { fr: '1. Bruxelles — 3 juin 2023', en: '1. Brussels — 3 June 2023' },
        paragraphs: [
          {
            fr: 'Thon Hotel Bristol Stéphanie, Bruxelles. Thème : « Comment constituer sa société en RD Congo ». Plus de 150 participants. Parmi les interlocuteurs : Bertin Mampaka.',
            en: 'Thon Hotel Bristol Stéphanie, Brussels. Theme: “How to set up a company in the DR Congo”. More than 150 participants. Speakers included Bertin Mampaka.',
          },
        ],
      },
      {
        heading: { fr: '2. Bruxelles — 30 septembre 2023', en: '2. Brussels — 30 September 2023' },
        paragraphs: [
          {
            fr: 'Même lieu, suite du cycle d’information juridique et entrepreneuriale. Plus de 200 participants, avec des représentants officiels de la RDC. Animation : Stéphanie Kimbulu.',
            en: 'Same venue, continuation of the legal and entrepreneurial briefing cycle. More than 200 participants, with official DRC representatives. Hosted by Stéphanie Kimbulu.',
          },
        ],
      },
      {
        heading: { fr: '3. Kinshasa — 18–21 avril 2024', en: '3. Kinshasa — 18–21 April 2024' },
        paragraphs: [
          {
            fr: 'Pullman Kinshasa. Première édition africaine — Diaspora Summit RDC 2024. Plus de 300 participants. Présence diplomatique (ambassade de Belgique), accompagnement de PME, programme « Deviens ton propre Boss ». Intervenants notamment Stéphane Tiki et Félix Vunduawe te Pemako.',
            en: 'Pullman Kinshasa. First African edition — Diaspora Summit DRC 2024. More than 300 participants. Diplomatic presence (Embassy of Belgium), SME accompaniment, “Become your own boss” programme. Speakers included Stéphane Tiki and Félix Vunduawe te Pemako.',
          },
        ],
      },
      {
        heading: { fr: '4. Bruxelles & Luxembourg — 29–30 novembre 2024', en: '4. Brussels & Luxembourg — 29–30 November 2024' },
        paragraphs: [
          {
            fr: 'Chalet Robinson (Bruxelles) et Sofitel Luxembourg. Ouverture à la diaspora africaine et à la jeunesse. Parmi les interlocuteurs : Godelive Elisabeth Lonji Bandekela (DGI).',
            en: 'Chalet Robinson (Brussels) and Sofitel Luxembourg. Opening to the African diaspora and to youth. Speakers included Godelive Elisabeth Lonji Bandekela (DGI).',
          },
        ],
      },
      {
        heading: { fr: '5. Kinshasa & Brazzaville — 8–11 mai 2025', en: '5. Kinshasa & Brazzaville — 8–11 May 2025' },
        paragraphs: [
          {
            fr: 'Diaspora Summit RDC–Congo 2025. Édition bilatérale des deux rives : immobilier, infrastructures agricoles, transition énergétique, technologies de rupture.',
            en: 'Diaspora Summit DRC–Congo 2025. Bilateral edition on both banks of the river: real estate, agri-infrastructure, energy transition, breakthrough technologies.',
          },
        ],
      },
      {
        heading: { fr: 'Impacts et suite', en: 'Impact and next steps' },
        paragraphs: [
          {
            fr: 'Le document met en avant la visibilité médiatique (ACP, BRUZZ, mm2-online, YouTube, Radio de la Femme, entre autres), des rapprochements d’affaires et l’accompagnement à la création d’entreprise. La perspective affichée : consolider le dispositif et l’internationaliser — ce que prolonge le Summit Africa de Casablanca (avril 2026), objet du second bilan.',
            en: 'The document highlights media visibility (ACP, BRUZZ, mm2-online, YouTube, Radio de la Femme, among others), business connections and company-creation accompaniment. The stated outlook: consolidate the model and internationalise it — which the Casablanca Summit Africa (April 2026), covered in the second report, extends.',
          },
        ],
      },
    ],
  },
  {
    slug: 'casablanca-2026',
    file: '/docs/bilan-diasporasummit-africa-2026.pdf',
    pages: 52,
    kicker: { fr: 'Summit Africa 2026', en: 'Summit Africa 2026' },
    title: { fr: 'Bilan officiel — DiasporaSummit Africa, Casablanca', en: 'Official report — DiasporaSummit Africa, Casablanca' },
    subtitle: {
      fr: '15–17 avril 2026, Palace d’Anfa. Thème : « Diaspora et développement : le modèle marocain ».',
      en: '15–17 April 2026, Palace d’Anfa. Theme: “Diaspora and development: the Moroccan model”.',
    },
    meta: {
      fr: '52 pages · PDF officiel',
      en: '52 pages · official PDF',
    },
    extractLead: {
      fr: 'Le bilan officiel du sommet de Casablanca. Extraite ici : le cadre, les objectifs, les accords et la suite vers Dakar 2027. Le document intégral est lisible et téléchargeable ci-dessous.',
      en: 'The official report of the Casablanca summit. Extracted here: the setting, objectives, agreements and the path to Dakar 2027. The full document can be read and downloaded below.',
    },
    sections: [
      {
        heading: { fr: 'Cadre', en: 'Setting' },
        paragraphs: [
          {
            fr: 'Le DiaspoBoost Summit Africa 2026 s’est tenu du 15 au 17 avril 2026 au Palace d’Anfa, 171 boulevard d’Anfa, Casablanca. Cocktail du 15 avril : Le Trov Casablanca. Programme culturel du 18 avril : Casablanca et Rabat (mausolée Hassan II, mausolée Mobutu à Rabat, résidence de l’ambassadeur).',
            en: 'DiaspoBoost Summit Africa 2026 was held from 15 to 17 April 2026 at Palace d’Anfa, 171 boulevard d’Anfa, Casablanca. 15 April cocktail: Le Trov Casablanca. Cultural programme on 18 April: Casablanca and Rabat (Hassan II Mausoleum, Mobutu Mausoleum in Rabat, ambassador’s residence).',
          },
          {
            fr: 'Organisation : Stéphanie Kimbulu, fondatrice de DiaspoBoost et CEO de Business Congo Consulting.',
            en: 'Organised by Stéphanie Kimbulu, founder of DiaspoBoost and CEO of Business Congo Consulting.',
          },
        ],
      },
      {
        heading: { fr: 'Objectifs', en: 'Objectives' },
        paragraphs: [
          {
            fr: 'Traiter la diaspora comme acteur économique, lire le modèle marocain, passer des transferts vers l’investissement productif, et ouvrir un dialogue B2G (affaires–institutions) utile aux projets.',
            en: 'Treat the diaspora as an economic actor, read the Moroccan model, move from remittances to productive investment, and open useful B2G (business–government) dialogue for projects.',
          },
        ],
      },
      {
        heading: { fr: 'Faits marquants et accords', en: 'Highlights and agreements' },
        paragraphs: [
          {
            fr: 'Parmi les temps forts : Yale SETI (Chambre maroco-congolaise / SEFICO), l’ambassadeur Henri Mangaya, la DGI RDC (Guy Nzengenly Bonanga, Israël Tshimanga Mubenga), TAMWILCOM, un protocole AFEM, un protocole CCIS Casablanca-Settat, et un rapprochement DGI-RDC × DGI-Maroc. Le document évoque aussi l’idée d’un centre d’appels intelligent.',
            en: 'Highlights included Yale SETI (Morocco–Congo Chamber / SEFICO), Ambassador Henri Mangaya, DRC DGI (Guy Nzengenly Bonanga, Israël Tshimanga Mubenga), TAMWILCOM, an AFEM memorandum, a CCIS Casablanca-Settat memorandum, and DGI-DRC × DGI-Morocco rapprochement. The document also mentions the idea of an intelligent call centre.',
          },
          {
            fr: 'Impacts présentés : diplomatiques, économiques (mines, agri, tech, immobilier) et institutionnels.',
            en: 'Impacts presented: diplomatic, economic (mining, agri, tech, real estate) and institutional.',
          },
        ],
      },
      {
        heading: { fr: 'Suite : Dakar 2027', en: 'Next: Dakar 2027' },
        paragraphs: [
          {
            fr: 'La feuille de route annonce Dakar 2027 comme prochaine édition continentale du Summit Africa. Les manifestations d’intérêt sont ouvertes ; le programme détaillé n’est pas encore une billetterie.',
            en: 'The roadmap announces Dakar 2027 as the next continental Summit Africa edition. Expressions of interest are open; the detailed programme is not a ticket office yet.',
          },
        ],
      },
    ],
  },
  {
    slug: 'bilan-general-complementaire',
    file: '/docs/bilan-general-complementaire.pdf',
    pages: 0,
    heavy: true,
    kicker: { fr: 'Document officiel', en: 'Official document' },
    title: { fr: 'Bilan général — document complémentaire', en: 'General report — complementary document' },
    subtitle: {
      fr: 'Document officiel complémentaire au bilan général DiaspoBoost. Lecture en ligne et téléchargement intégral.',
      en: 'Official complementary document to the DiaspoBoost general report. Read online and download in full.',
    },
    meta: {
      fr: 'PDF officiel · fichier volumineux',
      en: 'Official PDF · large file',
    },
    extractLead: {
      fr: 'Ce troisième document complète le bilan général. L’extrait ci-dessous présente le cadre ; le PDF intégral se lit et se télécharge sur cette page.',
      en: 'This third document complements the general report. The extract below sets the frame; the full PDF can be read and downloaded on this page.',
    },
    sections: [
      {
        heading: { fr: 'Un complément au bilan général', en: 'A complement to the general report' },
        paragraphs: [
          {
            fr: 'Ce volume s’ajoute aux deux autres bilans publiés sur le site (bilan général des éditions, bilan officiel Casablanca 2026). Il retrace le parcours DiaspoBoost et les enseignements à retenir pour la suite : Kinshasa, le Maroc, Dakar 2027.',
            en: 'This volume sits alongside the two other reports on the site (editions overview, official Casablanca 2026 report). It traces the DiaspoBoost journey and the takeaways for what follows: Kinshasa, Morocco, Dakar 2027.',
          },
        ],
      },
    ],
  },
]

export function getBilan(slug: string | undefined): BilanDoc | undefined {
  return BILANS.find((b) => b.slug === slug)
}
