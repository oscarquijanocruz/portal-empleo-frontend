// Filtros mejorados - VERSION CORREGIDA
"use client";
import Select from "@/app/components/ui/Select";
import Input from "@/app/components/ui/Input";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchFilters({
  onSearch,
  onFilterChange,
  clearFilters,
  searchTerm = "",
  filters = {},
}) {
  // Url params
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // filtros locales
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localFilters, setLocalFilters] = useState({
    modalidad: filters.modalidad || "",
    sueldo: filters.sueldo || "",
    tipoContrato: filters.tipoContrato || "",
    categoria: filters.categoria || "",
  });

  const modalidadOptions = [
    { label: "Remoto", value: "remoto" },
    { label: "Híbrido", value: "hibrido" },
    { label: "Presencial", value: "presencial" },
  ];

  const sueldoOptions = [
    { label: "Sin salario", value: "sin-salario" },
    { label: "$15,000+", value: "15000" },
    { label: "$25,000+", value: "25000" },
    { label: "$35,000+", value: "35000" },
    { label: "$45,000+", value: "45000" },
    { label: "Más de $50,000", value: "50000" },
  ];

  const tipoContratoOptions = [
    { label: "Tiempo completo", value: "Tiempo completo" },
    { label: "Medio tiempo", value: "Medio tiempo" },
    { label: "Por proyecto", value: "Por proyecto" },
    {
      label: "Prácticas profesionales / Becario",
      value: "Prácticas profesionales / Becario",
    },
    { label: "Fines de semana", value: "Fines de semana" },
  ];

  const categoriaOptions = [
    { label: "Tecnología / Sistemas / Programación", value: "tecnologia" },
    { label: "Ventas / Comercial", value: "ventas" },
    { label: "Marketing / Publicidad / Comunicación", value: "marketing" },
    { label: "Logística / Transporte / Almacén", value: "logistica" },
    { label: "Ingeniería", value: "ingenieria" },
    { label: "Manufactura / Producción / Operarios", value: "manufactura" },
    { label: "Salud / Medicina / Farmacia", value: "salud" },
    { label: "Educación / Docencia", value: "educacion" },
    { label: "Diseño / Arte / Multimedia", value: "diseno" },
    { label: "Legal / Jurídico", value: "legal" },
    { label: "Construcción / Arquitectura", value: "construccion" },
    { label: "Hotelería / Turismo / Restaurantes", value: "hoteleria" },
    { label: "Otros / Generales", value: "otros" },
  ];

  // Search params
  const handleSearch = (term) => {
    const value = event.target.value;
    setLocalSearchTerm(value);
    onSearch?.(value);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    console.log(params.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  // Sincronizar con props cuando cambien
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setLocalFilters({
      modalidad: filters.modalidad || "",
      sueldo: filters.sueldo || "",
      tipoContrato: filters.tipoContrato || "",
      categoria: filters.categoria || "",
    });
  }, [filters]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
    if (value) {
      newFilters[filterType] = value;
    } else {
      delete newFilters[filterType];
    }
    //replace(`${pathname}?${new URLSearchParams(newFilters).toString()}`);
  };

  const handleClearFilters = () => {
    setLocalSearchTerm("");
    setLocalFilters({
      modalidad: "",
      sueldo: "",
      tipoContrato: "",
      categoria: "",
    });
    clearFilters?.();
  };

  const hasActiveFilters =
    localSearchTerm || Object.values(localFilters).some((f) => f);

  return (
    <div className="p-4 rounded-md mb-4">
      {/* Barra de búsqueda */}
      <div
        className="flex items-center bg-white border rounded-md border-gray-200 px-4 py-3 mb-4 shadow-md 
        hover:border-gray-400 transition"
      >
        <Search size={22} className="text-gray-400" />
        <input
          type="text"
          placeholder="Busca tu trabajo ideal..."
          defaultValue={
            localSearchTerm || searchParams.get("query")?.toString()
          }
          className="flex-1 outline-none bg-transparent px-2"
          //value={localSearchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        {localSearchTerm && (
          <button
            onClick={() => {
              setLocalSearchTerm("");
              onSearch?.("");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <Select
          placeholder="Modalidad"
          options={modalidadOptions}
          value={localFilters.modalidad}
          onChange={(value) => handleFilterChange("modalidad", value)}
          size="md"
          className={"bg-sky-950 text-white border-sky-950 rounded-sm text-sm"}
          style={{ backgroundColor: "#2A3B57" }}
        />
        <Select
          placeholder="Sueldo"
          options={sueldoOptions}
          value={localFilters.sueldo}
          onChange={(value) => handleFilterChange("sueldo", value)}
          size="md"
          className={
            "bg-sky-950 text-white border-sky-950 border rounded-sm text-sm"
          }
          style={{ backgroundColor: "#2A3B57" }}
        />
        <Select
          placeholder="Tipo de contrato"
          options={tipoContratoOptions}
          value={localFilters.tipoContrato}
          onChange={(value) => handleFilterChange("tipoContrato", value)}
          size="md"
          className="bg-sky-950 text-white border-sky-950 border rounded-sm text-sm"
          style={{ backgroundColor: "#2A3B57" }}
        />
        <Select
          placeholder="Categoría"
          options={categoriaOptions}
          value={localFilters.categoria}
          onChange={(value) => handleFilterChange("categoria", value)}
          size="md"
          className="bg-blue-950 text-white border-sky-950 border rounded-sm text-sm"
          style={{ backgroundColor: "#2A3B57" }}
        />

        {/* Botón limpiar filtros */}
        {hasActiveFilters && (
          <div>
            <button
              onClick={handleClearFilters}
              className="text-blue-800 text-sm hover:underline flex items-center gap-1"
            >
              <X size={14} />
              Borrar filtros
            </button>
          </div>
        )}
      </div>

      {/* Mostrar filtros activos */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {localSearchTerm && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              "{localSearchTerm}"
            </span>
          )}
          {Object.entries(localFilters).map(
            ([key, value]) =>
              value && (
                <span
                  key={key}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  {key}: {value}
                </span>
              )
          )}
        </div>
      )}
    </div>
  );
}
