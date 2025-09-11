/* Tarjeta individual de vacante */

// import { Search, Home, Briefcase, Clock, MessageSquare, Bookmark, Info, User } from 'lucide-react';

'use client'
import { Bookmark, Info } from 'lucide-react';
import { useState } from "react";
import JobDetail from './JobDetail';


// Mock data para las vacantes simuladas (*borrar cuando se integre a backend*)
const mockJobs = [
  {
    id: 1,
    titulo: "Desarrollador Frontend React",
    empresa: "Tech Solutions",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    salario: "45,000",
    logo: "/api/placeholder/50/50",
    descripcion: "Buscamos un desarrollador Frontend con experiencia en React...",
    responsabilidades: [
      "Diseñar, desarrollar y optimizar aplicaciones web",
      "Colaborar con el equipo de diseño UX/UI",
      "Realizar análisis de rendimiento",
      "Participar en la creación de componentes reutilizables"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Sistemas o experiencia equivalente",
        "Manejo de herramientas como React, Next.js",
        "Experiencia mínima de 3 años en desarrollo Frontend",
        "Habilidades en comunicación y trabajo en equipo"
      ],
      deseables: [
        "Conocimiento en TypeScript",
        "Certificaciones en tecnologías web",
        "Idiomas adicionales (inglés)"
      ]
    }
  },
  {
    id: 2,
    titulo: "Diseñador UX/UI",
    empresa: "Creative Studio",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    salario: "38,000",
    logo: "/api/placeholder/50/50",
    descripcion: "Únete a nuestro equipo creativo como Diseñador UX/UI...",
    responsabilidades: [
      "Crear wireframes y prototipos",
      "Diseñar interfaces de usuario atractivas",
      "Realizar investigación de usuarios",
      "Colaborar con desarrolladores"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Diseño Gráfico o afín",
        "Experiencia con Figma, Adobe XD",
        "Portfolio demostrable",
        "Conocimiento en principios de UX"
      ],
      deseables: [
        "Experiencia en investigación UX",
        "Conocimiento básico de HTML/CSS",
        "Inglés conversacional"
      ]
    }
  },
  {
    id: 3,
    titulo: "Marketing Digital",
    empresa: "Digital Agency",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    salario: "32,000",
    logo: "/api/placeholder/50/50",
    descripcion: "Especialista en marketing digital para campañas innovadoras...",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    }
  }
];

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
                      ? 'border-blue-300 bg-blue-50' 
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