/* Tarjeta individual de vacante - VERSION CORREGIDA */
"use client";
import { Bookmark, Info, X } from "lucide-react";
import { mockJobs } from "@/app/data/mockData";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Badge from "@/app/components/ui/Badge";

// RECIBE las props necesarias desde el componente padre
export default function JobCard({
  jobs = mockJobs,
  onJobSelect,
  selectedJob,
  favorites = new Set(),
  onToggleFavorite,
}) {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Url params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleJobClick = (job) => {
    onJobSelect?.(job);
    const params = new URLSearchParams(searchParams);
    params.set("jobId", job.id.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFavoriteClick = (e, jobId) => {
    e.stopPropagation(); // ✅ Evita que se dispare el click del job
    onToggleFavorite?.(jobId);
  };

  const handleInfoClick = (e, jobId) => {
    e.stopPropagation();

    if (selectedJobId === jobId) {
      setIsOpenPopover((prev) => !prev);
    } else {
      setSelectedJobId(jobId);
      setIsOpenPopover(true);
    }
  };

  // Manejar clic fuera del popover
  useEffect(() => {
    if (!isOpenPopover) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".notify")) {
        setIsOpenPopover(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [isOpenPopover, setIsOpenPopover]);

  return (
    <div>
      <div className="space-y-4">
        {jobs
          .filter((job) => job.status_vacante !== "Cerrada")
          .map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job)}
              className={`shadow-md p-4 border border-1.5 rounded-sm transition-all relative cursor-pointer hover:shadow-lg ${
                job.status_vacante === "Cerrada"
                  ? "bg-gray-100 text-gray-600 border-gray-300"
                  : "bg-white"
              }
            ${
              selectedJob?.id === job.id
                ? "border-blue-950 bg-blue-300 shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 w-full">
                  <div
                    className={`w-24 h-24 rounded-xs flex items-center justify-center ${
                      job.status_vacante === "Cerrada"
                        ? "bg-gray-300"
                        : "bg-sky-100"
                    }`}
                  >
                    <Image
                      src="/logo_cardjob.png"
                      alt="logo"
                      width={94}
                      height={88}
                      className={`filter-grayscale ${
                        job.status_vacante === "Cerrada"
                          ? "grayscale-100 opacity-70"
                          : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`flex-1 flex-col filter-grayscale ${
                      job.status_vacante === "Cerrada"
                        ? "grayscale-90 opacity-80"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg text-gray-900 md:line-clamp-1">
                        {job.titulo}
                      </h3>
                      {/* Mostrar estado si existe (para mis-empleos) */}
                      {job.estado && (
                        <span
                          className={`mt-1 px-2 py-1 rounded-full text-xs font-medium self-start ${
                            job.estado === "postulado"
                              ? "bg-yellow-100 text-yellow-800"
                              : job.estado === "en_revision"
                              ? "bg-blue-100 text-blue-800"
                              : job.estado === "aceptado"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job.estado.replace("_", " ").toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-blue-800 text-md font-medium">
                      {job.empresa}
                    </p>
                    <div className="flex flex-row">
                      <p className="text-gray-500 text-sm">
                        {job.ubicacion}, {job.modalidad}, {job.jornada}
                      </p>
                      <p className="text-sm text-gray-900 text-right ml-auto">
                        Salario: <br />${job.salario}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-9">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleFavoriteClick(e, job.id)}
                      className={`p-1 rounded-full transition-colors ${
                        favorites.has(job.id)
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      title={
                        favorites.has(job.id)
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                      }
                    >
                      <Bookmark
                        size={22}
                        fill={favorites.has(job.id) ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      onClick={(e) => handleInfoClick(e, job.id)}
                      className={`p-1 text-gray-400 hover:text-gray-600 transition-colors ${
                        isOpenPopover && job.id === selectedJobId
                          ? "text-gray-600"
                          : ""
                      }`}
                      title="Más información"
                    >
                      <Info size={22} />
                    </button>
                  </div>
                  <div className="justify-right">
                      <p className="content-center font-bold">
                        {job.isSponsored && (
                          <Badge
                            variant="primary"
                            size="xs"
                            className={"bg-sky-100 text-sky-950 text-[9px]"}
                          >
                            Patrocinado
                          </Badge>
                        )}
                      </p>
                    </div>
                </div>

                {/* Popover de información */}
                {isOpenPopover && job.id === selectedJobId && (
                  <div
                    key={job.id}
                    className="w-72 h-auto bg-white text-black border-1 border-gray-200 rounded-lg shadow-md text-left p-4 absolute z-[999px] md:bottom-30 md:left-77"
                  >
                    <div className="flex items-center">
                      <p className="font-bold text-md mb-2 flex">
                        Detalles de la vacante
                      </p>
                      <button
                        onClick={() => setIsOpenPopover(false)}
                        className="flex ml-auto"
                        aria-label="Cerrar detalles"
                        title="Cerrar detalles"
                      >
                        <X
                          size={14}
                          className="text-gray-400 mt-2 mb-3 hover:text-gray-600 transition-colors cursor-pointer"
                        />
                      </button>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>ID: {job.id}</li>
                      <li>
                        Estado de la vacante:
                        <span className="text-gray-500 ml-1">
                          <Badge
                            variant="secondary"
                            size="xs"
                            className={"text-gray-600 rounded-sm bg-gray-200"}
                          >
                            {job.status_vacante}
                          </Badge>
                        </span>
                      </li>
                      <li>Publicado: {job.fechaPublicacion}</li>
                      <li>Fecha de cierre: fecha</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
