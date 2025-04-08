const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    console.log('Création de tâche - Corps de la requête:', req.body);
    console.log('Utilisateur:', req.user);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erreurs de validation:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const task = new Task({
      ...req.body,
      student: req.user.id
    });

    console.log('Tâche à créer:', task);

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Erreur détaillée lors de la création de la tâche:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de la tâche',
      error: error.message 
    });
  }
};

// Récupérer toutes les tâches d'un étudiant
exports.getTasks = async (req, res) => {
  try {
    console.log('Récupération des tâches pour l\'utilisateur:', req.user);
    const filters = { student: req.user.id };
    
    // Filtres optionnels
    if (req.query.status) filters.status = req.query.status;
    if (req.query.priority) filters.priority = req.query.priority;
    if (req.query.category) filters.category = req.query.category;

    console.log('Filtres appliqués:', filters);

    const tasks = await Task.find(filters)
      .sort({ dueDate: 1 })
      .populate('student', 'firstName lastName');

    console.log('Nombre de tâches trouvées:', tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des tâches:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des tâches',
      error: error.message 
    });
  }
};

// Récupérer une tâche spécifique
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      student: req.user.id
    }).populate('student', 'firstName lastName');

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(task);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche' });
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      student: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Si la tâche est marquée comme complétée, enregistrer la date
    if (req.body.status === 'completed' && task.status !== 'completed') {
      req.body.completedAt = new Date();
    }

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      student: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};

// Récupérer les statistiques des tâches
exports.getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { student: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const overdueTasks = await Task.find({
      student: req.user._id,
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' }
    }).count();

    res.json({
      stats: stats.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
      overdueTasks
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
}; 