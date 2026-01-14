import Input from "@/app/components/ui/Input";
import { File, Upload, User, X, Image as ImageIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import Checkbox from "@/app/components/ui/Checkbox";

export default function StepDoc() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useFormContext();

  // Estados locales para preview
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);
  const [portafolioPreview, setPortafolioPreview] = useState(null);

  // Estados para drag and drop
  const [isDraggingFoto, setIsDraggingFoto] = useState(false);
  const [isDraggingCV, setIsDraggingCV] = useState(false);
  const [isDraggingPortafolio, setIsDraggingPortafolio] = useState(false);

  // Refs para los inputs de file
  const fotoPerfilInputRef = useRef(null);
  const cvInputRef = useRef(null);
  const portafolioInputRef = useRef(null);

  // Handlers para click en áreas de drag and drop
  const handleFotoPerfilClick = () => {
    fotoPerfilInputRef.current?.click();
  };

  const handleCVClick = () => {
    cvInputRef.current?.click();
  };

  const handlePortafolioClick = () => {
    portafolioInputRef.current?.click();
  };

  // Watch para checkboxes
  const notificaciones = watch("notificaciones");
  const perfilPublico = watch("perfilPublico");
  const recibirOfertas = watch("recibirOfertas");

  // Función genérica para procesar archivo de foto
  const processFotoFile = (file) => {
    if (!file) return false;
    
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen");
      return false;
    }
    
    if (file.size > 5000000) {
      alert("El archivo es muy grande. Máximo 5MB");
      return false;
    }
    
    const previewUrl = URL.createObjectURL(file);
    setFotoPerfilPreview(previewUrl);
    setValue("fotoPerfil", [file]);
    clearErrors("fotoPerfil");
    return true;
  };

  // Función genérica para procesar archivo de CV
  const processCVFile = (file) => {
    if (!file) return false;

    if (file.type !== "application/pdf" && file.type !== "application/msword" && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      alert("Solo se permiten archivos PDF y Word");
      return false;
    }
    
    if (file.size > 5000000) {
      alert("El archivo es muy grande. Máximo 5MB");
      return false;
    }
    
    setCvPreview(file.name);
    setValue("curriculumVitae", [file]);
    clearErrors("curriculumVitae");
    return true;
  };

  // Función genérica para procesar archivo de portafolio
  const processPortafolioFile = (file) => {
    if (!file) return false;
    
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Solo se permiten archivos JPG, PNG o PDF");
      return false;
    }
    
    if (file.size > 5000000) {
      alert("El archivo es muy grande. Máximo 5MB");
      return false;
    }
    
    setPortafolioPreview(file.name);
    setValue("portfolioFile", [file]);
    return true;
  };

  // Manejar subida de foto de perfil con preview
  const handleFotoPerfilChange = (e) => {
    const file = e.target.files?.[0];
    processFotoFile(file);
  };

  // Manejar subida de curriculum vitae
  const handleCurriculumVitaeChange = (e) => {
    const file = e.target.files?.[0];
    processCVFile(file);
  };

  // Eliminar curriculum vitae
  const eliminarCV = () => {
    setCvPreview(null);
    if (cvInputRef.current) {
      cvInputRef.current.value = '';
    }
    setValue("curriculumVitae", null);
    clearErrors("curriculumVitae");
  };

  // Eliminar foto de perfil
  const eliminarFoto = () => {
    setFotoPerfilPreview(null);
    if (fotoPerfilInputRef.current) {
      fotoPerfilInputRef.current.value = '';
    }
    setValue("fotoPerfil", null);
    clearErrors("fotoPerfil");
  };

  // Eliminar portafolio
  const eliminarPortafolio = () => {
    setPortafolioPreview(null);
    if (portafolioInputRef.current) {
      portafolioInputRef.current.value = '';
    }
    setValue("portfolioFile", null);
  };

  // Manejar subida de portafolio
  const handlePortafolioChange = (e) => {
    const file = e.target.files?.[0];
    processPortafolioFile(file);
  };

  // Handlers para drag and drop - Foto de perfil
  const handleDragOverFoto = (e) => {
    e.preventDefault();
    setIsDraggingFoto(true);
  };

  const handleDragLeaveFoto = (e) => {
    e.preventDefault();
    setIsDraggingFoto(false);
  };

  const handleDropFoto = (e) => {
    e.preventDefault();
    setIsDraggingFoto(false);
    const file = e.dataTransfer.files[0];
    processFotoFile(file);
  };

  // Handlers para drag and drop - CV
  const handleDragOverCV = (e) => {
    e.preventDefault();
    setIsDraggingCV(true);
  };

  const handleDragLeaveCV = (e) => {
    e.preventDefault();
    setIsDraggingCV(false);
  };

  const handleDropCV = (e) => {
    e.preventDefault();
    setIsDraggingCV(false);
    const file = e.dataTransfer.files[0];
    processCVFile(file);
  };

  // Handlers para drag and drop - Portafolio
  const handleDragOverPortafolio = (e) => {
    e.preventDefault();
    setIsDraggingPortafolio(true);
  };

  const handleDragLeavePortafolio = (e) => {
    e.preventDefault();
    setIsDraggingPortafolio(false);
  };

  const handleDropPortafolio = (e) => {
    e.preventDefault();
    setIsDraggingPortafolio(false);
    const file = e.dataTransfer.files[0];
    processPortafolioFile(file);
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

          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
              {fotoPerfilPreview ? (
                <Image
                  src={fotoPerfilPreview}
                  alt="Foto de perfil"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <div className="flex-1">
              <input
                ref={fotoPerfilInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoPerfilChange}
                id="foto-perfil"
                className="hidden"
                {...register("fotoPerfil", {
                  validate: {
                    fileSize: (files) => {
                      if (!files?.[0]) return true;
                      return files[0].size <= 5000000 || "Máximo 5MB";
                    },
                    fileType: (files) => {
                      if (!files?.[0]) return true;
                      return (
                        files[0].type.startsWith("image/") || "Solo imágenes"
                      );
                    },
                  },
                })}
              />
              
              <div
                onClick={handleFotoPerfilClick}
                onDragOver={handleDragOverFoto}
                onDragLeave={handleDragLeaveFoto}
                onDrop={handleDropFoto}
                className={`
                  border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all
                  ${isDraggingFoto 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                  ${fotoPerfilPreview ? 'border-green-300 bg-green-50' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className={`w-8 h-8 mb-2 ${isDraggingFoto ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {fotoPerfilPreview ? 'Foto seleccionada' : 'Arrastra y suelta tu foto aquí'}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    o haz clic para seleccionar
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    {fotoPerfilPreview ? 'Cambiar Foto' : 'Subir Foto'}
                  </button>
                  {fotoPerfilPreview && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarFoto();
                      }}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Eliminar foto
                    </button>
                  )}
                </div>
              </div>
              
              {errors.fotoPerfil && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.fotoPerfil.message}
                </p>
              )}
              {!errors.fotoPerfil && (
                <p className="text-sm text-gray-500 mt-2">
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

          <div className="space-y-4">
            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCurriculumVitaeChange}
              id="curriculum-vitae"
              className="hidden"
              {...register("curriculumVitae", {
                required: "Curriculum Vitae requerido",
                validate: {
                  fileSize: (files) => {
                    if (!files?.[0]) return "Curriculum Vitae requerido";
                    return files[0].size <= 5000000 || "Máximo 5MB";
                  },
                  fileType: (files) => {
                    if (!files?.[0]) return true;
                    return (
                      files[0].type === "application/pdf" ||
                      files[0].type === "application/msword" ||
                      files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    );
                  },
                },
              })}
            />
            
            {cvPreview ? (
              <div className="w-full bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{cvPreview}</p>
                      <p className="text-xs text-green-600">PDF subido correctamente</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={eliminarCV}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="Eliminar archivo"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleCVClick}
                onDragOver={handleDragOverCV}
                onDragLeave={handleDragLeaveCV}
                onDrop={handleDropCV}
                className={`
                  border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all
                  ${isDraggingCV 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <File className={`w-12 h-12 mb-3 ${isDraggingCV ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-base font-medium text-gray-700 mb-1">
                    Arrastra y suelta tu CV aquí
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    o haz clic para seleccionar
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Subir CV
                  </button>
                </div>
              </div>
            )}
            
            {errors.curriculumVitae && (
              <p className="text-red-500 text-sm mt-1">
                {errors.curriculumVitae.message}
              </p>
            )}
            {!errors.curriculumVitae && !cvPreview && (
              <p className="text-sm text-gray-500">
                Solo PDF (máx. 5MB)
              </p>
            )}
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
                URL (LinkedIn, Github, Carpeta de Drive, Website Personal)
              </label>
              <Input
                type="url"
                placeholder="https://www.website.com"
                error={errors.portfolioUrl?.message}
                {...register("portfolioUrl", {
                  required: false,
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "URL inválida",
                  },
                })}
              />
            </div>

            <input
              ref={portafolioInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handlePortafolioChange}
              id="portfolio"
              className="hidden"
              {...register("portfolioFile")}
            />
            
            {portafolioPreview ? (
              <div className="w-full bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{portafolioPreview}</p>
                      <p className="text-xs text-green-600">Archivo subido correctamente</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={eliminarPortafolio}
                    className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="Eliminar archivo"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={handlePortafolioClick}
                onDragOver={handleDragOverPortafolio}
                onDragLeave={handleDragLeavePortafolio}
                onDrop={handleDropPortafolio}
                className={`
                  border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all
                  ${isDraggingPortafolio 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <ImageIcon className={`w-12 h-12 mb-3 ${isDraggingPortafolio ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-base font-medium text-gray-700 mb-1">
                    Arrastra y suelta tu portafolio aquí
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    o haz clic para seleccionar
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Subir Portafolio
                  </button>
                </div>
              </div>
            )}
            
            {!portafolioPreview && (
              <p className="text-sm text-gray-500">
                JPG, PNG o PDF (máx. 5MB)
              </p>
            )}
          </div>
        </div>

        {/* Preferencias */}
        <div className="border-t-1 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Preferencias
          </h2>

          <div className="space-y-2">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <Checkbox
                {...register("notificaciones")}
                name="notificaciones"
                checked={notificaciones}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">
                Recibir notificaciones por email
              </span>
            </label>

            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <Checkbox
                {...register("perfilPublico")}
                name="perfilPublico"
                checked={perfilPublico}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">
                Perfil público (visible para empleadores)
              </span>
            </label>

            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <Checkbox
                {...register("recibirOfertas")}
                name="recibirOfertas"
                checked={recibirOfertas}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">Recibir ofertas de trabajo</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
