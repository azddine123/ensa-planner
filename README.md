# ENSA Planner

Application de planification pour les étudiants de l'ENSA Beni Mellal.

## Fonctionnalités

- **Gestion des tâches** - Créer, visualiser, mettre à jour et supprimer des tâches
- **Tableau de bord** - Vue d'ensemble des tâches en cours et à venir
- **Statistiques** - Visualisation des progrès et de la répartition des tâches
- **Interface intuitive** - Navigation simple et ergonomique

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone <url-du-repo>
cd ensa-planner
```

2. Installer les dépendances (backend et frontend) :
```bash
npm run install-all
```

3. Configuration des variables d'environnement :
   - Créer un fichier `.env` dans le dossier `backend` avec les variables suivantes :
     ```
     MONGODB_URI=mongodb://root:root@localhost:27017/ensa-planner?authSource=admin
     PORT=5000
     JWT_SECRET=votre_secret_jwt
     ```
   - Créer un fichier `.env` dans le dossier `frontend` avec les variables suivantes :
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

4. Démarrer MongoDB avec Docker :
```bash
cd backend
docker-compose up -d
```

5. Lancer l'application (backend et frontend) :
```bash
npm start
```

## Utilisation

1. Accéder à l'application via : `http://localhost:3000`
2. Se connecter avec les identifiants fournis :
   - **Étudiant**: email@usms.ac.ma / password
   - **Admin**: admin@usms.ac.ma / adminpass

## Structure du projet

- `backend/` - Serveur Express.js et API REST
  - `controllers/` - Logique de traitement des requêtes
  - `models/` - Modèles de données Mongoose
  - `routes/` - Routes API
  - `middleware/` - Middleware d'authentification et autres
- `frontend/` - Application React
  - `src/components/` - Composants réutilisables
  - `src/pages/` - Pages de l'application
  - `src/services/` - Services API

## Contact

Pour toute question, contactez l'équipe de développement de l'ENSA Beni Mellal. 