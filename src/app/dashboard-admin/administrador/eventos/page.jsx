"use client";
import { useState } from "react";
import { Pencil, Trash, CheckCircle, XCircle, PlusCircle } from "lucide-react"; // Iconos

// Datos simulados de eventos
const eventos = [
  { id: 1, nombre: "Evento 1", fecha: "2026-07-15", descripcion: "Descripción del Evento 1", estado: "pendiente" },
  { id: 2, nombre: "Evento 2", fecha: "2026-07-20", descripcion: "Descripción del Evento 2", estado: "aprobado" },
  { id: 3, nombre: "Evento 3", fecha: "2026-07-25", descripcion: "Descripción del Evento 3", estado: "pendiente" },
];

// Importación de la función 'format' desde 'date-fns' para formatear las fechas
import { format } from "date-fns"; 

export default function EventManagement() {
  const [search, setSearch] = useState(""); // Filtro por nombre de evento
  const [estadoFilter, setEstadoFilter] = useState(""); // Filtro por estado
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de edición o creación de evento
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado para editar o eliminar
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Modal de confirmación de eliminación
  const [newEvent, setNewEvent] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    estado: "pendiente",
  });

  // Filtrar eventos
  const filteredEvents = eventos.filter((event) =>
    event.nombre.toLowerCase().includes(search.toLowerCase()) &&
    (estadoFilter ? event.estado === estadoFilter : true)
  );

  // Abrir modal de creación de evento
  const openAddModal = () => {
    setNewEvent({ nombre: "", descripcion: "", fecha: "", estado: "pendiente" });
    setIsModalOpen(true);
  };

  // Abrir modal de edición de evento
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Confirmar eliminación
  const openDeleteConfirm = (event) => {
    setSelectedEvent(event);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    // Eliminar evento de la lista
    console.log("Evento eliminado:", selectedEvent);
    setIsDeleteConfirmOpen(false);
    // Actualiza la lista de eventos después de eliminar
  };

  const handleEdit = () => {
    // Actualizar el evento con los nuevos datos
    console.log("Evento editado:", newEvent);
    setIsModalOpen(false);
    // Actualiza el evento en la lista
  };

  const handleAddEvent = () => {
    // Agregar nuevo evento
    console.log("Nuevo evento agregado:", newEvent);
    setIsModalOpen(false);
    // Agregar el nuevo evento a la lista
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
      <h1 className="text-lg font-bold mb-4 text-gray-700 text-center">Gestión de Eventos</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center mb-5 space-x-4">
        <input
          type="text"
          placeholder="Buscar Evento"
          className="w-full px-3 py-2 border-gray-300 rounded-lg text-sm outline-none focus:ring-0 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
        </select>

        {/* Botón para agregar evento */}
        <button
          onClick={openAddModal}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
        >
          <PlusCircle size={16} />
          Agregar Evento
        </button>
      </div>

      {/* Sección de Eventos */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Eventos</h3>
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-blue-100 p-4 rounded-md shadow-sm">
              <h4 className="font-semibold text-gray-700">{event.nombre}</h4>
              <p className="text-sm text-gray-600">{format(new Date(event.fecha), "dd MMM yyyy")}</p>
              <p className="text-sm text-gray-700">{event.descripcion}</p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => openEditModal(event)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  onClick={() => openDeleteConfirm(event)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de edición o agregar evento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedEvent ? "Editar Evento" : "Agregar Evento"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Nombre del Evento</label>
                <input
                  type="text"
                  value={newEvent.nombre}
                  onChange={(e) => setNewEvent({ ...newEvent, nombre: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Descripción</label>
                <input
                  type="text"
                  value={newEvent.descripcion}
                  onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Fecha</label>
                <input
                  type="date"
                  value={newEvent.fecha}
                  onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Estado</label>
                <select
                  value={newEvent.estado}
                  onChange={(e) => setNewEvent({ ...newEvent, estado: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="aprobado">Aprobado</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Cancelar</button>
                <button
                  onClick={selectedEvent ? handleEdit : handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  {selectedEvent ? "Guardar Cambios" : "Agregar Evento"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteConfirmOpen && selectedEvent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">¿Estás seguro de eliminar este evento?</h3>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={closeDeleteConfirm} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Cancelar</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
