// Para mostrar salarios, ubicaciones, etiquetas, etc.

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variantStyles = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-blue-100 text-blue-800",
  secondary: "bg-gray-100 text-gray-600",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

const sizeStyles = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-2.5 py-1.5",
  lg: "text-base px-3 py-2",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  ...props
}) {
  const variantClass = variantStyles[variant] ?? variantStyles.default;
  const sizeClass = sizeStyles[size] ?? sizeStyles.sm;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variantClass,
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}