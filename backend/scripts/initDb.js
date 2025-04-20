/**
 * Script d'initialisation de la base de données
 * Ce script permet de créer des utilisateurs de test
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const Student = require('../models/Student');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ensa-planner', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });

// Fonction pour créer des utilisateurs de test
const createTestUsers = async () => {
  try {
    // Supprimer les utilisateurs existants (pour éviter les doublons)
    await Admin.deleteMany({});
    await Student.deleteMany({});
    
    console.log('Base de données nettoyée');

    // Créer un admin de test
    const admin = new Admin({
      email: 'admin@usms.ac.ma',
      password: 'adminpass',
      firstName: 'Admin',
      lastName: 'ENSA',
      department: 'Informatique',
      profileImage: '/images/user-icone.png'
    });

    await admin.save();
    console.log('Admin créé:', admin.email);

    // Créer un étudiant de test
    const student = new Student({
      email: 'etudiant@usms.ac.ma',
      password: 'password',
      firstName: 'Etudiant',
      lastName: 'Test',
      studentId: '12345',
      level: '3A',
      branch: 'Informatique',
      profileImage: '/images/user-icone.png'
    });

    await student.save();
    console.log('Étudiant créé:', student.email);

    console.log('Tous les utilisateurs de test ont été créés avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la création des utilisateurs de test:', error);
    process.exit(1);
  }
};

// Exécuter la fonction
createTestUsers(); 