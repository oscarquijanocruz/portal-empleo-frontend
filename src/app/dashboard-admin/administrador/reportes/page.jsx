"use client";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Download, FileText, Filter, Edit, Trash, BarChart3, Plus } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Datos base para distintos tipos de reportes
const dataVacantesBase = [
  { id: 1, name: "Enero", vacantes: 40, ingresos: 300, description: "Alta actividad" },
  { id: 2, name: "Febrero", vacantes: 10, ingresos: 350, description: "Baja demanda" },
  { id: 3, name: "Marzo", vacantes: 60, ingresos: 1000, description: "Repunte significativo" },
  { id: 4, name: "Abril", vacantes: 70, ingresos: 450, description: "Estable" },
  { id: 5, name: "Mayo", vacantes: 10, ingresos: 500, description: "Descenso temporal" },
];

const dataIngresosBase = [
  { id: 1, name: "Enero", ingresos: 1000, gastos: 700 },
  { id: 2, name: "Febrero", ingresos: 1200, gastos: 800 },
  { id: 3, name: "Marzo", ingresos: 900, gastos: 950 },
  { id: 4, name: "Abril", ingresos: 1500, gastos: 1100 },
  { id: 5, name: "Mayo", ingresos: 1300, gastos: 1000 },
];

const dataDesempenoBase = [
  { id: 1, name: "Enero", eficiencia: 70, productividad: 60 },
  { id: 2, name: "Febrero", eficiencia: 80, productividad: 65 },
  { id: 3, name: "Marzo", eficiencia: 75, productividad: 70 },
  { id: 4, name: "Abril", eficiencia: 85, productividad: 90 },
  { id: 5, name: "Mayo", eficiencia: 90, productividad: 95 },
];

export default function ReportSection() {
  const [selectedType, setSelectedType] = useState("vacantes");
  const [filter, setFilter] = useState("");
  const [reportData, setReportData] = useState(dataVacantesBase);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newReport, setNewReport] = useState({ name: "", vacantes: "", ingresos: "", description: "" });

  // Cambiar el tipo de reporte
  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (type === "vacantes") setReportData(dataVacantesBase);
    if (type === "ingresos") setReportData(dataIngresosBase);
    if (type === "desempeno") setReportData(dataDesempenoBase);
  };

  // Filtrar datos
  const filteredReports = reportData.filter((report) =>
    report.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Exportar PDF adaptado al tipo
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text(`Reporte de ${selectedType.toUpperCase()}`, 10, 10);

    const headers =
      selectedType === "vacantes"
        ? [["Mes", "Vacantes", "Ingresos", "Descripción"]]
        : selectedType === "ingresos"
        ? [["Mes", "Ingresos", "Gastos"]]
        : [["Mes", "Eficiencia", "Productividad"]];

    const body = filteredReports.map((r) =>
      selectedType === "vacantes"
        ? [r.name, r.vacantes, r.ingresos, r.description]
        : selectedType === "ingresos"
        ? [r.name, r.ingresos, r.gastos]
        : [r.name, r.eficiencia, r.productividad]
    );

    autoTable(doc, { head: headers, body });
    doc.save(`reporte-${selectedType}.pdf`);
  };

  const handleEdit = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setReportData(reportData.filter((r) => r.id !== id));
  };

  const handleSaveEdit = () => {
    setReportData(
      reportData.map((r) => (r.id === selectedReport.id ? selectedReport : r))
    );
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    if (!newReport.name) return alert("Completa al menos el nombre del mes");
    const newId = reportData.length + 1;
    setReportData([...reportData, { id: newId, ...newReport }]);
    setNewReport({ name: "", vacantes: "", ingresos: "", description: "" });
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <BarChart3 className="text-blue-500" /> Panel de Reportes
      </h2>

      {/* Selector de tipo */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex items-center gap-2">
          <label className="font-medium text-sm text-gray-600">Tipo:</label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value="vacantes">Vacantes</option>
            <option value="ingresos">Ingresos</option>
            <option value="desempeno">Desempeño</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} />
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
          className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
        >
          <Download size={16} className="mr-2" />
          Exportar PDF
        </button>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-all"
        >
          <Plus size={16} className="mr-2" /> Agregar
        </button>
      </div>

      {/* Gráfica dinámica */}
      <div className="h-72 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg shadow-inner p-4 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredReports}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedType === "vacantes" && (
              <>
                <Line type="monotone" dataKey="vacantes" stroke="#2563eb" strokeWidth={3} />
                <Line type="monotone" dataKey="ingresos" stroke="#16a34a" strokeWidth={3} />
              </>
            )}
            {selectedType === "ingresos" && (
              <>
                <Line type="monotone" dataKey="ingresos" stroke="#0ea5e9" strokeWidth={3} />
                <Line type="monotone" dataKey="gastos" stroke="#ef4444" strokeWidth={3} />
              </>
            )}
            {selectedType === "desempeno" && (
              <>
                <Line type="monotone" dataKey="eficiencia" stroke="#9333ea" strokeWidth={3} />
                <Line type="monotone" dataKey="productividad" stroke="#f59e0b" strokeWidth={3} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="p-2 text-left">Mes</th>
            {selectedType === "vacantes" && (
              <>
                <th className="p-2 text-left">Vacantes</th>
                <th className="p-2 text-left">Ingresos</th>
                <th className="p-2 text-left">Descripción</th>
              </>
            )}
            {selectedType === "ingresos" && (
              <>
                <th className="p-2 text-left">Ingresos</th>
                <th className="p-2 text-left">Gastos</th>
              </>
            )}
            {selectedType === "desempeno" && (
              <>
                <th className="p-2 text-left">Eficiencia</th>
                <th className="p-2 text-left">Productividad</th>
              </>
            )}
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 text-sm">
              <td className="p-2">{r.name}</td>
              {selectedType === "vacantes" && (
                <>
                  <td className="p-2">{r.vacantes}</td>
                  <td className="p-2">${r.ingresos}</td>
                  <td className="p-2">{r.description}</td>
                </>
              )}
              {selectedType === "ingresos" && (
                <>
                  <td className="p-2">${r.ingresos}</td>
                  <td className="p-2">${r.gastos}</td>
                </>
              )}
              {selectedType === "desempeno" && (
                <>
                  <td className="p-2">{r.eficiencia}%</td>
                  <td className="p-2">{r.productividad}%</td>
                </>
              )}
              <td className="p-2 flex gap-3">
                <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Editar Reporte</h3>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={selectedReport.name}
                onChange={(e) =>
                  setSelectedReport({ ...selectedReport, name: e.target.value })
                }
              />
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de agregar */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Reporte</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Mes"
                className="w-full px-3 py-2 border rounded"
                value={newReport.name}
                onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Valor principal"
                className="w-full px-3 py-2 border rounded"
                value={newReport.vacantes || newReport.ingresos || ""}
                onChange={(e) =>
                  setNewReport({
                    ...newReport,
                    vacantes: Number(e.target.value),
                    ingresos: Number(e.target.value),
                  })
                }
              />
              <button
                onClick={handleAddNew}
                className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-green-700"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
