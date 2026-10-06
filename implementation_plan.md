# PLAN D'IMPLEMENTATION : DASHBOARD ADMIN (CMS)  
  
## 1. Objectif du Module  
Creer un back-office integre permettant a l'administrateur d'ajouter, modifier et supprimer les contenus de la plateforme sans intervention technique.  
Conformement au standard MOKILI, cette interface sera protegee et directement couplee a notre API existante.  
  
## 2. [A CLARIFIER] : Perimetre des elements de la Landing Page  
Actuellement, les **Services** et les **Actualites (News)** sont deja en base de donnees. Cependant, les textes statiques de la landing page (ex: *Titre du Hero, texte Notre Mission*) sont stockes dans les fichiers de traduction (locales/fr.json).  
  
**Question pour validation :**  
Souhaites-tu que le Dashboard gere **uniquement** les entites dynamiques (Services, Actualites, Reservations), ou devons-nous creer une nouvelle table SiteSettings pour rendre le **Titre principal (Hero)** et la **Mission** modifiables depuis le Dashboard ?  
*(Recommandation : Commencer par gerer les Services, News et Bookings, et garder le texte du Hero dans le code pour ce lot afin de maintenir une velocite elevee).*  
  
## 3. Architecture Proposee  
  
### A. Securite et Acces  
- **Pas de systeme complexe d'authentification (OAuth/JWT) pour le moment.**  
- Nous utiliserons la cle d'administration existante (x-admin-key).  
- Le frontend aura une page de login /admin qui demandera cette cle et la stockera de maniere securisee (SessionStorage/Zustand) pour l'injecter dans les requetes API (TanStack Query).  
  
### B. Backend (API Express)  
Il faut etendre le routeur admin (backend/src/modules/admin/router.ts) pour ajouter les routes CRUD manquantes :  
- POST /api/v1/admin/services (Creer)  
- PUT /api/v1/admin/services/:id (Modifier)  
- DELETE /api/v1/admin/services/:id (Supprimer)  
- *Meme chose pour news et bookings.*  
  
### C. Frontend (React / Tailwind)  
Creation d'un layout d'administration complet accessible sous /admin :  
- **Layout :** Sidebar laterale (Tableau de bord, Services, Actualites, Reservations).  
- **Vues Liste :** Tableaux de donnees (DaisyUI) avec boutons d'actions (Editer, Supprimer).  
- **Vues Formulaire :** Formulaires generes avec Formik + Yup pour creer/editer (avec gestion des champs FR et EN).  
  
## 4. Strategie de Mise en Oeuvre  
1. **Backend :** Developper les controleurs et routes CRUD securisees.  
2. **Frontend - Auth :** Creer la page de connexion Admin et le store Zustand.  
