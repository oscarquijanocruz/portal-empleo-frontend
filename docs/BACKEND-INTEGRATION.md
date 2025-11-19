
# BACKEND INTEGRATION GUIDE — Proyecto Mentory

Este documento especifica los endpoints, contratos de respuesta, convenciones y ejemplos para integrar el Front con el Back **sin mockData**. Incluye los módulos nuevos de **Messages** y **Notificaciones de Usuario**, y ajustes menores acordados para Jobs y Applications.

> **TL;DR**
> - Respuestas exitosas: `{ data: <payload>, success: true }`
> - Errores: `{ error: { code, message, details? }, success: false }`
> - **Fechas**: siempre **ISO 8601 string (UTC)**.
> - **Applications GET**: debe regresar el objeto `job` embebido.
> - **Jobs search**: `tipoContrato` → **`jornada`**. Sueldo: **rango** (`sueldoMinimo/sueldoMaximo`) y/o **bucket** (`salarioBucket`).

---

## 0) Convenciones generales

**Formato de respuesta (éxito)**
```json
{ "data": <payload>, "success": true }
```

**Formato de respuesta (error)**
```json
{ "error": { "code": "string", "message": "string", "details": null }, "success": false }
```

**Fechas**
- Todas las fechas deben ser strings en formato **ISO 8601 (UTC)**, por ejemplo: `"2025-01-22T09:10:00Z"`.

**Paginación (cuando aplique)**
```json
{
  "data": [...],
  "pagination": { "page": 1, "limit": 20, "total": 134, "totalPages": 7 },
  "success": true
}
```

**Códigos de error sugeridos**
- `VALIDATION_ERROR` (400)
- `NOT_FOUND` (404)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `CONFLICT` (409)
- `RATE_LIMITED` (429)
- `INTERNAL_ERROR` (500)

---

## 1) Endpoints requeridos

### Jobs
- `POST /api/jobs/search`
- `GET /api/jobs/:id`

### Applications (Mis Empleos)
- `GET /api/applications/candidate/:candidateId` **(Debe regresar `job` embebido)**
- `PATCH /api/applications/:id/status`

### Messages (nuevo) - **Falta corroborar si esta bien 
- `POST /api/messages/conversations` (crear conversación)
- `GET /api/messages/conversations` (listar conversaciones del usuario)
- `GET /api/messages/conversations/:conversationId/messages` (listar mensajes)
- `POST /api/messages/conversations/:conversationId/messages` (enviar mensaje)
- `PATCH /api/messages/:messageId/read` (marcar un mensaje como leído)
- `POST /api/messages/:messageId/attachments` *(opcional)*

### Notificaciones de Usuario (nuevo) - **Falta corroborar si esta bien 
- `GET /api/notifications` (listar notificaciones del usuario autenticado)
- `PATCH /api/notifications/:id/read` (marcar una como leída)
- `PATCH /api/notifications/read-all` (marcar todas como leídas)

---

## 2) Jobs

### 2.1 `POST /api/jobs/search`

**Body (opciones)**
```json
{
  "searchTerm": "frontend",
  "modalidad": "Remoto",  // o id_modalidad_laboral
  "jornada": "Tiempo completo", // o id_jornada
  "salarioFijo": "+50,000",  // opcional si usa buckets
  "sueldoMinimo": 40000,  // opcional (rango)
  "sueldoMaximo": 80000,  // opcional (rango)
  "categoria": "Ingeniería", 
  "page": 1,
  "limit": 20
}
```

**Response 200**
```json
{
  "data": [
 {
      "id": 123,
      "titulo": "Frontend Sr",
      "empresaId": 123,
      "empresa": "TechCorp",
      "urlEmpresaLogo ": "https://...",
      "descripcion": "Texto general de la vacante",
        "responsabilidades": ["Desarrollar features", "Code reviews"],
        "requisitosIndispensables": ["React 3+ años", "TypeScript"],
        "requisitosDeseables": ["Next.js", "TailwindCSS"],
        "beneficios": ["Remoto 100%", "Seguro médico"]
      "ubicacion": "CDMX",
      "modalidad": "Remoto",
      "jornada": "Tiempo completo",
      "sueldoMinimo": 50000,
      "sueldoMaximo": 80000,
      "moneda": "MXN",
      "periodicidad": "Mensual",
      "fechaPublicacion": "2025-01-21T12:00:00Z",
      "esDestacada": false
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 134, "totalPages": 7 },
  "success": true
}
```

