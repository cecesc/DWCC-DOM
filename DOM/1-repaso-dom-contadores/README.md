# Contador de etiquetas

[Teoría: Manipulación del DOM](https://fernandoalvarezfp.github.io/DWCC/DOM.html)

Ejercicio **centrado solo en dos bloques** de la teoría: **selección de elementos** y
**modificación de contenido**. No se usan eventos ni creación/eliminación de nodos.

## Qué hay que hacer

`index.html` es una página cualquiera (títulos, párrafos, una lista, tarjetas y enlaces)
con un **panel de estadísticas** al final cuyos números están a `?`. Hay que rellenarlos
contando las etiquetas de la página.

## Archivos

| Archivo | Uso |
| --- | --- |
| `index.html` | La página y el panel con los huecos a rellenar. |
| `estilos.css` | Estilos (`.card`, `.num`, `.oculto`, …). |
| `ejercicio.js` | Tu código, con un `// TODO` por apartado. |
| `solucion.js` | Solución completa. Cambia el `<script>` de `index.html` para comparar. |

## Bloque A · Seleccionar y contar

| # | Selector a practicar | Dónde escribirlo |
| --- | --- | --- |
| A1 | `getElementById("titulo")` | consola |
| A2 | `getElementsByTagName("p")` | `#num-p` |
| A3 | `getElementsByTagName("li")` | `#num-li` |
| A4 | `getElementsByClassName("card")` | `#num-cards` |
| A5 | `querySelectorAll("a")` y `querySelectorAll('a[target="_blank"]')` | `#num-a` y `#num-externos` |
| A6 | `querySelectorAll("main *")` | `#num-total` |
| A7 | `querySelectorAll("main > h2")` recorrido con `forEach` | consola |

**Resultado esperado en el panel:**

| Contador | Valor |
| --- | --- |
| Párrafos | `6` |
| Elementos de lista | `3` |
| Tarjetas (`.card`) | `5` |
| Enlaces | `3` |
| Enlaces externos | `2` |
| Elementos dentro de `<main>` | `17` |

> El panel usa `<div class="fila">` (no `<li>`) a propósito: así los contadores no se
> cuentan a sí mismos.

## Bloque B · Modificar el contenido

1. **B1** · Cambia `#titulo` con `textContent` por `Estadísticas de la página`.
2. **B2** · Escribe en `#resumen`, con `innerHTML`, `Hay <strong>N</strong> elementos dentro de <main>.`
3. **B3** · Rellena `#detalle` con los tres títulos de sección (`HTML`, `CSS`, `JavaScript`), uno por línea, con `innerHTML`.
4. **B4** · Compara `textContent` e `innerText` de `#pie` (contiene un `<span class="oculto">`).

**Esperado:**
- El `<h1>` pasa a decir *Estadísticas de la página*.
- `#resumen` muestra el **17** en negrita (el `<strong>` se interpreta).
- `#detalle` lista los tres títulos.
- `textContent` → `"Visibles OCULTO fin"`; `innerText` → `"Visibles fin"` (respeta el `display:none`).

## Cómo comprobar

1. Abre `index.html` (doble clic basta) con la Consola abierta.
2. Cambia el `<script>` a `solucion.js` y compara tus números con el panel.
3. **Para pensar:** `getElementsByTagName`/`getElementsByClassName` devuelven colecciones
   **vivas**; `querySelectorAll` devuelve una `NodeList` **estática**.
