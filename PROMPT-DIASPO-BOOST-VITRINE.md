# PROMPT D’IMPLÉMENTATION — Site vitrine Diaspo Boost

**Rôle :** Ingénieur Full-Stack Senior + Product Designer.  
**Objectif :** livrer un site vitrine **vendeur, corporate, mobile-first**, qui convertit (investir / participer / booker un service), **sans bug**, **typé de bout en bout**, **scalable** vers CMS, i18n et futurs modules (cartographie des talents, véhicule d’investissement).  
**Langue UI (MVP) :** **français + anglais** avec sélecteur `FR | EN` (persistance `localStorage`, défaut navigateur `fr`/`en`, sinon `fr`). Tous les textes UI passent par `locales/fr.json` et `locales/en.json`. Le contenu CMS (services, news) a des colonnes `_fr` / `_en` **ou** une table `translations` — pas de texte métier collé dans les composants.  
**Décisions figées (16 août 2026) :** vitrine + API MySQL ; vidéo Hero fournie ensuite (fallback poster obligatoire) ; contacts footer = placeholders pro.  
**Ne pas commencer le code** avant d’avoir lu **intégralement** ce document. En cas d’ambiguïté, appliquer les **défauts** ci-dessous ; ne jamais inventer de chiffres, de dates ou de contacts.

---

## 0. Décisions figées + défauts restants

| Sujet | Statut |
|---|---|
| Langue | **Figé :** FR + EN, sélecteur header, URLs **sans** préfixe (`/services` unique, dictionnaire UI). Contenu DB bilingue. |
| Périmètre | **Figé :** vitrine + API Node + MySQL (bookings, newsletter, actualités seedées). Pas de back-office React au MVP |
| Vidéo Hero | **Attendue.** Tant que le fichier/URL n’est pas là : poster HD + bouton Play. **Jamais** `<video src="">` ni autoplay d’URL vide. Quand fournie : `mp4` local **ou** embed YouTube/Vimeo (privacy-enhanced), jamais les deux en conflit |
| Contacts | **Figé pour le MVP :** `contact@diaspoboost.org`, tél. `+243 000 000 000`, WhatsApp masqué jusqu’à confirmation. Ne **jamais** publier un email personnel LinkedIn |
| Paiement | **Aucun** paiement en ligne au MVP (booking = demande, pas ticket payant) |
| Admin | Mini-API `x-admin-key` pour lister bookings / subscribers (pas d’UI admin) |
| QR | Génération `qrcode.react` sur la confirmation de booking. **Pas de scan caméra** public |
| LinkedIn | `https://www.linkedin.com/company/business-congo-center` jusqu’à URL officielle Diaspo Boost |
| Newsletter | MySQL uniquement |
| Contenu | Faits de la « Source de vérité » seulement. Dates conflictuelles → version prudente + badge `À confirmer` / `To confirm` |

---

## 1. Ce que l’on construit (et ce que l’on ne construit PAS)

### In scope (MVP)

Site vitrine + API Node + MySQL pour :

1. Hero vidéo / poster + copy vendeur
2. Hub services (catégories → fiche → formulaire de booking)
3. Actualités & alertes (flux + page détail)
4. Footer institutionnel (armoiries RDC, MOKILI, RS, contact, newsletter)
5. Pages de confiance : mission, réalisations, comment investir, gouvernance, FAQ, mentions légales, confidentialité
6. Confirmation de demande (référence unique + QR de dossier)

### Out of scope (ne pas coder)

- Fintech, courtage, achat d’actions, KYC, wallet, scoring crédit
- Scan QR grand public, app native, chat, paiement Stripe/Mobile Money
- Cartographie des talents et fonds d’amorçage (afficher en **Coming soon** uniquement)
- CMS visuel type WordPress
- Compte utilisateur / OAuth

**Disclaimer légal obligatoire** (footer + page investir) : Diaspo Boost **n’est pas** un intermédiaire financier régulé. La plateforme **accompagne**, **connecte** et **organise** (sommets, B2G, ingénierie de projet). Aucune promesse de rendement.

---

## 2. Positionnement produit (copy & IA)

**Promesse :** Transformer l’épargne et l’expertise de la diaspora en **investissement productif** en Afrique — pas de l’aide, pas un transfert d’urgence.

