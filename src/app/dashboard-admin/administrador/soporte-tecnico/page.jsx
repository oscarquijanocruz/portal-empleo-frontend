"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Search,
  HelpCircle,
  UserCircle,
  Settings,
  FileText,
  MessageCircle,
  X,
  Send,
  Star,
} from "lucide-react";


export default function SupportSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const categories = [
    { name: "Preguntas Frecuentes", icon: <HelpCircle size={30} />, articles: 10, slug: "preguntas-frecuentes" },
    { name: "Cuenta de Usuario", icon: <UserCircle size={30} />, articles: 5, slug: "cuenta-de-usuario" },
    { name: "Configuración", icon: <Settings size={30} />, articles: 8, slug: "configuracion" },
    { name: "Documentación Técnica", icon: <FileText size={30} />, articles: 6, slug: "documentacion-tecnica" },
  ];

  const recentArticles = [
    { id: 1, title: "Cómo restablecer tu contraseña", author: "Soporte", date: "2025-10-10" },
    { id: 2, title: "Solución de errores comunes en login", author: "Equipo Dev", date: "2025-09-28" },
    { id: 3, title: "Pasos para configurar notificaciones", author: "Marketing", date: "2025-09-12" },
  ];

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enviar ticket de contacto
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    alert("Tu mensaje fue enviado al equipo de soporte.");
    setMessage("");
    setIsContactOpen(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-6 relative min-h-screen">
      {/* Barra de búsqueda */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          ¿Cómo podemos ayudarte?
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-1/2 bg-white rounded-full shadow-md p-2">
          <input
            type="text"
            placeholder="Buscar artículos, guías o reportes..."
            className="w-full px-4 py-2 border-none outline-none text-sm bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Categorías */}
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">
        Categorías de Soporte
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.name}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center mb-4">
              {category.icon}
              <h3 className="text-lg font-semibold ml-3">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-600">
              Artículos disponibles: {category.articles}
            </p>
            <Link href={`/dashboard-admin/administrador/soporte-tecnico/${category.slug}`}>
              <button className="mt-4 text-blue-600 hover:text-blue-400 transition">
                Ver artículos 
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Artículos recientes */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Artículos Recientes
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-4 rounded-lg shadow-md hover:bg-blue-50 transition"
            >
              <h4 className="font-semibold text-gray-800 mb-1">{article.title}</h4>
              <p className="text-xs text-gray-500">
                {article.author} • {article.date}
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-400">
                Leer más
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Encuesta de satisfacción */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          ¿Te resultó útil el soporte?
        </h3>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={26}
              className={`cursor-pointer ${
                rating >= star ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-gray-600">
            Gracias por calificar con {rating} estrella{rating > 1 ? "s" : ""}.
          </p>
        )}
      </div>

      {/* Botones de contacto */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
        <button
          onClick={() => setIsContactOpen(true)}
          className="bg-green-400 text-white px-6 py-3 rounded-lg text-lg flex items-center hover:bg-green-500 transition-all"
        >
          <MessageCircle size={20} className="mr-2" />
          Enviar Ticket
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-purple-400 text-white px-6 py-3 rounded-lg text-lg flex items-center hover:bg-purple-500 transition-all"
        >
          <MessageCircle size={20} className="mr-2" />
          Abrir Chat
        </button>
      </div>

      {/* Modal de contacto */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Enviar Ticket de Soporte
            </h3>
            <form onSubmit={handleSubmitTicket} className="space-y-3">
              <input
                type="text"
                placeholder="Asunto"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                rows="4"
                placeholder="Describe tu problema..."
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                <Send size={18} className="inline mr-2" />
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat simulado */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 bg-white border shadow-lg rounded-lg w-80 z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Chat de Soporte</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-3 text-sm text-gray-700 space-y-2 h-48 overflow-y-auto">
            <p className="bg-gray-100 p-2 rounded-md max-w-[80%]">
              👋 Hola, soy el asistente de soporte. ¿En qué puedo ayudarte?
            </p>
          </div>
          <div className="flex p-2 border-t">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400"
            />
            <button className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
