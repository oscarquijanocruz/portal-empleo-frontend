"use client";
import SearchFilters from "../buscar-empleos/search-filters";
import JobCard from "../../../components/dashboard/JobCard";
import JobDetail from "../../../components/dashboard/JobDetail";
import { mockJobs } from "../../../data/mockData";
import { useFavorites } from "../../../hooks/useFavorites";
import { useExplorer }  from "../../../hooks/useExplorer";
import { useJobs } from "../../../hooks/useJobs";

export default function BuscarEmpleoPage() {
  // ✅ Hook de trabajos con toda la lógica centralizada
  const {
    selectedJob,
    searchTerm,
    activeTab,
    sortOrder,
    filters,
    filteredJobs,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleJobSelect,
    handleSortChange,
    handleTabChange
  } = useJobs(mockJobs);

  //  Hook de favoritos (mantiene su lógica separada)
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  //  Hook de explorar trabajos (mantiene su lógica separada)
  const { explorer } =  useExplorer(); // Hacer algoritmo

  return (
    <div className="h-full flex flex-col">
      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de trabajos */}
        <div className="space-y-4 p-2">
          {/* Bar busqueda y filtros */}
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
          {/* Tabs y controles */}
          <div className="flex items-center justify-between mt-4 mb-4">
            <div className="flex space-x-6">
              <button
                onClick={() => handleTabChange("para-ti")}
                className={`font-medium pb-2 transition-colors ${
                  activeTab === "para-ti"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Para ti ({filteredJobs.length})
              </button>

              {/* Tab de Explorar */}
              <button
                onClick={() => handleTabChange("explorar")}
                className={`font-medium pb-2 transition-colors ${
                  activeTab === "explorar"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Explorar ({filteredJobs.length})
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
              {filteredJobs.length > 0 ? (
                <JobCard 
                  jobs={filteredJobs}
                  selectedJob={selectedJob}
                  onJobSelect={handleJobSelect}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay trabajos por el momento</p>
                  <p className="text-sm mt-2">Aqui encontraras trabajos nuevos...</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Panel de detalles */}
        <div className="p-1 space-y-4">
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