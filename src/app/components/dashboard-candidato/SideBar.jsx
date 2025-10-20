/* Barra lateral izquierda */
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./nav-links";
import { mockUsers } from "@/app/data/mockUsers";
import { User2, LogOut, User } from "lucide-react";

const usuarios = mockUsers;

export default function SideBar() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white ">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md md:h-40"
        href="/"
      >
        <div className="w-full text-black md:w-full md:h-full sm:w-5 sm:h-5 sm:top-0 sm:left-0 sm:right-0 sm:bottom-0">
          <Image
            src="/logo_sidebar.png"
            alt="Logo Mentory"
            width={1000}
            height={760}
          />
        </div>
      </Link>
      <div className="h-full flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"> </div>
        <Link
          href="/dashboard/candidato/mi-perfil"
          className="flex h-[84px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-blue-100 hover:bg-blue-200 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
            <User2 size={30} className="text-white stroke-1" />
          </div>
          <div>
            {usuarios.map((usuario) => (
              <div
                key={usuario.id}
                className="grid items-center space-x-2 px-1 py-2 rounded-lg text-sm font-medium transition-all"
              >
                <span className="font-semibold text-blue-900">{usuario.nombre}</span>
                <span className="text-xs text-gray-600">{usuario.puesto}</span>
              </div>
            ))}
          </div>
        </Link>
        <Link
          href="/auth/login"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <LogOut className="w-6" />
          <p className="hidden md:block">Cerrar sesión</p>
        </Link>
      </div>
    </div>
  );
}
