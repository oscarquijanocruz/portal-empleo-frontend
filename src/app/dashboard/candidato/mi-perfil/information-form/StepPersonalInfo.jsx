import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Select from "../../../../components/ui/Select";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import MiPerfilPage from "../../../candidato/mi-perfil/page";

export default function StepPersonalInfo({ methods = MiPerfilPage() }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
      <div className="bg-white rounded-lg shadow-sm border p-6">
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
              // value={methods.getValues().nombre}
              {...register("nombre", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido
            </label>
            <Input
              type="text"
              // value={methods.getValues().apellido}
              {...register("nivelEducativo", {
                required: [true, "Apellido requerido"],
                maxLength: 20,
              })}
              placeholder="Tu apellido"
            />
             {errors.apellido && (
              <p className="text-red-500 text-sm">{errors.apellido.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                {...register("email", {
                  required: [true, "Correo requerido"],
                   pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                placeholder="tu@email.com"
                className="pl-10"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
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
                {...register("telefono", {
                  required: [true, "Telefono requerido"],
                  pattern: /^[0-9]+$/i,
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
              // value={methods.getValues().fechaNacimiento}
              {...register("fechaNacimiento", {
                required: "Fecha de nacimiento requerida",
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Género
            </label>
            <Select
              name="genero"
              // className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero-no-decir">Prefiero no decir</option>
            </Select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado Civil
            </label>
            <select
              name="estadoCivil"
              // value={methods.getValues().estadoCivil}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona</option>
              <option value="soltero">Soltero(a)</option>
              <option value="casado">Casado(a)</option>
              <option value="divorciado">Divorciado(a)</option>
              <option value="viudo">Viudo(a)</option>
              <option value="union-libre">Unión Libre</option>
            </select>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-6">
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
                {...register("ciudad", { required: "Ciudad requerida" })}
                placeholder="Ciudad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <Input
                type="text"
                {...register("estado", { required: true, maxLength: 20 })}
                placeholder="Estado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal
              </label>
              <Input
                type="number"
                {...register("codigoPostal", {
                  required: "Código postal requerido",
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
