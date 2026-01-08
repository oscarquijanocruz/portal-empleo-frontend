// Form manual para postularse
 "use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../../../../components/ui/Button";
import { File, Upload, User, X } from "lucide-react";
import { useNotification } from "@/app/contexts/NotificationContext";
import { useForm } from "react-hook-form";
import { mockJobs } from "@/app/data/mockData";

export default function PostulateJobFormManual() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const selectedJob = useMemo(
    () => mockJobs.find((job) => job.id === Number(jobId)),
    [jobId]
  );

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      curriculumVitae: null,
      timestamp: new Date().toISOString(),
    },
  });

  const { notify } = useNotification();

  const handleFile = (fileList) => {
    const file = fileList?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      notify.error("Solo se permiten archivos PDF");
      return;
    }

    // Validación de tamaño (ejemplo: máximo 5MB)
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      notify.error(`El archivo debe pesar menos de ${maxSizeMB} MB`);
      return;
    }

    setSelectedFile(file);
    setValue("curriculumVitae", fileList, { shouldValidate: true });
  };

  const onDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFile(event.dataTransfer.files);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setValue("curriculumVitae", null, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      if (!selectedJob) {
        notify.error("No se encontró la vacante seleccionada.");
        return;
      }

      if (selectedJob.status_vacante !== "Activa") {
        notify.error("No puedes postularte a una vacante que no está activa.");
        return;
      }

      if (!data.curriculumVitae) {
        notify.error("Debes adjuntar tu Currículum Vitae en PDF.");
        return;
      }

      // Simular envío de datos al servidor con información de la vacante
      await new Promise((resolve) => setTimeout(resolve, 2000));
      notify.success(
        `Te has postulado a la vacante "${selectedJob.titulo}" correctamente`
      );
    } catch (error) {
      notify.error("Error al enviar datos");
    }
  };

  const isJobInvalid = !selectedJob || selectedJob.status_vacante !== "Activa";

  return (
    <div className="p-4 min-w-[320px] max-w-[729px] mx-auto md:min-w-full lg:min-w-[600px] xl:min-w-[700px] 2xl:min-w-[800px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Solicitar empleo de forma manual
      </h1>

      {selectedJob ? (
        <p className="mb-4 text-sm text-gray-700">
          Estás aplicando a:{" "}
          <span className="font-semibold text-blue-900">
            {selectedJob.titulo}
          </span>{" "}
          en{" "}
          <span className="font-semibold">{selectedJob.empresa}</span>{" "}
          (ID vacante: {selectedJob.id})
        </p>
      ) : (
        <p className="mb-4 text-sm text-red-600">
          No se encontró una vacante válida. Verifica el enlace de postulación.
        </p>
      )}

      {isJobInvalid && (
        <p className="mb-4 text-sm text-red-600">
          Esta vacante no está activa, por lo que no puedes postularte de forma
          manual.
        </p>
      )}

      <div className="border-y-1 pt-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">
            Subir Currículum Vitae
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currículum Vitae (PDF)
              </label>

              {/* Área drag & drop */}
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg px-6 py-10 cursor-pointer transition-colors ${
                  dragActive
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() =>
                  document.getElementById("cv-upload-input")?.click()
                }
              >
                <Upload
                  className={`w-10 h-10 mb-3 ${
                    dragActive ? "text-blue-700" : "text-blue-900"
                  }`}
                />
                <p className="text-sm text-gray-700 text-center">
                  Arrastra y suelta tu archivo aquí, o{" "}
                  <span className="text-blue-800 font-semibold">
                    haz clic para buscarlo
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Solo se permiten archivos PDF, máximo 5 MB.
                </p>

                {selectedFile && (
                  <div className="mt-4 flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 w-full max-w-md">
                    <File className="w-5 h-5 text-blue-900" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Input de archivo oculto, conectado al form */}
              <input
                id="cv-upload-input"
                type="file"
                accept="application/pdf"
                className="hidden"
                {...register("curriculumVitae", {
                  required: "Currículum Vitae requerido",
                  validate: {
                    isPdf: (fileList) => {
                      const file = fileList?.[0];
                      return (
                        !file ||
                        file.type === "application/pdf" ||
                        "El archivo debe ser un PDF"
                      );
                    },
                  },
                })}
                onChange={(e) => handleFile(e.target.files)}
              />

              {errors.curriculumVitae && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.curriculumVitae.message}
                </p>
              )}
            </div>
          </div>

          {/* Botón para enviar formulario */}
          <div className="flex items-center justify-center pt-2">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || isJobInvalid}
              className={"cursor-pointer px-8"}
            >
              {isSubmitting ? "Enviando..." : "Enviar CV"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
