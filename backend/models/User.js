const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  promotion: {
    type: String,
    required: true,
    trim: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
userSchema.index({ email: 1 });
userSchema.index({ promotion: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User; 