// page.jsx - ACTUALIZADO
"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNotification } from "@/app/contexts/NotificationContext";
import Button from "../../../components/ui/Button";
import StepPersonalInfo from "../mi-perfil/information-form/StepPersonalInfo";
import StepProfesional from "../mi-perfil/information-form/StepProfesional";
import StepExperience from "../mi-perfil/information-form/StepExperience";
import StepDoc from "../mi-perfil/information-form/StepDoc";
import {
  CircleCheck,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";

export default function MiPerfilPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { notify } = useNotification();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      // Step 1: Datos Personales
      nombre: "Oscar Omar",
      apellido: "Quijano",
      email: "oscar.quijano@gmail.com",
      telefono: "5512345678",
      fechaNacimiento: new Date("1995-05-15"),
      genero: "masculino",
      estadoCivil: "casado",
      rol: "candidate",
      createdAt: new Date(),
      updatedAt: new Date(),
      ciudad: "Puebla",
      estado: "Puebla",
      codigoPostal: "24070",

      // Step 2: Educación y Profesional
      nivelEducativo: "licenciatura",
      institucion: "Universidad Nacional Autónoma de México",
      carrera: "Ingeniería en Sistemas Computacionales",
      fechaEgreso: new Date("2025-08-01"),
      habilidadesDuras: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
      habilidadesBlandas: [
        "Comunicación",
        "Gestión de proyectos",
        "Liderazgo",
        "Organización",
        "Trabajo en equipo",
      ],
      idiomas: [
        { idioma: "Español", nivel: "Nativo" },
        { idioma: "Inglés", nivel: "Intermedio" },
      ],
      disponibilidad: "inmediata",
      modalidadPreferida: "remoto",
      tipoPuesto: "operativo",
      tipoJornada: "tiempoCompleto",

      // Step 3: Experiencia Laboral - NUEVA ESTRUCTURA
      noExperienciaLaboral: false, // Checkbox para indicar sin experiencia
      experiencias: [
        // Array de experiencias
        // {
        //   id: 1,
        //   nombreEmpresa: "Mentory",
        //   cargo: "Desarrollador Frontend",
        //   descripcionAct:
        //     "Desarrollo de aplicaciones web con React y Next.js, implementación de componentes reutilizables.",
        //   anioEntrada: "2022",
        //   mesEntrada: "Marzo",
        //   anioSalida: "2024",
        //   mesSalida: "Diciembre",
        //   esActual: false,
        // },
        // {
        //   id: 2,
        //   nombreEmpresa: "Tech Solutions",
        //   cargo: "Desarrollador Junior",
        //   descripcionAct:
        //     "Soporte y mantenimiento de aplicaciones web, corrección de bugs.",
        //   anioEntrada: "2020",
        //   mesEntrada: "Enero",
        //   anioSalida: "2022",
        //   mesSalida: "Febrero",
        //   esActual: false,
        // },
      ],

      // Step 4: Documentos
      fotoPerfil: null,
      curriculumVitae: null,
      portafolio: null,
      notificaciones: false,
      perfilPublico: true,
      recibirOfertas: false,
    },
  });

  const { handleSubmit, trigger, getValues, watch } = methods;

  const stepNames = {
    1: "Información básica",
    2: "Datos profesionales",
    3: "Experiencia laboral",
    4: "Documentos",
  };

  // Validación personalizada para experiencias
  const validarExperiencias = () => {
    const noExperiencia = watch("noExperienciaLaboral");
    const experiencias = watch("experiencias");

    // Si no tiene experiencia, está OK
    if (noExperiencia) {
      return true;
    }

    // Si no marcó "sin experiencia", debe tener al menos 1
    if (!experiencias || experiencias.length === 0) {
      notify.error(
        "Completar información",
        "Por favor agrega al menos una experiencia laboral o marca 'No tengo experiencia laboral'"
      );
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    let esValido = true;

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "nombre",
          "apellido",
          "email",
          "telefono",
          "fechaNacimiento",
          "genero",
          "estadoCivil",
          "ciudad",
          "estado",
          "codigoPostal",
        ];
        break;

      case 2:
        fieldsToValidate = [
          "nivelEducativo",
          "institucion",
          "carrera",
          "fechaEgreso",
          "disponibilidad",
          "modalidadPreferida",
          "tipoPuesto",
          "tipoJornada",
        ];
        break;

      case 3:
        // Validación custom para experiencias
        esValido = validarExperiencias();
        if (!esValido) return;
        break;

      case 4:
        fieldsToValidate = [
          "curriculumVitae", // Obligatorio
        ];
        break;
    }

    // Validar campos con react-hook-form
    if (fieldsToValidate.length > 0) {
      esValido = await trigger(fieldsToValidate);
    }
    if (esValido) {
      await saveStepData(currentStep, getValues());

      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      notify.error(
        "Completa la información",
        "Por favor completa todos los campos requeridos"
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log("✅ Formulario completo:", data);

    // Ver las experiencias específicamente
    console.log("📋 Experiencias laborales:", data.experiencias);
    console.log("🎯 Total de experiencias:", data.experiencias?.length || 0);

    await saveFinalData(data);
  };

  const saveStepData = async (step, data) => {
    try {
      console.log(`💾 Guardando paso ${step}:`, data);
      // Aquí harías tu llamada al backend
      // await fetch('/api/candidate/save-step', { ... })

      // Guardar en memoria temporal (simulando backend)
      window.candidateFormDraft = data;
    } catch (error) {
      console.error("❌ Error guardando:", error);
    }
  };

  const saveFinalData = async (data) => {
    try {
      console.log("✅ Guardando datos finales:", data);
      // Aquí harías tu llamada final al backend
      // await fetch('/api/candidate/save-final', { ... })

      // Limpiar draft
      delete window.candidateFormDraft;

      notify.success(
        "Perfil guardado exitosamente",
        "Se ha guardado el perfil de candidato exitosamente"
      );
    } catch (error) {
      notify.error("Error", "No se pudieron guardar los datos");
      console.error("❌ Error guardando datos finales:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 sm:px-6 lg:py-8">
      {/* Barra de progreso */}
      <div className="sticky top-7">
        {[1, 2, 3, 4].map((step) => (
          <ul
            key={step}
            className="grid grid-cols-1 space-y-0.5 text-xs font-semibold relative"
          >
            <div
              className={`flex items-center gap-3 ${
                step <= currentStep ? "text-green-600" : "text-gray-400"
              }`}
            >
              <CircleCheck
                className={`w-3 h-3 ${
                  step <= currentStep
                    ? "w-4.5 h-4.5 fill-green-600 text-white"
                    : "fill-gray-400 text-gray-400"
                } transition-all duration-400`}
              />
              <p>{stepNames[step]}</p>
            </div>
            <li className={`flex py-0.5 ${step === 4 ? "hidden" : ""}`}>
              <div
                className={`h-12 w-1 mx-1 rounded ${
                  step + 1 <= currentStep ? "bg-green-600" : "bg-gray-200"
                } transition-all duration-400`}
              />
            </li>
          </ul>
        ))}
      </div>

      <div className="w-full min-w-[320px] max-w-[729px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Editar Perfil
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Actualiza tu información personal y profesional
          </p>
        </div>

        {/* FormProvider pasa el context a todos los hijos */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Renderizar el paso actual */}
            {currentStep === 1 && <StepPersonalInfo />}
            {currentStep === 2 && <StepProfesional methods={methods} />}
            {currentStep === 3 && <StepExperience />}
            {currentStep === 4 && <StepDoc methods={methods} />}

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row justify-start gap-4 sm:gap-6 mt-8">
              <Button
                type="button"
                variant={currentStep === 1 ? "disabled" : "secondary"}
                onClick={handleBack}
                className="w-full sm:w-32 text-center"
                disabled={currentStep === 1}
              >
                <CircleChevronLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  className="w-full sm:w-48 text-center"
                >
                  Siguiente
                  <CircleChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Finalizar
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}