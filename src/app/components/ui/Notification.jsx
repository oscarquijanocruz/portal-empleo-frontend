import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from "lucide-react";

function Notification({
  onClose = () => {},
  title = "Notificación",
  children,
  variant = "info",
  duration = 5000,
  showCloseButton = true,
  autoClose = true,
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!autoClose || duration === 0) return;

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, autoClose, onClose]); // ✅ Agregué onClose a dependencias

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // ✅ Llama al callback del Context
    }, 300);
  };

  const variantConfig = {
    error: {
      icon: <OctagonAlert size={20} color="#dc2626" strokeWidth={2.25} />,
      backgroundColor: "#fef2f2",
      borderColor: "#fecaca",
    },
    success: {
      icon: <CheckCircle2 size={20} color="#16a34a" strokeWidth={2.25} />,
      backgroundColor: "#f0fdf4",
      borderColor: "#bbf7d0",
    },
    warning: {
      icon: <AlertTriangle size={20} color="#d97706" strokeWidth={2.25} />,
      backgroundColor: "#fffbeb",
      borderColor: "#fde68a",
    },
    info: {
      icon: <Info size={20} color="#0891b2" strokeWidth={2.25} />,
      backgroundColor: "#f0f9ff",
      borderColor: "#a7f3d0",
    },
  };

  const currentVariant = variantConfig[variant] || variantConfig.info;

  return (
    <div
      style={{
        // ✅ REMOVIDO position: "fixed" - ahora lo maneja el Container
        maxWidth: "400px",
        minWidth: "300px",
        backgroundColor: currentVariant.backgroundColor,
        border: `1px solid ${currentVariant.borderColor}`,
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        padding: "1rem",
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "translateY(-10px)" : "translateY(0)", // ✅ Animación mejorada
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flexShrink: 0, marginTop: "2px" }}>
          {currentVariant.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
            <h3 style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: "600",
              color: "#1f2937",
              lineHeight: "1.4",
            }}>
              {title}
            </h3>
            
            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar notificación"
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "1.25rem",
                  lineHeight: 1,
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "2px",
                  flexShrink: 0,
                  marginTop: "-2px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.color = "#374151"}
                onMouseLeave={(e) => e.target.style.color = "#6b7280"}
              >
                ×
              </button>
            )}
          </div>

          {children && (
            <div style={{
              marginTop: "8px",
              fontSize: "0.875rem",
              color: "#374151",
              lineHeight: "1.5",
            }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;