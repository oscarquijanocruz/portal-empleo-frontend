"use client";

import { useState } from "react";
import { Pencil, Trash, UserCheck, UserX } from "lucide-react";

// Datos simulados de usuarios
const usuarios = [
  { id: 1, nombre: "Juan Pérez", edad: 30, ubicacion: "Ciudad de México", estado: "activo" },
  { id: 2, nombre: "Ana García", edad: 25, ubicacion: "Guadalajara", estado: "inactivo" },
  { id: 3, nombre: "Carlos López", edad: 35, ubicacion: "Monterrey", estado: "activo" },
  { id: 4, nombre: "Lucía Martínez", edad: 28, ubicacion: "Cancún", estado: "activo" },
  { id: 5, nombre: "José Gómez", edad: 40, ubicacion: "Tijuana", estado: "inactivo" },
];

export default function UserManagement() {
  // Estados de búsqueda y filtros
  const [search, setSearch] = useState("");
  const [edadFilter, setEdadFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [ubicacionFilter, setUbicacionFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Filtrar usuarios en base a los filtros
  const filteredUsers = usuarios.filter(user => {
    return (
      user.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (edadFilter ? user.edad >= parseInt(edadFilter.split("-")[0]) && user.edad <= parseInt(edadFilter.split("-")[1]) : true) &&
      (estadoFilter ? user.estado === estadoFilter : true) &&
      (ubicacionFilter ? user.ubicacion === ubicacionFilter : true)
    );
  });

  // Abrir modal de edición
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Confirmar eliminación
  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = () => {
    // Lógica para eliminar el usuario
    console.log("Usuario eliminado:", selectedUser);
    closeDeleteConfirm();
  };

  // Editar usuario (por ahora solo logueo los datos)
  const handleEdit = () => {
    console.log("Usuario editado:", selectedUser);
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
      <h1 className="text-lg font-bold mb-4 text-gray-700 text-center">Gestion de Users</h1>

      {/* Barra de métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total de Usuarios */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow-md flex items-center">
          <div className="mr-4">
            <UserCheck size={30} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total de Usuarios</h3>
            <p className="text-3xl font-bold text-blue-700 text-center">{usuarios.length}</p>
          </div>
        </div>

        {/* Usuarios Activos */}
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl shadow-md flex items-center">
          <div className="mr-4">
            <UserCheck size={30} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Usuarios Activos</h3>
            <p className="text-3xl font-bold text-green-700 text-center">{usuarios.filter(v => v.estado === "activo").length}</p>
          </div>
        </div>

        {/* Usuarios Inactivos */}
        <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-xl shadow-md flex items-center">
          <div className="mr-4">
            <UserX size={30} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Usuarios Inactivos</h3>
            <p className="text-3xl font-bold text-red-700 text-center">{usuarios.filter(v => v.estado === "inactivo").length}</p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex items-center mb-5 space-x-4">
        <input
          type="text"
          placeholder="Buscar Usuario"
          className="w-full px-3 py-2 border-gray-300 rounded-lg text-sm outline-none focus:ring-0 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtros */}
        <select
          value={edadFilter}
          onChange={(e) => setEdadFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Edad</option>
          <option value="18-25">18-25</option>
          <option value="26-40">26-40</option>
          <option value="41-60">41-60</option>
        </select>

        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <select
          value={ubicacionFilter}
          onChange={(e) => setUbicacionFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Ubicación</option>
          <option value="Ciudad de México">Ciudad de México</option>
          <option value="Guadalajara">Guadalajara</option>
          <option value="Monterrey">Monterrey</option>
          <option value="Cancún">Cancún</option>
          <option value="Tijuana">Tijuana</option>
        </select>
      </div>

      {/* Tabla de usuarios */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Edad</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Ubicación</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar usuarios filtrados */}
          {filteredUsers.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="p-2 text-sm text-gray-700">{usuario.nombre}</td>
              <td className="p-2 text-sm text-gray-700">{usuario.edad}</td>
              <td className="p-2 text-sm text-gray-700">{usuario.ubicacion}</td>
              <td className="p-2 text-sm text-gray-700">{usuario.estado}</td>
              <td className="p-2 text-sm">
                <button
                  onClick={() => openModal(usuario)}
                  className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2 text-center"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => openDeleteConfirm(usuario)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Editar Usuario</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Nombre</label>
                <input
                  type="text"
                  value={selectedUser.nombre}
                  onChange={(e) => setSelectedUser({ ...selectedUser, nombre: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Edad</label>
                <input
                  type="number"
                  value={selectedUser.edad}
                  onChange={(e) => setSelectedUser({ ...selectedUser, edad: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Ubicación</label>
                <input
                  type="text"
                  value={selectedUser.ubicacion}
                  onChange={(e) => setSelectedUser({ ...selectedUser, ubicacion: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Cancelar</button>
                <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteConfirmOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">¿Estás seguro de eliminar este usuario?</h3>
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
