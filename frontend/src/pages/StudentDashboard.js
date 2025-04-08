import React from 'react';
import Sidebar from '../components/student/Sidebar';
import Header from '../components/student/Header';

const StudentDashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Cours Java',
      time: '10:00 - 12:00',
      type: 'cours',
      location: 'Salle 101'
    },
    {
      id: 2,
      title: 'TP Base de données',
      time: '14:00 - 16:00',
      type: 'tp',
      location: 'Lab Info 2'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Projet Web - Frontend',
      deadline: '2024-04-15',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Exercices Java',
      deadline: '2024-04-12',
      priority: 'medium',
      completed: true
    }
  ];

  const stats = [
    {
      title: 'Tâches complétées',
      value: '85%',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Présence aux cours',
      value: '92%',
      change: '-2%',
      changeType: 'decrease'
    },
    {
      title: 'Projets en cours',
      value: '3',
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-600' :
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Événements à venir */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Événements à venir</h2>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-12 rounded-full mr-4 ${
                        event.type === 'cours' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.time}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tâches en cours */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Tâches en cours</h2>
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${
                          task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Deadline: {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard; 