/* Tarjeta individual de vacante */
'use client'
import { Bookmark, Info } from 'lucide-react';
import { useState } from "react";
import JobDetail from './JobDetail';
import { mockJobs } from "../../data/mockData";

export default function JobCard() {
    const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
    
    return(
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 space-y-4">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedJob.id === job.id 
                      ? 'border-white bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded transform rotate-45"></div>
                      </div>
                      <div className='flex flex-col'>
                        <h3 className="font-semibold text-gray-900">{job.titulo}</h3>
                        <p className="text-blue-600 text-sm">{job.empresa}</p>
                        <p className="text-gray-500 text-sm">{job.ubicacion}, {job.modalidad}, {job.jornada}</p>
                        <p className="text-lg text-gray-900"> Salario:</p>
                        <p className="text-lg text-gray-900">$ {job.salario}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-black-400 hover:text-gray-600">
                        <Bookmark size={22} />
                      </button>
                      <button className="p-1 text-black-400 hover:text-gray-600">
                        <Info size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 space-y-4">
              <JobDetail job={selectedJob} />
            </div>
          </div>    
        </div>
    )
}