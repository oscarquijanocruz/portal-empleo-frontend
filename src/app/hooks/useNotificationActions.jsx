// src/app/hooks/useNotificationActions.jsx
'use client'
import { useRouter } from 'next/navigation';
import { useNotification } from '@/app/contexts/NotificationContext';

export function useNotificationActions() {
  const router = useRouter();
  const { notify } = useNotification();

  const handleNotificationAction = (notification) => {
    if (!notification.action) {
      console.warn('Notificación sin acción definida');
      return;
    }

    const { type, jobId, candidateId, messageId } = notification.action;

    switch (type) {
        
      // ACCIONES DE POSTULACIONES
      case 'view_application':
        // Redirigir a la página de la postulación específica
        router.push(`/dashboard/candidato/mis-empleos?tab=postulados&jobId=${jobId}`);
        notify.success(
          'Abriendo postulación',
          `Viendo detalles de ${notification.metadata?.jobTitle || 'la vacante'}`
        );
        break;

      case 'review_application':
        // Si eres empresa, ver la aplicación del candidato
        router.push(`/dashboard/empresa/postulaciones/${candidateId}`);
        break;

      // ACCIONES DE MENSAJES
      case 'view_message':
        // Abrir la conversación con ese mensaje
        router.push(`/dashboard/candidato/mensajes?messageId=${messageId}`);
        notify.info(
          'Abriendo mensaje',
          `De ${notification.metadata?.senderName || 'remitente'}`
        );
        break;

      case 'reply_message':
        // Abrir mensaje con el campo de respuesta enfocado
        router.push(`/dashboard/candidato/mensajes?messageId=${messageId}&action=reply`);
        break;

      // ACCIONES DEL SISTEMA
      case 'view_profile':
        router.push('/dashboard/candidato/mi-perfil');
        notify.info('Ir a perfil', 'Abriendo tu perfil');
        break;

      case 'view_features':
        router.push('/dashboard/candidato/buscar-empleos');
        notify.success('Nuevas funciones', 'Explora las mejoras en búsqueda');
        break;

      case 'view_maintenance':
        // Mostrar modal o página de mantenimiento
        notify.warning(
          'Mantenimiento programado',
          'Revisa los detalles del mantenimiento'
        );
        break;

      // ACCIONES DE TRABAJOS
      case 'view_job':
        // Ver detalles completos del trabajo
        router.push(`/dashboard/candidato/buscar-empleos?jobId=${jobId}`);
        break;

      case 'apply_to_job':
        // Ir directo a postularse
        router.push(`/dashboard/candidato/buscar-empleos?jobId=${jobId}&action=apply`);
        break;

      // ACCIONES POR DEFECTO
      default:
        console.warn('Tipo de acción no reconocido:', type);
        notify.warning(
          'Acción no disponible',
          'Esta función está en desarrollo'
        );
    }
  };

  return { handleNotificationAction };
}