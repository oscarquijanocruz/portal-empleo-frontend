import { MessageSquareMore } from "lucide-react"

export default function MessageCardPage() {

    return(
        <div>
            <div className="flex h-[58px] w-full grow items-center justify-center gap-2 bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3 border border-gray-300 ">
                <MessageSquareMore size={40} className="text-black" /> 
                    Nombre, texto y fecha
                </div>
                <div className="flex h-[58px] w-full grow items-center justify-center gap-2 bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3 border border-gray-300 ">
                    <MessageSquareMore size={40} className="text-black" /> 
                    Nombre, texto y fecha
                </div>
                <div className="flex h-[58px] w-full grow items-center justify-center gap-2 bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3 border border-gray-300 ">
                    <MessageSquareMore size={40} className="text-black" /> 
                    Nombre, texto y fecha
            </div>
        </div>
    )
}
