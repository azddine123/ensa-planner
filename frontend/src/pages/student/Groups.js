import React, { useState } from 'react';
import Sidebar from '../../components/student/Sidebar';
import Header from '../../components/student/Header';

const Groups = () => {
  const [groups] = useState([
    {
      id: 1,
      name: 'Projet Web',
      members: [
        { id: 1, name: 'Sarah Martin', role: 'Chef de projet' },
        { id: 2, name: 'Thomas Garcia', role: 'Développeur Frontend' },
        { id: 3, name: 'Julie Chen', role: 'Développeur Backend' }
      ],
      description: 'Groupe pour le projet de développement web',
      nextMeeting: '2024-04-18T14:00:00'
    },
    {
      id: 2,
      name: 'TP Base de données',
      members: [
        { id: 1, name: 'Sarah Martin', role: 'Membre' },
        { id: 4, name: 'Lucas Bernard', role: 'Membre' }
      ],
      description: 'Groupe de TP pour le cours de base de données',
      nextMeeting: '2024-04-19T10:00:00'
    }
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Mes Groupes</h1>
            <p className="mt-1 text-sm text-gray-600">
              Gérez vos groupes de travail et projets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des groupes */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Liste des groupes
                  </h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {groups.map((group) => (
                    <li key={group.id}>
                      <button
                        onClick={() => setSelectedGroup(group)}
                        className={`w-full px-4 py-3 flex items-center text-left hover:bg-gray-50 ${
                          selectedGroup?.id === group.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {group.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {group.members.length} membres
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Détails du groupe */}
            <div className="lg:col-span-2">
              {selectedGroup ? (
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {selectedGroup.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                          {selectedGroup.description}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Rejoindre le chat
                      </button>
                    </div>

                    {/* Prochaine réunion */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        Prochaine réunion
                      </h3>
                      <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="ml-2 text-sm text-blue-700">
                            {new Date(selectedGroup.nextMeeting).toLocaleString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Membres du groupe */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        Membres du groupe
                      </h3>
                      <ul className="mt-3 grid grid-cols-1 gap-4">
                        {selectedGroup.members.map((member) => (
                          <li
                            key={member.id}
                            className="px-4 py-3 flex items-center space-x-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff`}
                                alt={member.name}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {member.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {member.role}
                              </p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-500">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Sélectionnez un groupe
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choisissez un groupe dans la liste pour voir ses détails
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Groups; 