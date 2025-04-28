import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  CalendarIcon,
  CogIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: 'Tableau de bord',
      icon: <HomeIcon className="w-6 h-6" />,
      path: '/admin'
    },
    {
      title: 'Étudiants',
      icon: <UsersIcon className="w-6 h-6" />,
      path: '/admin/students'
    },
    {
      title: 'Groupes',
      icon: <UserGroupIcon className="w-6 h-6" />,
      path: '/admin/groups'
    },
    {
      title: 'Emploi du temps',
      icon: <CalendarIcon className="w-6 h-6" />,
      path: '/admin/schedule'
    },
    {
      title: 'Paramètres',
      icon: <CogIcon className="w-6 h-6" />,
      path: '/admin/settings'
    }
  ];

  return (
    <div className={`bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} z-20`}>
      {/* En-tête */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className={`transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          <h2 className="text-xl font-bold text-gray-800">ENSA Planner</h2>
          <p className="text-sm text-gray-600">Administration</p>
        </div>
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold text-blue-600">EP</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none transition-colors duration-200"
        >
          <ChevronRightIcon className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-5 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ${
              location.pathname === item.path 
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500 font-medium' 
                : ''
            }`}
          >
            <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ${location.pathname === item.path ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {React.cloneElement(item.icon, { 
                className: `w-5 h-5 ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`
              })}
            </div>
            <span className={`ml-3 transition-opacity duration-150 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              {item.title}
            </span>
          </Link>
        ))}
      </nav>

      {/* Pied de page */}
      <div className={`absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 ${collapsed ? 'text-center' : ''}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
          <img 
            className="h-10 w-10 rounded-full border-2 border-gray-200"
            src="/images/ENSA-BENI-MELLAL-LOGO.png" 
            alt="ENSA Logo" 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://ui-avatars.com/api/?name=ENSA&background=0D8ABC&color=fff";
            }}
          />
          <div className={`ml-3 transition-opacity duration-150 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <p className="text-sm font-medium text-gray-800">École Nationale</p>
            <p className="text-xs text-gray-500">Sciences Appliquées</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 