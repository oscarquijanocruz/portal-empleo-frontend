export const mockUsers = [
    // {
    //     id: 1,
    //     nombre: 'Oscar',
    //     apellidoPaterno: 'Gonzalez',
    //     apellidoMaterno: 'Hernandez',
    //     email: 'oscar@gmail.com',
    //     password: '123456',
    //     avatar: 'https://i.imgur.com/q3pm5gE.jpg',
    //     rol: 'admin',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    // },
    
    {
    
        // --Bloque 1 - Información personal
        id: 2,
        nombre: 'Miguel',
        apellido: 'Blanco',
        email: 'migue.blanco@email.com',
        telefono: '+52 55 1234 5678',
        fechaNacimiento: '1995-05-15',
        genero: 'masculino',
        estadoCivil: 'soltero',
        // Ubicación
        ciudad: 'Ciudad de México',
        estado: 'CDMX',
        codigoPostal: '06000',
        
        // --Bloque 2 - Datos profesionales
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
        
        // --Bloque 3 - exp. laboral
        nombreEmpresa: "Mentory",
        cargoLaboral: "Gerente",
        resumenAct: 'Desarrollador con 3 años de experiencia en React y Next.js, apasionado por crear interfaces de usuario intuitivas y eficientes.',
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
        avatar: 'https://i.imgur.com/q3pm5gE.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),

        // Preferencias
        notificaciones: true,
        perfilPublico: true,
        recibirOfertas: true
    },
]