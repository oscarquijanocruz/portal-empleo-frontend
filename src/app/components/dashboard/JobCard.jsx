/* Tarjeta individual de vacante - VERSION CORREGIDA */
'use client'
import { Bookmark, Info } from 'lucide-react';
import { useState } from "react";
import JobDetail from './JobDetail';
import { mockJobs } from "../../data/mockData";

// ✅ RECIBE las props necesarias desde el componente padre
export default function JobCard({ 
  jobs = mockJobs,
  onJobSelect,
  selectedJob,
  favorites = new Set(),
  onToggleFavorite 
}) {

    const handleJobSelect = (job) => {
        setSelectedJob(job);
    };

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
            <div className="p-4">
                <div className='space-y-4'>
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleJobClick(job)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedJob?.id === job.id 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
                          </div>
                          <div className='flex flex-col'>
                            <h3 className="font-semibold text-lg text-gray-900">{job.titulo}</h3>
                            <p className="text-blue-600 text-md">{job.empresa}</p>
                            <div className='flex space-x-2'>
                            <p className="text-gray-500 text-sm">{job.ubicacion}, {job.modalidad}, {job.jornada}</p>
                              <p className="text-md text-gray-900"> Salario: 
                                ${job.salario}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => handleFavoriteClick(e, job.id)}
                            className={`p-2 rounded-full transition-colors ${
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
                          >s
                            <Info size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='space-y-4'>
                  <JobDetail job={selectedJob}/>
                </div>
            </div>    
        </div>
    )
}