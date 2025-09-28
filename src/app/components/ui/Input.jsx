import { useId } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-4 py-3",
};

export default function Input({
  type = "text",
  placeholder = "",
  size = "md",
  disabled = false,
  error = false,
  helperText,
  errorMessage,
  className,
  id,
  ...props
}) {
  const reactId = useId();
  const inputId = id ?? `input-${reactId}`;
  const isError = Boolean(error);
  const errorText = isError
    ? typeof error === "string"
      ? error
      : errorMessage
    : undefined;
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;
  const helperContent = !errorText ? helperText : undefined;
  const messageId = errorText
    ? `${inputId}-error`
    : helperContent
    ? `${inputId}-helper`
    : undefined;

  return (
    <div className="w-full">
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={isError || undefined}
        aria-describedby={messageId}
        className={cn(
          "block w-full rounded-md border transition focus:outline-none focus:ring-2 focus:ring-offset-1",
          "bg-white text-gray-900 placeholder:text-gray-400",
          sizeClass,
          isError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
          disabled && "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500",
          className
        )}
        {...props}
      />
      {errorText || helperContent ? (
        <p
          id={messageId}
          className={cn(
            "mt-1 text-sm",
            errorText ? "text-red-600" : "text-gray-500"
          )}
        >
          {errorText ?? helperContent}
        </p>
      ) : null}
    </div>
  );
}
