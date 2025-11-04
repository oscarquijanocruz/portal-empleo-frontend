# Backend Integration Guide

## Endpoints Requeridos

### Jobs
- `GET /api/jobs` - Lista todos los trabajos
  - Response: `{ data: Job[] }`
- `GET /api/jobs/:id` - Detalle de trabajo
  - Response: `{ data: Job }`
- `POST /api/jobs/search` - Búsqueda con filtros
  - Body: `{ searchTerm?, modalidad?, sueldo?, tipoContrato?, categoria? }`
  - Response: `{ data: Job[] }`

### Applications
- `GET /api/applications/candidate/:id` - Postulaciones del candidato
  - Response: `{ data: Application[] }` 
  - IMPORTANTE: Incluir datos del job relacionado en cada application
- `POST /api/applications` - Crear postulación
  - Body: `{ candidateId, jobId }`
  - Response: `{ data: Application }`
- `PATCH /api/applications/:id/status` - Actualizar estado
  - Body: `{ estado, notas? }`
  - Response: `{ data: Application }`

### Messages - Falta completar/no implementar hasta se revise
- `GET /api/messages/user/:id` - Mensajes del usuario
  - Response: `{ data: Message[] }`
  - IMPORTANTE: Incluir información del sender completa
- `POST /api/messages` - Enviar mensaje
  - Body: `{ senderId, receiverId, content, hasAttachment? }`
  - Response: `{ data: Message }`

### Notifications
- `GET /api/notifications/user/:id` - Notificaciones del usuario
  - Response: `{ data: Notification[] }`
- `PATCH /api/notifications/:id/read` - Marcar como leída
  - Response: `{ data: Notification }`

## Data Contracts

Ver `src/app/services/dataContracts.js` para estructura exacta.

### Cambios importantes vs mockData:
1. **Applications**: Opcionalmente incluir job completo para evitar múltiples requests
2. **Messages**: Estructura de `conversation` como array, sender como objeto completo <- por implementar todvía

## Cambio para Activar Backend - Falta implementar todavía(de momento no se usa)

En `src/app/services/dataService.js`:
```javascript
const USE_MOCK = false; // ← Cambiar esto
```

## Notas Técnicas

### Formatos de Fecha
- Todos los campos de fecha deben ser ISO 8601: `"2025-01-15T10:30:00Z"`
- El frontend los convertirá a Date objects automáticamente

### Manejo de Errores
- Todos los endpoints deben retornar formato consistente:
```javascript
// Success
{ data: [...], success: true }

// Error
{ error: "mensaje", code: "ERROR_CODE", success: false }
```

### Paginación (Futuro)
Preparar endpoints para soportar:
```javascript
GET /api/jobs?page=1&limit=20
Response: { data: Job[], total: 100, page: 1, totalPages: 5 }
```