import { TriangleAlert } from "lucide-react";
import { useId } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-4 py-3",
};

export default function Textarea({
  placeholder = "",
  size = "md",
  disabled = false,
  error = false,
  helperText,
  errorMessage,
  className,
  id,
  label,
  rows = 4,
  ...props
}) {
  const reactId = useId();
  const textareaId = id ?? `textarea-${reactId}`;
  const isError = Boolean(error);
  const errorText = isError
    ? typeof error === "string"
      ? error
      : errorMessage
    : undefined;
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;
  const helperContent = !errorText ? helperText : undefined;
  const messageId = errorText
    ? `${textareaId}-error`
    : helperContent
    ? `${textareaId}-helper`
    : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-gray-600 mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        aria-invalid={isError || undefined}
        aria-describedby={messageId}
        className={cn(
          "block w-full rounded-md border transition focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none",
          "bg-white text-gray-900 placeholder:text-gray-400 hover:border-sky-900 focus:border-sky-900",
          sizeClass,
          isError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-sky-900 focus:ring-sky-900",
          disabled && "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400",
          className
        )}
        {...props}
      />
      {errorText || helperContent ? (
        <div className="flex items-center gap-2 mt-1">
          {errorText && <TriangleAlert className="w-4 h-4 text-red-600" />}
          <p
            id={messageId}
            className={cn(
              "text-sm",
              errorText ? "text-red-600" : "text-gray-500"
            )}
          >
            {errorText ?? helperContent}
          </p>
        </div>
      ) : null}
    </div>
  );
}