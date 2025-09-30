"use client";
import { Edit2Icon, Ellipsis, Search } from "lucide-react"
import MessageCard from '../../../components/dashboard-candidato/MessageCard'
import MessageDetail from '../../../components/dashboard-candidato/MessageDetail'
import Input from "../../../components/ui/Input"
import { useState } from "react"
import { mockMessages } from "../../../data/mockDataMessages"

export default function MensajesPage() {
    const [selectedMessage, setSelectedMessage] = useState(mockMessages[0])
    const [searchTerm, setSearchTerm] = useState("")
    const [showOnlyCandidates, setShowOnlyCandidates] = useState(false)

    // Filter messages based on search term and candidate filter
    const filteredMessages = mockMessages.filter(message => {
        const matchesSearch = message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.preview.toLowerCase().includes(searchTerm.toLowerCase())
        
        if (showOnlyCandidates) {
            // Filter for candidate messages (those with CV-related content or from job seekers)
            const isCandidate = message.preview.toLowerCase().includes('cv') ||
                              message.preview.toLowerCase().includes('enviar') ||
                              message.sender.position.toLowerCase().includes('desarrollador') ||
                              message.sender.position.toLowerCase().includes('ingeniero') ||
                              message.sender.position.toLowerCase().includes('freelancer')
            return matchesSearch && isCandidate
        }
        
        return matchesSearch
    })

    return(
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex p-4 items-center space-x-4 border-b border-gray-300 bg-white">
                <h1 className="text-xl font-semibold">Mensajes</h1>
                <div className="flex-1 flex items-center space-x-2">
                    <Search size={20} className="text-gray-400" />
                    <Input 
                        type="search"
                        placeholder="Buscar mensajes"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setShowOnlyCandidates(!showOnlyCandidates)}
                        className={`px-3 py-1 text-sm rounded ${
                            showOnlyCandidates 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Solo Candidatos
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <Ellipsis size={20} className="text-gray-600"/>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                        <Edit2Icon size={20} className="text-gray-600"/>
                    </button>
                </div>    
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* Message List */}
                <div className="w-1/2 border-r border-gray-300 bg-white">
                    <MessageCard 
                        messages={filteredMessages}
                        selectedMessage={selectedMessage}
                        onMessageSelect={setSelectedMessage}
                    />
                </div>
                
                {/* Message Detail */}
                <div className="w-1/2 bg-white">
                    <MessageDetail message={selectedMessage} />
                </div>
            </div>
        </div>
    )
} 