> **Nota**: El backend puede aceptar **id o nombre** para `modalidad`/`jornada`. Normalizar en la respuesta a **nombre legible**.

### 2.2 `GET /api/jobs/:id`

**Response 200**
```json
{
  "data": {
    "id": 123,
    "titulo": "Frontend Sr",
    "descripcion": "Texto general de la vacante",
        "responsabilidades": ["Desarrollar features", "Code reviews"],
        "requisitosIndispensables": ["Experiencia 3+ años", "Comunicación profunda"],
        "requisitosDeseables": ["Python", "Java"],
        "beneficios": ["Sueldo Competitivo", "Seguro médico"]
    "ubicacion": "CDMX",
    "modalidad": "Remoto",
    "jornada": "Tiempo completo",
    "sueldoMinimo": 50000,
    "sueldoMaximo": 80000,
    "moneda": "MXN",
    "periodicidad": "Mensual",
    "fechaPublicacion": "2025-01-21T12:00:00Z",
    "esDestacada": false
  },
  "success": true
}
```

---

## 3) Applications (Mis Empleos)

### 3.1 `GET /api/applications/candidate/:candidateId`
**Debe incluir `job` embebido** para evitar N+1 en el front.

**Response 200**
```json
{
  "data": [
    {
      "id": 10,
      "candidateId": 456,
      "jobId": 123,
      "estadoPostulacion": "En revisión",
      "fechaPostulacion": "2025-01-15T10:30:00Z",
      "fechaActualizacion": "2025-01-20T12:00:00Z",
      "notas": "",
      "createdAtAdmin": "2025-01-15T10:30:00Z",
      "job": {
        "id": 123,
        "titulo": "Frontend Sr",
        "modalidad": "Remoto",
        "jornada": "Tiempo completo",
        "sueldoMinimo": 50000,
        "sueldoMaximo": 80000,
        "moneda": "MXN",
        "fechaPublicacion": "2025-01-21T12:00:00Z"
      }
    }
  ],
  "success": true
}
```

### 3.2 `PATCH /api/applications/:id/status`

**Body**
```json
{ "estadoPostulacion": "Entrevista", "notas": "Agenda con RH" }
```

**Response 200**
```json
{
  "data": {
    "id": 10,
    "estadoPostulacion": "Entrevista",
    "fechaActualizacion": "2025-01-22T09:10:00Z",
    "notas": "Agenda con RH",
    "job": {
      "id": 123,
      "titulo": "Frontend Sr"
    }
  },
  "success": true
}
```

> Al actualizar el estado, el backend **debe** actualizar `fechaActualizacion` y **debería** generar una notificación para el candidato (ver módulo de Notificaciones).

---

## 4) Messages (nuevo)
 
Basado en las tablas: `conversaciones`, `conversacion_participantes`, `mensajes` y `mensajes_adjuntos` *(opcional)*.

**Convenciones**
- `preview`: calculado por backend (primeros ~120 caracteres del `content` sin saltos de línea).
- `unreadCount`: cantidad de mensajes no leídos por el usuario en ese hilo.
- Todas las fechas en ISO 8601 (UTC).

### 4.1 `POST /api/messages/conversations` — crear conversación

**Body**
```json
{
  "participantIds": [50, 123],
  "asunto": "Proceso vacante Frontend",
  "context": { "jobId": 123, "applicationId": 10 }
}
```

**Response 201**
```json
{
  "data": {
    "id": 99,
    "asunto": "Proceso vacante Frontend",
    "participants": [
      { "id": 50, "name": "Ana" },
      { "id": 123, "name": "Luis" }
    ],
    "createdAt": "2025-01-21T15:25:00Z",
    "readAt": "2025-01-22T09:12:00Z",
    "lastMessage": null
  },
  "success": true
}
```

### 4.2 `GET /api/messages/conversations` — listar conversaciones del usuario actual

**Query**: `?page=1&limit=20`

**Response 200**
```json
{
  "data": [
    {
      "id": 99,
      "asunto": "Proceso vacante Frontend",
      "participants": [
        { "id": 50, "name": "Ana" },
        { "id": 123, "name": "Luis" }
      ],
      "lastMessage": {
        "id": 3001,
        "senderId": 50,
        "sender": {
            "name": "Ana García",
            "position": "Recruiter",
            "company": "TechCorp",
            "avatar": "https://..."
        },
        "content": "Hola...",
        "date": "2025-01-21T15:30:00Z",
        "isRead": false,
        "hasAttachment": false
      },
      "unreadCount": 2
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 4, "totalPages": 1 },
  "success": true
}
```

