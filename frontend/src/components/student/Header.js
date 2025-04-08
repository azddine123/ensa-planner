import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const notifications = [
    {
      id: 1,
      title: 'Rappel : Remise du projet',
      message: 'Le projet Web est à rendre demain',
      time: '1h',
      type: 'deadline'
    },
    {
      id: 2,
      title: 'Nouveau message',
      message: 'Nouveau message dans le groupe Projet Web',
      time: '2h',
      type: 'message'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-64 h-16 z-10">
      <div className="h-full px-4 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">
            Bienvenue, {user.firstName}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <div className="py-2">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => {/* Gérer le clic sur la notification */}}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 -mx-2"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {notification.type === 'deadline' ? (
                            <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                        </div>
                        <span className="ml-auto text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <Link
                  to="/student/notifications"
                  className="block bg-gray-800 text-white text-center font-bold py-2"
                >
                  Voir toutes les notifications
                </Link>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0D8ABC&color=fff`}
                alt="Profile"
              />
              <span className="font-medium">{user.firstName} {user.lastName}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <Link
                  to="/student/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mon profil
                </Link>
                <Link
                  to="/student/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Paramètres
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-100"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 