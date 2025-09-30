"use client";
import { useState } from "react";
import { 
  Bell, 
  MessageSquare, 
  FileText, 
  Settings, 
  Clock, 
  CheckCircle2,
  Circle,
  ExternalLink,
  Star
} from "lucide-react";

export default function NotificationCard({ 
  notification, 
  onMarkAsRead, 
  onMarkAsUnread,
  onAction 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationDate = new Date(timestamp);
    const diffTime = Math.abs(now - notificationDate);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return diffMinutes <= 1 ? "Hace un momento" : `Hace ${diffMinutes} minutos`;
    }
    if (diffHours < 24) {
      return diffHours === 1 ? "Hace 1 hora" : `Hace ${diffHours} horas`;
    }
    if (diffDays < 7) {
      return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;
    }
    
    return notificationDate.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "job_application":
        return <FileText size={20} className="text-blue-600" />;
      case "message":
        return <MessageSquare size={20} className="text-green-600" />;
      case "system":
        return <Settings size={20} className="text-gray-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  // const getPriorityColor = (priority) => {
  //   switch (priority) {
  //     case "high":
  //       return "border-l-red-500 bg-red-50";
  //     case "medium":
  //       return "border-l-yellow-500 bg-yellow-50";
  //     case "low":
  //       return "border-l-gray-400 bg-gray-50";
  //     default:
  //       return "border-l-gray-300 bg-white";
  //   }
  // };

  // const getPriorityDot = (priority) => {
  //   switch (priority) {
  //     case "high":
  //       return "bg-red-500";
  //     case "medium":
  //       return "bg-yellow-500";
  //     case "low":
  //       return "bg-gray-400";
  //     default:
  //       return "bg-gray-300";
  //   }
  // };

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    onMarkAsRead(notification.id);
  };

  const handleMarkAsUnread = (e) => {
    e.stopPropagation();
    onMarkAsUnread(notification.id);
  };

  const handleCardClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (onAction) {
      onAction(notification);
    }
  };

  return (
    <div
      className={`
        relative p-4 cursor-pointer transition-all duration-200
        ${!notification.isRead ? 'shadow-sm' : ''}
        hover:shadow-md hover:scale-[1.01]
        ${isHovered ? 'shadow-md' : ''}
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-3">
        {/* Type Icon */}
        <div className="flex-shrink-0 mt-1">
          {getTypeIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <div className={`w-2 h-2 rounded-full`}></div>
                )}
                {notification.metadata?.isFeatured && (
                  <Star size={16} className="text-yellow-500" />
                )}
              </div>
              
              <p className={`text-sm mb-2 ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                {notification.message}
              </p>

              {/* Metadata */}
              {notification.metadata && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {notification.metadata.jobTitle && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {notification.metadata.jobTitle}
                    </span>
                  )}
                  {notification.metadata.company && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {notification.metadata.company}
                    </span>
                  )}
                  {notification.metadata.candidateName && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {notification.metadata.candidateName}
                    </span>
                  )}
                  {notification.metadata.hasAttachment && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      📎 Adjunto
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{formatTimestamp(notification.timestamp)}</span>
                </div>
                
                {notification.action && (
                  <div className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                    <span className="text-xs font-medium">Ver detalles</span>
                    <ExternalLink size={12} />
                  </div>
                )}
              </div>
            </div>

            {/* Read/Unread Actions */}
            <div className="flex-shrink-0 ml-2">
              {notification.isRead ? (
                <button
                  onClick={handleMarkAsUnread}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  title="Marcar como no leído"
                >
                  <Circle size={16} className="text-gray-400" />
                </button>
              ) : (
                <button
                  onClick={handleMarkAsRead}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  title="Marcar como leído"
                >
                  <CheckCircle2 size={16} className="text-blue-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
