// Componente usuario abajo izquierda
"use client";
import { User2 } from "lucide-react";
import { mockUsers } from "@/app/data/mockUsers";

const usuarios = mockUsers;

export default function UserProfile() {
  return (
    <div>
      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
        <User2 size={30} className="text-white stroke-1" />
      </div>
      <div>
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="grid items-center space-x-2 px-1 py-2 rounded-lg text-sm font-medium transition-all"
          >
            <span className="font-semibold text-blue-900">
              {usuario.nombre}
            </span>
            <span className="text-xs text-gray-600">{usuario.puesto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
