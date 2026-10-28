# DOM: JavaScript en la página

[Ejercicios: DOM](../Ejercicios/17-dom.md)

**Prerrequisitos:** temas 01–16, especialmente arrays, funciones y módulos. Este tema empieza la parte de navegador: `document`, DOM, eventos y almacenamiento son APIs del navegador, no elementos del lenguaje ECMAScript. Por eso un archivo ejecutado con Node no tiene el `document` de la página.

## Cargar JavaScript en el momento correcto

| Etiqueta | Comportamiento |
|---|---|
| `<script src="./app.js"></script>` | Detiene el análisis del HTML mientras descarga y ejecuta el archivo. |
| `<script src="./app.js" defer></script>` | Descarga sin bloquear; ejecuta tras analizar el HTML y conserva el orden entre scripts diferidos. |
| `<script src="./app.js" async></script>` | Ejecuta al estar disponible; no conserva orden ni garantiza un DOM terminado. |
| `<script type="module" src="./app.js"></script>` | Permite `import`/`export`, usa modo estricto y se difiere por defecto. |

`defer` sirve para scripts clásicos externos, no para código clásico incluido en línea. Los proyectos de esta ruta usan módulos, así que no necesitan añadir `defer`. `DOMContentLoaded` indica que el documento se analizó y que scripts diferidos y módulos no asíncronos ya se ejecutaron; no espera las imágenes.

## El DOM: un árbol de nodos

El navegador convierte el HTML en un árbol de objetos llamado **Document Object Model**. JavaScript puede localizar nodos, cambiar su texto, atributos o clases, crear otros y conectarlos al árbol. Selecciona solo lo que vayas a usar y trata el posible `null` como un problema de contrato entre HTML y JavaScript.

Guarda estos dos archivos juntos para una demostración mínima:

**`index.html`**
```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Inventario</title>
  <script src="./app.js" defer></script>
</head>
<body>
  <h1>Inventario</h1>
  <p id="resumen"></p>
  <ul id="inventario"></ul>
</body>
</html>
```

**`app.js`**
```js
const lista = document.querySelector("#inventario");
const resumen = document.querySelector("#resumen");
const objetos = ["Mapa", "Poción", "Llave"];

if (!lista || !resumen) {
  throw new Error("Falta un elemento del inventario en el HTML.");
}

for (const nombre of objetos) {
  const elemento = document.createElement("li");
  elemento.textContent = nombre;
  elemento.classList.add("objeto");
  lista.append(elemento);
}

resumen.textContent = `${objetos.length} objetos`;
```

Al abrirlo se ven tres elementos. `querySelector` devuelve el primer elemento que coincide o `null`; `querySelectorAll` devuelve una `NodeList` estática, que no se actualiza por añadir nodos después.

## Operaciones frecuentes

- `textContent` lee o sustituye texto.
- `classList.add`, `remove` y `toggle` cambian una clase sin borrar las demás.
- `createElement` crea un nodo y `append` lo incorpora.
- `elemento.remove()` retira ese nodo.
- `lista.replaceChildren()` vacía los hijos; con argumentos, los reemplaza.
- `setAttribute` establece atributos; para propiedades conocidas como `disabled`, suele ser más claro usar la propiedad (`boton.disabled = true`).
- `data-id` se consulta como `elemento.dataset.id`; su valor siempre es texto.

Mantén el **estado** como datos JavaScript y usa una función para dibujarlo. No intentes recuperar los datos leyendo el texto que ya pintaste: el DOM es la representación, no la fuente de verdad.

## Texto seguro y accesibilidad

El contenido externo o escrito por una persona es texto, no HTML. Inserta nombres mediante `textContent`, nunca concatenándolos en `innerHTML`: este interpreta etiquetas y puede abrir una vulnerabilidad XSS. Que un dato llegue desde tu servidor no lo vuelve automáticamente confiable.

Da a cada control un nombre accesible: un `<label for>` para un campo y texto o `aria-label` para un botón cuyo propósito no sea evidente. Cuando el resultado cambie sin mover el foco, una zona con `role="status"` puede anunciarlo a tecnologías de asistencia. Los detalles se practican en el tema siguiente.

## Depurar en el navegador

1. En **Consola**, lee el primer error y su archivo y línea, no solo el último mensaje.
2. En **Elementos**, comprueba que el selector corresponde con el HTML y que el nodo contiene lo esperado.
3. En **Fuentes / Sources**, coloca un breakpoint dentro de un bucle e inspecciona las variables y el nodo.
4. En **Red / Network**, verifica que `app.js` responde correctamente y no contiene una página HTML de error.

Un breakpoint permite observar el estado antes de una instrucción sin llenar el programa de `console.log`. Para una aplicación que une DOM, eventos, red y almacenamiento consulta el [proyecto de catálogo con favoritos](../Proyectos/02-catalogo-favoritos.md); aquí solo se ha mostrado un ejemplo independiente.
