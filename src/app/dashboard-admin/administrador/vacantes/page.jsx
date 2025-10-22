"use client";

import { useState } from "react";
import { Pencil, Trash, CheckCircle, XCircle, PlusCircle } from "lucide-react"; // Iconos para acciones

// Datos simulados de vacantes
const vacantes = [
  { id: 1, titulo: "Desarrollador", descripcion: "Desarrollador Frontend", estado: "activa", fecha: "2025-09-01" },
  { id: 2, titulo: "Diseñador", descripcion: "Diseñador UI/UX", estado: "cerrada", fecha: "2025-08-15" },
  { id: 3, titulo: "Backend", descripcion: "Desarrollador Backend", estado: "activa", fecha: "2025-09-10" },
  { id: 4, titulo: "Project Manager", descripcion: "Gestión de Proyectos", estado: "activa", fecha: "2025-09-20" },
];

export default function Vacancies() {
  const [search, setSearch] = useState(""); // Filtro por nombre
  const [estadoFilter, setEstadoFilter] = useState(""); // Filtro por estado
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de creación o edición
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Modal de confirmación de eliminación
  const [selectedVacancy, setSelectedVacancy] = useState(null); // Vacante seleccionada para editar o eliminar
  const [newVacancy, setNewVacancy] = useState({
    titulo: "",
    descripcion: "",
    estado: "activa",
    fecha: "",
  });

  // Filtrar vacantes por búsqueda y estado
  const filteredVacancies = vacantes.filter((vacante) =>
    vacante.titulo.toLowerCase().includes(search.toLowerCase()) &&
    (estadoFilter ? vacante.estado === estadoFilter : true)
  );

  // Abrir modal de creación de vacante
  const openAddModal = () => {
    setNewVacancy({ titulo: "", descripcion: "", estado: "activa", fecha: "" });
    setIsModalOpen(true);
  };

  // Abrir modal de edición de vacante
  const openEditModal = (vacante) => {
    setSelectedVacancy(vacante);
    setNewVacancy(vacante);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVacancy(null);
  };

  // Confirmar eliminación
  const openDeleteConfirm = (vacante) => {
    setSelectedVacancy(vacante);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedVacancy(null);
  };

  const handleDelete = () => {
    // Lógica para eliminar la vacante
    console.log("Vacante eliminada:", selectedVacancy);
    setIsDeleteConfirmOpen(false);
    // Actualiza la lista de vacantes después de eliminar
  };

  const handleEdit = () => {
    // Lógica para editar la vacante
    console.log("Vacante editada:", newVacancy);
    setIsModalOpen(false);
    // Actualiza la vacante en la lista
  };

  const handleAddVacancy = () => {
    // Lógica para agregar una nueva vacante
    console.log("Nueva vacante agregada:", newVacancy);
    setIsModalOpen(false);
    // Agrega la nueva vacante a la lista
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-lg font-bold mb-4 text-gray-700 text-center">Gestión de Vacantes</h1>

      {/* Barra de métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-md flex items-center">
          <CheckCircle size={30} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total de Vacantes</h3>
            <p className="text-2xl font-bold text-blue-700">{vacantes.length}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-md flex items-center">
          <CheckCircle size={30} className="text-green-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Vacantes Activas</h3>
            <p className="text-2xl font-bold text-green-700">
              {vacantes.filter((v) => v.estado === "activa").length}
            </p>
          </div>
        </div>
        <div className="bg-red-100 p-4 rounded-md flex items-center">
          <XCircle size={30} className="text-red-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Vacantes Cerradas</h3>
            <p className="text-2xl font-bold text-red-700">
              {vacantes.filter((v) => v.estado === "cerrada").length}
            </p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center mb-5 space-x-4">
        <input
          type="text"
          placeholder="Buscar vacante..."
          className="w-full px-3 py-2 border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Estado</option>
          <option value="activa">Activa</option>
          <option value="cerrada">Cerrada</option>
        </select>

        <button
          onClick={openAddModal}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
        >
          <PlusCircle size={16} />
          Agregar Vacante
        </button>
      </div>

      {/* Tabla de Vacantes */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Título</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Descripción</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Fecha de Publicación</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredVacancies.map((vacante) => (
            <tr key={vacante.id} className="hover:bg-gray-50">
              <td className="p-2 text-sm text-gray-700">{vacante.titulo}</td>
              <td className="p-2 text-sm text-gray-700">{vacante.descripcion}</td>
              <td className="p-2 text-sm text-gray-700">{vacante.estado}</td>
              <td className="p-2 text-sm text-gray-700">{vacante.fecha}</td>
              <td className="p-2 text-sm">
                <button
                  onClick={() => openEditModal(vacante)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <Pencil size={16} />
                  Editar
                </button>
                <button
                  onClick={() => openDeleteConfirm(vacante)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash size={16} />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de creación y edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedVacancy ? "Editar Vacante" : "Agregar Vacante"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Título</label>
                <input
                  type="text"
                  value={newVacancy.titulo}
                  onChange={(e) => setNewVacancy({ ...newVacancy, titulo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Descripción</label>
                <input
                  type="text"
                  value={newVacancy.descripcion}
                  onChange={(e) => setNewVacancy({ ...newVacancy, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Estado</label>
                <select
                  value={newVacancy.estado}
                  onChange={(e) => setNewVacancy({ ...newVacancy, estado: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="activa">Activa</option>
                  <option value="cerrada">Cerrada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Fecha de Publicación</label>
                <input
                  type="date"
                  value={newVacancy.fecha}
                  onChange={(e) => setNewVacancy({ ...newVacancy, fecha: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Cancelar</button>
                <button
                  onClick={selectedVacancy ? handleEdit : handleAddVacancy}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  {selectedVacancy ? "Guardar Cambios" : "Agregar Vacante"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteConfirmOpen && selectedVacancy && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">¿Estás seguro de eliminar esta vacante?</h3>
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
