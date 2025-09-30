export default function Candidates() {
  const candidatos = [
    { id: 1, nombre: "Juan Pérez", estatus: "Contratado", color: "bg-green-500" },
    { id: 2, nombre: "Alejando Lopez", estatus: "En proceso", color: "bg-yellow-500" },
    { id: 3, nombre: "Manuel Rivera", estatus: "Declinado", color: "bg-red-500" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-base font-semibold mb-4 text-gray-700">Lista de Candidatos</h2>

      {/* Buscador */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Candidato"
          className="w-full px-3 py-2 border rounded-l-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-3 py-2 bg-gray-200 rounded-r-md">🔍</button>
      </div>

      {/* Tabla */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="py-2">Candidato</th>
            <th className="py-2">Estatus</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((c) => (
            <tr key={c.id} className="border-b border-gray-200 last:border-0">
              <td className="py-2">{c.nombre}</td>
              <td className="py-2 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${c.color}`}></span>
                {c.estatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
