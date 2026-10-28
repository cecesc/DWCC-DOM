# Bucles

[Ejercicios](../Ejercicios/07-bucles.md)

**Prerrequisitos:** condicionales (tema 06). Las funciones y los arrays se estudian después; aquí se usan listas sencillas solo para entender el recorrido.

## `for`, `while` y `do...while`

Usa `for` cuando conoces contador, límite o salto; `while` cuando la repetición termina al cambiar una condición; `do...while` cuando el cuerpo debe ocurrir al menos una vez.

```js
for (let intento = 1; intento <= 3; intento++) {
  console.log(`Intento ${intento}`);
}
// Intento 1, Intento 2, Intento 3

let vidas = 2;
while (vidas > 0) {
  console.log(`Vidas: ${vidas}`);
  vidas--;
}
// Vidas: 2, Vidas: 1

let vueltas = 0;
do {
  vueltas++;
} while (vueltas < 0);
console.log(vueltas); // 1
```

Un `while` necesita una actualización que pueda hacer falsa su condición. Un bucle infinito bloquea el hilo: en una página ni siquiera permite responder a un clic. Nunca uses un `while` para esperar una red; el tema 19 introduce la espera asíncrona.

## `break` y `continue`

`break` termina el bucle más cercano. `continue` descarta el resto de la vuelta actual. Ambos pertenecen al cuerpo del bucle, no a una función llamada desde él.

```js
let total = 0;
for (const precio of [12, -1, 8, 100, 5]) {
  if (precio < 0) continue; // no suma valores inválidos
  if (precio === 100) break; // deja de buscar
  total += precio;
}
console.log(total); // 20
```

La condición de corte debe preservar una idea clara: en el ejemplo solo se acumulan precios válidos anteriores al centinela `100`.

## `for...of`: valores de un iterable

`for...of` es el equivalente habitual de `for (Tipo elemento : coleccion)` de Java. Recorre valores de arrays, strings, `Set`, `Map` y otras colecciones iterables. `const` declara una vinculación nueva en cada vuelta; si el valor es un objeto, sus propiedades aún pueden cambiar.

```js
const colores = ["rojo", "azul"];
for (const color of colores) {
  console.log(color);
}
// rojo, azul

for (const [indice, color] of colores.entries()) {
  console.log(`${indice}: ${color}`);
}
// 0: rojo, 1: azul
```

Un objeto literal no es iterable. Cuando llegue el momento de recorrer sus propias propiedades se usará `Object.entries` en el tema 11.

### No confundir `for...in`

`for...in` recorre **nombres de propiedades enumerables** (y puede incluir heredadas); no los valores de un array. Sus índices además son strings.

```js
const colores = ["rojo", "azul"];
for (const clave in colores) console.log(clave); // "0", "1"
```

No lo uses para arrays. Para valores usa `for...of`; para transformar o buscar arrays, espera al tema 09.

## Elegir el recorrido

- Contador, índice o paso numérico: `for`.
- Repetir hasta que cambie una condición: `while`.
- Valores de una colección y posible salida anticipada: `for...of`.
- Acción sobre cada elemento sin controlar salida: `forEach` (tema 09, tras funciones y arrays).

No modifiques la colección que recorres salvo que su contrato lo requiera y entiendas sus efectos. El siguiente tema permite encapsular estos recorridos en funciones reutilizables.