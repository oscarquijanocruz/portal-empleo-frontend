"use client";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Badge from "@/app/components/ui/Badge";
import { useFavorites } from "@/app/hooks/useFavorites";
import { mockJobs } from "@/app/data/mockData";
import Link from "next/link";
import {
  Bookmark,
  Building2,
  CheckCircle2,
  FileUser,
  Clock,
  MapPin,
  BellRing,
  ArrowRightIcon
} from "lucide-react";
import { mockNotifications } from "@/app/data/mockNotifications";
import useTypeNotification from "../../hooks/useTypeNotification";

export default function DashboardPage() {
  const { favoriteCount } = useFavorites();
  const { getTypeIcon, formatTimestamp } = useTypeNotification();

  const totalPostulaciones = 5; // mock por ahora
  const totalNotificaciones = 3; // mock por ahora
  const recomendados = mockJobs.slice(0, 3); // mock por ahora - cambiarlo por el endpoint
  const notificaciones = mockNotifications.slice(0, 3); // mock por ahora - cambiarlo por el endpoint

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Hero / bienvenida */}
      <section className="w-full h-auto min-h-[300px] sm:h-80 md:h-96 rounded-sm bg-gray-800 text-white p-4 sm:p-6 md:p-8 flex items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 text-center md:text-left">
          <div className="space-y-3 sm:space-y-4 w-full md:max-w-2xl lg:max-w-3xl mx-auto md:mx-0 px-0 md:px-4 lg:px-8">
            <div className="flex justify-center md:justify-start">
              <Badge
                variant="primary"
                size="sm"
                className={
                  "text-purple-100 bg-violet-900 border-2 border-violet-950"
                }
              >
                Nuevo Portal
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Tu próximo empleo te espera: Descubre oportunidades con Mentory.
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base">
              Explora empleos recomendados, revisa tus postulaciones y mantente
              al día con tus notificaciones desde un solo lugar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 justify-center w-full sm:w-auto">
            <Link href="/dashboard/candidato/buscar-empleos" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Buscar empleos
                <ArrowRightIcon size={18} className="ml-2 hidden sm:inline" />
              </Button>
            </Link>
            <Link href="/dashboard/candidato/mi-perfil" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className={"border-1 border-white text-white w-full sm:w-auto"}
              >
                Completar perfil
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <KpiCard
          icon={<Bookmark className="w-8 h-8 sm:w-[38px] sm:h-[38px] text-yellow-500" />}
          label="Favoritos"
          value={favoriteCount}
          href="/dashboard/candidato/mis-empleos?tab=favoritos"
        />
        <KpiCard
          icon={<FileUser className="w-8 h-8 sm:w-[38px] sm:h-[38px] text-sky-900" />}
          label="Postulaciones"
          value={totalPostulaciones}
          href="/dashboard/candidato/mis-empleos?tab=postulaciones"
        />
        <KpiCard
          icon={<BellRing className="w-8 h-8 sm:w-[38px] sm:h-[38px] text-green-600" />}
          label="Notificaciones"
          value={totalNotificaciones}
          href="/dashboard/candidato/notificaciones"
        />
      </section>

      {/* Recomendados rápidos */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-950">
            Empleos recomendados
          </h2>
          <Link
            href="/dashboard/candidato/buscar-empleos"
            className="text-blue-800 text-xs sm:text-sm hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {recomendados.map((job) => (
            <article
              key={job.id}
              className="bg-white border border-gray-200 rounded-sm shadow-sm p-3 sm:p-4"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-100 rounded-xs flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/logo_cardjob.png"
                    alt="logo"
                    width={94}
                    height={88}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 sm:truncate">
                    {job.titulo}
                  </h3>
                  <p className="text-blue-900 text-xs sm:text-sm mt-1">{job.empresa}</p>
                  <div className="text-gray-500 text-xs mt-2 space-y-1">
                    <span className="flex gap-1 items-center">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{job.ubicacion}</span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{job.jornada}</span>
                    </span>
                    <span className="flex gap-1 items-center">
                      <Building2 className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{job.modalidad}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <span className="text-gray-900 text-xs sm:text-sm">
                  Salario: ${job.salario}
                </span>
                <Link
                  href={`/dashboard/candidato/buscar-empleos?jobId=${job.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button variant="ghost" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                    Ver detalle
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Columna Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Notificaciones recientes*/}
          <section>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                Notificaciones recientes
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {notificaciones.map((notification) => {
                  return (
                    <div
                      key={notification.id}
                      className="flex flex-col sm:flex-row items-start sm:items-start gap-2 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-50 p-2 rounded-lg text-xs flex-shrink-0">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <p className="font-medium text-sm sm:text-base text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 self-start sm:self-center flex-shrink-0">
                        {formatTimestamp(notification.timestamp)}
                        {/* {notification.timestamp.toLocaleDateString()} */}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Completar perfil */}
        <section className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-950 mb-3 sm:mb-4">
              Completa tu perfil
            </h2>
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm mb-2">
                <span className="text-gray-600">Progreso</span>
                <span className="font-semibold text-blue-600">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center text-green-600">
                <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Información básica</span>
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Informacion profesional</span>
              </li>
              <li className="flex items-center text-gray-400">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0"></div>
                <span>Experiencia laboral</span>
              </li>
              <li className="flex items-center text-gray-400">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2 flex-shrink-0"></div>
                <span>Subir CV</span>
              </li>
            </ul>
            <Link href="/dashboard/candidato/mi-perfil" className="block mt-3 sm:mt-4">
              <Button variant="primary" className="w-full px-4 py-2 text-sm sm:text-base">
                Completar Perfil
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, href }) {
  return (
    <Link href={href} className="block">
      <div className="rounded-sm bg-white border border-gray-200 shadow-lg p-3 sm:p-4 hover:shadow-xl transition-shadow">
        <div className="pb-2">{icon}</div>
        <p className="text-xs sm:text-sm text-gray-500">{label}</p>
        <p className="text-xl sm:text-2xl font-bold text-blue-950">{value}</p>
      </div>
    </Link>
  );
}
