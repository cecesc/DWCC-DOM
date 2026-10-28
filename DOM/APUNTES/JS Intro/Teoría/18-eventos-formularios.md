# Eventos y formularios

[Ejercicios: eventos y formularios](../Ejercicios/18-eventos-formularios.md)

**Prerrequisitos:** temas 01–17. Un evento comunica que algo ha ocurrido: un clic, una pulsación, un envío o una edición. La interfaz responde cambiando el estado y después el DOM, no mezclando ambos sin criterio.

## Escuchar eventos

`addEventListener(tipo, manejador)` registra una función que el navegador llamará cuando ocurra el evento. Escucha `submit` en el formulario, no solo `click` en su botón: así funciona también la tecla Intro y otras formas accesibles de enviarlo.

Guarda el siguiente HTML en `index.html` y el bloque JavaScript en `app.js`, dentro de la misma carpeta. Es una demostración pequeña de alta de tareas; la delegación se añade después al mismo archivo.

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Eventos y tareas</title>
  <script src="./app.js" defer></script>
</head>
<body>
<form id="formulario">
  <label for="nombre">Nueva tarea</label>
  <input id="nombre" name="nombre" required maxlength="80" aria-describedby="mensaje">
  <button type="submit">Añadir</button>
</form>
<p id="mensaje" role="status"></p>
<ul id="tareas"></ul>
</body>
</html>
```

```js
const formulario = document.querySelector("#formulario");
const campo = document.querySelector("#nombre");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#tareas");
const tareas = [];
let siguienteId = 1;

function renderizar() {
  lista.replaceChildren();
  for (const tarea of tareas) {
    const elemento = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = `${tarea.nombre} `;
    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.id = String(tarea.id);
    boton.textContent = "Eliminar";
    boton.setAttribute("aria-label", `Eliminar ${tarea.nombre}`);
    elemento.append(texto, boton);
    lista.append(elemento);
  }
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const nombre = campo.value.trim();
  if (nombre === "") {
    mensaje.textContent = "Escribe una tarea, no solo espacios.";
    campo.focus();
    return;
  }
  tareas.push({ id: siguienteId++, nombre });
  renderizar();
  mensaje.textContent = `Añadida: ${nombre}`;
  formulario.reset();
  campo.focus();
});
```

`preventDefault()` evita la acción predeterminada —el envío normalmente navega o recarga—, pero **no** detiene la propagación. `input` se dispara al editar; `change` al confirmar un cambio según el control. `campo.value` es un string incluso para muchos controles numéricos; en una casilla se consulta `.checked`.

## Propagación y delegación

Un evento suele viajar por el árbol: en la fase de captura baja desde el documento, llega al objetivo y después burbujea hacia arriba. En un manejador, `evento.target` es el elemento que originó el evento y `evento.currentTarget` el que tiene el manejador ejecutándose. `stopPropagation()` detiene ese viaje; no lo uses para arreglar un diseño sin entenderlo y recuerda que tampoco cancela una acción predeterminada.

La burbuja permite **delegación**: un manejador en una lista gestiona botones actuales y futuros. `closest` evita asumir que el clic fue exactamente sobre el botón.

Añade este manejador al final de `app.js`. Los botones se crean en `renderizar`, pero el manejador se registra una sola vez en `lista`. Los ids vienen de un contador que no retrocede: usar `tareas.length + 1` podría repetir un id después de un borrado.

```js
lista.addEventListener("click", evento => {
  if (!(evento.target instanceof Element)) return;
  const boton = evento.target.closest("button[data-id]");
  if (!boton || !lista.contains(boton)) return;

  const id = Number(boton.dataset.id);
  const indice = tareas.findIndex(tarea => tarea.id === id);
  if (indice === -1) return;
  const [eliminada] = tareas.splice(indice, 1);
  renderizar();
  mensaje.textContent = `Eliminada: ${eliminada.nombre}`;
  campo.focus();
});
```

`dataset.id` siempre devuelve texto: conviértelo y valida su valor antes de usarlo. Una lista puede contener dos nombres iguales, por lo que se necesita un identificador, no el texto del elemento, para decidir cuál borrar.

## Formularios que ayudan sin prometer seguridad

Atributos como `required`, `minlength`, `maxlength`, `type="email"` y `pattern` dan una primera comprobación y mensajes del navegador. Puedes consultar `formulario.checkValidity()` y usar `reportValidity()` cuando quieras mostrar esos mensajes. Añade reglas de dominio que HTML no expresa, como rechazar espacios tras `trim()` o comprobar una combinación de campos.

Para leer varios controles con atributo `name`, `new FormData(formulario)` reúne sus valores y archivos. Convierte y valida cada dato según su contrato; no confíes en que `FormData` entregue números.

La validación de cliente mejora la experiencia, pero se puede modificar o saltar: **el servidor debe validar y autorizar de nuevo** cualquier dato que reciba. Nunca reveles secretos ni bases la seguridad en que un botón esté oculto o desactivado.

## Foco, mensajes y teclado

Después de una acción, conserva o mueve el foco de forma intencionada. Por ejemplo, tras añadir una tarea se puede devolver al campo; tras reconstruir una lista por completo se puede perder el foco de un botón. Usa botones reales para acciones de botón y no asignes atajos de teclado que impidan escribir en campos. `role="status"` anuncia confirmaciones sin robar el foco; el mensaje debe describir el resultado real.

Los ejercicios introducen estos conceptos con una lista corta. El [proyecto de catálogo con favoritos](../Proyectos/02-catalogo-favoritos.md) los combina con petición HTTP, persistencia y estados de carga, sin ser requisito para entender este tema.
