"use client";
import SearchFilters from "../buscar-empleos/search-filters";
import JobCard from "../../../components/dashboard-candidato/JobCard";
import JobDetail from "../../../components/dashboard-candidato/JobDetail";
import { mockJobs } from "../../../data/mockData";
import { useFavorites } from "../../../hooks/useFavorites";
// import { useJobsForMe }  from "@/app/hooks/useJobsForMe";
import { useJobs } from "../../../hooks/useJobs";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Tabs, { Tab, TabList, TabContent } from "../../../components/ui/Tab";
import Select from "@/app/components/ui/Select";

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
  const searchParams = useSearchParams();
  const currentPage = (searchParams.get("page") || 1);
  
  //  Hook de favoritos (mantiene su lógica separada)
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Opciones de filtro
  const sortOptions = [
    { label: "Más recientes", value: "recientes" },
    { label: "Mejor pagados", value: "mejor-pagados" },
    { label: "Más relevantes", value: "mas-relevantes" },
  ];

  // Hook de trabajos para ti (mantiene su lógica separada)
  //const { jobsForMe } =  useJobsForMe(); // Hacer algoritmo

  return (
    <div className="h-full flex flex-col">
      {/* Resultados */}
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de trabajos */}
        <div className="bg-gray-100 space-y-4 p-3">
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
            <Tabs
              defaultValue="para-ti"
              onValueChange={handleTabChange}
              variant="underline"
              className="flex-1"
            >
              <TabList>
                <Tab value="para-ti">Para ti ({filteredJobs.length})</Tab>
                <Tab value="explorar">Explorar ({filteredJobs.length})</Tab>
              </TabList>
            </Tabs>

            {/* Selector de ordenamiento */}
            <div className="ml-auto">
              <Select
                placeholder="Ordenar por: "
                options={sortOptions}
                value={sortOrder}
                onChange={handleSortChange}
                className="bg-white text-sky-950 px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Lista de trabajos con Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            variant="underline"
          >
            <TabContent value="para-ti">
              {filteredJobs.length > 0 ? (
                <JobCard
                  jobs={filteredJobs}
                  selectedJob={selectedJob}
                  onJobSelect={handleJobSelect}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No se encontraron trabajos</p>
                  {searchTerm && (
                    <p className="text-sm mt-2">
                      con el término "{searchTerm}"
                    </p>
                  )}
                </div>
              )}
            </TabContent>

            <TabContent value="explorar">
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
                  <p className="text-sm mt-2">
                    Aquí encontrarás trabajos nuevos...
                  </p>
                </div>
              )}
            </TabContent>
          </Tabs>
        </div>

        {/* Panel de detalles */}
        <div className="p-4 relative">
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