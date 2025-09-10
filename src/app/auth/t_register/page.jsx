"use client";
import Link from "next/link";
import { User, Briefcase, GraduationCap } from "lucide-react";

function RegisterSelectionPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg w-3/4 flex overflow-hidden">
        
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-10">¡Hola!</h1>
          <h2 className="text-3xl font-bold text-gray-700 mb-2 text-center">Registro</h2>
          <p className="text-gray-500 mb-8 text-center">¿Qué tipo de perfil deseas crear?</p>

          <div className="grid grid-cols-2 gap-4 mb-4">

            <Link
              href="/auth/register?type=candidato"
              className="rounded-lg p-6 flex flex-col items-center justify-center hover:bg-green-200 transition"
            >
              <User className="w-8 h-8 mb-2" />
              <span className="font-medium">Candidato</span>
            </Link>

            <Link
              href="/auth/register?type=empresa"
              className="rounded-lg p-6 flex flex-col items-center justify-center hover:bg-blue-200 transition"
            >
              <Briefcase className="w-8 h-8 mb-2" />
              <span className="font-medium">Empresa</span>
            </Link>
          </div>

          <Link
            href="/auth/register?type=universidad"
            className="rounded-lg p-6 flex flex-col items-center justify-center hover:bg-orange-200 transition"
          >
            <GraduationCap className="w-8 h-8 mb-2" />
            <span className="font-medium">Universidad</span>
          </Link>
        </div>

        <div
          className="w-1/2 flex justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: "url('/fondo.jpg')" }}
        >
          <img src="/logo.png" alt="Logo" className="w-90 h-90 relative z-10" />
        </div>
      </div>
    </div>
  );
}

export default RegisterSelectionPage;
