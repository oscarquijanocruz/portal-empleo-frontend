// Checkbox
import { useId, forwardRef } from "react";
import { Check } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variantStyles = {
  default: "border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-900 focus:border-blue-900",
  checked: "border-blue-900 bg-blue-900 text-white focus:ring-2 focus:ring-blue-900",
  hover: "border-gray-400 bg-white text-gray-900 hover:border-1 hover:border-blue-500 hover:shadow-sm",
  focus: "border-blue-900 bg-white text-gray-900 focus:ring-2 focus:ring-blue-900",
  disabled: "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
  disabledChecked: "border-gray-300 bg-gray-300 text-gray-500 cursor-not-allowed",
  error: "border-red-500 bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500",
  errorChecked: "border-red-500 bg-red-500 text-white focus:ring-2 focus:ring-red-500",
};

const sizeStyles = {
  sm: "w-4 h-4",
  md: "w-5 h-5", 
  lg: "w-6 h-6",
};

const iconSizeStyles = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const Checkbox = forwardRef(function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  error = false,
  size = "md",
  label,
  helperText,
  errorMessage,
  className,
  id,
  name,
  value,
  ...props
}, ref) {
  const reactId = useId();
  const checkboxId = id ?? `checkbox-${reactId}`;
  const isError = Boolean(error);
  const isDisabled = Boolean(disabled);
  
  const errorText = isError
    ? typeof error === "string"
      ? error
      : errorMessage
    : undefined;
  
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;
  const iconSizeClass = iconSizeStyles[size] ?? iconSizeStyles.md;
  const helperContent = !errorText ? helperText : undefined;
  const messageId = errorText
    ? `${checkboxId}-error`
    : helperContent
    ? `${checkboxId}-helper`
    : undefined;

  // Determinar el estilo de variante
  let variantClass;
  if (isDisabled) {
    variantClass = checked ? variantStyles.disabledChecked : variantStyles.disabled;
  } else if (isError) {
    variantClass = checked ? variantStyles.errorChecked : variantStyles.error;
  } else if (checked) {
    variantClass = variantStyles.checked;
  } else {
    variantClass = variantStyles.default;
  }

  // Determinar el color del helper text
  const helperTextColor = isError
    ? "text-red-600"
    : "text-gray-500";

  const handleChange = (event) => {
    if (!isDisabled) {
      onChange?.(event);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={isDisabled}
            name={name}
            value={value}
            aria-invalid={isError || undefined}
            aria-describedby={messageId}
            className={cn(
              "sr-only" // Ocultar el checkbox nativo
            )}
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              "flex items-center justify-center rounded-sm border-2 transition-all duration-200 cursor-pointer",
              sizeClass,
              variantClass,
              !isDisabled && "hover:border-blue-500 hover:shadow-sm",
              !isDisabled && !checked && "hover:bg-blue-50",
              isDisabled && "cursor-not-allowed",
              className
            )}
          >
            {checked && (
              <Check 
                className={cn(
                  "transition-all duration-200 text-white",
                  iconSizeClass
                )}
              />
            )}
          </label>
        </div>
        
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              "text-sm font-medium cursor-pointer select-none",
              isDisabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"
            )}
          >
            {label}
          </label>
        )}
      </div>
      
      {errorText || helperContent ? (
        <div className="flex items-center gap-2 mt-1 ml-8">
          <p
            id={messageId}
            className={cn(
              "text-sm",
              helperTextColor
            )}
          >
            {errorText ?? helperContent}
          </p>
        </div>
      ) : null}
    </div>
  );
});

export default Checkbox;
