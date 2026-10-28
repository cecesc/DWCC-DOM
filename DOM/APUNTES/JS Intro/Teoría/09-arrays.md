# Arrays

[Ejercicios](../Ejercicios/09-arrays.md)

**Prerrequisitos:** funciones y bucles (temas 07–08). Un array es una colección ordenada, de índices desde `0` y longitud variable. Conviene que sus elementos representen la misma clase de dato.

## Crear, acceder y modificar extremos

```js
const inventario = ["mapa", "poción"];
inventario.push("llave"); // añade al final; devuelve la longitud
const ultimo = inventario.pop(); // retira y devuelve "llave"
inventario.unshift("brújula"); // añade al inicio
const primero = inventario.shift(); // retira y devuelve "brújula"

console.log(inventario[0], inventario.length, inventario[20], ultimo, primero);
// mapa 2 undefined llave brújula
```

El acceso fuera de rango devuelve `undefined`, no lanza excepción. `[3]` crea un array de **un elemento** cuyo valor es `3`; `new Array(3)` crea longitud 3 con tres huecos. Evita esta última forma: los huecos no equivalen a `undefined` explícito.

```js
console.log([3]); // [3]
console.log(new Array(3)); // [ <3 empty items> ]
```

`slice(inicio, finExclusivo)` crea una parte sin mutar. `splice(inicio, cantidad, ...nuevos)` cambia el original. Para vaciar un array compartido conservando su identidad usa `lista.length = 0`; `lista = []` solo cambia la variable actual.

```js
const letras = ["a", "b", "c", "d"];
console.log(letras.slice(1, 3)); // ["b", "c"]
letras.splice(1, 2, "x");
console.log(letras); // ["a", "x", "d"]
```

## `for...of` frente a `forEach`

`for...of` es una estructura del lenguaje; `forEach` es un método que llama a un callback por cada elemento presente. El nombre distingue mayúsculas: se escribe `forEach`, no `foreach`.

| Pregunta | `for...of` | `array.forEach(callback)` |
|---|---|---|
| Control de salida | `break` y `continue` | No hay salida anticipada normal |
| `return` | Si el bucle está dentro de una función, sale de esa función | Sale solo del callback, no de la función que llama a `forEach` |
| Resultado | No crea uno automáticamente | Devuelve `undefined`; ignora retornos |
| Espera asíncrona | Puede usar `await` en una función `async` | No espera las promesas del callback |
| Uso típico | Control, búsqueda, secuencia | Acción síncrona por elemento |
| Datos de cada vuelta | Valor del iterable; `.entries()` permite obtener índice y valor en arrays | El callback de array recibe `(valor, indice, array)` |
| Colecciones | Cualquier iterable: arrays, strings, `Set`, `Map`, etc. | Es un método; los `forEach` de otras colecciones tienen contratos propios |

```js
const nombres = ["Luna", "Sol", "Mar"];
for (const nombre of nombres) {
  console.log(nombre); // Luna, Sol, Mar (una línea por valor)
}
nombres.forEach((nombre, indice) => {
  console.log(`${indice}: ${nombre}`);
});
// 0: Luna
// 1: Sol
// 2: Mar

for (const [indice, nombre] of nombres.entries()) {
  console.log(`${indice}: ${nombre}`); // el mismo resultado
}
```

`entries()` ofrece pares de índice y valor; `[indice, nombre]` extrae las dos partes. Esta sintaxis se desarrolla en [Desestructuración y spread](12-desestructuracion-spread.md). No confundas el índice que recibe `Array.forEach` con los argumentos de los métodos de [`Map` y `Set`](10-set-map.md).

Un `for...of` es una sentencia, no una expresión que puedas asignar: `const resultado = for (...)` es sintaxis inválida. En cambio, puedes guardar el retorno de una llamada a `forEach`, aunque será `undefined`.

