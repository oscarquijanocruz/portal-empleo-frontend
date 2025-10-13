import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { BriefcaseBusiness } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import MiPerfilPage from "../../../candidato/mi-perfil/page";
import Select from "@/app/components/ui/Select";

export default function StepProfesional({ methods = MiPerfilPage() }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log("Guardando perfil:", methods.getValues());
    // Aquí se implementaría la lógica para guardar en el backend
    alert("Perfil actualizado exitosamente");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Experiencia Laboral
      </h1>
      <div className="border-y-1 py-3">
        <div className="flex items-center mb-6">
          <BriefcaseBusiness className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">
            Experencia laboral
          </h2>
        </div>

        <div className="flex items-center mb-6 center border-b-1 p-6">
          <input
            type="checkbox"
            name="noExperienciaLaboral"
            checked={methods.noExperienciaLaboral}
            //onChange={handleInputChange}
            className="mr-3"
          />
          <h2 className="block text-sm font-medium text-gray-700">
            No tengo experiencia laboral
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Empresa
            </label>
            <Input
              type="text"
              error={errors.nombreEmpresa?.message}
              placeholder="Nombre de la Empresa"
              {...register("nombreEmpresa", {
                required: "Nombre de la Empresa requerido",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargo
            </label>
            <Input
              type="text"
              placeholder="Tu título o puesto actual"
              error={errors.cargo?.message}
              {...register("cargo", {
                required: "Cargo requerido",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                },
              })}
            />
          </div>

          <label
            className="w-full block text-sm font-medium text-gray-700 mb-2"
            htmlFor="periodo"
            aria-describedby="periodo-description"
            data-testid="periodo-label"
            id="periodo-label"
          >
            Periodo
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label
                htmlFor="anioEntrada"
                aria-describedby="anioEntrada-description"
                data-testid="anioEntrada-label"
                id="anioEntrada-label"
              >
                Entrada
              </label>
              <Controller
                name="anioEntrada"
                rules={{ required: "Año de entrada requerido" }}
                render={({ field }) => (
                  <Select
                    placeholder="Selecciona un año"
                    options={[
                      { label: "2024", value: "2024" },
                      { label: "2023", value: "2023" },
                      { label: "2022", value: "2022" },
                      { label: "2021", value: "2021" },
                      { label: "2020", value: "2020" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.anioEntrada?.message}
                  />
                )}
              />
              <Controller
                name="mesEntrada"
                rules={{ required: "Mes de entrada requerido" }}
                render={({ field }) => (
                  <Select
                    placeholder="Selecciona un mes"
                    options={[
                      { label: "Enero", value: "Enero" },
                      { label: "Febrero", value: "Febrero" },
                      { label: "Marzo", value: "Marzo" },
                      { label: "Abril", value: "Abril" },
                      { label: "Mayo", value: "Mayo" },
                      { label: "Junio", value: "Junio" },
                      { label: "Julio", value: "Julio" },
                      { label: "Agosto", value: "Agosto" },
                      { label: "Septiembre", value: "Septiembre" },
                      { label: "Octubre", value: "Octubre" },
                      { label: "Noviembre", value: "Noviembre" },
                      { label: "Diciembre", value: "Diciembre" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.mesEntrada?.message}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <label>Salida</label>
              <Controller
                name="anioSalida"
                rules={{ required: "Año de salida requerido" }}
                render={({ field }) => (
                  <Select
                    placeholder="Selecciona un año"
                    options={[
                      { label: "2025", value: "2025" },
                      { label: "2024", value: "2024" },
                      { label: "2023", value: "2023" },
                      { label: "2022", value: "2022" },
                      { label: "2021", value: "2021" },
                      { label: "2020", value: "2020" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.anioSalida?.message}
                  />
                )}
                error={errors.anioSalida?.message}
              />
              <Controller
                name="mesSalida"
                rules={{ required: "Mes de salida requerido" }}
                render={({ field }) => (
                  <Select
                    placeholder="Selecciona un mes"
                    options={[
                      { label: "Enero", value: "Enero" },
                      { label: "Febrero", value: "Febrero" },
                      { label: "Marzo", value: "Marzo" },
                      { label: "Abril", value: "Abril" },
                      { label: "Mayo", value: "Mayo" },
                      { label: "Junio", value: "Junio" },
                      { label: "Julio", value: "Julio" },
                      { label: "Agosto", value: "Agosto" },
                      { label: "Septiembre", value: "Septiembre" },
                      { label: "Octubre", value: "Octubre" },
                      { label: "Noviembre", value: "Noviembre" },
                      { label: "Diciembre", value: "Diciembre" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.periodo?.message}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de actividades
            </label>
            <textarea
              name="descripcionAct"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe tu experiencia y objetivos profesionales..."
              error={errors.descripcionAct?.message}
              {...register("descripcionAct", {
                required: "Descripción de actividades requerida",
                maxLength: {
                  value: 500,
                  message: "Máximo 500 caracteres",
                },
              })}
            />
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Años de Experiencia
              </label>
              <Controller
                name="añosExperiencia"
                // control={control}
                rules={{ required: "Selecciona un año de experiencia" }}
                render={({ field }) => (
                  <Select
                    placeholder="Selecciona un año de experiencia"
                    options={[
                      { label: "Sin experiencia", value: "sin-experiencia" },
                      { label: "6 meses", value: "6 meses" },
                      { label: "1 año", value: "1 año" },
                      { label: "2 años", value: "2 años" },
                      { label: "3 años", value: "3 años" },
                      { label: "4 años", value: "4 años" },
                      { label: "5+ años", value: "5+ años" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.experiencia?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
