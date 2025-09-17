"use client";
import { User2Icon, Star, Paperclip, CheckCircle } from "lucide-react";

export default function MessageCard({ messages, selectedMessage, onMessageSelect }) {
  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffTime = Math.abs(now - messageDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Hoy";
    if (diffDays === 2) return "Ayer";
    if (diffDays <= 7) return `${diffDays - 1} días`;
    
    return messageDate.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getMessagePreview = (message) => {
    if (Array.isArray(message.conversation)) {
      return message.conversation[0]?.content || message.preview;
    }
    return message.conversation?.content || message.preview;
  };

  const isCandidateMessage = (message) => {
    const preview = getMessagePreview(message).toLowerCase();
    return preview.includes('cv') || 
           preview.includes('enviar') || 
           message.sender.position.toLowerCase().includes('desarrollador') ||
           message.sender.position.toLowerCase().includes('ingeniero') ||
           message.sender.position.toLowerCase().includes('freelancer');
  };

  return (
    <div className="h-full overflow-y-auto">
      {messages.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No se encontraron mensajes
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${
              selectedMessage?.id === message.id
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative">
                <User2Icon size={40} className="text-gray-400" />
                {!message.isRead && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {message.sender.name}
                    </h3>
                    {isCandidateMessage(message) && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Candidato
                      </span>
                    )}
                    {message.isSponsored && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Patrocinado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {message.hasAttachment && (
                      <Paperclip size={14} className="text-gray-400" />
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDate(message.date)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {getMessagePreview(message)}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {message.sender.position}
                    </span>
                    {message.sender.company && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {message.sender.company}
                        </span>
                      </>
                    )}
                  </div>
                  {message.isRead && (
                    <CheckCircle size={14} className="text-blue-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
