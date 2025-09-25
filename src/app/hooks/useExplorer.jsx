//logica para explorar

'use client'
import { useState } from 'react';

export const useExplorer = () => {
  // Inicializar desde localStorage
  const [explorer, setExplorer] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('jobExplorer');
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch (error) {
        console.error('Error loading new jobs:', error);
        return new Set();
      }
    }
    return new Set();
  });

  const explorerCount = explorer.size;

  return {
    explorer,
    explorerCount
  };
};