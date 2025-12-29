"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function RegisterEmpresa() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const router = useRouter();
  const { registerEmpresa, loginWithGoogle } = useAuth();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleRegister = () => {
    // Iniciar OAuth con Google especificando tipo 'empresa'
    loginWithGoogle('empresa');
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");

    try {
      // Preparar datos completos para el backend
      const empresaData = {
        // Datos de autenticación
        correo: data.correo,
        contrasena: data.password,
        // Datos de la empresa
        nombre_empresa: data.nombreEmpresa,
        sector: data.sector,
        tamano: data.tamano,
        rfc: data.rfc,
        sitio_web: data.sitioWeb || null,
        descripcion: data.descripcion,
        // Datos del responsable
        nombre_responsable: data.nombreResponsable,
        apellido_responsable: data.apellidoResponsable,
        puesto_responsable: data.puestoResponsable,
        telefono: data.telefonoResponsable,
      };

      await registerEmpresa(empresaData);
      
      // Redirigir al dashboard de empresa después de registro exitoso
      router.push("/dashboard/empresa");
    } catch (err) {
      setError(err.message || "Error al registrar empresa");
      console.error("Error en registro:", err);
    } finally {
      setLoading(false);
    }
  });

  const handleNext = async () => {
    let valid = false;

    if (step === 1) {
      valid = await trigger(["nombreEmpresa", "sector", "tamano", "rfc"]);
    } else if (step === 2) {
      valid = await trigger([
        "nombreResponsable",
        "apellidoResponsable",
        "puestoResponsable",
        "telefonoResponsable",
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
            Empresa
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
              Completarás los datos de tu empresa después
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
            {/* Paso 1: Datos de la empresa */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Nombre de la empresa:
                  </label>
                  <input
                    type="text"
                    {...register("nombreEmpresa", {
                      required: "Nombre de empresa requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ejemplo S.A. de C.V."
                  />
                  {errors.nombreEmpresa && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.nombreEmpresa.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Sector:</label>
                  <select
                    {...register("sector", { required: "Sector requerido" })}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Selecciona un sector</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="salud">Salud</option>
                    <option value="educacion">Educación</option>
                    <option value="finanzas">Finanzas</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.sector && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.sector.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Tamaño de la empresa:
                  </label>
                  <input
                    type="text"
                    {...register("tamano", {
                      required: "Tamaño de empresa requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="micro, pequeña, mediana, grande"
                  />
                  {errors.tamano && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.tamano.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">RFC:</label>
                  <input
                    type="text"
                    {...register("rfc", { required: "RFC requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="(000) 000 00"
                  />
                  {errors.rfc && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.rfc.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Sitio web (opcional):
                  </label>
                  <input
                    type="url"
                    {...register("sitioWeb")}
                    className="w-full p-3 border rounded-lg"
                    placeholder="https://www.ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Descripción breve:
                  </label>
                  <textarea
                    {...register("descripcion", {
                      required: "Descripción requerida",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Misión / lo que hace la empresa"
                    rows={3}
                  />
                  {errors.descripcion && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.descripcion.message}
                    </span>
                  )}
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

            {/* Paso 2: Datos del responsable */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Nombre(s) del responsable:
                  </label>
                  <input
                    type="text"
                    {...register("nombreResponsable", {
                      required: "Nombre requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Juan"
                  />
                  {errors.nombreResponsable && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.nombreResponsable.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Apellido(s) del responsable:
                  </label>
                  <input
                    type="text"
                    {...register("apellidoResponsable", {
                      required: "Apellido requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Pérez"
                  />
                  {errors.apellidoResponsable && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.apellidoResponsable.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Puesto:</label>
                  <input
                    type="text"
                    {...register("puestoResponsable", {
                      required: "Puesto requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Gerente"
                  />
                  {errors.puestoResponsable && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.puestoResponsable.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Teléfono:</label>
                  <input
                    type="tel"
                    {...register("telefonoResponsable", {
                      required: "Teléfono requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="(000) 000 00 00"
                  />
                  {errors.telefonoResponsable && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.telefonoResponsable.message}
                    </span>
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

            {/* Paso 3: Correo y contraseña */}
            {step === 3 && (
              <div className="flex flex-col">
                <div>
                  <label className="block text-gray-600 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    {...register("correo", {
                      required: "Ingresa un correo electrónico válido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Correo electrónico no válido"
                      }
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="usuario@mail.com"
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
                        minLength: { value: 8, message: "Mínimo 8 caracteres" },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!]).{8,}$/,
                          message:
                            "Debe incluir mayúsculas, minúsculas, números y un carácter especial",
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
                    números y al menos un carácter especial (@#$%&*)
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
                      placeholder="contraseña"
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

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Registrando..." : "Registrarme"}
                  </button>
                </div>

                <p className="text-center text-gray-500 mt-4 text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/auth/login" className="text-blue-600">
                    Inicia Sesión
                  </a>
                </p>
              </div>
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

export default RegisterEmpresa;
