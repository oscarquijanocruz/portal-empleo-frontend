"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Trash,
  UserCheck,
  UserX,
  FileText,
  PlusCircle,
  X,
} from "lucide-react";

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Carolina Quintana Sánchez",
    tipo: "Candidata",
    estado: "En proceso",
    fecha: "2025-08-12",
    ubicacion: "Puebla",
    telefono: "5610461939",
    correo: "caroquintana.s@gmail.com",
    percepcion: "$8,364.00",
    edad: 18,
    fechaNacimiento: "2007-10-03",
    lugarNacimiento: "Puebla",
    distanciaDomicilio: "30 minutos",
    gastosMensual: "$3,000.00",
    gradoEstudios: "Preparatoria",
    ingles: "Intermedio",
    estadoCivil: "Soltera",
    hijos: 0,
    quienAporta: "Solo ella",
    domicilio: "PRIVADA 143 C Poniente No. 92 Valle del Paraíso",
    tiempoDomicilio: "2 meses",
    costoRenta: "$2,500.00",
    trabajaActualmente: "Trabaja",
    estadoSalud: "Bueno",
    tratamientoPsicologico: "No",
    enfermedadCronica: "No",
    vacunasCovid: 3,
    disponibilidad: "A partir del día 15 de diciembre",
    conocidosEmpresa: "No",
    empresas: [
      {
        nombre: "RESTAURANTE DELICIAS CABO SAN LUCAS",
        contacto: "Lic. Gonzalez",
        ubicacion: "Blvd del Niño Poblano",
        puesto: "Garrotera - Hostess - Ayudante General",
        tiempo: "Junio 2024 - actualmente",
        sueldo: "$8364 + propinas",
        motivoSalida: "Busca una mejor opción",
        referencia: "NO PEDIR REFERENCIAS, AÚN LABORA",
      },
      {
        nombre: "",
        ubicacion: "",
        puesto: "",
        tiempo: "",
        sueldo: "",
        motivoSalida: "",
        referencia: "",
      },
      {
        nombre: "",
        ubicacion: "",
        puesto: "",
        tiempo: "",
        sueldo: "",
        motivoSalida: "",
        referencia: "",
      },
    ],
    fortalezas: ["ATENCIÓN AL CLIENTE", "ATENTA", ""],
    debilidades: ["PERFECCIONISTA", "", ""],
    inconvenienteEmpresa: "NP",
    comentarios: "Podría ir a entrevista jueves o viernes",
    entrevistas: [],
  },
];
const scoreMap = {
  "Muy deficiente": 1,
  Deficiente: 2,
  Aceptable: 3,
  Bueno: 4,
  Excelente: 5,
};

const calculateAverage = (evaluacion) => {
  const values = Object.values(evaluacion)
    .map((v) => scoreMap[v])
    .filter(Boolean);

  if (values.length === 0) return 0;

  const total = values.reduce((a, b) => a + b, 0);
  return (total / values.length).toFixed(2);
};
const getFinalResult = (average) => {
  if (average >= 4) return { label: "Apto", color: "green" };
  if (average >= 3) return { label: "En observación", color: "yellow" };
  return { label: "No apto", color: "red" };
};

/* --------------------------
   Componente principal
   -------------------------- */
