import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import {
  GraduationCap,
  Briefcase,
  UserCog,
  Globe,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import MiPerfilPage from "../../../candidato/mi-perfil/page";

export default function StepProfesional({ methods = MiPerfilPage() }) {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [nuevaHabilidad, setNuevaHabilidad] = useState("");
  const [nuevoIdioma, setNuevoIdioma] = useState({ idioma: "", nivel: "" });

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log("Guardando perfil:", methods.getValues());
    // Aquí se implementaría la lógica para guardar en el backend
    alert("Perfil actualizado exitosamente");
  };

  // Agregar nueva habilidad
  const agregarHabilidad = () => {
    if (
      nuevaHabilidad.trim() &&
      !methods.getValues().habilidades.includes(nuevaHabilidad.trim())
    ) {
      setMethods((prev) => ({
        ...prev,
        habilidades: [...prev.habilidades, nuevaHabilidad.trim()],
      }));
      setNuevaHabilidad("");
    }
  };

  // Eliminar habilidad
  const eliminarHabilidad = (habilidad) => {
    setMethods((prev) => ({
      ...prev,
      habilidades: prev.habilidades.filter((h) => h !== habilidad),
    }));
  };

  // Agregar nuevo idioma
  const agregarIdioma = () => {
    if (nuevoIdioma.idioma.trim() && nuevoIdioma.nivel.trim()) {
      setFormData((prev) => ({
        ...prev,
        idiomas: [...prev.idiomas, { ...nuevoIdioma }],
      }));
      setNuevoIdioma({ idioma: "", nivel: "" });
    }
  };

  // Eliminar idioma
  const eliminarIdioma = (index) => {
    setFormData((prev) => ({
      ...prev,
      idiomas: prev.idiomas.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Datos profesionales
      </h1>
        <div className="flex items-center mb-6">
          <GraduationCap className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Educación</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel Educativo
            </label>
            <select
              name="nivelEducativo"
              {...register("nivelEducativo", { required: [true, "Nivel Educativo requerido"] })}
              // value={methods.getValues().nivelEducativo}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="secundaria">Secundaria</option>
              <option value="preparatoria">Preparatoria</option>
              <option value="tecnico">Técnico</option>
              <option value="licenciatura">Licenciatura</option>
              <option value="maestria">Maestría</option>
              <option value="doctorado">Doctorado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">x
              Institución
            </label>
            <Input
              type="text"
              name="institucion"
              {...register("institucion", { required: [true, "Institución requerida"] })}
              placeholder="Nombre de la institución"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carrera/Especialidad
            </label>
            <Input
              type="text"
              {...register("institucion", { required: [true, "Institución requerida"] })}
              placeholder="Nombre de la carrera"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Graduación
            </label>
            <Input
              type="date"
              name="fechaGraduacion"
              // value={methods.getValues().fechaGraduacion}
            />
          </div>
        </div>

        {/* Habilidades */}
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <UserCog className="w-6 h-6 text-blue-900 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Habilidades</h2>
          </div>

          <div className="mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={nuevaHabilidad}
                onChange={(e) => setNuevaHabilidad(e.target.value)}
                placeholder="Agregar nueva habilidad"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), agregarHabilidad())
                }
              />
              <Button onClick={agregarHabilidad} type="button">
                Agregar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {methods.getValues().habilidades.map((habilidad, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {habilidad}
                <button
                  type="button"
                  onClick={() => eliminarHabilidad(habilidad)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* Idiomas */}
        <div className="flex items-center mb-6">
          <Globe className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Idiomas</h2>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              type="text"
              value={nuevoIdioma.idioma}
              onChange={(e) =>
                setNuevoIdioma((prev) => ({ ...prev, idioma: e.target.value }))
              }
              placeholder="Idioma"
            />
            <select
              value={nuevoIdioma.nivel}
              onChange={(e) =>
                setNuevoIdioma((prev) => ({ ...prev, nivel: e.target.value }))
              }
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Nivel</option>
              <option value="Básico">Básico</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
              <option value="Nativo">Nativo</option>
            </select>
            <Button onClick={agregarIdioma} type="button">
              Agregar
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {methods.getValues().idiomas.map((idioma, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <span className="font-medium">{idioma.idioma}</span>
              <span className="text-sm text-gray-600">{idioma.nivel}</span>
              <button
                type="button"
                onClick={() => eliminarIdioma(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Preferencias de empleo */} 
        <div className="flex items-center mb-6">
          <Briefcase className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">
            Preferencias de empleo
          </h2>
        </div>

        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilidad
              </label>
              <select
                name="disponibilidad"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="inmediata">Inmediata</option>
                <option value="1 semana">1 semana</option>
                <option value="2 semanas">2 semanas</option>
                <option value="1 mes">1 mes</option>
                <option value="2 meses">2 meses</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modalidad Preferida
              </label>
              <select
                name="modalidadPreferida"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="presencial">Presencial</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de puesto
              </label>
              <select
                name="tipoPuesto"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="categorias">Todas las categorías</option>
                <option value="tecnologia">Tecnología / Sistemas</option>
                <option value="administracion">Administración / Oficina</option>
                <option value="ventas">Ventas / Comercial</option>
                <option value="atencion">Atención a clientes</option>
                {/* <option value="finanzas">Contabilidad / Finanzas</option>
                    <option value="rh">Recursos humanos</option>
                    <option value="marketing">Marketing / Publicidad</option>
                    <option value="logistica">Logística / Transporte</option>
                    <option value="ingenieria">Ingeniería</option>
                    <option value="manufactura">Manufactura / Producción</option>
                    <option value="salud">Salud / Medicina</option>
                    <option value="educacion">Educación / Docencia</option>
                    <option value="diseno">Diseño / Arte</option>
                    <option value="legal">Legal / Jurídico</option>
                    <option value="construccion">Construcción / Arquitectura</option>
                    <option value="turismo">Hotelería / Turismo</option>
                    <option value="otros">Otros</option> */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jornada
              </label>
              <select
                name="tipoJornada"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="presencial">Tiempo completo</option>
                <option value="remoto">Medio tiempo</option>
                <option value="hibrido">
                  Prácticas profesionales / Becario
                </option>
                <option value="remoto">Temporal / Proyecto</option>
              </select>
            </div>
          </div>
      </div>
  );
}
