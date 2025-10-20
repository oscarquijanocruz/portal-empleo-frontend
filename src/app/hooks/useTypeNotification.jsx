import { Bell, FileText, MessageCircle, Settings } from "lucide-react";

function useTypeNotification() {
  const getTypeIcon = (type) => {
    switch (type) {
      case "job_application":
        return <FileText size={20} className="text-blue-600" />;
      case "message":
        return <MessageCircle size={20} className="text-green-600" />;
      case "system":
        return <Settings size={20} className="text-gray-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationDate = new Date(timestamp);
    const diffTime = Math.abs(now - notificationDate);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return diffMinutes <= 1
        ? "Hace un momento"
        : `Hace ${diffMinutes} minutos`;
    }
    if (diffHours < 24) {
      return diffHours === 1 ? "Hace 1 hora" : `Hace ${diffHours} horas`;
    }
    if (diffDays < 7) {
      return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;
    }

    return notificationDate.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return {
    getTypeIcon,
    formatTimestamp,
  };
}

export default useTypeNotification;
