"use client";
import { createContext, useContext, useState, useCallback } from "react";
import NotificationContainer from "@/app/components/ui/NotificationContainer";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // ✅ useCallback para evitar re-renders
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // ✅ useCallback para evitar re-renders
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random(); // ID único
    const newNotification = {
      id,
      autoClose: true,
      duration: 5000,
      showCloseButton: true,
      ...notification,
      onClose: () => removeNotification(id), // ✅ Callback para eliminar
    };

    setNotifications((prev) => [...prev, newNotification]);
  }, [removeNotification]);

  // ✅ Helper functions
  const notify = {
    success: useCallback((title, children) => {
      addNotification({ variant: "success", title, children });
    }, [addNotification]),
    
    error: useCallback((title, children) => {
      addNotification({ variant: "error", title, children });
    }, [addNotification]),
    
    warning: useCallback((title, children) => {
      addNotification({ variant: "warning", title, children });
    }, [addNotification]),
    
    info: useCallback((title, children) => {
      addNotification({ variant: "info", title, children });
    }, [addNotification]),
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {/* ✅ Container con las notificaciones */}
      <NotificationContainer 
        notifications={notifications}
        position="top-right" 
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification debe usarse dentro de NotificationProvider");
  }
  return context;
}