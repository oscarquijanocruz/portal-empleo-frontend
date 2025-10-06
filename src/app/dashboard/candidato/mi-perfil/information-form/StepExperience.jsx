import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { BriefcaseBusiness } from "lucide-react";
import { useForm } from "react-hook-form";
import MiPerfilPage from "../../../candidato/mi-perfil/page";

export default function StepProfesional({ methods = MiPerfilPage() }) {
  const {
    register,
    formState: { errors },
  } = useForm();

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log("Guardando perfil:", methods.getValues());
    // Aquí se implementaría la lógica para guardar en el backend
    alert("Perfil actualizado exitosamente");
  };

  return (
    <div>
      {/* <form onSubmit={guardarPerfil}> */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Experiencia Laboral
      </h1>
      <div className="flex items-center mb-6">
        <BriefcaseBusiness className="w-6 h-6 text-blue-900 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">
          Experencia laboral
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Empresa
          </label>
          <Input
            type="text"
            name="nombreEmpresa"
            placeholder="Tu título o puesto actual"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo
          </label>
          <Input
            type="text"
            name="cargo"
            placeholder="Tu título o puesto actual"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Periodo
          </label>
          <label>Entrada</label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="anioEntrada"
            id="anioEntrada"
          >
            <option value="2024">2024</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="periodo"
            id="periodo"
          >
            <option value="Enero">Enero</option>
            <option value="Febrero">Febrero</option>
          </select>
          <label>Salida</label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="anioSalida"
            id="anioSalida"
          >
            <option value="Enero">2025</option>
          </select>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="periodo"
            id="periodo"
          >
            <option value="Enero">Enero</option>
            <option value="Febrero">Febrero</option>
          </select>
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
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Años de Experiencia
            </label>
            <select
              name="experiencia"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sin-experiencia">Sin experiencia</option>
              <option value="1 año">1 año</option>
              <option value="2 años">2 años</option>
              <option value="3 años">3 años</option>
              <option value="4 años">4 años</option>
              <option value="5+ años">5+ años</option>
            </select>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}
