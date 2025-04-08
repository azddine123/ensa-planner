import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

const ProjectGroups = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Groupe A',
      project: 'Application Web',
      members: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      class: 'GI2',
      status: 'En cours'
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    project: '',
    members: [],
    class: '',
    status: 'En cours'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setGroups([...groups, { ...newGroup, id: groups.length + 1 }]);
    setShowAddForm(false);
    setNewGroup({
      name: '',
      project: '',
      members: [],
      class: '',
      status: 'En cours'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Gestion des Groupes de Projet</h1>
            <div className="flex space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Toutes les classes</option>
                <option value="GI1">GI1</option>
                <option value="GI2">GI2</option>
                <option value="GI3">GI3</option>
              </select>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Nouveau Groupe
              </button>
            </div>
          </div>

          {/* Liste des groupes */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom du Groupe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groups
                  .filter(group => !selectedClass || group.class === selectedClass)
                  .map(group => (
                    <tr key={group.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{group.project}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {group.members.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{group.class}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          group.status === 'En cours' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {group.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Éditer</button>
                        <button className="text-red-600 hover:text-red-900">Supprimer</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Modal d'ajout de groupe */}
          {showAddForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Nouveau Groupe de Projet</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom du Groupe</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Projet</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newGroup.project}
                        onChange={(e) => setNewGroup({...newGroup, project: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Membres (séparés par des virgules)</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        onChange={(e) => setNewGroup({...newGroup, members: e.target.value.split(',')})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Classe</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newGroup.class}
                        onChange={(e) => setNewGroup({...newGroup, class: e.target.value})}
                        required
                      >
                        <option value="">Sélectionner une classe</option>
                        <option value="GI1">GI1</option>
                        <option value="GI2">GI2</option>
                        <option value="GI3">GI3</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                      Créer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectGroups; 