"use client";

import { useState } from "react";
import { Bell, MessageSquare, Plus } from "lucide-react";
import { motion } from "framer-motion";

import Activity from "../../components/dashboard-admin/Activity";
import Reports from "../../components/dashboard-admin/Reports";
import Calendar from "../../components/dashboard-admin/Calendar";
import Newsletter from "../../components/dashboard-admin/Newsletter";
import Vacancies from "../../components/dashboard-admin/Vacancies";
import Candidates from "../../components/dashboard-admin/Candidates";
import AIChatAssistant from "../../components/dashboard-admin/AIChatAssistant";


export default function AdminDashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const navigate = (url) => {
    window.location.href = url;
  };

  const topCards = [
    {
      id: 1,
      component: <Activity />,
      link: "/dashboard-admin/administrador/vacantes",
    },
    {
      id: 2,
      component: <Reports />,
      link: "/dashboard-admin/administrador/reportes",
    },
    {
      id: 3,
      component: <Calendar />,
      link: "/dashboard-admin/administrador/eventos",
    },
    {
      id: 4,
      component: <Newsletter />,
      link: "/dashboard-admin/administrador/soporte-tecnico",
    },
  ];

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <header className="bg-white rounded-lg shadow mb-6 px-4 py-2 flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
        />
        <div className="flex items-center gap-4">
          
          {/* NOTIFICACIONES */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="hover:text-blue-600"
            >
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 p-4 z-50">
                <h4 className="font-semibold mb-2">Notificaciones</h4>
                <ul className="space-y-1 text-sm">
                  <li>📌 Nuevo candidato registrado</li>
                  <li>📌 Vacante actualizada</li>
                  <li>📌 Reporte generado</li>
                </ul>
              </div>
            )}
          </div>

          {/* MENSAJES */}
          <div className="relative">
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="hover:text-blue-600"
            >
              <MessageSquare size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                5
              </span>
            </button>
            {showMessages && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 p-4 z-50">
                <h4 className="font-semibold mb-2">Mensajes</h4>
                <ul className="space-y-1 text-sm">
                  <li>💬 Ana: Revisión del reporte mensual</li>
                  <li>💬 Carlos: Nuevo candidato para evaluar</li>
                  <li>💬 María: Actualización del calendario</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TARJETAS SUPERIORES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {topCards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(card.link)}
            className="cursor-pointer bg-white/70 backdrop-blur-md border border-gray-200 shadow-lg p-4 rounded-xl relative hover:shadow-xl transition-all"
          >
            {card.component}
          </motion.div>
        ))}
      </div>

      {/* VACANTES Y CANDIDATOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* VACANTES CLICKEABLE */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard-admin/administrador/vacantes")}
          className="cursor-pointer md:col-span-2 bg-white rounded-xl shadow p-4 hover:shadow-xl transition-all"
        >
          <Vacancies />
        </motion.div>

        {/* CANDIDATOS CLICKEABLE */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard-admin/administrador/usuarios")}
          className="cursor-pointer bg-white rounded-xl shadow p-4 hover:shadow-xl transition-all"
        >
          <Candidates />
        </motion.div>
      </div>

      {/* BOTÓN FLOTANTE */}
      <motion.button
      >
        <Plus size={24} />
      </motion.button>
 <AIChatAssistant />
    </div>
  );
 

}
