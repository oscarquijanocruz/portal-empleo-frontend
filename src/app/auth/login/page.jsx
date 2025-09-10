"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        correo: data.correo,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/dashboard"); //
    }
  });

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        {/* Formulario */}
        <div className="w-1/2 p-10">
          <h1 className="text-5xl font-bold mb-4">¡Hola!</h1>
          <h2 className="text-2xl font-semibold mb-2">Iniciar Sesión</h2>
          <p className="text-gray-500 mb-6">
            ¡Un gusto volver a saludarte! ¿Listo para conocer tu próximo empleo?
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Usuario</label>
              <input
                type="email"
                {...register("correo", { required: "Correo requerido" })}
                className="w-full p-3 border rounded-lg"
                placeholder="usuario@mail.com"
              />
              <span className="text-red-500 text-sm h-5 block">
                {errors.correo?.message}
              </span>
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: "Contraseña requerida" })}
                className="w-full p-3 border rounded-lg"
                placeholder="contraseña"
              />
              <span className="text-red-500 text-sm h-5 block">
                {errors.password?.message}
              </span>
            </div>

            <div className="flex justify-start">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            ¿No tienes cuenta?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>

          <div className="mt-6"></div>
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

export default LoginPage;
