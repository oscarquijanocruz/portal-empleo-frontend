import { Edit2Icon, Ellipsis, MessageSquareMore } from "lucide-react"
import MessageCard from '../../../components/dashboard/MessageCard'

export default function MensajesPage() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-300">
            
            <div className="flex p-4">
                Mensajes,  
                <input type="search" name="" id="" placeholder="Buscar mensajes" className="border border-black"/>
                <div className="ml-auto">
                    <button
                    >
                        <Ellipsis size={20} className="text-black"/>
                    </button>
                    <button
                    >
                        <Edit2Icon size={20} className="text-black"/>
                    </button>
                </div>    
            </div>
                <div className="bg-gray-200 md:row-span-9 border border-gray-300">
                    <MessageCard />
                </div>
            <div className="bg-gray-200 border border-gray-300">
                Nombre del remitente, cargo y empresa, opciones, favoritos
            </div>
            <div className="bg-gray-200 md:row-span-3 md:col-start-2 border border-gray-300">
                Patrocinado, foto y datos del remitente, fecha
            </div>
            <div className="bg-gray-200 md:row-span-5 md:col-start-2 md:row-start-5 border border-gray-300">
                Mensaje
            </div>
        </div>
    )
} 