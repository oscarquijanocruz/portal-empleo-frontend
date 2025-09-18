"use client";
import SearchFilters from "../buscar-empleos/search-filters";
import Select from "../../../components/ui/Select";
import JobCard from "../../../components/dashboard/JobCard";
import JobDetail from "../../../components/dashboard/JobDetail";
import { useState, useMemo } from "react";
import { mockJobs } from "../../../data/mockData";
import { useFavorites } from "../../../hooks/useFavorites";
import { Bookmark } from "lucide-react";

export default function BuscarEmpleoPage() {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("para-ti");
  const [sortOrder, setSortOrder] = useState("recientes");
  
  // ✅ Hook de favoritos
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // ✅ Filtros mejorados
  const [filters, setFilters] = useState({
    modalidad: '',
    sueldo: '',
    tipoContrato: '',
    categoria: ''
  });

  // Filtrar trabajos basado en búsqueda y filtros
  const filteredJobs = useMemo(() => {
    let jobs = [...mockJobs];

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      jobs = jobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros
    if (filters.modalidad) {
      jobs = jobs.filter(job => 
        job.modalidad.toLowerCase() === filters.modalidad.toLowerCase()
      );
    }

    if (filters.sueldo) {
      const salarioFiltro = parseInt(filters.sueldo.replace(/[,$]/g, ''));
      jobs = jobs.filter(job => {
        const salarioJob = parseInt(job.salario.replace(/[,$]/g, ''));
        return salarioJob >= salarioFiltro;
      });
    }

    if (filters.tipoContrato) {
      jobs = jobs.filter(job => 
        job.jornada.toLowerCase().includes(filters.tipoContrato.toLowerCase())
      );
    }

    // Ordenar trabajos
    switch (sortOrder) {
      case 'mejor-pagados':
        return jobs.sort((a, b) => {
          const salarioA = parseInt(a.salario.replace(/[,$]/g, ''));
          const salarioB = parseInt(b.salario.replace(/[,$]/g, '')); 
          return salarioB - salarioA; // de mayor a menor
        });
      case 'mas-relevantes':
        // Modificar para que sea relevantes
        return jobs;  
      case 'recientes':
        // Modificar para buscar el mas reciente (de momento solo lo invierte para posicionar el mas reciente)
        return [...jobs].reverse();
      default:
        return jobs;
    }

    return jobs;
  }, [searchTerm, filters, sortOrder]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      modalidad: '',
      sueldo: '',
      tipoContrato: '',
      categoria: ''
    });
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
  };

  return (
    <div className="h-full flex flex-col">
      <div>
        {/* Barra de búsqueda */}
        <SearchFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          clearFilters={handleClearFilters}
          searchTerm={searchTerm}
          filters={filters}
        />
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de trabajos */}
        <div className="space-y-4">
          {/* Tabs y controles */}
          <div className="flex items-center justify-between mt-4 mb-4">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab("para-ti")}
                className={`font-medium pb-2 transition-colors ${
                  activeTab === "para-ti"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Para ti ({filteredJobs.length})
              </button>
              <button
                onClick={() => setActiveTab("favoritos")}
                className={`font-medium pb-2 transition-colors ${
                  activeTab === "favoritos"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Favoritos ({favorites.size})
              </button>
            </div>
            
            {/* Selector de ordenamiento */}
            <div className="ml-auto">
              <select 
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="recientes">Más recientes</option>
                <option value="mejor-pagados">Mejor pagados</option>
                <option value="mas-relevantes">Más relevantes</option>
              </select>
            </div>
          </div>

          {/* Lista de trabajos */}
          {activeTab === "para-ti" ? (
            filteredJobs.length > 0 ? (
              <JobCard 
                jobs={filteredJobs}
                selectedJob={selectedJob}
                onJobSelect={handleJobSelect}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No se encontraron trabajos</p>
                {searchTerm && <p className="text-sm mt-2">con el término "{searchTerm}"</p>}
              </div>
            )
          ) : (
            // Tab de favoritos
            <div className="space-y-4">
              {favorites.size > 0 ? (
                <JobCard 
                  jobs={mockJobs.filter(job => favorites.has(job.id))}
                  selectedJob={selectedJob}
                  onJobSelect={handleJobSelect}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No tienes trabajos guardados</p>
                  <p className="text-sm mt-2">Guarda trabajos haciendo clic en el ícono 🎗</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Panel de detalles */}
        <div className="p-4 space-y-4">
          <JobDetail 
            job={selectedJob} 
            isFavorite={isFavorite(selectedJob?.id)}
            onToggleFavorite={() => toggleFavorite(selectedJob?.id)}
          />
        </div>
      </div>
    </div>
  );
}