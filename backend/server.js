const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import des routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes');

// Configuration des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ensa-planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: 'API ENSA Planner' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur détaillée:', err);
  res.status(500).json({ 
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 