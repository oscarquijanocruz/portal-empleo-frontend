"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // para validar campos específicos
  } = useForm();

  const router = useRouter();
  const { register: registerUser, loginWithGoogle } = useAuth();
  const [step, setStep] = useState(1); // control de pasos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleRegister = () => {
    // Iniciar OAuth con Google especificando tipo 'universidad'
    loginWithGoogle('universidad');
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");

    try {
      // Preparar datos para el backend
      const userData = {
        correo: data.correo,
        contrasena: data.password,
        tipo_usuario: "universidad",
      };

      await registerUser(userData);
      
      // Redirigir al dashboard después de registro exitoso
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Error al registrar universidad");
      console.error("Error en registro:", err);
    } finally {
      setLoading(false);
    }
  });

  // Función para avanzar validando los campos del paso actual
  const handleNext = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger([
        "nombreInstitucion",
        "campus",
        "direccion",
        "ubicacion",
      ]);
    } else if (step === 2) {
      valid = await trigger([
        "nombreResponsable",
        "apellidoResponsable",
        "puestoResponsable",
        "telefonoResponsable",
        "correoResponsable",
      ]);
    }

    if (valid) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        <div className="w-1/2 p-10">
          <h1 className="text-6xl font-bold mb-5">Registro</h1>
          <h2 className="text-4xl font-bold text-gray-500 mb-6 capitalize">
            Universidad
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Opción rápida de Google - Siempre visible antes del formulario */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 shadow-sm"
            >
              <img src="/google.png" className="w-6 h-6" alt="Google" />
              Registrarse rápido con Google
            </button>
            <p className="text-center text-gray-500 text-sm mt-2">
              Completarás los datos de tu institución después
            </p>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">O registra todos los datos ahora</span>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Datos de la universidad */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">Nombre de la institución:</label>
                  <input
                    type="text"
                    {...register("nombreInstitucion", { required: "Nombre requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Universidad Interserrana"
                  />
                  {errors.nombreInstitucion && (
                    <span className="text-red-500 text-sm h-1 block">{errors.nombreInstitucion.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Campus:</label>
                  <input
                    type="text"
                    {...register("campus", { required: "Campus requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Chilchotla"
                  />
                  {errors.campus && (
                    <span className="text-red-500 text-sm h-1 block">{errors.campus.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Dirección:</label>
                  <input
                    type="text"
                    {...register("direccion", { required: "Dirección requerida" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Calle Principal #123"
                  />
                  {errors.direccion && (
                    <span className="text-red-500 text-sm h-1 block">{errors.direccion.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Ubicación:</label>
                  <input
                    type="text"
                    {...register("ubicacion", { required: "Ubicación requerida" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Estado / Ciudad"
                  />
                  {errors.ubicacion && (
                    <span className="text-red-500 text-sm h-1 block">{errors.ubicacion.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Sitio web (opcional):</label>
                  <input
                    type="url"
                    {...register("sitioWeb")}
                    className="w-full p-3 border rounded-lg"
                    placeholder="https://www.universidad.com"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}

            {/*Datos del responsable */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">Nombre(s) del responsable:</label>
                  <input
                    type="text"
                    {...register("nombreResponsable", { required: "Nombre requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Juan"
                  />
                  {errors.nombreResponsable && (
                    <span className="text-red-500 text-sm h-1 block">{errors.nombreResponsable.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Apellido(s) del responsable:</label>
                  <input
                    type="text"
                    {...register("apellidoResponsable", { required: "Apellido requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Pérez"
                  />
                  {errors.apellidoResponsable && (
                    <span className="text-red-500 text-sm h-1 block">{errors.apellidoResponsable.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Puesto:</label>
                  <input
                    type="text"
                    {...register("puestoResponsable", { required: "Puesto requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Director"
                  />
                  {errors.puestoResponsable && (
                    <span className="text-red-500 text-sm h-1 block">{errors.puestoResponsable.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Teléfono:</label>
                  <input
                    type="tel"
                    {...register("telefonoResponsable", { required: "Teléfono requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="(000) 000 00 00"
                  />
                  {errors.telefonoResponsable && (
                    <span className="text-red-500 text-sm h-1 block">{errors.telefonoResponsable.message}</span>
                  )}
                </div>


                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-600"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}

            {/* Correo y contraseña */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">Correo electrónico:</label>
                  <input
                    type="email"
                    {...register("correo", { 
                      required: "Correo requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico no válido"
                      }
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="correo@universidad.com"
                  />
                  {errors.correo && (
                    <span className="text-red-500 text-sm h-1 block">{errors.correo.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Contraseña:</label>
                  <input
                    type="password"
                    {...register("password", { required: "Contraseña requerida" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="********"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm h-1 block">{errors.password.message}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-600"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Registrando..." : "Registrar"}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O</span>
            </div>
          </div>

          {/* Botón de Google */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span className="font-medium">Registrarse con Google</span>
          </button>
        </div>

        <div
          className="w-1/2 flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        >
          <img src="/logo.png" alt="Logo" className="w-90 h-90 relative z-10" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
