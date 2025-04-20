const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['cours', 'td', 'tp', 'examen', 'réunion', 'autre'],
    default: 'autre'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shared_with: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
eventSchema.index({ user_id: 1, date: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ shared_with: 1 });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event; 