```js
const numeros = [1, 2, 3, 4];
const visitados = [];
numeros.forEach(numero => {
  if (numero === 2) return;
  visitados.push(numero);
});
console.log(visitados); // [1, 3, 4]

function primerMayorQueDos(valores) {
  for (const valor of valores) if (valor > 2) return valor;
  return undefined;
}
console.log(primerMayorQueDos(numeros)); // 3
```

`break` y `continue` dentro del callback de `forEach` son un error de sintaxis: no pueden cruzar una frontera de función. `forEach` omite huecos; `for...of` los visita como `undefined`. No añadas o quites elementos de la misma colección durante el recorrido.

```js
const conHuecos = [10, , 30];
const porBucle = [];
const porCallback = [];
for (const valor of conHuecos) porBucle.push(valor);
conHuecos.forEach(valor => porCallback.push(valor));
console.log(porBucle); // [10, undefined, 30]
console.log(porCallback); // [10, 30]
```

`forEach` fija el límite de longitud al empezar; el iterador de un array usado por `for...of` puede alcanzar elementos añadidos después. Un hueco no es lo mismo que un elemento explícito con valor `undefined`.

## Buscar, filtrar y transformar

```js
const productos = [
  { id: 1, nombre: "Mapa", precio: 12 },
  { id: 2, nombre: "Poción", precio: 5 },
  { id: 3, nombre: "Llave", precio: 8 }
];
const nombres = productos.map(p => p.nombre);
const baratos = productos.filter(p => p.precio < 10);
const elegido = productos.find(p => p.id === 2);
const hayOferta = productos.some(p => p.precio < 6);
const preciosValidos = productos.every(p => p.precio >= 0);
const total = productos.reduce((suma, p) => suma + p.precio, 0);
console.log(nombres, baratos.length, elegido.nombre, hayOferta, preciosValidos, total);
// ["Mapa", "Poción", "Llave"] 2 Poción true true 25
```

- `map`: un resultado por elemento; no lo uses solo por efectos.
- `filter`: los que cumplen la condición.
- `find`: primero o `undefined`; comprueba antes de acceder a propiedades.
- `some`/`every`: “alguno”/“todos”; en un array vacío dan `false`/`true`.
- `reduce`: acumula; con inicial `0`, un array vacío suma `0`; sin inicial, el vacío lanza error.
- `includes`: busca por igualdad de valores; para objetos compara identidad, no contenido.

## Mutación, copias y ordenación

`push`, `pop`, `shift`, `unshift`, `splice`, `sort` y `reverse` mutan. `slice`, `map`, `filter`, `concat` y spread crean otro array, aunque sus objetos internos sigan compartidos. `sort()` sin comparador ordena texto, no números.

```js
const precios = [20, 3, 100];
const ordenados = [...precios].sort((a, b) => a - b);
console.log(precios); // [20, 3, 100]
console.log(ordenados); // [3, 20, 100]
```

En entornos modernos, `toSorted`, `toReversed` y `toSpliced` son alternativas que crean otro array sin reordenar o modificar el original. Las copias siguen siendo superficiales: un callback que muta objetos puede afectar a datos compartidos incluso si se usa `map`.

## Adelanto: callbacks `async`

La asincronía se explica por completo en [Asincronía y JSON](19-asincronia-json.md); no es requisito de estos ejercicios. Desde ahora recuerda que `forEach(async ...)` inicia callbacks y no espera sus promesas. Poner `await` delante de `forEach` tampoco espera su trabajo: el método devuelve `undefined`. Un `try/catch` alrededor de esa llamada no captura los rechazos posteriores de sus callbacks.

Para pasos dependientes se usa `for...of` con `await`; para operaciones independientes, `await Promise.all(valores.map(operacionAsync))`. Elegir secuencia o concurrencia es una decisión de contrato, no una diferencia de estilo. `Promise.all` no limita la concurrencia ni cancela las otras operaciones cuando una rechaza.