const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma Admin
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@usms\.ac\.ma$/.test(v);
      },
      message: props => `${props.value} n'est pas un email valide! L'email doit être sous la forme exemple@usms.ac.ma`
    }
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin',
    immutable: true
  },
  department: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: '/images/user-icone.png'
  }
}, {
  timestamps: true,
  collection: 'admins'
});

// Middleware pour le hachage du mot de passe
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour vérifier le mot de passe
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; 