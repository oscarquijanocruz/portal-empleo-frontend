/* Tarjeta individual de vacante - VERSION CORREGIDA */
'use client'
import { Bookmark, Info } from 'lucide-react';
import { mockJobs } from "../../data/mockData";

// ✅ RECIBE las props necesarias desde el componente padre
export default function JobCard({ 
  jobs = mockJobs,
  onJobSelect,
  selectedJob,
  favorites = new Set(),
  onToggleFavorite 
}) {

    const handleJobClick = (job) => {
        onJobSelect?.(job);
    };

    const handleFavoriteClick = (e, jobId) => {
        e.stopPropagation(); // ✅ Evita que se dispare el click del job
        
        onToggleFavorite?.(jobId);
    };

    const handleInfoClick = (e) => {
        e.stopPropagation(); // ✅ Evita que se dispare el click del job
        // Agregar lógica para mostrar info adicional
        // Modal de info
    };

    return(
        <div>
            <div className='space-y-4'>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className={`bg-white shadow-md p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedJob?.id === job.id 
                      ? 'border-gray-400 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 w-full">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
                      </div>
                      <div className='flex-1 flex-col'>
                        <div className='flex items-center space-x-2'>
                          <h3 className="font-semibold text-lg text-gray-900 md:line-clamp-1">{job.titulo}</h3>
                          {/* Mostrar estado si existe (para mis-empleos) */}
                          {job.estado && (
                            <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium self-start ${
                              job.estado === "postulado" 
                                ? "bg-yellow-100 text-yellow-800"
                                : job.estado === "en_revision"
                                ? "bg-blue-100 text-blue-800" 
                                : job.estado === "aceptado"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {job.estado.replace("_", " ").toUpperCase()}
                            </span>
                          )}
                        </div>
                        <p className="text-blue-600 text-md">{job.empresa}</p>
                        <div className='flex space-x-8'>
                        <p className="text-gray-500 text-sm">{job.ubicacion}, {job.modalidad}, {job.jornada}</p>
                          <p className="text-md text-gray-900"> 
                            Salario: <br />
                            ${job.salario}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleFavoriteClick(e, job.id)}
                        className={`p-1 rounded-full transition-colors ${
                            favorites.has(job.id) 
                              ? 'text-yellow-500 hover:text-yellow-600' 
                              : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title={favorites.has(job.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        <Bookmark 
                          size={22} 
                          fill={favorites.has(job.id) ? 'currentColor' : 'none'} 
                        />
                      </button>
                      <button 
                        onClick={handleInfoClick}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Más información"
                      >
                        <Info size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}