# Introducción a CSS Flexbox y Grid: Boletín de Ejercicios
> Colección progresiva de ejercicios prácticos para maquetación con CSS Flexbox y CSS Grid.

---

## Estructura del Boletín

Este directorio contiene los archivos necesarios para resolver los ejercicios:
- [index.html](file:///Users/fernando/Documents/Code/flexbox-grid/boletin-ejercicios/index.html): Estructura semántica HTML de todos los ejercicios.
- [styles.css](file:///Users/fernando/Documents/Code/flexbox-grid/boletin-ejercicios/styles.css): Hoja de estilos de trabajo con las secciones marcadas para escribir el código.
- [soluciones.css](file:///Users/fernando/Documents/Code/flexbox-grid/boletin-ejercicios/soluciones.css): Hoja de estilos con la resolución técnica de cada ejercicio.

---

## Bloque 1: Ejercicios de Flexbox (1D)

### Ejercicio 1: Barra de Herramientas (Toolbar)
**Objetivo:** Crear una barra de edición horizontal donde los controles se alineen verticalmente al centro y los botones de acción queden separados de las herramientas de formato.
- **HTML:** `.toolbar`
- **Requisitos:**
  1. Contenedor horizontal con alineación vertical centrada.
  2. Separación uniforme de `0.75rem` entre los botones.
  3. El grupo `.toolbar-actions` (guardar/descartar) debe situarse en el extremo derecho sin usar `position: absolute`.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toolbar-actions {
  margin-left: auto; /* O margin-inline-start: auto */
  display: flex;
  gap: 0.5rem;
}
```
</details>

---

### Ejercicio 2: Nube de Etiquetas de Filtro (Tag Cloud)
**Objetivo:** Maquetar una lista de etiquetas que se adapte al ancho disponible y salte de línea de forma ordenada cuando sea necesario.
- **HTML:** `.tag-list`
- **Requisitos:**
  1. Los elementos deben fluir en horizontal y pasar a la siguiente línea si no caben (`flex-wrap`).
  2. Espaciado consistente de `0.5rem` horizontal y vertical (`gap`).
  3. Cada etiqueta `.tag` no debe estirarse innecesariamente a lo alto.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
```
</details>

---

### Ejercicio 3: Campo de Entrada Flexible con Botón Fijo
**Objetivo:** Formulario de suscripción donde el campo de texto ocupe todo el ancho disponible y el botón conserve su tamaño intrínseco.
- **HTML:** `.newsletter-form`
- **Requisitos:**
  1. Contenedor flex con alineación horizontal y separación de `0.5rem`.
  2. El campo `.input-email` debe absorber todo el espacio restante disponible (`flex: 1`).
  3. El botón `.btn-submit` no debe deformarse ni encogerse bajo ningún tamaño de pantalla (`flex-shrink: 0`).

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.newsletter-form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.input-email {
  flex: 1;
}

.btn-submit {
  flex-shrink: 0;
}
```
</details>

---

### Ejercicio 4: Tarjetas con Botón Anclado a la Base
**Objetivo:** En un grupo de tarjetas con contenidos de texto de longitudes variables, lograr que todos los botones inferiores queden exactamente alineados en la parte inferior.
- **HTML:** `.card-container` y `.card`
- **Requisitos:**
  1. `.card-container` debe distribuir las tarjetas en fila flexible permitiendo salto de línea.
  2. Cada `.card` debe tener un flujo vertical (`flex-direction: column`).
  3. El pie de la tarjeta `.card-footer` debe empujarse automáticamente al fondo mediante `margin-top: auto`.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.card-container {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 240px;
}

.card-footer {
  margin-top: auto;
}
```
</details>

---

### Ejercicio 5: Componente de Paginación
**Objetivo:** Crear una barra de paginación donde el botón "Anterior" esté a la izquierda, los números de página estén centrados y el botón "Siguiente" esté a la derecha.
- **HTML:** `.pagination`
- **Requisitos:**
  1. Contenedor con `display: flex` y alineación vertical centrada.
  2. El botón `.prev-btn` queda al inicio.
  3. La lista `.page-numbers` debe estar centrada en el espacio horizontal.
  4. El botón `.next-btn` queda al final.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}
```
</details>

---

## Bloque 2: Ejercicios de CSS Grid (2D)

### Ejercicio 6: Rejilla Adaptativa sin Media Queries
**Objetivo:** Crear una cuadrícula de elementos que determine el número de columnas automáticamente en función del ancho de la pantalla sin escribir ninguna media query.
- **HTML:** `.auto-grid`
- **Requisitos:**
  1. Declarar `display: grid`.
  2. Cada columna debe medir un mínimo de `200px` y un máximo de `1fr`.
  3. Utilizar la función `repeat()` combinada con `auto-fit` y `minmax()`.
  4. Espaciado entre celdas de `1rem`.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```
</details>

---

### Ejercicio 7: Formulario en Cuadrícula de 2 Columnas
**Objetivo:** Organizar los campos de un formulario en dos columnas equilibradas, permitiendo que ciertos campos (como Dirección o Mensaje) ocupen ambas columnas.
- **HTML:** `.form-grid`
- **Requisitos:**
  1. Definir una rejilla de 2 columnas de igual ancho (`repeat(2, 1fr)`).
  2. Espaciado vertical y horizontal entre campos de `1rem`.
  3. Los campos marcados con `.full-width` deben abarcar las 2 columnas (`grid-column: span 2` o `1 / -1`).

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.full-width {
  grid-column: 1 / -1;
}
```
</details>

---

### Ejercicio 8: Mosaico Fotográfico Asimétrico
**Objetivo:** Maquetar una galería tipo mosaico de 4 columnas donde la primera imagen ocupe 2 columnas y 2 filas, y otra imagen ocupe 2 columnas de ancho.
- **HTML:** `.gallery-grid`
- **Requisitos:**
  1. Cuadrícula de 4 columnas con `grid-template-columns: repeat(4, 1fr)`.
  2. Altura base de filas automáticas con `grid-auto-rows: 140px`.
  3. `.item-featured`: debe ocupar 2 columnas y 2 filas.
  4. `.item-wide`: debe ocupar 2 columnas horizontales.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 140px;
  gap: 1rem;
}

.item-featured {
  grid-column: span 2;
  grid-row: span 2;
}

.item-wide {
  grid-column: span 2;
}
```
</details>

---

### Ejercicio 9: Layout de Página con `grid-template-areas`
**Objetivo:** Diseñar la estructura general de una página web definiendo áreas semánticas y su reorganización en pantallas estrechas.
- **HTML:** `.site-layout`
- **Requisitos:**
  1. En escritorio: 2 columnas (`200px 1fr`) y 3 filas (`auto 1fr auto`).
  2. Distribución de áreas:
     ```text
     "header  header"
     "sidebar content"
     "footer  footer"
     ```
  3. En pantallas menores a `768px`, reorganizar a columna única en orden: header, sidebar, content, footer.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
.site-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 400px;
  gap: 0.75rem;
}

.layout-header  { grid-area: header; }
.layout-sidebar { grid-area: sidebar; }
.layout-content { grid-area: content; }
.layout-footer  { grid-area: footer; }

@media (max-width: 768px) {
  .site-layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "content"
      "footer";
  }
}
```
</details>

---

## Bloque 3: Ejercicios Combinados (Grid + Flexbox)

### Ejercicio 10: Panel de Tarjetas de Estadísticas (KPIs)
**Objetivo:** Desarrollar un panel de métricas donde el conjunto se distribuya en una rejilla adaptativa mediante Grid y el interior de cada tarjeta organice título, valor e icono mediante Flexbox.
- **HTML:** `.kpi-container` y `.kpi-card`
- **Requisitos:**
  1. `.kpi-container`: Rejilla que adapte el número de tarjetas automáticamente (`auto-fit`) con un ancho mínimo de `180px` por tarjeta.
  2. `.kpi-card`: Usar Flexbox para colocar los datos numéricos a la izquierda y el icono decorativo a la derecha centrado verticalmente.
  3. El bloque de datos numéricos debe organizar el título y el valor en columna.

<details>
<summary>▶ Ver Solución CSS</summary>

```css
/* Rejilla general con Grid */
.kpi-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

/* Interior de la tarjeta con Flexbox */
.kpi-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.kpi-data {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
```
</details>
