# Introducción a CSS Flexbox y Grid
> Guía técnica exhaustiva con fundamentos teóricos, ejemplos prácticos, patrones de maquetación en producción, ejercicios resueltos, retos propuestos y herramientas de profundización.

---

## Índice General

1. [El Modelo Mental: Flexbox vs Grid](#1-el-modelo-mental-flexbox-vs-grid)
2. [Flexbox en Profundidad](#2-flexbox-en-profundidad)
   - 2.1 [Estructura: Contenedor vs Hijos](#21-estructura-contenedor-vs-hijos)
   - 2.2 [Los Ejes: Main Axis y Cross Axis](#22-los-ejes-main-axis-y-cross-axis)
   - 2.3 [Dirección y Flujo (`flex-direction` y `flex-wrap`)](#23-dirección-y-flujo-flex-direction-y-flex-wrap)
   - 2.4 [Alineación y Distribución (`justify-content`, `align-items`, `align-content`)](#24-alineación-y-distribución)
   - 2.5 [El Tamaño de los Hijos: La Trinidad `flex: grow shrink basis`](#25-el-tamaño-de-los-hijos-la-trinidad-flex-grow-shrink-basis)
   - 2.6 [Técnicas Clave: `margin: auto`, `min-width: 0` y `gap`](#26-técnicas-clave-margin-auto-min-width-0-y-gap)
3. [CSS Grid en Profundidad](#3-css-grid-en-profundidad)
   - 3.1 [Anatomía del Grid (Líneas, Pistas, Celdas y Áreas)](#31-anatomía-del-grid)
   - 3.2 [Definición de Columnas y Filas (`fr`, `repeat`, `minmax`)](#32-definición-de-columnas-y-filas)
   - 3.3 [La Fórmula Responsive sin Media Queries](#33-la-fórmula-responsive-sin-media-queries)
   - 3.4 [Posicionamiento por Líneas Numéricas y `span`](#34-posicionamiento-por-líneas-numéricas-y-span)
   - 3.5 [Diseño Visual con `grid-template-areas`](#35-diseño-visual-con-grid-template-areas)
   - 3.6 [Alineaciones y el Atajo `place-*`](#36-alineaciones-y-el-atajo-place-)
4. [Patrones Combinados (Flexbox + Grid en Producción)](#4-patrones-combinados-flexbox--grid-en-producción)
5. [Prácticas Guiadas Resueltas](#5-prácticas-guiadas-resueltas)
   - Práctica 1: Barra de Navegación Profesional (Flexbox)
   - Práctica 2: Cuadrícula de Tarjetas con Footer Anclado (Grid + Flex)
   - Práctica 3: Shell de Aplicación / Dashboard (Grid Areas)
6. [Retos Prácticos Propuestos](#6-retos-prácticos-propuestos)
   - Reto 1 (Nivel Básico): Tarjeta de Perfil de Usuario con Estado
   - Reto 2 (Nivel Intermedio): Mosaico Asimétrico Bento Box
   - Reto 3 (Nivel Avanzado): Layout de Panel de Control con KPIs y Gráfica
7. [Simuladores, Herramientas y Recursos de Profundización](#7-simuladores-herramientas-y-recursos-de-profundización)
   - 7.1 [Juegos Interactivos y Memoria Muscular](#71-juegos-interactivos-y-memoria-muscular)
   - 7.2 [Simuladores y Generadores Visuales en Vivo](#72-simuladores-y-generadores-visuales-en-vivo)
   - 7.3 [Herramientas de Inspección en el Navegador (DevTools)](#73-herramientas-de-inspección-en-el-navegador-devtools)
   - 7.4 [Cursos y Referencias Técnicas](#74-cursos-y-referencias-técnicas)

---

## 1. El Modelo Mental: Flexbox vs Grid

El punto de partida para estructurar un layout moderno consiste en identificar el **propósito arquitectónico** de cada sistema:

```
┌────────────────────────────────────────────────────────┐
│                      LAYOUT WEB                        │
├───────────────────────────┬────────────────────────────┤
│       CSS GRID (2D)       │       FLEXBOX (1D)         │
│  "Layout-First" (Macro)   │  "Content-First" (Micro)   │
├───────────────────────────┼────────────────────────────┤
│ • Define el esqueleto.    │ • Los elementos dictan su  │
│ • Controla filas Y        │   propio tamaño y flujo.   │
│   columnas al mismo tiempo│ • Controla 1 eje a la vez  │
│ • La cuadrícula existe    │   (fila O columna).        │
│   antes del contenido.    │ • Ideal para barras, filas,│
│ • Ideal para la pantalla  │   botones, listas y micro- │
│   completa y mosaicos.    │   alineaciones internas.   │
└───────────────────────────┴────────────────────────────┘
```

> [!IMPORTANT]
> **Árbol de Decisión Rápido:**
> 1. ¿Los elementos deben distribuirse a lo largo de **una sola fila** o **una sola columna**? ➔ **Flexbox**.
> 2. ¿Los elementos deben alinearse de forma coordinada en **filas Y columnas simultáneamente**? ➔ **Grid**.
> 3. ¿El diseño depende de una estructura exterior predefinida (cabecera, barra lateral, contenido principal)? ➔ **Grid**.
> 4. ¿El diseño depende del contenido propio de cada componente (botones, iconos, etiquetas)? ➔ **Flexbox**.

---

## 2. Flexbox en Profundidad

### 2.1 Estructura: Contenedor vs Hijos

Para iniciar un contexto de Flexbox, se declara `display: flex` en el elemento contenedor. De forma automática, todos sus hijos directos pasan a ser *flex items*.

```html
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
</div>
```

```css
.flex-container {
  display: flex;
}
```

> [!NOTE]
> Las propiedades se dividen en dos grupos:
> - **Propiedades del contenedor:** Definen la dirección, distribución y separación de los elementos (`flex-direction`, `justify-content`, `align-items`, `flex-wrap`, `gap`).
> - **Propiedades de los ítems:** Definen la capacidad de estirarse, encogerse o alinearse individualmente (`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`, `order`).

---

### 2.2 Los Ejes: Main Axis y Cross Axis

La orientación espacial en Flexbox se define mediante dos ejes perpendiculares:

```
        flex-direction: row (POR DEFECTO)
        
        ◄─────────────── EJE PRINCIPAL (Main Axis) ──────────────►
       ┌───────────┬───────────┬───────────┐ ▲
       │  Ítem 1   │  Ítem 2   │  Ítem 3   │ │ EJE SECUNDARIO
       └───────────┴───────────┴───────────┘ │ (Cross Axis)
                                             ▼
------------------------------------------------------------------
        flex-direction: column
        
        ▲ │ ┌───────────┐
        │ │ │  Ítem 1   │
        │ │ ├───────────┤
   EJE  │ │ │  Ítem 2   │
SECUND. │ │ ├───────────┤
 (Cross)│ │ │  Ítem 3   │
        │ ▼ └───────────┘
        ▼   EJE PRINCIPAL (Main Axis)
```

- **`justify-content`**: Controla la alineación a lo largo del **Eje Principal**.
- **`align-items`**: Controla la alineación a lo largo del **Eje Secundario**.

---

### 2.3 Dirección y Flujo (`flex-direction` y `flex-wrap`)

#### `flex-direction`
Establece la dirección del eje principal:
- `row` (valor por defecto): Dirección horizontal de izquierda a derecha en entornos LTR.
- `row-reverse`: Dirección horizontal invertida.
- `column`: Dirección vertical de arriba hacia abajo.
- `column-reverse`: Dirección vertical invertida.

#### `flex-wrap`
Por defecto, Flexbox agrupa todos los elementos en una única línea (`nowrap`):
- `nowrap` (defecto): Mantiene todos los elementos en una línea, encogiéndolos si es necesario.
- `wrap`: Permite que los elementos pasen a una nueva línea cuando superan el ancho disponible.
- `wrap-reverse`: Salto de línea en sentido inverso.

#### Ejemplo: Nube de Etiquetas (Tag Cloud) Dinámica
```html
<div class="tag-cloud">
  <span class="tag">HTML5</span>
  <span class="tag">CSS3</span>
  <span class="tag">JavaScript</span>
  <span class="tag">TypeScript</span>
  <span class="tag">React</span>
  <span class="tag">Next.js</span>
  <span class="tag">Node.js</span>
</div>
```

```css
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #334155;
  color: #38bdf8;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
}
```

---

### 2.4 Alineación y Distribución

#### A) Eje Principal: `justify-content`
Distribuye el espacio libre disponible en el eje principal:

| Valor | Comportamiento |
| :--- | :--- |
| `flex-start` | Elementos agrupados al comienzo del eje. |
| `flex-end` | Elementos agrupados al final del eje. |
| `center` | Elementos agrupados en el centro. |
| `space-between` | El primer elemento toca el inicio, el último toca el final y el espacio restante se reparte uniformemente. |
| `space-around` | Distribución uniforme de espacio alrededor de cada elemento (los extremos tienen la mitad de separación). |
| `space-evenly` | Espaciado matemáticamente idéntico en todos los huecos y extremos exteriores. |

#### B) Eje Secundario: `align-items`
Controla la posición en el eje transversal:
- `stretch` (defecto): Los elementos se estiran hasta ocupar todo el alto disponible.
- `center`: Centrado vertical (en modo fila).
- `flex-start` / `flex-end`: Alineación al borde superior o inferior.
- `baseline`: Alineación basada en la línea base tipográfica del texto interior.

#### C) Excepción Individual: `align-self`
Permite sobrescribir la alineación del padre para un elemento específico:
```css
.item-personalizado {
  align-self: flex-end;
}
```

---

### 2.5 El Tamaño de los Hijos: La Trinidad `flex: grow shrink basis`

Controla la flexibilidad dimensional de cada ítem:

```css
.item {
  flex: 1; /* Equivalente a: flex-grow: 1; flex-shrink: 1; flex-basis: 0%; */
}
```

1. **`flex-grow` (Factor de crecimiento):** Determina qué proporción del espacio sobrante absorbe el ítem frente a sus hermanos.
   - `0` (defecto): No absorbe espacio adicional.
   - `1`: Crece de manera proporcional.
2. **`flex-shrink` (Factor de contracción):** Determina el ritmo de reducción cuando no hay espacio suficiente.
   - `1` (defecto): Se encoge para prevenir el desbordamiento.
   - `0`: Mantiene su tamaño estricto sin encogerse.
3. **`flex-basis` (Tamaño base inicial):** Tamaño antes del reparto del espacio disponible restante (`auto`, `150px`, `25%`, etc.).

#### Ejemplo: Barra de Búsqueda Flexible
Un botón con ancho fijo y un campo de entrada que aprovecha todo el espacio horizontal restante:

```html
<form class="search-bar">
  <input type="text" placeholder="Buscar..." class="search-input">
  <button type="submit" class="search-btn">Buscar</button>
</form>
```

```css
.search-bar {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.search-input {
  flex: 1; /* Ocupa el 100% del espacio sobrante */
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: 1px solid #475569;
}

.search-btn {
  flex-shrink: 0; /* No se deforma ni se encoge */
  padding: 0.6rem 1.2rem;
  background: #38bdf8;
  color: #0f172a;
  border: none;
  border-radius: 6px;
  font-weight: bold;
}
```

---

### 2.6 Técnicas Clave: `margin: auto`, `min-width: 0` y `gap`

#### 1. `margin-left: auto` / `margin-inline-start: auto`
En un contenedor flex, un margen automático absorbe todo el espacio libre restante en esa dirección:
```css
.user-menu {
  margin-left: auto; /* Empuja este elemento y los posteriores al extremo derecho */
}
```

#### 2. Prevención de Desbordamiento de Texto (`min-width: 0`)
Los elementos flexibles tienen un valor por defecto de `min-width: auto`. Para textos largos con `text-overflow: ellipsis`, es necesario forzar `min-width: 0`:
```css
.texto-truncado {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

#### 3. Propiedad `gap`
Soporte nativo para separar elementos sin recurrir a márgenes laterales:
```css
.contenedor {
  display: flex;
  gap: 1rem; /* Espaciado uniforme en filas y columnas */
}
```

---

## 3. CSS Grid en Profundidad

### 3.1 Anatomía del Grid

CSS Grid opera mediante una cuadrícula de coordenadas bidimensionales:

```
          Línea 1          Línea 2          Línea 3          Línea 4
             │                │                │                │
 Línea 1 ────┌────────────────┬────────────────┬────────────────┐
             │   Celda (1)    │   Celda (2)    │   Celda (3)    │ ◄── Pista (Fila 1)
 Línea 2 ────├────────────────┼────────────────┼────────────────┤
             │   Celda (4)    │   Celda (5)    │   Celda (6)    │ ◄── Pista (Fila 2)
 Línea 3 ────└────────────────┴────────────────┴────────────────┘
             ▲                                                  ▲
             │                                                  │
          Línea -4                                           Línea -1 (Última línea)
```

- **Pista (Track):** El espacio delimitado entre dos líneas adyacentes (una fila o una columna).
- **Líneas (Grid Lines):** Divisores numerados positivos (`1` a `N`) y negativos (`-1` a `-N`).
- **Celda (Cell):** Intersección entre una fila y una columna.
- **Área (Area):** Conjunto rectangular formado por una o más celdas adyacentes.

---

### 3.2 Definición de Columnas y Filas

#### La Unidad `fr` (Fracción)
Representa una fracción proporcional del espacio disponible:
```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Columna central con el doble de tamaño */
  gap: 1rem;
}
```

#### La Función `repeat()`
Evita la reiteración de valores continuos:
```css
grid-template-columns: repeat(4, 1fr); /* 4 columnas idénticas */
```

#### La Función `minmax(min, max)`
Establece rangos mínimos y máximos:
```css
grid-template-columns: minmax(220px, 300px) 1fr;
```

---

### 3.3 La Fórmula Responsive sin Media Queries

Patrón para generar rejillas completamente adaptativas a cualquier tamaño de pantalla:

```css
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

- **`minmax(260px, 1fr)`**: Cada columna tendrá un ancho mínimo de `260px` y un máximo de `1fr`.
- **`auto-fit`**: El navegador calcula cuántas columnas de al menos `260px` caben en el contenedor y expande las existentes para ocupar todo el ancho disponible.
- **Diferencia frente a `auto-fill`**: `auto-fill` preserva los huecos vacíos de las columnas sobrantes si hay pocos elementos, mientras que `auto-fit` expande los elementos existentes cubriendo la fila completa.

---

### 3.4 Posicionamiento por Líneas Numéricas y `span`

Permite ubicar elementos sobre coordenadas concretas de la cuadrícula:

```css
.elemento-destacado {
  grid-column: 1 / 3;    /* Delimita desde la línea 1 hasta la línea 3 */
  grid-column: span 2;   /* Ocupa 2 columnas a partir de su posición */
}

.elemento-ancho-completo {
  grid-column: 1 / -1;   /* Abarca desde la primera línea hasta la última */
}
```

---

### 3.5 Diseño Visual con `grid-template-areas`

Representación esquemática directa de la estructura:

```css
.app-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 48px;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }

/* Adaptación a pantallas estrechas */
@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      "header"
      "sidebar"
      "content"
      "footer";
  }
}
```

---

### 3.6 Alineaciones y el Atajo `place-*`

Propiedades abreviadas para alinear en ambas dimensiones simultáneamente:

```css
/* Centrado total de un contenedor en la pantalla */
.pantalla-centrada {
  display: grid;
  place-content: center; /* justify-content + align-content */
  min-height: 100vh;
}

/* Centrado del contenido dentro de cada celda */
.celda-centrada {
  display: grid;
  place-items: center; /* justify-items + align-items */
}
```

---

## 4. Patrones Combinados (Flexbox + Grid en Producción)

### Tarjetas con Pie de Tarjeta Anclado al Fondo
- **Grid** en el contenedor exterior para organizar las columnas de manera simétrica.
- **Flexbox** en el interior de cada tarjeta para asegurar que los elementos inferiores (botones, precios) se mantengan alineados en la parte inferior independientemente de la longitud del texto.

```html
<div class="cards-grid">
  <article class="card">
    <h3>Plan Profesional</h3>
    <p>Acceso completo a todas las características avanzadas, exportación en alta calidad y soporte continuo.</p>
    <div class="card-footer">
      <span class="price">29 €</span>
      <button>Contratar</button>
    </div>
  </article>
</div>
```

```css
/* Cuadrícula exterior */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Interior de la tarjeta */
.card {
  display: flex;
  flex-direction: column;
  background: #1e293b;
  border-radius: 8px;
  padding: 1.25rem;
}

/* El margen automático superior empuja el pie al fondo */
.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}
```

---

## 5. Prácticas Guiadas Resueltas

### Práctica Resuelta 1 (Flexbox): Barra de Navegación con Acciones

```html
<header class="navbar">
  <div class="brand">🚀 Sistema Central</div>
  <nav class="nav-menu">
    <a href="#panel">Panel</a>
    <a href="#proyectos">Proyectos</a>
    <a href="#reportes">Reportes</a>
  </nav>
  <div class="nav-actions">
    <button class="btn-secundario">Acceso</button>
    <button class="btn-primario">Registro</button>
  </div>
</header>
```

```css
.navbar {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 2rem;
  background: #0f172a;
  border-bottom: 1px solid #334155;
}

.brand {
  font-weight: 800;
  color: #38bdf8;
  font-size: 1.25rem;
}

.nav-menu {
  display: flex;
  gap: 1.25rem;
}

.nav-menu a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
}

.nav-menu a:hover {
  color: #ffffff;
}

/* margin-left: auto empuja el bloque al extremo derecho */
.nav-actions {
  margin-left: auto;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn-secundario {
  background: transparent;
  color: #f8fafc;
  border: 1px solid #475569;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primario {
  background: #38bdf8;
  color: #0f172a;
  border: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
```

---

### Práctica Resuelta 2 (CSS Grid): Mosaico Asimétrico "Bento Box"

```html
<section class="bento-container">
  <div class="bento-card bento-hero">
    <h2>Módulo Principal</h2>
    <p>Ocupa 2 columnas y 2 filas, actuando como elemento destacado.</p>
  </div>
  <div class="bento-card">Widget Rendimiento</div>
  <div class="bento-card">Widget Visitas</div>
  <div class="bento-card bento-wide">Widget Extendido (2 columnas)</div>
  <div class="bento-card">Widget Alertas</div>
</section>
```

```css
.bento-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 160px;
  gap: 1.25rem;
  max-width: 1000px;
  margin: 0 auto;
}

.bento-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bento-hero {
  grid-column: span 2;
  grid-row: span 2;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-color: #38bdf8;
}

.bento-wide {
  grid-column: span 2;
}
```

---

## 6. Retos Prácticos Propuestos

### Reto 1 (Nivel Básico • Flexbox)
**Requisitos:** Construir un componente de lista de usuario:
1. Avatar circular (48x48px) con un punto indicador de estado activo en la esquina inferior derecha.
2. Contenedor de información con nombre de usuario en la línea superior y último mensaje en la inferior con puntos suspensivos (`text-overflow: ellipsis`) en caso de desborde.
3. Indicador de hora fijado a la derecha sin deformarse.

#### Pistas Técnicas:
- Asignar `display: flex` y `align-items: center` a la fila contenedora.
- Incluir `min-width: 0` en el bloque de texto para permitir que la elipsis funcione.
- Aplicar `margin-left: auto` y `flex-shrink: 0` al indicador de hora.

<details>
<summary>▶ Desplegar Solución Técnica Reto 1</summary>

```html
<div class="chat-item">
  <div class="avatar-wrapper">
    <div class="avatar">JD</div>
    <span class="status-dot"></span>
  </div>
  <div class="chat-info">
    <h4 class="user-name">Juana Díaz</h4>
    <p class="last-message">El despliegue de los nuevos componentes de interfaz ya está listo.</p>
  </div>
  <span class="chat-time">16:45</span>
</div>
```

```css
.chat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #1e293b;
  border-radius: 8px;
  max-width: 450px;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #0f172a;
}

.status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #1e293b;
}

.chat-info {
  flex: 1;
  min-width: 0; /* Imprescindible para elipsis */
}

.user-name {
  color: #f8fafc;
  font-size: 0.95rem;
}

.last-message {
  color: #94a3b8;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-time {
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.75rem;
  color: #64748b;
}
```
</details>

---

### Reto 2 (Nivel Intermedio • CSS Grid)
**Requisitos:** Maquetar una tabla de precios con tres niveles ("Starter", "Professional", "Enterprise"):
1. Rejilla adaptable que presente 3 columnas en escritorio y se adapte en dispositivos menores.
2. La tarjeta intermedia ("Professional") debe estar visualmente destacada.
3. El botón inferior de cada tarjeta debe situarse en la base, independientemente de la longitud de los textos.

<details>
<summary>▶ Desplegar Solución Técnica Reto 2</summary>

```html
<div class="pricing-grid">
  <div class="pricing-card">
    <h3>Starter</h3>
    <div class="price">9 €<span>/mes</span></div>
    <ul class="features">
      <li>1 Proyecto</li>
      <li>Soporte estándar</li>
    </ul>
    <button class="pricing-btn">Seleccionar</button>
  </div>

  <div class="pricing-card popular">
    <div class="badge">Recomendado</div>
    <h3>Professional</h3>
    <div class="price">29 €<span>/mes</span></div>
    <ul class="features">
      <li>Proyectos ilimitados</li>
      <li>Soporte prioritario</li>
      <li>Métricas avanzadas</li>
    </ul>
    <button class="pricing-btn highlight">Seleccionar</button>
  </div>

  <div class="pricing-card">
    <h3>Enterprise</h3>
    <div class="price">99 €<span>/mes</span></div>
    <ul class="features">
      <li>API dedicada</li>
      <li>Auditorías personalizadas</li>
    </ul>
    <button class="pricing-btn">Contactar</button>
  </div>
</div>
```

```css
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  align-items: center;
  max-width: 1000px;
  margin: 2rem auto;
}

.pricing-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 380px;
}

.pricing-card.popular {
  border-color: #38bdf8;
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(56, 189, 248, 0.2);
}

.pricing-btn {
  margin-top: auto;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background: #334155;
  color: #fff;
}

.pricing-btn.highlight {
  background: #38bdf8;
  color: #0f172a;
}
```
</details>

---

### Reto 3 (Nivel Avanzado • Reto Completo Grid + Flex)
**Requisitos:** Construcción de un panel de control con distribución adaptable:
1. Cabecera fija (`header`) con nombre del sistema a la izquierda e información de sesión a la derecha.
2. Menú de navegación lateral (`aside`) con un ancho fijo de `220px` en escritorio.
3. Zona principal (`main`) estructurada con:
   - Fila de 4 indicadores de métricas mediante `auto-fit`.
   - Distribución inferior de 2 columnas proporcionales (gráfico principal 2fr, registro de actividad 1fr).
4. Reordenación completa a columna única en anchos inferiores a `768px`.

<details>
<summary>▶ Desplegar Solución Técnica Reto 3</summary>

```html
<div class="dashboard">
  <header class="dash-top">
    <h2>Consola de Gestión</h2>
    <div class="user-pill">Sesión Activa</div>
  </header>
  
  <aside class="dash-nav">
    <nav>
      <a href="#">Panel Principal</a>
      <a href="#">Operaciones</a>
      <a href="#">Métricas</a>
      <a href="#">Ajustes</a>
    </nav>
  </aside>

  <main class="dash-content">
    <div class="kpi-grid">
      <div class="kpi-card"><span>Ingresos</span><strong>48.200 €</strong></div>
      <div class="kpi-card"><span>Registros</span><strong>1.420</strong></div>
      <div class="kpi-card"><span>Conversión</span><strong>3.2%</strong></div>
      <div class="kpi-card"><span>Disponibilidad</span><strong>99.9%</strong></div>
    </div>

    <div class="charts-row">
      <div class="chart-box">Gráfica General de Métricas</div>
      <div class="activity-box">Registro de Eventos</div>
    </div>
  </main>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "top top"
    "nav content";
  min-height: 100vh;
  background: #0b1120;
  color: #f8fafc;
}

.dash-top {
  grid-area: top;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
}

.dash-nav {
  grid-area: nav;
  background: #0f172a;
  padding: 1.5rem 1rem;
  border-right: 1px solid #1e293b;
}

.dash-nav nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dash-nav a {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 6px;
}

.dash-nav a:hover {
  background: #1e293b;
  color: #38bdf8;
}

.dash-content {
  grid-area: content;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.kpi-card {
  background: #1e293b;
  padding: 1.25rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.kpi-card span { color: #94a3b8; font-size: 0.85rem; }
.kpi-card strong { font-size: 1.4rem; color: #38bdf8; }

.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  min-height: 320px;
}

.chart-box, .activity-box {
  background: #1e293b;
  border-radius: 8px;
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "top"
      "nav"
      "content";
  }
  
  .charts-row {
    grid-template-columns: 1fr;
  }
}
```
</details>

---

## 7. Simuladores, Herramientas y Recursos de Profundización

### 7.1 Juegos Interactivos y Memoria Muscular
Plataformas gamificadas diseñadas para interiorizar ejes, alineaciones y sintaxis:

*   **[Flexbox Froggy](https://flexboxfroggy.com/#es)**: 24 niveles progresivos para practicar `justify-content`, `align-items`, `flex-direction` y `order`.
*   **[Grid Garden](https://cssgridgarden.com/#es)**: 28 niveles enfocados en el control de coordenadas, pistas y líneas de cuadrícula (`grid-column-start`, `grid-row-end`, `span`).
*   **[Flexbox Defense](http://www.flexboxdefense.com/)**: Juego tipo Tower Defense en el que la colocación estratégica de las defensas se gestiona mediante reglas de Flexbox.
*   **[Flexbox Zombies](https://mastery.games/flexboxzombies/)**: Aventura guiada orientada a fijar en memoria muscular la interacción entre `flex-grow`, `flex-shrink` y `flex-basis`.

---

### 7.2 Simuladores y Generadores Visuales en Vivo
Entornos visuales para experimentar y exportar código limpio:

*   **[Layoutit! Grid](https://grid.layoutit.com/)**: Editor visual interactivo para diseñar cuadrículas y generar la sintaxis de `grid-template-areas`.
*   **[CSS Grid Generator (por Sarah Drasner)](https://cssgrid-generator.netlify.app/)**: Permite definir columnas, filas y áreas de manera gráfica, generando el código HTML y CSS correspondiente.
*   **[Guías Interactivas de Josh W. Comeau](https://www.joshwcomeau.com/)**:
    *   [An Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
    *   [An Interactive Guide to CSS Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/)
    *   Tutoriales interactivos con controles deslizantes en tiempo real para visualizar cómo reaccionan las cajas ante cambios de propiedades.

---

### 7.3 Herramientas de Inspección en el Navegador (DevTools)
Los motores de renderizado modernos cuentan con herramientas nativas de diagnóstico de maquetación:

1. **Insignias e Insignias de Cuadrícula (Overlays en Chrome, Edge y Firefox):**
   * Al inspeccionar un elemento con `display: flex` o `display: grid`, pulsar sobre el indicador **`grid`** o **`flex`** dentro de la pestaña *Elements*.
   * Dibuja sobre la página las líneas numeradas, áreas sombreadas de separación (`gap`) y nombres de zonas.
2. **Pestaña de Diseño (Layout Panel):**
   * Situada junto a la pestaña de estilos, permite activar y superponer de forma simultánea guías para múltiples contenedores y analizar el cálculo de flexbox item por item.

---

### 7.4 Cursos y Referencias Técnicas

#### Cursos en Vídeo
*   **[CSS Grid por Wes Bos](https://cssgrid.io/)**: Serie técnica de 25 lecciones en vídeo que abarca desde los fundamentos hasta maquetaciones complejas.
*   **[What The Flexbox por Wes Bos](https://flexbox.io/)**: Colección de 20 lecciones prácticas enfocadas en cada propiedad de Flexbox.
*   **[Canal de Kevin Powell](https://www.youtube.com/@KevinPowell)**: Tutoriales especializados en CSS moderno, arquitectura de layouts y resolución de problemas comunes en entornos responsivos.

#### Documentación y Hojas de Referencia
*   **[CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)**: Manual de referencia visual clasificado entre propiedades del contenedor y de los elementos flexibles.
*   **[CSS-Tricks: A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)**: Hoja de referencia técnica de propiedades y sintaxis de CSS Grid.
*   **[MDN Learn CSS: Layout](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout)**: Especificación y tutoriales oficiales mantenidos por Mozilla.
