# 03. Tipos de datos

[Ejercicios](../Ejercicios/03-tipos-de-datos.md)

## El inventario de los valores

Imagina el inventario de un juego: el nombre del personaje es texto, sus monedas son un número y saber si tiene una llave es una respuesta de sí o no. Son datos distintos y no conviene tratarlos igual.

`let`, `const` y `var` indican **cómo declaras una variable**. `string`, `number` y los demás tipos indican **qué clase de valor contiene**. No son dos listas de lo mismo.

JavaScript tiene tipado dinámico: el tipo pertenece al valor y una variable con `let` puede recibir valores de tipos distintos.

```js
let botin = 100;
console.log(typeof botin);
botin = "Una patata legendaria";
console.log(typeof botin);
```
```text
number
string
```

`typeof` devuelve una cadena con información sobre el tipo. Es una lupa útil, aunque tiene un par de puntos ciegos que veremos enseguida.

## Los siete tipos primitivos

Los primitivos son los valores básicos del lenguaje. Son inmutables: no se modifican por dentro. Reasignar una variable es darle otro valor, no transformar internamente el anterior.

| Tipo | Para qué sirve | Ejemplo | `typeof` devuelve |
| --- | --- | --- | --- |
| `string` | Texto. | `"Dragón"` | `"string"` |
| `number` | Números enteros y decimales. | `30`, `2.5` | `"number"` |
| `boolean` | Verdadero o falso. | `true`, `false` | `"boolean"` |
| `undefined` | Por ejemplo, el valor de una variable declarada sin inicializar. | `undefined` | `"undefined"` |
| `null` | Ausencia de valor indicada explícitamente. | `null` | `"object"` (peculiaridad histórica) |
| `bigint` | Enteros de tamaño arbitrario, limitados por los recursos disponibles. | `9007199254740993n` | `"bigint"` |
| `symbol` | Identificadores únicos. | `Symbol("id")` | `"symbol"` |

Los cuatro primeros aparecerán continuamente. `null` también es habitual. De momento, basta con reconocer `bigint` y `symbol` sin dominar todos sus usos.

## `string`: texto con envoltorio

Un nombre, una contraseña y un código postal pueden ser cadenas. Que algo tenga cifras no significa que debas calcular con ello.

```js
const personaje = "Lola";
const codigoPostal = "08001";
console.log(personaje);
console.log(typeof personaje);
console.log(codigoPostal);
console.log(typeof codigoPostal);
```
```text
Lola
string
08001
string
```

Guardar el código postal como texto conserva el cero inicial. No vamos a sumar dos códigos postales para fabricar una ciudad nueva.

`"42"` es texto; `42` es un número. La consola puede mostrarlos de forma parecida: consulta `typeof` cuando tengas dudas.

## `number`: monedas, distancias y decimales

JavaScript usa `number` tanto para enteros como para decimales. Los decimales se escriben con punto.

```js
const monedas = 42;
const pesoMochila = 3.5;
console.log(typeof monedas);
console.log(typeof pesoMochila);
console.log(monedas + 8);
```
```text
number
number
50
```

Los números tienen límites de precisión. Los enteros están garantizados como exactos entre `-(2 ** 53 - 1)` y `2 ** 53 - 1`; `**` significa potencia. Algunos cálculos decimales, como `0.1 + 0.2`, tampoco son exactos. Los veremos en la siguiente lección.

## `boolean`: el interruptor del juego

Un booleano solo tiene dos valores: `true` o `false`. Sin comillas.

```js
const tieneLlave = true;
const puertaAbierta = false;
console.log(tieneLlave);
console.log(typeof puertaAbierta);
console.log(typeof "false");
```
```text
true
boolean
string
```

`false` es un booleano. `"false"` es una palabra escrita dentro de una cadena. Parecen lo mismo a primera vista, pero JavaScript no los trata igual.

## `undefined` y `null`: dos formas de encontrar una casilla vacía

```js
let mascota;
const montura = null;
console.log(mascota);
console.log(typeof mascota);
console.log(montura);
console.log(typeof montura);
console.log(montura === null);
```
```text
undefined
undefined
null
object
true
```

- `mascota` vale `undefined`: la declaramos, pero no le asignamos un valor.
- `montura` vale `null`: indicamos intencionadamente que no hay montura.
- **`null` es un primitivo, no un objeto.** El resultado de `typeof null` es una peculiaridad histórica.
- Para comprobar si algo es `null`, usa `valor === null`. `===` compara sin convertir tipos; lo estudiaremos en la siguiente lección.

