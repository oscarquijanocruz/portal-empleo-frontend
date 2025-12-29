// Servicio de autenticación para comunicarse con el backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class AuthService {
  /**
   * Login con credenciales
   * @param {string} correo - Correo electrónico del usuario
   * @param {string} contrasena - Contraseña del usuario
   * @returns {Promise<Object>} - Respuesta con token y datos del usuario
   */
  async login(correo, contrasena) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token en localStorage
      if (data.access_token) {
        this.setToken(data.access_token);
      }

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Registro de usuario
   * @param {Object} userData - Datos del usuario (correo, contrasena, tipo_usuario)
   * @returns {Promise<Object>} - Respuesta con token y datos del usuario
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      // Guardar token en localStorage
      if (data.access_token) {
        this.setToken(data.access_token);
      }

      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  /**
   * Registro de empresa con todos sus datos
   * @param {Object} empresaData - Datos completos de la empresa
   * @returns {Promise<Object>} - Respuesta con token, usuario y empresa
   */
  async registerEmpresa(empresaData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/register/empresa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empresaData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar empresa');
      }

      // Guardar token en localStorage
      if (data.access_token) {
        this.setToken(data.access_token);
      }

      // Guardar datos del usuario
      if (data.user) {
        this.setUser(data.user);
      }

      return data;
    } catch (error) {
      console.error('Error en registro de empresa:', error);
      throw error;
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   * @returns {Promise<Object>} - Datos del usuario
   */
  async getProfile() {
    try {
      const token = this.getToken();
      
      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener perfil');
      }

      return data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  }

  /**
   * Validar token actual
   * @returns {Promise<boolean>} - true si el token es válido
   */
  async validateToken() {
    try {
      const token = this.getToken();
      
      if (!token) {
        return false;
      }

      const response = await fetch(`${API_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error al validar token:', error);
      return false;
    }
  }

  /**
   * Logout - eliminar token
   */
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Alias para logout - eliminar token
   */
  removeToken() {
    this.logout();
  }

  /**
   * Guardar token en localStorage
   * @param {string} token - JWT token
   */
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  /**
   * Obtener token de localStorage
   * @returns {string|null} - JWT token o null
   */
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Iniciar OAuth con Google
   */
  loginWithGoogle(tipoUsuario = 'candidato') {
    // Redirigir al backend para iniciar OAuth
    window.location.href = `${API_URL}/api/auth/google?tipo=${tipoUsuario}`;
  }

  /**
   * Guardar datos del usuario en localStorage
   * @param {Object} user - Datos del usuario
   */
  setUser(user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  /**
   * Obtener datos del usuario de localStorage
   * @returns {Object|null} - Datos del usuario o null
   */
  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}

// Exportar una instancia única del servicio (Singleton)
const authService = new AuthService();
export default authService;
