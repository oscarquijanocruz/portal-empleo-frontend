import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { GraduationCap, Briefcase, UserCog, Globe, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "@/app/components/ui/Select";
import { idiomasDisponibles, nivelesIdioma } from "@/app/constants/language.js";
import { useNotification } from "@/app/contexts/NotificationContext";

export default function StepProfesional({ methods }) {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
    watch,
  } = useFormContext();
  const { notify } = useNotification();
  const [nuevaHabilidadDura, setNuevaHabilidadDura] = useState("");
  const [nuevaHabilidadBlanda, setNuevaHabilidadBlanda] = useState("");
  const [noAplicaCarrera, setNoAplicaCarrera] = useState(false);
  const [noAplicaFechaEgreso, setNoAplicaFechaEgreso] = useState(false);

  // Watch para hacer reactivo el componente cuando cambien los arrays
  const habilidadesDuras = watch("habilidadesDuras") || [];
  const habilidadesBlandas = watch("habilidadesBlandas") || [];
  const idiomas = watch("idiomas") || [];

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log("Guardando perfil:", getValues());
    // Aquí se implementaría la lógica para guardar en el backend
    alert("Perfil actualizado exitosamente");
  };

  // Agregar nueva habilidad dura
  const agregarHabilidadDura = () => {
    if (nuevaHabilidadDura.trim()) {
      const currentHabilidadesDuras = getValues("habilidadesDuras") || [];
      if (!currentHabilidadesDuras.includes(nuevaHabilidadDura.trim())) {
        setValue("habilidadesDuras", [
          ...currentHabilidadesDuras,
          nuevaHabilidadDura.trim(),
        ]);
        setNuevaHabilidadDura("");
      }
    }
  };

  // Agregar nueva habilidad blanda
  const agregarHabilidadBlanda = () => {
    if (nuevaHabilidadBlanda.trim()) {
      const currentHabilidadesBlandas = getValues("habilidadesBlandas") || [];
      if (!currentHabilidadesBlandas.includes(nuevaHabilidadBlanda.trim())) {
        setValue("habilidadesBlandas", [
          ...currentHabilidadesBlandas,
          nuevaHabilidadBlanda.trim(),
        ]);
        setNuevaHabilidadBlanda("");
      }
    }
  };

  // Eliminar habilidad dura
  const eliminarHabilidadDura = (habilidad) => {
    const currentHabilidadesDuras = getValues("habilidadesDuras") || [];
    setValue(
      "habilidadesDuras",
      currentHabilidadesDuras.filter((h) => h !== habilidad)
    );
  };

  // Eliminar habilidad blanda
  const eliminarHabilidadBlanda = (habilidad) => {
    const currentHabilidadesBlandas = getValues("habilidadesBlandas") || [];
    setValue(
      "habilidadesBlandas",
      currentHabilidadesBlandas.filter((h) => h !== habilidad)
    );
  };

  // Agregar nuevo idioma
  const agregarIdioma = () => {
    const idioma = getValues("idioma");
    const nivel = getValues("nivel");

    if (!idioma || !nivel) return;

    const currentIdiomas = getValues("idiomas") || [];

    // Verificar que no esté duplicado
    const yaExiste = currentIdiomas.some((i) => i.idioma === idioma);

    if (yaExiste) {
      notify.error("Idioma duplicado", "Este idioma ya está agregado, por favor selecciona otro");
      return;
    }

    setValue("idiomas", [...currentIdiomas, { idioma, nivel }]);
    setValue("idioma", "");
    setValue("nivel", "");
    notify.success("Idioma agregado", "¡Se ha agregado el idioma!");
  };

  // Eliminar idioma
  const eliminarIdioma = (index) => {
    const currentIdiomas = getValues("idiomas") || [];
    setValue(
      "idiomas",
      currentIdiomas.filter((_, i) => i !== index)
    );
  };

  const handleNoAplicaCarrera = (e) => {
    const checked = e.target.checked;
    setNoAplicaCarrera(checked);
    if (checked) {
      setValue("carrera", ""); // Limpia el valor
      clearErrors("carrera"); // Limpia los errores
    }
  };

  const handleNoAplicaFechaEgreso = (e) => {
    const checked = e.target.checked;
    setNoAplicaFechaEgreso(checked);
    if (checked) {
      setValue("fechaEgreso", ""); // Limpia el valor
      clearErrors("fechaEgreso"); // Limpia los errores
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Datos profesionales
      </h1>
      <div className="border-y-1 pt-6">
        <div className="flex items-center mb-6">
          <GraduationCap className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Educación</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Último nivel de estudios o actualmente estudiando
            </label>
            <Controller
              name="nivelEducativo"
              // control={control}
              rules={{ required: "Selecciona un nivel de educación" }}
              render={({ field }) => (
                <Select
                  placeholder="Selecciona un nvel de educación"
                  options={[
                    { label: "Secundaria", value: "secundaria" },
                    { label: "Preparatoria", value: "preparatoria" },
                    { label: "Técnico", value: "tecnico" },
                    { label: "Licenciatura", value: "licenciatura" },
                    { label: "Maestría", value: "maestria" },
                    { label: "Doctorado", value: "doctorado" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.nivelEducativo?.message}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institución
            </label>
            <Input
              type="text"
              placeholder="Nombre de la institución"
              {...register("institucion", {
                required: "Institución requerida",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                },
              })}
              error={errors.institucion?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carrera/Especialidad
            </label>
            <Input
              type="text"
              {...register("carrera", {
                required: !noAplicaCarrera
                  ? "Carrera/Especialidad requerida"
                  : "",
                maxLength: {
                  value: 50,
                  message: "Máximo 50 caracteres",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                },
              })}
              placeholder="Nombre de la carrera/especialidad"
              error={!noAplicaCarrera && errors.carrera?.message}
              disabled={noAplicaCarrera}
            />
            <div className="flex items-center gap-2 mt-1 p-1 align-center">
              <input
                type="checkbox"
                checked={noAplicaCarrera}
                onChange={handleNoAplicaCarrera}
                name="noAplicaCarrera"
                className="border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500">No aplica</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Egreso
            </label>
            <Input
              type="date"
              error={!noAplicaFechaEgreso && errors.fechaEgreso?.message}
              disabled={noAplicaFechaEgreso}
              {...register("fechaEgreso", {
                required: !noAplicaFechaEgreso
                  ? "Fecha  de egreso requerido"
                  : false,
                pattern: {
                  value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                  message: "Fecha de egreso no válida",
                },
              })}
            />
            <div className="flex items-center gap-2 mt-1 p-1 align-center">
              <input
                type="checkbox"
                name="noAplicaCarrera"
                checked={noAplicaFechaEgreso}
                onChange={handleNoAplicaFechaEgreso}
                className="border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500">No aplica</p>
            </div>
          </div>
        </div>

        {/* Habilidades */}
        <div className="mb-6">
          <div className="flex items-center mb-6 border-t-1 pt-6">
            <UserCog className="w-6 h-6 text-blue-900 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Habilidades</h2>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h2 className="block text-md font-medium text-gray-700">
                Habilidades duras (Hard Skills)
              </h2>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={nuevaHabilidadDura}
                onChange={(e) => setNuevaHabilidadDura(e.target.value)}
                placeholder="Agregar nueva habilidad técnica o profesional"
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), agregarHabilidadDura())
                }
              />
              <Button onClick={agregarHabilidadDura} type="button">
                Agregar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {habilidadesDuras.map((habilidadDura, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {habilidadDura}
                <button
                  type="button"
                  onClick={() => eliminarHabilidadDura(habilidadDura)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h2 className="block text-md font-medium text-gray-700">
              Habilidades blandas (Soft Skills)
            </h2>
          </div>

          <div className="mb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={nuevaHabilidadBlanda}
                onChange={(e) => setNuevaHabilidadBlanda(e.target.value)}
                placeholder="Agregar nueva habilidad blanda"
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), agregarHabilidadBlanda())
                }
              />
              <Button onClick={agregarHabilidadBlanda} type="button">
                Agregar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {habilidadesBlandas.map((habilidadBlanda, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {habilidadBlanda}
                <button
                  type="button"
                  onClick={() => eliminarHabilidadBlanda(habilidadBlanda)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Idiomas */}
        <div className="flex items-center mb-6 border-t-1 pt-6">
          <Globe className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Idiomas</h2>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Controller
              name="idioma"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Idioma"
                  options={idiomasDisponibles}
                  error={errors.idioma?.message}
                />
              )}
            />
            <Controller
              name="nivel"
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Selecciona un nivel"
                  options={nivelesIdioma}
                  error={errors.nivel?.message}
                />
              )}
            />
            <Button onClick={agregarIdioma} type="button">
              Agregar
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {idiomas.map((idioma, index) => (
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
        <div className="flex items-center mb-6 border-t-1 pt-6">
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
            <Controller
              name="disponibilidad"
              rules={{ required: "Selecciona una disponibilidad" }}
              render={({ field }) => (
                <Select
                  placeholder="Disponibilidad"
                  options={[
                    { label: "Inmediata", value: "inmediata" },
                    { label: "1 semana", value: "1 semana" },
                    { label: "2 semanas", value: "2 semanas" },
                    { label: "1 mes", value: "1 mes" },
                    { label: "2 meses", value: "2 meses" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.disponibilidad?.message}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modalidad Preferida
            </label>
            <Controller
              name="modalidadPreferida"
              render={({ field }) => (
                <Select
                  placeholder="Modalidad Preferida"
                  options={[
                    { label: "Presencial", value: "presencial" },
                    { label: "Remoto", value: "remoto" },
                    { label: "Híbrido", value: "hibrido" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de puesto
            </label>
            <Controller
              name="tipoPuesto"
              rules={{ required: "Selecciona un tipo de puesto" }}
              render={({ field }) => (
                <Select
                  placeholder="Tipo de puesto"
                  rules={{ required: "Selecciona un tipo de puesto" }}
                  options={[
                    { label: "Operativo", value: "operativo" },
                    { label: "Ejecutivo", value: "ejecutivo" },
                    { label: "Supervisor", value: "supervisor" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.tipoPuesto?.message}
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jornada
            </label>
            <Controller
              name="tipoJornada"
              rules={{ required: "Selecciona una jornada" }}
              render={({ field }) => (
                <Select
                  placeholder="Tipo de jornada"
                  rules={{ required: "Selecciona una jornada" }}
                  options={[
                    { label: "Tiempo completo", value: "tiempoCompleto" },
                    { label: "Medio tiempo", value: "medioTiempo" },
                    {
                      label: "Prácticas profesionales / Becario",
                      value: "practicasProfesionales",
                    },
                    { label: "Temporal / Proyecto", value: "temporalProyecto" },
                    { label: "Fines de semana", value: "finesDeSemana" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.tipoJornada?.message}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
