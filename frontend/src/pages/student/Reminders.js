import React, { useState } from 'react';
import Sidebar from '../../components/student/Sidebar';
import Header from '../../components/student/Header';

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Projet Web à rendre',
      description: 'Finaliser le projet React et le déployer',
      dueDate: '2024-04-20',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Révision Mathématiques',
      description: 'Chapitres 3 et 4 - Probabilités',
      dueDate: '2024-04-18',
      priority: 'medium',
      completed: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const handleAddReminder = (e) => {
    e.preventDefault();
    const reminder = {
      id: reminders.length + 1,
      ...newReminder,
      completed: false
    };
    setReminders([...reminders, reminder]);
    setNewReminder({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
    setShowAddForm(false);
  };

  const toggleComplete = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Mes Rappels</h1>
              <p className="mt-1 text-sm text-gray-600">
                Gérez vos tâches et rappels importants
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ajouter un rappel
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Nouveau Rappel
              </h2>
              <form onSubmit={handleAddReminder}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Titre
                    </label>
                    <input
                      type="text"
                      required
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={newReminder.description}
                      onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date d'échéance
                      </label>
                      <input
                        type="date"
                        required
                        value={newReminder.dueDate}
                        onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Priorité
                      </label>
                      <select
                        value={newReminder.priority}
                        onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className={`p-4 hover:bg-gray-50 ${reminder.completed ? 'bg-gray-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => toggleComplete(reminder.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${reminder.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {reminder.title}
                        </p>
                        <p className="text-sm text-gray-500">{reminder.description}</p>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            Échéance : {new Date(reminder.dueDate).toLocaleDateString('fr-FR')}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                            {reminder.priority === 'high' ? 'Haute' : reminder.priority === 'medium' ? 'Moyenne' : 'Basse'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reminders;