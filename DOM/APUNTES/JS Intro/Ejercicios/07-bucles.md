# Bucles

[Teoría: bucles](../Teoría/07-bucles.md)

**Entorno:** consola de Node.js o consola del navegador.  
**Prerrequisitos:** [condicionales](06-condicionales.md).  
**Criterio de finalización:** cada recorrido termina, visita los datos que se piden y produce las salidas indicadas sin usar funciones ni métodos de arrays con callback.

## Actividades

### 1. Cuenta de casillas

Usa un bucle `for` para mostrar las casillas del `1` al `5`, una por línea, con el formato `Casilla: N`.

**Resultado esperado:** cinco líneas, desde `Casilla: 1` hasta `Casilla: 5`.

**Comprueba:** la variable de control no debe empezar en `0` si quieres que la primera casilla sea `1`.

### 2. Cuenta atrás del temporizador

Con `let segundos = 3;`, usa `while` para mostrar `3`, `2`, `1` y después, fuera del bucle, `¡Salida!`.

**Resultado esperado:**

```text
3
2
1
¡Salida!
```

**Límite:** actualiza `segundos` dentro del bucle para que la condición llegue a ser falsa.

### 3. Primer intento obligatorio

Un terminal debe pedir un intento al menos una vez. Declara `let intento = 0;` y usa `do...while` para incrementar e imprimir `Intento 1`; continúa mientras `intento < 1`.

**Resultado esperado:** una única línea: `Intento 1`.

**Pregunta:** ¿por qué con un `while (intento < 1)` el cuerpo también se ejecutaría aquí, pero con una condición inicialmente falsa no ocurriría lo mismo?

### 4. Recorrido de una ruta

Parte de:

```js
const ruta = ["plaza", "puente", "mercado"];
```

Recorre los lugares con `for...of` y muestra cada uno como `Visita: lugar`.

**Resultado esperado:** `Visita: plaza`, `Visita: puente` y `Visita: mercado`, en ese orden.

### 5. La primera salida bloqueada

Con `const puertas = ["cerrada", "cerrada", "abierta", "abierta"];`, recórrelas con `for...of`. Muestra `"Puerta abierta"` solo al encontrar la primera `"abierta"` y termina el bucle inmediatamente.

**Resultado esperado:** aparece exactamente una línea `Puerta abierta`.

**Pista:** `break` termina el bucle más cercano.

### 6. Inventario sin huecos

Parte de:

```js
const inventario = ["mapa", "", "linterna", "", "cuerda"];
```

Usa un `for` con índices. Omite las cadenas vacías con `continue` y muestra los demás elementos con su índice original: `0: mapa`, `2: linterna`, `4: cuerda`.

**Resultado esperado:** exactamente esas tres líneas.

**Comprueba:** `continue` no debe detener el recorrido completo.

### 7. Tabla de precios

Un producto cuesta `7` monedas. Usa dos bucles anidados `for` para mostrar el precio de `1`, `2` y `3` unidades para cada una de estas zonas: `norte` y `sur`.

**Formato de cada línea:** `zona — N unidades: X`.

**Resultado esperado:** seis líneas; por ejemplo, la primera debe ser `norte — 1 unidades: 7` y la última `sur — 3 unidades: 21`.

**Límite:** declara las zonas como una lista y recórrelas con `for...of`; el número de unidades se repite con `for`.

### 8. Búsqueda con límite

Con `const codigos = [14, 28, 35, 42, 56];`, busca `42` con un bucle y muestra `Encontrado en posición 3` al hallarlo. Si no aparece tras recorrer la lista, muestra `No encontrado`.

**Resultado esperado:** `Encontrado en posición 3`.

**Reto:** cambia el objetivo a `99` sin duplicar el mensaje de error ni usar `find`; el programa debe mostrar `No encontrado`.