"use client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [tipoUsuario, setTipoUsuario] = useState("candidato");

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl) setTipoUsuario(typeFromUrl);
  }, [searchParams]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        tipo_usuario: tipoUsuario,
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
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        <div className="w-1/2 p-10">
          <h1 className="text-6xl font-bold mb-8">Registro</h1>
          <h2 className="text-4xl font-bold text-gray-500 mb-6 capitalize">
            {tipoUsuario}
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Condicionales según tipo */}
            {tipoUsuario === "candidato" && (
              <>
                {/* Nombre */}
                <div>
                  <label className="block text-gray-600 mb-1">Nombre(s):</label>
                  <input
                    type="text"
                    {...register("nombre", { required: "Nombre requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Juan"
                  />
                  {errors.nombre && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.nombre.message}
                    </span>
                  )}
                </div>

                {/* Apellido */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Apellido(s):
                  </label>
                  <input
                    type="text"
                    {...register("apellidos", {
                      required: "Apellido requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Pérez"
                  />
                  {errors.apellidos && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.apellidos.message}
                    </span>
                  )}
                </div>

                {/* Celular */}
                <div>
                  <label className="block text-gray-600 mb-1">Celular:</label>
                  <input
                    type="tel"
                    {...register("celular", { required: "Celular requerido" })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="(000) 000 00 00"
                  />
                  {errors.celular && (
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.celular.message}
                    </span>
                  )}
                </div>

                {/* Fecha de nacimiento */}
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
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.fechaNacimiento.message}
                    </span>
                  )}
                </div>

                {/* Ubicación */}
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
                    <span className="text-red-500 text-sm h-1 block">
                      {errors.ubicacion.message}
                    </span>
                  )}
                </div>
              </>
            )}

            {tipoUsuario === "empresa" && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Razón social:
                  </label>
                  <input
                    type="text"
                    {...register("razonSocial", {
                      required: "Razón social requerida",
                    })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">RFC:</label>
                  <input
                    type="text"
                    {...register("rfc", { required: "RFC requerido" })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </>
            )}

            {tipoUsuario === "universidad" && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Nombre Universidad:
                  </label>
                  <input
                    type="text"
                    {...register("nombreUniversidad", {
                      required: "Nombre requerido",
                    })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Dirección:</label>
                  <input
                    type="text"
                    {...register("direccion", {
                      required: "Dirección requerida",
                    })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">
                Siguiente
              </button>
            </div>
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
