/* Barra lateral izquierda */

import Link from "next/link";
import Image from 'next/image';
import NavLinks from "./nav-links";
import { User2, LogOut } from "lucide-react";

export default function SideBar() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-gray-50 md:h-40"
        href="/"
      >
        <div className="w-full text-black md:w-full">
          <Image
            src = '/logo_sidebar.png'
            alt = "Logo Mentory"
            width = {1000}
            height = {760}
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"> </div>
        <Link
          href="/dashboard/candidato/mi-perfil"
          className="flex h-[84px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User2 size={26} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Nombre Apellido</p>
            <p className="text-xs text-gray-500">Puesto</p>
          </div>
        </Link>
        <Link
          href="/auth/login"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
              <LogOut className="w-6" />
              <p className="hidden md:block">Cerrar sesión</p>
        </Link>
      </div>
    </div>
  );
}