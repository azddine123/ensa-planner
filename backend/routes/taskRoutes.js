const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middleware/auth');

// Routes protégées par authentification
router.use(auth);

// Créer une nouvelle tâche
router.post('/', taskController.createTask);

// Obtenir toutes les tâches
router.get('/', taskController.getTasks);

// Obtenir les statistiques des tâches
router.get('/stats', taskController.getTaskStats);

// Obtenir une tâche spécifique
router.get('/:id', taskController.getTask);

// Mettre à jour une tâche
router.put('/:id', taskController.updateTask);

// Supprimer une tâche
router.delete('/:id', taskController.deleteTask);

module.exports = router; 