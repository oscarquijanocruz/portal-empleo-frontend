"use client";
import { Ellipsis, Search, ShowerHead, SquarePen, Star } from "lucide-react"
import MessageCard from '../../../components/dashboard-candidato/MessageCard'
import MessageDetail from '../../../components/dashboard-candidato/MessageDetail'
import Input from "../../../components/ui/Input"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { mockMessages } from "../../../data/mockDataMessages"
import SendMessageDialog from "../../../components/dashboard-candidato/SendMessageDialog"
import { useMessageFavorites } from '@/app/hooks/useMessageFavorites';

export default function MensajesPage() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(mockMessages[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyCandidates, setShowOnlyCandidates] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { isFavorite, toggleFavorite, isLoading } = useMessageFavorites();

  // Handle specific message selection from URL parameter
  useEffect(() => {
    const messageId = searchParams.get("messageId");
    if (messageId) {
      // Find message by ID or by sender name matching
      const specificMessage = messages.find(
        (msg) =>
          msg.id.toString() === messageId ||
          msg.sender.name.toLowerCase().includes(messageId.toLowerCase())
      );
      if (specificMessage) {
        setSelectedMessage(specificMessage);
      }
    }
  }, [searchParams, messages]);

  // Filter messages based on search term and candidate filter
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchTerm.toLowerCase());

    if (showOnlyCandidates) {
      // Filter for candidate messages (those with CV-related content or from job seekers)
      // TODO: Cambiar esto por datos reales (todo esta hardcodeado con datos falsos)
      const isCandidate =
        message.preview.toLowerCase().includes("cv") ||
        message.preview.toLowerCase().includes("enviar") ||
        message.sender.position.toLowerCase().includes("desarrollador") ||
        message.sender.position.toLowerCase().includes("ingeniero") ||
        message.sender.position.toLowerCase().includes("freelancer");
      return matchesSearch && isCandidate;
    }

    if(showOnlyFavorites){
      // Filter for favorites messages
      const Favorite =
        isFavorite(message.id);
      return matchesSearch && Favorite;
    }
    
    return matchesSearch;
  });

  const handelSendMessage = (messageData) => {
    console.log("Enviando mensaje:", messageData);
  };

  // Función para eliminar mensaje en tiempo real
  const handleDeleteMessage = (messageId) => {
    // Calcular los mensajes actualizados
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    
    // Actualizar el estado de mensajes
    setMessages(updatedMessages);
    
    // Si el mensaje eliminado era el seleccionado, seleccionar otro o limpiar
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(updatedMessages.length > 0 ? updatedMessages[0] : null);
    }
  };

  return (
    <div className="h-full flex flex-col ">
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
            className={"flex-1 text-gray-400 bg-gray-blue-50 border-0"}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowOnlyCandidates(!showOnlyCandidates)}
            className={`px-3 py-1 text-sm rounded ${
              showOnlyCandidates
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Solo Candidatos
          </button>
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            title="Mostrar Favoritos"
            className={`px-3 py-1 text-sm rounded flex items-center ${
              showOnlyFavorites
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Star size={16} className="mr-1" fill={showOnlyFavorites ? "currentColor" : "none"} />
            Favoritos
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Ellipsis size={26} className="text-gray-600" />
          </button>
          <button
            onClick={() => setIsOpenDialog(true)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <SquarePen size={26} className="text-gray-600" />
          </button>
          {/* Dialogo de envio de mensaje */}
          <SendMessageDialog 
            isOpen={isOpenDialog}
            onClose={() => setIsOpenDialog(false)}
            onSend={handelSendMessage}
          />
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
          <MessageDetail 
            message={selectedMessage} 
            onMessageDelete={handleDeleteMessage}
          />
        </div>
      </div>
    </div>
  );
} 