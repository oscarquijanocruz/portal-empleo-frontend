"use client";  

import AdminSideBar from "../../components/dashboard-admin/AdminSideBar";
export default function DashboardAdminLayout({ children }) {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64">
        <AdminSideBar />
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header superior */}
        
        {/* Contenido dinámico */}
        {children}
      </main>
    </div>
  );
}
