// src/app/hooks/useMessageFavorites.jsx
'use client'
import { useState, useCallback, useEffect } from 'react';

/**
 * Hook para gestionar favoritos de mensajes
 * 
 * ARQUITECTURA:
 * - Ahora: usa localStorage (fase de desarrollo con mock data)
 * - Después: cambiamos solo las funciones internas para usar API
 * - La UI nunca cambia porque la interfaz del hook es la misma
 * 
 * VENTAJAS:
 * - Separación de responsabilidades
 * - Fácil testeo
 * - Sin dependencias directas en componentes
 * - Migración suave a backend
 */

const STORAGE_KEY = 'messageFavorites';

// ============================================
// CAPA DE STORAGE - CAMBIAR ESTO EN EL FUTURO
// ============================================

class StorageAdapter {
  // Método actual: localStorage
  static async getFavorites() {
    if (typeof window === 'undefined') return new Set();
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (error) {
      console.error('Error loading message favorites:', error);
      return new Set();
    }
  }

  static async saveFavorites(favorites) {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
      return true;
    } catch (error) {
      console.error('Error saving message favorites:', error);
      return false;
    }
  }

  static async toggleFavorite(messageId) {
    const favorites = await this.getFavorites();
    
    if (favorites.has(messageId)) {
      favorites.delete(messageId);
    } else {
      favorites.add(messageId);
    }
    
    await this.saveFavorites(favorites);
    return favorites;
  }

  /* 
   * MIGRACIÓN FUTURA - Reemplazar métodos arriba con estos:
   * 
   * static async getFavorites() {
   *   const response = await fetch('/api/messages/favorites');
   *   const data = await response.json();
   *   return new Set(data.favoriteIds);
   * }
   * 
   * static async saveFavorites(favorites) {
   *   const response = await fetch('/api/messages/favorites', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ favoriteIds: [...favorites] })
   *   });
   *   return response.ok;
   * }
   * 
   * static async toggleFavorite(messageId) {
   *   const response = await fetch(`/api/messages/${messageId}/favorite`, {
   *     method: 'PATCH'
   *   });
   *   const data = await response.json();
   *   return new Set(data.favoriteIds);
   * }
   */
}

// ============================================
// HOOK PÚBLICO - NUNCA CAMBIAR LA INTERFAZ
// ============================================

export function useMessageFavorites() {
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Cargar favoritos al montar
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      const loadedFavorites = await StorageAdapter.getFavorites();
      setFavorites(loadedFavorites);
      setIsLoading(false);
    };
    
    loadFavorites();
  }, []);

  // Sincronizar con storage cada vez que cambien
  useEffect(() => {
    if (!isLoading) {
      StorageAdapter.saveFavorites(favorites);
    }
  }, [favorites, isLoading]);

  // Toggle favorito
  const toggleFavorite = useCallback(async (messageId) => {
    if (!messageId) return false;
    
    try {
      const updatedFavorites = await StorageAdapter.toggleFavorite(messageId);
      setFavorites(updatedFavorites);
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }, []);

  // Verificar si es favorito
  const isFavorite = useCallback((messageId) => {
    return messageId ? favorites.has(messageId) : false;
  }, [favorites]);

  // Obtener mensajes favoritos de una lista
  const getFavoriteMessages = useCallback((allMessages) => {
    return allMessages.filter(msg => favorites.has(msg.id));
  }, [favorites]);

  // Marcar como favorito
  const addFavorite = useCallback(async (messageId) => {
    if (!messageId || favorites.has(messageId)) return false;
    
    const newFavorites = new Set(favorites);
    newFavorites.add(messageId);
    setFavorites(newFavorites);
    return true;
  }, [favorites]);

  // Quitar de favoritos
  const removeFavorite = useCallback(async (messageId) => {
    if (!messageId || !favorites.has(messageId)) return false;
    
    const newFavorites = new Set(favorites);
    newFavorites.delete(messageId);
    setFavorites(newFavorites);
    return true;
  }, [favorites]);

  // Limpiar todos los favoritos
  const clearAllFavorites = useCallback(async () => {
    setFavorites(new Set());
    await StorageAdapter.saveFavorites(new Set());
  }, []);

  return {
    // Estado
    favorites,
    favoriteCount: favorites.size,
    isLoading,
    
    // Métodos principales
    toggleFavorite,
    isFavorite,
    getFavoriteMessages,
    
    // Métodos auxiliares
    addFavorite,
    removeFavorite,
    clearAllFavorites,
  };
}

// ============================================
// EJEMPLO DE USO EN COMPONENTES
// ============================================

/*
// En MessageCard.jsx o MessageDetail.jsx

import { useMessageFavorites } from '@/app/hooks/useMessageFavorites';

function MyComponent() {
  const { 
    isFavorite, 
    toggleFavorite, 
    isLoading 
  } = useMessageFavorites();

  return (
    <button 
      onClick={() => toggleFavorite(message.id)}
      disabled={isLoading}
    >
      <Star 
        fill={isFavorite(message.id) ? "currentColor" : "none"}
      />
    </button>
  );
}
*/

// ============================================
// MIGRACIÓN A BACKEND - CHECKLIST
// ============================================

/*
PASO 1: Backend crea endpoints
  POST   /api/messages/favorites
  GET    /api/messages/favorites
  PATCH  /api/messages/:id/favorite

PASO 2: Reemplazar StorageAdapter (arriba)
  - getFavorites() → fetch GET
  - saveFavorites() → fetch POST
  - toggleFavorite() → fetch PATCH

PASO 3: (Opcional) Agregar optimistic updates
  const toggleFavorite = useCallback(async (messageId) => {
    // 1. Actualizar UI inmediatamente
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(messageId) ? next.delete(messageId) : next.add(messageId);
      return next;
    });
    
    // 2. Sincronizar con backend
    try {
      await StorageAdapter.toggleFavorite(messageId);
    } catch (error) {
      // 3. Revertir en caso de error
      setFavorites(prev => {
        const next = new Set(prev);
        next.has(messageId) ? next.delete(messageId) : next.add(messageId);
        return next;
      });
    }
  }, []);

PASO 4: Testing
  - Probar con mock data
  - Probar con backend real
  - Probar casos de error
  
RESULTADO: La UI nunca cambia, solo la implementación interna
*/