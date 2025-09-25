'use client'
import { useState, useCallback, useEffect } from 'react';

export const useFavorites = () => {
  // ✅ Inicializar desde localStorage
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('jobFavorites');
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch (error) {
        console.error('Error loading favorites:', error);
        return new Set();
      }
    }
    return new Set();
  });

  // ✅ Persistir en localStorage cada vez que cambien los favoritos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('jobFavorites', JSON.stringify([...favorites]));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites]);

  const toggleFavorite = useCallback((jobId) => {
    if (!jobId) return; // ✅ Validación adicional
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(jobId)) {
        newFavorites.delete(jobId);
        console.log(`Removed job ${jobId} from favorites`);
      } else {
        newFavorites.add(jobId);
        console.log(`Added job ${jobId} to favorites`);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((jobId) => {
    return jobId ? favorites.has(jobId) : false;
  }, [favorites]);

  const getFavoriteJobs = useCallback((allJobs) => {
    return allJobs.filter(job => favorites.has(job.id));
  }, [favorites]);

  const favoriteCount = favorites.size;

  // ✅ Función para limpiar todos los favoritos (opcional)
  const clearAllFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteJobs,
    favoriteCount,
    clearAllFavorites
  };
};