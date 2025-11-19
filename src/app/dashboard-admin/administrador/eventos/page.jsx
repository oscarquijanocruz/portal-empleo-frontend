"use client";
import { useState } from "react";
import { Pencil, Trash, PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

// Datos simulados de eventos
const eventos = [
  { id: 1, nombre: "Evento 1", fecha: "2026-07-15", descripcion: "Descripción del Evento 1", estado: "pendiente" },
  { id: 2, nombre: "Evento 2", fecha: "2026-07-20", descripcion: "Descripción del Evento 2", estado: "aprobado" },
  { id: 3, nombre: "Evento 3", fecha: "2026-07-25", descripcion: "Descripción del Evento 3", estado: "pendiente" },
];

export default function EventManagement() {
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    estado: "pendiente",
  });

  const filteredEvents = eventos
    .filter((e) => e.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (estadoFilter ? e.estado === estadoFilter : true))
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Orden cronológico

  const openAddModal = () => {
    setNewEvent({ nombre: "", descripcion: "", fecha: "", estado: "pendiente" });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const openDeleteConfirm = (event) => {
    setSelectedEvent(event);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    console.log("Evento eliminado:", selectedEvent);
    setIsDeleteConfirmOpen(false);
  };

  const handleEdit = () => {
    console.log("Evento editado:", newEvent);
    setIsModalOpen(false);
  };

  const handleAddEvent = () => {
    console.log("Nuevo evento agregado:", newEvent);
    setIsModalOpen(false);
  };

  const estadoColor = {
    pendiente: "bg-yellow-100 text-yellow-800",
    aprobado: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
      <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">Gestión de Eventos</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Buscar Evento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-0 focus:border-blue-400"
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
        <button
          onClick={openAddModal}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
        >
          <PlusCircle size={16} />
          Agregar Evento
        </button>
      </div>

      {/* Timeline de eventos */}
      <div className="relative border-l-2 border-gray-300 ml-4 pl-6">
        {filteredEvents.map((event, idx) => (
          <div key={event.id} className="mb-8 relative">
            <span
              className={`absolute -left-4 top-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 ${estadoColor[event.estado]}`}
            >
              {event.estado === "aprobado" ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </span>
            <div className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">{event.nombre}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${estadoColor[event.estado]}`}>
                  {event.estado}
                </span>
              </div>
              <p className="text-sm text-gray-500">{format(new Date(event.fecha), "dd MMM yyyy")}</p>
              <p className="text-sm text-gray-700 mt-1">{event.descripcion}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => openEditModal(event)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 text-sm"
                >
                  <Pencil size={14} /> Editar
                </button>
                <button
                  onClick={() => openDeleteConfirm(event)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 text-sm"
                >
                  <Trash size={14} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modales de agregar/editar y eliminar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedEvent ? "Editar Evento" : "Agregar Evento"}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del Evento"
                value={newEvent.nombre}
                onChange={(e) => setNewEvent({ ...newEvent, nombre: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={newEvent.descripcion}
                onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="date"
                value={newEvent.fecha}
                onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <select
                value={newEvent.estado}
                onChange={(e) => setNewEvent({ ...newEvent, estado: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
              </select>
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
