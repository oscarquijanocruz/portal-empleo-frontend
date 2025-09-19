"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        tipo_usuario: "candidato", // fijo como candidato
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/login");
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
                    {...register("email", { required: "Correo requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
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
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700"
                  >
                    Registrarse
                  </button>
                </div>
                <p className="text-center text-gray-500 mt-2 text-sm">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/auth/login" className="text-blue-600">
                    Inicia Sesión
                  </a>
                </p>

                <div className="flex flex-col space-y-2 mt-4">
                  <button
                    type="button"
                    className="w-full bg-blue-200 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
                  >
                    <img src="/google.png" className="w-7 h-7" />
                    {""}
                    Con Google
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
