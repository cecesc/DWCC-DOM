# Condicionales

[Teoría: condicionales](../Teoría/06-condicionales.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [operadores](04-operadores.md).  
**Criterio de finalización:** cada actividad imprime o deja en una variable exactamente el resultado indicado, sin usar bucles ni funciones.

## Actividades

### 1. Acceso al mapa

Parte de `const nivel = 4;` y `const tieneMapa = true;`. Muestra `"Acceso concedido"` solo si el nivel es al menos `3` **y** tiene mapa; en cualquier otro caso, muestra `"Acceso denegado"`.

**Resultado esperado:** `Acceso concedido`. Cambia después solo `tieneMapa` a `false`: el resultado debe pasar a `Acceso denegado`.

### 2. Categoría de envío

Una tienda aplica estas categorías al total de un pedido: menos de `20`, `"pedido pequeño"`; desde `20` hasta menos de `50`, `"pedido estándar"`; `50` o más, `"pedido grande"`.

Con `const total = 50;`, usa una cadena `if` / `else if` / `else` para mostrar una única categoría.

**Resultado esperado:** `pedido grande`. Prueba también `19` y `20` para comprobar los dos límites.

### 3. Código de personaje

Con `const clase = "explorador";`, muestra uno de estos mensajes mediante `switch`:

- `"Explora dos casillas"` para `"explorador"`.
- `"Repara un objeto"` para `"mecánico"`.
- `"Sin habilidad inicial"` para cualquier otra clase.

**Resultado esperado:** `Explora dos casillas`.

**Comprueba:** si cambias el valor a `"mecánico"`, no debe aparecer también el mensaje por defecto.

### 4. Estado de una reserva

Una reserva puede ser `"confirmada"`, `"pendiente"` o `"cancelada"`. Con `const estado = "pendiente";`, crea una variable `mensaje` con un ternario que contenga `"Preparar pedido"` cuando el estado sea exactamente `"confirmada"` y `"No preparar todavía"` en el resto de casos. Muéstrala.

**Resultado esperado:** `No preparar todavía`.

**Límite:** usa el ternario solo para esta decisión de dos alternativas; no sustituyas el ejercicio anterior por ternarios anidados.

### 5. Nombre visible sin perder el cero

Una persona puede elegir el apodo vacío, por lo que `""` es válido. Parte de `const apodo = "";` y crea `nombreVisible` con `??` para usar `"Sin apodo"` únicamente si el valor es `null` o `undefined`.

**Resultado esperado:** al imprimirlo debe verse una línea vacía, no `Sin apodo`. Repite con `const apodo = null;`: entonces debe verse `Sin apodo`.

### 6. Predicción de valores veraces

Sin ejecutar primero, predice qué rama tomará cada `if` y después compruébalo en consola. Usa un `console.log("entra")` dentro de la rama verdadera y `console.log("no entra")` dentro de la falsa.

```js
if ("0") { /* ... */ }
if (0) { /* ... */ }
if ([]) { /* ... */ }
if (null) { /* ... */ }
```

**Resultado esperado, en orden:** `entra`, `no entra`, `entra`, `no entra`.

### 7. Validación de cantidad

Con `const cantidadTexto = "12";`, convierte el dato a número y decide entre estos tres mensajes: `"Cantidad válida"` si es un número entero entre `1` y `99` ambos incluidos; `"Cantidad fuera de rango"` si es número pero queda fuera; `"Cantidad no numérica"` si la conversión produce `NaN`.

**Resultado esperado:** `Cantidad válida`. Prueba también `"0"` y `"100"` (ambas fuera de rango, aunque `"0"` sí es una conversión numérica válida) y `"doce"` (no numérica).

**Pista:** `Number.isNaN(...)` distingue un resultado no numérico.

### 8. Precio con descuento y prioridad

Una tienda aplica un 10 % de descuento si el cliente es VIP **o** si el subtotal es al menos `100`; un pedido cancelado nunca recibe descuento. Parte de:

```js
const subtotal = 120;
const esVip = false;
const estaCancelado = false;
```

Calcula y muestra un único `precioFinal`.

**Resultado esperado:** `108`. Cambia `estaCancelado` a `true`: debe ser `120`.

**Comprueba:** la cancelación tiene prioridad sobre las otras dos condiciones.