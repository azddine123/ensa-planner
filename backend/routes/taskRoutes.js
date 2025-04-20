const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { auth } = require('../middleware/auth');
const { check, param } = require('express-validator');

// Middleware de validation pour les tâches
const taskValidation = [
  check('title').notEmpty().withMessage('Le titre est requis'),
  check('dueDate').isISO8601().withMessage('La date d\'échéance doit être une date valide'),
  check('priority').isIn(['low', 'medium', 'high']).withMessage('La priorité doit être low, medium ou high'),
  check('status').isIn(['pending', 'in_progress', 'completed']).withMessage('Le statut doit être pending, in_progress ou completed'),
  check('category').isIn(['homework', 'project', 'exam', 'other']).withMessage('La catégorie doit être homework, project, exam ou other'),
  check('course').notEmpty().withMessage('Le cours est requis')
];

// Validation pour les IDs MongoDB
const idValidation = [
  param('id').isMongoId().withMessage('ID de tâche invalide')
];

// Routes protégées par authentification
router.use(auth);

// Créer une nouvelle tâche
router.post('/', taskValidation, taskController.createTask);

// Obtenir toutes les tâches
router.get('/', taskController.getTasks);

// Obtenir les statistiques des tâches
router.get('/stats', taskController.getTaskStats);

// Obtenir une tâche spécifique
router.get('/:id', idValidation, taskController.getTask);

// Mettre à jour une tâche
router.put('/:id', [...idValidation, ...taskValidation], taskController.updateTask);

// Supprimer une tâche
router.delete('/:id', idValidation, taskController.deleteTask);

module.exports = router; 