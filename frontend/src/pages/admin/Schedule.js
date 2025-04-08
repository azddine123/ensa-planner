import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

const Schedule = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    class: ''
  });

  const handleExportPDF = () => {
    // TODO: Implémenter l'export PDF
  };

  const handleSendEmail = () => {
    // TODO: Implémenter l'envoi par email
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter l'ajout d'événement
    setShowEventForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Gestion des Emplois du Temps</h1>
            <div className="flex space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Sélectionner une classe</option>
                <option value="GI1">GI1</option>
                <option value="GI2">GI2</option>
                <option value="GI3">GI3</option>
              </select>
              <button
                onClick={() => setShowEventForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Ajouter un événement
              </button>
              <button
                onClick={handleExportPDF}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Exporter PDF
              </button>
              <button
                onClick={handleSendEmail}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Envoyer par email
              </button>
            </div>
          </div>

          {/* Grille de l'emploi du temps */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-6 gap-px bg-gray-200">
              <div className="bg-gray-50 p-4"></div>
              <div className="bg-gray-50 p-4 text-center font-medium">Lundi</div>
              <div className="bg-gray-50 p-4 text-center font-medium">Mardi</div>
              <div className="bg-gray-50 p-4 text-center font-medium">Mercredi</div>
              <div className="bg-gray-50 p-4 text-center font-medium">Jeudi</div>
              <div className="bg-gray-50 p-4 text-center font-medium">Vendredi</div>
            </div>
            
            {/* Créneaux horaires */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="grid grid-cols-6 gap-px bg-gray-200">
                <div className="bg-white p-4 text-sm text-gray-700">
                  {`${8 + index}:00`}
                </div>
                {Array.from({ length: 5 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="bg-white p-4 min-h-[100px] relative">
                    {/* Exemple d'événement */}
                    {index === 2 && dayIndex === 1 && (
                      <div className="absolute inset-1 bg-blue-100 p-2 rounded">
                        <div className="text-sm font-medium text-blue-800">Cours Java</div>
                        <div className="text-xs text-blue-600">10:00 - 12:00</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Modal d'ajout d'événement */}
          {showEventForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Ajouter un événement</h3>
                  <button onClick={() => setShowEventForm(false)} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Titre</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={eventData.title}
                        onChange={(e) => setEventData({...eventData, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={eventData.type}
                        onChange={(e) => setEventData({...eventData, type: e.target.value})}
                        required
                      >
                        <option value="">Sélectionner un type</option>
                        <option value="cours">Cours</option>
                        <option value="tp">TP</option>
                        <option value="examen">Examen</option>
                        <option value="projet">Projet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={eventData.date}
                        onChange={(e) => setEventData({...eventData, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Heure début</label>
                        <input
                          type="time"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={eventData.startTime}
                          onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Heure fin</label>
                        <input
                          type="time"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={eventData.endTime}
                          onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={eventData.description}
                        onChange={(e) => setEventData({...eventData, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Classe</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={eventData.class}
                        onChange={(e) => setEventData({...eventData, class: e.target.value})}
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
                      onClick={() => setShowEventForm(false)}
                      className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
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
      </main>
    </div>
  );
};

export default Schedule; 