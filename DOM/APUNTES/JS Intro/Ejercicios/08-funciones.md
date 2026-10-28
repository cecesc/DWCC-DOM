# Funciones

[Teoría: funciones](../Teoría/08-funciones.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [bucles](07-bucles.md).  
**Criterio de finalización:** cada actividad declara y llama las funciones solicitadas; las salidas y retornos coinciden con lo indicado.

## Actividades

### 1. Saludo reutilizable

Declara una función `saludar(nombre)` que muestre `Hola, nombre.`. Llámala con `"Nora"` y con `"Ivo"`.

**Resultado esperado:**

```text
Hola, Nora.
Hola, Ivo.
```

**Límite:** no copies dos llamadas a `console.log` fuera de la función para formar los saludos.

### 2. Coste de un lote

Declara `calcularCoste(cantidad, precioUnitario)`. Debe **devolver** el producto de ambos argumentos, sin mostrar nada dentro. Guarda el resultado de `calcularCoste(3, 8)` en una constante y muéstralo desde fuera.

**Resultado esperado:** `24`.

**Comprueba:** la función debe tener `return`; una función que solo imprime no sirve para esta actividad.

### 3. Expresión de función

Crea una constante `describirProducto` que contenga una expresión de función. Debe recibir `nombre` y devolver `"Producto: nombre"`. Muestra el retorno al llamarla con `"mapa"`.

**Resultado esperado:** `Producto: mapa`.

**Límite:** declara la constante antes de invocarla.

### 4. Conversión con flecha

Escribe una función flecha `aMayusculas` que reciba un texto y devuelva su versión en mayúsculas. Úsala con `"linterna"`.

**Resultado esperado:** `LINTERNA`.

**Pista:** una flecha de una sola expresión puede devolverla de forma implícita.

### 5. Mensaje con valor por defecto

Declara `crearAviso(producto, unidades = 1)` para devolver `"producto: N unidad(es)"`. Llama una vez con `("cuerda")` y otra con `("cuerda", 3)`.

**Resultado esperado:** `cuerda: 1 unidad(es)` y `cuerda: 3 unidad(es)`.

**Comprueba:** no sustituyas el valor por defecto con un `if` dentro de la función.

### 6. Aplicar una regla recibida

Declara `aplicarAprecio(precio, regla)`, que devuelva el resultado de llamar a `regla` con `precio`. Crea después una función flecha que reciba un precio y le reste `2`; pásala como segundo argumento junto con `10`.

**Resultado esperado:** `8`.

**Pista:** aquí `regla` es un callback: una función entregada a otra función.

### 7. Alcance de bloque y de función

Declara `const zona = "exterior"` fuera de una función. Dentro de `mostrarZona`, declara otra constante llamada `zona` con `"interior"` y muestra ambas zonas sin que una reemplace a la otra: primero muestra la interior dentro de la función y después la exterior fuera.

**Resultado esperado:**

```text
interior
exterior
```

**Comprueba:** no declares la segunda constante en el mismo ámbito que la primera.

### 8. Contar coincidencias

Declara `contarCoincidencias(lista, buscado)` que recorra la lista con un bucle y devuelva cuántas veces aparece `buscado`. Pruébala con `["mapa", "llave", "mapa", "cuerda"]` y `"mapa"`.

**Resultado esperado:** `2`.

**Reto:** decide qué debe devolver al recibir una lista vacía y compruébalo con una llamada adicional.