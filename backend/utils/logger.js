/**
 * Module de journalisation pour l'application
 */
const fs = require('fs');
const path = require('path');

// Vérifier si le dossier logs existe, sinon le créer
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Créer un flux d'écriture pour les logs
const errorLogStream = fs.createWriteStream(
  path.join(logsDir, 'error.log'),
  { flags: 'a' }
);

const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

/**
 * Format de date pour les logs
 */
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

/**
 * Logger pour les erreurs
 * @param {string} message - Le message d'erreur
 * @param {Error} error - L'objet d'erreur
 */
const logError = (message, error) => {
  const timestamp = getTimestamp();
  const logEntry = `[${timestamp}] ERROR: ${message}\n${error ? `Stack: ${error.stack}\n` : ''}`;
  
  console.error(logEntry);
  errorLogStream.write(logEntry);
};

/**
 * Logger pour les accès
 * @param {string} message - Le message d'accès
 */
const logAccess = (message) => {
  const timestamp = getTimestamp();
  const logEntry = `[${timestamp}] INFO: ${message}\n`;
  
  console.log(logEntry);
  accessLogStream.write(logEntry);
};

/**
 * Logger pour les informations de debug
 * @param {string} message - Le message de debug
 */
const logDebug = (message) => {
  if (process.env.NODE_ENV === 'development') {
    const timestamp = getTimestamp();
    console.log(`[${timestamp}] DEBUG: ${message}`);
  }
};

module.exports = {
  logError,
  logAccess,
  logDebug
}; 