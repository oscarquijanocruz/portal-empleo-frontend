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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function BuscarEmpleoPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPageParam = parseInt(searchParams.get("page") || "1", 10);

  // ✅ Hook de trabajos con toda la lógica centralizada
  const {
    selectedJob,
    searchTerm,
    activeTab,
    sortOrder,
    filters,
    filteredJobs,
    paginatedJobs,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleJobSelect,
    handleSortChange,
    handleTabChange,
    handlePageChange
  } = useJobs(mockJobs, currentPageParam);
  
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

  // Sincronizar página actual con la URL (siempre visible)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const previous = params.get("page");
    const next = currentPage.toString();
    if (previous === next) return;
    params.set("page", next);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [currentPage, pathname, router, searchParams]);

  // Función para cambiar de página
  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
      // Scroll al inicio de la lista
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generar números de página para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

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
                <>
                  <JobCard
                    jobs={paginatedJobs}
                    selectedJob={selectedJob}
                    onJobSelect={handleJobSelect}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                  {/* Controles de paginación */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-300">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                        aria-label="Página anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((pageNum, index) => (
                          <span key={index}>
                            {pageNum === "..." ? (
                              <span className="px-2 text-gray-500">...</span>
                            ) : (
                              <button
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-2 rounded-lg transition-colors ${
                                  currentPage === pageNum
                                    ? "bg-sky-600 text-white font-semibold"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                }`}
                                aria-label={`Ir a página ${pageNum}`}
                                aria-current={currentPage === pageNum ? "page" : undefined}
                              >
                                {pageNum}
                              </button>
                            )}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                        aria-label="Página siguiente"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Mostrando {paginatedJobs.length} de {filteredJobs.length} trabajos
                  </div>
                </>
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
                <>
                  <JobCard
                    jobs={paginatedJobs}
                    selectedJob={selectedJob}
                    onJobSelect={handleJobSelect}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                  {/* Controles de paginación */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-300">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                        aria-label="Página anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((pageNum, index) => (
                          <span key={index}>
                            {pageNum === "..." ? (
                              <span className="px-2 text-gray-500">...</span>
                            ) : (
                              <button
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-2 rounded-lg transition-colors ${
                                  currentPage === pageNum
                                    ? "bg-sky-600 text-white font-semibold"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                }`}
                                aria-label={`Ir a página ${pageNum}`}
                                aria-current={currentPage === pageNum ? "page" : undefined}
                              >
                                {pageNum}
                              </button>
                            )}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                        }`}
                        aria-label="Página siguiente"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Mostrando {paginatedJobs.length} de {filteredJobs.length} trabajos
                  </div>
                </>
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