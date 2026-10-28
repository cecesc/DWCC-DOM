# Arrays

[Teoría: arrays](../Teoría/09-arrays.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [bucles](07-bucles.md) y [funciones](08-funciones.md).  
**Criterio de finalización:** cada actividad conserva o modifica la lista según se pida y produce exactamente los valores indicados.

## Actividades

### 1. Estantes del inventario

Parte de `const inventario = ["mapa", "linterna", "cuerda"];`. Muestra el primer elemento, el último elemento y la longitud en tres líneas.

**Resultado esperado:** `mapa`, `cuerda`, `3`.

### 2. Llegada y salida de mercancía

Con `let pedidos = ["mapa", "brújula"];`, añade `"cantimplora"` al final y elimina el primer pedido. Muestra el array final.

**Resultado esperado:** una lista con `"brújula"` y `"cantimplora"`, en ese orden.

**Límite:** usa las operaciones de extremo del array; no vuelvas a escribir una lista nueva.

### 3. Copia sin alterar el original

Parte de `const zonas = ["puerto", "mercado", "torre"];`. Crea una nueva lista con solo `"mercado"` y `"torre"`, sin modificar `zonas`. Muestra las dos listas.

**Resultado esperado:** la original conserva tres elementos y la nueva contiene dos.

**Pista:** el límite final de `slice` no se incluye.

### 4. Dos recorridos, dos retornos

Con `const precios = [4, 7, 9];`, recórrelo una vez con `for...of` y otra con `forEach`, mostrando cada precio. Repite mostrando también el índice: usa `.entries()` en el bucle y el segundo parámetro del callback.

Guarda en una variable **solo el retorno de la llamada a `forEach`** y predícelo antes de ejecutar. Explica por qué no puedes asignar directamente una sentencia `for...of` a una variable.

**Resultado esperado:** ambos recorridos muestran los valores `4`, `7`, `9`, con índices `0`, `1`, `2`; el retorno de `forEach` es `undefined`.

Después escribe `primerPrecioMayorQueCinco(precios)` con `for...of`: debe devolver `7` y terminar al encontrarlo. Explica por qué sustituir su bucle por un `forEach` con `return precio` dentro del callback no devuelve ese precio desde la función exterior.

### 5. Precios con impuesto

Con `const precios = [10, 25, 4];`, crea mediante `map` una nueva lista donde cada precio tenga un 10 % de impuesto. Muestra la lista resultante y la original.

**Resultado esperado:** la nueva contiene `11`, `27.5`, `4.4`; la original sigue siendo `[10, 25, 4]`.

Si tu fórmula produce una pequeña diferencia de coma flotante, como `27.500000000000004`, compárala con una tolerancia de `1e-10`; no se exige igualdad exacta de esos decimales. El objetivo es transformar los precios sin mutar el array original.

### 6. Productos disponibles

Parte de:

```js
const productos = [
  { nombre: "mapa", stock: 3 },
  { nombre: "brújula", stock: 0 },
  { nombre: "cuerda", stock: 1 }
];
```

Crea con `filter` una lista de los productos cuyo `stock` sea mayor que `0`. Muestra solo sus nombres en orden.

**Resultado esperado:** `mapa` y `cuerda`.

### 7. Buscar una ficha concreta

En la lista de productos anterior, utiliza `find` para obtener el producto llamado `"brújula"`. Muestra su `stock`.

**Resultado esperado:** `0`.

**Comprueba:** si buscas `"tienda"`, trata el posible resultado `undefined` antes de intentar leer `.stock`.

### 8. Total del carrito

Con `const cantidades = [2, 3, 1];`, usa `reduce` y un acumulador inicial explícito para obtener la suma total.

**Resultado esperado:** `6`.

**Reto (para el tema 19):** no uses `setTimeout`, `fetch`, promesas ni `async` todavía. Cuando llegues a asincronía, transforma una lista obtenida de un JSON local con el mismo patrón `map` / `filter` / `reduce`.