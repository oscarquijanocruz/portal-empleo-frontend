export const mockMessages = [
  {
    id: 1,
    sender: {
      name: "Monserrat Guerrero",
      position: "Coordinadora de compras",
      company: "Grupo OMESE",
      avatar: "/api/placeholder/40/40"
    },
    preview: "¿Buscas servicios de limpieza y...",
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 días atrás
    isRead: false,
    isSponsored: true,
    conversation:
      {
        content: "Hola, vi tu perfil y me parece que podrías ser un gran candidato para nuestra empresa. ¿Buscas servicios de limpieza y mantenimiento?",
        timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        isOwn: false
      },
  },
  {
    id: 2,
    sender: {
      name: "LinkedIn",
      position: "Oferta de LinkedIn",
      company: "LinkedIn",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Hola, Mentory Grupo: Gracias por...",
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    isRead: true,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "Hola, Mentory Grupo: Gracias por usar LinkedIn para encontrar talento. Aquí tienes algunas recomendaciones personalizadas.",
        timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        isOwn: false
      }
    ]
  },
  {
    id: 3,
    sender: {
      name: "Luis Adan Sánchez Hernández",
      position: "Desarrollador Frontend",
      company: "Freelancer",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Luis Adan: Le envío mi CV",
    date: new Date(Date.now() - 155 * 24 * 60 * 60 * 1000), // 8 jul aprox
    isRead: true,
    isSponsored: false,
    conversation: 
      {
        id: 1,
        content: "Buen día, le envío mi CV para la posición de Desarrollador Frontend que publicaron. Tengo 3 años de experiencia con React.",
        timestamp: new Date(Date.now() - 155 * 24 * 60 * 60 * 1000),
        isOwn: false
      }
  },
  {
    id: 4,
    sender: {
      name: "Jimena Perez Gramos",
      position: "Reclutadora",
      company: "HR Solutions",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Jimena: Hola Mentory Grupo Cómo estás? Me encanta la...",
    date: new Date(Date.now() - 83 * 24 * 60 * 60 * 1000), // 22 mar aprox
    isRead: true,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "Hola Mentory Grupo, ¿Cómo estás? Me encanta la labor que hacen conectando talento con empresas. ¿Podríamos colaborar?",
        timestamp: new Date(Date.now() - 83 * 24 * 60 * 60 * 1000),
        isOwn: false
      }
    ]
  },
  {
    id: 5,
    sender: {
      name: "Federico Jasso",
      position: "Ingeniero de Software",
      company: "Tech Startup",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Federico: Puedo enviarles mi cv a través de este medio?",
    date: new Date(Date.now() - 68 * 24 * 60 * 60 * 1000), // 7 mar aprox
    isRead: true,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "Hola, ¿puedo enviarles mi CV a través de este medio? Estoy interesado en oportunidades de desarrollo.",
        timestamp: new Date(Date.now() - 68 * 24 * 60 * 60 * 1000),
        isOwn: false
      },
      {
        id: 2,
        content: "Hola Federico, claro que sí. Puedes enviarnos tu CV y nos pondremos en contacto contigo.",
        timestamp: new Date(Date.now() - 67 * 24 * 60 * 60 * 1000),
        isOwn: true
      }
    ]
  },
  {
    id: 6,
    sender: {
      name: "Ximena Badía Vargas",
      position: "HR Specialist",
      company: "Involve RH",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Ximena: ¡Hola! Soy Ximena Badía, de Involve RH. Vi tu...",
    date: new Date(Date.now() - 59 * 24 * 60 * 60 * 1000), // 1 mar aprox
    isRead: true,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "¡Hola! Soy Ximena Badía, de Involve RH. Vi tu perfil y me parece muy interesante. ¿Tienes tiempo para una llamada?",
        timestamp: new Date(Date.now() - 59 * 24 * 60 * 60 * 1000),
        isOwn: false
      }
    ]
  },
  {
    id: 7,
    sender: {
      name: "Alejandro Orozco",
      position: "Project Manager",
      company: "Digital Solutions",
      avatar: "/api/placeholder/40/40"
    },
    preview: "🔗 Alejandro ha enviado un adjunto",
    date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 9 feb aprox
    isRead: true,
    isSponsored: false,
    hasAttachment: true,
    conversation: [
      {
        id: 1,
        content: "Hola, te envío información sobre un proyecto que podría interesarte. Adjunto los detalles.",
        timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        isOwn: false,
        hasAttachment: true
      }
    ]
  },
  {
    id: 8,
    sender: {
      name: "María González",
      position: "Diseñadora UX/UI",
      company: "Freelancer",
      avatar: "/api/placeholder/40/40"
    },
    preview: "María: Hola, me interesa la vacante de diseñadora que publicaron",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
    isRead: false,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "Hola, me interesa mucho la vacante de diseñadora UX/UI que publicaron. Tengo 4 años de experiencia en diseño de interfaces y me gustaría enviarles mi portafolio.",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isOwn: false
      },
      {
        id: 2,
        content: "Hola María, gracias por tu interés. Por favor envía tu portafolio y CV a nuestro correo de recursos humanos.",
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        isOwn: true
      }
    ]
  },
  {
    id: 9,
    sender: {
      name: "Carlos Mendoza",
      position: "Desarrollador Full Stack",
      company: "TechCorp",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Carlos: ¿Podrían revisar mi aplicación para la posición de desarrollador?",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 días atrás
    isRead: true,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "Buenos días, he aplicado para la posición de desarrollador full stack. ¿Podrían revisar mi aplicación? Adjunto mi CV actualizado.",
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
        isOwn: false,
        hasAttachment: true
      },
      {
        id: 2,
        content: "Hola Carlos, hemos recibido tu aplicación. Nuestro equipo de RRHH se pondrá en contacto contigo en los próximos días.",
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        isOwn: true
      }
    ]
  },
  {
    id: 10,
    sender: {
      name: "Ana Rodríguez",
      position: "Marketing Digital",
      company: "Agencia Creativa",
      avatar: "/api/placeholder/40/40"
    },
    preview: "Ana: Estoy interesada en colaborar con ustedes como freelancer",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
    isRead: false,
    isSponsored: false,
    conversation: [
      {
        id: 1,
        content: "Hola, soy Ana Rodríguez, especialista en marketing digital. He visto que buscan colaboradores para proyectos de marketing y me gustaría ofrecer mis servicios como freelancer. ¿Podríamos tener una reunión?",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isOwn: false
      }
    ]
  }
];