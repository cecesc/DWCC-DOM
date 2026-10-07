# Repaso: Manipulación del DOM

[Teoría: Manipulación del DOM](https://fernandoalvarezfp.github.io/DWCC/DOM.html)

Ejercicio único que repasa **todos** los conceptos de la teoría sobre una misma página
(un pequeño inventario). No hace falta crear varios archivos: trabajas sobre `index.html`.

## Archivos

| Archivo | Uso |
| --- | --- |
| `index.html` | Estructura de la página. Al final, el `<script>` apunta a `ejercicio.js`. |
| `estilos.css` | Estilos (`.destacado`, `.activo`, `.oculto`, …). Se enlaza desde `index.html`. |
| `ejercicio.js` | Tu código, con un `// TODO` por apartado. |
| `solucion.js` | Solución completa. Cambia el `<script>` de `index.html` para comparar. |

Abre `index.html` en el navegador (doble clic basta; no hay módulos) y usa la pestaña
**Consola** de las herramientas de desarrollo para comprobar cada resultado.

## Bloques y apartados

### Bloque 1 · Selección de elementos
1. `getElementById("titulo")` → muestra su `textContent`.
2. `getElementsByClassName("item")` → número de elementos.
3. `getElementsByTagName("li")` → recorre con `for...of` mostrando el texto.
4. `querySelector(".item")` y `querySelector("a[href]")`.
5. `querySelectorAll(".item")` → recórrela con `forEach` mostrando el índice.

**Esperado:** 3 objetos iniciales y sus textos (`Mapa`, `Brújula`, `Llave`).
**Para pensar:** `getElementsBy…` devuelve una colección **viva**; `querySelectorAll` devuelve
una `NodeList` **estática**.

### Bloque 2 · Modificación de contenido
1. Escribe en `#resumen` un texto seguro con `textContent`.
2. Inserta HTML en `#contenedor` con `innerHTML`.
3. Muestra `textContent` e `innerText` de `#parrafo-mixto`.

**Esperado:** `textContent` incluye `INVISIBLE`; `innerText` lo omite (respeta el `display:none`).
**Aviso:** `innerHTML` con datos del usuario abre la puerta a XSS.

### Bloque 3 · Atributos
1. Lee `data-peso` del primer item con `getAttribute`.
2. Asigna `src` y `alt` a `#logo` con `setAttribute`.
3. Habilita `#fragil` con `removeAttribute("disabled")`.
4. Comprueba con `hasAttribute` que ya no está deshabilitada.

**Esperado:** el logo se muestra y la casilla vuelve a ser clicable.

### Bloque 4 · Clases CSS
`classList.add` → `remove` → `toggle` → `contains` → `replace` sobre el primer item.

**Esperado:** tras el ciclo completo `contains("activo")` es `false` y la clase final es
`item` (el `replace` se revierte para no romper los selectores `.item`).

### Bloque 5 · Creación y eliminación
1. `createElement` + `appendChild` (añade "Cuerda" al final).
2. `insertBefore` (inserta "Antorcha" al principio).
3. `removeChild` (elimina "Cuerda" desde su padre).
4. `remove()` (añade un `li` temporal y bórralo directamente).
5. `cloneNode(true)` (copia el primer item en `#contenedor`).

**Esperado:** la lista queda `Antorcha`, `Mapa`, `Brújula`, `Llave`.

### Bloque 6 · Navegación por el DOM
`parentElement`, `children`, `childNodes`, `firstElementChild`/`lastElementChild`,
`nextElementSibling`/`previousElementSibling`.

**Para pensar:** `children.length` cuenta solo elementos; `childNodes.length` incluye los
nodos de texto (saltos de línea) → verás un número mayor.

### Bloque 7 · Eventos
1. Al enviar `#formulario`: `preventDefault`, crea el `li`, límpialo y actualiza el resumen.
2. Conecta una función **nombrada** a `#alternar` y quítala luego con `removeEventListener`.
3. `#vaciar` deja la lista sin hijos con `removeChild`.
4. En `#btn-burbuja` usa `stopPropagation` para que **no** se ejecute el manejador de `#caja-evento`.
5. Registra el objeto `event` (`target`, `clientX`, `clientY`) en un clic.
6. Añade `input`, `focus`, `blur` y `keydown` (`Escape` limpia el campo).

**Esperado:**
- Añadir desde el formulario no recarga la página y actualiza «N objeto(s)…».
- Tras pulsar «Quitar manejador», «Alternar destacados» deja de funcionar.
- Con `stopPropagation`, al pulsar el botón solo aparece *clic SOLO en el botón*.

## Cómo comprobar

1. `index.html` con `solucion.js`: la consola muestra todos los `console.log` de los bloques.
2. Cambia a `ejercicio.js`, resuelve bloque a bloque y compara con la solución.
3. Prueba los botones y el formulario para validar el bloque de eventos.
