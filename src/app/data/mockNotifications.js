export const mockNotifications = [
  {
    id: 1,
    type: "job_application",
    title: "Nueva postulación de trabajo",
    message: "Aplicaste para la posición de Cocinero",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    isRead: false,
    priority: "high",
    action: {
      type: "view_application",
      jobId: "ux-designer-001",
      candidateId: "maria-gonzalez-123"
    },
    metadata: {
      jobTitle: "Diseñadora UX/UI",
      company: "TechCorp",
      candidateName: "María González"
    }
  },
  {
    id: 2,
    type: "message",
    title: "Nuevo mensaje",
    message: "Ana Rodríguez te ha enviado un mensaje sobre colaboración freelance",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
    isRead: false,
    priority: "medium",
    action: {
      type: "view_message",
      messageId: "ana-rodriguez-msg-001"
    },
    metadata: {
      senderName: "Ana Rodríguez",
      senderPosition: "Marketing Digital",
      company: "Agencia Creativa"
    }
  },
  {
    id: 3,
    type: "system",
    title: "Perfil actualizado",
    message: "Tu perfil ha sido actualizado exitosamente",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
    isRead: true,
    priority: "low",
    action: {
      type: "view_profile"
    }
  },
  {
    id: 4,
    type: "job_application",
    title: "Postulación en revisión",
    message: "Se ha actualizado su postulación para mesero",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    isRead: true,
    priority: "medium",
    action: {
      type: "view_application",
      jobId: "mesero-kfc-001",
      candidateId: "carlos-mendoza-456"
    },
    metadata: {
      jobTitle: "Mesero",
      company: "KFC",
      candidateName: "Carlos Mendoza"
    }
  },
  {
    id: 5,
    type: "message",
    title: "Mensaje con adjunto",
    message: "Alejandro Orozco ha enviado un archivo adjunto",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
    isRead: true,
    priority: "medium",
    action: {
      type: "view_message",
      messageId: "alejandro-orozco-attachment-001"
    },
    metadata: {
      senderName: "Alejandro Orozco",
      senderPosition: "Project Manager",
      company: "Digital Solutions",
      hasAttachment: true
    }
  },
  {
    id: 6,
    type: "system",
    title: "Nueva funcionalidad",
    message: "Hemos agregado nuevas opciones de filtrado en la búsqueda de empleos",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
    isRead: true,
    priority: "low",
    action: {
      type: "view_features"
    }
  },
  {
    id: 7,
    type: "job_application",
    title: "Postulación aceptada",
    message: "Se ha aceptado tu postulación para Desarrollador Full Stack",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 días atrás
    isRead: false,
    priority: "high",
    action: {
      type: "view_application",
      jobId: "senior-frontend-003",
      candidateId: "luis-adan-sanchez-789"
    },
    metadata: {
      jobTitle: "Desarrollador Full Stack",
      company: "StartupTech",
      isFeatured: true,
      //candidateName: "Luis Adan Sánchez Hernández"
    }
  },
  {
    id: 8,
    type: "message",
    title: "Solicitud de colaboración",
    message: "Jimena Perez Gramos quiere colaborar con tu empresa",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 días atrás
    isRead: true,
    priority: "medium",
    action: {
      type: "view_message",
      messageId: "jimena-perez-collaboration-001"
    },
    metadata: {
      senderName: "Jimena Perez Gramos",
      senderPosition: "Reclutadora",
      company: "HR Solutions"
    }
  },
  {
    id: 9,
    type: "system",
    title: "Mantenimiento programado",
    message: "El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 4:00 AM",
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 días atrás
    isRead: true,
    priority: "low",
    action: {
      type: "view_maintenance"
    }
  },
  {
    id: 10,
    type: "job_application",
    title: "Postulación rechazada",
    message: "Se ha rechazado tu postulación para Ingeniero de Software",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 días atrás
    isRead: true,
    priority: "high",
    action: {
      type: "view_application",
      jobId: "software-engineer-004",
      // candidateId: "federico-jasso-101"
    },
    metadata: {
      jobTitle: "Ingeniero de Software",
      company: "Tech Startup",
      // candidateName: "Federico Jasso",
    }
  }
];

export const notificationTypes = {
  job_application: {
    label: "Postulaciones de trabajo",
    icon: "📋",
    color: "blue"
  },
  message: {
    label: "Mensajes",
    icon: "💬",
    color: "green"
  },
  system: {
    label: "Sistema",
    icon: "⚙️",
    color: "gray"
  }
};
