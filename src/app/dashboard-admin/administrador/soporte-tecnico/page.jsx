"use client";

import { useState } from "react";
import { Search, HelpCircle, UserCircle, Settings, FileText, MessageCircle } from "lucide-react";  

export default function SupportSection() {
  const [searchQuery, setSearchQuery] = useState("");  

  const categories = [
    { name: "Preguntas Frecuentes", icon: <HelpCircle size={30} />, articles: 10 },
    { name: "Cuenta de Usuario", icon: <UserCircle size={30} />, articles: 5 },
    { name: "Configuración", icon: <Settings size={30} />, articles: 8 },
    { name: "Informes", icon: <FileText size={30} />, articles: 6 },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-orange-100 rounded-lg shadow-md p-6">
      {/* Barra de búsqueda */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">How can we help?</h2>
        <div className="flex items-center space-x-4 w-full md:w-1/2 bg-white rounded-full shadow-md p-2">
          <input
            type="text"
            placeholder="Search Beacon, Docs, Reports, etc"
            className="w-full px-4 py-2 border-none outline-none text-sm"
            style={{
              background: "linear-gradient(to right, #ffffffff, #fcf0ffff)", 
              borderRadius: "50px", 
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-purple-300 text-white px-4 py-2 rounded-full hover:bg-purple-500">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Título de categorías */}
      <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Help Desk</h3>

      {/* Categorías de soporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="bg-white p-6 rounded-xl shadow-md hover:bg-red-50 transition-all">
            <div className="flex items-center mb-4">
              {category.icon}
              <h3 className="text-lg font-semibold ml-3">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-600">Artículos disponibles: {category.articles}</p>
            <button className="mt-4 text-blue-600 hover:text-blue-300">Ver artículos</button>
          </div>
        ))}
      </div>

      {/* Botón de contacto */}
      <div className="mt-12 text-center">
        <button className="bg-purple-400 text-white px-6 py-3 rounded-lg text-lg flex items-center justify-center mx-auto hover:bg-purple-500 transition-all">
          <MessageCircle size={20} className="mr-2" />
          Contact Us
        </button>
      </div>
    </div>
  );
}
