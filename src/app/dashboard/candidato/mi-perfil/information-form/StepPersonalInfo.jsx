import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
// import useCandidateFormStore from "@/app/hooks/useCandidateFormStore ";
import {useForm} from 'react-hook-form';
import useCandidateFormStore from "../../../../hooks/useCandidateFormStore ";
// import { mockUsers } from "../../../data/mockUsers";
// import formData from "../page";

export default function StepPersonalInfo({methods = useCandidateFormStore()}) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log('Guardando perfil:', methods.getValues());
    // Aquí se implementaría la lógica para guardar en el backend
    alert('Perfil actualizado exitosamente');
  };

  return (
    <div>
      <form onSubmit={guardarPerfil}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Información Personal</h1>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Información Personal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <Input
                type="text"
                {...register("name", { required: "Nombre requerido" })}
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>
              <Input
                type="text"
                {...register("lastName", { required: "Apellido requerido" })}
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
                  {...register("email", { required: "Correo requerido" })}
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
                  {...register("mobile", { required: "Telefono requerido" })}
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
                {...register("dateOfBirth", { required: "Fecha de nacimiento requerida" })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Género
              </label>
              <select
                name="genero"
                // value={formData.genero}
                // onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero-no-decir">Prefiero no decir</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado Civil
              </label>
              <select
                name="estadoCivil"
                // value={formData.estadoCivil}
                // onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="soltero">Soltero(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viudo">Viudo(a)</option>
                <option value="union-libre">Unión Libre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Ubicación</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <Input
                type="text"
                {...register("city", { required: "Ciudad requerida" })}
                placeholder="Ciudad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <Input
                type="text"
                {...register("state", { required: "Estado requerido" })}
                placeholder="Estado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Postal
              </label>
              <Input
                type="text"
                {...register("codePostal", { required: "Código postal requerido" })}
                placeholder="00000"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
          <Button type="button" className="bg-gray-500 hover:bg-gray-700">
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
}
