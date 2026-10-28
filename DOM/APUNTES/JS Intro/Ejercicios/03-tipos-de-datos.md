# 03. Ejercicios de tipos de datos

[Teoría](../Teoría/03-tipos-de-datos.md)

**Preparación:** lee la teoría de este tema y trabaja con los conceptos de los temas anteriores.

**Entorno:** consola del navegador o un archivo `.js` ejecutado con Node. Resuelve cada actividad por separado; no necesitas HTML.

Primero predice, después ejecuta. No hace falta usar bucles ni escribir funciones.

## 1. Aduana de valores

Indica el tipo real y el resultado de `typeof` para estos valores:

`"99"`, `99`, `false`, `"false"`, `undefined`, `null`, `99n`, `Symbol("pase")`, `{ nivel: 2 }` y `["mapa"]`.

**Comprueba:** hay dos casos en los que `typeof` no cuenta toda la historia. Explica cuáles son y cómo los distinguirías.

## 2. Ficha del aventurero

Declara un nombre como texto, un nivel como número, `tieneEspada` como booleano, una mascota como `null` y una variable `titulo` sin inicializar.

Muestra cada valor junto con su tipo. **Comprueba:** deben aparecer los tipos `string`, `number`, `boolean`, `object` y `undefined`, en ese orden. Explica por qué aparece `object` para la mascota.

## 3. El código postal no se suma

Guarda `"00703"` sin perder sus ceros iniciales. Muestra el valor y su tipo.

**Pregunta:** ¿por qué es más adecuado usar texto que un número para este dato?

## 4. Cofre sorpresa

Declara `premio` con el número `500` y luego reasígnale el texto `"Una cuchara encantada"`. Muestra su tipo antes y después.

**Comprueba:** debes obtener `number` y `string` sin error de reasignación.

## 5. Las monedas del formulario

Recibes `"30"` como texto y quieres añadir una recompensa numérica de `7`. Convierte el dato y muestra el total junto con su tipo.

**Comprueba:** el total debe ser el número `37`, no el texto `"307"`.

## 6. Verdadero, falso o travieso

Predice el resultado de convertir a booleano estos valores: `""`, `"false"`, `0`, `"0"`, `null`, `[]` y `{}`. Después comprueba tus predicciones.

**Pista:** una colección vacía no se comporta como una cadena vacía.

## 7. Tres detectores

Crea `mochila` como array, `companero` como `null` y `energia` como el resultado de `Number("agotada")`.

Escribe tres comprobaciones que detecten, respectivamente, un array, `null` y `NaN`.

**Comprueba:** las tres deben imprimir `true`. No basta con mostrar `typeof`.

## 8. La tienda de identidades

Crea dos símbolos con la descripción `"cliente"` y compáralos con `===`. Crea también un entero `bigint` con valor `9007199254740993n` y súmale `10n`.

**Comprueba:** la comparación debe dar `false` y la suma debe representar el entero exacto `9007199254741003` como `bigint`.

## 9. El falso VIP

Una web entrega `const vipTexto = "false";`. Crea un booleano `esVip` que solo sea verdadero si el texto recibido es exactamente `"true"`. Asume que solo se recibirán esas dos palabras.

**Comprueba:** prueba una vez con `"false"` y otra con `"true"`. El resultado debe ser `false` y `true`, respectivamente.

**Pista:** convertir directamente con `Boolean` no resuelve este problema.

## 10. Inventario de la nave

Crea un objeto `nave` con nombre de texto, combustible numérico, un booleano `escudoActivo` y un array `carga` de tres objetos transportados, representados por sus nombres como texto.

Muestra el nombre de la nave, el primer elemento de la carga y una comprobación de que `carga` es un array.

**Comprueba:** usa propiedades e índices para leer los datos, en lugar de volver a escribir los valores en `console.log`. La última salida debe ser `true`.

---

**Criterio de finalización:** comprueba los resultados pedidos y explica las decisiones o errores que señale cada enunciado. No basta con copiar una salida fija cuando se pide calcularla.
