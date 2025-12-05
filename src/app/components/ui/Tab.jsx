"use client";
import { useState, createContext, useContext } from 'react';

// Context para manejar el estado de las tabs
const TabContext = createContext();

// Hook para usar el contexto de tabs
export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext debe usarse dentro de un TabProvider');
  }
  return context;
};

// Componente principal de Tabs
export default function Tabs({ 
  children, 
  defaultValue, 
  value, 
  onValueChange, 
  variant = "underline", // "underline" o "boxed"
  className = "" 
}) {
  const [activeTab, setActiveTab] = useState(defaultValue || "");

  const handleTabChange = (tabValue) => {
    if (value === undefined) {
      setActiveTab(tabValue);
    }
    onValueChange?.(tabValue);
  };

  const currentValue = value !== undefined ? value : activeTab;

  return (
    <TabContext.Provider value={{ 
      activeTab: currentValue, 
      onTabChange: handleTabChange, 
      variant 
    }}>
      <div className={`tabs ${className}`}>
        {children}
      </div>
    </TabContext.Provider>
  );
}

// Componente individual de Tab
export function Tab({ 
  value, 
  children, 
  disabled = false, 
  className = "" 
}) {
  const { activeTab, onTabChange, variant } = useTabContext();
  
  const isActive = activeTab === value;
  
  const baseClasses = "px-1 py-3 font-medium text-sm transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focues:border-sky-950";
  
  const variantClasses = {
    underline: isActive 
      ? "text-blue-800 border-b-2 border-blue-800"
      : "text-black hover:text-blue-700",
    boxed: isActive 
      ? "text-blue-600 border border-blue-600 rounded-md bg-blue-50" 
      : "text-blue-800 border border-transparent rounded-md hover:text-blue-700 hover:border-blue-200"
  };
  
  const disabledClasses = "text-gray-400 cursor-not-allowed";
  
  const classes = disabled 
    ? `${baseClasses} ${disabledClasses} ${variant === "underline" ? "border-b border-gray-300" : ""}`
    : `${baseClasses} ${variantClasses[variant]}`;

  const handleClick = () => {
    if (!disabled) {
      onTabChange(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${classes} ${className}`}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

// Componente para el contenido de las tabs
export function TabContent({ value, children, className = "" }) {
  const { activeTab } = useTabContext();
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <div className={`tab-content ${className}`} role="tabpanel">
      {children}
    </div>
  );
}

// Componente para agrupar las tabs
export function TabList({ children, className = "" }) {
  return (
    <div className={`tab-list flex space-x-6 ${className}`} role="tablist">
      {children}
    </div>
  );
}