/* Barra lateral izquierda */
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./nav-links";
import { mockUsers } from "@/app/data/mockUsers";
import { User2, LogOut, User } from "lucide-react";
import UserProfile from "./UserProfile";

const usuarios = mockUsers;

export default function SideBar() {
  return (
    <div className="flex h-full flex-col px-2 py-3 md:px-2 md:py-4 bg-white border-r border-gray-200">
      <Link
        className="mb-3 flex h-16 items-center justify-center rounded-md md:mb-4 md:h-32"
        href="/"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/logo_sidebar.png"
            alt="Logo Mentory"
            width={1000}
            height={760}
            className="object-contain w-auto h-full max-h-12 md:max-h-24"
            priority
          />
        </div>
      </Link>
      <div className="md:h-full flex grow flex-row justify-between space-x-1 md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />
        <UserProfile />
      </div>
    </div>
  );
}
