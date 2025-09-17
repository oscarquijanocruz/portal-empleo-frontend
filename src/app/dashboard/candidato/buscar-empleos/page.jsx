"use client";
import SearchFilters from "../buscar-empleos/search-filters";
import Select from "../../../components/ui/Select";
import JobCard from "../../../components/dashboard/JobCard";
import { useState, useMemo } from "react";
import { mockJobs } from "../../../data/mockData";
import JobDetail from "../../../components/dashboard/JobDetail";
import { Bookmark, Info } from "lucide-react";

export default function BuscarEmpleoPage() {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("para-ti");
  const [sortOrder, setSortOrder] = useState("recientes");
  const [isStarred, setIsStarred] = useState(false);

  const [showMasPagados, setShowMasPagados] = useState(false);

  // Filtrar trabajos basado en barra de búsqueda
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return mockJobs;

    return mockJobs.filter(
      (job) =>
        job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  // Filtrar trabajos por ordenamiento en relevantes, mejor pagados...
  const filteredJobsOrder = mockJobs.filter((job) => {
    if (showMasPagados) {
      // Filter for candidate messages
      const masPagados =
        job.salario ||
        message.preview.toLowerCase().includes("enviar") ||
        message.sender.position.toLowerCase().includes("desarrollador") ||
        message.sender.position.toLowerCase().includes("ingeniero") ||
        message.sender.position.toLowerCase().includes("freelancer");
      return masPagados;
    }
  });

  return (
    <div className="h-full flex flex-col">
      <div>
        {/* Barra de busqueda */}
        <SearchFilters
          onSearch={handleSearch}
          clearFilters={handleClearFilters}
        />
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de trabajos */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex space-x-6 mt-4s mb-4">
            <button
              onClick={() => setActiveTab("para-ti")}
              className={`font-medium pb-2 transition-colors ${
                activeTab === "para-ti"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Para ti
            </button>
            <button
              onClick={() => setActiveTab("populares")}
              className={`font-medium pb-2 transition-colors ${
                activeTab === "populares"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Populares
            </button>
            {/* Filltrar por ordenamiento */}
            <div className="ml-auto">
              <Select job={filteredJobsOrder} />
            </div>
          </div>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => handleJobSelect(job)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedJob.id === job.id
                    ? "border-blue-300 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Contenido de la card aquí - similar al JobCard actual */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {job.titulo}
                      </h3>
                      <p className="text-blue-600 text-md">{job.empresa}</p>
                      <div className="flex space-x-2">
                        <p className="text-gray-500 text-sm">
                          {job.ubicacion}, {job.modalidad}, {job.jornada}
                        </p>
                        <p className="text-md text-gray-900">
                          {" "}
                          Salario: ${job.salario}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                        onClick={() => setIsStarred(!isStarred)}
                        className={`p-2 rounded-full text-black-400 hover:text-gray-600 ${
                            isStarred ? 'text-yellow-500' : 'text-gray-400'
                        }`}>
                        <Bookmark size={22} fill={isStarred ? 'currentColor' : 'none'}  />
                      </button>
                    <button className="p-1 text-black-400 hover:text-gray-600">
                      <Info size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No se encontraron trabajos con "{searchTerm}"
            </div>
          )}
        </div>
        <div className="p-4 space-y-4">
          <JobDetail job={selectedJob} />
        </div>
      </div>
    </div>
  );
}
