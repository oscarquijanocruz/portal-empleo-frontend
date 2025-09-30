// Botón
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variantStyles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600", // default primary style
  secondary:
    "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus-visible:ring-blue-600",
  ghost:
    "bg-transparent text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500",
};

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

export default function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...props
}) {
  const isDisabled = disabled || loading;
  const variantClass = variantStyles[variant] ?? variantStyles.primary;
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantClass,
        sizeClass,
        fullWidth && "w-full",
        isDisabled && "cursor-not-allowed opacity-60",
        loading && "pointer-events-none",
        className
      )}
      {...props}
    >
      {" "}
      {loading ? (
        <span className="flex items-center gap-2">
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
