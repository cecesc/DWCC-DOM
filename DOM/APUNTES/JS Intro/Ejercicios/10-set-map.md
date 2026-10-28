# Set y Map

[Teoría: Set y Map](../Teoría/10-set-map.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [arrays](09-arrays.md).  
**Criterio de finalización:** cada actividad usa la colección pedida y comprueba sus resultados con las salidas indicadas.

## Actividades

### 1. Visitantes sin duplicados

Crea un `Set` a partir de `["Nora", "Ivo", "Nora", "Mara", "Ivo"]`. Muestra su tamaño y después sus nombres con `for...of`.

**Resultado esperado:** tamaño `3` y los nombres `Nora`, `Ivo`, `Mara` en orden de inserción.

### 2. Pase de acceso

Con `const pases = new Set(["mapa", "linterna"]);`, añade `"cuerda"`, intenta añadir `"mapa"` de nuevo y comprueba si existe `"linterna"`.

**Resultado esperado:** tamaño `3` y una comprobación `true` para la linterna.

### 3. Retirar un elemento

Parte del `Set` del ejercicio anterior. Elimina `"mapa"` y muestra si sigue presente, además del tamaño final.

**Resultado esperado:** `false` y `2`.

**Comprueba:** no conviertas el `Set` a array para eliminar el dato.

### 4. Coincidencias de dos rutas

Crea dos `Set`: `rutaNorte` con `"puente"`, `"mercado"`, `"torre"`, y `rutaSur` con `"mercado"`, `"puerto"`, `"torre"`. Construye un tercer `Set` que contenga solo las zonas que pertenecen a ambas rutas.

**Resultado esperado:** `mercado` y `torre`, en el orden de `rutaNorte`.

**Pista:** recorre una ruta y usa `has` sobre la otra.

### 5. Precios por código

Crea un `Map` donde `"MAP"` valga `12`, `"BRU"` valga `8` y `"CUER"` valga `5`. Muestra el precio de `"BRU"` y el tamaño del catálogo.

**Resultado esperado:** `8` y `3`.

### 6. Actualizar y borrar una ficha

Con el `Map` anterior, cambia el precio de `"MAP"` a `10`, elimina `"CUER"` y muestra el precio actualizado junto con la comprobación de que el código eliminado ya no existe.

**Resultado esperado:** `10` y `false`.

### 7. Recorrer claves y valores

Recorre el catálogo restante con `for...of` sobre sus pares `[codigo, precio]`. Muestra cada línea como `CODIGO: precio`.

**Resultado esperado:** dos líneas: `MAP: 10` y `BRU: 8`.

**Límite:** desestructura el par durante el recorrido; no uses posiciones numéricas como `par[0]`.

### 8. Decidir la colección

Para cada caso, elige entre `Set`, `Map` y array y justifica la elección en una frase: lista ordenada de tres pasos que puede repetir nombres; identificadores de cliente que no deben duplicarse; relación entre código de producto y precio.

Después implementa solo el segundo caso con los datos `"c1"`, `"c2"`, `"c1"` y muestra el número de identificadores distintos.

**Resultado esperado:** `2`.