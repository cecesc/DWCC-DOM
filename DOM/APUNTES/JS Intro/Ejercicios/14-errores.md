# Errores

[Teoría: errores](../Teoría/14-errores.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [funciones](08-funciones.md) y [clases](13-clases.md).  
**Criterio de finalización:** los fallos intencionales se distinguen por tipo, los casos recuperables se capturan y los errores propios comunican el problema solicitado.

## Actividades

### 1. Clasificar dos fallos

Sin ejecutar los fragmentos a la vez, indica cuál produce `TypeError` y cuál produce `ReferenceError`. Después ejecútalos por separado para observar el tipo en el mensaje.

```js
const producto = null;
producto.nombre;
```

```js
console.log(codigoInexistente);
```

**Resultado esperado:** el primer fragmento es `TypeError`; el segundo es `ReferenceError`.

### 2. Capturar una conversión no válida

Declara `const texto = "doce";`. Convierte el valor con `Number`, detecta el `NaN` y lanza `new TypeError("Cantidad no numérica")`. Captura ese error y muestra solo su mensaje.

**Resultado esperado:** `Cantidad no numérica`.

**Límite:** `Number("doce")` no lanza por sí mismo; debes validar su resultado.

### 3. No ocultar errores ajenos

Escribe una función cuyo bloque `try` intente leer una propiedad de `null`. Su `catch` solo sabe tratar errores de tipo `RangeError`: muestra el `name` del error recibido y vuelve a lanzarlo si no es un `RangeError`. Ejecuta la llamada por separado; terminará con un error intencional.

**Resultado esperado:** se muestra `TypeError` antes de que el error siga propagándose.

**Comprueba:** no conviertas todo error en un texto de éxito.

### 4. Error de regla de negocio

Declara `retirar(stock, cantidad)`. Si `cantidad` es menor o igual que `0`, debe lanzar `new RangeError("Cantidad no válida")`. Si es mayor que el stock, debe lanzar `new RangeError("Stock insuficiente")`. En otro caso, devuelve el stock restante.

**Comprobación:** llama con `(5, 2)`, `(5, 0)` y `(5, 8)`, capturando los dos errores.

**Resultado esperado:** `3`, `Cantidad no válida` y `Stock insuficiente`.

### 5. Error propio con contexto

Crea una clase `ProductoNoEncontradoError` que extienda `Error`. Debe recibir un código y construir un mensaje `"Producto no encontrado: CODIGO"`; ajusta su `name` a `"ProductoNoEncontradoError"`.

Lanza y captura una instancia para el código `"X-9"`.

**Resultado esperado:** al mostrar `name` y `message` aparecen `ProductoNoEncontradoError` y `Producto no encontrado: X-9`.

### 6. `finally` siempre se ejecuta

Crea un `try...catch...finally` que intente validar `const stock = -1;`: lanza un `RangeError` si es negativo, muestra el mensaje en `catch` y muestra `"Validación terminada"` en `finally`.

**Resultado esperado:** primero el mensaje de error que hayas definido; después `Validación terminada`.

### 7. Devolver o lanzar

Parte de `const productos = [{ codigo: "M-1", nombre: "Mapa" }];`. Escribe dos versiones de una búsqueda por `codigo`: una que devuelva `undefined` cuando no haya coincidencia y otra que lance el `ProductoNoEncontradoError` de la actividad 5. Prueba ambas con `"M-1"` y con `"X-9"`.

**Resultado esperado:** con `"M-1"`, ambas devuelven la ficha del mapa. Con `"X-9"`, la primera devuelve `undefined`; captura el error de la segunda y muestra `Producto no encontrado: X-9`.

**Pregunta:** explica en qué caso preferirías cada contrato; no conviertas el error lanzado en un valor falso.