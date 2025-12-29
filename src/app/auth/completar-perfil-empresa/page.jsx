"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Página para completar el perfil de empresa después de registrarse con OAuth
 */
export default function CompletarPerfilEmpresa() {
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
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/completar-perfil-empresa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre_empresa: data.nombreEmpresa,
            sector: data.sector,
            tamano: data.tamano,
            rfc: data.rfc,
            sitio_web: data.sitioWeb || null,
            descripcion: data.descripcion,
            nombre_responsable: data.nombreResponsable,
            apellido_responsable: data.apellidoResponsable,
            puesto_responsable: data.puestoResponsable,
            telefono: data.telefonoResponsable,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al completar perfil");
      }

      // Redirigir al dashboard de empresa
      router.push("/dashboard/empresa");
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-10">
        <h1 className="text-3xl font-bold mb-2">Completa tu perfil de empresa</h1>
        <p className="text-gray-500 mb-6">
          Para continuar, necesitamos algunos datos adicionales de tu empresa.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Datos de la empresa */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Datos de la Empresa</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Nombre de la empresa:</label>
                <input
                  type="text"
                  {...register("nombreEmpresa", { required: "Nombre requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Ejemplo S.A. de C.V."
                />
                {errors.nombreEmpresa && (
                  <span className="text-red-500 text-sm">{errors.nombreEmpresa.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">RFC:</label>
                <input
                  type="text"
                  {...register("rfc", { required: "RFC requerido" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="ABC123456XYZ"
                />
                {errors.rfc && (
                  <span className="text-red-500 text-sm">{errors.rfc.message}</span>
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
                  <span className="text-red-500 text-sm">{errors.sector.message}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Tamaño:</label>
                <select
                  {...register("tamano", { required: "Tamaño requerido" })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Selecciona tamaño</option>
                  <option value="micro">Micro (1-10)</option>
                  <option value="pequena">Pequeña (11-50)</option>
                  <option value="mediana">Mediana (51-250)</option>
                  <option value="grande">Grande (250+)</option>
                </select>
                {errors.tamano && (
                  <span className="text-red-500 text-sm">{errors.tamano.message}</span>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Sitio web (opcional):</label>
                <input
                  type="url"
                  {...register("sitioWeb")}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://www.ejemplo.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1">Descripción:</label>
                <textarea
                  {...register("descripcion", { required: "Descripción requerida" })}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Describe brevemente tu empresa..."
                  rows={3}
                />
                {errors.descripcion && (
                  <span className="text-red-500 text-sm">{errors.descripcion.message}</span>
                )}
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
                  placeholder="Juan"
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
                  placeholder="Pérez"
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
                  placeholder="Gerente de RH"
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Guardando..." : "Completar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}
