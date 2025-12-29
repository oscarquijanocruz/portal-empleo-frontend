"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const isValid = await authService.validateToken();
        
        if (isValid) {
          const profile = await authService.getProfile();
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          // Token inválido, limpiar
          authService.removeToken();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      authService.removeToken();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (correo, contrasena) => {
    try {
      const response = await authService.login(correo, contrasena);
      
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const registerEmpresa = async (empresaData) => {
    try {
      const response = await authService.registerEmpresa(empresaData);
      
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = (tipoUsuario = 'candidato') => {
    authService.loginWithGoogle(tipoUsuario);
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    registerEmpresa,
    loginWithGoogle,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  
  return context;
};