### 4.3 `GET /api/messages/conversations/:conversationId/messages` — listar mensajes del hilo

**Query**: `?page=1&limit=50`

**Response 200**
```json
{
  "data": [
    {
      "id": 3001,
      "senderId": 50,
      "content": "Hola, ¿puedes tomar una llamada mañana?",
      "date": "2025-01-21T15:30:00Z",
      "isRead": false,
      "hasAttachment": false
    }
  ],
  "pagination": { "page": 1, "limit": 50, "total": 1, "totalPages": 1 },
  "success": true
}
```

### 4.4 `POST /api/messages/conversations/:conversationId/messages` — enviar mensaje

**Body**
```json
{
  "content": "Perfecto, mañana a las 10am.",
  "hasAttachment": false
}
```

**Response 201**
```json
{
  "data": {
    "id": 3002,
    "senderId": 123,
    "content": "Perfecto, mañana a las 10am.",
    "preview": "Perfecto, mañana a las 10am.",
    "date": "2025-01-21T16:05:00Z",
    "isRead": false,
    "hasAttachment": false
  },
  "success": true
}
```

### 4.5 `PATCH /api/messages/:messageId/read` — marcar mensaje como leído

**Body**
```json
{ "isRead": true }
```

**Response 200**
```json
{ "data": { "id": 3001, "isRead": true, "readAt": "2025-01-21T16:10:00Z" }, "success": true }
```

### 4.6 `POST /api/messages/:messageId/attachments` — (opcional)

**Descripción**
- `multipart/form-data` con archivo.
- La API guarda el archivo y lo asocia al mensaje.

**Response 201**
```json
{ "data": { "id": 9001, "nombreArchivo": "cv.pdf", "urlArchivo": "https://...", "formato": "pdf" }, "success": true }
```

---

## 5) Notificaciones de Usuario (nuevo)

**Diferentes de las notificaciones globales.** Se muestran en el dashboard del usuario y pueden dispararse por: nueva vacante relevante, cambio de estado de postulación, mensaje recibido, etc.

### 5.1 `GET /api/notifications`

**Query**: `?page=1&limit=20&onlyUnread=true` *(opcional)*

**Response 200**
```json
{
  "data": [
    {
      "id": 7001,
      "tipo": "Informativa",
      "titulo": "Tu postulación avanzó",
      "mensaje": "La postulación a 'Frontend Sr' pasó a Entrevista.",
      "action": {
        "type": "open_application",
        "applicationId": 10,
        "jobId": 123
        }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 8, "totalPages": 1 },
  "success": true
}
```

### 5.2 `PATCH /api/notifications/:id/read`

**Body**
```json
{ "isRead": true }
```

**Response 200**
```json
{ "data": { "id": 7001, "isRead": true, "readAt": "2025-01-22T09:12:00Z" }, "success": true }
```

### 5.3 `PATCH /api/notifications/read-all`

**Response 200**
```json
{ "data": { "updated": 8 }, "success": true }
```

---

## 6) Catálogos (OBLIGATORIOS)

Estos endpoints deben estar disponibles para poblar dropdowns/filtros.
El frontend los cargará una vez al inicio y los almacenará en memoria.

- `GET /api/catalogs/modalidades` → ["Remoto", "Híbrido", "Presencial"]
- `GET /api/catalogs/jornadas` → ["Tiempo completo", "Medio tiempo", ...]
- `GET /api/catalogs/categorias` → ["Ingeniería", "Ventas", ...]
- `GET /api/catalogs/estados-postulacion` → ["En revisión", "Entrevista", ...]

**Response 200 (ejemplo)**
```json
{
  "data": [
    { "id": 1, "nombre": "Presencial" },
    { "id": 2, "nombre": "Híbrido" },
    { "id": 3, "nombre": "Remoto" }
  ],
  "success": true
}
```

---

## 7) Notas de implementación (backend)

- Normalizar `modalidad/jornada` a **nombre legible** en las respuestas.
- `preview` de mensajes: truncar a ~120 caracteres removiendo saltos de línea.
- Mantener/Calcular `unreadCount` por conversación (materializado o calculado on the fly).
- En `PATCH /api/applications/:id/status`:
  - actualizar `fechaActualizacion`,
  - generar notificación para el candidato (`open_application` con `metadata.applicationId` y `jobId`).
- Validar que **todas las fechas** salgan como strings ISO 8601 (UTC).
