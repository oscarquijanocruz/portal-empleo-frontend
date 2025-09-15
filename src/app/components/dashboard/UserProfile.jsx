// Componente usuario abajo izquierda

export default function UserProfile() {
    return(
        <div className="flex flex-col rounded-lg border bg-white shadow-sm">
        <div className="p-4">
            <div className="p-4 border-t">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Nombre Apellido</p>
                            <p className="text-xs text-gray-500">Puesto</p>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
    )
}   