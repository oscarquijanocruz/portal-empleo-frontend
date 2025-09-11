// Panel derecho con detalle
'use client'
import { Home, Search, Briefcase, Clock, MessageSquare } from 'lucide-react';
import { useState } from "react";

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

export default function JobDetail() { 
    const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    
    const menuItems = [
        { icon: Home, label: 'Inicio', active: false },
        { icon: Search, label: 'Buscar empleos', active: true },
        { icon: Briefcase, label: 'Mis Empleos', active: false },
        { icon: Clock, label: 'Mi actividad', active: false },
        { icon: MessageSquare, label: 'Mensajes', active: false }
    ];

    return(
        <div>
        {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded transform rotate-45">Logo</div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedJob.titulo}</h1>
                    <p className="text-blue-600 font-medium">{selectedJob.empresa}</p>
                    <p className="text-gray-500">{selectedJob.ubicacion}, {selectedJob.modalidad}, {selectedJob.jornada}</p>
                </div>
                </div>
            </div>
            {/* Company Info */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Sobre la empresa</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    (Descripción breve de la empresa: quiénes son, qué hacen, su cultura y propósito. 
                    Ejemplo: Somos una empresa líder en el sector tecnológico con enfoque en soluciones 
                    digitales innovadoras.)
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Responsabilidades principales</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    (Usa viñetas para mayor claridad, incluye las tareas clave del puesto)
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {selectedJob.responsabilidades.map((resp, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-3">Requisitos</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    (Puede dividirse en indispensables y deseables)
                  </p>
                  
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">Indispensables:</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {selectedJob.requisitos.indispensables.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Deseables (plus):</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {selectedJob.requisitos.deseables.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                    Leer más ↓
                  </button>
                </div>

                {/* Apply Button */}
                <button className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">
                  ¡Postularme!
                </button>
        </div>
    );
}