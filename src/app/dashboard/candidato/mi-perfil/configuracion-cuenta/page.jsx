// Configuracion de cuenta
"use client";

import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useState } from "react";

export default function ConfigurationAccount() {
  // Estados de formulario
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [editarContrasena, setEditarContrasena] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // Estados de carga y mensajes
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [nombreLoading, setNombreLoading] = useState(false);
  const [nombreError, setNombreError] = useState("");
  const [nombreMessage, setNombreMessage] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Validaciones de contraseña
  const passwordValidations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const passwordStrength = Object.values(passwordValidations).filter(Boolean).length;
  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  // TODO: aquí podrías hacer un fetch inicial para traer los datos del usuario
  // useEffect(() => {
  //   async function loadUser() {
  //     const res = await fetch("/api/user/me");
  //     const data = await res.json();
  //     setEmail(data.email);
  //     setNombre(data.name);
  //   }
  //   loadUser();
  // }, []);

  async function handleUpdateEmail() {
    try {
      setEmailLoading(true);
      setEmailError("");
      setEmailMessage("");

      // Ejemplo de llamada al backend (descomenta y ajusta cuando tengas la API lista)
      // const res = await fetch("/api/user/email", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) {
      //   throw new Error("No se pudo actualizar el correo electrónico");
      // }

      // Simulación de éxito en el front (solo UI)
      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmailMessage("Correo electrónico actualizado correctamente");
    } catch (error) {
      setEmailError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al actualizar el correo electrónico"
      );
    } finally {
      setEmailLoading(false);
    }
  }

  async function handleUpdateNombre() {
    try {
      setNombreLoading(true);
      setNombreError("");
      setNombreMessage("");

      // Ejemplo de llamada al backend (descomenta y ajusta cuando tengas la API lista)
      // const res = await fetch("/api/user/name", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name: nombre }),
      // });
      // if (!res.ok) {
      //   throw new Error("No se pudo actualizar el nombre");
      // }

      // Simulación de éxito en el front (solo UI)
      await new Promise((resolve) => setTimeout(resolve, 500));

      setNombreMessage("Nombre actualizado correctamente");
    } catch (error) {
      setNombreError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al actualizar el nombre"
      );
    } finally {
      setNombreLoading(false);
    }
  }

  async function handleUpdatePassword() {
    try {
      setPasswordLoading(true);
      setPasswordError("");
      setPasswordMessage("");

      if (!oldPassword) {
        setPasswordError("Debes ingresar tu contraseña actual");
        return;
      }

      if (!password || !confirmPassword) {
        setPasswordError("Completa todos los campos de contraseña");
        return;
      }

      if (!isPasswordValid) {
        setPasswordError("La nueva contraseña no cumple con los requisitos de seguridad");
        return;
      }

      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        return;
      }

      // Ejemplo de llamada al backend (descomenta y ajusta cuando tengas la API lista)
      // const res = await fetch("/api/user/password", {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ oldPassword, newPassword: password }),
      // });
      // if (!res.ok) {
      //   throw new Error("No se pudo actualizar la contraseña");
      // }

      // Simulación de éxito en el front (solo UI)
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPasswordMessage("Contraseña actualizada correctamente");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
      setEditarContrasena(false);
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al actualizar la contraseña"
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="w-full min-w-[320px] max-w-[729px] mx-auto sm:px-6 lg:py-8">
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
            <Mail className="text-sky-900 mr-1 shrink-0" />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Correo electrónico
            </label>
            <Input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailLoading}
              error={emailError}
              helperText={emailMessage}
              size="sm"
            />
            <Button
              type="button"
              variant="outline"
              className={
                "w-full sm:w-48 border-1 border-gray-300 rounded hover:bg-gray-50"
              }
              onClick={handleUpdateEmail}
              disabled={emailLoading || !email}
            >
              {emailLoading ? "Guardando..." : "Actualizar"}
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <User className="text-sky-900 mr-1 shrink-0" />
            <label
              htmlFor="nombreUsuario"
              className="block text-sm font-medium text-gray-900"
            >
              Nombre
            </label>
            <Input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={nombreLoading}
              error={nombreError}
              helperText={nombreMessage}
              size="sm"
            />
            <Button
              type="button"
              variant="outline"
              className={
                "w-full sm:w-48 border-1 border-gray-300 rounded hover:bg-gray-50"
              }
              onClick={handleUpdateNombre}
              disabled={nombreLoading || !nombre}
            >
              {nombreLoading ? "Guardando..." : "Actualizar"}
            </Button>
          </div>
        </div>

        <h2 className="border-y border-gray-200 py-2">Seguridad</h2>
        {/* Contraseña  */}
        <div className="py-3">
          {!editarContrasena ? (
            <div className="flex items-center justify-between gap-2">
              <LockKeyhole className="text-sky-900 mr-1 shrink-0" />
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <Input
                type="password"
                id="password"
                placeholder="******"
                className={"border-none"}
                disabled
                size="sm"
              />
              <Button
                type="button"
                variant="outline"
                className={
                  "w-full sm:w-48 text-center border-1 border-gray-300 rounded hover:bg-gray-50"
                }
                onClick={() => setEditarContrasena(true)}
              >
                Editar
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tu contraseña
                </h3>
                <div className="space-y-3">
                  {/* Contraseña vieja */}
                  <div className="flex flex-col gap-1 relative">
                    <Input
                      type={!mostrarContrasena ? "password" : "text"}
                      id="oldPassword"
                      placeholder="Contraseña vieja"
                      size="sm"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className={"relative"}
                      disabled={passwordLoading}
                    />
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900 focus:outline-none absolute right-2 top-1"
                      aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                      {mostrarContrasena ? (
                        <Eye size={20} className="mr-1" />
                      ) : (
                        <EyeOff size={20} className="mr-1" />
                      )}
                    </button>
                  </div>

                  {/* Nueva contraseña con validaciones */}
                  <div className="flex flex-col gap-1">
                    <Input
                      type={!mostrarContrasena ? "password" : "text"}
                      id="newPassword"
                      placeholder="Nueva contraseña"
                      size="sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={passwordLoading}
                      className={"relative"}
                      error={
                        password && !isPasswordValid
                          ? "La contraseña no cumple con los requisitos"
                          : ""
                      }
                    />
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900 focus:outline-none absolute right-2 top-1"
                      aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setMostrarContrasena(!mostrarContrasena)}
                    >
                      {mostrarContrasena ? (
                        <Eye size={20} className="mr-1" />
                      ) : (
                        <EyeOff size={20} className="mr-1" />
                      )}
                    </button>
                    {password && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          Requisitos de contraseña ({passwordStrength}/4):
                        </p>
                        <ul className="space-y-1 text-xs">
                          <li
                            className={`flex items-center gap-2 ${
                              passwordValidations.minLength
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            <span
                              className={
                                passwordValidations.minLength
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }
                            >
                              {passwordValidations.minLength ? "✓" : "○"}
                            </span>
                            Mínimo 8 caracteres
                          </li>
                          <li
                            className={`flex items-center gap-2 ${
                              passwordValidations.hasUpperCase
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            <span
                              className={
                                passwordValidations.hasUpperCase
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }
                            >
                              {passwordValidations.hasUpperCase ? "✓" : "○"}
                            </span>
                            Al menos una letra mayúscula
                          </li>
                          <li
                            className={`flex items-center gap-2 ${
                              passwordValidations.hasSpecialChar
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            <span
                              className={
                                passwordValidations.hasSpecialChar
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }
                            >
                              {passwordValidations.hasSpecialChar ? "✓" : "○"}
                            </span>
                            Al menos un símbolo especial
                          </li>
                          <li
                            className={`flex items-center gap-2 ${
                              passwordValidations.hasNumber
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          >
                            <span
                              className={
                                passwordValidations.hasNumber
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }
                            >
                              {passwordValidations.hasNumber ? "✓" : "○"}
                            </span>
                            Al menos un número
                          </li>
                        </ul>
                        {isPasswordValid && (
                          <p className="text-xs text-green-600 font-medium mt-2">
                            ✓ Contraseña segura
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confirmar contraseña */}
                  <div className="flex flex-col gap-1">
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirmar contraseña"
                      size="sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={passwordLoading}
                      error={
                        confirmPassword && password !== confirmPassword
                          ? "Las contraseñas no coinciden"
                          : passwordError
                      }
                      helperText={passwordMessage}
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-48 border-1 border-gray-300 rounded hover:bg-gray-50"
                  size="sm"
                  onClick={handleUpdatePassword}
                  disabled={
                    passwordLoading ||
                    !isPasswordValid ||
                    !oldPassword ||
                    password !== confirmPassword
                  }
                >
                  {passwordLoading ? "Guardando..." : "Actualizar contraseña"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditarContrasena(false);
                    setOldPassword("");
                    setPassword("");
                    setConfirmPassword("");
                    setPasswordError("");
                    setPasswordMessage("");
                  }}
                  className="w-full sm:w-48"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
