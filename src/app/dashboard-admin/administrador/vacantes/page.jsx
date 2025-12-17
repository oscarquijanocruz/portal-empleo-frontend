// app/vacantes/page.jsx
"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  Search,
  PlusCircle,
  Edit3,
  Eye,
  Archive,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Download,
  Trash2,
  Users,
  FileText,
  Star,
} from "lucide-react";

/**
 * Módulo Vacantes — Todo en uno (Dashboard, filtros, crear/editar, detalle, kanban, candidatos, perfil candidato)
 * Pegar este archivo en app/vacantes/page.jsx
 * Reemplaza los stubs // TODO: INTEGRAR_BACKEND con llamadas a tu API
 * Requiere Tailwind CSS y lucide-react
 */

/* -------------------------
   Datos simulados (mock)
   ------------------------- */
const initialJobs = [
  {
    id: 1,
    titulo: "Frontend Developer (Next.js)",
    empresa: "TechCorp",
    ubicacion: "Puebla, Mexico",
    etapa: "New Candidates",
    sueldoMin: 50000,
    sueldoMax: 80000,
    modalidad: "Remoto",
    jornada: "Tiempo completo",
    estado: "Activa",
    fechaPublicacion: "2025-06-01T12:00:00Z",
    candidatos: [
      { id: 101, nombre: "Ana Pérez", estado: "New Candidates", score: 75, fecha: "2025-06-02T10:00:00Z", email: "ana@ejemplo.com" },
      { id: 102, nombre: "Luis Gómez", estado: "Screening", score: 82, fecha: "2025-06-03T11:00:00Z", email: "luis@ejemplo.com" },
    ],
  },
  {
    id: 2,
    titulo: "Diseñador Gráfico",
    empresa: "Agencia Creativa",
    ubicacion: "CDMX, Mexico",
    etapa: "Screening",
    sueldoMin: 8000,
    sueldoMax: 12000,
    modalidad: "Presencial",
    jornada: "Medio tiempo",
    estado: "Activa",
    fechaPublicacion: "2025-06-10T09:00:00Z",
    candidatos: [{ id: 201, nombre: "María Ruiz", estado: "New Candidates", score: 69, fecha: "2025-06-10T12:00:00Z", email: "maria@ejemplo.com" }],
  },
  {
    id: 3,
    titulo: "Backend (Node/Nest)",
    empresa: "InfraLabs",
    ubicacion: "Monterrey, Mexico",
    etapa: "Entrevista 1",
    sueldoMin: 60000,
    sueldoMax: 100000,
    modalidad: "Híbrido",
    jornada: "Tiempo completo",
    estado: "Cerrada",
    fechaPublicacion: "2025-05-20T10:00:00Z",
    candidatos: [{ id: 301, nombre: "Carlos Díaz", estado: "Offer", score: 90, fecha: "2025-05-28T09:00:00Z", email: "carlos@ejemplo.com" }],
  },
];

/* -------------------------
   Helper: export CSV
   ------------------------- */
