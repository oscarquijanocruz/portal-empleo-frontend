"use client";
import { useState, useMemo } from "react";
import {
  Bell,
  CheckCircle2,
  Circle,
  Filter,
  Search,
  MoreVertical,
  Archive,
  Trash2,
} from "lucide-react";
import NotificationCard from "../../../components/dashboard-candidato/NotificationCard";
import NotificationFilters from "../../../components/dashboard-candidato/NotificationFilters";
import { mockNotifications } from "@/app/data/mockNotifications";
import Button from "../../../components/ui/Button";

export default function NotificacionesPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filters, setFilters] = useState({
    type: "all",
    // priority: "all_priorities"
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Calculate notification counts
  const notificationCounts = useMemo(() => {
    const counts = {
      total: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      job_application: notifications.filter((n) => n.type === "job_application")
        .length,
      message: notifications.filter((n) => n.type === "message").length,
      system: notifications.filter((n) => n.type === "system").length,
    };
    return counts;
  }, [notifications]);

  // Filter notifications based on current filters and search
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by type
    if (filters.type !== "all") {
      if (filters.type === "unread") {
        filtered = filtered.filter((n) => !n.isRead);
      } else {
        filtered = filtered.filter((n) => n.type === filters.type);
      }
    }

    // // Filter by priority
    // if (filters.priority !== "all_priorities") {
    //   filtered = filtered.filter(n => n.priority === filters.priority);
    // }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(term) ||
          n.message.toLowerCase().includes(term) ||
          (n.metadata?.jobTitle &&
            n.metadata.jobTitle.toLowerCase().includes(term)) ||
          (n.metadata?.company &&
            n.metadata.company.toLowerCase().includes(term)) ||
          (n.metadata?.candidateName &&
            n.metadata.candidateName.toLowerCase().includes(term))
      );
    }

    // Sort by timestamp (newest first)
    return filtered.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [notifications, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "priority") {
      setFilters((prev) => ({ ...prev, priority: value }));
    } else {
      setFilters((prev) => ({ ...prev, type: value }));
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAsUnread = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: false } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationAction = (notification) => {
    console.log("Notification action:", notification.action);
    // Here you would implement the actual action based on notification.action.type
    // For example, navigate to a specific page, open a modal, etc.
  };

  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const handleBulkAction = (action) => {
    if (action === "mark_read") {
      setNotifications((prev) =>
        prev.map((n) =>
          selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n
        )
      );
    } else if (action === "mark_unread") {
      setNotifications((prev) =>
        prev.map((n) =>
          selectedNotifications.includes(n.id) ? { ...n, isRead: false } : n
        )
      );
    } else if (action === "delete") {
      setNotifications((prev) =>
        prev.filter((n) => !selectedNotifications.includes(n.id))
      );
    }
    setSelectedNotifications([]);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notificaciones
              </h1>
              <p className="text-sm text-gray-600">
                {notificationCounts.unread} no leídas de{" "}
                {notificationCounts.total} total
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {notificationCounts.unread > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <CheckCircle2 size={16} />
                <span>Marcar todas como leídas</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar notificaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="grid grid-cols-12 overflow-y-auto">
        <div className="col-span-12 lg:col-span-9 min-w-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Bell size={48} className="mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">
                No hay notificaciones
              </h3>
              <p className="text-sm text-center max-w-md">
                {searchTerm || filters.type !== "all"
                  ? "No se encontraron notificaciones con los filtros aplicados."
                  : "No tienes notificaciones en este momento."}
              </p>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              {/* Select All */}
              <div className="bg-white border-b border-gray-200 px-6 py-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      selectedNotifications.length ===
                        filteredNotifications.length &&
                      filteredNotifications.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Seleccionar todas ({filteredNotifications.length})
                  </span>
                </label>
              </div>

              {/* Notification Cards */}
              <div className="divide-y divide-gray-200">  
                {filteredNotifications.map((notification) => (
                  <div key={notification.id} className="relative border-r-1 ">  
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="absolute left-4 top-6 z-10 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="pl-12">
                      <NotificationCard
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAsUnread={handleMarkAsUnread}
                        onAction={handleNotificationAction}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-3 lg:sticky lg:top-6">
          {/* Filtros */}
          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-700">
                    {selectedNotifications.length} notificaciones seleccionadas
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction("mark_read")}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                  >
                    <CheckCircle2 size={14} />
                    <span>Marcar como leídas</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction("mark_unread")}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                  >
                    <Circle size={14} />
                    <span>Marcar como no leídas</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction("delete")}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <NotificationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            notificationCounts={notificationCounts}
          />
        </div>
      </div>
    </div>
  );
}
