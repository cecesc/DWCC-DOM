# 05. Strings

[Ejercicios](../Ejercicios/05-strings.md)

Un *string* es texto: el nombre de un personaje, el mensaje de una tienda o el título de una misión. En JavaScript puedes consultar y transformar ese texto con propiedades y métodos.

## Crear texto: comillas y backticks

Puedes delimitar un string con comillas dobles (`"texto"`) o simples (`'texto'`). Elige una y úsala de forma coherente; las dos crean strings. Los *backticks* (acentos graves) permiten además construir plantillas de texto.

```js
const jugador = "Luna";
const tienda = 'Pixel Shop';
const mensaje = `Hola, ${jugador}. Bienvenida a ${tienda}.`;

console.log(mensaje);
```
```text
Hola, Luna. Bienvenida a Pixel Shop.
```

Dentro de un backtick, `${...}` inserta el valor de una variable o de una expresión. A esto se le llama **interpolación**. En vez de unir muchos fragmentos con `+`, una plantilla suele hacer el mensaje más fácil de leer.

```js
const monedas = 24;
const precio = 9;
const recibo = `Te quedan ${monedas - precio} monedas.`;

console.log(recibo);
```
```text
Te quedan 15 monedas.
```

## Caracteres especiales: escapes

Si necesitas escribir dentro del texto la misma comilla que lo delimita, coloca una barra invertida (`\`) antes de ella. La barra inicia una **secuencia de escape**. También puedes usar `\n` para insertar un salto de línea.

```js
const aviso = "El guardia dijo: \"Puerta cerrada\".\nPrueba otra llave.";

console.log(aviso);
```
```text
El guardia dijo: "Puerta cerrada".
Prueba otra llave.
```

## Los strings no cambian por dentro

Los strings son **inmutables**: los métodos no modifican el texto original. Los que transforman texto, como `toUpperCase()`, devuelven un string nuevo. Otros devuelven booleanos, números o arrays, según la operación. Puedes guardar un texto transformado en otra constante, o reasignarlo si la variable se declaró con `let`.

```js
const codigoOriginal = "nivel-1";
const codigoNuevo = codigoOriginal.toUpperCase();

console.log(codigoOriginal);
console.log(codigoNuevo);
```
```text
nivel-1
NIVEL-1
```

## Longitud y posiciones

`length` es una **propiedad**, no un método: se consulta sin paréntesis. Cuenta las unidades de código UTF-16 del string. Para texto cotidiano esto suele coincidir con los caracteres visibles; algunos símbolos menos comunes ocupan dos unidades, así que `length` no siempre equivale a “letras que se ven”.

Las posiciones comienzan en `0`. Los corchetes permiten leer un carácter en una posición, pero no modificarlo.

```js
const etiqueta = "Mapa";

console.log(etiqueta.length);
console.log(etiqueta[0]);
console.log(etiqueta[3]);
```
```text
4
M
a
```

## Limpiar y cambiar mayúsculas

`trim()` elimina espacios, tabulaciones y saltos de línea de los extremos. No toca el espacio que está entre dos palabras. `toUpperCase()` convierte letras a mayúsculas y `toLowerCase()` a minúsculas; los tres devuelven un string nuevo.

```js
const entrada = "  Oferta De Hoy  ";
const limpia = entrada.trim();

console.log(limpia);
console.log(limpia.toLowerCase());
console.log(limpia.toUpperCase());
```
```text
Oferta De Hoy
oferta de hoy
OFERTA DE HOY
```

## Buscar texto

`includes()` responde con `true` o `false` según encuentre un fragmento. `startsWith()` comprueba el inicio y `endsWith()` el final. Estas búsquedas distinguen mayúsculas de minúsculas: son **case-sensitive**.

```js
const archivo = "mision-final.txt";

console.log(archivo.includes("final"));
console.log(archivo.startsWith("mision"));
console.log(archivo.endsWith(".txt"));
```
```text
true
true
true
```

`indexOf()` localiza la primera aparición y devuelve su posición. Si no la encuentra, devuelve `-1`; por eso es importante comparar explícitamente con `-1` en lugar de usar el número como si fuera un booleano.

```js
const objeto = "pocion-curativa";

console.log(objeto.indexOf("cura"));
console.log(objeto.indexOf("oro"));
```
```text
7
-1
```

## Extraer una parte con `slice()`

`slice(inicio, fin)` crea un string con el tramo que empieza en `inicio` y termina **antes** de `fin`. El índice final está excluido. Si omites `fin`, toma hasta el final; los índices negativos cuentan desde el final.

```js
const ranking = "Luna|Neo|Sol";

console.log(ranking.slice(0, 4));
console.log(ranking.slice(5, 8));
console.log(ranking.slice(-3));
```
```text
Luna
Neo
Sol
```

## Reemplazar palabras

`replace(busqueda, reemplazo)` sustituye solo la primera aparición cuando `busqueda` es un string. `replaceAll(busqueda, reemplazo)` sustituye todas. Ambos devuelven el texto transformado y mantienen intacto el original.

```js
const pedido = "pocion, pocion, pocion";

console.log(pedido.replace("pocion", "elixir"));
console.log(pedido.replaceAll("pocion", "elixir"));
```
```text
elixir, pocion, pocion
elixir, elixir, elixir
```

## Separar y repetir

`split(separador)` divide un string y produce un **array**. Un array reúne varios valores; puedes acceder a uno con su índice o volver a unirlos con `join(separador)`. Aquí imprimimos un valor individual y un string unido para que la salida sea clara.

```js
const inventario = "llave|mapa|linterna";
const objetos = inventario.split("|");

console.log(objetos[1]);
console.log(objetos.join(" / "));
```
```text
mapa
llave / mapa / linterna
```

`repeat(cantidad)` repite un string la cantidad indicada. Es útil para separadores de una pantalla de puntuación.

```js
const separador = "-";

console.log(separador.repeat(8));
```
```text
--------
```

## Encadenar métodos

Si un método devuelve un string, puedes llamar al siguiente método de string sobre ese resultado. Este **encadenamiento** aplica transformaciones de izquierda a derecha. No todos los métodos devuelven texto: después de `includes()` tendrías un booleano, no un string al que aplicar `trim()`. Si la cadena se vuelve difícil de leer, separa los pasos en constantes con nombres claros.

```js
const nombreTienda = "  tienda pixel  ";
const titular = nombreTienda.trim().toUpperCase().replace("TIENDA ", "");

console.log(`>>> ${titular} <<<`);
```
```text
>>> PIXEL <<<
```

---

Continúa con los [ejercicios de strings](../Ejercicios/05-strings.md).
