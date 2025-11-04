/**
 * CONTRATOS DE DATOS
 * Define la estructura esperada de los datos
 * El backend debe cumplir con estos contratos
 */

// ========== JOBS / Vacantes ==========
export const JobContract = {
  id: 0,
  titulo: "string", // Nombre del trabajo
  empresa: "string", 
  ubicacion: "string", 
  modalidad: "string", // "Remoto" | "Híbrido" | "Presencial"
  jornada: "string", // "Tiempo completo" | "Medio tiempo" | "Proyecto/Temporal" | "Practicas profesionales/Becario" | "Fines de semana"
  categoria: "string", // A determinar
  salario: "string", // "Sin salario" | "15,000" | "25,000" | "35,000" | "45,000" | "+50,000"
  logo: "", // URL de la imagen
  status_vacante: "string", // "Activa" | "Cerrada" | "En Pausa"
  fechaPublicacion: "", // ISO 8601
  descripcion: {
  // Usados en JobDetail
    responsabilidadesPrincipales: [], // Array de strings 
    requisitos: {
      indispensables: [], // Array de strings 
      deseables: [], // Array de strings 
    },
    beneficios: [], // Array de strings 
  },
  sueldoMinimo: 0,
  sueldoMaximo: 0,
};

// ========== APPLICATION / Postulaciones ==========
export const ApplicationContract = {
  id: 0,
  candidateId: 0,
  jobId: 0, 
  estado: "string", // "postulado" | "en_revision" | "aceptado" | "rechazado"
  fechaPostulacion: "", // ISO 8601
  fechaActualizacion: "", // ISO 8601
  notas: "string", 
  createdAtAdmin: "", // Fecha de creación por el admin
  //AGREGADO - Para evitar peticiones adicionales en mis-empleos
  job: JobContract // OPCIONAL: Información del trabajo relacionado
};

// ========== MESSAGE ==========
export const MessageContract = {
  id: 0,
  senderId: 0, // Persona que envía el mensaje
  sender: { // Datos que se extraen del que envia el mensaje
    name: "string",
    position: "string",
    company: "string",
    avatar: "" // URL de la imagen
  },
  preview: "string", // Texto corto que se muestra en la lista de mensajes
  date: null, // ISO 8601 o Date
  isRead: Boolean, 
  isSponsored: Boolean,
  hasAttachment: Boolean,
  // ✅ CORREGIDO - Estructura de conversación
  conversation: [
    {
      id: 0,
      content: "string",
      timestamp: null, // ISO 8601 o Date
      hasAttachment: Boolean // OPCIONAL
    }
  ]
};

// ========== NOTIFICATION ==========
export const NotificationContract = {
  id: 0,  
  type: "string", // "job_application" | "message" | "system"
  title: "string",
  message: "string",
  timestamp: null, // ISO 8601 o Date
  isRead: Boolean,
  action: {
    type: "", // "view_application" | "view_message" | "view_profile"
    jobId: 0,
    candidateId: 0,
    messageId: 0 
  },
  metadata: { // Estructura específica
    jobTitle: "string", // OPCIONAL
    company: "string", // OPCIONAL
    candidateName: "string", // OPCIONAL
    senderName: "string", // OPCIONAL para mensajes
    senderPosition: "string", // OPCIONAL para mensajes
    hasAttachment: Boolean, // OPCIONAL para mensajes
    isFeatured: Boolean // OPCIONAL
  }
};