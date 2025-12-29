"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();
  const { register: registerUser, loginWithGoogle } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleRegister = () => {
    // Iniciar OAuth con Google especificando tipo 'candidato'
    loginWithGoogle('candidato');
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");

    try {
      // Preparar datos para el backend
      const userData = {
        correo: data.correo,
        contrasena: data.password,
        tipo_usuario: "candidato",
      };

      await registerUser(userData);
      
      // Redirigir al dashboard después de registro exitoso
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Error al registrar usuario");
      console.error("Error en registro:", err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        <div className="w-1/2 p-10">
          <h1 className="text-6xl font-bold mb-5">Registro</h1>
          <h2 className="text-4xl font-bold text-gray-500 mb-6 capitalize">
            Candidato
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
              Completarás tus datos personales después
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
            {/* PASO 1: Datos personales */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">Nombre(s):</label>
                  <input
                    type="text"
                    {...register("nombre", { required: "Nombre requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Juan"
                  />
                  {errors.nombre && (
                    <span className="text-red-500 text-sm">
                      {errors.nombre.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Apellido(s):</label>
                  <input
                    type="text"
                    {...register("apellidos", { required: "Apellido requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Pérez"
                  />
                  {errors.apellidos && (
                    <span className="text-red-500 text-sm">
                      {errors.apellidos.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Celular:</label>
                  <input
                    type="tel"
                    {...register("celular", { required: "Celular requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="(000) 000 00 00"
                  />
                  {errors.celular && (
                    <span className="text-red-500 text-sm">
                      {errors.celular.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Fecha de nacimiento:
                  </label>
                  <input
                    type="date"
                    {...register("fechaNacimiento", {
                      required: "Fecha requerida",
                    })}
                    className="w-full p-3 border rounded-lg"
                  />
                  {errors.fechaNacimiento && (
                    <span className="text-red-500 text-sm">
                      {errors.fechaNacimiento.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Ubicación:</label>
                  <input
                    type="text"
                    {...register("ubicacion", {
                      required: "Ubicación requerida",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Estado / Ciudad"
                  />
                  {errors.ubicacion && (
                    <span className="text-red-500 text-sm">
                      {errors.ubicacion.message}
                    </span>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}

            {/* PASO 2: Correo y contraseña */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Correo electrónico
                  </label>
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
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.correo && (
                    <span className="text-red-500 text-sm">
                      {errors.correo.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Ingresa una contraseña",
                        minLength: {
                          value: 8,
                          message: "Mínimo 8 caracteres",
                        },
                      })}
                      className="w-full p-3 border rounded-lg pr-10"
                      placeholder="contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas,
                    números y un carácter especial.
                  </p>
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Verificación de Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      {...register("passwordConfirm", {
                        required: "Confirma tu contraseña",
                        validate: (value) =>
                          value === watch("password") ||
                          "Las contraseñas no coinciden",
                      })}
                      className="w-full p-3 border rounded-lg pr-10"
                      placeholder="Repite la contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.passwordConfirm && (
                    <span className="text-red-500 text-sm">
                      {errors.passwordConfirm.message}
                    </span>
                  )}
                </div>
                 <div className="flex flex-col mt-2 items-start">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("terminos", { required: true })}
                      className="mr-2"
                    />
                    <span className="whitespace-nowrap">
                      Acepto Términos y Condiciones
                    </span>
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-500"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Registrando..." : "Registrarse"}
                  </button>
                </div>
                <p className="text-center text-gray-500 mt-2 text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/auth/login" className="text-blue-600">
                    Inicia Sesión
                  </a>
                </p>

                <div className="flex flex-col space-y-2 mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-100 text-gray-500">O regístrate con</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
                    <img src="/google.png" className="w-6 h-6" alt="Google" />
                    Continuar con Google
                  </button>
                </div>
              </>
            )}
          </form>
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
