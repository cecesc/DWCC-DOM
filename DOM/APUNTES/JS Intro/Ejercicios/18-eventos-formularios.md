# Eventos y formularios

[Teoría: eventos y formularios](../Teoría/18-eventos-formularios.md)

**Prerrequisitos:** temas 01–17. Trabaja sobre una página independiente; no necesitas el catálogo del proyecto.

Usa como punto de partida este HTML. Puedes añadir atributos o elementos si una actividad lo pide.

```html
<form id="formulario">
  <label for="nombre">Nueva tarea</label>
  <input id="nombre" name="nombre" required maxlength="80" aria-describedby="mensaje">
  <button type="submit">Añadir</button>
</form>
<p id="mensaje" role="status"></p>
<ul id="tareas"></ul>
<script src="./app.js" defer></script>
```

## 1. Envío accesible

Registra un manejador para `submit` que evite la recarga y muestre en `#mensaje` el valor limpio del campo. Prueba enviarlo con Intro, no solo haciendo clic.

**Resultado esperado:** la página no recarga y ambos métodos de envío producen el mismo mensaje.

## 2. Dos niveles de validación

Conserva `required` y `maxlength`. Añade JavaScript para que un valor formado solo por espacios no se acepte: anuncia el problema en `#mensaje` y devuelve el foco al campo.

**Resultado esperado:** el navegador bloquea el campo vacío; una cadena de espacios recibe un mensaje específico; una tarea válida se confirma.

**Pregunta:** ¿por qué estas comprobaciones no bastarían antes de guardar la tarea en un servidor?

## 3. Estado separado del DOM

Mantén un array de tareas con `{ id, nombre }`. Para cada envío válido, añade una tarea y crea un `<li>` con su texto y un botón `Eliminar`. No deduzcas el array leyendo el contenido de la lista.

**Resultado esperado:** dos tareas con el mismo nombre aparecen como elementos diferentes y cada una tiene un identificador propio en `data-id`.

## 4. Delegación de borrado

Coloca un único manejador `click` en `#tareas`, no uno por botón. Usa `target`, `closest`, `dataset` y una búsqueda por identificador para borrar solo la tarea pulsada.

**Resultado esperado:** después de crear tres tareas, borrar la del medio conserva las otras dos; un clic dentro de un contenido anidado en el botón sigue funcionando.

## 5. Propagación observada

Añade temporalmente manejadores `click` al botón de borrar, al `<li>` y a la lista que escriban qué elemento escucha y qué elemento fue `target`. Pulsa el botón y registra el orden. Retira el manejador del botón y deja solo delegación.

**Resultado esperado:** distingues `currentTarget` de `target` y explicas por qué el clic llega a la lista. No uses `stopPropagation()` como solución.

## 6. Varios campos con `FormData`

Añade un `select` con `name="prioridad"` y una casilla con `name="urgente"`. En el envío, inspecciona `new FormData(formulario)` y construye un objeto de tarea que convierta explícitamente lo necesario.

**Resultado esperado:** la prioridad se recoge por su `name`; compruebas que la casilla no se trata igual que un texto y que la tarea nueva conserva esos datos. Mantén el foco en el campo de nombre después de añadirla.
