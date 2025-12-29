"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Página para completar el perfil de universidad después de registrarse con OAuth
 */
export default function CompletarPerfilUniversidad() {
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
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/completar-perfil-universidad`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre_institucion: data.nombreInstitucion,
            campus: data.campus,
            direccion: data.direccion,
            ciudad_estado: data.ubicacion,
            pagina_web: data.paginaWeb || null,
            nombre_responsable: data.nombreResponsable,
            apellido_responsable: data.apellidoResponsable,
            puesto_responsable: data.puestoResponsable,
            telefono_responsable: data.telefonoResponsable,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al completar perfil");
      }

      // Redirigir al dashboard de universidad
      router.push("/dashboard/universidad");
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-10">
        <h1 className="text-3xl font-bold mb-2">Completa tu perfil de universidad</h1>
        <p className="text-gray-500 mb-6">
          Para continuar, necesitamos algunos datos adicionales de tu institución.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Datos de la institución */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Datos de la Institución</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Nombre de la institución:</label>
                <input
                  type="text"
                  {...register("nombreInstitucion", { required: "Nombre requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Universidad Ejemplo"
                />
                {errors.nombreInstitucion && (
                  <span className="text-red-500 text-sm">{errors.nombreInstitucion.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Campus:</label>
                <input
                  type="text"
                  {...register("campus", { required: "Campus requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Campus Norte"
                />
                {errors.campus && (
                  <span className="text-red-500 text-sm">{errors.campus.message}</span>
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

              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Dirección completa:</label>
                <input
                  type="text"
                  {...register("direccion", { required: "Dirección requerida" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Calle, Número, Colonia, CP"
                />
                {errors.direccion && (
                  <span className="text-red-500 text-sm">{errors.direccion.message}</span>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Página web (opcional):</label>
                <input
                  type="url"
                  {...register("paginaWeb")}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://www.universidad.edu.mx"
                />
              </div>
            </div>
          </div>

          {/* Datos del responsable */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Datos del Responsable</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Nombre(s):</label>
                <input
                  type="text"
                  {...register("nombreResponsable", { required: "Nombre requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="María"
                />
                {errors.nombreResponsable && (
                  <span className="text-red-500 text-sm">{errors.nombreResponsable.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Apellido(s):</label>
                <input
                  type="text"
                  {...register("apellidoResponsable", { required: "Apellido requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="González"
                />
                {errors.apellidoResponsable && (
                  <span className="text-red-500 text-sm">{errors.apellidoResponsable.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Puesto:</label>
                <input
                  type="text"
                  {...register("puestoResponsable", { required: "Puesto requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Coordinador de Vinculación"
                />
                {errors.puestoResponsable && (
                  <span className="text-red-500 text-sm">{errors.puestoResponsable.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Teléfono:</label>
                <input
                  type="tel"
                  {...register("telefonoResponsable", { required: "Teléfono requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="(555) 123-4567"
                />
                {errors.telefonoResponsable && (
                  <span className="text-red-500 text-sm">{errors.telefonoResponsable.message}</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
          >
            {submitting ? "Guardando..." : "Completar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}
