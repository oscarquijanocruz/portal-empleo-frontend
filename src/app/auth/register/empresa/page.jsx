"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterEmpresa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const router = useRouter();
  const [step, setStep] = useState(1);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        tipo_usuario: "empresa",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/login");
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
                    {...register("email", {
                      required: "Ingresa un correo electrónico válido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="usuario@mail.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Contraseña</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Ingresa una contraseña",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="contraseña"
                  />
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
                  <input
                    type="password"
                    {...register("passwordConfirm", {
                      required: "La contraseña debe ser la misma",
                      validate: (value) =>
                        value === watch("password") ||
                        "Las contraseñas no coinciden",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="contraseña"
                  />
                  {errors.passwordConfirm && (
                    <span className="text-red-500 text-sm">
                      {errors.passwordConfirm.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col space-y-2 mt-2 items-start">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("terminos", { required: true })}
                    />
                    <span>Acepto Terminos y Condiciones</span>
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
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                  >
                    Registrarme
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
