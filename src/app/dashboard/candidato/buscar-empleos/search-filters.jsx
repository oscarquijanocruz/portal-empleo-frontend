// Filtros mejorados - VERSION CORREGIDA
'use client'
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchFilters({ 
  onSearch, 
  onFilterChange, 
  clearFilters,
  searchTerm = '',
  filters = {}
}) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localFilters, setLocalFilters] = useState({
    modalidad: filters.modalidad || '',
    sueldo: filters.sueldo || '',
    tipoContrato: filters.tipoContrato || '',
    categoria: filters.categoria || ''
  });

  // Sincronizar con props cuando cambien
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setLocalFilters({
      modalidad: filters.modalidad || '',
      sueldo: filters.sueldo || '',
      tipoContrato: filters.tipoContrato || '',
      categoria: filters.categoria || ''
    });
  }, [filters]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setLocalSearchTerm('');
    setLocalFilters({
      modalidad: '',
      sueldo: '',
      tipoContrato: '',
      categoria: ''
    });
    clearFilters?.();
  };

  const hasActiveFilters = localSearchTerm || Object.values(localFilters).some(f => f);

  return (
    <div className="p-4 bg-gray-50 shadow-md rounded-md mb-4">
      {/* Barra de búsqueda */}
      <div className="flex items-center bg-white border rounded-md px-4 py-3 mb-4">
        <Search size={22} className="text-gray-400" />
        <input
          type="text"
          placeholder="Busca tu trabajo ideal..."
          className="flex-1 outline-none bg-transparent px-2"
          value={localSearchTerm}
          onChange={handleSearchChange}
        />
        {localSearchTerm && (
          <button 
            onClick={() => {
              setLocalSearchTerm('');
              onSearch?.('');
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <select 
          value={localFilters.modalidad}
          onChange={(e) => handleFilterChange('modalidad', e.target.value)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <option value="">Modalidad</option>
          <option value="Remoto">Remoto</option>
          <option value="Híbrido">Híbrido</option>
          <option value="Presencial">Presencial</option>
        </select>
        
        <select 
          value={localFilters.sueldo}
          onChange={(e) => handleFilterChange('sueldo', e.target.value)}
          className="bg-blue-100 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
        >
          <option value="">Sueldo</option>
          <option value="15000">$15,000+</option>
          <option value="25000">$25,000+</option>
          <option value="35000">$35,000+</option>
          <option value="45000">$45,000+</option>
        </select>
        
        <select 
          value={localFilters.tipoContrato}
          onChange={(e) => handleFilterChange('tipoContrato', e.target.value)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <option value="">Tipo de contrato</option>
          <option value="Tiempo completo">Tiempo completo</option>
          <option value="Medio tiempo">Medio tiempo</option>
          <option value="Por proyecto">Por proyecto</option>
          <option value="Prácticas">Prácticas</option>
        </select>
        
        <select 
          value={localFilters.categoria}
          onChange={(e) => handleFilterChange('categoria', e.target.value)}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <option value="">Categoría</option>
          <option value="tecnologia">Tecnología</option>
          <option value="ventas">Ventas</option>
          <option value="marketing">Marketing</option>
          <option value="diseno">Diseño</option>
          <option value="administracion">Administración</option>
          <option value="recursos-humanos">Recursos Humanos</option>
          <option value="contabilidad">Contabilidad</option>
        </select>

        {/* Botón limpiar filtros */}
        {hasActiveFilters && (
          <div className="ml-auto">
            <button 
              onClick={handleClearFilters}
              className="text-blue-600 text-sm hover:underline flex items-center gap-1"
            >
              <X size={14} />
              Borrar filtros
            </button>
          </div>
        )}
      </div>
      
      {/* Mostrar filtros activos */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {localSearchTerm && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              "{localSearchTerm}"
            </span>
          )}
          {Object.entries(localFilters).map(([key, value]) => 
            value && (
              <span key={key} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {key}: {value}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}