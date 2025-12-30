"use client";

import Link from "next/link";
import {
  Home,
  Users,
  Briefcase,
  Calendar,
  FileText,
  BarChart,
  Container,
  User,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function AdminSideBar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Inicio", href: "/dashboard-admin/administrador" },
    { icon: Users, label: "Gestión de Usuarios", href: "/dashboard-admin/administrador/usuarios" },
    { icon: Briefcase, label: "Gestión de Vacantes", href: "/dashboard-admin/administrador/vacantes" },
    { icon: Calendar, label: "Gestión de Eventos", href: "/dashboard-admin/administrador/eventos" },
    { icon: FileText, label: "Gestión de Contenido", href: "/dashboard-admin/administrador/contenido" },
    { icon: BarChart, label: "Reportes", href: "/dashboard-admin/administrador/reportes" },
    { icon: Container, label: "Soporte Técnico", href: "/dashboard-admin/administrador/soporte-tecnico" },
  ];

  return (
    <div className="flex h-full flex-col bg-white shadow-md">
      
      {/* Logo */}
      <div className="h-30 flex items-center justify-center border-b border-gray-200">
        <img src="/logo2.png" alt="Mentory" className="h-45" />
      </div>

      {/* Menú */}
      <nav className="flex-1 p-6 space-y-2 text-gray-800">
        {menuItems.map((item) => {
          const LinkIcon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 p-3 rounded-md text-sm font-medium transition
                hover:bg-sky-100
                ${
                  pathname === item.href
                    ? "bg-sky-100 text-blue-600"
                    : "text-gray-600"
                }`}
            >
              <LinkIcon size={20} />
              <p className="hidden md:block">{item.label}</p>
            </Link>
          );
        })}
      </nav>

      {/* Perfil (MISMA estructura, ahora con dropdown) */}
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* ❗ ESTA ESTRUCTURA NO SE TOCÓ */}
            <div className="flex items-center gap-3 rounded-md bg-[#E6F0FA] p-3 cursor-pointer hover:bg-blue-100 transition">
              <div className="w-10 h-10 rounded-full bg-[#0C1E39] flex items-center justify-center text-white font-bold">
                👤
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Oscar Zavaleta
                </p>
                <p className="text-xs text-gray-600">
                  Administrador
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56"
            align="end"
            side="top"
            sideOffset={8}
          >
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard-admin/administrador/perfil"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User size={16} />
                <span>Mi perfil</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/auth/login"
                className="flex items-center gap-2 cursor-pointer text-red-600"
              >
                <LogOut size={16} />
                <span>Cerrar sesión</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
