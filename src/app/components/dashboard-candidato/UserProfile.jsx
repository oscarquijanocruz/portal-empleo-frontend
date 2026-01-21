"use client";
import { User2, LogOut, User, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { mockUsers } from "@/app/data/mockUsers";
import Link from "next/link";

const usuario = mockUsers[0];

export default function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          aria-label="Menú de usuario"
          className="flex h-12 w-12 md:h-auto md:w-full items-center justify-center md:justify-start gap-2 rounded-lg p-2 md:p-3 text-sm font-medium bg-blue-100 hover:bg-blue-200 text-blue-900 transition-all duration-200 group cursor-pointer">        
          <div className="flex items-center gap-2 text-left overflow-hidden">
            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-blue-900 rounded-full flex items-center justify-center">
              <User2 className="w-4 h-4 md:w-5 md:h-5 text-white stroke-1" />
            </div>
            <div className="hidden md:block overflow-hidden min-w-0">
                <div className="grid">
                  <span className="font-semibold truncate">{usuario.nombre}</span>
                  <span className="text-xs text-gray-600 truncate">{usuario.puesto}</span>
                </div>
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>

      {/* Contenido del menú */}
      <DropdownMenuContent className="w-56" align="end" side="top" sideOffset={8}>
        <DropdownMenuItem asChild>
          {/* Usamos asChild para que el Link sea el elemento interactivo directo */}
          <Link href="/dashboard/candidato/mi-perfil" className="cursor-pointer w-full flex items-center gap-2">
            <User size={16} />
            <span>Mi CV</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {/* Usamos asChild para que el Link sea el elemento interactivo directo */}
          <Link href="/dashboard/candidato/mi-perfil/configuracion-cuenta" className="cursor-pointer w-full flex items-center gap-2">
            <Settings size={16} />
            <span>Configuración de cuenta</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/auth/login" className="cursor-pointer w-full flex items-center gap-2">
            <LogOut size={16} />
            <span>Cerrar sesión</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}