import React, { useState } from 'react';
import Sidebar from '../../components/student/Sidebar';
import Header from '../../components/student/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

const Schedule = () => {
  const [events] = useState([
    {
      id: 1,
      title: 'Cours Java',
      start: '2024-04-15T10:00:00',
      end: '2024-04-15T12:00:00',
      backgroundColor: '#3B82F6',
      extendedProps: {
        type: 'cours',
        location: 'Salle 101',
        professor: 'Dr. Martin'
      }
    },
    {
      id: 2,
      title: 'TP Base de données',
      start: '2024-04-15T14:00:00',
      end: '2024-04-15T16:00:00',
      backgroundColor: '#10B981',
      extendedProps: {
        type: 'tp',
        location: 'Lab Info 2',
        professor: 'Dr. Garcia'
      }
    },
    {
      id: 3,
      title: 'Examen Web',
      start: '2024-04-17T09:00:00',
      end: '2024-04-17T11:00:00',
      backgroundColor: '#EF4444',
      extendedProps: {
        type: 'examen',
        location: 'Amphi A',
        professor: 'Dr. Chen'
      }
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Mon Emploi du Temps</h1>
            <p className="mt-1 text-sm text-gray-600">
              Consultez vos cours, TPs et examens
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Légende */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Légende</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Cours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600">TP</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Examen</span>
                  </div>
                </div>

                {/* Détails de l'événement sélectionné */}
                {selectedEvent && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Détails de l'événement
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Titre</p>
                        <p className="text-sm text-gray-900">{selectedEvent.title}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Type</p>
                        <p className="text-sm text-gray-900">{selectedEvent.extendedProps.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Lieu</p>
                        <p className="text-sm text-gray-900">{selectedEvent.extendedProps.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Professeur</p>
                        <p className="text-sm text-gray-900">{selectedEvent.extendedProps.professor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Horaire</p>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedEvent.start).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {' - '}
                          {new Date(selectedEvent.end).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Calendrier */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow p-4">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  locale={frLocale}
                  events={events}
                  eventClick={handleEventClick}
                  slotMinTime="08:00:00"
                  slotMaxTime="18:00:00"
                  allDaySlot={false}
                  height="auto"
                  expandRows={true}
                  stickyHeaderDates={true}
                  nowIndicator={true}
                  eventClassNames="cursor-pointer"
                  eventContent={(eventInfo) => {
                    return (
                      <div className="p-1">
                        <div className="font-semibold">{eventInfo.event.title}</div>
                        <div className="text-xs">{eventInfo.event.extendedProps.location}</div>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule; 