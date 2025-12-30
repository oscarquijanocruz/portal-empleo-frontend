"use client";

import { useState } from "react";
import { User, Mail, Shield, Edit, Lock } from "lucide-react";
import Image from "next/image";

export default function AdminProfilePage() {
  const admin = {
    nombre: "Oscar Zavaleta",
    correo: "admin@mentory.com",
    rol: "Administrador General",
    puesto: "Gestión y Control del Sistema",
    avatar: "/avatar-admin.png",
  };

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });
  const [error, setError] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Perfil del Administrador
          </h1>
          <p className="text-sm text-gray-500">
            Información general de tu cuenta
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-lg
                       bg-blue-600 px-5 py-2.5 text-sm font-medium
                       text-white hover:bg-blue-700 transition"
          >
            <Edit size={16} />
            Editar perfil
          </button>

          <button
            onClick={() => setIsPasswordOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg
                       border px-4 py-2.5 text-sm font-medium
                       hover:bg-gray-100 transition"
          >
            <Lock size={16} />
            Cambiar contraseña
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Avatar */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-sky-100 flex items-center justify-center mb-4">
            {admin.avatar ? (
              <Image
                src={admin.avatar}
                alt="Avatar administrador"
                width={100}
                height={100}
                className="rounded-full"
              />
            ) : (
              <User size={48} className="text-sky-600" />
            )}
          </div>

          <h2 className="font-semibold text-lg text-gray-800">
            {admin.nombre}
          </h2>
          <p className="text-sm text-gray-500">{admin.rol}</p>
        </div>

        {/* Información */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Información personal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <InfoItem icon={User} label="Nombre completo" value={admin.nombre} />
            <InfoItem icon={Mail} label="Correo electrónico" value={admin.correo} />
            <InfoItem icon={Shield} label="Rol" value={admin.rol} />
            <InfoItem icon={Shield} label="Puesto" value={admin.puesto} />

          </div>
        </div>
      </div>

      {/* MODAL CAMBIAR CONTRASEÑA */}
      {isPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsPasswordOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-5">

            <h3 className="text-lg font-semibold text-gray-800">
              Cambiar contraseña
            </h3>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <PasswordInput
              label="Contraseña actual"
              value={passwordForm.actual}
              onChange={(v) =>
                setPasswordForm({ ...passwordForm, actual: v })
              }
            />

            <PasswordInput
              label="Nueva contraseña"
              value={passwordForm.nueva}
              onChange={(v) =>
                setPasswordForm({ ...passwordForm, nueva: v })
              }
            />

            <PasswordInput
              label="Confirmar nueva contraseña"
              value={passwordForm.confirmar}
              onChange={(v) =>
                setPasswordForm({ ...passwordForm, confirmar: v })
              }
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setIsPasswordOpen(false);
                  setPasswordForm({ actual: "", nueva: "", confirmar: "" });
                  setError("");
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  if (!passwordForm.actual || !passwordForm.nueva || !passwordForm.confirmar) {
                    setError("Todos los campos son obligatorios");
                    return;
                  }
                  if (passwordForm.nueva !== passwordForm.confirmar) {
                    setError("Las contraseñas no coinciden");
                    return;
                  }

                  // Aquí conectarías backend
                  alert("Contraseña actualizada correctamente");
                  setIsPasswordOpen(false);
                  setPasswordForm({ actual: "", nueva: "", confirmar: "" });
                  setError("");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
      <Icon className="text-sky-600" size={20} />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function PasswordInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg
                   focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
