export default function Vacancies() {
   const vacantes = [
    { id: 1, titulo: "Desarrollador Frontend", descripcion: "Buscamos un desarrollador frontend con experiencia en React y Vue.js...", empresa: "Tech Innovations", ubicacion: "Remoto", fecha: "2025-09-15" },
    { id: 2, titulo: "Diseñador UI/UX", descripcion: "Se necesita diseñador UI/UX con experiencia en diseño de interfaces web...", empresa: "Creative Studio", ubicacion: "Ciudad de México", fecha: "2025-09-12" },
    { id: 3, titulo: "Gerente de Marketing Digital", descripcion: "Buscamos un gerente de marketing digital con experiencia en campañas de SEO...", empresa: "Marketing Global", ubicacion: "Buenos Aires", fecha: "2025-09-10" },
    { id: 4, titulo: "Backend Developer", descripcion: "Se busca un desarrollador backend con experiencia en Node.js y bases de datos SQL...", empresa: "Tech Solutions", ubicacion: "Barcelona", fecha: "2025-09-08" },
    { id: 5, titulo: "Community Manager", descripcion: "Buscamos un community manager con experiencia en la gestión de redes sociales...", empresa: "Social Media Experts", ubicacion: "Remoto", fecha: "2025-09-05" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-base font-semibold mb-3 text-gray-700">Vacantes</h2>
      <div>
        {vacantes.map((v) => (
          <div
            key={v.id}
            className="flex justify-between items-start border-b border-gray-200 py-3 last:border-0"
          >
            {/* Información de la vacante */}
            <div className="pr-4">
              <h3 className="text-[#0066CC] font-medium cursor-pointer hover:underline">
                {v.titulo}
              </h3>
              <p className="text-xs text-gray-500 leading-snug">{v.descripcion}</p>
            </div>

            {/* Botón */}
            <button className="bg-[#0C1E39] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#1a2f4f] transition">
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

