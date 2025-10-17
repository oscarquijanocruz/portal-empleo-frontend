// StepExperience.jsx - VERSIÓN MEJORADA
import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Select from "@/app/components/ui/Select";
import Modal from "@/app/components/ui/Modal";
import { 
  BriefcaseBusiness, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  CheckCircle 
} from "lucide-react";
import { Controller, set, useFormContext } from "react-hook-form";
import useNotifications from "@/app/hooks/useNotifications";

export default function StepExperience() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showWarning, showSuccess, showError } = useNotifications();

  // Watch para hacer reactivo el array de experiencias
  const experiencias = watch("experiencias") || [];
  const noExperienciaLaboral = watch("noExperienciaLaboral") || false;

  // Estados locales para el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [experienciaEditando, setExperienciaEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    cargo: "",
    anioEntrada: new Date().getFullYear().toString(),
    mesEntrada: "Enero",
    anioSalida: new Date().getFullYear().toString(),
    mesSalida: "Enero",
    descripcionAct: "",
    esActual: false
  });

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Generar años (últimos 50 años)
  const anios = Array.from(
    { length: 50 }, 
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  // Manejar checkbox "No tengo experiencia"
  const handleNoExperiencia = (e) => {
    const checked = e.target.checked;
    setValue("noExperienciaLaboral", checked);
    
    if (checked) {
      // Limpiar experiencias si marca que no tiene
      setValue("experiencias", []);
      setMostrarFormulario(false);
      clearErrors("experiencias");
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Guardar experiencia (nueva o editada)
  const guardarExperiencia = () => {
    // Validación básica
    if (!formData.nombreEmpresa.trim() || !formData.cargo.trim()) {
      setIsModalOpen(true);
      return;
    }

    const experienciasActuales = watch("experiencias") || [];

    if (experienciaEditando) {
      // Actualizar experiencia existente
      const nuevasExperiencias = experienciasActuales.map((exp) =>
        exp.id === experienciaEditando.id
          ? { ...formData, id: experienciaEditando.id }
          : exp
      );
      setValue("experiencias", nuevasExperiencias);
    } else {
      // Agregar nueva experiencia
      const nuevaExperiencia = {
        ...formData,
        id: Date.now(), // ID único
      };
      setValue("experiencias", [...experienciasActuales, nuevaExperiencia]);
    }

    // Limpiar errores de validación
    clearErrors("experiencias");

    // Resetear formulario
    limpiarFormulario();
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setFormData({
      nombreEmpresa: "",
      cargo: "",
      anioEntrada: new Date().getFullYear().toString(),
      mesEntrada: "Enero",
      anioSalida: new Date().getFullYear().toString(),
      mesSalida: "Enero",
      descripcionAct: "",
      esActual: false
    });
    setMostrarFormulario(false);
    setExperienciaEditando(null);
  };

  // Editar experiencia
  const editarExperiencia = (experiencia) => {
    setFormData({ ...experiencia });
    setExperienciaEditando(experiencia);
    setMostrarFormulario(true); 
  };

  // Eliminar experiencia
  const eliminarExperiencia = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta experiencia?")) {
      const experienciasActuales = watch("experiencias") || [];
      const nuevasExperiencias = experienciasActuales.filter(exp => exp.id !== id);
      setValue("experiencias", nuevasExperiencias);
      showSuccess("Eliminada", "La experiencia ha sido eliminada");
    }
  };

  // Calcular experiencia total
  // const calcularExperienciaTotal = () => {
  //   let totalMeses = 0;
    
  //   experiencias.forEach(exp => {
  //     const mesInicio = meses.indexOf(exp.mesEntrada) + 1;
  //     const mesFin = exp.esActual 
  //       ? new Date().getMonth() + 1 
  //       : meses.indexOf(exp.mesSalida) + 1;

  //     const fechaInicio = new Date(`${exp.anioEntrada}-${mesInicio}-01`);
  //     const fechaFin = exp.esActual 
  //       ? new Date() 
  //       : new Date(`${exp.anioSalida}-${mesFin}-01`);

  //     const mesesDiferencia = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 
  //       + (fechaFin.getMonth() - fechaInicio.getMonth());

  //     totalMeses += Math.max(0, mesesDiferencia);
  //   });

  //   const anios = Math.floor(totalMeses / 12);
  //   const meses = totalMeses % 12;
    
  //   return { anios, meses };
  // };

  // const { anios: totalAnios, meses: totalMeses } = calcularExperienciaTotal();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Experiencia Laboral
      </h1>

      <div className="border-y-1 py-6">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Complete la información"
          variant="warning-yellow"
          confirmText="Okay"
          onConfirm={() => setIsModalOpen(false)}
        >
          <p>Por favor completa al menos la empresa y el cargo.</p>
        </Modal>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Eliminar experiencia"
          variant="warning-red"
          confirmText="Confirmar"
          cancelText="Cancelar"
          onConfirm={() => setIsModalOpen(false)}
        >
          <p>¿Estás seguro de eliminar esta experiencia?</p>
        </Modal>
        
        {/* Checkbox: No tengo experiencia */}
        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg border">
          <input
            type="checkbox"
            name="noExperienciaLaboral"
            checked={noExperienciaLaboral}
            onChange={handleNoExperiencia}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mr-3"
          />
          <div>
            <h3 className="font-medium text-gray-900">
              No tengo experiencia laboral
            </h3>
            <p className="text-sm text-gray-500">
              (Opcional) Marca esta opción si aún no has trabajado
            </p>
          </div>
        </div>

        {/* Mostrar contenido solo si NO marcó "sin experiencia" */}
        {!noExperienciaLaboral && (
          <>
            {/* Resumen de experiencia total */}
            {/* {experiencias.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 rounded-lg p-2">
                    <BriefcaseBusiness className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Experiencia Total Acumulada
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {totalAnios > 0 && `${totalAnios} año${totalAnios > 1 ? 's' : ''}`}
                      {totalAnios > 0 && totalMeses > 0 && ' y '}
                      {totalMeses > 0 && `${totalMeses} mes${totalMeses > 1 ? 'es' : ''}`}
                      {totalAnios === 0 && totalMeses === 0 && 'Comienza agregando tu primera experiencia'}
                    </p>
                  </div>
                </div>
              </div>
            )} */}

            {/* Lista de experiencias */}
            <div className="space-y-4 mb-6">
              {experiencias.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="bg-blue-100 rounded-lg p-2 mt-1">
                          <BriefcaseBusiness className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {exp.cargo}
                          </h3>
                          <p className="text-blue-700 font-medium">
                            {exp.nombreEmpresa}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 ml-14">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exp.mesEntrada} {exp.anioEntrada} -{" "}
                          {exp.esActual ? (
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              Actual
                            </span>
                          ) : (
                            `${exp.mesSalida} ${exp.anioSalida}`
                          )}
                        </span>
                      </div>

                      {exp.descripcionAct && (
                        <p className="text-gray-700 text-sm ml-14 line-clamp-2">
                          {exp.descripcionAct}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        type="button"
                        onClick={() => editarExperiencia(exp)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarExperiencia(exp.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón agregar experiencia */}
            {!mostrarFormulario && (
              <button
                type="button"
                onClick={() => setMostrarFormulario(true)}
                className="w-full border-2 border-dashed border-blue-300 rounded-xl p-6 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 flex items-center justify-center gap-2 font-medium hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                {experiencias.length === 0
                  ? "Agregar Primera Experiencia"
                  : "Agregar Otra Experiencia"}
              </button>
            )}

            {/* Formulario para agregar/editar */}
            {mostrarFormulario && (
              <div className="bg-white border-2 border-blue-300 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="bg-blue-600 rounded-lg p-1.5">
                      {experienciaEditando ? (
                        <Edit2 className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </div>
                    {experienciaEditando
                      ? "Editar Experiencia"
                      : "Nueva Experiencia"}
                  </h3>
                  <button
                    type="button"
                    onClick={limpiarFormulario}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Empresa y Cargo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Empresa{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="nombreEmpresa"
                        error={errors.nombreEmpresa?.message}
                        value={formData.nombreEmpresa}
                        onChange={handleInputChange}
                        placeholder="Ej: Mentory, Restaurante, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cargo <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="cargo"
                        error={errors.cargo?.message}
                        value={formData.cargo}
                        onChange={handleInputChange}
                        placeholder="Ej: Gerente General"
                      />
                    </div>
                  </div>

                  {/* Fecha de Entrada */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Entrada
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        placeholder="Selecciona un mes"
                        options={meses.map((mes) => ({
                          label: mes,
                          value: mes,
                        }))}
                        value={formData.mesEntrada}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            mesEntrada: value,
                          }))
                        }
                      />
                      <Select
                        placeholder="Selecciona un año"
                        options={anios.map((anio) => ({
                          label: anio,
                          value: anio,
                        }))}
                        value={formData.anioEntrada}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            anioEntrada: value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Trabajo Actual */}
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                    <input
                      type="checkbox"
                      name="esActual"
                      id="esActual"
                      checked={formData.esActual}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="esActual"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Actualmente trabajo aquí
                    </label>
                  </div>

                  {/* Fecha de Salida (solo si no es actual) */}
                  {!formData.esActual && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Salida
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <Select
                          placeholder="Selecciona un mes de salida"
                          options={meses.map((mes) => ({
                            label: mes,
                            value: mes,
                          }))}
                          value={formData.mesSalida}
                          onChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              mesSalida: value,
                            }))
                          }
                        />
                        <Select
                          placeholder="Selecciona un año de salida"
                          options={anios.map((anio) => ({
                            label: anio,
                            value: anio,
                          }))}
                          value={formData.anioSalida}
                          onChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              anioSalida: value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción de Actividades
                    </label>
                    <textarea
                      name="descripcionAct"
                      value={formData.descripcionAct}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Describe tus responsabilidades, logros y metologías utilizadas..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tip: Menciona logros cuantificables y medibles
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={limpiarFormulario}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={guardarExperiencia}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {experienciaEditando ? "Actualizar" : "Guardar"}{" "}
                      Experiencia
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Estado vacío */}
            {experiencias.length === 0 && !mostrarFormulario && (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <BriefcaseBusiness className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium mb-2">
                  No hay experiencias registradas
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Comienza agregando tu primera experiencia laboral
                </p>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setMostrarFormulario(true)}
                  className="inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Primera Experiencia
                </Button>
              </div>
            )}
          </>
        )}

        {/* Mensaje cuando marca "sin experiencia" */}
        {noExperienciaLaboral && (
          <div className="text-center py-12 bg-blue-50 rounded-xl border border-blue-200">
            <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-blue-900 font-medium mb-2">
              Perfil sin experiencia laboral
            </p>
            <p className="text-sm text-blue-600">
              Puedes continuar al siguiente paso
            </p>
          </div>
        )}
      </div>
    </div>
  );
}