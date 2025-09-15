
export default function EmpresaDashPage() {
  return(
    <div className="grid grid-cols-4 grid-rows-5 gap-7">
        <div className="col-span-3 bg-gray bg-gray-200">Barra de busqueda</div>
        <div className="row-span-2 row-start-2 bg-gray-200">Usuarios</div>
        <div className="row-span-2 row-start-2 bg-gray-200">Vacantes</div>
        <div className="row-span-2 row-start-2 bg-gray-200">Eventos</div>
        <div className="row-span-2 row-start-2 bg-gray-200">Aplicaciones</div>
        <div className="col-span-3 row-span-4 row-start-4 bg-gray-200">Gráficos</div>
        <div className="row-span-4 col-start-4 row-start-4 bg-gray-200">Actividad reciente</div>
    </div>
  )
}