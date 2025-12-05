//logica para trabajos segun el perfil del usuario
'use client'
import { useState } from 'react';

export const useJobsForMe = () => {
  // Inicializar desde localStorage
  const [jobsForMe, setJobsForMe] = useState([]);

  // Métodos para manipular el estado
  const addJob = (job) => {
    setJobsForMe([...jobsForMe, job]);
  };

  const removeJob = (jobId) => {
    setJobsForMe(jobsForMe.filter(job => job.id !== jobId));
    setJobsForMe([...jobsForMe]);
    localStorage.setItem('jobsForMe', JSON.stringify(jobsForMe));
  };

  return {
    jobsForMe,
    addJob,
    removeJob
  };
};