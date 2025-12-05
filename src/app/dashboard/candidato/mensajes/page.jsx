"use client";
import { Ellipsis, Search, ShowerHead, SquarePen, Star } from "lucide-react"
import MessageCard from '../../../components/dashboard-candidato/MessageCard'
import MessageDetail from '../../../components/dashboard-candidato/MessageDetail'
import Input from "../../../components/ui/Input"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { mockMessages } from "../../../data/mockDataMessages"
import SendMessageDialog from "../../../components/dashboard-candidato/SendMessageDialog"

export default function MensajesPage() {
  const searchParams = useSearchParams();
  const [selectedMessage, setSelectedMessage] = useState(mockMessages[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyCandidates, setShowOnlyCandidates] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // Handle specific message selection from URL parameter
  useEffect(() => {
    const messageId = searchParams.get("messageId");
    if (messageId) {
      // Find message by ID or by sender name matching
      const specificMessage = mockMessages.find(
        (msg) =>
          msg.id.toString() === messageId ||
          msg.sender.name.toLowerCase().includes(messageId.toLowerCase())
      );
      if (specificMessage) {
        setSelectedMessage(specificMessage);
      }
    }
  }, [searchParams]);

  // Filter messages based on search term and candidate filter
  const filteredMessages = mockMessages.filter((message) => {
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
        message.isFavorite ||
        message.preview.toLowerCase().includes("linkedin");
      return matchesSearch && Favorite;
    }
    
    return matchesSearch;
  });

  const handelSendMessage = (messageData) => {
    console.log("Enviando mensaje:", messageData);
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
          <MessageDetail message={selectedMessage} />
        </div>
      </div>
    </div>
  );
} 