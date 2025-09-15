// Filtros (Filtro 1, 2, 3, 4)
'use client'
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchFilters({ onSearch, onFilterChange, clearFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    modalidad: '',
    sueldo: '',
    tipoContrato: '',
    categoria: ''
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterClick = (filterType) => {
    // Aquí puedes abrir modales o dropdowns para cada filtro
    console.log(`Filtro clickeado: ${filterType}`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      modalidad: '',
      sueldo: '',
      tipoContrato: '',
      categoria: ''
    });
    clearFilters?.();
  };

  return (
    <div className="p-4 bg-gray-50 shadow-md rounded-md mb-4">
      {/* Barra de búsqueda */}
      <div className="flex items-center bg-white border rounded-md px-4 py-3 mb-4">
        <Search size={22} />
        <input
          type="text"
          placeholder="Busca tu trabajo ideal..."
          className="flex-1 outline-none bg-transparent px-2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button 
            onClick={handleClearFilters}
            className="text-gray-500 text-sm hover:underline flex items-center gap-1"
          >
            <X size={22} />
          </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <select 
          onClick={() => handleFilterClick('modalidad')}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
          <option>Modalidad</option>
          <option>Remoto</option>
          <option>Hibrido</option>
          <option>Presencial</option>
        </select>
        <select 
          onClick={() => handleFilterClick('sueldo')}
          name= 'sueldo'
          id='sueldo'
          className="bg-blue-100 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors">
          <option id='sueldo'>Sueldo</option>
          <option>$1000</option>
          <option>$5000</option>
          <option>$10,000</option>
        </select>
        <select 
          onClick={() => handleFilterClick('tipoContrato')}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          <option>Tipo de contrato</option>
          <option>Tiempo completo</option>
          <option>Indeterminado</option>
          <option>Por temporada</option>
          <option>Practicantes</option>
        </select>
        <select 
          onClick={() => handleFilterClick('categoria')}
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors border p-2 rounded w-32"
          name="categorias" 
          id="categorias"
        >
          <option value=" ">Categoría</option>
          <option value="ventas">Ventas</option>
          <option value="tecnologias-de-la-informacion-sistemas">Tecnologías de la Información - Sistemas</option>
          <option value="contabilidad-finanzas">Contabilidad - Finanzas</option>
          <option value="administrativo">Administrativo</option>
          <option value="logistica-transporte-distribucion-almacen">Logística - Transporte - Distribución - Almacén</option>
          <option value="manufactura-produccion-operacion">Manufactura - Producción - Operación</option>
          <option value="ingenieria">Ingeniería</option>
          <option value="recursos-humanos">Recursos humanos</option>
          <option value="atencion-a-clientes-call-center">Atención a clientes - Call Center</option>
          <option value="sector-salud">Sector salud</option>
          <option value="construccion-inmobiliaria-arquitectura">Construcción - Inmobiliaria - Arquitectura</option>
          <option value="mercadotecnia-publicidad-relaciones-publicas">Mercadotecnia - Publicidad - Relaciones Públicas</option>
          <option value="seguros-y-reaseguros">Seguros y reaseguros</option>
          <option value="servicios-generales-oficios-seguridad">Servicios generales - Oficios - Seguridad</option>
          <option value="turismo-hospitalidad-gastronomia">Turismo - Hospitalidad - Gastronomía</option>
          <option value="derecho-y-leyes">Derecho y leyes</option>
          <option value="arte-y-diseno">Arte y diseño</option>
          <option value="educacion">Educación</option>
          <option value="comunicacion-y-creatividad">Comunicación y creatividad</option>
          <option value="veterinaria-agricultura">Veterinaria - Agricultura</option>
          <option value="mineria-energia-recursos-naturales">Minería - Energía - Recursos Naturales</option>
          <option value="ciencias-sociales-humanidades">Ciencias sociales - Humanidades</option>
          <option value="deportes-salud-belleza">Deportes - Salud - Belleza</option>
        </select>

        {/* Empuja este link a la derecha */}
        <div className="ml-auto">
          <button 
            onClick={handleClearFilters}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
          >
            <X size={14} />
            Borrar filtros
          </button>
        </div>
      </div>
      
       {/* Mostrar filtros activos */}
      {(searchTerm || Object.values(filters).some(f => f)) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              "{searchTerm}"
            </span>
          )}
          {Object.entries(filters).map(([key, value]) => 
            value && (
              <span key={key} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {key}: {value}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}