**Théorie du changement (inspirée ADN Inform / Engage / Act, adaptée) :**

1. **Comprendre** — lever le déficit d’information
2. **Rencontrer** — sommets, B2G, réseau
3. **Agir** — booker un accompagnement, préparer un projet, participer au prochain sommet

**Audiences (3 portes d’entrée, 3 CTA) :**

| Persona | Besoin | CTA |
|---|---|---|
| Diaspora cadre / entrepreneur | Investir chez soi sans se faire piéger | `Comment investir` |
| Porteur de projet / institution | Trouver capitaux, talents, partenaires | `Proposer un projet` |
| Partenaire / État / média | Co-organiser, sponsoriser, relayer | `Devenir partenaire` |

**Ton :** corporate, persuasif, utile, transparent. Phrases courtes. Tutoiement **interdit** (vouvoiement). Pas de jargon tech (pas « API », « stack », « dashboard » dans l’UI).

**Chiffre d’accroche autorisé :** ~104 milliards USD / an injectés par la diaspora africaine (toujours sourcé en petit : « estimations internationales, ordre de grandeur »). Ne pas inventer d’autres KPI (participants, deals signés) s’ils ne sont pas dans la source de vérité.

---

## 3. Source de vérité contenu (ne pas halluciner)

### Identité

- Marque : **Diaspo Boost** (logo fourni : `DIASPO` rose + `BOOST` navy, contour Afrique)
- Fondatrice : **Stéphanie Kimbulu**
- Structure porteuse : **Business Congo Consulting** (ingénierie d’affaires, accompagnement investisseurs)
- Réseau institutionnel cité **uniquement comme coordination lors des sommets** (ne pas laisser croire que ce sont des actionnaires) : Patrick Muyaya (Ministre Communication & Médias RDC) ; représentants ministères de l’investissement Maroc et Congo-Brazzaville

### Vision / mission

- Vision « Brain Gain » : diaspora comme **15e communauté économique** de l’Afrique
- Mission : (1) déficit d’information, (2) cadres fiscaux sécurisés via dialogues B2G, (3) intégration locale de projets dans secteurs stratégiques

### Réalisations (chronologie — août 2026 = après Casablanca)

| Date | Événement | Lieu | Notes |
|---|---|---|---|
| Avril 2024 | Diaspo Summit RD Congo | Pullman Kinshasa | Édition fondatrice |
| 8–11 mai 2025 | Édition bilatérale Congo–Congo | Kinshasa puis Brazzaville | Immobilier, agri-infrastructures, énergie, tech |
| 15–17 avr. 2026 | DiaspoBoost Summit Africa | Casablanca | Coopération Sud–Sud, comité de suivi Maroc–RDC. Lieu exact (Palace d’Anfa vs Sofitel Tour Blanche) : **à confirmer** → ne pas figer un hôtel sans asset officiel |
| 2027 | Summit Africa Dakar | Dakar | Annoncé comme prochaine édition — page « Feuille de route », pas comme fait passé |

### Feuille de route (badges « Bientôt »)

- Base de données / cartographie des talents
- Véhicule de financement d’amorçage (co-investissement diaspora)

### Réseaux (officiels fournis)

- Instagram : https://www.instagram.com/diaspo_boost/
- X : https://x.com/Diaspoboost
- Footer MOKILI : https://mokili.io — texte exact : **Propulsé par MOKILI**
- Armoiries de la RDC : fichier fourni par le client uniquement (sinon placeholder cadré « Armoiries de la RDC — visuel à insérer », **jamais** une image Google)

### Logo

Fichier source : image logo fournie dans le chat / dossier assets Cursor.  
**À copier** vers `frontend/public/brand/logo-diaspoboost.png`.  
Extraire les hex **réels** du PNG (script one-shot ou pipette) ; ne pas approximer au feeling.

Cibles attendues (à valider par extraction) :

- Rose / magenta `DIASPO` ≈ `#E91E63`
- Navy `BOOST` + Afrique ≈ `#1A365D`
- Fond `#FFFFFF`

---

## 4. Architecture de pages (sitemap)

