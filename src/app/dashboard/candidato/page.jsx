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
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Hero / bienvenida */}
      <section className="w-full h-96 rounded-sm bg-gray-800 text-white p-6 md:p-8 content-center">
        <div className="grid grid-cols-1 md:flex-row md:items-center md:justify-between gap-6 text-center justify-center items-center">
          <div className="space-y-4 px-72">
            <Badge variant="primary" size="sm" className={"text-white bg-violet-900"}>Nuevo Portal</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">Tu próximo empleo te espera: Descubre oportunidades con Mentory.</h1>
            <p className="text-blue-100 text-sm">
              Explora empleos recomendados, revisa tus postulaciones y mantente
              al día con tus notificaciones desde un solo lugar.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <Link href="/dashboard/candidato/buscar-empleos">
              <Button variant="secondary" >
                Buscar empleos
                <ArrowRightIcon size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard/candidato/mi-perfil">
              <Button variant="outline" className={"border-1 border-white text-white"}>Completar perfil</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          icon={<Bookmark size={38} className="text-yellow-500" />}
          label="Favoritos"
          value={favoriteCount}
          href="/dashboard/candidato/mis-empleos?tab=favoritos"
        />
        <KpiCard
          icon={<FileUser size={38} className="text-blue-600" />}
          label="Postulaciones"
          value={totalPostulaciones}
          href="/dashboard/candidato/mis-empleos?tab=postulaciones"
        />
        <KpiCard
          icon={<BellRing size={38} className="text-green-600" />}
          label="Notificaciones"
          value={totalNotificaciones}
          href="/dashboard/candidato/notificaciones"
        />
      </section>

      {/* Recomendados rápidos */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-blue-950">
            Empleos recomendados
          </h2>
          <Link
            href="/dashboard/candidato/buscar-empleos"
            className="text-blue-800 text-sm hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recomendados.map((job) => (
            <article
              key={job.id}
              className="bg-white border border-gray-200 rounded-sm shadow-sm p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-sky-100 rounded-xs flex items-center justify-center">
                  <Image
                    src="/logo_cardjob.png"
                    alt="logo"
                    width={94}
                    height={88}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 md:truncate">
                    {job.titulo}
                  </h3>
                  <p className="text-blue-900 text-sm">{job.empresa}</p>
                  <p className="text-gray-500 text-xs md:truncate md:space-y-1 mt-1">
                    <span className="flex gap-1 items-center">
                      <MapPin className="w-3 h-3" />
                      {job.ubicacion}
                    </span>
                    <span className="flex gap-1 items-center">
                      <Clock className="w-3 h-3" />
                      {job.jornada}
                    </span>
                    <span className="flex gap-1 items-center">
                      <Building2 className="w-3 h-3" />
                      {job.modalidad}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-900 text-sm">
                  Salario: ${job.salario}
                </span>
                <Link
                  href={`/dashboard/candidato/buscar-empleos?jobId=${job.id}`}
                >
                  <Button variant="ghost" size="sm">
                    Ver detalle
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Columna Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Notificaciones recientes*/}
          <section>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                Notificaciones recientes
              </h2>
              <div className="space-y-4">
                {notificaciones.map((notification) => {
                  return (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-50 p-2 rounded-lg text-xs">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
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
        <section className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg md:text-xl font-semibold text-blue-950">
              Completa tu perfil
            </h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
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
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-green-600">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Información básica
              </li>
              <li className="flex items-center text-green-600">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Informacion profesional
              </li>
              <li className="flex items-center text-gray-400">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2"></div>
                Experiencia laboral
              </li>
              <li className="flex items-center text-gray-400">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2"></div>
                Subir CV
              </li>
            </ul>
            <a href="/dashboard/candidato/mi-perfil">
              <Button variant="primary" className="w-full mt-4 px-4 py-2">
                Completar Perfil
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, href }) {
  return (
    <Link href={href} className="block">
      <div className="rounded-sm bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="pb-2">{icon}</div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-blue-950">{value}</p>
      </div>
    </Link>
  );
}
