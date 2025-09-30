"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, FileText, Filter, Search, Edit, Trash } from "lucide-react"; // Iconos de lucide-react
import { jsPDF } from "jspdf"; 
import "jspdf-autotable"; 

// Datos simulados de reportes
const initialReportData = [
  { id: 1, name: "Enero", vacantesPublicadas: 40, ingresos: 300, description: "Reporte de enero" },
  { id: 2, name: "Febrero", vacantesPublicadas: 10, ingresos: 350, description: "Reporte de febrero" },
  { id: 3, name: "Marzo", vacantesPublicadas: 60, ingresos: 1000, description: "Reporte de marzo" },
  { id: 4, name: "Abril", vacantesPublicadas: 70, ingresos: 450, description: "Reporte de abril" },
  { id: 5, name: "Mayo", vacantesPublicadas: 10, ingresos: 500, description: "Reporte de mayo" },
];

export default function ReportSection() {
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState(initialReportData); // Datos de reportes
  const [filter, setFilter] = useState("");

  // Función para exportar el reporte a PDF
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Vacantes Publicadas", 10, 10);

 
    doc.autoTable({
      head: [["Mes", "Vacantes Publicadas", "Ingresos", "Descripción"]],
      body: reportData.map((report) => [
        report.name,
        report.vacantesPublicadas,
        report.ingresos,
        report.description,
      ]),
    });

    doc.save("reporte.pdf");
  };

  // Función para abrir el modal de edición
  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // Función para editar el reporte
  const handleEdit = () => {
    const updatedData = reportData.map((report) =>
      report.id === selectedReport.id ? selectedReport : report
    );
    setReportData(updatedData);
    closeModal();
  };

  // Función para eliminar el reporte
  const handleDelete = (reportId) => {
    const filteredReports = reportData.filter((report) => report.id !== reportId);
    setReportData(filteredReports);
  };

  // Función para agregar un nuevo reporte
  const handleAddReport = () => {
    const newReport = {
      id: reportData.length + 1,
      name: "Nuevo Reporte",
      vacantesPublicadas: 0,
      ingresos: 0,
      description: "Descripción del nuevo reporte",
    };
    setReportData([...reportData, newReport]);
    openModal(newReport); 
  };

  // Filtrar reportes
  const filteredReports = reportData.filter((report) =>
    report.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Opciones de meses para el selector
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Título de la sección */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Gestión de Reportes</h2>

      {/* Gráfico de vacantes publicadas por mes */}
      <div className="mb-6">
        <div className="mt-4 h-60 shadow-lg p-4 rounded-lg bg-gradient-to-r from-blue-100 to-orange-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredReports}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" fontSize={12} stroke="#9CA3AF" />
              <YAxis fontSize={12} stroke="#9cafa6ff" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="vacantesPublicadas"
                stroke="#0066CC"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#2f9267ff"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex space-x-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} />
          <input
            type="text"
            placeholder="Filtrar por mes"
            className="px-3 py-2 border rounded-lg text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button
          onClick={handleExport}
          className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
        >
          <Download size={16} className="mr-2" />
          Exportar Reporte
        </button>
      </div>

      {/* Tabla de reportes */}
      <table className="min-w-full bg-white border border-gray-200" id="reportTable">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Mes</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Vacantes Publicadas</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Ingresos</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Descripción</th>
            <th className="p-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar reportes filtrados */}
          {filteredReports.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="p-2 text-sm text-gray-700">{report.name}</td>
              <td className="p-2 text-sm text-gray-700">{report.vacantesPublicadas}</td>
              <td className="p-2 text-sm text-gray-700">${report.ingresos}</td>
              <td className="p-2 text-sm text-gray-700">{report.description}</td>
              <td className="p-2 text-sm">
                <button
                  onClick={() => openModal(report)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <Edit size={16} />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash size={16} />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Editar Reporte</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Mes</label>
                <select
                  value={selectedReport.name}
                  onChange={(e) =>
                    setSelectedReport({ ...selectedReport, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600">Vacantes Publicadas</label>
                <input
                  type="number"
                  value={selectedReport.vacantesPublicadas}
                  onChange={(e) =>
                    setSelectedReport({ ...selectedReport, vacantesPublicadas: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Ingresos</label>
                <input
                  type="number"
                  value={selectedReport.ingresos}
                  onChange={(e) =>
                    setSelectedReport({ ...selectedReport, ingresos: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Descripción</label>
                <input
                  type="text"
                  value={selectedReport.description}
                  onChange={(e) =>
                    setSelectedReport({ ...selectedReport, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-md text-sm">Cancelar</button>
                <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón para agregar reporte */}
      <div className="mt-8 text-center">
        <button
          onClick={handleAddReport}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg flex items-center justify-center mx-auto hover:bg-green-700 transition-all"
        >
          <FileText size={20} className="mr-2" />
          Agregar Reporte
        </button>
      </div>
    </div>
  );
}
