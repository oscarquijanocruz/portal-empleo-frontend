// Panel derecho con detalle
"use client";
import { ChevronDown, MessageSquareText } from "lucide-react";
import { useState } from "react";
import { mockJobs } from "../../data/mockData";
import Button from "../ui/Button";
import Image from "next/image";
import { measureMemory } from "vm";
import Link from "next/link";

export default function JobDetail({ job }) {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Ahora recibe job como prop
  if (!job) {
    return (
      <div className="p-6 text-center text-gray-500">
        Selecciona un trabajo para ver los detalles
      </div>
    );
  }

  const handleLeerMas = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
    console.log("Abierto:", isOpen);
  };

  const handleApply = () => {
    console.log('Aplicando a este trabajo');
  };

  return (
    <div className="p-4 sticky top-0 z-10 overflow-hidden overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="justify-between mb-6">
          <div className="grid justify-center text-center items-center place-items-center">
            <div className="w-24 h-24 bg-sky-100 rounded-xs flex items-center justify-center m-4">
              <Image
                src="/logo_cardjob.png"
                alt="logo"
                width={94}
                height={88}
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-blue-900">{job.titulo}</h1>
              <p className="text-blue-900 font-medium">{job.empresa}</p>
              <p className="text-black">
                {job.ubicacion}, {job.modalidad}, {job.jornada}
              </p>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Sobre la empresa</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {job.descripcion}
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Responsabilidades principales
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            (Usa viñetas para mayor claridad, incluye las tareas clave del
            puesto)
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

          <button
            onClick={handleLeerMas}
            className="flex items-center text-blue-800 text-sm font-medium mt-2 hover:underline"
          >
            Leer más <ChevronDown size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Apply Button */}
          <Button className="w-full font-semibold py-3 rounded-lg transition-colors" 
          onClick={handleApply}
          >
            ¡Postularme!
          </Button>
          {/* Chat Button */}
          <div>
            <Link href={`/dashboard/candidato/mensajes`}>
              <Button
                variant="secondary"
                className="h-12 shadow-md transition-colors"
              >
                <MessageSquareText size={28} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
