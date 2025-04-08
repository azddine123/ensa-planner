import React from 'react';
import Sidebar from '../../components/student/Sidebar';
import Header from '../../components/student/Header';

const Statistics = () => {
  const attendanceData = {
    total: 120,
    present: 112,
    absent: 8,
    percentage: 93.33
  };

  const gradesData = [
    { subject: 'Développement Web', grade: 17, average: 15.5 },
    { subject: 'Base de données', grade: 16, average: 14.8 },
    { subject: 'Mathématiques', grade: 15, average: 13.7 },
    { subject: 'Algorithmique', grade: 18, average: 14.2 }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      subject: 'Développement Web',
      task: 'Projet Final',
      deadline: '2024-04-20'
    },
    {
      id: 2,
      subject: 'Base de données',
      task: 'TP NoSQL',
      deadline: '2024-04-25'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Mes Statistiques</h1>
            <p className="mt-1 text-sm text-gray-600">
              Suivez votre progression et vos performances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Carte de présence */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">Présence</h2>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-blue-600">{attendanceData.percentage}%</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({attendanceData.present}/{attendanceData.total} cours)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${attendanceData.percentage}%` }}
                />
              </div>
            </div>

            {/* Moyenne générale */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">Moyenne générale</h2>
                  <p className="text-2xl font-bold text-green-600">
                    {(gradesData.reduce((acc, curr) => acc + curr.grade, 0) / gradesData.length).toFixed(2)}/20
                  </p>
                </div>
              </div>
            </div>

            {/* Prochaine échéance */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">Prochaine échéance</h2>
                  <p className="text-sm text-gray-500">
                    {upcomingDeadlines[0]?.task} - {upcomingDeadlines[0]?.subject}
                  </p>
                  <p className="text-sm font-medium text-yellow-600">
                    {new Date(upcomingDeadlines[0]?.deadline).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Nombre de matières */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">Matières</h2>
                  <p className="text-2xl font-bold text-purple-600">{gradesData.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des notes */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Détail des notes par matière
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Matière
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Moyenne de la classe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Écart
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gradesData.map((subject, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subject.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subject.grade}/20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subject.average}/20
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subject.grade >= subject.average ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {(subject.grade - subject.average).toFixed(1)} points
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Échéances à venir */}
          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Échéances à venir
              </h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {upcomingDeadlines.map((deadline) => (
                <li key={deadline.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deadline.task}</p>
                      <p className="text-sm text-gray-500">{deadline.subject}</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-500">
                        {new Date(deadline.deadline).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
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

export default Statistics; 