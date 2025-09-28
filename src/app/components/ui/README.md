# Componentes UI: Input y Button

Estos componentes están listos para cubrir los casos de uso más comunes del portal. A continuación se resumen las props clave y ejemplos de uso para facilitar su adopción en nuevas pantallas.

## `<Input />`

Props destacadas:

- `size`: `"sm" | "md" | "lg"` para ajustar el padding y tamaño de fuente.
- `error`: `boolean` o `string`. Si es `true`, el campo mostrará estilos de error. Si se pasa un texto (`string`) se usará como mensaje de error.
- `errorMessage`: texto de error explícito. Útil cuando `error` es `true` y el mensaje proviene de otra fuente.
- `helperText`: texto informativo que aparece debajo del campo cuando no hay error.
- `disabled`: aplica estilos atenuados y bloquea la interacción.
- `className`: permite añadir clases adicionales a la entrada.

```jsx
import Input from "./Input";

function FormEjemplo() {
  return (
    <form className="space-y-4">
      <Input placeholder="Buscar vacantes" />
      <Input size="sm" helperText="Usa palabras clave" />
      <Input
        size="lg"
        error
        errorMessage="Este campo es obligatorio"
        placeholder="Correo electrónico"
      />
      <Input disabled placeholder="Solo lectura" />
    </form>
  );
}
```

> Nota: el componente gestiona `aria-invalid` y `aria-describedby` automáticamente, por lo que los lectores de pantalla reciben el estado y mensaje correcto.

## `<Button />`

Props destacadas:

- `variant`: `"primary" | "secondary" | "ghost"` para controlar el estilo.
- `size`: `"sm" | "md" | "lg"` para ajustar padding y tipografía.
- `disabled`: fuerza el botón a estado inactivo.
- `loading`: muestra un spinner y bloquea la interacción del usuario (`aria-busy`).
- `fullWidth`: expande el botón al ancho total del contenedor.
- `className`: clases adicionales para personalizaciones puntuales.

```jsx
import Button from "./Button";

function AccionesVacante() {
  return (
    <div className="space-y-3">
      <Button onClick={handlePostularse}>¡Postularme!</Button>
      <Button variant="secondary" size="sm">Guardar búsqueda</Button>
      <Button variant="ghost" fullWidth>Ver más opciones</Button>
      <Button loading>Enviando postulación...</Button>
      <Button disabled>Acción no disponible</Button>
    </div>
  );
}
```

Estos ejemplos pueden copiarse en Storybook o MDX según se requiera para dejar una referencia visual.
