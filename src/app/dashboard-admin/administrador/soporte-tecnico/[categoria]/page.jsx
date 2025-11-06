"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Datos simulados para las categorías
const articlesData = {
  "preguntas-frecuentes": [
    {
      id: 1,
      title: "¿Cómo restablecer mi contraseña?",
      type: "Guía",
      content: "Para restablecer tu contraseña, dirígete a 'Cuenta > Seguridad' y selecciona 'Restablecer contraseña'.",
    },
    {
      id: 2,
      title: "¿Cómo editar mi perfil?",
      type: "Guía",
      content: "Ve a 'Configuración > Perfil' y actualiza tus datos personales fácilmente.",
    },
  ],
  "cuenta-de-usuario": [
    {
      id: 1,
      title: "Crear una nueva cuenta",
      type: "Tutorial",
      content: "Haz clic en 'Registrarse' en la página principal y completa el formulario con tus datos personales.",
    },
    {
      id: 2,
      title: "Eliminar mi cuenta",
      type: "Advertencia",
      content: "Si deseas eliminar tu cuenta, envía una solicitud al equipo de soporte técnico.",
    },
  ],
  configuracion: [
    {
      id: 1,
      title: "Cambiar idioma del sistema",
      type: "Configuración",
      content: "Desde 'Configuración > Preferencias', selecciona el idioma que prefieras para la interfaz.",
    },
  ],
  "documentacion-tecnica": [
    {
      id: 1,
      title: "La historia del diseño UI/UX",
      type: "Historia",
      content: "Nuestro portal nació con la idea de ser simple y accesible. Cada página fue diseñada pensando en la experiencia del usuario y la facilidad de navegación.",
    },
    {
      id: 2,
      title: "Buenas prácticas de seguridad",
      type: "Historia",
      content: "Desde el inicio, nos aseguramos de implementar protocolos de seguridad sólidos para proteger la información de los usuarios y garantizar confianza en cada interacción.",
    },
    {
      id: 3,
      title: "Optimización y rendimiento",
      type: "Historia",
      content: "A lo largo del desarrollo, el equipo optimizó la carga de recursos, imágenes y datos para que el portal sea rápido y eficiente en cualquier dispositivo.",
    },
    {
      id: 4,
      title: "Colaboración del equipo de desarrollo",
      type: "Historia",
      content: "El portal fue posible gracias a un equipo multidisciplinario de desarrolladores, diseñadores y gestores, trabajando en conjunto para crear una experiencia sólida y confiable.",
    },
  ],
};

// Datos de los desarrolladores del portal
const developers = [
  { name: "Oscar Quijano", role: "Frontend Developer", img: "https://i.pravatar.cc/100?img=61" },
  { name: "Alejandro Moreno", role: "Backend Developer", img: "https://i.pravatar.cc/100?img=8" },
  { name: "Oscar Zavaleta", role: "Fullstack Developer", img: "https://i.pravatar.cc/100?img=56" },
];

export default function CategoriaPage() {
  const { categoria } = useParams();
  const articles = articlesData[categoria] || [];

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Encabezado */}
      <h2 className="text-4xl font-bold text-gray-800 mb-2 capitalize">
        {categoria.replaceAll("-", " ")}
      </h2>

      <Link
          href="/dashboard-admin/administrador/soporte-tecnico"
  className="flex items-center text-blue-600 hover:text-blue-400 text-sm mb-6"
>
  <ArrowLeft size={22} className="mr-1" />
  Volver al soporte
      </Link>

      {/* Contenido de artículos */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition relative group"
            >
              {/* Badge tipo artículo */}
              <span className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                {article.type}
              </span>

              <h3 className="font-semibold text-xl text-gray-800 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm">{article.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            ⚠️ No hay artículos disponibles para esta categoría.
          </p>
        )}
      </div>

      {/* Sección de desarrolladores */}
      {categoria === "documentacion-tecnica" && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Desarrolladores del Portal</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg text-center transition"
              >
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-blue-400"
                />
                <h4 className="font-semibold text-gray-800">{dev.name}</h4>
                <p className="text-gray-500 text-sm">{dev.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
