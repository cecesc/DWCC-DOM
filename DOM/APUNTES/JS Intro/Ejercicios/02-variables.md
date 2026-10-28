# 02. Ejercicios de variables

[Teoría](../Teoría/02-variables.md)

**Preparación:** lee la teoría de este tema y trabaja con los conceptos de los temas anteriores.

**Entorno:** consola del navegador o un archivo `.js` ejecutado con Node. Resuelve cada actividad por separado; no necesitas HTML.

Resuelve cada ejercicio en un archivo o consola por separado. Usa `console.log` para comprobar tus resultados cuando se indique. No necesitas funciones, bucles ni HTML.

## 1. Declaración o tipo

Escribe una frase que explique por qué `const` no es un tipo de dato. Después, declara `tituloJuego` con `const`, asígnale un texto y muéstralo en consola.

**Comprueba:** tu explicación debe distinguir entre la forma de declarar un nombre y el valor que guarda.

## 2. La tienda no cambia de nombre

Crea una constante llamada `nombreTienda` con el nombre de una tienda imaginaria. Imprímela dos veces: una sola y otra acompañada del texto `"Bienvenido a"`, pasando ambos valores a `console.log` separados por una coma.

**Pista:** no reasignes la constante entre los dos mensajes.

## 3. Marcador de partida

Declara e inicializa `puntos` con `0` usando `let`. Súmale `25`, muéstralo, vuelve a sumarle `75` y muéstralo otra vez.

**Comprueba:** deben aparecer `25` y `100`, en ese orden.

## 4. Tres momentos de una variable

Declara `nivelActual` con `let` sin proporcionar un número inicial. Muestra su valor; después asígnale `1` y, en otra línea, reasígnale `2`. Añade comentarios que señalen la declaración y las asignaciones.

**Comprueba:** la primera salida debe ser `undefined`; al imprimir el valor final debe aparecer `2`.

## 5. Elegir `const` o `let`

Crea dos nombres: `nombreJugador`, que no cambiará, y `vidasRestantes`, que pasará de `3` a `2`. Elige la declaración adecuada para cada uno y muestra ambos valores tras el cambio.

**Pista:** decide primero cuál de los dos nombres se reasigna.

## 6. Corregir una constante

Este programa pretende mostrar `Café del Dragón`, pero tiene un error. Describe el error y reescríbelo de forma válida sin cambiar el resultado final.

```text
const nombreLocal;
nombreLocal = "Café del Dragón";
console.log(nombreLocal);
```

**Comprueba:** tu versión debe inicializar la constante en su declaración.

## 7. Nombres que se entienden

Convierte estos nombres en opciones descriptivas con `camelCase`: `a` para las monedas de un jugador, `nombre tienda` para una tienda y `2vidas` para las vidas restantes. Declara valores razonables con los nombres corregidos e imprímelos.

**Comprueba:** ningún identificador debe contener espacios ni empezar con un número.

## 8. Un nombre dentro del bloque

Crea un bloque con llaves. Fuera declara una constante `mensajeExterior`; dentro declara una constante `mensajeInterior`. Muestra los dos mensajes dentro del bloque y solo `mensajeExterior` después del bloque.

**Comprueba:** el programa debe ejecutarse sin intentar usar `mensajeInterior` fuera de las llaves.

## 9. Investigar `var`

Escribe un programa pequeño con una `var` declarada dentro de un bloque y muéstrala después de las llaves. Luego explica en una frase por qué, para código nuevo, preferirías `let` o `const` en ese caso.

**Pista:** usa un nombre relacionado con una sala de videojuego o una promoción de tienda.

## 10. Antes de declarar

Sin ejecutar código inválido, compara qué ocurre al leer un nombre antes de `var` y antes de `let`. Puedes escribir los dos fragmentos que producirían cada caso, dejando el de `let` en un bloque `text` y anotando el error esperado.

**Comprueba:** tu comparación debe mencionar `undefined` para `var`, `ReferenceError` para `let` y la zona temporal muerta.

---

**Criterio de finalización:** comprueba los resultados pedidos y explica las decisiones o errores que señale cada enunciado. No basta con copiar una salida fija cuando se pide calcularla.
