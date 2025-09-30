export default function ActivityFeed() {
  const activities = [
    { id: 1, text: "Aprueba esta vacante", sub: "@Empresa subió una vacante" },
    { id: 2, text: "Se postularon a 'Vacante'", sub: "@Candidato se postuló a tu vacante" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 col-span-1">
      <h2 className="text-sm font-semibold mb-4">Actividad</h2>
      <ul className="space-y-3 text-sm">
        {activities.map((a) => (
          <li key={a.id} className="border-b pb-2">
            <p className="text-blue-600 font-medium cursor-pointer">{a.text}</p>
            <p className="text-gray-500">{a.sub}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
