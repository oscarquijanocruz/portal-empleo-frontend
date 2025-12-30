// Configuracion de cuenta
"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { LockKeyhole, Mail, Save, User } from "lucide-react";
import { useState } from "react";

export default function ConfigurationAccount() {

  const [editarcontrasena, setEditarcontrasena] = useState(false);

  return (
    <div className="w-full min-w-[320px] max-w-[729px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Configuración de cuenta
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Gestiona la información de tu cuenta
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h2 className="border-b border-gray-200">Información de la cuenta</h2>
        <div className="py-3 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Mail className="text-sky-900 mr-1" />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Correo electrónico
            </label>
            <Input type="email" id="email" placeholder="correo@ejemplo.com" />

            <Button
              type="button"
              variant="outline"
              className={
                "w-full sm:w-48 border-1 border-gray-300 rounded hover:bg-gray-50"
              }
            >
              Editar
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <User className="text-sky-900 mr-1" />
            <label
              htmlFor="nombreUsuario"
              className="block text-sm font-medium text-gray-900"
            >
              Nombre
            </label>
            <Input type="text" id="nombre" placeholder="Nombre" />
            <Button
              type="button"
              variant="outline"
              className={
                "w-full sm:w-48 border-1 border-gray-300 rounded hover:bg-gray-50"
              }
            >
              Editar
            </Button>
          </div>
        </div>

        <h2 className="border-y border-gray-200 py-2">Seguridad</h2>
        {/* Contraseña  */}
        <div className="py-3">
          <div className="flex items-center justify-between gap-2">
            <LockKeyhole className="text-sky-900 mr-1 shrink-0" />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Contraseña
            </label>
            {editarcontrasena ? (
              <Input
                type="password"
                id="password"
                placeholder="******"
                size="sm"
              />
            ) : (
              <Input
                type="password"
                id="password"
                placeholder="******"
                className={"border-none"}
                disabled
                size="sm"
              />
            )}
            {!editarcontrasena ? (
              <Button
                type="button"
                variant="outline"
                className={
                  "w-full sm:w-48 text-center border-1 border-gray-300 rounded hover:bg-gray-50"
                }
                onClick={() => setEditarcontrasena(true)}
              >
                Editar
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className={
                    "w-full sm:w-48 "
                  }
                  size="sm"
                  // onClick={() => actualizarContrasena()}
                >
                  Actualizar contraseña
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className={
                    "w-full sm:w-48 text-center"
                  }
                  size="sm"
                  onClick={() => setEditarcontrasena(false)}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          {/* editar contraseña */}
          {editarcontrasena && (
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Confirmar contraseña
              </label>
              <Input
                type="password"
                id="password"
                placeholder="******"
                size="sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