```
/                     Accueil
/mission              Vision, mission, théorie du changement
/services             Hub (grille catégories)
/services/:slug       Fiche service + Formik booking
/investir             Parcours « Comment investir » (3–5 étapes)
/participer           Parcours « Comment participer » (sommets + communauté)
/sommets              Timeline 2024 → 2027
/actualites           Liste news + filtres (communiqué | alerte)
/actualites/:slug     Détail
/gouvernance          Fondatrice, BCC, réseau institutionnel (sobre)
/faq
/contact
/booking/confirmation/:reference
/mentions-legales
/confidentialite
```

Routes React Router v6. **404** soignée. **Redirect** `/service` → `/services`.

---

## 5. Sections UI par page (obligatoires)

### 5.0 i18n (FR/EN) — anti-bugs

- Lib : `i18next` + `react-i18next` + `i18next-browser-languagedetector`
- Sélecteur dans le header (texte `FR` / `EN`, pas d’emoji seul)
- `html lang` mis à jour à chaque changement
- Dates : `Intl.DateTimeFormat` selon locale
- DB : champs `titleFr` / `titleEn` (idem summary, description, body, CTA). L’API renvoie la langue demandée via header `Accept-Language` ou `?lang=fr|en`, plus un objet brut pour le CMS futur
- Fallback : si `en` vide → `fr` (jamais une clé brute à l’écran)
- Ne pas dupliquer les routes (`/en/services` interdit au MVP)

### 5.1 Accueil

1. **Header sticky** : logo, nav, CTA rose `Commencer ma démarche` (scroll ou `/services`)
2. **Hero** : vidéo/poster plein viewport (mobile : 70vh), overlay navy 50–60 %, H1 + sous-titre + 2 CTA (`Comment investir` / `Comment participer`) + pastille preuve (3 sommets, 3 pays)
3. **Bandeau confiance** : logos/texte partenaires institutionnels (sans prétendre à un endorsement officiel non fourni)
4. **Chiffre + promesse** : 104 Md$ → capital productif
5. **Hub services** : 6 cartes max above-the-fold + lien « Voir tous les services »
6. **Réalisations** : timeline horizontale (swipe mobile)
7. **Comment ça marche** : 3 étapes Comprendre / Rencontrer / Agir
8. **Actualités** : 3 dernières + lien flux
9. **Bandeau alerte** (si `is_alert` et `is_published`) : barre rose/navy dismissible, persistée en `sessionStorage`
10. **CTA final** + footer

### 5.2 Hub services — catégories figées au seed (éditables en DB)

| slug | Catégorie | Utilité (une phrase) | CTA carte |
|---|---|---|---|
| sommets-networking | Sommets & networking | Accéder aux éditions Diaspo Boost et aux rencontres B2B/B2G | Réserver un échange |
| accompagnement-investissement | Accompagnement à l’investissement | Sécuriser un projet (information, fiscalité, ancrage local) | Commencer ma démarche |
| matchmaking-projets | Matchmaking projets | Relier un projet africain à des partenaires de la diaspora | Proposer un projet |
| briefings-sectoriels | Briefings sectoriels | Immobilier, agri, énergie, technologies de rupture | Demander un briefing |
| partenariats-institutionnels | Partenariats | États, ministères, sponsors, relais médias | Devenir partenaire |
| communaute-media | Communauté & médias | Alertes, communiqués, relais presse | S’abonner |

Chaque carte : icône sobre, titre, utilité, badge (Actif / Bientôt), **Lien direct** = `/services/:slug`.

### 5.3 Fiche service + booking

- Hero court, pour qui, livrable, délai indicatif, secteurs, FAQ courte
- Formulaire **Formik + Yup** (voir contrat)
- États : idle / submitting / success / error réseau / error validation
- Succès → redirect `/booking/confirmation/:reference` (QR + récap + « ajouter à l’agenda » texte)

### 5.4 Actualités

- Types : `communique` | `alerte`
- Alerte : style urgent (bordure, icône), jamais alarmiste mensonger
- Empty state : « Aucun communiqué pour le moment »

### 5.5 Footer

Colonnes : Navigation | Services | Contact | Newsletter  
Bas de page, **une ligne** :