function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(",")].concat(
    rows.map((row) => keys.map((k) => `"${(row[k] ?? "").toString().replace(/"/g, '""')}"`).join(","))
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* -------------------------
   Componente Principal
   ------------------------- */
export default function VacantesPage() {
  // DATA (reemplazar con backend)
  const [jobs, setJobs] = useState(initialJobs);

  // filtros y UI
  const [filterText, setFilterText] = useState("");
  const [ubicacionFilter, setUbicacionFilter] = useState("");
  const [modalidadFilter, setModalidadFilter] = useState("");
  const [jornadaFilter, setJornadaFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [reclutadorFilter, setReclutadorFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // paginación y selección
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [selectedIds, setSelectedIds] = useState([]);

  // modales/drawer
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [detailJob, setDetailJob] = useState(null); // job abierto en drawer
  const [profileCandidate, setProfileCandidate] = useState(null); // candidate profile drawer

  // toast
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

  // filtros aplicados
  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const text = `${j.titulo} ${j.empresa} ${j.ubicacion} ${j.etapa}`.toLowerCase();
      if (filterText && !text.includes(filterText.toLowerCase())) return false;
      if (ubicacionFilter && !j.ubicacion.toLowerCase().includes(ubicacionFilter.toLowerCase())) return false;
      if (modalidadFilter && j.modalidad !== modalidadFilter) return false;
      if (jornadaFilter && j.jornada !== jornadaFilter) return false;
      if (estadoFilter && j.estado !== estadoFilter) return false;
      // reclutador and tag filters: placeholders
      return true;
    });
  }, [jobs, filterText, ubicacionFilter, modalidadFilter, jornadaFilter, estadoFilter, reclutadorFilter, tagFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const currentPage = Math.min(page, totalPages);
  const pageData = filtered.slice((currentPage - 1) * limit, currentPage * limit);

  // selección
  const toggleSelect = (id) =>
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleSelectAllPage = () => {
    const pageIds = pageData.map((j) => j.id);
    const all = pageIds.every((id) => selectedIds.includes(id));
    if (all) setSelectedIds((s) => s.filter((id) => !pageIds.includes(id)));
    else setSelectedIds((s) => [...new Set([...s, ...pageIds])]);
  };

  // CRUD stubs - integrar con tu API
  const handleCreateOrUpdate = (payload) => {
    if (payload.id) {
      setJobs((prev) => prev.map((j) => (j.id === payload.id ? { ...j, ...payload } : j)));
      setMessage("Vacante actualizada");
      // TODO: PATCH /api/jobs/:id
    } else {
      const newJob = { ...payload, id: Date.now(), fechaPublicacion: new Date().toISOString(), candidatos: [] };
      setJobs((prev) => [newJob, ...prev]);
      setMessage("Vacante creada");
      // TODO: POST /api/jobs
    }
    setIsCreateOpen(false);
    setEditingJob(null);
  };

  const handleArchive = (id) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, estado: "Archivada" } : j)));
    setMessage("Vacante archivada");
    // TODO: PATCH /api/jobs/:id/state
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setSelectedIds((s) => s.filter((x) => x !== id));
    setMessage("Vacante eliminada");
    // TODO: DELETE /api/jobs/:id
  };

  const handleBulkArchive = () => {
    setJobs((prev) => prev.map((j) => (selectedIds.includes(j.id) ? { ...j, estado: "Archivada" } : j)));
    setSelectedIds([]);
    setMessage("Vacantes archivadas");
    // TODO: POST /api/jobs/bulk (or patch)
  };

  // export csv
  const handleExportCSV = () => {
    const rows = filtered.map((j) => ({
      id: j.id,
      titulo: j.titulo,
      empresa: j.empresa,
      ubicacion: j.ubicacion,
      etapa: j.etapa,
      sueldoMin: j.sueldoMin,
      sueldoMax: j.sueldoMax,
      modalidad: j.modalidad,
      jornada: j.jornada,
      estado: j.estado,
      fechaPublicacion: j.fechaPublicacion,
    }));
    exportToCSV("vacantes_export.csv", rows);
  };

  // abrir detalle
  const openDetail = (job) => setDetailJob(job);

  // efecto inicial (fetch)
  useEffect(() => {
    // TODO: fetch('/api/jobs?page=1&limit=...') setJobs(response.data)
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Vacantes</h1>
          <p className="text-sm text-gray-500">Gestión completa de vacantes — estilo ATS</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar vacante, empresa, ubicación..."
              value={filterText}
              onChange={(e) => { setFilterText(e.target.value); setPage(1); }}
              className="pl-10 pr-4 py-2 w-72 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-400"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
          </div>

          <button
            onClick={() => setIsFilterOpen((s) => !s)}
            className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm flex items-center gap-2"
            title="Filtros"
          >
            <Filter size={16} /> Filtros
          </button>

          <button onClick={handleExportCSV} className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-sm flex items-center gap-2">
            <Download size={16} /> Exportar
          </button>

          <button
            onClick={() => { setIsCreateOpen(true); setEditingJob(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            <PlusCircle size={18} /> Crear Vacante
          </button>
        </div>
      </header>

      {/* Filters */}
      {isFilterOpen && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
          <div>
            <label className="text-xs text-gray-600">Ubicación</label>
            <input value={ubicacionFilter} onChange={(e) => setUbicacionFilter(e.target.value)} placeholder="Ej: Puebla" className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="text-xs text-gray-600">Modalidad</label>
            <select value={modalidadFilter} onChange={(e) => setModalidadFilter(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded">
              <option value="">Todas</option>
              <option>Remoto</option>
              <option>Presencial</option>
              <option>Híbrido</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600">Jornada</label>
            <select value={jornadaFilter} onChange={(e) => setJornadaFilter(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded">
              <option value="">Todas</option>
              <option>Tiempo completo</option>
              <option>Medio tiempo</option>
              <option>Por proyecto</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600">Estado</label>
            <select value={estadoFilter} onChange={(e) => setEstadoFilter(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded">
              <option value="">Todos</option>
              <option>Activa</option>
              <option>Cerrada</option>
              <option>Archivada</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600">Reclutador</label>
            <input value={reclutadorFilter} onChange={(e) => setReclutadorFilter(e.target.value)} placeholder="Nombre reclutador" className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div className="flex gap-2">
            <button onClick={() => {
              setFilterText(""); setUbicacionFilter(""); setModalidadFilter(""); setJornadaFilter(""); setEstadoFilter(""); setReclutadorFilter(""); setTagFilter("");
              setPage(1);
            }} className="px-4 py-2 bg-gray-100 border rounded">Reset</button>
            <button onClick={() => setIsFilterOpen(false)} className="px-4 py-2 bg-white border rounded flex items-center gap-2"><X size={16} /> Cerrar</button>
          </div>
        </div>
      )}

      {/* Bulk actions & counts */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={pageData.length > 0 && pageData.every((j) => selectedIds.includes(j.id))}
            onChange={toggleSelectAllPage}
            className="w-4 h-4"
            title="Seleccionar todo en página"
          />
          <span className="text-sm text-gray-600">Seleccionar</span>

          {selectedIds.length > 0 && (
            <>
              <button onClick={handleBulkArchive} className="ml-3 px-3 py-1 bg-orange-500 text-white rounded text-sm">Archivar seleccionados ({selectedIds.length})</button>
              <button onClick={() => selectedIds.forEach(handleDelete)} className="ml-2 px-3 py-1 bg-red-500 text-white rounded text-sm">Eliminar seleccionados</button>
            </>
          )}
        </div>

        <div className="text-sm text-gray-500">
          {filtered.length} resultados • página {currentPage}/{totalPages}
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 bg-gray-50">
              <th className="p-3">#</th>
              <th className="p-3">Vacante</th>
              <th className="p-3">Empresa</th>
              <th className="p-3">Ubicación</th>
              <th className="p-3">Etapa</th>
              <th className="p-3">Sueldo</th>
              <th className="p-3">Modalidad</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Candidatos</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td colSpan={10} className="p-6 text-center text-sm text-gray-500">No hay vacantes que coincidan.</td>
              </tr>
            )}

            {pageData.map((job) => (
              <tr key={job.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" checked={selectedIds.includes(job.id)} onChange={() => toggleSelect(job.id)} className="w-4 h-4" />
                </td>

                <td className="p-3">
                  <div className="font-medium text-gray-800">{job.titulo}</div>
                  <div className="text-xs text-gray-500">Publicado: {new Date(job.fechaPublicacion).toLocaleDateString()}</div>
                </td>

                <td className="p-3">{job.empresa}</td>
                <td className="p-3">{job.ubicacion}</td>
                <td className="p-3"><span className="text-sm px-2 py-1 rounded bg-blue-50 text-blue-700">{job.etapa}</span></td>

                <td className="p-3 text-sm text-gray-700">{job.sueldoMin.toLocaleString()} - {job.sueldoMax.toLocaleString()} MXN</td>
                <td className="p-3">{job.modalidad}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${job.estado === "Activa" ? "bg-green-50 text-green-700" : job.estado === "Cerrada" ? "bg-red-50 text-red-700" : "bg-gray-50 text-gray-700"}`}>{job.estado}</span>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="text-sm text-gray-700">{job.candidatos ? job.candidatos.length : 0}</span>
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button title="Ver detalle" className="p-2 rounded hover:bg-gray-100" onClick={() => openDetail(job)}><Eye size={16} /></button>
                    <button title="Editar" className="p-2 rounded hover:bg-gray-100" onClick={() => { setEditingJob(job); setIsCreateOpen(true); }}><Edit3 size={16} /></button>
                    <button title="Archivar" className="p-2 rounded hover:bg-gray-100" onClick={() => handleArchive(job.id)}><Archive size={16} /></button>
                    <button title="Eliminar" className="p-2 rounded hover:bg-gray-100" onClick={() => handleDelete(job.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Mostrando {pageData.length} de {filtered.length} resultados</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="p-2 rounded bg-white border" disabled={currentPage === 1}><ChevronLeft size={16} /></button>
          <div className="px-3 py-1 bg-white border rounded text-sm">{currentPage}</div>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="p-2 rounded bg-white border" disabled={currentPage === totalPages}><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Modales / Drawers */}
      {isCreateOpen && <JobModal job={editingJob} onClose={() => { setIsCreateOpen(false); setEditingJob(null); }} onSubmit={handleCreateOrUpdate} />}

      {detailJob && <JobDetailDrawer job={detailJob} onClose={() => setDetailJob(null)} onUpdate={(updated) => { setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j))); setDetailJob(updated); }} onOpenCandidateProfile={(cand) => setProfileCandidate(cand)} />}

      {profileCandidate && <CandidateProfile candidate={profileCandidate} onClose={() => setProfileCandidate(null)} />}

      {/* Toast */}
      {message && <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">{message}</div>}
    </div>
  );
}

/* ------------------------------
   JobModal (crear / editar)
   ------------------------------ */
function JobModal({ job = null, onClose, onSubmit }) {
  const [form, setForm] = useState({
    id: job?.id ?? null,
    titulo: job?.titulo ?? "",
    empresa: job?.empresa ?? "",
    ubicacion: job?.ubicacion ?? "",
    etapa: job?.etapa ?? "New Candidates",
    sueldoMin: job?.sueldoMin ?? 0,
    sueldoMax: job?.sueldoMax ?? 0,
    modalidad: job?.modalidad ?? "Remoto",
    jornada: job?.jornada ?? "Tiempo completo",
    estado: job?.estado ?? "Activa",
  });

  useEffect(() => {
    setForm({
      id: job?.id ?? null,
      titulo: job?.titulo ?? "",
      empresa: job?.empresa ?? "",
      ubicacion: job?.ubicacion ?? "",
      etapa: job?.etapa ?? "New Candidates",
      sueldoMin: job?.sueldoMin ?? 0,
      sueldoMax: job?.sueldoMax ?? 0,
      modalidad: job?.modalidad ?? "Remoto",
      jornada: job?.jornada ?? "Tiempo completo",
      estado: job?.estado ?? "Activa",
    });
  }, [job]);

  const handleChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target ? (e.target.type === "number" ? Number(e.target.value) : e.target.value) : e }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo || !form.empresa) return alert("Completa título y empresa");
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop blanco semitransparente + desenfoque */}
      <div onClick={onClose} className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      <form onSubmit={handleSubmit} className="relative bg-white w-full max-w-3xl rounded-lg p-6 shadow-xl z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{form.id ? "Editar Vacante" : "Crear Vacante"}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded hover:bg-gray-100"><X size={18} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Título</label>
            <input value={form.titulo} onChange={handleChange("titulo")} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Empresa</label>
            <input value={form.empresa} onChange={handleChange("empresa")} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Ubicación</label>
            <input value={form.ubicacion} onChange={handleChange("ubicacion")} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Etapa</label>
            <select value={form.etapa} onChange={handleChange("etapa")} className="mt-1 w-full px-3 py-2 border rounded">
              <option>New Candidates</option>
              <option>Screening</option>
              <option>Entrevista 1</option>
              <option>Entrevista 2</option>
              <option>Shortlist</option>
              <option>Offer</option>
              <option>Onboarding</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Sueldo mínimo (MXN)</label>
            <input type="number" value={form.sueldoMin} onChange={handleChange("sueldoMin")} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Sueldo máximo (MXN)</label>
            <input type="number" value={form.sueldoMax} onChange={handleChange("sueldoMax")} className="mt-1 w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="text-sm text-gray-600">Modalidad</label>
            <select value={form.modalidad} onChange={handleChange("modalidad")} className="mt-1 w-full px-3 py-2 border rounded">
              <option>Remoto</option>
              <option>Presencial</option>
              <option>Híbrido</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Jornada</label>
            <select value={form.jornada} onChange={handleChange("jornada")} className="mt-1 w-full px-3 py-2 border rounded">
              <option>Tiempo completo</option>
              <option>Medio tiempo</option>
              <option>Por proyecto</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Estado</label>
            <select value={form.estado} onChange={handleChange("estado")} className="mt-1 w-full px-3 py-2 border rounded">
              <option>Activa</option>
              <option>Cerrada</option>
              <option>Archivada</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{form.id ? "Guardar" : "Crear"}</button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------
   JobDetailDrawer (overview + kanban + candidates)
   ------------------------------ */
function JobDetailDrawer({ job, onClose, onUpdate, onOpenCandidateProfile }) {
  const [local, setLocal] = useState(job);
  const [activeTab, setActiveTab] = useState("overview"); // overview | pipeline | candidates | activity
  const mounted = useRef(false);

  useEffect(() => {
    setLocal(job);
    mounted.current = true;
  }, [job]);

  // mover candidato de etapa
  const moveCandidateTo = (candidateId, newStage) => {
    setLocal((prev) => {
      const candidatos = prev.candidatos?.map((c) => (c.id === candidateId ? { ...c, estado: newStage } : c));
      const updated = { ...prev, candidatos };
      onUpdate(updated);
      return updated;
    });
  };

  const addCandidate = (candidate) => {
    setLocal((prev) => {
      const candidatos = [...(prev.candidatos || []), candidate];
      const updated = { ...prev, candidatos };
      onUpdate(updated);
      return updated;
    });
  };

  const deleteCandidate = (candidateId) => {
    if (!confirm("¿Eliminar candidato?")) return;
    setLocal((prev) => {
      const candidatos = (prev.candidatos || []).filter((c) => c.id !== candidateId);
      const updated = { ...prev, candidatos };
      onUpdate(updated);
      return updated;
    });
  };

  const saveMeta = (patch) => {
    const updated = { ...local, ...patch };
    setLocal(updated);
    onUpdate(updated);
    // TODO: send to backend PATCH /api/jobs/:id
  };

  if (!local) return null;

  const stages = ["New Candidates", "Screening", "Entrevista 1", "Entrevista 2", "Shortlist", "Offer", "Onboarding", "Hired"];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* backdrop */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" onClick={onClose} />

      {/* drawer */}
      <div className="relative ml-auto w-full md:w-4/5 bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold">{local.titulo}</h3>
            <div className="text-xs text-gray-500">{local.empresa} • {local.ubicacion}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border rounded text-sm" onClick={() => saveMeta({ estado: local.estado === "Activa" ? "Cerrada" : "Activa" })}>
              {local.estado === "Activa" ? "Cerrar vacante" : "Reabrir"}
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => { onClose(); alert("Ir a vista pública (placeholder)"); }}>Ver pública</button>
            <button className="p-2 rounded hover:bg-gray-100" onClick={onClose}><X size={18} /></button>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <TabBtn active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon={<FileText size={16} />}>Resumen</TabBtn>
            <TabBtn active={activeTab === "pipeline"} onClick={() => setActiveTab("pipeline")} icon={<Users size={16} />}>Pipeline</TabBtn>
            <TabBtn active={activeTab === "candidates"} onClick={() => setActiveTab("candidates")} icon={<Users size={16} />}>Candidatos</TabBtn>
            <TabBtn active={activeTab === "activity"} onClick={() => setActiveTab("activity")} icon={<FileText size={16} />}>Actividad</TabBtn>
          </div>

          {/* Content */}
          {activeTab === "overview" && (
            <div>
              <h4 className="text-md font-semibold mb-2">Resumen</h4>
              <p className="text-sm text-gray-700 mb-2">Título: <strong>{local.titulo}</strong></p>
              <p className="text-sm text-gray-700 mb-2">Empresa: <strong>{local.empresa}</strong></p>
              <p className="text-sm text-gray-700 mb-2">Ubicación: <strong>{local.ubicacion}</strong></p>
              <p className="text-sm text-gray-700 mb-2">Sueldo: <strong>{local.sueldoMin?.toLocaleString()} - {local.sueldoMax?.toLocaleString()} MXN</strong></p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded">
                  <div className="text-xs text-gray-500">Etapa</div>
                  <div className="mt-1 font-semibold">{local.etapa}</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="text-xs text-gray-500">Estado</div>
                  <div className="mt-1 font-semibold">{local.estado}</div>
                </div>
                <div className="p-4 border rounded">
                  <div className="text-xs text-gray-500">Candidatos</div>
                  <div className="mt-1 font-semibold">{local.candidatos?.length ?? 0}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div>
              <h4 className="text-md font-semibold mb-3">Pipeline (arrastra candidatos)</h4>
              <Kanban stages={stages} candidates={local.candidatos || []} onMove={(cid, stage) => moveCandidateTo(cid, stage)} />
            </div>
          )}

          {activeTab === "candidates" && (
            <div>
              <h4 className="text-md font-semibold mb-3">Candidatos</h4>
              <CandidatesTable
                candidates={local.candidatos || []}
                onDelete={deleteCandidate}
                onAdd={(c) => addCandidate(c)}
                onAssign={(cid, to) => moveCandidateTo(cid, to)}
                onOpenProfile={(cand) => onOpenCandidateProfile(cand)}
              />
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              <h4 className="text-md font-semibold mb-3">Actividad</h4>
              <div className="p-4 border rounded text-sm text-gray-600">Historial y logs del proceso (placeholder). Aquí se registra: creación, cambios de etapa, comentarios, envío de correos y entrevistas programadas.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------
   Tab Button
   ------------------------------ */
function TabBtn({ children, active, onClick, icon }) {
  return (
    <button className={`px-3 py-2 text-sm rounded ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`} onClick={onClick}>
      <span className="inline-flex items-center gap-2">{icon}{children}</span>
    </button>
  );
}

/* ------------------------------
   Kanban (drag & drop simple)
   ------------------------------ */
function Kanban({ stages = [], candidates = [], onMove }) {
  const [dragging, setDragging] = useState(null);

  const grouped = stages.reduce((acc, s) => ({ ...acc, [s]: candidates.filter((c) => c.estado === s) }), {});
  stages.forEach((s) => (grouped[s] = grouped[s] || []));

  const onDragStart = (e, candidate) => {
    setDragging(candidate);
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", JSON.stringify(candidate)); } catch {}
  };
  const onDrop = (e, stage) => {
    e.preventDefault();
    if (!dragging) return;
    onMove(dragging.id, stage);
    setDragging(null);
  };
  const onDragOver = (e) => e.preventDefault();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stages.map((s) => (
        <div key={s} className="bg-gray-50 rounded p-3 min-h-[150px]">
          <div className="font-semibold text-sm mb-2">{s} <span className="text-xs text-gray-400">({grouped[s]?.length ?? 0})</span></div>
          <div onDrop={(e) => onDrop(e, s)} onDragOver={onDragOver} className="space-y-2 min-h-[80px]">
            {(grouped[s] || []).map((c) => (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => onDragStart(e, c)}
                className="bg-white p-2 rounded shadow-sm cursor-move flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-sm">{c.nombre}</div>
                  <div className="text-xs text-gray-500">Score: {c.score ?? "-"}</div>
                </div>
                <div className="text-xs text-gray-400">{new Date(c.fecha).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------
   Candidates table
   ------------------------------ */
function CandidatesTable({ candidates = [], onDelete = () => {}, onAdd = () => {}, onAssign = () => {}, onOpenProfile = () => {} }) {
  const [q, setQ] = useState("");
  const filtered = candidates.filter((c) => `${c.nombre} ${c.estado}`.toLowerCase().includes(q.toLowerCase()));
  const [newName, setNewName] = useState("");
  const [newStage, setNewStage] = useState("New Candidates");

  const add = () => {
    if (!newName) return alert("Nombre requerido");
    const c = { id: Date.now(), nombre: newName, estado: newStage, score: 0, fecha: new Date().toISOString(), email: "" };
    onAdd(c);
    setNewName("");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input placeholder="Buscar candidato..." value={q} onChange={(e) => setQ(e.target.value)} className="px-3 py-2 border rounded w-48" />
        <div className="flex gap-2 items-center">
          <input placeholder="Nombre nuevo..." value={newName} onChange={(e) => setNewName(e.target.value)} className="px-3 py-2 border rounded" />
          <select value={newStage} onChange={(e) => setNewStage(e.target.value)} className="px-3 py-2 border rounded">
            <option>New Candidates</option>
            <option>Screening</option>
            <option>Entrevista 1</option>
            <option>Shortlist</option>
            <option>Offer</option>
          </select>
          <button onClick={add} className="px-3 py-2 bg-blue-600 text-white rounded">Agregar</button>
        </div>
      </div>

      <table className="w-full">
        <thead className="text-left text-xs text-gray-600">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Score</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 && <tr><td colSpan={5} className="p-4 text-sm text-gray-500">No hay candidatos.</td></tr>}
          {filtered.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.nombre}</td>
              <td className="p-2">{c.estado}</td>
              <td className="p-2">{c.score}</td>
              <td className="p-2">{new Date(c.fecha).toLocaleDateString()}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button onClick={() => onAssign(c.id, "Screening")} className="px-2 py-1 text-sm border rounded">Mover a Screening</button>
                  <button onClick={() => onOpenProfile(c)} className="px-2 py-1 text-sm bg-green-500 text-white rounded">Ver perfil</button>
                  <button onClick={() => onDelete(c.id)} className="px-2 py-1 text-sm bg-red-500 text-white rounded">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------
   Candidate Profile (vista completa, BLOQUE D)
   - Fondo semitransparente blanco + desenfoque (no negro)
   - Todo en español
   ------------------------------ */
function CandidateProfile({ candidate, onClose }) {
  if (!candidate) return null;

  const skills = candidate.skills || [
    { skill: "JavaScript", nivel: "Avanzado" },
    { skill: "React", nivel: "Intermedio" },
    { skill: "Next.js", nivel: "Intermedio" },
    { skill: "HTML/CSS", nivel: "Avanzado" },
  ];

  const entrevistas = candidate.entrevistas || [
    { id: 1, tipo: "Entrevista Inicial", fecha: "2025-01-22", estado: "Completada" },
    { id: 2, tipo: "Entrevista Técnica", fecha: "2025-01-28", estado: "Pendiente" },
  ];

  const documentos = candidate.documentos || [
    { id: 1, nombre: "Currículum.pdf", fecha: "2025-01-12" },
    { id: 2, nombre: "Carta de recomendación.pdf", fecha: "2025-01-15" },
  ];

  const notas = candidate.notas || [
    { id: 1, autor: "Reclutador Ana López", texto: "Candidato con alta capacidad de resolución.", fecha: "2025-01-14" },
  ];

  const actividad = candidate.actividad || [
    { id: 1, accion: `Candidato aplicado a vacante`, fecha: "2025-01-10" },
  ];

  const compatibilidad = candidate.compatibilidad ?? 82;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div onClick={onClose} className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      <div className="relative ml-auto w-full max-w-4xl bg-white shadow-2xl p-8 overflow-y-auto animate-slide-left">
        <style>{`@keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } } .animate-slide-left { animation: slideLeft .25s ease-out; }`}</style>

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {candidate.nombre}
            </h2>
            <p className="text-gray-600 text-sm">
              {candidate.puestoDeseado || "Puesto no especificado"}
            </p>
            <p className="text-gray-500 text-sm">
              Email: {candidate.email || "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-gray-600 hover:bg-gray-200 p-2 rounded-full">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Compatibilidad */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700">Compatibilidad con la vacante</p>
          <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${compatibilidad}%` }} />
          </div>
          <p className="text-right text-sm font-bold text-blue-700 mt-1">{compatibilidad}%</p>
        </div>

        {/* Secciones */}
        <div className="space-y-10">
          {/* CV */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Currículum (CV)</h3>
            <div className="border rounded-lg bg-gray-50 p-6 text-center text-gray-500">
              <p className="mb-3">Vista previa del CV</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Abrir CV</button>
            </div>
          </section>

          {/* Habilidades */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Habilidades</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((s, i) => (
                <div key={i} className="border p-4 rounded-lg bg-white">
                  <p className="text-gray-800 font-semibold">{s.skill}</p>
                  <p className="text-sm text-gray-600">{s.nivel}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Entrevistas */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Entrevistas</h3>
            <div className="space-y-3">
              {entrevistas.map((e) => (
                <div key={e.id} className="p-4 border rounded-lg shadow-sm bg-white">
                  <p className="font-semibold text-gray-800">{e.tipo}</p>
                  <p className="text-sm text-gray-600">{e.fecha}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded text-xs ${e.estado === "Completada" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {e.estado}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Documentos */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Documentos</h3>
            <div className="space-y-3">
              {documentos.map((d) => (
                <div key={d.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{d.nombre}</p>
                    <p className="text-xs text-gray-500">Fecha: {d.fecha}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Descargar</button>
                </div>
              ))}
            </div>
          </section>

          {/* Notas internas */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Notas internas</h3>
            <div className="space-y-3">
              {notas.map((n) => (
                <div key={n.id} className="border p-4 rounded-lg bg-yellow-50 shadow-sm">
                  <p className="text-gray-800">{n.texto}</p>
                  <p className="text-xs text-gray-600 mt-1">{n.autor} • {n.fecha}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Actividad */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Actividad</h3>
            <div className="space-y-3">
              {actividad.map((a) => (
                <div key={a.id} className="border p-4 rounded-lg bg-white shadow-sm">
                  <p className="text-gray-800">{a.accion}</p>
                  <p className="text-xs text-gray-500">{a.fecha}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
