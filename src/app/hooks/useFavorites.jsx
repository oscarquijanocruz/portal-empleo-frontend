'use client'
import { useState, useCallback } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = useCallback((jobId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(jobId)) {
        newFavorites.delete(jobId);
      } else {
        newFavorites.add(jobId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((jobId) => {
    return favorites.has(jobId);
  }, [favorites]);

  const getFavoriteJobs = useCallback((allJobs) => {
    return allJobs.filter(job => favorites.has(job.id));
  }, [favorites]);

  const favoriteCount = favorites.size;

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteJobs,
    favoriteCount
  };
};