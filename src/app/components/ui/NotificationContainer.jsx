import React from 'react';
import Notification from './Notification';

function NotificationContainer({ notifications, position = "top-right" }) {
  // Estilos del contenedor para apilar notificaciones
  const containerStyles = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    pointerEvents: "none", // No bloquea clicks en la página
    ...getPositionStyles(position),
  };

  return (
    <div style={containerStyles}>
      {notifications.map((notification) => (
        <div key={notification.id} style={{ pointerEvents: "auto" }}>
          <Notification {...notification} />
        </div>
      ))}
    </div>
  );
}

// Helper para posiciones
function getPositionStyles(position) {
  const styles = {
    "top-right": { top: "1rem", right: "1rem" },
    "top-left": { top: "1rem", left: "1rem" },
    "bottom-right": { bottom: "1rem", right: "1rem", flexDirection: "column-reverse" },
    "bottom-left": { bottom: "1rem", left: "1rem", flexDirection: "column-reverse" },
    "top-center": { top: "1rem", left: "50%", transform: "translateX(-50%)" },
    "bottom-center": { bottom: "1rem", left: "50%", transform: "translateX(-50%)", flexDirection: "column-reverse" },
  };
  return styles[position] || styles["top-right"];
}

export default NotificationContainer;