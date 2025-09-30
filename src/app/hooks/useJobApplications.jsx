'use client'
import { useState, useCallback, useEffect, useMemo } from 'react';

export const useJobApplications = (candidateId) => {
  // Estado de las postulaciones del candidato actual
  const [applications, setApplications] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`jobApplications_${candidateId}`);
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Error loading applications:', error);
        return [];
      }
    }
    return [];
  });

  // Persistir aplicaciones en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`jobApplications_${candidateId}`, JSON.stringify(applications));
      } catch (error) {
        console.error('Error saving applications:', error);
      }
    }
  }, [applications, candidateId]);

  // Postularse a un trabajo
  const applyToJob = useCallback((jobId) => {
    const existingApplication = applications.find(app => app.jobId === jobId);
    
    if (existingApplication) {
      console.log('Ya te has postulado a este trabajo');
      return false;
    }

    const newApplication = {
      id: Date.now(), // En producción sería generado por el backend
      candidateId,
      jobId,
      estado: 'postulado',
      fechaPostulacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      notas: ''
    };

    setApplications(prev => [...prev, newApplication]);
    console.log(`Te has postulado al trabajo ${jobId}`);
    return true;
  }, [applications, candidateId]);

  //  Obtener estado de una postulación específica
  const getJobApplicationStatus = useCallback((jobId) => {
    const application = applications.find(app => app.jobId === jobId);
    return application?.estado || null;
  }, [applications]);

  // Verificar si ya se postuló a un trabajo
  const hasAppliedToJob = useCallback((jobId) => {
    return applications.some(app => app.jobId === jobId);
  }, [applications]);

  // Obtener trabajos por estado
  const getJobsByStatus = useCallback((allJobs, status) => {
    const jobIdsWithStatus = applications
      .filter(app => app.estado === status)
      .map(app => app.jobId);
    
    return allJobs
      .filter(job => jobIdsWithStatus.includes(job.id))
      .map(job => {
        const application = applications.find(app => app.jobId === job.id);
        return {
          ...job,
          applicationInfo: application
        };
      });
  }, [applications]);

  // Estadísticas rápidas
  const stats = useMemo(() => ({
    total: applications.length,
    postulados: applications.filter(app => app.estado === 'postulado').length,
    enRevision: applications.filter(app => app.estado === 'en_revision').length,
    aceptados: applications.filter(app => app.estado === 'aceptado').length,
    rechazados: applications.filter(app => app.estado === 'rechazado').length,
  }), [applications]);

  // Simular cambio de estado (normalmente vendría del backend)
  const updateApplicationStatus = useCallback((jobId, newStatus, notes = '') => {
    setApplications(prev => 
      prev.map(app => 
        app.jobId === jobId 
          ? {
              ...app,
              estado: newStatus,
              fechaActualizacion: new Date().toISOString(),
              notas: notes
            }
          : app
      )
    );
  }, []);

  return {
    applications,
    applyToJob,
    getJobApplicationStatus,
    hasAppliedToJob,
    getJobsByStatus,
    updateApplicationStatus,
    stats
  };
};