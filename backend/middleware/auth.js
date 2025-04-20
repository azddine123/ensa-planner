const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token non fourni' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expiré', error: 'token_expired' });
      }
      return res.status(401).json({ message: 'Token invalide', error: error.message });
    }
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(500).json({ message: 'Erreur serveur d\'authentification', error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }
  next();
};

const isStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }
  next();
};

module.exports = { auth, isAdmin, isStudent }; 