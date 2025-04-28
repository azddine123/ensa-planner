const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const { check, param } = require('express-validator');

// Contrôleur temporaire pour les groupes
const groupController = {
  // Créer un groupe
  createGroup: async (req, res) => {
    try {
      console.log('Création de groupe demandée:', req.body);
      // Pour l'instant, on simule une création réussie
      res.status(201).json({ 
        message: 'Groupe créé avec succès (simulation)',
        group: req.body 
      });
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  // Récupérer tous les groupes
  getAllGroups: async (req, res) => {
    try {
      // Pour l'instant, on renvoie un tableau vide
      res.json([]);
    } catch (error) {
      console.error('Erreur lors de la récupération des groupes:', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  // Récupérer un groupe par son ID
  getGroupById: async (req, res) => {
    try {
      console.log('Récupération du groupe avec ID:', req.params.id);
      res.status(404).json({ message: 'Groupe non trouvé' });
    } catch (error) {
      console.error('Erreur lors de la récupération du groupe:', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  // Mettre à jour un groupe
  updateGroup: async (req, res) => {
    try {
      console.log('Mise à jour du groupe avec ID:', req.params.id);
      res.status(404).json({ message: 'Groupe non trouvé' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du groupe:', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  // Supprimer un groupe
  deleteGroup: async (req, res) => {
    try {
      console.log('Suppression du groupe avec ID:', req.params.id);
      res.status(404).json({ message: 'Groupe non trouvé' });
    } catch (error) {
      console.error('Erreur lors de la suppression du groupe:', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  }
};

// Middleware de validation pour les groupes
const groupValidation = [
  check('name').notEmpty().withMessage('Le nom du groupe est requis'),
  check('members').isArray().withMessage('Les membres doivent être un tableau d\'IDs')
];

// Validation pour les IDs MongoDB
const idValidation = [
  param('id').isMongoId().withMessage('ID de groupe invalide')
];

// Routes d'administration des groupes (protégées par authentification admin)
router.use(auth, isAdmin);

// Créer un groupe
router.post('/', groupValidation, groupController.createGroup);

// Obtenir tous les groupes
router.get('/', groupController.getAllGroups);

// Obtenir un groupe spécifique
router.get('/:id', idValidation, groupController.getGroupById);

// Mettre à jour un groupe
router.put('/:id', [...idValidation, ...groupValidation], groupController.updateGroup);

// Supprimer un groupe
router.delete('/:id', idValidation, groupController.deleteGroup);

module.exports = router; 