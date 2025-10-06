// Logica  de uardar/cargar datos del candidato en el backend
export function useCandidateForm() {
  
  // 1. Guardar cada paso en el backend
  const saveStepData = async (step, data) => {
    try {
      const response = await fetch('/api/candidate/save-step', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Si usas auth: 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          step, 
          data,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) throw new Error('Error al guardar');
      
      return await response.json();
    } catch (error) {
      console.error('Error guardando paso:', error);
      throw error;
    }
  };

  // 2. Guardar todo al final
  const saveFinalData = async (data) => {
    try {
      const response = await fetch('/api/candidate/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Error al guardar perfil');
      
      return await response.json();
    } catch (error) {
      console.error('Error guardando perfil completo:', error);
      throw error;
    }
  };

  // 3. Cargar datos existentes (si el usuario ya llenó el form antes)
  const loadCandidateData = async () => {
    try {
      const response = await fetch('/api/candidate/profile');
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error cargando datos:', error);
      return null;
    }
  };

  // 4. Guardar borrador en localStorage (respaldo)
  const saveDraft = (data) => {
    try {
      localStorage.setItem('candidateFormDraft', JSON.stringify(data));
    } catch (error) {
      console.error('Error guardando borrador:', error);
    }
  };

  // 5. Cargar borrador de localStorage
  const loadDraft = () => {
    try {
      const draft = localStorage.getItem('candidateFormDraft');
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.error('Error cargando borrador:', error);
      return null;
    }
  };

  // 6. Limpiar borrador
  const clearDraft = () => {
    localStorage.removeItem('candidateFormDraft');
  };

  return {
    saveStepData,
    saveFinalData,
    loadCandidateData,
    saveDraft,
    loadDraft,
    clearDraft
  };
}