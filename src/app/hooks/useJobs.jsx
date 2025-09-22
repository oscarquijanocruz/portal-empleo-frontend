//Logica de card jobs

'use client'
import { useState, useMemo, useCallback } from 'react';
import { mockJobs } from '../data/mockData';

export const useJobs = (initialJobs = mockJobs) => {
  // Estados principales
  const [selectedJob, setSelectedJob] = useState(initialJobs[0] || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("para-ti");
  const [sortOrder, setSortOrder] = useState("recientes");
  
  // Estados de filtros
  const [filters, setFilters] = useState({
    modalidad: '',
    sueldo: '',
    tipoContrato: '',
    categoria: ''
  });

  // Lógica de filtrado y ordenamiento
  const filteredJobs = useMemo(() => {
    let jobs = [...initialJobs];

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      jobs = jobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros
    if (filters.modalidad) {
      jobs = jobs.filter(job => 
        job.modalidad.toLowerCase() === filters.modalidad.toLowerCase()
      );
    }

    if (filters.sueldo) {
      const salarioFiltro = parseInt(filters.sueldo.replace(/[,$]/g, ''));
      jobs = jobs.filter(job => {
        const salarioJob = parseInt(job.salario.replace(/[,$]/g, ''));
        return salarioJob >= salarioFiltro;
      });
    }

    if (filters.tipoContrato) {
      jobs = jobs.filter(job => 
        job.jornada.toLowerCase().includes(filters.tipoContrato.toLowerCase())
      );
    }

    if (filters.categoria) {
      jobs = jobs.filter(job => 
        job.categoria.toLowerCase().includes(filters.categoria.toLowerCase())
      );
    }

    // Ordenar trabajos
    switch (sortOrder) {
      case 'mejor-pagados':
        return jobs.sort((a, b) => {
          const salarioA = parseInt(a.salario.replace(/[,$]/g, ''));
          const salarioB = parseInt(b.salario.replace(/[,$]/g, '')); 
          return salarioB - salarioA;
        });
      case 'mas-relevantes':
        return jobs;  
      case 'recientes':
        return [...jobs].reverse();
      default:
        return jobs;
    }
  }, [initialJobs, searchTerm, filters, sortOrder]);

  // Handlers
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setFilters({
      modalidad: '',
      sueldo: '',
      tipoContrato: '',
      categoria: ''
    });
  }, []);

  const handleJobSelect = useCallback((job) => {
    setSelectedJob(job);
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSortOrder(newSort);
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Reset selectedJob si no está en los trabajos filtrados
  useMemo(() => {
    if (selectedJob && !filteredJobs.find(job => job.id === selectedJob.id)) {
      setSelectedJob(filteredJobs[0] || null);
    }
  }, [filteredJobs, selectedJob]);

  return {
    // Estados
    selectedJob,
    searchTerm,
    activeTab,
    sortOrder,
    filters,
    filteredJobs,
    
    // Handlers
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleJobSelect,
    handleSortChange,
    handleTabChange,
    
    // Setters directos (por si necesitas más control)
    setSelectedJob,
    setSearchTerm,
    setActiveTab,
    setSortOrder,
    setFilters
  };
};