Leer directamente una variable que nunca declaraste provoca un `ReferenceError`. No es lo mismo que leer `mascota`, que sí existe y contiene `undefined`.

## `bigint` y `symbol`: dos invitados especiales

```js
const tesoroGigante = 9007199254740993n;
console.log(typeof tesoroGigante);
console.log(tesoroGigante + 2n);

const fichaA = Symbol("jugador");
const fichaB = Symbol("jugador");
console.log(typeof fichaA);
console.log(fichaA === fichaB);
```
```text
bigint
9007199254740995n
symbol
false
```

El sufijo `n` crea un `bigint`. Sirve para enteros, no para fracciones. No mezcles directamente `bigint` y `number` en una suma: `1n + 1` provoca un `TypeError`; `1n + 1n` sí funciona. La consola del navegador puede representar un `bigint` de otra forma; aquí mostramos la salida de Node.js.

Cada llamada a `Symbol("jugador")` crea un símbolo diferente. La descripción es una etiqueta para humanos, no una identidad compartida. Dos entradas con el mismo nombre no son la misma entrada.

## Objetos y arrays: datos en grupo

Los primitivos no lo son todo. El tipo `object` permite reunir información relacionada.

```js
const heroe = { nombre: "Lola", nivel: 3 };
const mochila = ["mapa", "queso", "linterna"];
console.log(heroe.nombre);
console.log(mochila[0]);
console.log(typeof heroe);
console.log(typeof mochila);
console.log(Array.isArray(mochila));
console.log(Array.isArray(heroe));
```
```text
Lola
mapa
object
object
true
false
```

- `{ nombre: "Lola", nivel: 3 }` es un objeto con propiedades. `heroe.nombre` lee la propiedad `nombre`.
- Un array es un objeto especializado para colecciones ordenadas. Sus posiciones empiezan en `0`: `mochila[0]` es el primer elemento.
- `typeof` devuelve `"object"` para ambos. Para reconocer un array, usa `Array.isArray(valor)`.

No hay un tipo primitivo `array`. Las funciones también son objetos, pero `typeof` las identifica con `"function"`: por ejemplo, `typeof console.log` devuelve `"function"`. No hace falta escribir funciones propias todavía.

## Conversiones: cambiar de formato a propósito

Si recibes `"20"` como texto y quieres calcular con él, puedes convertirlo. Las herramientas más comunes son `Number`, `String` y `Boolean`.

```js
const monedasTexto = "20";
const monedas = Number(monedasTexto);
console.log(monedas + 5);
console.log(typeof monedas);
console.log(String(42));
console.log(typeof String(42));
console.log(Boolean(0));
console.log(Boolean(1));
```
```text
25
number
42
string
false
true
```

`String(42)` se imprime como `42`, pero su tipo es `string`. Lo que ves en pantalla no siempre basta para identificar un dato.

### La trampa de `"false"`

```js
console.log(Boolean(""));
console.log(Boolean("false"));
console.log(Boolean("0"));
console.log(Boolean([]));
```
```text
false
true
true
true
```

`Boolean` no traduce palabras. Una cadena no vacía es verdadera al convertirla, aunque contenga la palabra `"false"`.

Los valores habituales que se convierten en `false` (*falsy*) son `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` y `NaN`. Los demás valores habituales son *truthy*, incluidos los arrays y objetos vacíos. Hay una excepción histórica del navegador, `document.all`, que no usaremos aquí.

Si tu dato es el texto `"true"` o `"false"`, puedes comprobar `dato === "true"` en lugar de convertirlo con `Boolean`.

## `NaN`: una conversión que no salió bien

```js
const resultado = Number("tres dragones");
console.log(resultado);
console.log(typeof resultado);
console.log(Number.isNaN(resultado));
console.log(Number.isNaN("tres dragones"));
console.log(Number(""));
console.log(Number("   "));
```
```text
NaN
number
true
false
0
0
```

`NaN` significa *Not a Number*, pero es un valor especial de tipo `number`. No es un octavo tipo primitivo.

Para detectarlo, usa `Number.isNaN(valor)`. No uses `valor === NaN`: ni siquiera `NaN === NaN` es verdadero. `Number.isNaN` no convierte primero el dato, por eso devuelve `false` cuando recibe directamente una cadena.

Ojo: `Number("")` y `Number("   ")` producen `0`. Convertir no equivale a validar si un dato tiene sentido para tu aplicación.

---

Continúa con los [ejercicios de tipos de datos](../Ejercicios/03-tipos-de-datos.md).
