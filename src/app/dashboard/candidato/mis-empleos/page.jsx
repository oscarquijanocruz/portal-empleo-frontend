"use client";
import JobCard from "../../../components/dashboard-candidato/JobCard";
import JobDetail from "../../../components/dashboard-candidato/JobDetail";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useJobs } from "../../../hooks/useJobs";
import { useFavorites } from "../../../hooks/useFavorites";
import { mockJobs } from "../../../data/mockData";
import Tabs, { Tab, TabList, TabContent } from "@/app/components/ui/Tab";

export default function MisEmpleosPage() {
  const searchParams = useSearchParams();
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
    },
    {
      jobId: 7,
      estado: "aceptado",
      fechaPostulacion: "2024-01-08"
    }
  ]);

  const { selectedJob, handleJobSelect } = useJobs(mockJobs);
  const { favorites, toggleFavorite, isFavorite, getFavoriteJobs } = useFavorites();

  // Handle specific job selection from URL parameter
  useEffect(() => {
    const jobId = searchParams.get('jobId');
    if (jobId) {
      // Find job by ID in mockJobs
      const specificJob = mockJobs.find(job => 
        job.id.toString() === jobId || 
        job.titulo.toLowerCase().includes(jobId.toLowerCase())
      );
      if (specificJob) {
        handleJobSelect(specificJob);
        // Set appropriate tab based on job status
        const postulacion = misPostulaciones.find(p => p.jobId === specificJob.id);
        if (postulacion) {
          setActiveTab(postulacion.estado);
        }
      }
    }
  }, [searchParams, handleJobSelect]);

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
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mis Empleos</h1>
        <p className="text-gray-600">
          Gestiona tus postulaciones y trabajos guardados
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex space-x-5">
          <Tabs
            defaultValue="favoritos"
            onValueChange={setActiveTab}
            variant="underline"
            className="flex-1"
          >
            <TabList className="font-medium">
              <Tab value="favoritos">Favoritos ({counts.favoritos})</Tab>
              <Tab value="postulados">Postulados ({counts.postulados})</Tab>
              <Tab value="en_revision">En Revisión ({counts.en_revision})</Tab>
              <Tab value="aceptados">Aceptados ({counts.aceptados})</Tab>
              <Tab value="rechazados">Rechazados ({counts.rechazados})</Tab>
            </TabList>
          </Tabs>
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de trabajos */}
        <div className="space-y-4 p-3">
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
                  : `No hay empleos ${activeTab.replace("_", " ")}`}
              </p>
            </div>
          )}
        </div>

        {/* Panel de detalles */}
        <div className="p-2 space-y-4">
          {selectedJob ? (
            <div>
              {/* Info de postulación - Solo si tiene estado */}
              {selectedJob.estado && (
                <div className="mb-4 p-3 rounded-sm bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Estado de postulación:
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedJob.estado === "postulado"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedJob.estado === "en_revision"
                          ? "bg-blue-100 text-blue-800"
                          : selectedJob.estado === "aceptado"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedJob.estado.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  {selectedJob.fechaPostulacion && (
                    <p className="text-sm text-gray-500 mt-1">
                      Postulado el{" "}
                      {new Date(
                        selectedJob.fechaPostulacion
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {/* Indicador de favorito */}
              {activeTab === "favoritos" && (
                <div className="mb-4 p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    ⭐ Trabajo guardado en favoritos
                  </p>
                </div>
              )}

              {/* Detalles del trabajo */}
              <JobDetail
                className="relative"
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