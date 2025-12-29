"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Página para completar el perfil de candidato después de registrarse con OAuth
 */
export default function CompletarPerfilCandidato() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/completar-perfil-candidato`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: data.nombre,
            apellido_paterno: data.apellidoPaterno,
            apellido_materno: data.apellidoMaterno,
            telefono: data.celular,
            fecha_nacimiento: data.fechaNacimiento,
            lugar_residencia: data.ubicacion,
            puesto_deseado: data.puestoDeseado,
            preferencia_modalidad: data.modalidad,
            preferencia_jornada: data.jornada,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al completar perfil");
      }

      // Redirigir al dashboard de candidato
      router.push("/dashboard/candidato");
    } catch (err) {
      setError(err.message || "Error al completar perfil");
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-10">
        <h1 className="text-3xl font-bold mb-2">Completa tu perfil</h1>
        <p className="text-gray-500 mb-6">
          Para continuar, necesitamos algunos datos adicionales.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Datos personales */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Datos Personales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Nombre(s):</label>
                <input
                  type="text"
                  {...register("nombre", { required: "Nombre requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Juan"
                />
                {errors.nombre && (
                  <span className="text-red-500 text-sm">{errors.nombre.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Apellido Paterno:</label>
                <input
                  type="text"
                  {...register("apellidoPaterno", { required: "Apellido requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Pérez"
                />
                {errors.apellidoPaterno && (
                  <span className="text-red-500 text-sm">{errors.apellidoPaterno.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Apellido Materno:</label>
                <input
                  type="text"
                  {...register("apellidoMaterno")}
                  className="w-full p-3 border rounded-lg"
                  placeholder="García"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Celular:</label>
                <input
                  type="tel"
                  {...register("celular", { required: "Celular requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="(555) 123-4567"
                />
                {errors.celular && (
                  <span className="text-red-500 text-sm">{errors.celular.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Fecha de nacimiento:</label>
                <input
                  type="date"
                  {...register("fechaNacimiento", { required: "Fecha requerida" })}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.fechaNacimiento && (
                  <span className="text-red-500 text-sm">{errors.fechaNacimiento.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Ubicación:</label>
                <input
                  type="text"
                  {...register("ubicacion", { required: "Ubicación requerida" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Ciudad, Estado"
                />
                {errors.ubicacion && (
                  <span className="text-red-500 text-sm">{errors.ubicacion.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Preferencias laborales */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Preferencias Laborales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Puesto deseado:</label>
                <input
                  type="text"
                  {...register("puestoDeseado")}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Ej: Desarrollador Web, Contador, etc."
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Modalidad preferida:</label>
                <select
                  {...register("modalidad")}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Selecciona modalidad</option>
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Jornada preferida:</label>
                <select
                  {...register("jornada")}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Selecciona jornada</option>
                  <option value="tiempo_completo">Tiempo completo</option>
                  <option value="medio_tiempo">Medio tiempo</option>
                  <option value="por_proyecto">Por proyecto</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {submitting ? "Guardando..." : "Completar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}
