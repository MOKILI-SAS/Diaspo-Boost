# MOKILI PROJECT SPECIFICATIONS  
  
## 1. IDENTITE  
**Projet :** Diaspo Boost  
**Objectif :** Transformer l'epargne de la diaspora en investissement productif. Plateforme vitrine orientee acquisition (leads/bookings).  
**Profil MOKILI :** Vitrine avancee / Web App (C - Frontend + Backend).  
  
## 2. AUDIT TECHNIQUE ET DECISIONS (02 Septembre 2026)  
L'audit du projet a permis de classer les elements existants afin de se conformer au MOKILI TECH CORE.  
  
### 2.1 STACK ET ARCHITECTURE (KEEP)  
- **Frontend (KEEP) :** React 18, TypeScript, TailwindCSS, Formik, i18next.  
*Justification : Le projet a ete concu avec cette stack et elle correspond parfaitement aux besoins interactifs complexes (formulaires multiples, i18n dynamique, etat cote client). Une migration vers Astro serait couteuse et inutile.*  
- **Backend (KEEP) :** Node.js 20, Express, TypeScript, Zod.  
*Justification : Architecture API-First propre et evolutive. Totalement validee par MOKILI.*  
- **Database (KEEP) :** MySQL 8 via Prisma ORM.  
  
### 2.2 INFRASTRUCTURE ET DEPLOIEMENT (MIGRATE ET ADAPT)  
L'infrastructure cible selectionnee est la famille **H04 - Hybrid**.  
- **Frontend (ADAPT) :** Conserver et solidifier le deploiement de type Edge sur Netlify (H01).  
- **Backend (MIGRATE) :** Actuellement prevu pour tourner en local, le backend **doit migrer vers un VPS MOKILI (H03)**. Cette migration implique le respect strict du *MOKILI - Protocole Standard VPS, Securite et Exploitation V2* (Nginx, PM2/Systemd, SSH securise).  
  
### 2.3 MODULES (ACTIVE ET DEFER)  
- **i18n (ACTIVE) :** FR/EN gere cote front, contenu bilingue en base de donnees.  
- **Reservations (ACTIVE) :** Module de booking avec statut et gestion des formulaires de demande.  
- **Mails transactionnels (ACTIVE) :** Implémenté via Nodemailer multi-fournisseur (SMTP standard, Resend API, console dev) avec notification automatique à l'équipe sur `contact@diaspoboost.com` et accusé de réception candidat avec référence unique.  
- **Admin UI (ACTIVE) :** Dashboard visuel `/admin` complet et sécurisé par identifiants officiels (`contact@diaspoboost.com` + mot de passe), listing, recherche et filtrage des demandes.  
  
### 2.4 ELEMENTS A SUPPRIMER (REMOVE)  
- A ce stade, le repository est propre. Aucun element structurel n'est marque comme REMOVE.  
  
## 3. SECURITE ET CONVENTIONS  
- Tous les secrets doivent etre isoles (.env non versionne).  
- Le backend doit valider la provenance des requetes (CORS restrictif vers le domaine Netlify de production).  
- Aucune donnee destructive (drop table) ne doit etre executee en production sans sauvegarde prealable. 
