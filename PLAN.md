# PLAN DE MIGRATION ET REMISE EN ORDRE MOKILI  
  
## STATUT ACTUEL  
**LOTs 1, 2, 3, 4 et 5 réalisés avec succès.**
- Overlay modal « JE ME LANCE » synchronisé avec Google Form contact@diaspoboost.com.
- Dashboard admin protégé par email `contact@diaspoboost.com` et mot de passe.
- Galerie photos réelles intégrées selon ville et événement.
- Mails transactionnels opérationnels (SMTP Nodemailer / Resend API / notification équipe + accusé candidat).
  
## LOT 0 - Audit et documentation (TERMINE)  
  
## LOT 1 - Securite critique (TERMINE)  
- [x] Verifier la presence et la proprete de .env.example en front et back.  
- [x] S'assurer qu'aucun .env n'est versionne (verification du .gitignore).  
  
## LOT 2 - Architecture et Organisation (TERMINE)  
- [x] Verification du parametrage CORS dans Express (parametre sur FRONTEND_ORIGIN dynamique grace a env.ts).  
- [x] Preparer les variables pour le passage en production.  
  
## LOT 3 - Infrastructure et Deploiement H04 (Hybride) (TERMINE)  
- [x] Frontend : Validation de la configuration pour Netlify (presence de netlify.toml valide avec redirects SPA).  
- [x] Backend : Preparation des scripts de deploiement pour un VPS MOKILI (H03) avec ecosystem.config.cjs pour PM2 et nginx-sample.conf.  
  
## LOT 4 - Tests et validation (TERMINE)  
*Objectif : S'assurer que le projet est stable avant la prochaine iteration produit.*  
- [x] Executer npm run test front et back (Backend : 5/5 passés, Frontend : 2/2 passés).  
- [x] Verifier la compilation (npm run build : tsc backend OK, tsc + vite build frontend OK).  
- [x] Correction syntaxique des artefacts de déploiement (ecosystem.config.cjs et nginx-sample.conf).  
- [x] Alignement éditorial et visuel (Hero sans son, silhouette Afrique, Hub nettoyé, agenda 2026-2027, Bilan Luxembourg et photo officielle, contacts RDC, formulaire Google Form style `/lancer`).

## LOT 5 - Fonctionnalités Post-MVP & Exploitation (TERMINE)  
*Objectif : Finalisation transactionnelle et déploiement production.*  
- [x] Formulaire en overlay modal « JE ME LANCE » accessible sur tout le site et lié au compte Google Form `contact@diaspoboost.com`.  
- [x] Interface d'administration visuelle (`/admin`) sécurisée par email (`contact@diaspoboost.com`) et mot de passe.  
- [x] Mails transactionnels implémentés (support Nodemailer SMTP, API Resend, notification équipe vers `contact@diaspoboost.com` et confirmation candidat).  
- [x] Intégration des photos réelles du dossier `IMAGE` selon la ville et l'activité (Kinshasa 2024, Brazzaville 2025, Bruxelles sept 2023, Luxembourg 2024, Maroc 2026).  
- [x] Préparation des artefacts de mise en production VPS H03 et validation des builds. 
