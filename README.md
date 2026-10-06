# DiaspoBoost — site vitrine

Plateforme d’échange diaspora × Afrique : sommets, accompagnement à l’investissement, matchmaking de projets.

Le site est **corporate**, **vendeur** et **transparent**. DiaspoBoost n’est pas un intermédiaire financier régulé.

## Prérequis

- Node.js 20+ (Node 24 fonctionne)
- npm 10+
- **MySQL 8.0** via Docker (recommandé) **ou** mode fichier local si Docker n’est pas installé

Windows (PowerShell) : ouvrez le dossier du projet, puis les commandes ci-dessous.

## Démarrage rapide (sans Docker)

Le backend démarre par défaut avec `DB_DRIVER=file` : services, actualités, bookings et newsletter sont persistés dans `backend/data/runtime.json`.

```powershell
cd "C:\Users\MONYANYO\Desktop\MONYANYO\ENTREPRISE\MOKILI\PROJET CODE ZIP DEV PROMPT\Diaspo Boost"
npm install
cd backend; npm install; npx prisma generate; cd ..
cd frontend; npm install; cd ..
npm run dev
```

- Front **DiaspoBoost uniquement** : http://127.0.0.1:5280
- API : http://127.0.0.1:4080/api/v1/health

> Le port 5173 est souvent déjà pris par un autre projet Vite. DiaspoBoost utilise **5280** (front) et **4080** (API) pour éviter le mélange.

## Lien public permanent (Netlify)

**https://diaspoboost.netlify.app**

Tableau de bord : https://app.netlify.com/projects/diaspoboost

Ce site est bien DiaspoBoost (titre de page vérifié). Les formulaires arrivent dans Netlify Forms.

## MySQL 8 (quand Docker Desktop est installé)

```powershell
docker compose up -d
```

Dans `backend/.env` :

```
DB_DRIVER=mysql
DATABASE_URL=mysql://diaspoboost:diaspoboost@127.0.0.1:3306/diaspoboost
```

Puis :

```powershell
cd backend
npx prisma migrate deploy
npm run seed
npm run dev
```

phpMyAdmin : http://localhost:8081

## Vidéo Hero

Placez un fichier MP4 (&lt; 15 Mo) dans `frontend/public/media/hero.mp4`, puis dans `frontend/.env` :

```
VITE_HERO_VIDEO=/media/hero.mp4
```

Sans ce fichier, le Hero affiche un poster de marque (pas de balise `<video>` vide).

## Armoiries RDC

Déposez le visuel officiel dans `frontend/public/brand/armoiries-rdc.svg`. En attendant, un placeholder cadré est affiché.

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | API + front |
| `npm run test` | Tests smoke (API + schéma formulaire) |
| `npm run build` | Build production |

## Admin (liste des demandes)

```
GET /api/v1/admin/bookings
Header: x-admin-key: change-me-admin-key-dev
```

## Stack

React 18 + Vite + TypeScript · Tailwind + DaisyUI · React Router v6 · Framer Motion · Formik + Yup · Zustand · TanStack Query · i18next · Node / Express · Prisma / MySQL 8 · qrcode.react
