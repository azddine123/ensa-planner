import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation de l'email avec le format USMS
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@usms\.ac\.ma$/;
    return regex.test(email);
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    setError('');
    
    // Validation des champs avant envoi
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Validation du format de l'email
    if (!validateEmail(email)) {
      setError('Format d\'email invalide. Utilisez le format exemple@usms.ac.ma');
      return;
    }

    try {
      setLoading(true);
      
      console.log(`Tentative de connexion avec: ${email}, rôle: ${role}`);
      
      const response = await axios.post(`${config.API_URL}/auth/login`, {
        email,
        password,
        role
      });

      if (response.data.user.role !== role) {
        setError(`Vous n'avez pas les droits d'accès en tant que ${role === 'admin' ? 'administrateur' : 'étudiant'}`);
        setLoading(false);
        return;
      }

      localStorage.setItem(config.AUTH_TOKEN_KEY, response.data.token);
      localStorage.setItem(config.USER_DATA_KEY, JSON.stringify(response.data.user));

      console.log(`Connexion réussie pour: ${email}`);
      
      navigate(role === 'admin' ? config.ROUTES.ADMIN_DASHBOARD : config.ROUTES.STUDENT_DASHBOARD);
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      
      if (err.response?.status === 401) {
        setError('Email ou mot de passe incorrect. Veuillez réessayer.');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Données de formulaire invalides');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === 'Network Error') {
        setError('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
      
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url("/images/login-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ENSA <span className="text-blue-600">Planner</span>
          </h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <form className="space-y-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="exemple@usms.ac.ma"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'student')}
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {loading ? 'Connexion...' : 'Connexion Étudiant'}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'admin')}
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? 'Connexion...' : 'Connexion Admin'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Informations de connexion pour test:
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Admin:</strong> admin@usms.ac.ma / adminpass
          </p>
          <p className="text-gray-600">
            <strong>Étudiant:</strong> etudiant@usms.ac.ma / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;