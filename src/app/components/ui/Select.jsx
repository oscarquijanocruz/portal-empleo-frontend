import { Filter } from "lucide-react";

// Botón "Filtros"
export default function Select({ options, onChange, value }) {
  return (
    <div className="flex">
      <select
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option> Filtrar</option>
          <option>Más recientes</option>
          <option>Mejor pagados</option>
          <option>Más relevantes</option>
      </select>
    </div>
    );
}