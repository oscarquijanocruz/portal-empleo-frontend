"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../../components/ui/Button";
import StepPersonalInfo from "../mi-perfil/information-form/StepPersonalInfo";
import StepProfesional from "../mi-perfil/information-form/StepProfesional";
import StepExperience from "../mi-perfil/information-form/StepExperience";
import StepDoc from "../mi-perfil/information-form/StepDoc";
import { CircleCheck, CircleChevronLeft, CircleChevronRight } from "lucide-react";

export default function MiPerfilPage() {
  const [currentStep, setCurrentStep] = useState(1);

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

      // Step 2: Experiencia
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
      tipoJornada: [
        "Tiempo completo",
        "Medio tiempo",
        "Prácticas profesionales / Becario",
        "Temporal / Proyecto",
        "Fines de semana",
      ],

      // Step 3: Experiencia Laboral
      nombreEmpresa: "Mentory",
      cargo: "Gerente",
      descripcionAct:
        "Desarrollador con 3 años de experiencia en React y Next.js, apasionado por crear interfaces de usuario intuitivas y eficientes.",
      anioEntrada: 2024,
      mesEntrada: 1,
      anioSalida: 2020,
      mesSalida: "Octubre",
      añosExperiencia: 1.0,

      // Step 4: Documentos
      fotoPerfil: null,
      curriculumVitae: null,
      portafolio: null,
      notificaciones: false,
      perfilPublico: true,
      recibirOfertas: false,
    },
  });

  const { handleSubmit, trigger, getValues } = methods;

  const handleNext = async () => {
    let fieldsToValidate = [];

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
          "codigPostal",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "nivelEducativo",
          "institucion",
          "carrera",
          "fechaEgreso",
          "habilidadesDuras",
          "habilidadesBlandas",
          "idiomas",
          "disponibilidad",
          "modalidadPreferida",
          "tipoPuesto",
          "tipoJornada",
        ];
        break;
      case 3:
        fieldsToValidate = [
          "nombreEmpresa",
          "cargo",
          "descripcionAct",
          "anioEntrada",
          "mesEntrada",
          "anioSalida",
          "mesSalida",
          "añosExperiencia",
        ];
        break;
      case 4:
        fieldsToValidate = [
          "fotoPerfil",
          "curriculumVitae",
          "portfolio",
          "notificaciones",
          "perfilPublico",
          "recibirOfertas",
        ];
        break;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      await saveStepData(currentStep, getValues());

      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log("Formulario completo:", data);
    await saveFinalData(data);
  };

  const saveStepData = async (step, data) => {
    try {
      console.log(`Guardando paso ${step}:`, data);
      window.candidateFormDraft = data;
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  const saveFinalData = async (data) => {
    try {
      console.log("Datos finales guardados:", data);
      delete window.candidateFormDraft;
    } catch (error) {
      console.error("Error guardando datos finales:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 sm:px-6 lg:px-8 py-8 ">
      {/* Contenedor responsive con ancho máximo y mínimo */}
      <div className="w-full min-w-[320px] max-w-[729px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Editar Perfil
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Actualiza tu información personal y profesional
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 items-center">
            <CircleCheck
              size={28}
              className="text-blue-900 transition-colors flex-shrink-0"
            />
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-1/4 h-1 mx-1 rounded ${
                  step <= currentStep ? "bg-blue-900" : "bg-gray-200"
                } transition-colors duration-500`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Paso {currentStep} de 4
          </p>
        </div>

        {/* FormProvider pasa el context a todos los hijos */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Renderizar el paso actual */}
            {currentStep === 1 && <StepPersonalInfo />}
            {currentStep === 2 && <StepProfesional methods={methods} />}
            {currentStep === 3 && <StepExperience methods={methods} />}
            {currentStep === 4 && <StepDoc methods={methods} />}

            {/* Botones de navegación - Responsive */}
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