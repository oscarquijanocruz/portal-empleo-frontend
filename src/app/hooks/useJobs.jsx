//Logica de card jobs
// TODO: Refactorizar este hook para que maneje todo mediante una llamada a la API: fetch('/api/jobs?q=...').
"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { mockJobs } from "../data/mockData";

const JOBS_PER_PAGE = 20;

export const useJobs = (initialJobs = mockJobs, currentPage = 1) => {
  // Estados principales
  const [selectedJob, setSelectedJob] = useState(initialJobs[0] || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("para-ti");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(currentPage);

  // Estados de filtros
  const [filters, setFilters] = useState({
    modalidad: "",
    sueldo: "",
    tipoContrato: "",
    categoria: "",
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
      jobs = jobs.filter(
        (job) => job.modalidad.toLowerCase() === filters.modalidad.toLowerCase()
      );
    }

    if (filters.sueldo) {
      const salarioFiltro = parseInt(filters.sueldo.replace(/[,$]/g, ""));
      jobs = jobs.filter((job) => {
        const salarioJob = parseInt(job.salario.replace(/[,$]/g, ""));
        return salarioJob >= salarioFiltro;
      });
    }

    if (filters.tipoContrato) {
      jobs = jobs.filter((job) =>
        job.jornada.toLowerCase().includes(filters.tipoContrato.toLowerCase())
      );
    }

    if (filters.categoria) {
      jobs = jobs.filter((job) =>
        job.categoria.toLowerCase().includes(filters.categoria.toLowerCase())
      );
    }

    // Ordenar trabajos
    switch (sortOrder) {
      case "mejor-pagados":
        return jobs.sort((a, b) => {
          const salarioA = parseInt(a.salario.replace(/[,$]/g, ""));
          const salarioB = parseInt(b.salario.replace(/[,$]/g, ""));
          return salarioB - salarioA;
        });
      case "mas-relevantes": 
        // TODO: Cambiar funcionalidad para que funciones con la base de datos y el backend
        return jobs.sort((a, b) => {
          const sponsoredDiff = Number(!!b.isSponsored) - Number(!!a.isSponsored);
          if (sponsoredDiff !== 0) return sponsoredDiff;
          return (a.id ?? 0) - (b.id ?? 0);
        });
      case "recientes":
        return [...jobs].reverse();
      default:
        return jobs;
    }
  }, [initialJobs, searchTerm, filters, sortOrder]);

  // Lógica de paginación
  const totalPages = useMemo(() => {
    return Math.ceil(filteredJobs.length / JOBS_PER_PAGE) || 1;
  }, [filteredJobs.length]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * JOBS_PER_PAGE;
    const endIndex = startIndex + JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, page]);

  // Resetear a página 1 cuando cambian los filtros o búsqueda
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filters, sortOrder]);

  // Asegurar que la página actual no exceda el total de páginas
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

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
      modalidad: "",
      sueldo: "",
      tipoContrato: "",
      categoria: "",
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

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  // Reset selectedJob si no está en los trabajos filtrados
  useMemo(() => {
    if (selectedJob && !filteredJobs.find((job) => job.id === selectedJob.id)) {
      setSelectedJob(filteredJobs[0] || null);
    }
  }, [filteredJobs, selectedJob]);

  // Sincronizar página con el parámetro currentPage
  useEffect(() => {
    const pageNumber = parseInt(currentPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber !== page) {
      setPage(pageNumber);
    }
  }, [currentPage, page]);

  return {
    // Estados
    selectedJob,
    searchTerm,
    activeTab,
    sortOrder,
    filters,
    filteredJobs,
    paginatedJobs,
    currentPage: page,
    totalPages,
    jobsPerPage: JOBS_PER_PAGE,

    // Handlers
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handleJobSelect,
    handleSortChange,
    handleTabChange,
    handlePageChange,

    // Setters directos (por si necesitas más control)
    setSelectedJob,
    setSearchTerm,
    setActiveTab,
    setSortOrder,
    setFilters,
  };
};
