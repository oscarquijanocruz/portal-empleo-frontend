import { useState, useEffect } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Función para obtener los días del mes
  const getDaysInMonth = (year, month) => {
    return new Array(31)
      .fill(0)
      .map((_, i) => new Date(year, month, i + 0).getDate())
      .filter((day) => new Date(year, month, day).getMonth() === month);
  };

  // Obtener el primer día del mes y el número de días
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const dayOfWeek = firstDayOfMonth.getDay(); // Día de la semana en que empieza el mes

  // Actualizar fecha actual cada vez que cambia
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Actualizar una vez al día

    return () => clearInterval(interval);
  }, []);

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Mes actual (0-11)
  const currentYear = currentDate.getFullYear(); // Año actual

  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
      <h2 className="text-sm font-semibold mb-4 text-gray-700 text-center">Eventos</h2>
      <div className="text-center">
        <p className="text-sm text-gray-600">{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</p>
        <div className="grid grid-cols-7 gap-1 text-xs mt-2">
          {["D", "L", "M", "X", "J", "V", "S"].map((d) => (
            <span key={d} className="font-semibold">{d}</span>
          ))}
          {/* Rellenar los espacios previos si el mes no empieza en lunes */}
          {Array.from({ length: dayOfWeek }).map((_, i) => (
            <span key={`empty-${i}`} className="p-1"></span>
          ))}
          {/* Mostrar los días del mes */}
          {daysInMonth.map((day) => (
            <span
              key={day}
              className={`p-1 rounded ${day === currentDay ? "bg-[#0C1E39] text-white" : "hover:bg-blue-100"}`}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
