// Panel derecho con detalle
'use client'
import { Home, Search, Briefcase, Clock, MessageSquare } from 'lucide-react';
import { useState } from "react";
import { mockJobs } from "../../data/mockData";

export default function JobDetail({ job }) {
    // ✅ Ahora recibe job como prop
    if (!job) {
        return (
            <div className="p-6 text-center text-gray-500">
                Selecciona un trabajo para ver los detalles
            </div>
        );
    }
    
    return(
        <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded transform rotate-45"></div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{job.titulo}</h1>
                    <p className="text-blue-600 font-medium">{job.empresa}</p>
                    <p className="text-gray-500">{job.ubicacion}, {job.modalidad}, {job.jornada}</p>
                </div>
                </div>
            </div>

            {/* Company Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Sobre la empresa</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {job.descripcion || "(Descripción breve de la empresa: quiénes son, qué hacen, su cultura y propósito. Ejemplo: Somos una empresa líder en el sector tecnológico con enfoque en soluciones digitales innovadoras.)"}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Responsabilidades principales</h2>
              <p className="text-sm text-gray-600 mb-2">
                (Usa viñetas para mayor claridad, incluye las tareas clave del puesto)
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                {job.responsabilidades?.map((resp, index) => (
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
                  {job.requisitos?.indispensables?.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Deseables:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {job.requisitos?.deseables?.map((req, index) => (
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
            
            <div className="flex items-center space-x-4">
                {/* Apply Button */}
                <button className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">
                ¡Postularme!
                </button>
                {/* Chat Button */}
                <div className="">
                    <button className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <MessageSquare size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}