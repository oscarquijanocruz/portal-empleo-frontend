// Dialog de postulacion
"use client";
import { FilePenLine, LinkIcon, X, Check, CircleCheck } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { mockJobs } from "@/app/data/mockData";
import { useState } from "react";
import Modal from "@/app/components/ui/Modal";

export default function PostulationDialog({
  isOpen = false,
  onClose = () => {},
  onPostulate = () => {},
  job = mockJobs // TODO:Esto es una demo, cambiar por datos reales del back cuando se tenga
}) {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  
  // Simular estado de autenticación y perfil completo
  const isLogin = true; // Simular usuario logueado o no
  const completedProfile = true; // Simular perfil completo o incompleto
  const jobs = mockJobs.slice(0, 1); //   TODO:Esto es una demo, cambiar por datos reales del back cuando se tenga


  const handlePostulate = () => {
    if(isLogin && completedProfile) {
      setIsSuccessModalOpen(true);
    } else {
      setIsWarningModalOpen(true);
    }

    // Validar que no haya postulado antes
    if (jobs.some((job) => job.status_vacante === "Postulado")) {
      notify.error("Ya has postulado", "No puedes postularte más de una vez");
      return;
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed z-50 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop oscuro */}
          <div
            className="fixed -z-10 inset-0 bg-black backdrop-opacity-70 opacity-50 transition-opacity animate-in fade-in duration-300"
            aria-hidden="true"
            role="dialog"
            onClick={onClose} // Cerrar al hacer clic en el fondo
          ></div>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="mb-4 grid justify-items-end">
                <X
                  size={20}
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                />
              </div>
              <div>
                {jobs
                  .filter((job) => job.status_vacante !== "Cerrada")
                  .map((job) => (
                    <div key={job.id} className="w-full">
                      <div className="w-full bg-gray-100 rounded-md p-2">
                        <div className="flex gap-2 items-center">
                          <div className="w-12 h-12 rounded-xs flex items-center justify-center bg-sky-100">
                            <Image
                              src="/logo_cardjob.png"
                              alt="logo"
                              width={94}
                              height={88}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 md:line-clamp-1">
                              {job.titulo}
                            </h3>
                            <p className="text-blue-800 text-md font-medium">
                              {job.empresa}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h2
                          className="text-xl leading-6 font-bold text-gray-900"
                          id="modal-title"
                        >
                          Este podria ser tu próximo gran trabajo
                        </h2>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Elige como quieres postularte
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3 justify-center">
                        <Button
                          type="button"
                          variant="primary"
                          className={"w-full h-40 text-md space-y-1 font-semibold justify-items-center"}
                          onClick={handlePostulate}
                          style={{display: "grid"}}
                        >
                          <LinkIcon size={30} className="text-white" />
                          Vincular a través de Mentory
                          <p className="text-xs text-white">
                            Rápido y sencillo de una sola vez
                          </p>
                        </Button>

                        <Link href={`/dashboard/candidato/buscar-empleos/postulate-job-form-manual?jobId=${job.id}`}>
                          <Button
                            type="button"
                            variant="secondary"
                            className={"w-full h-40 text-md space-y-1 font-semibold justify-items-center"}
                            onClick={onClose}
                            style={{display: "grid"}}
                          >
                            <FilePenLine
                              size={30}
                              className="text-sky-900"
                            />
                            Subir de forma manual
                            <p className="text-xs text-gray">
                              Sube tu CV en archivo PDF
                            </p>
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-6 text-sm text-gray-600 space-y-2 flex-col">
                        <p className="flex">
                          {" "}
                          <Check size={20} className="text-sky-900 mr-1" />
                          Tus datos son seguros
                        </p>
                        <p className="flex">
                          {" "}
                          <Check size={20} className="text-sky-900 mr-1" />{" "}
                          Puedes editar tu postulación
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pantalla de exito al postularse */}
              {completedProfile && isLogin ? (
                <Modal
                  isOpen={isSuccessModalOpen}
                  onClose={() => setIsSuccessModalOpen(false)}
                  title="¡Postulación Exitosa!"
                  variant="success"
                onConfirm={null}
                >
                  <div className="flex flex-col items-center justify-center p-2">
                    <h1 className="mb-2 font-semibold">¡Se ha postulado correctamente!</h1>
                    <div className="items-center text-center grid grid-cols-2 gap-2 m-4">
                      <div>
                        <h2>Puedes editar la postulación</h2>
                        <Link
                          href="/dashboard/candidato/mi-perfil"
                          className="text-blue-600 hover:underline"
                        >
                          <Button type="primary" size="lg">
                            {" "}
                            Editar mi CV
                          </Button>
                        </Link>
                      </div>
                      <div>
                        <h2>Puedes ver el estado de la postulacion</h2>
                        <Link
                          href={`/dashboard/candidato/mis-empleos?jobId=${jobs[0].id}`}
                          className="text-blue-600 hover:underline"
                        >
                          <Button type="secondary" size="lg">
                            {" "}
                            Mis empleos
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Modal>
              ) : (
                <Modal
                  isOpen={isWarningModalOpen}
                  onClose={() => setIsWarningModalOpen(false)}
                  title="Postulacion incompleta"
                  variant="warning-yellow"
                  confirmText="Okay"
                  onConfirm={() => router.push("/dashboard/candidato/mi-perfil")}
                >
                  <p>
                    Completa tu perfil para poder postularte a este trabajo:{" "}
                    {job.titulo}
                  </p>
                </Modal>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
