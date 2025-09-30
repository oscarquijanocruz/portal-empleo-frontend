"use client";
import { useState } from "react";
import { 
  Bell, 
  MessageSquare, 
  FileText, 
  Settings, 
  Filter,
  X
} from "lucide-react";

export default function NotificationFilters({ 
  filters, 
  onFilterChange, 
  notificationCounts 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterOptions = [
    {
      key: "all",
      label: "Todas",
      icon: <Bell size={16} />,
      count: notificationCounts.total
    },
    {
      key: "unread",
      label: "No leídas",
      icon: <Bell size={16} />,
      count: notificationCounts.unread
    },
    {
      key: "job_application",
      label: "Aplicaciones",
      icon: <FileText size={16} />,
      count: notificationCounts.job_application
    },
    {
      key: "message",
      label: "Mensajes",
      icon: <MessageSquare size={16} />,
      count: notificationCounts.message
    },
    {
      key: "system",
      label: "Sistema",
      icon: <Settings size={16} />,
      count: notificationCounts.system
    }
  ];

  const handleFilterClick = (filterKey) => {
    onFilterChange(filterKey);
  };
  
  const clearFilters = () => {
    onFilterChange("all");
  };

  const hasActiveFilters = filters.type !== "all";

  return (
    <div className="bg-white border-b border-gray-200 flex-1">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Filter size={18} />
            <span className="font-medium">Filtros</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {filters.type !== "all" ? 1 : 0}
              </span>
            )}
          </div>
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="p-4">
          {/* Type Filters */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tipo de notificación</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleFilterClick(option.key)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${filters.type === option.key
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                    }
                  `}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {option.count > 0 && (
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${filters.type === option.key
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X size={14} />
                <span>Limpiar filtros</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
