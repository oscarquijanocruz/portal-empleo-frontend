import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import StepPersonalInfo from '../dashboard/candidato/mi-perfil/information-form/StepPersonalInfo';
// import StepExperience from './StepExperience';
// import StepEducation from './StepEducation';
// import StepSkills from './StepSkills';

export default function useCandidateFormStore() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // UN SOLO useForm con TODOS los campos
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      // Step 1: Datos Personales
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      // Step 2: Experiencia
      empresaActual: '',
      puestoActual: '',
      añosExperiencia: '',
      salarioDeseado: '',
      // Step 3: Educación
      nivelEstudios: '',
      institucion: '',
      carrera: '',
      añoGraduacion: '',
      // Step 4: Habilidades
      habilidadesTecnicas: [],
      idiomas: [],
      disponibilidad: '',
      comentarios: '',
    }
  });

  const { handleSubmit, trigger, getValues } = methods;

  // Validar solo los campos del paso actual
  const handleNext = async () => {
    let fieldsToValidate = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['nombre', 'apellido', 'email', 'telefono', 'fechaNacimiento'];
        break;
      case 2:
        fieldsToValidate = ['empresaActual', 'puestoActual', 'añosExperiencia'];
        break;
      case 3:
        fieldsToValidate = ['nivelEstudios', 'institucion', 'carrera'];
        break;
      case 4:
        fieldsToValidate = ['habilidadesTecnicas', 'disponibilidad'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      // Aquí puedes guardar en el backend
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
    console.log('Formulario completo:', data);
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
      localStorage.setItem('candidateFormDraft', JSON.stringify(data));
    } catch (error) {
      console.error('Error guardando:', error);
    }
  };

  const saveFinalData = async (data) => {
    try {
      // const response = await fetch('/api/candidate/save', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      console.log('Datos finales guardados:', data);
      localStorage.removeItem('candidateFormDraft');
    } catch (error) {
      console.error('Error guardando datos finales:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-1/4 h-2 mx-1 rounded ${
                step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
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
          {currentStep === 1 && <StepPersonalInfo />}
          {currentStep === 2 && <StepExperience />}
          {currentStep === 3 && <StepEducation />}
          {currentStep === 4 && <StepSkills />}

          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
            >
              Atrás
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Finalizar
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}