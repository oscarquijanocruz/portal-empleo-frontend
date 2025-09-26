"use client";
import Activity from '../../components/dashboard-admin/Activity';
import Reports from '../../components/dashboard-admin/Reports';
import Calendar from '../../components/dashboard-admin/Calendar';
import Newsletter from '../../components/dashboard-admin/Newsletter';
import Vacancies from '../../components/dashboard-admin/Vacancies';
import Candidates from '../../components/dashboard-admin/Candidates';
import { Bell, MessageSquare } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    
    <div className="space-y-6">
      {/* Tarjetas superiores */}
      <header className="bg-white rounded-lg shadow mb-6 px-4 py-2 flex items-center">
          <div className="flex items-center flex-1">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>
          <div className="flex items-center gap-4 ml-4 text-gray-600">
            <button className="hover:text-blue-600">
              <Bell size={22} />
            </button>
            <button className="hover:text-blue-600">
              <MessageSquare size={22} />
            </button>
          </div>
        </header>
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
    </div>
  );
}
