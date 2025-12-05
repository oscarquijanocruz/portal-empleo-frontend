# BACKEND INTEGRATION GUIDE — Gestión de Usuarios

Este documento especifica los endpoints, contratos de respuesta, convenciones y ejemplos para integrar el módulo de **Gestión de Usuarios** con el backend, reemplazando el mockData actualmente usado en el componente. Incluye operaciones de **listar**, **filtrar**, **crear**, **editar** y **eliminar usuarios**, además de los catálogos necesarios.

> **TL;DR**
> - Respuestas exitosas: `{ data: <payload>, success: true }`
> - Errores: `{ error: { code, message, details? }, success: false }`
> - Fechas: **ISO 8601 string (UTC)**.
> - El listado `/users` debe soportar filtros por **nombre, estado, tipo, fecha, ubicación**.
> - Crear y editar usuarios usan el mismo contrato base.
> - Eliminar usuarios NO elimina físicamente → `estado = "Inactivo"` (recomendado).

---

## 0) Convenciones generales

**Formato de respuesta (éxito)**
```json
{ "data": <payload>, "success": true }

Formato de respuesta (error)

{ "error": { "code": "string", "message": "string", "details": null }, "success": false }


Fechas

Todas deben enviarse/recibirse como ISO 8601, ej:

"2025-03-12T00:00:00Z"


Paginación

{
  "data": [...],
  "pagination": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 },
  "success": true
}

