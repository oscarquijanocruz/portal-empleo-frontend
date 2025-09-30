'use client';
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Save, Upload, X, Globe, UserCog, File } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import SeccionPersonal from '../mi-perfil/components/SeccionPersonal';

export default function EditarPerfilPage() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    // Bloque 1 - Información personal
    nombre: 'Miguel',
    apellido: 'Blanco',
    email: 'miguel.blanco@email.com',
    telefono: '+52 55 1234 5678',
    fechaNacimiento: '1995-05-15',
    genero: 'masculino',
    estadoCivil: 'soltero',
    // Ubicación
    ciudad: 'Ciudad de México',
    estado: 'CDMX',
    codigoPostal: '06000',
    
    // Bloque 2 - Datos profesionales
    // Educación
    nivelEducativo: 'licenciatura',
    institucion: 'Universidad Nacional Autónoma de México',
    carrera: 'Ingeniería en Sistemas Computacionales',
    fechaGraduacion: '2018-06-15',
    // Preferencias de empleado
    experiencia: '3 años',
    disponibilidad: 'inmediata',
    modalidadPreferida: 'remoto',
    tipoPuesto: [
      "Tecnología / Sistemas / Programación",
      "Administración / Oficina",
      "Ventas / Comercial",
      "Atención a clientes / Call center",
      "Contabilidad / Finanzas",
      "Recursos humanos",
      "Marketing / Publicidad / Comunicación",
      "Logística / Transporte / Almacén",
      "Ingeniería",
      "Manufactura / Producción / Operarios",
      "Salud / Medicina / Farmacia",
      "Educación / Docencia",
      "Diseño / Arte / Multimedia",
      "Legal / Jurídico",
      "Construcción / Arquitectura",
      "Hotelería / Turismo / Restaurantes",
      "Otros / Generales"
    ],
    tipoJornada: [
      "Tiempo completo",
      "Medio tiempo",
      "Prácticas profesionales / Becario",
      "Temporal / Proyecto",
    ],
    // Habilidades
    habilidades: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    idiomas: [
      { idioma: 'Español', nivel: 'Nativo' },
      { idioma: 'Inglés', nivel: 'Intermedio' }
    ],
    
    //Bloque 3 - exp. laboral
    nombreEmpresa: "Mentory",
    cargo: "Gerente",
    resumen: 'Desarrollador con 3 años de experiencia en React y Next.js, apasionado por crear interfaces de usuario intuitivas y eficientes.',
    periodo: [
      { anioEntrada: '2024', 
        mesEntrada: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
      ],
       anioSalida: '2025',
        mesSalida: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        ], 
      },

    ],

    //Bloque - Documentación 


    // Preferencias
    notificaciones: true,
    perfilPublico: true,
    recibirOfertas: true
  });

  const [nuevaHabilidad, setNuevaHabilidad] = useState('');
  const [nuevoIdioma, setNuevoIdioma] = useState({ idioma: '', nivel: '' });
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [curriculumVitae, setCurriculumVitae] = useState(null);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Agregar nueva habilidad
  const agregarHabilidad = () => {
    if (nuevaHabilidad.trim() && !formData.habilidades.includes(nuevaHabilidad.trim())) {
      setFormData(prev => ({
        ...prev,
        habilidades: [...prev.habilidades, nuevaHabilidad.trim()]
      }));
      setNuevaHabilidad('');
    }
  };

  // Eliminar habilidad
  const eliminarHabilidad = (habilidad) => {
    setFormData(prev => ({
      ...prev,
      habilidades: prev.habilidades.filter(h => h !== habilidad)
    }));
  };

  // Agregar nuevo idioma
  const agregarIdioma = () => {
    if (nuevoIdioma.idioma.trim() && nuevoIdioma.nivel.trim()) {
      setFormData(prev => ({
        ...prev,
        idiomas: [...prev.idiomas, { ...nuevoIdioma }]
      }));
      setNuevoIdioma({ idioma: '', nivel: '' });
    }
  };

  // Eliminar idioma
  const eliminarIdioma = (index) => {
    setFormData(prev => ({
      ...prev,
      idiomas: prev.idiomas.filter((_, i) => i !== index)
    }));
  };

  // Manejar subida de foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoPerfil(file);
    }
  };

  // Manejar subida de CV
  const handleCVChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurriculumVitae(file);
    }
  };

  // Guardar perfil
  const guardarPerfil = (e) => {
    e.preventDefault();
    console.log('Guardando perfil:', formData);
    // Aquí se implementaría la lógica para guardar en el backend
    alert('Perfil actualizado exitosamente');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar Perfil</h1>
        <p className="text-gray-600">Actualiza tu información personal y profesional</p>
        {/* <SeccionPersonal /> */}
      </div>

      <form onSubmit={guardarPerfil} className="space-y-8">
        
        {/* Información Personal */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <Input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <Input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Tu apellido"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tu@email.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="+52 55 1234 5678"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
              <Input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero-no-decir">Prefiero no decir</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado Civil</label>
              <select
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleInputChange}
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
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-6">
            <MapPin className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Ubicación</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
              <Input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                placeholder="Ciudad"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <Input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                placeholder="Estado"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
              <Input
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleInputChange}
                placeholder="00000"
              />
            </div>
          </div>
        </div>

        {/* Educación */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-6">
            <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Educación</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nivel Educativo</label>
              <select
                name="nivelEducativo"
                value={formData.nivelEducativo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="secundaria">Secundaria</option>
                <option value="preparatoria">Preparatoria</option>
                <option value="tecnico">Técnico</option>
                <option value="licenciatura">Licenciatura</option>
                <option value="maestria">Maestría</option>
                <option value="doctorado">Doctorado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institución</label>
              <Input
                type="text"
                name="institucion"
                value={formData.institucion}
                onChange={handleInputChange}
                placeholder="Nombre de la institución"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carrera/Especialidad</label>
              <Input
                type="text"
                name="carrera"
                value={formData.carrera}
                onChange={handleInputChange}
                placeholder="Nombre de la carrera"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Graduación</label>
              <Input
                type="date"
                name="fechaGraduacion"
                value={formData.fechaGraduacion}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Datos Profesionales */}
          <div className="flex items-center mb-6">
            <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Información Profesional</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
              <Input
                type="text"
                name="titulo"
                value={formData.nombreEmpresa}
                onChange={handleInputChange}
                placeholder="Tu título o puesto actual"
              />
            </div>
            
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
              <Input
                type="text"
                name="titulo"
                value={formData.cargo}
                onChange={handleInputChange}
                placeholder="Tu título o puesto actual"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Periodo</label>
              <label >Entrada</label>
              <select 
                value={formData.periodo}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="anioEntrada" id="anioEntrada">
                  <option 
                  value={formData.anioEntrada}>2024</option>
              </select>
              <select 
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="periodo" id="periodo">
                  <option value="Enero">Enero</option>
                  <option value="Febrero">Febrero</option>  
              </select>
              <label >Salida</label>
              <select 
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="anioSalida" id="anioSalida">
                <option value="Enero">2025</option>
              </select>
              <select 
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="periodo" id="periodo">
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>  
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resumen Profesional</label>
              <textarea
                name="resumen"
                value={formData.resumen}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe tu experiencia y objetivos profesionales..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Años de Experiencia</label>
                <select
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sin-experiencia">Sin experiencia</option>
                  <option value="1 año">1 año</option>
                  <option value="2 años">2 años</option>
                  <option value="3 años">3 años</option>
                  <option value="4 años">4 años</option>
                  <option value="5+ años">5+ años</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidad</label>
                <select
                  name="disponibilidad"
                  value={formData.disponibilidad}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="inmediata">Inmediata</option>
                  <option value="1 semana">1 semana</option>
                  <option value="2 semanas">2 semanas</option>
                  <option value="1 mes">1 mes</option>
                  <option value="2 meses">2 meses</option>
                </select>
              </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modalidad Preferida</label>
                <select
                  name="modalidadPreferida"
                  value={formData.modalidadPreferida}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de puesto</label>
                <select
                  name="tipoPuesto"
                  value={formData.tipoPuesto}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="categorias">Todas las categorías</option>
                    <option value="tecnologia">Tecnología / Sistemas</option>
                    <option value="administracion">Administración / Oficina</option>
                    <option value="ventas">Ventas / Comercial</option>
                    <option value="atencion">Atención a clientes</option>
                    {/* <option value="finanzas">Contabilidad / Finanzas</option>
                    <option value="rh">Recursos humanos</option>
                    <option value="marketing">Marketing / Publicidad</option>
                    <option value="logistica">Logística / Transporte</option>
                    <option value="ingenieria">Ingeniería</option>
                    <option value="manufactura">Manufactura / Producción</option>
                    <option value="salud">Salud / Medicina</option>
                    <option value="educacion">Educación / Docencia</option>
                    <option value="diseno">Diseño / Arte</option>
                    <option value="legal">Legal / Jurídico</option>
                    <option value="construccion">Construcción / Arquitectura</option>
                    <option value="turismo">Hotelería / Turismo</option>
                    <option value="otros">Otros</option> */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jornada</label>
                <select
                  name="tipoJornada"
                  value={formData.tipoJornada}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="presencial">Tiempo completo</option>
                  <option value="remoto">Medio tiempo</option>
                  <option value="hibrido">Prácticas profesionales / Becario</option>
                  <option value="remoto">Temporal / Proyecto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Habilidades */}
          <div className='mb-6'>
            <div className="flex items-center mb-6">
              <UserCog className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Habilidades</h2>
            </div>

            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={nuevaHabilidad}
                  onChange={(e) => setNuevaHabilidad(e.target.value)}
                  placeholder="Agregar nueva habilidad"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarHabilidad())}
                />
                <Button onClick={agregarHabilidad} type="button">
                  Agregar
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.habilidades.map((habilidad, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {habilidad}
                  <button
                    type="button"
                    onClick={() => eliminarHabilidad(habilidad)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* Idiomas */}
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Idiomas</h2>
          </div>
          
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                type="text"
                value={nuevoIdioma.idioma}
                onChange={(e) => setNuevoIdioma(prev => ({ ...prev, idioma: e.target.value }))}
                placeholder="Idioma"
              />
              <select
                value={nuevoIdioma.nivel}
                onChange={(e) => setNuevoIdioma(prev => ({ ...prev, nivel: e.target.value }))}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Nivel</option>
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Nativo">Nativo</option>
              </select>
              <Button onClick={agregarIdioma} type="button">
                Agregar
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            {formData.idiomas.map((idioma, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">{idioma.idioma}</span>
                <span className="text-sm text-gray-600">{idioma.nivel}</span>
                <button
                  type="button"
                  onClick={() => eliminarIdioma(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Foto de Perfil */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Foto de Perfil</h2>
          
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
                onChange={handleFotoChange}
                className="hidden"
                id="foto-perfil"
              />
              <label
                htmlFor="foto-perfil"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Subir Foto
              </label>
              <p className="text-sm text-gray-500 mt-1">JPG, PNG o GIF (máx. 5MB)</p>
            </div>
          </div>
        
          {/* Curriculum Vitae */}
          <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-6">Currículum en PDF</h2>

          <div className="flex items-center space-x-6">
            
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
                onChange={handleCVChange}
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

        {/* Preferencias */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferencias</h2>
          
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notificaciones"
                checked={formData.notificaciones}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-gray-700">Recibir notificaciones por email</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="perfilPublico"
                checked={formData.perfilPublico}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-gray-700">Perfil público (visible para empleadores)</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="recibirOfertas"
                checked={formData.recibirOfertas}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span className="text-gray-700">Recibir ofertas de trabajo</span>
            </label>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <Button type="button" className="bg-gray-500 hover:bg-gray-700">
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
