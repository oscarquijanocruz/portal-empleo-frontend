'use client'
import { User2Icon, Star, Ellipsis, Paperclip, Download, CheckCircle, Reply, Archive, Trash2 } from 'lucide-react';
import { useState } from "react";

export default function MessageDetail({ message }) {
    const [isStarred, setIsStarred] = useState(false);

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
        return messageDate.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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
        return preview.includes('cv') || 
               preview.includes('enviar') || 
               message.sender.position.toLowerCase().includes('desarrollador') ||
               message.sender.position.toLowerCase().includes('ingeniero') ||
               message.sender.position.toLowerCase().includes('freelancer');
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
                                {message.isSponsored && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Patrocinado
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
                            onClick={() => setIsStarred(!isStarred)}
                            className={`p-2 rounded-full hover:bg-gray-100 ${
                                isStarred ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                        >
                            <Star size={20} fill={isStarred ? 'currentColor' : 'none'} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                            <Ellipsis size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getConversationMessages().map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                msg.isOwn
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-900'
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
                                {msg.isOwn && (
                                    <CheckCircle size={14} className="text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-300 bg-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                            <Reply size={16} />
                            <span>Responder</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                            <Trash2 size={16} />
                            <span>Eliminar</span>
                        </button>
                    </div>
                    {isCandidateMessage() && (
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                                Ver CV
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                                Contactar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}