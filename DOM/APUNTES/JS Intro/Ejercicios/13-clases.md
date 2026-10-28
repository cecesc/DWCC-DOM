# Clases

[Teoría: clases](../Teoría/13-clases.md)

**Entorno:** consola de Node.js o consola del navegador con soporte de campos privados.  
**Prerrequisitos:** [objetos](11-objetos.md) y [desestructuración y spread](12-desestructuracion-spread.md).  
**Criterio de finalización:** cada instancia conserva el estado esperado y los métodos, accesores, campos privados o miembros estáticos se comportan según se pide.

Las actividades 1–3 se amplían en orden, igual que las 7–8. La parte de rechazos y `try...catch` de la actividad 4 se retoma después del [tema 14: errores](../Teoría/14-errores.md); primero puedes practicar el getter y el setter con precios válidos.

## Actividades

### 1. Primera ficha de producto

Declara una clase `Producto` cuyo constructor reciba `nombre` y `precio` y los guarde en la instancia. Crea `mapa` con `"mapa"` y `12`; muestra ambas propiedades.

**Resultado esperado:** `mapa` y `12`.

### 2. Stock con valor inicial

Amplía `Producto` para que el constructor reciba `stock = 0` como tercer parámetro. Crea una brújula sin pasar stock y una cuerda con stock `4`; muestra los dos stocks.

**Resultado esperado:** `0` y `4`.

### 3. Método de presentación

Añade a `Producto` un método `resumen()` que devuelva `"nombre: precio monedas"` usando las propiedades de la instancia. Llámalo sobre un producto `"tiza"` de precio `2`.

**Resultado esperado:** `tiza: 2 monedas`.

**Límite:** el método debe leer el estado de la instancia, no cerrar sobre variables externas.

### 4. Precio con validación

Crea una clase `Oferta` con una propiedad interna para el precio y un `get precio`. El `set precio(nuevoPrecio)` debe rechazar valores menores que `0` lanzando un `RangeError` con el mensaje `"Precio negativo"`; para el resto, debe actualizar el valor.

**Comprobación:** crea una oferta con `5`, asigna `8` y muestra `8`. Prueba la asignación negativa dentro de `try...catch` y muestra el mensaje capturado.

**Resultado esperado:** `8` y `Precio negativo`.

### 5. Código privado

Declara una clase `Pedido` con un campo privado `#codigo` inicializado en el constructor. Añade un método público `verCodigo()` que devuelva ese código. Crea un pedido con `"P-80"` y muestra el retorno.

**Resultado esperado:** `P-80`.

**Comprueba:** no intentes leer `pedido.#codigo` fuera de la clase; sería un error de sintaxis.

### 6. Contador compartido

Crea una clase `Ticket` con un campo estático que cuente cuántas instancias se han creado. El constructor debe aumentar el contador y un método estático debe devolverlo. Crea tres tickets y muestra el contador desde la clase.

**Resultado esperado:** `3`.

**Límite:** el contador pertenece a la clase, no a cada objeto individual.

### 7. Categoría especializada

Crea `ProductoDigital` que herede de `Producto`. Su constructor recibe `nombre`, `precio` y `tamanoMb`; debe llamar a `super` para inicializar la parte de producto y guardar el tamaño. Crea una instancia con `"mapa PDF"`, `3` y `15`.

**Resultado esperado:** muestra `mapa PDF`, `3` y `15` desde la instancia.

### 8. Resumen heredado y ampliado

Sobrescribe `resumen()` en `ProductoDigital` para que use `super.resumen()` y añada `" (N MB)"`. Pruébalo con el producto digital anterior.

**Resultado esperado:** `mapa PDF: 3 monedas (15 MB)`.

**Comprueba:** la versión de la subclase reutiliza el texto de la superclase en lugar de duplicar su formato.