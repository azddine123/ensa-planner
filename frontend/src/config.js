const config = {
  // Configuration de l'API
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Configuration de l'authentification
  AUTH_TOKEN_KEY: 'token',
  USER_DATA_KEY: 'user',
  
  // Configuration des rôles
  ROLES: {
    ADMIN: 'admin',
    STUDENT: 'student'
  },
  
  // Configuration des routes
  ROUTES: {
    LOGIN: '/',
    ADMIN_DASHBOARD: '/admin',
    STUDENT_DASHBOARD: '/student',
    ADMIN_STUDENTS: '/admin/students',
    ADMIN_SCHEDULE: '/admin/schedule',
    ADMIN_GROUPS: '/admin/groups',
    STUDENT_TASKS: '/student/tasks',
    STUDENT_SCHEDULE: '/student/schedule',
    STUDENT_PROFILE: '/student/profile',
    STUDENT_REMINDERS: '/student/reminders',
    STUDENT_GROUPS: '/student/groups',
    STUDENT_STATISTICS: '/student/statistics'
  },
  
  // Configuration des notifications
  NOTIFICATION_TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  },
  
  // Configuration de l'interface
  UI: {
    SIDEBAR_WIDTH: '16rem',
    HEADER_HEIGHT: '4rem',
    COLORS: {
      PRIMARY: '#3B82F6',
      SECONDARY: '#10B981',
      DANGER: '#EF4444',
      WARNING: '#F59E0B',
      INFO: '#3B82F6'
    }
  }
};

export default config; 