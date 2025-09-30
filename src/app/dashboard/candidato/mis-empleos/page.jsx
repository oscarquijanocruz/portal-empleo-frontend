"use client";
import JobCard from "../../../components/dashboard-candidato/JobCard";
import JobDetail from "../../../components/dashboard-candidato/JobDetail";
import { useState } from "react";
import { useJobs } from "../../../hooks/useJobs";
import { useFavorites } from "../../../hooks/useFavorites";
import { mockJobs } from "../../../data/mockData";

export default function MisEmpleosPage() {
  const [activeTab, setActiveTab] = useState("favoritos");
  
  // DATOS SIMPLES - Solo para maquetado
  // En producción esto vendrá del backend
  const [misPostulaciones] = useState([
    {
      jobId: 1, // Se relaciona con mockJobs
      estado: "postulado", 
      fechaPostulacion: "2024-01-15"
    },
    {
      jobId: 2,
      estado: "en_revision",
      fechaPostulacion: "2024-01-12"
    },
    {
      jobId: 3,
      estado: "aceptado",
      fechaPostulacion: "2024-01-10"
    },
    {
      jobId: 4,
      estado: "postulado",
      fechaPostulacion: "2024-01-10"
    },
    {
      jobId: 5,
      estado: "rechazado",
      fechaPostulacion: "2024-01-08"
    }
  ]);

  const { selectedJob, handleJobSelect } = useJobs(mockJobs);
  const { favorites, toggleFavorite, isFavorite, getFavoriteJobs } = useFavorites();

  // FUNCIÓN SIMPLE - Combinar datos de mock con estados
  const getJobsWithStatus = (estado) => {
    const postulacionesConEstado = misPostulaciones.filter(p => p.estado === estado);
    
    return postulacionesConEstado.map(postulacion => {
      const job = mockJobs.find(j => j.id === postulacion.jobId);
      return job ? {
        ...job,
        // Agregamos los dos campos que necesitas
        estado: postulacion.estado,
        fechaPostulacion: postulacion.fechaPostulacion
      } : null;
    }).filter(Boolean); // Quitar nulls
  };

  // Obtener trabajos según el tab
  const getJobsByTab = (tab) => {
    switch(tab) {
      case "favoritos":
        return getFavoriteJobs(mockJobs);
      case "postulados":
        return getJobsWithStatus("postulado");
      case "en_revision":
        return getJobsWithStatus("en_revision");
      case "aceptados":
        return getJobsWithStatus("aceptado");
      case "rechazados":
        return getJobsWithStatus("rechazado");
      default:
        return [];
    }
  };

  const currentJobs = getJobsByTab(activeTab);

  // Contadores simples
  const getCounts = () => ({
    favoritos: getFavoriteJobs(mockJobs).length,
    postulados: getJobsWithStatus("postulado").length,
    en_revision: getJobsWithStatus("en_revision").length,
    aceptados: getJobsWithStatus("aceptado").length,
    rechazados: getJobsWithStatus("rechazado").length
  });

  const counts = getCounts();

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
            { key: "favoritos", label: "Favoritos", count: counts.favoritos },
            { key: "postulados", label: "Postulados", count: counts.postulados },
            { key: "en_revision", label: "En Revisión", count: counts.en_revision },
            { key: "aceptados", label: "Aceptados", count: counts.aceptados },
            { key: "rechazados", label: "Rechazados", count: counts.rechazados }
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
                {activeTab === "favoritos" 
                  ? "Ve a 'Buscar Empleos' y guarda trabajos haciendo clic en el ícono 📌"
                  : activeTab === "postulados" 
                  ? "Busca empleos y postúlate para verlos aquí"
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
              {/* ✅ Info de postulación - Solo si tiene estado */}
              {selectedJob.estado && (
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
              )}
              
              {/* Indicador de favorito */}
              {activeTab === "favoritos" && (
                <div className="mb-4 p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm text-yellow-800">⭐ Trabajo guardado en favoritos</p>
                </div>
              )}
              
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