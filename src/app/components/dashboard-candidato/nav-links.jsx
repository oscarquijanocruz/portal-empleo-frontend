"use client";
import {
  Home,
  Search,
  Briefcase,
  MessageCircleMore,
  User2,
  BellRing,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/*
const menuItems = [
        { icon: Home, label: 'Inicio', active: false },
        { icon: Search, label: 'Buscar empleos', active: true },
        { icon: Briefcase, label: 'Mis Empleos', active: false },
        { icon: Clock, label: 'Mi actividad', active: false },
        { icon: MessageCircleMore, label: 'Mensajes', active: false },
    ];
*/

const links = [
  { name: "Inicio", href: "/dashboard/candidato", icon: Home },
  {
    name: "Buscar empleos",
    href: "/dashboard/candidato/buscar-empleos",
    icon: Search,
  },

  {
    name: "Mis empleos",
    href: "/dashboard/candidato/mis-empleos",
    icon: Briefcase,
  },
  {
    name: "Notificaciones",
    href: "/dashboard/candidato/notificaciones",
    icon: BellRing,
  },

  {
    name: "Mensajes",
    href: "/dashboard/candidato/mensajes",
    icon: MessageCircleMore,
  },
];

export default function NavLinks() {
  const pathname = usePathname(); // Obtiene la ruta actual
  return (
    <nav className="flex flex-row md:flex-col gap-1 md:gap-1">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex h-12 w-12 md:h-11 md:w-full items-center justify-center gap-3 rounded-lg
              text-sm font-medium transition-all duration-200
              md:justify-start md:px-3
              ${
                isActive
                  ? "bg-blue-100 text-blue-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-800"
              }
            `}
            title={link.name}
          >
            <LinkIcon className="w-5 h-5 md:w-5 md:h-5 shrink-0" />
            <p className="hidden md:block truncate">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}
