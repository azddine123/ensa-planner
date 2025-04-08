const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma Étudiant
const studentSchema = new mongoose.Schema({
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
    default: 'student',
    immutable: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    required: true,
    enum: ['1A', '2A', '3A', '4A', '5A']
  },
  branch: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: '/images/user-icone.png'
  }
}, {
  timestamps: true,
  collection: 'students'
});

// Middleware pour le hachage du mot de passe
studentSchema.pre('save', async function(next) {
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
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 