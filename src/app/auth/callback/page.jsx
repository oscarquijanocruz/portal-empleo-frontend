"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import authService from '@/services/authService';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Procesando autenticación...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
          setStatus('Error en la autenticación con Google');
          setTimeout(() => {
            router.push('/auth/login?error=oauth_failed');
          }, 2000);
          return;
        }

        if (token) {
          // Guardar el token
          authService.setToken(token);

          // Obtener perfil del usuario
          const profile = await authService.getProfile();

          setStatus('¡Autenticación exitosa! Redirigiendo...');

          // Redirigir al dashboard según tipo de usuario
          setTimeout(() => {
            const tipoUsuario = profile?.user?.tipo_usuario || profile?.tipo_usuario;
            
            if (tipoUsuario === 'empresa') {
              // Si es empresa, redirigir a completar perfil
              router.push('/auth/completar-perfil-empresa');
            } else if (tipoUsuario === 'universidad') {
              // Si es universidad, redirigir a completar perfil
              router.push('/auth/completar-perfil-universidad');
            } else if (tipoUsuario === 'admin') {
              router.push('/dashboard-admin');
            } else {
              // Candidato - redirigir a completar perfil
              router.push('/auth/completar-perfil-candidato');
            }
          }, 1000);
        } else {
          setStatus('No se recibió token de autenticación');
          setTimeout(() => {
            router.push('/auth/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error en callback:', error);
        setStatus('Error al procesar la autenticación');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg">{status}</p>
      </div>
    </div>
  );
}