- Armoiries RDC (hauteur 40–48px, fond clair)
- « © {year} Diaspo Boost — Tous droits réservés »
- « Propulsé par [MOKILI](https://mokili.io) » (nouvelle fenêtre, `rel="noopener noreferrer"`)
- Icônes Instagram + X (URLs ci-dessus)

Newsletter : email + consentement RGPD case **obligatoire** + texte lien confidentialité.

---

## 6. Design system (anti-dérive visuelle)

### Tokens Tailwind + DaisyUI (theme `diaspoboost`)

```js
primary:   navy  // boutons corporate, header, footer
secondary: pink  // CTA d’action, alertes, DIASPO
accent:    pink
neutral:   #0F172A
base-100:  #FFFFFF
base-200:  #F8FAFC
info/success/warning/error: DaisyUI defaults, contrast WCAG AA
```

- Font titres : **Montserrat** (bold, close to logo)
- Font corps : **Inter**
- Radius : 0.75rem cartes, 9999px boutons CTA
- Ombres légères, beaucoup de blanc, **pas** de glassmorphism excessif
- Watermark contour Afrique en opacité 4–8 % sur Hero et footer (SVG inline, pas un PNG lourd)
- Motion : Framer Motion **uniquement** fade/slide 200–400ms. Respecter `prefers-reduced-motion`
- Breakpoints mobile-first : 375 / 768 / 1024 / 1440
- Cibles tactile ≥ 44px
- Focus visible (ring navy)

**Interdit :** carousel infini auto, Lorem ipsum en prod, stock photos de pauvres / clichés « Afrique misère », gradients arc-en-ciel, 10 polices.

---

## 7. Stack figée (versions à pinner dans package.json)

### Frontend `frontend/`

- React **18.3.x** + Vite **5.x** + TypeScript **5.x** (`strict: true`)
- Tailwind CSS **3.4.x** + DaisyUI **4.x**
- React Router DOM **6.x**
- Framer Motion **11.x**
- Formik + Yup
- i18next + react-i18next
- Zustand (UI only : menu mobile, banner alerte)
- TanStack Query **5.x** pour le serveur (évite les race conditions Formik/useEffect)
- qrcode.react
- axios **ou** fetch wrappé typé — un seul client API

### Backend `backend/`

- Node **20 LTS** + Express **4** + TypeScript
- mysql2 + **Prisma** (MySQL 8) — migrations versionnées, **zéro** SQL inline dans les routes
- Zod pour valider body/query (mêmes règles métier que Yup côté front, documentées)
- helmet, cors, express-rate-limit, morgan
- dotenv + validation env au boot (crash fast si variable manquante)

### Infra locale

- `docker-compose.yml` : MySQL 8.0 + phpMyAdmin optionnel
- Scripts `dev:front`, `dev:back`, `db:migrate`, `db:seed`
- `.env.example` **sans secrets**

### Interdit

- `any`, `@ts-ignore`, `// eslint-disable` de masse
- État serveur dans Zustand
- CSS modules en plus de Tailwind (sauf exception 1 fichier)
- html5-qrcode au MVP (dépendance prévue Phase 2, ne pas installer maintenant)

---

## 8. Structure de dossiers (scalable)

```
/
  frontend/
    src/
      app/            router, providers, ErrorBoundary
      pages/          une page = composition, pas de fetch lourd
      features/
        services/
        news/
        booking/
        newsletter/
        layout/
      shared/
        ui/           Button, Card, Section, EmptyState, Spinner
        lib/          api client, cn(), motion variants
        types/        DTOs partagés (dupliquer depuis backend/types ou dossier /packages/types)
      locales/fr.json
      styles/index.css
    public/brand/     logo, armoiries, poster hero, video
  backend/
    src/
      modules/        news, services, bookings, newsletter, health
        each: router.ts, service.ts, schema.ts
      infra/          prisma, env, logger, mailer (console au MVP)
      app.ts
    prisma/schema.prisma
    prisma/migrations/
    prisma/seed.ts
  packages/types/     optionnel si monorepo simple : sinon dupliquer DTOs commentés "SYNC"
```

**Règle :** une feature = API + types + UI. Ajouter un service = seed + page, **pas** un fork du layout.

---

## 9. Modèle MySQL 8 (Prisma) — contrats anti-bug

Charset `utf8mb4`, engine InnoDB, UUID `CHAR(36)` ou `cuid()`.

```prisma
model Service {
  id             String    @id @default(cuid())
  slug           String    @unique
  category       String
  titleFr        String
  titleEn        String
  summaryFr      String    @db.VarChar(280)
  summaryEn      String    @db.VarChar(280)
  descriptionFr  String    @db.Text
  descriptionEn  String    @db.Text
  audienceFr     String
  audienceEn     String
  outcomesFr     String    @db.Text
  outcomesEn     String    @db.Text
  isActive       Boolean   @default(true)
  ctaLabelFr     String
  ctaLabelEn     String
  bookings       Booking[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

model News {
  id          String    @id @default(cuid())
  slug        String    @unique
  type        NewsType
  titleFr     String
  titleEn     String
  excerptFr   String    @db.VarChar(280)
  excerptEn   String    @db.VarChar(280)
  bodyFr      String    @db.Text
  bodyEn      String    @db.Text
  isPublished Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum NewsType {
  communique
  alerte
}

model Booking {
  id          String   @id @default(cuid())
  reference   String   @unique // DB-YYYYMMDD-XXXX
  serviceId   String
  service     Service  @relation(fields: [serviceId], references: [id])
  fullName    String
  email       String
  phone       String?
  country     String
  profile     ProfileType
  sector      String?
  message     String   @db.Text
  status      BookingStatus @default(new)
  createdAt   DateTime @default(now())
}

enum ProfileType {
  diaspora
  porteur_projet
  institution
  partenaire
  media
}

enum BookingStatus {
  new
  in_review
  contacted
  closed
}

model Subscriber {
  id          String   @id @default(cuid())
  email       String   @unique
  consentAt   DateTime
  source      String   @default("footer")
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  fullName  String
  email     String
  subject   String
  message   String   @db.Text
  createdAt DateTime @default(now())
}
```

Index : `News(type, publishedAt)`, `Booking(status, createdAt)`, `Subscriber(email)`.

**Seed obligatoire** : 6 services + 4 news (dont 1 alerte exemple unpublished + 2 communiqués published) + 0 booking.

---

## 10. Contrats API (REST, JSON, version `/api/v1`)

| Méthode | Route | Public | Notes |
|---|---|---|---|
| GET | `/api/v1/health` | oui | `{ status, db, time }` |
| GET | `/api/v1/services` | oui | actifs seulement |
| GET | `/api/v1/services/:slug` | oui | 404 JSON `{ code, message }` |
| POST | `/api/v1/bookings` | oui | rate limit 5 / 15 min / IP |
| GET | `/api/v1/bookings/:reference` | oui | **pas d’email** en clair au-delà du masquage `j***@x.com` |
| GET | `/api/v1/news` | oui | `?type=` published only |
| GET | `/api/v1/news/:slug` | oui | |
| POST | `/api/v1/newsletter` | oui | 3 / 15 min / IP |
| POST | `/api/v1/contact` | oui | 5 / 15 min / IP |
| GET | `/api/v1/admin/bookings` | header `x-admin-key` | liste |

### POST `/bookings` body

```ts
{
  serviceSlug: string
  fullName: string        // 2–120
  email: string
  phone?: string          // E.164 souple
  country: string
  profile: 'diaspora' | 'porteur_projet' | 'institution' | 'partenaire' | 'media'
  sector?: string
  message: string         // 20–2000
  consent: true           // doit être true
}
```

Réponse `201` :

```ts
{ reference: string, serviceTitle: string, createdAt: string }
```

Erreurs : `400` validation, `404` service inactif, `409` doublon email+service < 24h, `429` rate limit, `500` générique **sans** stack.

CORS : `FRONTEND_ORIGIN` only. JSON only. Pas de `*` en prod.

Mailer MVP : `console.log` du booking (préparer interface `Mailer.send` pour Nodemailer plus tard). **Ne pas** bloquer le 201 si le mail échoue (log + flag interne optionnel).

---

## 11. Validation Yup (front) — miroir Zod (back)

- `fullName` required
- `email` email
- `phone` optionnel, regex international
- `message` min 20
- `consent` `true` requis
- Trim sur tous les strings
- Désactiver le submit tant que `isSubmitting`

Accessibilité formulaire : `label` liés, `aria-invalid`, résumé d’erreurs en haut.

---

## 12. Règles anti-bugs (non négociables)

1. TypeScript `strict`, `noUncheckedIndexedAccess`
2. ErrorBoundary React autour du router
3. Chaque fetch : loading skeleton + empty + error retry
4. Vidéo : `poster`, `playsInline`, `muted` `loop` seulement si fichier existe ; bouton unmute ; pause hors viewport (`IntersectionObserver`)
5. Images : dimensions, `alt`, lazy sauf logo/hero
6. Pas de `window` au SSR/module scope (Vite SPA ok, mais garder les guards)
7. Nettoyage `useEffect` (abort controller sur fetch)
8. Clés React stables (`id` / `slug`, jamais index sur listes dynamiques)
9. DaisyUI : classes `btn btn-primary` etc. **plus** tokens custom — tester le dark **off** (site light only : `data-theme="diaspoboost"` forcé)
10. Router : `createBrowserRouter` ou `BrowserRouter` + `Routes` — un seul pattern
11. Base URL API : `import.meta.env.VITE_API_URL` validée au boot
12. MySQL : prepared statements via Prisma only
13. XSS : React default + pas de `dangerouslySetInnerHTML` sauf body news **sanitisé** (DOMPurify) si HTML ; **préférer Markdown plus tard**, MVP = texte + `\n` → `<p>`
14. RGPD : consentement newsletter, page confidentialité réelle (finalités, durée, contact)
15. Tests smoke : Vitest front (Yup schema) + supertest health + booking 400/201
16. `npm run build` front **et** back doivent passer
17. Lighthouse mobile : pas d’objectif 100, mais pas de layout shift Hero (min-height fixe)
18. Français : apostrophes typographiques cohérentes, « Diaspo Boost » (deux mots) dans les textes ; logo = DIASPOBOOST

---

## 13. Copy Hero (à utiliser, affiner sans trahir)

**H1 :** Investir chez soi, avec un cadre clair.  
**Sous-titre :** Diaspo Boost relie la diaspora, les États et les entrepreneurs africains pour transformer l’épargne en projets productifs — via des sommets, un dialogue B2G et un accompagnement concret.  
**CTA primaire :** Commencer ma démarche  
**CTA secondaire :** Comment participer

Ne pas écrire « la 15e communauté » dans le H1 (trop jargonneux) ; le placer en mission.

---

## 14. Definition of Done

- [ ] `docker compose up` démarre MySQL ; migrate + seed OK
- [ ] Front `http://localhost:5173` + proxy API
- [ ] Sélecteur FR/EN : header, Hero, services, formulaires, footer — aucune clé i18n visible
- [ ] Accueil → services → booking → confirmation + QR
- [ ] Newsletter refuse sans consentement ; accepte et déduplique l’email
- [ ] Alerte publiée visible ; alerte unpublished invisible
- [ ] Footer : armoiries (ou placeholder), MOKILI, IG, X, newsletter
- [ ] Responsive 375 / 768 / 1280 vérifié
- [ ] Aucun warning console React, aucun 404 asset
- [ ] README : setup Windows (PowerShell) + scripts
- [ ] `.gitignore` : `node_modules`, `.env`, `dist`

---

## 15. Ordre d’implémentation (pour ne pas casser le flux)

1. Repo folders + Docker MySQL + Prisma schema/seed
2. Backend health + CRUD public services/news + POST bookings/newsletter
3. Front design tokens + layout header/footer
4. Pages statiques (mission, gouvernance, FAQ, légal) branchées sur `fr.json`
5. Hub + fiches + Formik
6. Hero (poster puis vidéo si fichier)
7. News
8. Confirmation + QR
9. Polish motion / a11y / empty states
10. Tests smoke + README

---

## 16. Assets à placer avant le polish visuel

| Asset | Chemin | Critique |
|---|---|---|
| Logo PNG/SVG | `frontend/public/brand/logo-diaspoboost.png` | Oui |
| Armoiries RDC | `frontend/public/brand/armoiries-rdc.svg` | Oui (placeholder sinon) |
| Poster Hero | `frontend/public/media/hero-poster.jpg` | Oui |
| Vidéo mp4 < 15 Mo | `frontend/public/media/hero.mp4` | Non (fallback poster) |
| Favicon | dérivé du logo | Oui |

---

## 17. Après le MVP (hors ce sprint)

- Back-office news/bookings
- FR/EN toggle
- html5-qrcode check-in sommet
- Envoi email transactionnel
- Module talents / fonds
- Repo GitHub + preview permanente (Netlify/Vercel front + backend séparé)

Quand l’humain dit « tu peux coder », exécuter ce prompt **sans élargir le scope**.
