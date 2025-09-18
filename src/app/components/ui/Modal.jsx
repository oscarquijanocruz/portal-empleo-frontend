import React, { useEffect, useRef } from "react";

function Modal({
    isOpen = false,
    onClose = () => {},
    title = "",
    children,
    size = "md", // 'sm' | 'md' | 'lg' | 'xl'
    showCloseButton = true,
    closeOnBackdrop = true,
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
                    {title ? (
                        <h2 id="modal-title" style={{ margin: 0, fontSize: "1.125rem" }}>
                            {title}
                        </h2>
                    ) : null}
                    {showCloseButton ? (
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
                            }}
                        >
                            ×
                        </button>
                    ) : null}
                </div>

                <div style={{ marginTop: 12 }}>{children}</div>
            </div>
        </div>
    );
}

export default Modal;