/**
 * CONTRATOS DE DATOS
 * Define la estructura esperada de los datos
 * El backend debe cumplir con estos contratos
 */

// ========== JOBS / Vacantes ==========
export const JobContract = {
  id: 0,
  titulo: "string", // Nombre del trabajo
  empresaId: 0, // ID de la empresa
  empresa: "string", // Derivado (join)
  ubicacion: "string", 
  modalidad: "string", // "Remoto" | "Híbrido" | "Presencial"
  jornada: "string", // "Tiempo completo" | "Medio tiempo" | "Proyecto/Temporal" | "Practicas profesionales/Becario" | "Fines de semana"
  categoria: "string", // A determinar
  salarioFijo: "string", // "Sin salario" | "15,000" | "25,000" | "35,000" | "45,000" | "+50,000"
  urlEmpresaLogo: "", // URL de la imagen
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
  sueldoMinimo: 0, // number | null
  sueldoMaximo: 0, // number | null
  moneda: "MXN",
  periodicidad: "Mensual", // "Mensual" | "Anual"
  esDestacada: Boolean,
};

// ========== APPLICATION / Postulaciones ==========
export const ApplicationContract = {
  id: 0,
  candidateId: 0,
  jobId: 0, 
  estadoPostulacion: "string", // "En revisión" | "Entrevista" | "Contratado/Aceptado" | "Rechazado"
  fechaPostulacion: "", // ISO 8601 ejemplo: "2025-01-15T10:30:00Z"
  fechaActualizacion: "", // ISO 8601
  notas: "string", 
  createdAtAdmin: "", // Fecha de creación por el admin
  //AGREGADO - Para evitar peticiones adicionales en mis-empleos
  job: JobContract // JobContract (OBLIGATORIO para Mis Empleos)
};

// ========== MESSAGE ==========
export const MessageContract = {
  id: 0,
  conversationId: 0,
  senderId: 0, // Persona que envía el mensaje
  sender: { // Datos que se extraen del que envia el mensaje
    name: "string",
    position: "string",
    company: "string",
    avatar: "" // URL de la imagen
  },
  preview: "string", // Texto corto que se muestra en la lista de mensajes
  content: "string", // Texto completo
  date: "string", // ISO 8601 o Date
  isRead: Boolean, 
  isSponsored: Boolean,
  hasAttachment: Boolean,
};

export const ConversationContract = {
  id: 0,
  asunto: "string",
  participants: [ { id: 0, name: "string", avatar: "string" } ],
  lastMessage: null, // MessageContract | null
  unreadCount: 0
};


// ========== NOTIFICATION ==========
export const NotificationContract = { // Se necesita notificaciones personalizadas para cada usuario
  id: 0,
  userId: 0,  
  tipo: "string", // "Informativa" | "Alerta" | "Mantenimiento"
  titulo: "string",
  message: "string",
  timestamp: "", // ISO 8601 o Date
  isRead: Boolean,
  action: {
    tipo: "", // "Informativa" | "Alerta" | "Mantenimiento"
    jobId: 0,
    candidateId: 0,
    messageId: 0 
  },
};