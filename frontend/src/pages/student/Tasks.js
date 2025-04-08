import React, { useState } from 'react';
import Sidebar from '../../components/student/Sidebar';
import Header from '../../components/student/Header';

const Tasks = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Projet Web - Frontend',
      description: 'Implémenter la page d\'accueil avec React',
      deadline: '2024-04-15',
      priority: 'high',
      category: 'Développement Web',
      completed: false
    },
    {
      id: 2,
      title: 'Exercices Java',
      description: 'Compléter les exercices sur l\'héritage',
      deadline: '2024-04-12',
      priority: 'medium',
      category: 'Programmation Java',
      completed: true
    },
    {
      id: 3,
      title: 'Présentation Base de données',
      description: 'Préparer la présentation sur les transactions',
      deadline: '2024-04-20',
      priority: 'high',
      category: 'Base de données',
      completed: false
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    category: ''
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      completed: false
    };
    setTasks([...tasks, task]);
    setShowAddForm(false);
    setNewTask({
      title: '',
      description: '',
      deadline: '',
      priority: 'medium',
      category: ''
    });
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Mes Tâches</h1>
              <p className="mt-1 text-sm text-gray-600">
                Gérez vos tâches et suivez votre progression
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Nouvelle tâche
            </button>
          </div>

          {/* Filtres */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                En cours
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Terminées
              </button>
            </div>
          </div>

          {/* Liste des tâches */}
          <div className="bg-white shadow-sm rounded-lg">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="border-b border-gray-200 last:border-0 p-4 hover:bg-gray-50"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-medium ${
                        task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {task.category}
                      </span>
                      <span className="ml-2">
                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal d'ajout de tâche */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Nouvelle tâche</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date limite</label>
                  <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priorité</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <input
                    type="text"
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks; 