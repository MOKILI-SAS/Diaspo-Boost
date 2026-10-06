# INSTRUCTIONS PERMANENTES MOKILI (AGENTS / CLAUDE)  
  
## 1. Identite du projet  
**Nom :** Diaspo Boost  
**Profil :** C - Frontend + Backend (Vitrine interactive et transactionnelle)  
**Objectif :** Connecter la diaspora africaine aux opportunites d'investissement.  
  
## 2. Regles MOKILI (Rappel permanent)  
* Le framework MOKILI a ete audite et charge. Les decisions techniques actuelles du projet (React/Express/Prisma) ont ete conservees (KEEP) car elles sont viables.  
* **Ne jamais reecrire ce projet dans une autre stack (ex: Astro) sans decision humaine explicite.**  
* Ne jamais modifier l'infrastructure de production sans validation.  
* Preserver l'existant.  
  
## 3. Stack Technique (Figee)  
* **Frontend :** React 18, Vite, TypeScript (strict), Tailwind CSS, DaisyUI.  
* **Backend :** Node.js 20, Express, Prisma (ORM).  
* **BDD :** MySQL 8 (ou mode fallback local .json).  
  
## 4. Reprise de session  
A chaque nouvelle session, l'agent **doit** lire :  
1. Ce fichier AGENTS.md  
2. PLAN.md (pour voir ou on en est)  
3. MOKILI-PROJECT-SPEC.md (pour les regles metier et infra)  
4. Verifier l'etat de git status 
