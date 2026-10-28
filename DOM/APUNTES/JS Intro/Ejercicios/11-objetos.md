# Objetos

[Teoría: objetos](../Teoría/11-objetos.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [arrays](09-arrays.md) y [Set y Map](10-set-map.md).  
**Criterio de finalización:** cada actividad lee, modifica o copia propiedades con el comportamiento observable indicado.

## Actividades

### 1. Ficha de producto

Crea un objeto `producto` con las propiedades `nombre: "mapa"`, `precio: 12` y `disponible: true`. Muestra su nombre con notación de punto y su precio con notación de corchetes.

**Resultado esperado:** `mapa` y `12`.

### 2. Propiedad calculada

Parte de `const campo = "stock";` y del objeto `{ nombre: "brújula", stock: 4 }`. Muestra el valor cuyo nombre está guardado en `campo`.

**Resultado esperado:** `4`.

**Comprueba:** con `producto.campo` no se leería la propiedad que se pide.

### 3. Actualizar y retirar datos

Con `const pedido = { codigo: "P-17", estado: "pendiente", nota: "entrega por puerta norte" };`, cambia `estado` a `"enviado"`, elimina `nota` y muestra el objeto.

**Resultado esperado:** conserva `codigo` y `estado: "enviado"`; no contiene `nota`.

### 4. Método que usa su propia ficha

Crea un objeto `personaje` con `nombre: "Nora"`, `energia: 5` y un método `presentar()` que devuelva `"Nora tiene 5 de energía"` leyendo ambas propiedades desde el propio objeto. Muestra el retorno.

**Resultado esperado:** `Nora tiene 5 de energía`.

**Pista:** un método abreviado puede usar `this` para referirse al objeto de la llamada.

### 5. Dos nombres, un mismo objeto

Crea `const original = { stock: 2 };` y asigna `const compartido = original;`. Cambia `compartido.stock` a `0`. Muestra `original.stock` y la comparación `original === compartido`.

**Resultado esperado:** `0` y `true`.

**Comprueba:** explica en una frase por qué no son dos objetos independientes.

### 6. Copia superficial de una ficha

Con `const original = { nombre: "mapa", stock: 2 };`, crea una copia superficial mediante spread. Cambia solo el `stock` de la copia a `5` y muestra ambos stocks.

**Resultado esperado:** el original mantiene `2` y la copia muestra `5`.

### 7. Límite de la copia superficial

Parte de:

```js
const pedido = { codigo: "P-18", destino: { ciudad: "Lugo" } };
```

Crea una copia superficial de `pedido` y cambia en la copia `destino.ciudad` a `"León"`. Muestra las dos ciudades y explica el resultado.

**Resultado esperado:** ambas muestran `León`.

**Límite:** no intentes resolver todavía una copia profunda genérica.

### 8. Colección de fichas

Crea un array de tres objetos con `nombre` y `precio`. Recorre la lista y muestra únicamente los nombres cuyo precio sea inferior a `10`.

**Datos obligatorios:** `mapa` por `12`, `cuerda` por `5` y `tiza` por `2`.

**Resultado esperado:** `cuerda` y `tiza`, en ese orden.