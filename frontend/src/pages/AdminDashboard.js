import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Étudiants',
      value: '150',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Groupes Actifs',
      value: '8',
      change: '+2',
      changeType: 'increase'
    },
    {
      title: 'Taux de Présence',
      value: '92%',
      change: '-3%',
      changeType: 'decrease'
    },
    {
      title: 'Événements à venir',
      value: '5',
      change: '0',
      changeType: 'neutral'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' :
                    stat.changeType === 'decrease' ? 'text-red-600' :
                    'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activités récentes */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Activités récentes</h2>
                <div className="mt-6 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    <li className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Nouveau groupe créé
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          Le groupe "G3 - Génie Informatique" a été créé avec 25 étudiants.
                        </p>
                      </div>
                    </li>
                    <li className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Mise à jour de l'emploi du temps
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          L'emploi du temps du groupe G2 a été mis à jour pour la semaine prochaine.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Calendrier des événements */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Événements à venir</h2>
                <div className="mt-6 flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    <li className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Réunion pédagogique
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Lundi, 10 Avril 2024 - 14:00
                        </p>
                      </div>
                    </li>
                    <li className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Examen final - Module Java
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Mercredi, 12 Avril 2024 - 09:00
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 