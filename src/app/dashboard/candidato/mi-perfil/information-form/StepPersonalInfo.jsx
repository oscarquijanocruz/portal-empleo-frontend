import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import MiPerfilPage from "../../../candidato/mi-perfil/page";

export default function StepPersonalInfo() {
  const { register, formState: { errors } } = useFormContext();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log("Guardando perfil:", methods.getValues());
    // Aquí se implementaría la lógica para guardar en el backend
    alert("Perfil actualizado exitosamente");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Información Personal
      </h1>
      <div className="border-y-1 py-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-blue-900 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">
            Datos Personales
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <Input
              type="text"
              error={errors.nombre?.message}
              placeholder="Tu nombre"
              {...register("nombre", {
                required: "Nombre requerido",
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
                  message: "Solo letras y espacios",
                },
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido
            </label>
            <Input
              type="text"
              error={errors.apellido?.message}
              {...register("apellido", {
                required: "Apellido requerido",
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
                  message: "Solo letras y espacios",
                },
              })}
              placeholder="Tu apellido"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                error={errors.email?.message}
                {...register("email", {
                  required: "Correo requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                placeholder="tu@email.com"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="tel"
                error={errors.telefono?.message}
                {...register("telefono", {
                  required: "Telefono requerido",
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Telefono no inválido",
                  },
                })}
                placeholder="+52 55 1234 5678"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento
            </label>
            <Input
              type="date"
              error={errors.fechaNacimiento?.message}
              {...register("fechaNacimiento", {
                required: "Fecha de nacimiento requerida",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Género
            </label>
            <Controller
              name="genero"
              // control={control}
              rules={{ required: "Selecciona un género" }}
              render={({ field }) => (
                <Select
                  placeholder="Selecciona un género"
                  options={[
                    { label: "Masculino", value: "masculino" },
                    { label: "Femenino", value: "femenino" },
                    { label: "Otro", value: "otro" },
                    { label: "Prefiero no decir", value: "prefiero-no-decir" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.genero?.message}
                />
              )}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado Civil
            </label>
            <Controller
              name="estadoCivil"
              // control={control}
              rules={{ required: "Estado Civil requerido" }}
              render={({ field }) => (
                <Select
                  placeholder="Selecciona un Estado Civil"
                  options={[
                    { label: "Soltero(a)", value: "soltero" },
                    { label: "Casado(a)", value: "casado" },
                    { label: "Divorciado(a)", value: "divorciado" },
                    { label: "Viudo(a)", value: "viudo" },
                    { label: "Unión Libre", value: "union-libre" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.estadoCivil?.message}
                />
              )}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center mb-6 border-t-1 pt-3">
            <MapPin className="w-6 h-6 text-blue-900 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Ubicación</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <Input
                type="text"
                error={errors.ciudad?.message}
                {...register("ciudad", {
                  required: "Ciudad requerida",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/,
                    message: "Solo letras y espacios",
                  },
                })}
                placeholder="Ciudad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <Input
                type="text"
                error={errors.estado?.message}
                {...register("estado", { required: "Estado requerido" })}
                placeholder="Estado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal
              </label>
              <Input
                type="number"
                error={errors.codigoPostal?.message}
                {...register("codigoPostal", {
                  required: "Código postal requerido",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Código postal no válido",
                  },
                  maxLength: {
                    value: 5,
                    message: "Código postal no válido",
                  },
                })}
                placeholder="00000"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
