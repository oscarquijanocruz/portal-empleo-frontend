// Filtros (Filtro 1, 2, 3, 4)
import { Search } from 'lucide-react';

export default function SearchFilters() {
  return (
    <div className="p-4 bg-gray-50 shadow-md rounded-md mb-4">
      {/* Barra de búsqueda */}
      <div className="flex items-center bg-white border rounded-md px-3 py-2 mb-4">
        <input
          type="text"
          placeholder="Busca tu trabajo ideal..."
          className="flex-1 outline-none bg-transparent"
        />
          <Search size={16} />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
          Modalidad
        </button>
        <button className="bg-blue-100 text-blue-900 px-4 py-2 rounded-md">
          Sueldo
        </button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
          Tipo de contrato
        </button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
          Categoría
        </button>

        {/* Empuja este link a la derecha */}
        <div className="ml-auto">
          <button className="text-blue-600 text-sm hover:underline">
            Borrar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
