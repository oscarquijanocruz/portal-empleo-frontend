"use client";

import { useState } from "react";

// Simulación de datos de vacantes
const vacantes = [
  { id: 1, titulo: "Desarrollador", descripcion: "Desarrollador Frontend", estado: "activa", fecha: "2025-09-01" },
  { id: 2, titulo: "Diseñador", descripcion: "Diseñador UI/UX", estado: "cerrada", fecha: "2025-08-15" },
  { id: 3, titulo: "Backend", descripcion: "Desarrollador Backend", estado: "activa", fecha: "2025-09-10" },
  { id: 4, titulo: "Project Manajer", descripcion: "Project Manager", estado: "activa", fecha: "2025-09-20" },
];

export default function Vacancies() {
  const [search, setSearch] = useState(""); // Estado para la búsqueda

  // Filtrar vacantes por título
  const filteredVacancies = vacantes.filter(vacante =>
    vacante.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Barra de métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">Total de Vacantes</h3>
          <p className="text-2xl font-bold text-blue-600">{vacantes.length}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">Vacantes Activas</h3>
          <p className="text-2xl font-bold text-green-600">{vacantes.filter(v => v.estado === "activa").length}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-700">Vacantes Cerradas</h3>
          <p className="text-2xl font-bold text-red-600">{vacantes.filter(v => v.estado === "cerrada").length}</p>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar vacante..."
          className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla de vacantes */}
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
                <button className="text-blue-600 hover:text-blue-800 mr-2">Editar</button>
                <button className="text-red-600 hover:text-red-800">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
