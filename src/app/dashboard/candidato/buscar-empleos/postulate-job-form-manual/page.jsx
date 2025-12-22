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
      nombreCompleto: "",
      correoElectronico: "",
      numCelular: "",
      localidadResidencia: "",
      cargoActual: "",
      cartaPresentacion: "",
      curriculumVitae: "",
      timestamp: new Date().toISOString(),
    },
  });
  const { notify } = useNotification();

  return (
    <div className="p-4 min-w-screen md:min-w-full lg:min-w-[600px] xl:min-w-[700px] 2xl:min-w-[800px]">
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

        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <Input
              type="text"
              placeholder="Nombre Completo"
              {...register("nombreCompleto", {
                required: "Nombre Completo requerido",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              error={errors.nombreCompleto?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <Input
              type="email"
              placeholder="Correo Electrónico"
              {...register("correoElectronico", {
                required: "Correo Electrónico requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo Electrónico no válido",
                },
              })}
              error={errors.correoElectronico?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de celular
            </label>
            <Input
              type="tel"
              placeholder="Número de celular"
              {...register("numCelular", {
                required: "Número de celular requerido",
                pattern: {
                  value: /^\+[0-9]{2,3}-[0-9]{8,9}$/,
                  message: "Número de celular no válido",
                },
              })}
              error={errors.numCelular?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Localidad de Residencia
            </label>
            <Input
              type="text"
              placeholder="Localidad de Residencia"
              {...register("localidadResidencia", {
                required: "Localidad de Residencia requerida",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              error={errors.localidadResidencia?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cargo actual
            </label>
            <Input
              type="text"
              placeholder="Cargo actual"
              {...register("cargoActual", {
                required: "Cargo actual requerido",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              error={errors.cargoActual?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carta de presentación
            </label>
            <Input
              type="text"
              placeholder="URL de la carta de presentación"
              {...register("cartaPresentacion", {
                required: "Carta de presentación requerida",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              error={errors.cartaPresentacion?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Currículum Vitae
            </label>
            <Input
              type="text"
              placeholder="URL del Currículum Vitae"
              {...register("curriculumVitae", {
                required: "Currículum Vitae requerido",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
              error={errors.curriculumVitae?.message}
            />
          </div>
        </div>
      </div>

      {/* Botón para enviar formulario */}
      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className={"cursor-pointer"}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
