// Panel derecho con detalle
"use client";
import { ChevronDown, ChevronUp, CircleDollarSign, Clock, LayoutGrid, MessageSquareText, Share2 } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useNotification } from "@/app/contexts/NotificationContext";
import PostulationDialog from "./PostulationDialog";
import SendMessageDialog from "./SendMessageDialog";

export default function JobDetail({ job }) {
  const { notify } = useNotification();
  const [expanded, setExpanded] = useState(false);
  const [isOpenDialogPostulate, setIsOpenDialogPostulate] = useState(false);

  // ✅ Ahora recibe job como prop
  if (!job) {
    return (
      <div className="p-6 text-center text-gray-500">
        Selecciona un trabajo para ver los detalles
      </div>
    );
  }
  // Función para mostrar el botón de aplicar
  // const handlePostulate = () => {
  //   console.log('Postularme a este trabajo');
  //   return setIsOpenDialog(true);
  // };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    return notify.success("¡Compartido!", "Vacante copiado al portapapeles.");
  };

  return (
    <div className="p-4 sticky top-0 z-10 overflow-hidden overflow-y-auto">
      <div className="space-y-4">
        {/* Header */}
        <div className="justify-between mb-6">
          <div className="grid justify-center text-center items-center place-items-center relative">
            <div className="text-left ml-auto absolute top-0 right-0">
              <Button
                variant="outline"
                size="xs"
                className={
                  "bg-[#efefefff] hover:bg-[#c9c9c9ff] rounded-sm items-center"
                }
                //style={{background: "#efefefff", padding: "5px"}}
                onClick={() => handleShare()}
              >
                <Share2
                  size={22}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                />
              </Button>
            </div>
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
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Deseables:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              {job.requisitos?.deseables?.map((req, index) => (
                <li key={index} className="flex items-start mb-2">
                  <span className="mr-2">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Beneficios */}
          {expanded && (
            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
              <h2 className="text-lg font-semibold mb-3">Beneficios</h2>
              <ul
                className="space-y-1 text-sm text-gray-600 leading-relaxed"
                id="beneficios"
              >
                {job.beneficios?.map((beneficio, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Info adicional */}
          {expanded && (
            <div className="flex flex-col sm:flex-row border-t-1 border-gray-200 mt-4 mb-4 py-2 text-sm px-1 text-gray-700 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="flex items-center pr-2">
                <CircleDollarSign size={18} className="mr-2 shrink-0" />
                Sueldo: ${job.sueldoMinimo} - ${job.sueldoMaximo} Mensual
              </p>
              <p className="flex items-center sm:border-x-1 border-gray-200 sm:px-2">
                <Clock size={18} className="mr-2 shrink-0" />
                Jornada: {job.jornada}
              </p>
              <p className="flex items-center sm:pl-2">
                <LayoutGrid size={18} className="mr-2 shrink-0" />
                Categoría: {job.categoria}
              </p>
            </div>
          )}

          {/* Botón para expandir contenido */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center text-blue-800 text-sm font-medium mt-2 hover:underline"
            aria-label="Expandir contenido"
            aria-expanded={expanded ? "Leer más" : "Leer menos"}
            aria-controls="beneficios"
            title={expanded ? "Leer menos detalles" : "Leer más detalles"}
          >
            {expanded ? (
              <>
                Leer menos <ChevronUp size={20} />
              </>
            ) : (
              <>
                Leer más <ChevronDown size={20} />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Apply Button */}
          <Button
            className="w-full font-semibold py-3 rounded-lg transition-colors"
            onClick={() => setIsOpenDialogPostulate (true)}
            // disabled={isLoading}
          >
            {/* {isLoading && <Spinner size={16} className="ml-2 text-white" />} */}
            ¡Postularme!
          </Button>
          {/* Dialogo de envio de mensaje */}
          <PostulationDialog
            isOpen={isOpenDialogPostulate}
            onClose={() => setIsOpenDialogPostulate(false)}
            // isLoading={isLoading}
            // onPostulate={handlePostulate}
          />
          {/* Chat Button */}
          <div>
            <Link href={`/dashboard/candidato/mensajes`}>
              <Button
                type="button"
                onClick={() => <SendMessageDialog isOpen={true} />} // Al hacer click debe abrir el dialog para mandar un mensaje nuevo
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
