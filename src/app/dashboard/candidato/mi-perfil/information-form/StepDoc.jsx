import Input from "@/app/components/ui/Input";
import { File, Upload, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function StepDoc({ methods = MiPerfilPage() }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [curriculumVitae, setCurriculumVitae] = useState(null);

  // Manejar subida de foto de perfil
  const handleFotoPerfilChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPerfil(file);
    }
    console.log("Foto Perfil:", file);
  };

  // Manejar subida de curriculum vitae
  const handleCurriculumVitaeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurriculumVitae(file);
    }
    console.log("Curriculum Vitae:", file);
  };

  const handlePortafolioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPortafolio(file);
    }
    console.log("Portafolio:", file);
  };

  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Documentos
        </h1>
      <div className="border-y-1 pt-6">
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Foto de Perfil
        </h2>

        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoPerfilChange}
              className="hidden"
              id="foto-perfil"
              {...register("fotoPerfil", {
                optional: true,
                maxFiles: 1,
                maxSize: 5000000,
              })}
            />
            <div>
              <label
                htmlFor="foto-perfil"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Subir Foto
              </label>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG o GIF (máx. 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Curriculum Vitae */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-6">
          Currículum Vitae en PDF
        </h2>

        <div className="block gap-6 mb-6 items-center text-center space-y-4">
          <div className="w-full h-24 bg-gray-200 rounded-4xl flex items-center justify-center">
            {curriculumVitae ? (
              <img
                src={curriculumVitae}
                alt="Curriculum Vitae de candidato"
                className="w-24 h-24 object-cover items-center justify-center align-center"
              />
            ) : (
              <File className="w-12 h-12 text-gray-400" />
            )}
          </div>

          <div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleCurriculumVitaeChange}
              {...register("curriculumVitae", {
                required: "Curriculum Vitae requerido",
                maxLength: {
                  value: 500,
                  message: "Máximo 5 mb",
                },
              })}
              className="hidden"
              id="curriculum-vitae"
            />
            <label
              htmlFor="curriculum-vitae"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Subir CV
            </label>
            <p className="text-sm text-gray-500 mt-1">Solo PDF (máx. 5MB)</p>
          </div>
        </div>
      </div>

      {/* Portafolio */}
      <div className="pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Portafolio (opcional)
        </h2>
        <div className="">
            <label htmlFor="">URL (LinkedIn, Github, Website o Personal)</label>
            <Input
              type="text"
              placeholder="https://www.website.com"
              {...register("portfolio", { required: false })}
            />
        </div>
        <div className="space-y-4">
          <label className="flex items-center">
            </label>
            <input
              type="file"
              accept="file/*"
              onChange={handlePortafolioChange}
              className="hidden"
              id="portfolio"
            />
            <label
              htmlFor="portfolio"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Subir Portafolio
            </label>
            <p className="text-sm text-gray-500 mt-1">JPG, PNG o PDf (máx. 5MB)</p>
          </div>
      </div>

      {/* Preferencias */}
      <div className="border-t-1 p-5">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Preferencias
        </h2>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notificaciones"
              checked={methods.notificaciones}
              {...register("notificaciones")}
              className="mr-3"
            />
            <span className="text-gray-700">
              Recibir notificaciones por email
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="perfilPublico"
              checked={methods.perfilPublico}
              //   onChange={handleInputChange}
              className="mr-3"
            />
            <span className="text-gray-700">
              Perfil público (visible para empleadores)
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="recibirOfertas"
              checked={methods.recibirOfertas}
              //onChange={handleInputChange}
              className="mr-3"
            />
            <span className="text-gray-700">Recibir ofertas de trabajo</span>
          </label>
        </div>
      </div>
    </div>
  );
}
