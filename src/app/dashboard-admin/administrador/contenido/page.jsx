"use client";
import { useState } from "react";
import { Bell, MessageSquare, Search, CheckCircle, Eye } from "lucide-react"; // Iconos de lucide-react
import { format } from "date-fns"; // Para manejar la fecha

// Datos simulados de eventos y solicitudes
const initialEvents = [
  { id: 1, name: "Evento 1", date: "2026-07-15", description: "Descripción del Evento 1", status: "pending" },
  { id: 2, name: "Evento 2", date: "2026-07-20", description: "Descripción del Evento 2", status: "approved" },
  { id: 3, name: "Evento 3", date: "2026-07-25", description: "Descripción del Evento 3", status: "pending" },
];

const upcomingEvents = [
  { id: 1, name: "Evento 1", description: "Descripción del Evento 1", date: "2026-07-15" },
  { id: 2, name: "Evento 2", description: "Descripción del Evento 2", date: "2026-07-20" },
];

export default function ContentManagement() {
  const [filter, setFilter] = useState(""); // Filtro por evento
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de eventos
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado para más detalles
  const [events, setEvents] = useState(initialEvents); // Estado de los eventos
  const [selectedDate, setSelectedDate] = useState(new Date()); // Fecha seleccionada en el calendario

  // Filtrar eventos por nombre
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Función para aprobar evento
  const handleApproveEvent = (id) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, status: "approved" } : event
    );
    setEvents(updatedEvents); // Actualizamos el estado de los eventos
  };

  // Función para abrir el modal con los detalles del evento
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Manejo del calendario de eventos
  const getDaysInMonth = (year, month) => {
    return new Array(31)
      .fill(0)
      .map((_, i) => new Date(year, month, i + 1).getDate())
      .filter((day) => new Date(year, month, day).getMonth() === month);
  };

  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
  const dayOfWeek = firstDayOfMonth.getDay(); // Día de la semana en que empieza el mes
  const currentDay = selectedDate.getDate();

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Barra de búsqueda */}
      <header className="bg-white rounded-lg shadow mb-6 px-4 py-2 flex items-center">
        <div className="flex items-center flex-1">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Filtro por nombre de evento
          />
        </div>
        <div className="flex items-center gap-4 ml-6 text-gray-600">
          <button className="hover:text-blue-600">
            <Bell size={22} />
          </button>
          <button className="hover:text-blue-600">
            <MessageSquare size={22} />
          </button>
        </div>
      </header>

      {/* Contenedor blanco que envuelve toda la sección */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Título de la sección */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gestión de Contenidos</h2>

        {/* Sección de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Calendario de eventos */}
          <div className="bg-white rounded-xl shadow-md p-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Calendario de Eventos</h3>
            <div className="w-full flex justify-center items-center">
              <div className="border border-gray-400 p-6 rounded-md text-center">
                <div className="font-semibold text-lg text-blue-700 mb-2">{format(selectedDate, "MMMM yyyy")}</div>
                <div className="flex justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="px-4 py-2 bg-gray-300 rounded-md text-white hover:bg-gray-400"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="px-4 py-2 bg-gray-300 rounded-md text-white hover:bg-gray-400"
                  >
                    &gt;
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {/* Días de la semana */}
                  {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                    <div key={d} className="font-semibold text-gray-700">{d}</div>
                  ))}
                  {/* Días del mes */}
                  {Array.from({ length: dayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-1"></div>
                  ))}
                  {daysInMonth.map((day) => (
                    <div
                      key={`${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${day}`} // Clave única
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${day === currentDay ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Solicitudes de eventos */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Solicitudes de Eventos</h3>
            <div className="space-y-4">
              {/* Solicitudes */}
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-blue-100 p-4 rounded-md shadow-sm">
                  <h4 className="font-semibold text-gray-700">Aprueba este evento</h4>
                  <p className="text-sm text-gray-600">{event.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                      onClick={() => handleApproveEvent(event.id)} // Aprobar evento
                    >
                      <CheckCircle size={18} />
                      Aprobar
                    </button>
                    <button
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
                      onClick={() => openModal(event)} // Ver detalles
                    >
                      <Eye size={18} />
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Próximos eventos */}
        <div className="bg-white rounded-xl shadow-md p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Próximos Eventos</h3>
          <div className="space-y-4">
            {/* Eventos */}
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md shadow-sm">
                <h4 className="font-semibold text-gray-700">{event.name}</h4>
                <p className="text-xs text-gray-600">14 Jul 2026</p>
                <p className="text-sm text-gray-700">Descripción del evento...</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Ver Más
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de detalles del evento */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedEvent.name}</h3>
            <p className="text-sm text-gray-600">{selectedEvent.date}</p>
            <p className="text-sm text-gray-700">{selectedEvent.description}</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
