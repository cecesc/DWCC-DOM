# DOM: JavaScript en la página

[Teoría: DOM](../Teoría/17-dom.md)

**Prerrequisitos:** temas 01–16. Realiza las actividades en un navegador. Para los archivos con `type="module"`, usa el servidor HTTP local del tema 16; no abras el HTML con `file://`.

## 1. Seleccionar y resumir

Crea `index.html` con un `<h1>`, un `<p id="resumen">` y una lista `<ul id="objetos">`. En `app.js`, selecciona ambos nodos y parte de `const objetos = ["Mapa", "Brújula", "Llave"];`. Escribe en el párrafo el número de objetos.

**Resultado esperado:** aparece `3 objetos` sin modificar el HTML desde la consola.

## 2. Construir una lista de texto seguro

Partiendo del array anterior, crea un `<li>` por cada nombre mediante `document.createElement` y añádelo a la lista. Incluye como cuarto nombre el texto `<b>Amuleto</b>`.

**Resultado esperado:** hay cuatro elementos de lista y el último muestra literalmente los caracteres `<b>` y `</b>`, sin negrita ni elemento HTML nuevo.

**Condición:** no uses `innerHTML` ni concatenes HTML.

## 3. Clases y reemplazo de contenido

Añade un botón real con el texto `Alternar destacados`. Al pulsarlo, añade o quita la clase `destacado` a todos los `<li>` ya creados. Añade después un segundo botón `Vaciar` que deje la lista sin hijos con una operación del DOM.

**Resultado esperado:** el primer botón alterna la clase sin borrar las demás; el segundo deja una lista vacía y el resumen sigue visible.

## 4. Selector que puede fallar

Escribe una función que reciba un selector, use `querySelector` y actualice el texto del elemento encontrado. Pruébala primero con `#resumen` y luego con `#no-existe`.

**Resultado esperado:** el caso existente cambia el texto; el inexistente muestra un error claro en consola o se trata explícitamente, sin intentar acceder a propiedades de `null`.

## 5. Lista estática frente a DOM actual

Obtén una `NodeList` con `document.querySelectorAll("#objetos li")`. Guárdala, añade un `<li>` nuevo a la lista y muestra en consola la longitud de la `NodeList` guardada y una consulta nueva.

**Resultado esperado:** explica junto a la salida cuál conserva el número inicial y cuál ve el nuevo elemento.

## 6. Diagnóstico en herramientas de desarrollo

Introduce a propósito un selector incorrecto en una copia de `app.js` y carga la página. Después corrígelo.

**Resultado esperado:** anota para ti el archivo y línea del primer error de Consola, confirma en Elementos el `id` real y coloca un breakpoint antes de añadir el primer `<li>`. La versión corregida vuelve a renderizar la lista.
