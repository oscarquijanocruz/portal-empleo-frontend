import { useState, useCallback } from 'react';

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      onClose: () => removeNotification(id),
    };
    
    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Métodos de conveniencia para cada tipo
  const showSuccess = useCallback((title, message, options = {}) => {
    return addNotification({
      variant: 'success',
      title,
      children: message,
      ...options,
    });
  }, [addNotification]);

  const showError = useCallback((title, message, options = {}) => {
    return addNotification({
      variant: 'error',
      title,
      children: message,
      duration: 7000, // Errores duran más
      ...options,
    });
  }, [addNotification]);

  const showWarning = useCallback((title, message, options = {}) => {
    return addNotification({
      variant: 'warning',
      title,
      children: message,
      ...options,
    });
  }, [addNotification]);

  const showInfo = useCallback((title, message, options = {}) => {
    return addNotification({
      variant: 'info',
      title,
      children: message,
      ...options,
    });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}

export default useNotifications;