export default function UserManagementWithInterviews() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);

  // filtros & búsquedas
  const [q, setQ] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");

  // modales
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(null);

  // edición usuario (simple)
  const [editForm, setEditForm] = useState(null);

  // entrevista form (estructura completa)
  const emptyInterview = {
    evaluacion: {
      apariencia: "",
      expresion: "",
      educacion: "",
      interes: "",
      experiencia: "",
      estabilidad: "",
      actitud: "",
      potencial: "",
    },

    fecha: "", // ISO date
    elaboro: "",
    comentariosGenerales: "",

    // Información personal (capturada de usuario, pero editable)
    vacanteSolicitada: "",
    telefono: "",
    correo: "",
    edad: "",
    percepcion: "",
    lugarNacimiento: "",
    fechaNacimiento: "",
    experiencia: "",
    distanciaDomicilio: "",
    gastosMensual: "",
    gradoEstudios: "",
    ingles: "",

    estadoCivil: "",
    parejaOcupacion: "",
    numeroHijos: "",
    quienAporta: "",

    domicilio: "",
    referenciaDomicilio: "",
    conQuienesVive: "",
    tiempoEnDomicilio: "",
    estadoDomicilio: "", // Propia, Rentada, Prestada
    costoRenta: "",

    dedicadaActualmente: "", // Trabaja/Estudia/Negocio/SinEmpleo
    comentarios: "",

    estadoSalud: "", // Bueno/Regular/Malo
    tratamientoPsicologico: "",
    enfermedadCronica: "",
    noVacunasCovid: "",

    disponibilidad: "", // SI/NO/Fecha
    conocidosEmpresa: "",

    // Empresas (3)
    empresas: [
      {
        nombre: "",
        ubicacion: "",
        contacto: "",
        puesto: "",
        tiempoLaborado: "",
        sueldo: "",
        motivoSalida: "",
        referencia: "",
      },
      {
        nombre: "",
        ubicacion: "",
        contacto: "",
        puesto: "",
        tiempoLaborado: "",
        sueldo: "",
        motivoSalida: "",
        referencia: "",
      },
      {
        nombre: "",
        ubicacion: "",
        contacto: "",
        puesto: "",
        tiempoLaborado: "",
        sueldo: "",
        motivoSalida: "",
        referencia: "",
      },
    ],

    // Fortalezas / Debilidades
    fortalezas: ["", "", ""],
    debilidades: ["", "", ""],
    inconvenienteEmpresa: "",

    // Evaluación
    evaluacionGeneral: "",
    calificacion: "",
    estadoCandidato: "", // Aprobado / Rechazado / En proceso
  };

  const [interviewForm, setInterviewForm] = useState(emptyInterview);

  // pestañas del modal de entrevista
  const tabs = [
    "Información personal",
    "Vivienda & Salud",
    "Laboral (Empresas)",
    "Fortalezas / Debilidades",
    "Evaluación",
    "Comentarios",
    "Conclusión",
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // helpers
  const selectedUser = usuarios.find((u) => u.id === selectedUserId) ?? null;

  // filtro aplicado
  const filtered = usuarios.filter((u) => {
    const text = `${u.nombre} ${u.tipo} ${u.estado}`.toLowerCase();
    if (q && !text.includes(q.toLowerCase())) return false;
    if (estadoFilter && u.estado !== estadoFilter) return false;
    if (tipoFilter && u.tipo !== tipoFilter) return false;
    return true;
  });

  /* --------------------------
     Modales: abrir editar
     -------------------------- */
  const openEditModal = (user) => {
    setSelectedUserId(user.id);
    setEditForm({
      nombre: user.nombre,
      tipo: user.tipo,
      estado: user.estado,
      ubicacion: user.ubicacion,
      telefono: user.telefono ?? "",
      correo: user.correo ?? "",
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedUserId(null);
    setEditForm(null);
  };

  /* --------------------------
     Modales: abrir entrevista
     -------------------------- */
  const openInterviewModal = (user, prefillFromUser = true) => {
    setSelectedUserId(user.id);

    // prefill interview form with user data if requested
    const prefill = {
      ...emptyInterview,
    };

    if (prefillFromUser) {
      prefill.vacanteSolicitada =
        user.vacanteSolicitada ?? "ANFITRIONA - LOS MANTELES";
      prefill.telefono = user.telefono ?? user.telefono ?? "";
      prefill.correo = user.correo ?? user.correo ?? "";
      prefill.percepcion = user.percepcion ?? "";
      prefill.edad = user.edad ?? "";
      prefill.lugarNacimiento = user.lugarNacimiento ?? "";
      prefill.fechaNacimiento = user.fechaNacimiento ?? "";
      prefill.distanciaDomicilio = user.distanciaDomicilio ?? "";
      prefill.gastosMensual = user.gastosMensual ?? "";
      prefill.gradoEstudios = user.gradoEstudios ?? "";
      prefill.ingles = user.ingles ?? "";
      prefill.estadoCivil = user.estadoCivil ?? "";
      prefill.numeroHijos = user.hijos ?? "";
      prefill.quienAporta = user.quienAporta ?? "";
      prefill.domicilio = user.domicilio ?? "";
      prefill.tiempoEnDomicilio = user.tiempoDomicilio ?? "";
      prefill.costoRenta = user.costoRenta ?? "";
      prefill.tratamientoPsicologico = user.tratamientoPsicologico ?? "";
      prefill.enfermedadCronica = user.enfermedadCronica ?? "";
      prefill.noVacunasCovid = user.vacunasCovid ?? "";
      prefill.empresas = user.empresas
        ? JSON.parse(JSON.stringify(user.empresas))
        : [...emptyInterview.empresas];
      prefill.fortalezas = user.fortalezas
        ? [...user.fortalezas]
        : ["", "", ""];
      prefill.debilidades = user.debilidades
        ? [...user.debilidades]
        : ["", "", ""];
      prefill.inconvenienteEmpresa = user.inconvenienteEmpresa ?? "";
      prefill.comentariosGenerales = user.comentarios ?? "";
    }

    setInterviewForm(prefill);
    setActiveTab(tabs[0]);
    setIsInterviewOpen(true);
  };

  const closeInterviewModal = () => {
    setIsInterviewOpen(false);
    setSelectedUserId(null);
    setInterviewForm(emptyInterview);
  };

  /* --------------------------
     Guardar / actualizar usuario
     -------------------------- */
  const saveUserEdits = () => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? {
              ...u,
              nombre: editForm.nombre,
              tipo: editForm.tipo,
              estado: editForm.estado,
              ubicacion: editForm.ubicacion,
              telefono: editForm.telefono,
              correo: editForm.correo,
            }
          : u
      )
    );
    closeEditModal();
  };

  /* --------------------------
     Guardar entrevista (temporal en cliente)
     -------------------------- */
  const saveInterview = () => {
    if (!selectedUserId) return;
    const entrevistaGuardada = {
      ...interviewForm,
      id: Date.now(),
      fechaCaptura: new Date().toISOString(),
    };

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? {
              ...u,
              entrevistas: [...(u.entrevistas || []), entrevistaGuardada],
            }
          : u
      )
    );

    // opcional: actualizar campos principales del usuario desde el formulario
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? {
              ...u,
              telefono: interviewForm.telefono ?? u.telefono,
              correo: interviewForm.correo ?? u.correo,
              percepcion: interviewForm.percepcion ?? u.percepcion,
              domicilio: interviewForm.domicilio ?? u.domicilio,
            }
          : u
      )
    );

    // cerrar modal o dejar abierto para otra entrevista
    setIsInterviewOpen(false);
    setInterviewForm(emptyInterview);
  };
  //BaRRA
  const calculateProgress = () => {
    let total = 0;
    let completed = 0;

    // campos clave
    const fields = [
      interviewForm.vacanteSolicitada,
      interviewForm.telefono,
      interviewForm.correo,
      interviewForm.edad,
      interviewForm.percepcion,
      interviewForm.domicilio,
      interviewForm.estadoCivil,
      interviewForm.estadoSalud,
      interviewForm.disponibilidad,
      interviewForm.elaboro,
    ];

    total += fields.length;
    completed += fields.filter(Boolean).length;

    // evaluación (8 criterios)
    const evalValues = Object.values(interviewForm.evaluacion || {});
    total += evalValues.length;
    completed += evalValues.filter(Boolean).length;

    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        {/* ===================== RESUMEN GENERAL ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
          {/* Total de usuarios */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total de usuarios</p>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                Global
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-800">
              {usuarios.length}
            </p>
          </div>

          {/* En proceso */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-yellow-700">En proceso</p>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                Activos
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-yellow-800">
              {usuarios.filter((u) => u.estado === "En proceso").length}
            </p>
          </div>

          {/* Contratados */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-700">Contratados</p>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Éxito
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-green-800">
              {usuarios.filter((u) => u.estado === "Contratado").length}
            </p>
          </div>

          {/* Rechazados */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-700">Rechazados</p>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                Cerrados
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-red-800">
              {usuarios.filter((u) => u.estado === "Rechazado").length}
            </p>
          </div>
        </div>

        {/* HEADER */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Gestión de Usuarios
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Administración y registro de entrevistas · Expediente del
              candidato
            </p>
          </div>
        </header>

        {/* FILTROS */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o correo…"
            className="px-4 py-2 rounded-lg border border-gray-300 w-72 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="En proceso">En proceso</option>
            <option value="Contratado">Contratado</option>
            <option value="Rechazado">Rechazado</option>
          </select>

          <select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los tipos</option>
            <option value="Candidata">Candidata</option>
            <option value="Empleado">Empleado</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="p-4 text-left">Nombre</th>
                <th className="p-4 text-left">Tipo</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Teléfono</th>
                <th className="p-4 text-center">Entrevistas</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{u.nombre}</td>

                  <td className="p-4 text-gray-600">{u.tipo}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      u.estado === "Contratado"
                        ? "bg-green-100 text-green-700"
                        : u.estado === "En proceso"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                    >
                      {u.estado}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">{u.telefono ?? "-"}</td>

                  <td className="p-4 text-center font-medium">
                    {(u.entrevistas || []).length}
                  </td>

                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        title="Editar"
                        onClick={() => openEditModal(u)}
                        className="p-2 rounded-lg border hover:bg-blue-50 text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        title="Entrevistas"
                        onClick={() => openInterviewModal(u)}
                        className="p-2 rounded-lg border hover:bg-purple-50 text-purple-600"
                      >
                        <FileText size={16} />
                      </button>

                      <button
                        title="Eliminar"
                        onClick={() =>
                          setUsuarios((prev) =>
                            prev.filter((x) => x.id !== u.id)
                          )
                        }
                        className="p-2 rounded-lg border hover:bg-red-50 text-red-600"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit modal (pequeño) */}
        {isEditOpen && selectedUser && editForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeEditModal}
            />

            {/* Modal */}
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Editar candidato
                  </h2>
                  <p className="text-sm text-gray-500">{selectedUser.nombre}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openInterviewModal(selectedUser)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm
                       bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <FileText size={14} />
                    Entrevistas
                  </button>

                  <button
                    onClick={closeEditModal}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      value={editForm.nombre}
                      onChange={(e) =>
                        setEditForm({ ...editForm, nombre: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Tipo de usuario */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de perfil
                    </label>

                    <select
                      value={editForm.tipo}
                      onChange={(e) =>
                        setEditForm({ ...editForm, tipo: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Candidata">Candidata</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Admin">Administrador</option>
                    </select>
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado del proceso
                    </label>

                    <select
                      value={editForm.estado}
                      onChange={(e) =>
                        setEditForm({ ...editForm, estado: e.target.value })
                      }
                      className={`w-full px-3 py-2 border rounded-lg text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${
                  editForm.estado === "Contratado"
                    ? "bg-green-50"
                    : editForm.estado === "En proceso"
                    ? "bg-yellow-50"
                    : "bg-red-50"
                }`}
                    >
                      <option value="En proceso">En proceso</option>
                      <option value="Contratado">Contratado</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>

                  {/* Ubicación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      value={editForm.ubicacion}
                      onChange={(e) =>
                        setEditForm({ ...editForm, ubicacion: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      value={editForm.telefono}
                      onChange={(e) =>
                        setEditForm({ ...editForm, telefono: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={editForm.correo}
                      onChange={(e) =>
                        setEditForm({ ...editForm, correo: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
                <button
                  onClick={closeEditModal}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
                >
                  Cancelar
                </button>

                <button
                  onClick={saveUserEdits}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Interview Fullscreen Modal */}
        {isInterviewOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex">
            {/* backdrop soft */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={closeInterviewModal}
            ></div>

            {/* drawer / modal */}
            <div className="relative ml-auto w-full md:w-[95%] lg:w-[90%] bg-white overflow-hidden max-h-screen rounded-l-3xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              {/* header */}
              <div
                className="sticky top-0 z-10 flex items-start justify-between gap-4 px-8 py-6
                      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {selectedUser.nombre}
                  </h3>
                  <div className="text-sm text-slate-300 mt-1">
                    {selectedUser.tipo} • {selectedUser.ubicacion}
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div
                    className="text-xs font-medium text-slate-200
                          bg-white/10 backdrop-blur px-4 py-2
                          rounded-full border border-white/20"
                  >
                    {interviewForm.fecha || new Date().toLocaleDateString()}
                  </div>

                  <button
                    onClick={closeInterviewModal}
                    className="p-2.5 rounded-full
                       bg-white/10 border border-white/20
                       text-white hover:bg-red-500/80
                       hover:border-red-400
                       transition-all duration-200"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* body */}
              <div className="p-8 overflow-y-auto max-h-[80vh] bg-slate-50">
                {/* tabs */}
                <div className="flex gap-3 mb-8">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all
                ${
                  activeTab === t
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.03]"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* tab content */}
                <div className="space-y-4">
                  {/* Barra de progreso */}
                  <div className="bg-white border-b">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-400">
                        Progreso de la entrevista
                      </span>
                      <span className="text-sm font-semibold text-blue-600">
                        {calculateProgress()}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500
        ${
          calculateProgress() < 40
            ? "bg-red-500"
            : calculateProgress() < 70
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                  {/* 1: Información personal */}
                  {activeTab === "Información personal" && (
                    <section>
                      <h4 className="font-semibold mb-2">
                        Información personal
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-sm text-gray-600">
                            Vacante solicitada
                          </label>
                          <input
                            value={interviewForm.vacanteSolicitada}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                vacanteSolicitada: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Teléfono
                          </label>
                          <input
                            value={interviewForm.telefono}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                telefono: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Correo
                          </label>
                          <input
                            value={interviewForm.correo}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                correo: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Nombre
                          </label>
                          <input
                            value={selectedUser.nombre}
                            disabled
                            className="w-full px-3 py-2 border rounded bg-gray-50"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">Edad</label>
                          <input
                            value={interviewForm.edad}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                edad: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Percepción
                          </label>
                          <input
                            value={interviewForm.percepcion}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                percepcion: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Lugar de nacimiento
                          </label>
                          <input
                            value={interviewForm.lugarNacimiento}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                lugarNacimiento: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Fecha de nacimiento
                          </label>
                          <input
                            type="date"
                            value={interviewForm.fechaNacimiento}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                fechaNacimiento: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Experiencia
                          </label>
                          <input
                            value={interviewForm.experiencia}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                experiencia: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Distancia domicilio
                          </label>
                          <input
                            value={interviewForm.distanciaDomicilio}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                distanciaDomicilio: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Gastos mensuales
                          </label>
                          <input
                            value={interviewForm.gastosMensual}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                gastosMensual: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Grado de estudios
                          </label>
                          <input
                            value={interviewForm.gradoEstudios}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                gradoEstudios: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Nivel de inglés
                          </label>
                          <input
                            value={interviewForm.ingles}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                ingles: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* 2: Vivienda & Salud */}
                  {activeTab === "Vivienda & Salud" && (
                    <section>
                      <h4 className="font-semibold mb-2">Vivienda y salud</h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-sm text-gray-600">
                            Estado civil
                          </label>
                          <input
                            value={interviewForm.estadoCivil}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                estadoCivil: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            ¿A qué se dedica pareja o familia?
                          </label>
                          <input
                            value={interviewForm.parejaOcupacion}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                parejaOcupacion: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            No. de hijos
                          </label>
                          <input
                            type="number"
                            value={interviewForm.numeroHijos}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                numeroHijos: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Quien aporta económicamente
                          </label>
                          <input
                            value={interviewForm.quienAporta}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                quienAporta: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div className="md:col-span-3">
                          <label className="text-sm text-gray-600">
                            Domicilio
                          </label>
                          <input
                            value={interviewForm.domicilio}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                domicilio: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Referencia domicilio
                          </label>
                          <input
                            value={interviewForm.referenciaDomicilio}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                referenciaDomicilio: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            ¿Con quiénes vive?
                          </label>
                          <input
                            value={interviewForm.conQuienesVive}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                conQuienesVive: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Tiempo en domicilio
                          </label>
                          <input
                            value={interviewForm.tiempoEnDomicilio}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                tiempoEnDomicilio: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Estado de domicilio (Propia/Rentada/Prestada)
                          </label>
                          <input
                            value={interviewForm.estadoDomicilio}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                estadoDomicilio: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Costo de renta / comentarios
                          </label>
                          <input
                            value={interviewForm.costoRenta}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                costoRenta: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            ¿A qué se dedica actualmente?
                          </label>
                          <input
                            value={interviewForm.dedicadaActualmente}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                dedicadaActualmente: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Estado de salud
                          </label>
                          <input
                            value={interviewForm.estadoSalud}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                estadoSalud: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Tratamiento psicológico
                          </label>
                          <input
                            value={interviewForm.tratamientoPsicologico}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                tratamientoPsicologico: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Enfermedad crónica
                          </label>
                          <input
                            value={interviewForm.enfermedadCronica}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                enfermedadCronica: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            No. de vacunas COVID
                          </label>
                          <input
                            value={interviewForm.noVacunasCovid}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                noVacunasCovid: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Disponibilidad inmediata / especificar
                          </label>
                          <input
                            value={interviewForm.disponibilidad}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                disponibilidad: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Conocidos en la empresa
                          </label>
                          <input
                            value={interviewForm.conocidosEmpresa}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                conocidosEmpresa: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* 3: Laboral (Empresas) */}
                  {activeTab === "Laboral (Empresas)" && (
                    <section>
                      <h4 className="font-semibold mb-2">
                        Información laboral (Empresas 1 - 3)
                      </h4>

                      <div className="space-y-4">
                        {interviewForm.empresas.map((emp, idx) => (
                          <div key={idx} className="border rounded p-3">
                            <h5 className="font-medium mb-2">
                              Empresa {idx + 1}
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <label className="text-sm text-gray-600">
                                  Nombre
                                </label>
                                <input
                                  value={emp.nombre}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].nombre = e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="text-sm text-gray-600">
                                  Ubicación
                                </label>
                                <input
                                  value={emp.ubicacion}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].ubicacion = e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Contacto / Referencia
                                </label>
                                <input
                                  value={emp.contacto}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].contacto = e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Puesto
                                </label>
                                <input
                                  value={emp.puesto}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].puesto = e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Tiempo laborado
                                </label>
                                <input
                                  value={emp.tiempoLaborado}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].tiempoLaborado =
                                      e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>

                              <div>
                                <label className="text-sm text-gray-600">
                                  Sueldo
                                </label>
                                <input
                                  value={emp.sueldo}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].sueldo = e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="text-sm text-gray-600">
                                  Motivo de salida
                                </label>
                                <input
                                  value={emp.motivoSalida}
                                  onChange={(e) => {
                                    const empresas = [
                                      ...interviewForm.empresas,
                                    ];
                                    empresas[idx].motivoSalida = e.target.value;
                                    setInterviewForm({
                                      ...interviewForm,
                                      empresas,
                                    });
                                  }}
                                  className="w-full px-3 py-2 border rounded"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  {/* ================== PESTAÑA: EVALUACIÓN ================== */}
                  {activeTab === "Evaluación" && (
                    <>
                      <section className="space-y-6">
                        <div className="border-b pb-3">
                          <h4 className="text-xl font-semibold text-gray-800">
                            Evaluación del Candidato
                          </h4>
                          <p className="text-sm text-gray-500">
                            Calificación cualitativa basada en la entrevista
                            presencial
                          </p>
                        </div>

                        {[
                          { key: "apariencia", label: "Apariencia personal" },
                          { key: "expresion", label: "Forma de expresión" },
                          { key: "educacion", label: "Educación" },
                          { key: "interes", label: "Interés ocupacional" },
                          { key: "experiencia", label: "Experiencia" },
                          { key: "estabilidad", label: "Estabilidad laboral" },
                          { key: "actitud", label: "Actitud en entrevista" },
                          { key: "potencial", label: "Potencial" },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="bg-white border rounded-xl p-5 shadow-sm"
                          >
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-800">
                                {item.label}
                              </h5>
                              <p className="text-xs text-gray-500">
                                Seleccione el nivel que mejor describa al
                                candidato
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                              {[
                                { value: "Muy deficiente" },
                                { value: "Deficiente" },
                                { value: "Aceptable" },
                                { value: "Bueno" },
                                { value: "Excelente" },
                              ].map((opt) => (
                                <label
                                  key={opt.value}
                                  className={`cursor-pointer border rounded-lg px-3 py-2 text-sm text-center transition-all
                  ${
                    interviewForm.evaluacion[item.key] === opt.value
                      ? "border-blue-600 bg-blue-50 font-medium"
                      : "hover:border-gray-400 hover:bg-gray-50"
                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={item.key}
                                    value={opt.value}
                                    checked={
                                      interviewForm.evaluacion[item.key] ===
                                      opt.value
                                    }
                                    onChange={(e) =>
                                      setInterviewForm({
                                        ...interviewForm,
                                        evaluacion: {
                                          ...interviewForm.evaluacion,
                                          [item.key]: e.target.value,
                                        },
                                      })
                                    }
                                    className="hidden"
                                  />
                                  {opt.value}
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* Observaciones */}
                        <div className="bg-gray-50 border rounded-xl p-5">
                          <label className="block font-medium text-gray-700 mb-2">
                            Observaciones del evaluador
                          </label>
                          <textarea
                            value={interviewForm.evaluacionGeneral}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                evaluacionGeneral: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border rounded-lg min-h-[120px] focus:ring-1 focus:ring-blue-500"
                            placeholder="Comentarios generales sobre la evaluación del candidato..."
                          />
                        </div>
                      </section>

                      {/* ================== RESUMEN / ANÁLISIS ================== */}
                      {(() => {
                        const average = calculateAverage(
                          interviewForm.evaluacion
                        );
                        const result = getFinalResult(average);

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            {/* Promedio */}
                            <div className="border rounded-xl p-4 bg-white shadow-sm">
                              <p className="text-sm text-gray-500">
                                Promedio final
                              </p>
                              <p className="text-3xl font-bold text-gray-800">
                                {average}
                              </p>
                            </div>

                            {/* Resultado */}
                            <div className="border rounded-xl p-4 bg-white shadow-sm">
                              <p className="text-sm text-gray-500">
                                Resultado de la entrevista
                              </p>
                              <span
                                className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium
                ${
                  result.color === "green"
                    ? "bg-green-100 text-green-700"
                    : result.color === "yellow"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
                              >
                                {result.label}
                              </span>
                            </div>

                            {/* Interpretación */}
                            <div className="border rounded-xl p-4 bg-gray-50">
                              <p className="text-sm text-gray-500">
                                Interpretación
                              </p>
                              <p className="text-sm text-gray-700 mt-1">
                                {result.label === "Apto" &&
                                  "El candidato cumple con los criterios para continuar en el proceso."}
                                {result.label === "En observación" &&
                                  "El candidato requiere seguimiento o una segunda evaluación."}
                                {result.label === "No apto" &&
                                  "El candidato no cumple con el perfil requerido para la vacante."}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  )}

                  {/* ================== PESTAÑA: FORTALEZAS / DEBILIDADES ================== */}
                  {activeTab === "Fortalezas / Debilidades" && (
                    <section>
                      <h4 className="font-semibold mb-2">
                        Fortalezas y Debilidades
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {interviewForm.fortalezas.map((f, i) => (
                          <div key={`f-${i}`}>
                            <label className="text-sm text-gray-600">
                              Fortaleza {i + 1}
                            </label>
                            <input
                              value={f}
                              onChange={(e) => {
                                const arr = [...interviewForm.fortalezas];
                                arr[i] = e.target.value;
                                setInterviewForm({
                                  ...interviewForm,
                                  fortalezas: arr,
                                });
                              }}
                              className="w-full px-3 py-2 border rounded"
                            />
                          </div>
                        ))}

                        {interviewForm.debilidades.map((d, i) => (
                          <div key={`d-${i}`}>
                            <label className="text-sm text-gray-600">
                              Debilidad {i + 1}
                            </label>
                            <input
                              value={d}
                              onChange={(e) => {
                                const arr = [...interviewForm.debilidades];
                                arr[i] = e.target.value;
                                setInterviewForm({
                                  ...interviewForm,
                                  debilidades: arr,
                                });
                              }}
                              className="w-full px-3 py-2 border rounded"
                            />
                          </div>
                        ))}

                        <div className="md:col-span-3">
                          <label className="text-sm text-gray-600">
                            Inconveniente con alguna empresa
                          </label>
                          <input
                            value={interviewForm.inconvenienteEmpresa}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                inconvenienteEmpresa: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* 5: Comentarios */}
                  {activeTab === "Comentarios" && (
                    <section>
                      <h4 className="font-semibold mb-2">Comentarios</h4>
                      <textarea
                        value={interviewForm.comentariosGenerales}
                        onChange={(e) =>
                          setInterviewForm({
                            ...interviewForm,
                            comentariosGenerales: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded min-h-[120px]"
                      />
                    </section>
                  )}

                  {/* 6: Conclusión */}
                  {activeTab === "Conclusión" && (
                    <section>
                      <h4 className="font-semibold mb-2">
                        Conclusión de la entrevista
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm text-gray-600">
                            Evaluación general
                          </label>
                          <textarea
                            value={interviewForm.evaluacionGeneral}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                evaluacionGeneral: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded min-h-[100px]"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Calificación (0-100)
                          </label>
                          <input
                            type="number"
                            value={interviewForm.calificacion}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                calificacion: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600">
                            Estado del candidato
                          </label>
                          <select
                            value={interviewForm.estadoCandidato}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                estadoCandidato: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          >
                            <option value="">Seleccionar</option>
                            <option value="Aprobado">Aprobado</option>
                            <option value="Rechazado">Rechazado</option>
                            <option value="En proceso">En proceso</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm text-gray-600">
                            Elabora
                          </label>
                          <input
                            value={interviewForm.elaboro}
                            onChange={(e) =>
                              setInterviewForm({
                                ...interviewForm,
                                elaboro: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded"
                          />
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                {/* historial de entrevistas registradas (al lado o abajo) */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">
                    Historial de entrevistas
                  </h4>
                  {(selectedUser.entrevistas || []).length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay entrevistas registradas.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {(selectedUser.entrevistas || []).map((iv) => (
                        <div
                          key={iv.id}
                          className="border rounded p-3 bg-gray-50"
                        >
                          <div className="flex justify-between">
                            <div>
                              <strong>{iv.tipo || "Entrevista"}</strong> —{" "}
                              {iv.fecha ||
                                new Date(iv.fechaCaptura).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              Calif: {iv.calificacion ?? "-"}
                            </div>
                          </div>
                          <div className="text-sm text-gray-700 mt-2">
                            {iv.evaluacionGeneral ??
                              iv.comentariosGenerales ??
                              "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* acciones */}
                <div className="mt-8 flex flex-wrap gap-3 border-t pt-6">
                  <button
                    onClick={() => {
                      setInterviewForm(emptyInterview);
                      setActiveTab(tabs[0]);
                    }}
                    className="px-5 py-2.5 rounded-lg text-sm font-medium
               border border-slate-300 text-slate-600
               hover:bg-slate-100 hover:border-slate-400
               transition-all"
                  >
                    Limpiar
                  </button>

                  <button
                    onClick={saveInterview}
                    className="px-6 py-2.5 rounded-lg text-sm font-semibold
               bg-blue-600 text-white
               hover:bg-blue-700
               shadow-md shadow-blue-600/30
               transition-all"
                  >
                    Guardar entrevista
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
