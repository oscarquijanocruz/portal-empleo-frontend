"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");

    try {
      await login(data.correo, data.password);
      
      // Redirigir al dashboard después de login exitoso
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  });

  const handleGoogleLogin = () => {
    loginWithGoogle('candidato');
  };

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

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

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
              <button 
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continúa con</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
            >
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              Continuar con Google
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            ¿No tienes cuenta?{" "}
            <a href="/auth/t_register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
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
