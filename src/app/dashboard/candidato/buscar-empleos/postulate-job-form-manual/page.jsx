// Form manual para postularse
"use client";
import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { File, Upload, User, X } from "lucide-react";
import { useNotification } from "@/app/contexts/NotificationContext";
import { useForm } from "react-hook-form";

export default function PostulateJobFormManual() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      curriculumVitae: "",
      timestamp: new Date().toISOString(),
    },
  });
  const { notify } = useNotification();

  const onSubmit = async (data) => {
    try {
      // Simular envío de datos al servidor
      await new Promise((resolve) => setTimeout(resolve, 2000));
      notify.success("Datos enviados correctamente");
    } catch (error) {
      notify.error("Error al enviar datos");
    }
  };

  return (
    <div className="p-4 min-w-[320px] max-w-[729px] mx-auto md:min-w-full lg:min-w-[600px] xl:min-w-[700px] 2xl:min-w-[800px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Solicitar empleo de forma manual
      </h1>
      <div className="border-y-1 pt-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">
            Datos Personales para Solicitud
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Currículum Vitae
              </label>
              <Input
                type="file"
                accept="application/pdf"
                placeholder="Currículum Vitae"
                {...register("curriculumVitae", { 
                  required: "Currículum Vitae requerido", 
                  maxFiles: 1,
                  
                })}
                error={errors.curriculumVitae?.message}
              />
            </div>
          </div>
        </form>

        {/* Botón para enviar formulario */}
        <div className="flex items-center justify-center">
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className={"cursor-pointer"}
          >
            {isSubmitting ? "Enviando..." : "Enviar CV"}
          </Button>
        </div>
      </div>
    </div>
  );
}
