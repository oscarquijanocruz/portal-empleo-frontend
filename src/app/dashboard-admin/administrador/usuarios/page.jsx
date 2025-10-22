"use client";

import { useState } from "react";
import { Pencil, Trash, UserCheck, UserX, Calendar, PlusCircle } from "lucide-react"; // Agregar íconos para los filtros y acciones

// Datos simulados de usuarios
const usuarios = [
  { id: 1, nombre: "Juan Pérez", tipo: "Admin", estado: "Activo", fecha: "2025-01-15", ubicacion: "Ciudad de México" },
  { id: 2, nombre: "Ana García", tipo: "Empleado", estado: "Inactivo", fecha: "2025-03-12", ubicacion: "Guadalajara" },
  { id: 3, nombre: "Carlos López", tipo: "Admin", estado: "Activo", fecha: "2025-06-23", ubicacion: "Monterrey" },
  { id: 4, nombre: "Lucía Martínez", tipo: "Empleado", estado: "Activo", fecha: "2025-07-18", ubicacion: "Cancún" },
  { id: 5, nombre: "José Gómez", tipo: "Empleado", estado: "Inactivo", fecha: "2025-09-10", ubicacion: "Tijuana" },
];

export default function UserManagement() {
  // Estados de búsqueda y filtros
  const [search, setSearch] = useState(""); // Filtro por nombre
  const [estadoFilter, setEstadoFilter] = useState(""); // Filtro por estado
  const [tipoFilter, setTipoFilter] = useState(""); // Filtro por tipo
  const [fechaFilter, setFechaFilter] = useState(""); // Filtro por fecha
  const [ubicacionFilter, setUbicacionFilter] = useState(""); // Filtro por ubicación

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal para agregar o editar usuario
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Modal para confirmar eliminación
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para editar o eliminar

  const [newUser, setNewUser] = useState({
    nombre: "",
    tipo: "",
    estado: "",
    fecha: "",
    ubicacion: "",
  });

  // Filtrar usuarios en base a los filtros
  const filteredUsers = usuarios.filter((user) => {
    return (
      user.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (estadoFilter ? user.estado === estadoFilter : true) &&
      (tipoFilter ? user.tipo === tipoFilter : true) &&
      (fechaFilter ? user.fecha === fechaFilter : true) &&
      (ubicacionFilter ? user.ubicacion === ubicacionFilter : true)
    );
  });

  // Abrir modal de agregar usuario
  const openAddUserModal = () => {
    setIsModalOpen(true);
    setNewUser({ nombre: "", tipo: "", estado: "", fecha: "", ubicacion: "" });
  };

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
    setIsDeleteConfirmOpen(false);
    // Actualizar usuarios (esto es solo un ejemplo de lógica de eliminación)
  };

  // Editar usuario
  const handleEdit = () => {
    // Actualizar el usuario con los nuevos datos
    console.log("Usuario editado:", selectedUser);
    setIsModalOpen(false);
    // Lógica para actualizar el usuario
  };

  // Agregar nuevo usuario
  const handleAddUser = () => {
    // Lógica para agregar nuevo usuario
    console.log("Nuevo usuario agregado:", newUser);
    setIsModalOpen(false);
  };

  // Restablecer filtros
  const resetFilters = () => {
    setSearch("");
    setEstadoFilter("");
    setTipoFilter("");
    setFechaFilter("");
    setUbicacionFilter("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
      <h1 className="text-lg font-bold mb-4 text-gray-700 text-center">Gestión de Usuarios</h1>

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
            <p className="text-3xl font-bold text-green-700 text-center">{usuarios.filter(v => v.estado === "Activo").length}</p>
          </div>
        </div>

        {/* Usuarios Inactivos */}
        <div className="bg-gradient-to-r from-red-100 to-red-200 p-6 rounded-xl shadow-md flex items-center">
          <div className="mr-4">
            <UserX size={30} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Usuarios Inactivos</h3>
            <p className="text-3xl font-bold text-red-700 text-center">{usuarios.filter(v => v.estado === "Inactivo").length}</p>
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
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <select
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Tipo</option>
          <option value="Admin">Admin</option>
          <option value="Empleado">Empleado</option>
        </select>

        <select
          value={fechaFilter}
          onChange={(e) => setFechaFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">Filtro por Fecha</option>
          <option value="2025-01-15">15 Enero 2025</option>
          <option value="2025-03-12">12 Marzo 2025</option>
          <option value="2025-06-23">23 Junio 2025</option>
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

        {/* Botón para restablecer filtros */}
        <button
          onClick={resetFilters}
          className="px-3 py-2 bg-gray-300 text-sm rounded-lg"
        >
          Restablecer Filtros
        </button>
      </div>

      {/* Tabla de usuarios */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Tipo</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Fecha</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar usuarios filtrados */}
          {filteredUsers.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="p-2 text-sm text-gray-700">{usuario.nombre}</td>
              <td className="p-2 text-sm text-gray-700">{usuario.tipo}</td>
              <td className="p-2 text-sm text-gray-700">{usuario.estado}</td>
              <td className="p-2 text-sm text-gray-700">{usuario.fecha}</td>
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
                <label className="block text-sm text-gray-600">Tipo</label>
                <input
                  type="text"
                  value={selectedUser.tipo}
                  onChange={(e) => setSelectedUser({ ...selectedUser, tipo: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Estado</label>
                <input
                  type="text"
                  value={selectedUser.estado}
                  onChange={(e) => setSelectedUser({ ...selectedUser, estado: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Fecha</label>
                <input
                  type="text"
                  value={selectedUser.fecha}
                  onChange={(e) => setSelectedUser({ ...selectedUser, fecha: e.target.value })}
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
