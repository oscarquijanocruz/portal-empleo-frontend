"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Button from "../../../components/ui/Button";
import StepPersonalInfo from "../mi-perfil/information-form/StepPersonalInfo";
import StepProfesional from "../mi-perfil/information-form/StepProfesional";
import StepExperience from "../mi-perfil/information-form/StepExperience";
import { CircleCheck, CircleChevronLeft, CircleChevronRight } from "lucide-react";
// import { useCandidateForm } from '../../../hooks/useCandidateForm';

export default function MiPerfilPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);

  // hook de useCandidateForm
  // const { 
  //   saveStepData, 
  //   saveFinalData, 
  //   loadCandidateData,
  //   saveDraft,
  //   loadDraft,
  //   clearDraft 
  // } = useCandidateForm();

  const methods= useForm({
    mode: "onChange",
    defaultValues: {
      // Step 1: Datos Personales
      nombre: "Oscar Omar",
      apellido: "Quijano",
      email: "oscar.quijano@gmail.com",
      telefono: "+52 55 1234 5678",
      fechaNacimiento: "1995-05-15",
      genero: "",
      estadoCivil: "",
      rol: "candidate",
      createdAt: new Date(),
      updatedAt: new Date(),
      // Ubicación
      ciudad: "",
      estado: "",
      codigoPostal: "",

      // Step 2: Experiencia
      nivelEducativo: "licenciatura",
      institucion: "Universidad Nacional Autónoma de México",
      carrera: "Ingeniería en Sistemas Computacionales",
      fechaGraduacion: "2018-06-15",
      habilidades: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
      idiomas: [
        { idioma: "Español", nivel: "Nativo" },
        { idioma: "Inglés", nivel: "Intermedio" },
      ],
      // Preferencias de empleo
      disponibilidad: "inmediata",
      modalidadPreferida: "remoto",
      tipoPuesto: [
        "Tecnología / Sistemas / Programación",
        "Administración / Oficina",
        "Ventas / Comercial",
        "Atención a clientes / Call center",
        "Contabilidad / Finanzas",
        "Recursos humanos",
        "Marketing / Publicidad / Comunicación",
        "Logística / Transporte / Almacén",
        "Ingeniería",
        "Manufactura / Producción / Operarios",
        "Salud / Medicina / Farmacia",
        "Educación / Docencia",
        "Diseño / Arte / Multimedia",
        "Legal / Jurídico",
        "Construcción / Arquitectura",
        "Hotelería / Turismo / Restaurantes",
        "Otros / Generales",
      ],
      tipoJornada: [
        "Tiempo completo",
        "Medio tiempo",
        "Prácticas profesionales / Becario",
        "Temporal / Proyecto",
      ],

      // Step 3: Experiencia Laboral
      nombreEmpresa: "Mentory",
      cargo: "Gerente",
      descripcionAct:
        "Desarrollador con 3 años de experiencia en React y Next.js, apasionado por crear interfaces de usuario intuitivas y eficientes.",
      periodo: [
        {
          anioEntrada: "2024",
          mesEntrada: ["Enero", "Febrero", "Marzo", "Abril"],
          anioSalida: "2025",
          mesSalida: ["Enero", "Febrero", "Marzo", "Abril"],
        },
      ],
    },
  });

  const { handleSubmit, trigger, getValues } = methods;

  // Validar solo los campos del paso actual
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
          "Estado",
          "codigPostal"
        ];
        break;
      case 2:
        fieldsToValidate = ["empresaActual", "puestoActual", "añosExperiencia"];
        break;
      case 3:
        fieldsToValidate = ["nivelEstudios", "institucion", "carrera"];
        break;
      case 4:
        fieldsToValidate = ["habilidadesTecnicas", "disponibilidad"];
        break;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      // Aquí se guarda en el backend
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
    // Aquí envías todo al backend
    await saveFinalData(data);
  };

  // Función para guardar cada paso
  const saveStepData = async (step, data) => {
    try {
      // Ejemplo con fetch a tu API
      // const response = await fetch('/api/candidate/save-step', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ step, data })
      // });
      console.log(`Guardando paso ${step}:`, data);

      // También puedes guardar en localStorage
      localStorage.setItem("candidateFormDraft", JSON.stringify(data));
    } catch (error) {
      console.error("Error guardando:", error);
    }
  };

  const saveFinalData = async (data) => {
    try {
      // const response = await fetch('/api/candidate/save', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      console.log("Datos finales guardados:", data);
      localStorage.removeItem("candidateFormDraft");
    } catch (error) {
      console.error("Error guardando datos finales:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Perfil</h1>
        <p className="text-gray-600">
          Actualiza tu información personal y profesional
        </p>
      </div>
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 items-center align-center">
          <CircleCheck
            size={28}
            className="text-blue-900 transition-colors"
            // fill={favorites.has(job.id) ? 'currentColor' : 'none'}
          />
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-1/4 h-1 mx-1 rounded ${
                step <= currentStep
                  ? "bg-blue-900"
                  : "bg-gray-200"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Renderizar el paso actual */}
          {currentStep === 1 && <StepPersonalInfo methods={methods} />}
          {currentStep === 2 && <StepProfesional methods={methods} />}
          {currentStep === 3 && <StepExperience />}
          {currentStep === 4 && <StepDoc />}

          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant={currentStep === 1 ? "disabled" : "secondary"}
              onClick={handleBack}
            >
              <CircleChevronLeft className="w-4 h-4 mr-2"/>
              Atrás
            </Button>

            {currentStep < 4 ? (
              <Button type="button" variant={"primary"} onClick={handleNext}>
                Siguiente
                <CircleChevronRight className="w-4 h-4 ml-2"/>
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Finalizar
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
