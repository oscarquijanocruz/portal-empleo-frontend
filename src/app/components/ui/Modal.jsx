import React, { useEffect, useRef } from "react";
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from "lucide-react";

function Modal({
    isOpen = false,
    onClose = () => {},
    title = "",
    children,
    size = "md", // 'sm' | 'md' | 'lg' | 'xl'
    showCloseButton = true,
    closeOnBackdrop = true,
    variant = "default", // 'default' | 'warning-red' | 'success' | 'warning-yellow' | 'info'
    onConfirm = null, // Si se proporciona, muestra botones OK/Cancel
    confirmText = "Okay",
    cancelText = "Cancelar",
}) {
    const modalRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        previouslyFocused.current = document.activeElement;
        // prevent background scroll
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // focus management: focus first focusable in modal or the modal container
        const timer = setTimeout(() => {
            const el = modalRef.current;
            if (!el) return;
            const focusable = el.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            (focusable || el).focus();
        }, 0);

        const handleKey = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "Tab") {
                // simple focus trap
                const el = modalRef.current;
                if (!el) return;
                const focusables = Array.from(
                    el.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    )
                ).filter((n) => !n.disabled && n.getAttribute("aria-hidden") !== "true");

                if (focusables.length === 0) {
                    e.preventDefault();
                    return;
                }

                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKey);
        return () => {
            clearTimeout(timer);
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = prevOverflow;
            // restore focus
            try {
                previouslyFocused.current && previouslyFocused.current.focus();
            } catch (err) {}
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeStyles = {
        sm: { maxWidth: "360px" },
        md: { maxWidth: "600px" },
        lg: { maxWidth: "900px" },
        xl: { maxWidth: "1100px" },
    };

    // Configuración de variantes con iconos y colores
    const variantConfig = {
        default: {
            icon: null,
            primaryColor: "#2563eb", // blue-600
            primaryBg: "#2563eb",
            primaryText: "#ffffff",
            secondaryBg: "#dbeafe", // blue-100
            secondaryText: "#2563eb",
            showCloseButton: true,
        },
        "warning-red": {
            icon: <OctagonAlert size={22} color="#dc2626" strokeWidth={2.25} />,
            primaryColor: "#dc2626", // red-600
            primaryBg: "#dc2626",
            primaryText: "#ffffff",
            secondaryBg: "#fecaca", // red-200
            secondaryText: "#dc2626",
            showCloseButton: false,
        },
        success: {
            icon: <CheckCircle2 size={22} color="#16a34a" strokeWidth={2.25} />,
            primaryColor: "#16a34a", // green-600
            primaryBg: "#16a34a",
            primaryText: "#ffffff",
            secondaryBg: "#bbf7d0", // green-200
            secondaryText: "#16a34a",
            showCloseButton: false,
        },
        "warning-yellow": {
            icon: <AlertTriangle size={22} color="#d97706" strokeWidth={2.25} />,
            primaryColor: "#d97706", // amber-600
            primaryBg: "#d97706",
            primaryText: "#ffffff",
            secondaryBg: "#fde68a", // amber-200
            secondaryText: "#d97706",
            showCloseButton: false,
        },
        info: {
            icon: <Info size={22} color="#0891b2" strokeWidth={2.25} />,
            primaryColor: "#0891b2", // cyan-600
            primaryBg: "#0891b2",
            primaryText: "#ffffff",
            secondaryBg: "#a7f3d0", // cyan-200
            secondaryText: "#0891b2",
            showCloseButton: false,
        },
    };

    const currentVariant = variantConfig[variant] || variantConfig.default;

    const handleBackdropClick = (e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            onMouseDown={handleBackdropClick}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.45)",
            }}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                style={{
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    width: "90%",
                    margin: "1rem",
                    maxHeight: "90vh",
                    overflow: "auto",
                    outline: "none",
                    padding: "1rem",
                    ...sizeStyles[size] || sizeStyles.md,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {currentVariant.icon}
                        {title ? (
                            <h2 id="modal-title" style={{ margin: 0, fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>
                                {title}
                            </h2>
                        ) : null}
                    </div>
                    {(showCloseButton && currentVariant.showCloseButton) ? (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Cerrar"
                            style={{
                                background: "transparent",
                                border: "none",
                                fontSize: "1.25rem",
                                lineHeight: 1,
                                cursor: "pointer",
                                color: "#6b7280",
                                padding: "4px",
                            }}
                        >
                            ×
                        </button>
                    ) : null}
                </div>

                <div style={{ marginTop: 12, color: "#374151", lineHeight: "1.6" }}>{children}</div>
                
                {/* Botones de acción si se proporciona onConfirm */}
                {onConfirm && (
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "flex-end", 
                        gap: "12px", 
                        marginTop: "24px",
                        paddingTop: "16px",
                        borderTop: "1px solid #e5e7eb"
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "none",
                                backgroundColor: currentVariant.secondaryBg,
                                color: currentVariant.secondaryText,
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "500",
                                transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.opacity = "0.9";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.opacity = "1";
                            }}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                border: "none",
                                backgroundColor: currentVariant.primaryBg,
                                color: currentVariant.primaryText,
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "500",
                                transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.opacity = "0.9";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.opacity = "1";
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;