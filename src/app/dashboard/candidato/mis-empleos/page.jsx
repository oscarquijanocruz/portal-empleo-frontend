"use client";
import JobCard from "../../../components/dashboard/JobCard";
import JobDetail from "../../../components/dashboard/JobDetail";
import { useState } from "react";
import { useJobs } from "../../../hooks/useJobs";
import { useFavorites } from "../../../hooks/useFavorites";
import { mockJobs } from "../../../data/mockData";

  
const userJobs = [
  // Estos podrían venir de una API o base de datos
  {
    id: 1,
    titulo: "Desarrollador Frontend Senior",
    empresa: "TechCorp",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    salario: "45,000",
    estado: "postulado", // postulado, en_revision, rechazado, aceptado
    fechaPostulacion: "2024-01-15"
  },
  {
    id: 2,
    titulo: "UX/UI Designer",
    empresa: "DesignStudio",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    salario: "35,000",
    estado: "en_revision",
    fechaPostulacion: "2024-01-12"
  },
  {
    id: 3,
    titulo: "Chef",
    empresa: "Pizzeria",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    salario: "35,000",
    estado: "aceptado",
    fechaPostulacion: "2024-01-12"
  },
  {
    id: 4,
    titulo: "UX/UI Designer",
    empresa: "DesignStudio",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    salario: "35,000",
    estado: "rechazado",
    fechaPostulacion: "2024-01-12"
  },
  // Agregar más trabajos aquí...
];

export default function MisEmpleosPage({ job }) {
  const [activeTab, setActiveTab] = useState("postulados");
  
  // ✅ Usar el hook de jobs con datos específicos del usuario
  const {
    selectedJob,
    handleJobSelect,
    filteredJobs,
    handleTabChange
  } = useJobs(userJobs);

  // ✅ Hook de favoritos
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Filtrar jobs según el tab activo
  const getJobsByTab = (tab) => {
    switch(tab) {
      case "favoritos":
        return userJobs.filter(job => job.estado === "favorito");
      case "postulados":
        return userJobs.filter(job => job.estado === "postulado");
      case "en_revision":
        return userJobs.filter(job => job.estado === "en_revision");
      case "rechazados":
        return userJobs.filter(job => job.estado === "rechazado");
      case "aceptados":
        return userJobs.filter(job => job.estado === "aceptado");
      default:
        return userJobs;
    }
  };

  const currentJobs = getJobsByTab(activeTab);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mis Empleos</h1>
        <p className="text-gray-600">Gestiona tus postulaciones y trabajos guardados</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {[
            { key: "favoritos", label: "Favoritos", count: getJobsByTab("favoritos").length },
            { key: "postulados", label: "Postulados", count: getJobsByTab("postulados").length },
            { key: "en_revision", label: "En Revisión", count: getJobsByTab("en_revision").length },
            { key: "aceptados", label: "Aceptados", count: getJobsByTab("aceptados").length },
            { key: "rechazados", label: "Rechazados", count: getJobsByTab("rechazados").length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Lista de trabajos */}
        <div className="space-y-4">
          {currentJobs.length > 0 ? (
            <JobCard 
              jobs={currentJobs}
              selectedJob={selectedJob}
              onJobSelect={handleJobSelect}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No tienes empleos en esta categoría</p>
              <p className="text-sm mt-2">
                {activeTab === "postulados" 
                  ? "Busca empleos y postulate para verlos aquí"
                  : `No hay empleos ${activeTab.replace("_", " ")}`
                }
              </p>
            </div>
          )}
        </div>
        
        {/* Panel de detalles */}
        <div className="p-4 space-y-4">
          {selectedJob ? (
            <div>
              {/* Estado de la postulación */}
              <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado de postulación:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedJob.estado === "postulado" 
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedJob.estado === "en_revision"
                      ? "bg-blue-100 text-blue-800" 
                      : selectedJob.estado === "aceptado"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {selectedJob.estado.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                {selectedJob.fechaPostulacion && (
                  <p className="text-sm text-gray-500 mt-1">
                    Postulado el {new Date(selectedJob.fechaPostulacion).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              {/* Detalles del trabajo */}
              <JobDetail 
                job={selectedJob}
                isFavorite={isFavorite(selectedJob?.id)}
                onToggleFavorite={() => toggleFavorite(selectedJob?.id)}
              />
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Selecciona un empleo para ver los detalles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}