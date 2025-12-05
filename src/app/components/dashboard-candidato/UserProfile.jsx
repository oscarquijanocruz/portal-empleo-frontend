"use client";
import { User2, LogOut, User } from "lucide-react";
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
          className="flex h-[84px] grow items-center justify-between gap-2 rounded-md p-3 text-sm font-medium bg-blue-100 hover:bg-blue-200 text-blue-900 transition-all md:flex-none md:justify-start md:p-2 md:px-3 group cursor-pointer">
          
          <div className="flex items-center gap-2 text-left overflow-hidden">
            <div className="w-10 h-10 shrink-0 bg-blue-900 rounded-full flex items-center justify-center">
              <User2 size={30} className="text-white stroke-1" />
            </div>
            
            <div className="hidden md:block overflow-hidden">
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
            <span>Ver mi perfil</span>
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