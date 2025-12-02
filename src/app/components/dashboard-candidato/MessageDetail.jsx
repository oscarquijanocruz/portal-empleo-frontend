"use client";
import {
  User2Icon,
  Star,
  Ellipsis,
  Paperclip,
  Download,
  Trash2,
  SendHorizonal,
  VolumeOff,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import Button from "@/app/components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import Textarea from "@/app/components/ui/Textarea";

export default function MessageDetail({ message }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  //const [isSilenced, setIsSilenced] = useState(false);

  if (!message) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <User2Icon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium">Selecciona un mensaje</p>
          <p className="text-sm">para ver los detalles de la conversación</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffTime = Math.abs(now - messageDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hoy";
    if (diffDays === 2) return "Ayer";
    if (diffDays <= 7) return `${diffDays - 1} días`;

    return messageDate.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  const getConversationMessages = () => {
    if (Array.isArray(message.conversation)) {
      return message.conversation;
    }
    return [message.conversation];
  };

  const isCandidateMessage = () => {
    const preview = message.preview.toLowerCase();
    return (
      preview.includes("cv") ||
      preview.includes("enviar") ||
      message.sender.position.toLowerCase().includes("desarrollador") ||
      message.sender.position.toLowerCase().includes("ingeniero") ||
      message.sender.position.toLowerCase().includes("freelancer")
    );
  };

  const isFavoriteMessage = () => {
    const favorites = message.isFavorite;
    return favorites;
  };

  const handleDelete = (message) => {
    console.log("Eliminar mensaje:", message.id);
    onMessageDelete?.(message.id);
  };

  const handleSilence = () => {
    console.log("Silenciado");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User2Icon size={40} className="text-gray-400" />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold text-gray-900">
                  {message.sender.name}
                </h2>
                {isCandidateMessage() && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Candidato
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {message.sender.position}
                {message.sender.company && ` • ${message.sender.company}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                isFavorite ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
                  //onClick={() => setIsClicked(!isClicked)}
                >
                  <Ellipsis
                    size={20}
                    className={isClicked ? "text-black" : "text-gray-400"}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem onClick={handleSilence}>
                  <VolumeOff size={16} className="text-gray-400" />
                  <label htmlFor="silence-mode">Silenciar</label>
                  <Switch
                    onClick={(e) => e.stopPropagation()}
                    id="silence-mode"
                    className="ml-auto cursor-pointer"
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                  <Trash2 size={16} className="text-red-600" /> Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <h3 className="items-center justify-center align-center bg-white text-gray-500 text-center text-sm font-bold -mb-6 w-20 ml-auto mr-auto">
          {formatDateShort(message.date).toUpperCase()}
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {getConversationMessages().map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {msg.hasAttachment && (
                <div className="mt-2 flex items-center space-x-2">
                  <Paperclip size={14} />
                  <span className="text-xs">Archivo adjunto</span>
                  <button className="text-xs underline hover:no-underline">
                    <Download size={12} />
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {formatDate(msg.timestamp)}
                </span>
                {msg.isOwn && <CheckCircle size={14} className="text-white" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="p-2 border-t border-gray-300 bg-white">
        <div>
          <div className="flex items-center space-x-2">
            {isCandidateMessage() && (
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                  Ver CV
                </button>
              </div>
            )}
            <button className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
              <Paperclip size={16} className="shrink-0" />
            </button>
            <Textarea
              size="sm"
              className="field-sizing-content max-h-[100px] overflow-y-auto resize-none"
              placeholder="Escribe tu respuesta..."
            />
            <Button
              variant="primary"
              // onClick={sendMessage}
              className={"ml-auto px-0 py-0 w-12 h-10"}
              id="send-message"
            >
              <SendHorizonal size={16} className="shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}