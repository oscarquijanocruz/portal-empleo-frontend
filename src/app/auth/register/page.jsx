"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterCandidatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/candidates/register", {
      method: "POST",
      body: JSON.stringify({
        nombre: data.nombre,
        apellidos: data.apellidos,
        correo: data.correo,
        celular: data.celular,
        fechaNacimiento: data.fechaNacimiento,
        ubicacion: data.ubicacion,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/candidates/success");
    }
  });

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-gray-100 rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        {/* Formulario */}
        <div className="w-1/2 p-10">
          <h1 className="text-6xl font-bold mb-8">Registro</h1>
          <h1 className="text-4xl font-bold text-gray-500 mb-6">Candidato</h1>

          <form onSubmit={onSubmit} className="space-y-4">
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

            <div>
              <label className="block text-gray-600 mb-1">Apellido(s):</label>
              <input
                type="text"
                {...register("apellidos", { required: "Apellido requerido" })}
                className="w-full p-3 border rounded-lg"
                placeholder="Pérez"
              />
              {errors.apellidos && (
                <span className="text-red-500 text-sm h-1 block">
                  {errors.apellidos.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Correo electrónico:
              </label>
              <input
                type="email"
                {...register("correo", { required: "Correo requerido" })}
                className="w-full p-3 border rounded-lg"
                placeholder="usuario@mail.com"
              />
              {errors.correo && (
                <span className="text-red-500 text-sm h-1 block ">
                  {errors.correo.message}
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
                <span className="text-red-500 text-sm h-1 block">
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
                <span className="text-red-500 text-sm h-1 block">
                  {errors.fechaNacimiento.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Ubicación:</label>
              <input
                type="text"
                {...register("ubicacion", { required: "Ubicación requerida" })}
                className="w-full p-3 border rounded-lg"
                placeholder="Estado"
              />
              {errors.ubicacion && (
                <span className="text-red-500 text-sm h-1 block">
                  {errors.ubicacion.message}
                </span>
              )}
            </div>

            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-700">
                {" "}
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

export default RegisterCandidatePage;
