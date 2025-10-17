import Input from "@/app/components/ui/Input";
import { File, Upload, User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function StepDoc() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // Estados locales para preview
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);
  const [portafolioPreview, setPortafolioPreview] = useState(null);

  // Watch para checkboxes
  const notificaciones = watch("notificaciones");
  const perfilPublico = watch("perfilPublico");
  const recibirOfertas = watch("recibirOfertas");

  // Manejar subida de foto de perfil con preview
  const handleFotoPerfilChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validación de tamaño
      if (file.size > 5000000) {
        alert("El archivo es muy grande. Máximo 5MB");
        return;
      }
      // Crear preview
      const previewUrl = URL.createObjectURL(file);
      setFotoPerfilPreview(previewUrl);
    }
  };

  // Manejar subida de curriculum vitae
  const handleCurriculumVitaeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        alert("El archivo es muy grande. Máximo 5MB");
        return;
      }
      setCvPreview(file.name);
    }
  };

  // Manejar subida de portafolio
  const handlePortafolioChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5000000) {
        alert("El archivo es muy grande. Máximo 5MB");
        return;
      }
      setPortafolioPreview(file.name);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Documentos</h1>
      
      <div className="border-y-1 pt-6 space-y-8">
        {/* Foto de Perfil */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Foto de Perfil
          </h2>

          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {fotoPerfilPreview ? (
                <Image
                  src={fotoPerfilPreview}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
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
                  validate: {
                    fileSize: (files) => {
                      if (!files?.[0]) return true;
                      return files[0].size <= 5000000 || "Máximo 5MB";
                    },
                    fileType: (files) => {
                      if (!files?.[0]) return true;
                      return files[0].type.startsWith('image/') || "Solo imágenes";
                    }
                  }
                })}
              />
              <label
                htmlFor="foto-perfil"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Subir Foto
              </label>
              {errors.fotoPerfil && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fotoPerfil.message}
                </p>
              )}
              {!errors.fotoPerfil && (
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG o GIF (máx. 5MB)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Curriculum Vitae */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Currículum Vitae en PDF
          </h2>

          <div className="flex flex-col gap-4 items-center text-center">
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              {cvPreview ? (
                <div className="text-center">
                  <File className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-700">{cvPreview}</p>
                </div>
              ) : (
                <File className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <div className="w-full">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleCurriculumVitaeChange}
                {...register("curriculumVitae", {
                  required: "Curriculum Vitae requerido",
                  validate: {
                    fileSize: (files) => {
                      if (!files?.[0]) return "Curriculum Vitae requerido";
                      return files[0].size <= 5000000 || "Máximo 5MB";
                    },
                    fileType: (files) => {
                      if (!files?.[0]) return true;
                      return files[0].type === 'application/pdf' || "Solo archivos PDF";
                    }
                  }
                })}
                className="hidden"
                id="curriculum-vitae"
              />
              <label
                htmlFor="curriculum-vitae"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Subir CV
              </label>
              {errors.curriculumVitae && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.curriculumVitae.message}
                </p>
              )}
              {!errors.curriculumVitae && (
                <p className="text-sm text-gray-500 mt-1">Solo PDF (máx. 5MB)</p>
              )}
            </div>
          </div>
        </div>

        {/* Portafolio */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Portafolio (opcional)
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL (LinkedIn, Github, Website o Personal)
              </label>
              <Input
                type="url"
                placeholder="https://www.website.com"
                error={errors.portfolioUrl?.message}
                {...register("portfolioUrl", { 
                  required: false,
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "URL inválida"
                  }
                })}
              />
            </div>

            <div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handlePortafolioChange}
                className="hidden"
                id="portfolio"
                {...register("portfolioFile")}
              />
              <label
                htmlFor="portfolio"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Subir Portafolio
              </label>
              {portafolioPreview && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ {portafolioPreview}
                </p>
              )}
              {!portafolioPreview && (
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG o PDF (máx. 5MB)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preferencias */}
        <div className="border-t-1 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Preferencias
          </h2>

          <div className="space-y-4">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="checkbox"
                {...register("notificaciones")}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">
                Recibir notificaciones por email
              </span>
            </label>

            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="checkbox"
                {...register("perfilPublico")}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">
                Perfil público (visible para empleadores)
              </span>
            </label>

            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="checkbox"
                {...register("recibirOfertas")}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">
                Recibir ofertas de trabajo
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}