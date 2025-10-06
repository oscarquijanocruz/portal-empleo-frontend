// Select
import { useId, useState, useRef, useEffect } from "react";
import { ChevronDown, AlertTriangle, Check } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variantStyles = {
  default: "border-gray-300 bg-white text-gray-900",
  active: "border-blue-900 bg-white text-gray-900",
  focused: "border-blue-900 bg-white text-gray-900 ring-2 ring-blue-900 ring-offset-1",
  disabled: "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed",
  error: "border-red-500 bg-white text-gray-900",
  success: "border-green-500 bg-white text-gray-900",
};

const sizeStyles = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-4 py-3",
};

const optionVariantStyles = {
  checkbox: {
    default: "flex items-center gap-3 p-2 rounded-md hover:bg-gray-50",
    selected: "flex items-center gap-3 p-2 rounded-md bg-blue-50 border border-blue-200",
    disabled: "flex items-center gap-3 p-2 rounded-md opacity-50 cursor-not-allowed"
  },
  button: {
    default: "px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 hover:border-blue-900",
    selected: "px-3 py-2 rounded-md border border-blue-200 bg-blue-50 text-gray-900",
    disabled: "px-3 py-2 rounded-md border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
  }
};

export default function Select({
  label,
  placeholder = "Select",
  options = [],
  value,
  onChange,
  size = "md",
  disabled = false,
  error = false,
  success = false,
  helperText,
  errorMessage,
  className,
  id,
  variant = "default", // default, checkbox, button
  multiple = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  ...props
}) {
  const reactId = useId();
  const selectId = id ?? `select-${reactId}`;
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const isError = Boolean(error);
  const isSuccess = Boolean(success);
  const isDisabled = Boolean(disabled);
  
  const errorText = isError
    ? typeof error === "string"
      ? error
      : errorMessage
    : undefined;
  
  const sizeClass = sizeStyles[size] ?? sizeStyles.md;
  const helperContent = !errorText ? helperText : undefined;
  const messageId = errorText
    ? `${selectId}-error`
    : helperContent
    ? `${selectId}-helper`
    : undefined;

  const dropdownOpen = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
  const setDropdownOpen = onOpenChange || setIsOpen;

  // Determinar el estilo de variante
  let variantClass;
  if (isDisabled) {
    variantClass = variantStyles.disabled;
  } else if (isError) {
    variantClass = variantStyles.error;
  } else if (isSuccess) {
    variantClass = variantStyles.success;
  } else if (focusedIndex === -1 && dropdownOpen) {
    variantClass = variantStyles.focused;
  } else {
    variantClass = variantStyles.active;
  }

  // Determinar el color del helper text
  const helperTextColor = isError
    ? "text-red-600"
    : isSuccess
    ? "text-green-600"
    : "text-gray-500";

  // Determinar el icono a mostrar
  const getIcon = () => {
    if (isDisabled) {
      return <ChevronDown className="h-4 w-4 text-gray-400" />;
    }
    if (isError) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    if (isSuccess) {
      return <Check className="h-4 w-4 text-green-500" />;
    }
    return <ChevronDown className="h-4 w-4 text-gray-400" />;
  };

  // Manejar clic fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  // Manejar selección de opción
  const handleOptionSelect = (option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(option.value);
      const newValues = isSelected
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      onChange?.(newValues);
    } else {
      onChange?.(option.value);
      setDropdownOpen(false);
    }
  };

  // Verificar si una opción está seleccionada
  const isOptionSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  // Obtener texto mostrado en el select
  const getDisplayText = () => {
    if (multiple && Array.isArray(value)) {
      const selectedOptions = options.filter(opt => value.includes(opt.value));
      if (selectedOptions.length === 0) return placeholder;
      if (selectedOptions.length === 1) return selectedOptions[0].label;
      return `${selectedOptions.length} seleccionados`;
    }
    
    if (value) {
      const selectedOption = options.find(opt => opt.value === value);
      return selectedOption?.label || placeholder;
    }
    
    return placeholder;
  };

  // Renderizar opciones según la variante
  const renderOption = (option, index) => {
    const isSelected = isOptionSelected(option.value);
    const isFocused = focusedIndex === index;

    if (variant === "checkbox") {
      return (
        <div
          key={option.value}
          className={cn(
            optionVariantStyles.checkbox[isDisabled ? "disabled" : isSelected ? "selected" : "default"],
            isFocused && "ring-1 ring-blue-900"
          )}
          onClick={() => !isDisabled && handleOptionSelect(option)}
          onMouseEnter={() => setFocusedIndex(index)}
        >
          <div className={cn(
            "w-4 h-4 rounded border-2 flex items-center justify-center",
            isSelected 
              ? "bg-purple-500 border-purple-500" 
              : "border-gray-300 bg-white"
          )}>
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className={cn(
            "text-sm",
            isSelected ? "text-white" : "text-gray-900"
          )}>
            {isSelected ? "Selected" : option.label}
          </span>
        </div>
      );
    }

    if (variant === "button") {
      return (
        <button
          key={option.value}
          type="button"
          className={cn(
            optionVariantStyles.button[isDisabled ? "disabled" : isSelected ? "selected" : "default"],
            isFocused && "ring-1 ring-blue-900"
          )}
          onClick={() => !isDisabled && handleOptionSelect(option)}
          onMouseEnter={() => setFocusedIndex(index)}
          disabled={isDisabled}
        >
          <span className="text-sm">
            {isSelected ? "Selected" : option.label}
          </span>
        </button>
      );
    }

    // Variante por defecto (dropdown)
    return (
      <div
        key={option.value}
        className={cn(
          "flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer",
          isSelected && "bg-blue-50",
          isFocused && "ring-1 ring-blue-900"
        )}
        onClick={() => handleOptionSelect(option)}
        onMouseEnter={() => setFocusedIndex(index)}
      >
        <div className={cn(
          "w-4 h-4 rounded border-2 flex items-center justify-center",
          isSelected 
            ? "bg-purple-500 border-purple-500" 
            : "border-gray-300 bg-white"
        )}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className="text-sm text-gray-900">
          {isSelected ? "Selected" : option.label}
        </span>
      </div>
    );
  };

  // Si es variante checkbox o button, renderizar como lista de opciones
  if (variant === "checkbox" || variant === "button") {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block text-sm font-medium mb-1",
              isDisabled ? "text-gray-400" : "text-gray-900"
            )}
          >
            {label}
          </label>
        )}
        <div className="space-y-1">
          {options.map((option, index) => renderOption(option, index))}
        </div>
        {errorText || helperContent ? (
          <p
            id={messageId}
            className={cn(
              "mt-1 text-sm",
              helperTextColor
            )}
          >
            {errorText ?? helperContent}
          </p>
        ) : null}
      </div>
    );
  }

  // Variante por defecto (dropdown)
  return (
    <div className="w-full relative" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "block text-sm font-medium mb-1",
            isDisabled ? "text-gray-400" : "text-gray-900"
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={selectId}
          onClick={() => !isDisabled && setDropdownOpen(!dropdownOpen)}
          disabled={isDisabled}
          aria-invalid={isError || undefined}
          aria-describedby={messageId}
          aria-expanded={dropdownOpen}
          aria-haspopup="listbox"
          className={cn(
            "block w-full rounded-md border transition focus:outline-none appearance-none cursor-pointer text-left",
            sizeClass,
            variantClass,
            "pr-10", // Espacio para el icono
            className
          )}
          {...props}
        >
          <span className={cn(
            "block truncate",
            !value && "text-gray-400"
          )}>
            {getDisplayText()}
          </span>
        </button>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {getIcon()}
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          <div className="py-1">
            {options.map((option, index) => renderOption(option, index))}
          </div>
        </div>
      )}

      {errorText || helperContent ? (
        <p
          id={messageId}
          className={cn(
            "mt-1 text-sm",
            helperTextColor
          )}
        >
          {errorText ?? helperContent}
        </p>
      ) : null}
    </div>
  );
}