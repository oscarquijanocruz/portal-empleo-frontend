"use client";

import Activity from '../../components/dashboard-admin/Activity';
import Reports from '../../components/dashboard-admin/Reports';
import Calendar from '../../components/dashboard-admin/Calendar';
import Newsletter from '../../components/dashboard-admin/Newsletter';
import Vacancies from '../../components/dashboard-admin/Vacancies';
import Candidates from '../../components/dashboard-admin/Candidates';
import { Bell, MessageSquare, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <header className="bg-white rounded-lg shadow mb-6 px-4 py-2 flex items-center justify-between">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
        />
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="hover:text-blue-600">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
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

          <div className="relative">
            <button onClick={() => setShowMessages(!showMessages)} className="hover:text-blue-600">
              <MessageSquare size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">5</span>
            </button>
            {showMessages && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 p-4 z-50">
                <h4 className="font-semibold mb-2">Mensajes</h4>
                <ul className="space-y-1 text-sm">
                  <li>💬 Ana: Revisión del reporte mensual</li>
                  <li>💬 Carlos: Nuevo candidato para evaluar</li>
                  <li>💬 María: Actualización de calendario</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tarjetas superiores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Activity />
        <Reports />
        <Calendar />
        <Newsletter />
      </div>

      {/* Vacantes y candidatos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Vacancies />
        </div>
        <div>
          <Candidates />
        </div>
      </div>

      {/* Botón flotante */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
        <Plus size={24} />
      </button>
    </div>
  );
}
