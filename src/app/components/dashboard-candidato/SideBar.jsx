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
          {/* <div className="hidden h-auto w-full grow rounded-md md:block"> </div> */}
        <UserProfile />
      </div>
    </div>
  );
}
