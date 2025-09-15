'use client'
import { Home, Search, Briefcase, Clock, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
        { icon: Home, label: 'Inicio', active: false },
        { icon: Search, label: 'Buscar empleos', active: true },
        { icon: Briefcase, label: 'Mis Empleos', active: false },
        { icon: Clock, label: 'Mi actividad', active: false },
        { icon: MessageSquare, label: 'Mensajes', active: false }
    ];

const links = [
  { name: 'Inicio', 
    href: '/dashboard/candidato', 
    icon: Home },
  {
    name: 'Buscar empleos',
    href: '/dashboard/candidato/buscar-empleos',
    icon: Search},
    
  { name: 'Mis empleos', 
    href: '/dashboard/candidato/mis-empleos' , 
    icon: Briefcase },
  {
    name: 'Mi actividad',
    href: '/dashboard/candidato/mi-actividad',
    icon: Clock},

  { name: 'Mensajes', 
    href: '/dashboard/candidato/mensajes',
    icon: MessageSquare },
];


export default function NavLinks() {
  const pathname = usePathname(); // Obtiene la ruta actual
  return (
    <div>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            ${pathname === link.href ? ' bg-sky-100 text-blue-600' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}