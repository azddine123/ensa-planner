const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth, isAdmin } = require('../middleware/auth');

// Route de connexion
router.post('/login', authController.login);

// Route de création d'utilisateur (admin seulement)
router.post('/users', auth, isAdmin, authController.createUser);

module.exports = router; 