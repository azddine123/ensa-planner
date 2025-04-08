const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');

const authController = {
  // Connexion d'un utilisateur
  login: async (req, res) => {
    try {
      console.log('Tentative de connexion avec:', req.body);
      const { email, password, role } = req.body;

      // Vérification du format de l'email
      if (!/^[a-zA-Z0-9._%+-]+@usms\.ac\.ma$/.test(email)) {
        console.log('Format email invalide');
        return res.status(400).json({ message: 'L\'email doit être sous la forme exemple@usms.ac.ma' });
      }

      // Sélectionner le bon modèle en fonction du rôle
      const Model = role === 'admin' ? Admin : Student;
      
      // Vérification de l'utilisateur
      const user = await Model.findOne({ email });
      if (!user) {
        console.log('Utilisateur non trouvé:', email);
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      console.log('Utilisateur trouvé:', user.email, 'Role:', user.role);

      // Vérification du mot de passe
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        console.log('Mot de passe incorrect pour:', email);
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Création du token JWT
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('Connexion réussie pour:', email);

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          ...(user.role === 'student' ? {
            studentId: user.studentId,
            level: user.level,
            branch: user.branch
          } : {
            department: user.department
          })
        }
      });
    } catch (error) {
      console.error('Erreur de connexion:', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  },

  // Création d'un nouvel utilisateur (admin seulement)
  createUser: async (req, res) => {
    try {
      const { email, password, role, firstName, lastName } = req.body;

      // Vérification si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Création du nouvel utilisateur
      const user = new User({
        email,
        password,
        role,
        firstName,
        lastName
      });

      await user.save();

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

module.exports = authController; 