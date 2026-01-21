/**
 * MOCK DATA para desarrollo frontend
 * 
 * Backend team: Reemplazar con endpoints reales:
 * - GET /api/jobs → Lista de empleos
 * - POST /api/jobs/search → Búsqueda con filtros
 * - GET /api/jobs/:id → Detalle de empleo
 * 
 * Estructura de respuesta esperada: { data: Job[] }
 */
// Datos simlados (reemplazar por el backend cuando este)
export const mockJobs = [
  {
    id: 1,
    titulo: "Desarrollador Frontend React",
    empresa: "Tech Solutions",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "45,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa", // Activa, Cerrada, En Pausa
    fechaPublicacion: "2025/05/20",
    isSponsored: true,
    descripcion: "Somos una empresa que vende soluciones tecnológicas",
    responsabilidades: [
      "Diseñar, desarrollar y optimizar aplicaciones web",
      "Colaborar con el equipo de diseño UX/UI",
      "Realizar análisis de rendimiento",
      "Participar en la creación de componentes reutilizables"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Sistemas o experiencia equivalente",
        "Manejo de herramientas como React, Next.js",
        "Experiencia mínima de 3 años en desarrollo Frontend",
        "Habilidades en comunicación y trabajo en equipo"
      ],
      deseables: [
        "Conocimiento en TypeScript",
        "Certificaciones en tecnologías web",
        "Idiomas adicionales (inglés)"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Experiencia en el desarrollo de aplicaciones web",
      "Prestaciones de ley",
      "Prima vacacional",
      "1 Hora de desayuno"
    ],
    sueldoMinimo: 30000,
    sueldoMaximo: 55000,
  },
  {
    id: 2,
    titulo: "Diseñador UX/UI",
    empresa: "Creative Studio",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "ventas",
    salario: "38,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa", // Activa, Cerrada, En Pausa
    fechaPublicacion: "2025/10/09",
    isSponsored: true,
    descripcion: "Únete a nuestro equipo creativo como Diseñador UX/UI...",
    responsabilidades: [
      "Crear wireframes y prototipos",
      "Diseñar interfaces de usuario atractivas",
      "Realizar investigación de usuarios",
      "Colaborar con desarrolladores"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Diseño Gráfico o afín",
        "Experiencia con Figma, Adobe XD",
        "Portfolio demostrable",
        "Conocimiento en principios de UX"
      ],
      deseables: [
        "Experiencia en investigación UX",
        "Conocimiento básico de HTML/CSS",
        "Inglés conversacional"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Seguro médico",
      "Prestaciones de ley",
      "Prima vacacional"
    ],
    sueldoMinimo: 10000,
    sueldoMaximo: 15000,
  },
  {
    id: 3,
    titulo: "Marketing Digital",
    empresa: "Digital Agency",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "diseno",
    salario: "90,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa", // Activa, Cerrada, En Pausa
    fechaPublicacion: "2025/05/20",
    isSponsored: false,
    descripcion: "Especialista en marketing digital para campañas innovadoras...",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Prima vacacional",
      "1 Hora de desayuno"
    ],
  },
  {
    id: 4,
    titulo: "Actor Telenovela",
    empresa: "Televisa",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "diseno",
    salario: "14,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa", // Activa, Cerrada, En Pausa
    fechaPublicacion: "2025/02/20",
    isSponsored: true,
    descripcion: "Especialista en marketing digital para campañas innovadoras...",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Prima vacacional",
      "Nada",
    ],
  },
  {
    id: 5,
    titulo: "Chef",
    empresa: "Boston's",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "diseno",
    salario: "50,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "En Pausa", // Activa, Cerrada, En Pausa
    fechaPublicacion: "2025/02/20",
    isSponsored: true,
    descripcion: "Especialista en marketing digital para campañas innovadoras...",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    }
  },
  {
    id: 6,
    titulo: "Bar Tender",
    empresa: "Monster Pizza",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Medio tiempo ",
    categoria: "diseno",
    salario: "30,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa", // Activa, Cerrada, En Pausa
    fechaPublicacion: "2023/12/10",
    isSponsored: false,
    descripcion: "Especialista en marketing digital para campañas innovadoras...",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    }
  },{
    id: 7,
    titulo: "Ejecutivo de Trafico Terrestre - Aéreo (Turismo y Congresos)",
    empresa: "Monster Pizza",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Por proyecto",
    categoria: "administracion",
    salario: "30,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Cerrada", // Activa, Cerrada, En Pausa
    descripcion: "Somos una empresa que se dedica a vender pizzas",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    }
  },
  {
    id: 8,
    titulo: "Nutriologa",
    empresa: "Clinica Nutricional",
    ubicacion: "Queretaro",
    modalidad: "Presencial",
    jornada: "Prácticas profesionales / Becario",
    categoria: "Salud / Medicina / Farmacia",
    salario: "300,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "En Pausa", // Activa, Cerrada, En Pausa
    descripcion: "Especialista en marketing digital para campañas innovadoras...",
    responsabilidades: [
      "Gestionar campañas en redes sociales",
      "Análisis de métricas y KPIs",
      "Creación de contenido digital",
      "Optimización SEO/SEM"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Marketing o Comunicación",
        "Experiencia en Google Ads, Facebook Ads",
        "Conocimiento en Analytics",
        "Creatividad y pensamiento estratégico"
      ],
      deseables: [
        "Certificaciones en Google",
        "Experiencia en e-commerce",
        "Conocimiento en herramientas de automatización"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Prima vacacional",
      "1 Hora de desayuno"
    ],
    sueldoMinimo: 10000,
    sueldoMaximo: 15000,
  },
  {
    id: 9,
    titulo: "Desarrollador Backend Node.js",
    empresa: "Cloud Systems",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "55,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/15",
    isSponsored: true,
    descripcion: "Buscamos desarrollador backend con experiencia en Node.js y bases de datos",
    responsabilidades: [
      "Desarrollar APIs RESTful",
      "Optimizar consultas a base de datos",
      "Implementar seguridad y autenticación",
      "Colaborar con equipo de DevOps"
    ],
    requisitos: {
      indispensables: [
        "Experiencia con Node.js y Express",
        "Conocimiento en MongoDB o PostgreSQL",
        "Manejo de Git y metodologías ágiles",
        "Inglés intermedio"
      ],
      deseables: [
        "Experiencia con Docker y Kubernetes",
        "Conocimiento en AWS o Azure",
        "Certificaciones en tecnologías cloud"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones superiores a ley",
      "Capacitación continua",
      "Bonos por desempeño"
    ],
    sueldoMinimo: 45000,
    sueldoMaximo: 65000,
  },
  {
    id: 10,
    titulo: "Contador Público",
    empresa: "Consultoría Fiscal",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "administracion",
    salario: "42,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/10",
    isSponsored: false,
    descripcion: "Contador público certificado para gestión fiscal y contable",
    responsabilidades: [
      "Elaboración de estados financieros",
      "Presentación de declaraciones fiscales",
      "Auditorías internas",
      "Asesoría fiscal a clientes"
    ],
    requisitos: {
      indispensables: [
        "Cédula profesional de Contador Público",
        "Experiencia mínima 2 años",
        "Manejo de software contable",
        "Conocimiento en normatividad fiscal"
      ],
      deseables: [
        "Certificación en contabilidad internacional",
        "Experiencia en auditoría externa"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Prima vacacional",
      "Seguro de gastos médicos"
    ],
    sueldoMinimo: 35000,
    sueldoMaximo: 50000,
  },
  {
    id: 11,
    titulo: "Enfermera General",
    empresa: "Hospital Regional",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "28,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/08",
    isSponsored: true,
    descripcion: "Enfermera con experiencia en atención hospitalaria",
    responsabilidades: [
      "Atención directa a pacientes",
      "Administración de medicamentos",
      "Apoyo en procedimientos médicos",
      "Mantenimiento de registros clínicos"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Enfermería",
        "Cédula profesional",
        "Experiencia en hospital",
        "Disponibilidad para turnos"
      ],
      deseables: [
        "Especialización en área crítica",
        "Certificaciones de cursos adicionales"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Seguro médico familiar",
      "Vales de despensa"
    ],
    sueldoMinimo: 22000,
    sueldoMaximo: 35000,
  },
  {
    id: 12,
    titulo: "Ingeniero de Software Senior",
    empresa: "Tech Innovations",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "85,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/12",
    isSponsored: true,
    descripcion: "Ingeniero senior para liderar proyectos de software",
    responsabilidades: [
      "Arquitectura de software",
      "Liderazgo técnico de equipo",
      "Code reviews y mentoring",
      "Diseño de soluciones escalables"
    ],
    requisitos: {
      indispensables: [
        "Experiencia mínima 5 años",
        "Dominio de múltiples lenguajes",
        "Experiencia en arquitectura de software",
        "Liderazgo y comunicación efectiva"
      ],
      deseables: [
        "Máster en ciencias de la computación",
        "Experiencia en startups tecnológicas"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Equity en la empresa",
      "Seguro médico premium",
      "Home office permanente"
    ],
    sueldoMinimo: 70000,
    sueldoMaximo: 100000,
  },
  {
    id: 13,
    titulo: "Gerente de Ventas",
    empresa: "Comercializadora del Norte",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "ventas",
    salario: "35,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/05",
    isSponsored: false,
    descripcion: "Gerente de ventas para expandir mercado regional",
    responsabilidades: [
      "Dirigir equipo de ventas",
      "Elaborar estrategias comerciales",
      "Negociación con clientes corporativos",
      "Seguimiento de metas y KPIs"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en ventas B2B",
        "Habilidades de liderazgo",
        "Licenciatura en Administración o afín",
        "Manejo de CRM"
      ],
      deseables: [
        "MBA",
        "Experiencia en industria manufacturera"
      ]
    },
    beneficios: [
      "Sueldo base + comisiones",
      "Prestaciones de ley",
      "Automóvil de la empresa",
      "Bono por metas"
    ],
    sueldoMinimo: 30000,
    sueldoMaximo: 50000,
  },
  {
    id: 14,
    titulo: "Psicóloga Clínica",
    empresa: "Centro de Salud Mental",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Medio tiempo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "25,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/03",
    isSponsored: false,
    descripcion: "Psicóloga clínica para consulta privada y terapias",
    responsabilidades: [
      "Consulta psicológica individual",
      "Terapias grupales",
      "Elaboración de diagnósticos",
      "Seguimiento de casos"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Psicología",
        "Cédula profesional",
        "Experiencia en psicología clínica",
        "Habilidades interpersonales"
      ],
      deseables: [
        "Maestría en Psicología Clínica",
        "Certificaciones en terapias específicas"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Horario flexible",
      "Prestaciones proporcionales",
      "Capacitación continua"
    ],
    sueldoMinimo: 20000,
    sueldoMaximo: 30000,
  },
  {
    id: 15,
    titulo: "Arquitecto de Soluciones Cloud",
    empresa: "Cloud Consulting",
    ubicacion: "Ciudad de México",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "95,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/14",
    isSponsored: true,
    descripcion: "Arquitecto cloud para diseñar soluciones escalables en AWS/Azure",
    responsabilidades: [
      "Diseñar arquitecturas cloud",
      "Migración de sistemas legacy",
      "Optimización de costos cloud",
      "Consultoría técnica a clientes"
    ],
    requisitos: {
      indispensables: [
        "Certificaciones AWS o Azure",
        "Experiencia en arquitectura cloud",
        "Conocimiento en DevOps",
        "Inglés avanzado"
      ],
      deseables: [
        "Certificaciones múltiples en cloud",
        "Experiencia en empresas Fortune 500"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Bonos por proyectos",
      "Seguro médico premium",
      "Capacitación y certificaciones pagadas"
    ],
    sueldoMinimo: 80000,
    sueldoMaximo: 120000,
  },
  {
    id: 16,
    titulo: "Chef Ejecutivo",
    empresa: "Restaurante Gourmet",
    ubicacion: "Guadalajara",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "gastronomia",
    salario: "32,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/07",
    isSponsored: false,
    descripcion: "Chef ejecutivo para restaurante de alta cocina",
    responsabilidades: [
      "Supervisión de cocina",
      "Creación de menús",
      "Control de inventarios",
      "Capacitación de personal"
    ],
    requisitos: {
      indispensables: [
        "Experiencia como chef ejecutivo",
        "Conocimiento en cocina internacional",
        "Habilidades de liderazgo",
        "Creatividad culinaria"
      ],
      deseables: [
        "Estudios en escuelas de gastronomía reconocidas",
        "Experiencia en restaurantes con estrellas Michelin"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Propinas",
      "Alimentación incluida",
      "Uniforme proporcionado"
    ],
    sueldoMinimo: 25000,
    sueldoMaximo: 40000,
  },
  {
    id: 17,
    titulo: "Asistente Administrativo",
    empresa: "Oficinas Corporativas",
    ubicacion: "Querétaro",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "administracion",
    salario: "18,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/06",
    isSponsored: false,
    descripcion: "Asistente administrativo para oficinas corporativas",
    responsabilidades: [
      "Atención telefónica y de visitantes",
      "Gestión de documentos",
      "Apoyo en labores administrativas",
      "Organización de eventos corporativos"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Administración o afín",
        "Manejo de Office",
        "Buen trato con clientes",
        "Organización y proactividad"
      ],
      deseables: [
        "Experiencia previa",
        "Inglés básico"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Vales de despensa",
      "Capacitación"
    ],
    sueldoMinimo: 15000,
    sueldoMaximo: 22000,
  },
  {
    id: 18,
    titulo: "Diseñador Gráfico",
    empresa: "Agencia Creativa",
    ubicacion: "Monterrey",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "diseno",
    salario: "22,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/09",
    isSponsored: false,
    descripcion: "Diseñador gráfico para proyectos creativos",
    responsabilidades: [
      "Diseño de identidad visual",
      "Creación de material gráfico",
      "Edición de imágenes",
      "Colaboración con equipo creativo"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Diseño Gráfico",
        "Manejo de Adobe Creative Suite",
        "Portfolio demostrable",
        "Creatividad y atención al detalle"
      ],
      deseables: [
        "Experiencia en branding",
        "Conocimiento en motion graphics"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Licencias de software",
      "Ambiente creativo"
    ],
    sueldoMinimo: 18000,
    sueldoMaximo: 28000,
  },
  {
    id: 19,
    titulo: "Veterinario",
    empresa: "Clínica Veterinaria",
    ubicacion: "Ciudad de México",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "35,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/11",
    isSponsored: true,
    descripcion: "Veterinario para clínica de animales pequeños",
    responsabilidades: [
      "Consulta veterinaria",
      "Cirugías menores",
      "Vacunación y desparasitación",
      "Diagnóstico y tratamiento"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Medicina Veterinaria",
        "Cédula profesional",
        "Experiencia en clínica",
        "Empatía con animales"
      ],
      deseables: [
        "Especialización en animales pequeños",
        "Experiencia en emergencias"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Seguro médico",
      "Bonos por consultas"
    ],
    sueldoMinimo: 28000,
    sueldoMaximo: 45000,
  },
  {
    id: 20,
    titulo: "Analista de Datos",
    empresa: "Data Analytics Corp",
    ubicacion: "Guadalajara",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "38,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/13",
    isSponsored: false,
    descripcion: "Analista de datos para insights empresariales",
    responsabilidades: [
      "Análisis de datos",
      "Creación de reportes y dashboards",
      "Modelado estadístico",
      "Presentación de insights"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Estadística, Matemáticas o afín",
        "Manejo de SQL y Python/R",
        "Conocimiento en herramientas BI",
        "Pensamiento analítico"
      ],
      deseables: [
        "Máster en Data Science",
        "Experiencia en machine learning"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Capacitación en tecnologías",
      "Trabajo remoto permanente"
    ],
    sueldoMinimo: 32000,
    sueldoMaximo: 48000,
  },
  {
    id: 21,
    titulo: "Instructor de Fitness",
    empresa: "Gimnasio PowerFit",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Medio tiempo",
    categoria: "deportes",
    salario: "15,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/04",
    isSponsored: false,
    descripcion: "Instructor de fitness para clases grupales",
    responsabilidades: [
      "Impartir clases de fitness",
      "Asesoría personalizada",
      "Creación de rutinas",
      "Motivación a clientes"
    ],
    requisitos: {
      indispensables: [
        "Certificación como instructor",
        "Condición física óptima",
        "Habilidades de comunicación",
        "Puntualidad y responsabilidad"
      ],
      deseables: [
        "Especialización en áreas específicas",
        "Experiencia previa"
      ]
    },
    beneficios: [
      "Sueldo base + propinas",
      "Membresía gratuita",
      "Horario flexible",
      "Capacitación continua"
    ],
    sueldoMinimo: 12000,
    sueldoMaximo: 20000,
  },
  {
    id: 22,
    titulo: "DevOps Engineer",
    empresa: "TechOps Solutions",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "75,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/16",
    isSponsored: true,
    descripcion: "Ingeniero DevOps para automatización e infraestructura",
    responsabilidades: [
      "Gestión de infraestructura cloud",
      "Automatización CI/CD",
      "Monitoreo y alertas",
      "Optimización de recursos"
    ],
    requisitos: {
      indispensables: [
        "Experiencia con Docker, Kubernetes",
        "Conocimiento en AWS/Azure/GCP",
        "Manejo de Terraform o CloudFormation",
        "Experiencia en CI/CD"
      ],
      deseables: [
        "Certificaciones cloud",
        "Experiencia en microservicios"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Equity en la empresa",
      "Seguro médico premium",
      "Home office"
    ],
    sueldoMinimo: 65000,
    sueldoMaximo: 90000,
  },
  {
    id: 23,
    titulo: "Médico General",
    empresa: "Clínica de Salud",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "45,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/02",
    isSponsored: true,
    descripcion: "Médico general para consulta privada",
    responsabilidades: [
      "Consulta médica general",
      "Diagnóstico y tratamiento",
      "Atención de urgencias",
      "Referencias a especialistas"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Medicina",
        "Cédula profesional",
        "Especialidad o experiencia",
        "Habilidades de comunicación"
      ],
      deseables: [
        "Especialidad médica",
        "Experiencia en urgencias"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones superiores",
      "Seguro médico familiar",
      "Consultorio equipado"
    ],
    sueldoMinimo: 38000,
    sueldoMaximo: 55000,
  },
  {
    id: 24,
    titulo: "Community Manager",
    empresa: "Agencia Digital",
    ubicacion: "Guadalajara",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "marketing",
    salario: "20,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/01",
    isSponsored: false,
    descripcion: "Community manager para redes sociales",
    responsabilidades: [
      "Gestión de redes sociales",
      "Creación de contenido",
      "Interacción con comunidad",
      "Análisis de métricas"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en redes sociales",
        "Conocimiento de plataformas",
        "Creatividad en contenido",
        "Habilidades de escritura"
      ],
      deseables: [
        "Certificaciones en marketing digital",
        "Experiencia en e-commerce"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Trabajo remoto",
      "Ambiente dinámico"
    ],
    sueldoMinimo: 16000,
    sueldoMaximo: 25000,
  },
  {
    id: 25,
    titulo: "Ingeniero Mecánico",
    empresa: "Manufacturas Industriales",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "ingenieria",
    salario: "40,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/17",
    isSponsored: false,
    descripcion: "Ingeniero mecánico para diseño de maquinaria",
    responsabilidades: [
      "Diseño de componentes mecánicos",
      "Análisis de materiales",
      "Supervisión de producción",
      "Mejora continua"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Ingeniería Mecánica",
        "Cédula profesional",
        "Manejo de CAD",
        "Experiencia en manufactura"
      ],
      deseables: [
        "Máster en Ingeniería",
        "Certificaciones en calidad"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Seguro médico",
      "Vales de despensa"
    ],
    sueldoMinimo: 33000,
    sueldoMaximo: 50000,
  },
  {
    id: 26,
    titulo: "Abogado Corporativo",
    empresa: "Bufete Legal",
    ubicacion: "Ciudad de México",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "legal",
    salario: "50,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/18",
    isSponsored: true,
    descripcion: "Abogado para asuntos corporativos y contractuales",
    responsabilidades: [
      "Revisión de contratos",
      "Asesoría legal corporativa",
      "Representación legal",
      "Análisis de normatividad"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Derecho",
        "Cédula profesional",
        "Experiencia en derecho corporativo",
        "Excelente redacción"
      ],
      deseables: [
        "Maestría en Derecho",
        "Especialización en áreas específicas"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones superiores",
      "Bonos por casos",
      "Capacitación continua"
    ],
    sueldoMinimo: 42000,
    sueldoMaximo: 65000,
  },
  {
    id: 27,
    titulo: "Fotógrafo Profesional",
    empresa: "Estudio Fotográfico",
    ubicacion: "Guadalajara",
    modalidad: "Presencial",
    jornada: "Por proyecto",
    categoria: "diseno",
    salario: "25,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/19",
    isSponsored: false,
    descripcion: "Fotógrafo para eventos y sesiones comerciales",
    responsabilidades: [
      "Fotografía de eventos",
      "Sesiones fotográficas",
      "Edición y retoque",
      "Manejo de equipo profesional"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en fotografía profesional",
        "Manejo de cámaras DSLR",
        "Conocimiento en edición digital",
        "Portfolio demostrable"
      ],
      deseables: [
        "Estudios en fotografía",
        "Especialización en áreas específicas"
      ]
    },
    beneficios: [
      "Pago por proyecto",
      "Horario flexible",
      "Uso de equipo del estudio",
      "Comisiones por ventas"
    ],
    sueldoMinimo: 20000,
    sueldoMaximo: 35000,
  },
  {
    id: 28,
    titulo: "Maestra de Preescolar",
    empresa: "Jardín de Niños",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "educacion",
    salario: "16,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/20",
    isSponsored: false,
    descripcion: "Maestra de preescolar para educación inicial",
    responsabilidades: [
      "Planificación de actividades educativas",
      "Cuidado y atención de niños",
      "Comunicación con padres",
      "Desarrollo de habilidades básicas"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Educación Preescolar",
        "Cédula profesional",
        "Paciencia y creatividad",
        "Habilidades pedagógicas"
      ],
      deseables: [
        "Especialización en educación especial",
        "Experiencia previa"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Vacaciones escolares",
      "Capacitación pedagógica"
    ],
    sueldoMinimo: 14000,
    sueldoMaximo: 20000,
  },
  {
    id: 29,
    titulo: "Scrum Master",
    empresa: "Software Development",
    ubicacion: "Ciudad de México",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "48,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/21",
    isSponsored: true,
    descripcion: "Scrum Master para equipos de desarrollo ágil",
    responsabilidades: [
      "Facilitar ceremonias Scrum",
      "Remover impedimentos",
      "Coaching al equipo",
      "Gestión de backlog"
    ],
    requisitos: {
      indispensables: [
        "Certificación Scrum Master",
        "Experiencia liderando equipos ágiles",
        "Habilidades de facilitación",
        "Conocimiento en metodologías ágiles"
      ],
      deseables: [
        "Certificaciones adicionales",
        "Experiencia en transformación ágil"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Capacitación pagada",
      "Ambiente colaborativo"
    ],
    sueldoMinimo: 40000,
    sueldoMaximo: 58000,
  },
  {
    id: 30,
    titulo: "Asesor Financiero",
    empresa: "Asesoría Financiera",
    ubicacion: "Monterrey",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "finanzas",
    salario: "30,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/22",
    isSponsored: false,
    descripcion: "Asesor financiero para clientes individuales y corporativos",
    responsabilidades: [
      "Asesoría en inversiones",
      "Planeación financiera",
      "Análisis de productos financieros",
      "Atención a clientes"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Finanzas o afín",
        "Conocimiento en productos financieros",
        "Habilidades de ventas",
        "Certificaciones básicas"
      ],
      deseables: [
        "Certificaciones profesionales",
        "Experiencia en banca"
      ]
    },
    beneficios: [
      "Sueldo base + comisiones",
      "Prestaciones de ley",
      "Bonos por objetivos",
      "Capacitación continua"
    ],
    sueldoMinimo: 25000,
    sueldoMaximo: 40000,
  },
  {
    id: 31,
    titulo: "Traductor Inglés-Español",
    empresa: "Agencia de Traducciones",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Por proyecto",
    categoria: "idiomas",
    salario: "22,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/23",
    isSponsored: false,
    descripcion: "Traductor profesional inglés-español",
    responsabilidades: [
      "Traducción de documentos",
      "Interpretación simultánea",
      "Revisión de traducciones",
      "Localización de contenido"
    ],
    requisitos: {
      indispensables: [
        "Nivel avanzado inglés y español",
        "Experiencia en traducción",
        "Atención al detalle",
        "Conocimiento cultural"
      ],
      deseables: [
        "Certificaciones en traducción",
        "Especialización en áreas técnicas"
      ]
    },
    beneficios: [
      "Pago por proyecto",
      "Trabajo remoto",
      "Horario flexible",
      "Diversidad de proyectos"
    ],
    sueldoMinimo: 18000,
    sueldoMaximo: 28000,
  },
  {
    id: 32,
    titulo: "Ingeniero Civil",
    empresa: "Construcciones del Norte",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "ingenieria",
    salario: "36,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/24",
    isSponsored: false,
    descripcion: "Ingeniero civil para proyectos de construcción",
    responsabilidades: [
      "Supervisión de obras",
      "Cálculos estructurales",
      "Gestión de proyectos",
      "Control de calidad"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Ingeniería Civil",
        "Cédula profesional",
        "Experiencia en construcción",
        "Manejo de software CAD"
      ],
      deseables: [
        "Máster en Estructuras",
        "Certificaciones en seguridad"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Vales de despensa",
      "Equipo de protección"
    ],
    sueldoMinimo: 30000,
    sueldoMaximo: 45000,
  },
  {
    id: 33,
    titulo: "Recepcionista Hotel",
    empresa: "Hotel Luxury",
    ubicacion: "Guadalajara",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "turismo",
    salario: "14,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/25",
    isSponsored: false,
    descripcion: "Recepcionista para hotel de lujo",
    responsabilidades: [
      "Atención a huéspedes",
      "Check-in y check-out",
      "Reservaciones",
      "Información turística"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en hotelería",
        "Inglés conversacional",
        "Buen trato al cliente",
        "Disponibilidad para turnos"
      ],
      deseables: [
        "Idiomas adicionales",
        "Experiencia en hoteles de lujo"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Alimentación",
      "Descuentos en hotel"
    ],
    sueldoMinimo: 12000,
    sueldoMaximo: 18000,
  },
  {
    id: 34,
    titulo: "Product Manager",
    empresa: "Tech Products",
    ubicacion: "Ciudad de México",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "65,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/26",
    isSponsored: true,
    descripcion: "Product Manager para productos digitales",
    responsabilidades: [
      "Definir roadmap de producto",
      "Trabajar con stakeholders",
      "Análisis de mercado",
      "Priorización de features"
    ],
    requisitos: {
      indispensables: [
        "Experiencia como Product Manager",
        "Habilidades analíticas",
        "Comunicación efectiva",
        "Conocimiento en metodologías ágiles"
      ],
      deseables: [
        "MBA o estudios de posgrado",
        "Experiencia en startups"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Equity",
      "Seguro médico premium",
      "Bonos por objetivos"
    ],
    sueldoMinimo: 55000,
    sueldoMaximo: 80000,
  },
  {
    id: 35,
    titulo: "Electricista Industrial",
    empresa: "Servicios Eléctricos",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "ingenieria",
    salario: "24,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/27",
    isSponsored: false,
    descripcion: "Electricista industrial certificado",
    responsabilidades: [
      "Instalaciones eléctricas",
      "Mantenimiento preventivo",
      "Reparaciones",
      "Cumplimiento de normas"
    ],
    requisitos: {
      indispensables: [
        "Certificación como electricista",
        "Experiencia industrial",
        "Conocimiento de normas",
        "Disponibilidad para viajar"
      ],
      deseables: [
        "Certificaciones adicionales",
        "Experiencia en plantas industriales"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Equipo de protección",
      "Bonos por proyectos"
    ],
    sueldoMinimo: 20000,
    sueldoMaximo: 30000,
  },
  {
    id: 36,
    titulo: "Redactor de Contenidos",
    empresa: "Agencia de Marketing",
    ubicacion: "Puebla",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "marketing",
    salario: "18,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/28",
    isSponsored: false,
    descripcion: "Redactor para contenido web y marketing",
    responsabilidades: [
      "Redacción de artículos",
      "Creación de copy publicitario",
      "SEO copywriting",
      "Edición de contenido"
    ],
    requisitos: {
      indispensables: [
        "Excelente ortografía y redacción",
        "Experiencia en redacción",
        "Conocimiento básico de SEO",
        "Creatividad"
      ],
      deseables: [
        "Licenciatura en Comunicación",
        "Portfolio de escritos"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Trabajo remoto",
      "Proyectos diversos"
    ],
    sueldoMinimo: 15000,
    sueldoMaximo: 23000,
  },
  {
    id: 37,
    titulo: "Farmacéutico",
    empresa: "Farmacia Cadena",
    ubicacion: "Querétaro",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "28,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/29",
    isSponsored: false,
    descripcion: "Farmacéutico para farmacia de cadena",
    responsabilidades: [
      "Dispensación de medicamentos",
      "Asesoría farmacéutica",
      "Control de inventarios",
      "Supervisión de personal"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Químico Farmacobiólogo",
        "Cédula profesional",
        "Experiencia en farmacia",
        "Conocimiento de medicamentos"
      ],
      deseables: [
        "Especialización farmacéutica",
        "Experiencia en farmacia hospitalaria"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Seguro médico",
      "Descuentos en productos"
    ],
    sueldoMinimo: 23000,
    sueldoMaximo: 35000,
  },
  {
    id: 38,
    titulo: "QA Tester",
    empresa: "Quality Assurance",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "32,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/30",
    isSponsored: false,
    descripcion: "Tester de software para aseguramiento de calidad",
    responsabilidades: [
      "Ejecución de pruebas",
      "Reporte de bugs",
      "Creación de casos de prueba",
      "Testing manual y automatizado"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en testing",
        "Conocimiento de metodologías QA",
        "Atención al detalle",
        "Habilidades analíticas"
      ],
      deseables: [
        "Conocimiento en automatización",
        "Certificaciones ISTQB"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Trabajo remoto",
      "Capacitación técnica"
    ],
    sueldoMinimo: 27000,
    sueldoMaximo: 40000,
  },
  {
    id: 39,
    titulo: "Asistente de Recursos Humanos",
    empresa: "RRHH Consultores",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "administracion",
    salario: "19,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/01/31",
    isSponsored: false,
    descripcion: "Asistente de RH para procesos administrativos",
    responsabilidades: [
      "Reclutamiento y selección",
      "Gestión de nómina",
      "Atención a empleados",
      "Control de documentación"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Administración o Psicología",
        "Conocimiento en procesos de RH",
        "Habilidades interpersonales",
        "Discreción y confidencialidad"
      ],
      deseables: [
        "Experiencia previa en RH",
        "Conocimiento en sistemas de RH"
      ]
    },
    beneficios: [
      "Sueldo base",
      "Prestaciones de ley",
      "Capacitación en RH",
      "Ambiente profesional"
    ],
    sueldoMinimo: 16000,
    sueldoMaximo: 24000,
  },
  {
    id: 40,
    titulo: "Dentista",
    empresa: "Clínica Dental",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "40,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/01",
    isSponsored: true,
    descripcion: "Dentista para consultorio dental",
    responsabilidades: [
      "Consulta dental",
      "Procedimientos odontológicos",
      "Prevención y educación",
      "Tratamientos especializados"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Odontología",
        "Cédula profesional",
        "Experiencia clínica",
        "Habilidades manuales"
      ],
      deseables: [
        "Especialización odontológica",
        "Experiencia en clínica propia"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Seguro médico",
      "Consultorio equipado"
    ],
    sueldoMinimo: 33000,
    sueldoMaximo: 50000,
  },
  {
    id: 41,
    titulo: "Mesero",
    empresa: "Restaurante Casual",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Medio tiempo",
    categoria: "gastronomia",
    salario: "12,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/02",
    isSponsored: false,
    descripcion: "Mesero para restaurante de servicio rápido",
    responsabilidades: [
      "Atención a clientes",
      "Toma de pedidos",
      "Servicio de alimentos",
      "Mantenimiento de área"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en servicio",
        "Buen trato al cliente",
        "Resistencia física",
        "Puntualidad"
      ],
      deseables: [
        "Conocimiento de menú",
        "Experiencia en restaurantes"
      ]
    },
    beneficios: [
      "Sueldo base + propinas",
      "Alimentación incluida",
      "Uniforme proporcionado",
      "Ambiente dinámico"
    ],
    sueldoMinimo: 10000,
    sueldoMaximo: 16000,
  },
  {
    id: 42,
    titulo: "Cybersecurity Analyst",
    empresa: "Security Tech",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "70,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/03",
    isSponsored: true,
    descripcion: "Analista de seguridad cibernética",
    responsabilidades: [
      "Monitoreo de seguridad",
      "Análisis de amenazas",
      "Respuesta a incidentes",
      "Implementación de controles"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en cybersecurity",
        "Conocimiento en SIEM",
        "Certificaciones de seguridad",
        "Inglés avanzado"
      ],
      deseables: [
        "Certificaciones CISSP, CEH",
        "Experiencia en SOC"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Seguro médico premium",
      "Capacitación continua",
      "Home office"
    ],
    sueldoMinimo: 60000,
    sueldoMaximo: 85000,
  },
  {
    id: 43,
    titulo: "Periodista",
    empresa: "Medio de Comunicación",
    ubicacion: "Guadalajara",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "comunicacion",
    salario: "26,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/04",
    isSponsored: false,
    descripcion: "Periodista para medio digital",
    responsabilidades: [
      "Redacción de noticias",
      "Investigación periodística",
      "Entrevistas",
      "Cobertura de eventos"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Comunicación o Periodismo",
        "Excelente redacción",
        "Objetividad periodística",
        "Manejo de redes sociales"
      ],
      deseables: [
        "Especialización en áreas específicas",
        "Experiencia en medios reconocidos"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Contactos profesionales",
      "Capacitación continua"
    ],
    sueldoMinimo: 22000,
    sueldoMaximo: 32000,
  },
  {
    id: 44,
    titulo: "Barbero",
    empresa: "Barbería Moderna",
    ubicacion: "Monterrey",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "servicios",
    salario: "16,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/05",
    isSponsored: false,
    descripcion: "Barbero profesional para barbería moderna",
    responsabilidades: [
      "Cortes de cabello",
      "Arreglo de barba",
      "Atención a clientes",
      "Mantenimiento del área"
    ],
    requisitos: {
      indispensables: [
        "Experiencia en barbería",
        "Técnicas de corte",
        "Buen trato al cliente",
        "Creatividad"
      ],
      deseables: [
        "Certificación en barbería",
        "Experiencia en estilos modernos"
      ]
    },
    beneficios: [
      "Sueldo base + propinas",
      "Comisiones por servicio",
      "Uniforme proporcionado",
      "Ambiente creativo"
    ],
    sueldoMinimo: 13000,
    sueldoMaximo: 22000,
  },
  {
    id: 45,
    titulo: "Biólogo Marino",
    empresa: "Instituto de Investigación",
    ubicacion: "Ciudad de México",
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    categoria: "ciencias",
    salario: "35,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/06",
    isSponsored: false,
    descripcion: "Biólogo marino para proyectos de investigación",
    responsabilidades: [
      "Investigación marina",
      "Análisis de muestras",
      "Elaboración de reportes",
      "Trabajo de campo"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Biología Marina",
        "Cédula profesional",
        "Experiencia en investigación",
        "Disponibilidad para viajes"
      ],
      deseables: [
        "Maestría o Doctorado",
        "Publicaciones científicas"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Apoyo para investigación",
      "Capacitación científica"
    ],
    sueldoMinimo: 28000,
    sueldoMaximo: 45000,
  },
  {
    id: 46,
    titulo: "Piloto Comercial",
    empresa: "Aerolínea Regional",
    ubicacion: "Ciudad de México",
    modalidad: "Presencial",
    jornada: "Por proyecto",
    categoria: "transporte",
    salario: "80,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/07",
    isSponsored: true,
    descripcion: "Piloto comercial para vuelos regionales",
    responsabilidades: [
      "Operación de aeronaves",
      "Cumplimiento de protocolos",
      "Coordinación con torre",
      "Seguridad del vuelo"
    ],
    requisitos: {
      indispensables: [
        "Licencia de piloto comercial",
        "Experiencia de vuelo mínima",
        "Certificaciones médicas",
        "Inglés técnico"
      ],
      deseables: [
        "Certificaciones adicionales",
        "Experiencia en diferentes aeronaves"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Seguro de vida",
      "Vuelos gratuitos",
      "Bonos por horas de vuelo"
    ],
    sueldoMinimo: 65000,
    sueldoMaximo: 100000,
  },
  {
    id: 47,
    titulo: "Fisioterapeuta",
    empresa: "Clínica de Rehabilitación",
    ubicacion: "Puebla",
    modalidad: "Presencial",
    jornada: "Tiempo completo",
    categoria: "Salud / Medicina / Farmacia",
    salario: "30,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/08",
    isSponsored: false,
    descripcion: "Fisioterapeuta para rehabilitación física",
    responsabilidades: [
      "Evaluación de pacientes",
      "Aplicación de tratamientos",
      "Ejercicios terapéuticos",
      "Seguimiento de casos"
    ],
    requisitos: {
      indispensables: [
        "Licenciatura en Fisioterapia",
        "Cédula profesional",
        "Experiencia clínica",
        "Habilidades interpersonales"
      ],
      deseables: [
        "Especialización en áreas específicas",
        "Certificaciones adicionales"
      ]
    },
    beneficios: [
      "Sueldo competitivo",
      "Prestaciones de ley",
      "Seguro médico",
      "Capacitación continua"
    ],
    sueldoMinimo: 25000,
    sueldoMaximo: 38000,
  },
  {
    id: 48,
    titulo: "Especialista en Machine Learning",
    empresa: "AI Solutions",
    ubicacion: "Ciudad de México",
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    categoria: "tecnologia",
    salario: "88,000",
    logo: "/api/placeholder/50/50",
    status_vacante: "Activa",
    fechaPublicacion: "2025/02/09",
    isSponsored: true,
    descripcion: "Especialista en ML para proyectos de inteligencia artificial",
    responsabilidades: [
      "Desarrollo de modelos ML",
      "Análisis de datos",
      "Optimización de algoritmos",
      "Implementación de soluciones AI"
    ],
    requisitos: {
      indispensables: [
        "Maestría o Doctorado en Ciencias de Datos",
        "Experiencia en ML/DL",
        "Manejo de Python, TensorFlow/PyTorch",
        "Publicaciones o proyectos demostrables"
      ],
      deseables: [
        "Experiencia en empresas tech",
        "Certificaciones en cloud ML"
      ]
    },
    beneficios: [
      "Sueldo muy competitivo",
      "Equity en la empresa",
      "Seguro médico premium",
      "Presupuesto para investigación"
    ],
    sueldoMinimo: 75000,
    sueldoMaximo: 110000,
  },
];