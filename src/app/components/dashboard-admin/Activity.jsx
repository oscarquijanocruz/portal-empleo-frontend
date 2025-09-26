import { Bell } from "lucide-react";

export default function Activity() {
  const activities = [
    { id: 1, title: "Aprueba esta vacante", detail: "@Empresa subió una vacante" },
    { id: 2, title: "Se postularon a \"Vacante\"", detail: "@Candidato se postuló a tu vacante" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 col-span-1">
      <h2 className="text-sm font-semibold mb-4 text-gray-700 text-center">Actividad</h2>
      <ul className="space-y-3 text-sm">
        {activities.map((a) => (
          <li
            key={a.id}
            className="flex items-start gap-3 border-b border-gray-200 pb-3 last:border-0"
          >
            <Bell className="text-gray-600 w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#0066CC] font-medium cursor-pointer hover:underline">
                {a.title}
              </p>
              <p className="text-xs text-gray-500">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
