const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  category: {
    type: String,
    enum: ['homework', 'project', 'exam', 'other'],
    default: 'other'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: String,
    required: true
  },
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  reminders: [{
    date: Date,
    sent: {
      type: Boolean,
      default: false
    }
  }],
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
taskSchema.index({ student: 1, dueDate: 1 });
taskSchema.index({ status: 1 });

// Méthode pour marquer une tâche comme terminée
taskSchema.methods.markAsCompleted = function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return this.save();
};

// Méthode statique pour trouver les tâches en retard
taskSchema.statics.findOverdueTasks = function() {
  return this.find({
    dueDate: { $lt: new Date() },
    status: { $ne: 'completed' }
  });
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; 