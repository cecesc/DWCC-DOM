# Funciones

[Ejercicios](../Ejercicios/08-funciones.md)

**Prerrequisitos:** control de flujo (temas 06–07). Una función recibe entradas, cumple un contrato y devuelve un resultado; no hace falta crear una clase para declararla.

## Declaración, expresión y flecha

```js
function calcularTotal(precio, unidades = 1) {
  return precio * unidades;
}

const descontar = function (precio, descuento) {
  return precio - descuento;
};

const duplicar = (numero1) => {
  numero * 2;
};
const crearProducto = (nombre) => ({ nombre, disponible: true });

console.log(calcularTotal(6, 3)); // 18
console.log(calcularTotal(6)); // 6
console.log(crearProducto("Mapa").disponible); // true
```

Una declaración puede llamarse antes de aparecer en su ámbito. Una función en `const` no puede usarse antes de inicializar esa constante. El valor por defecto se aplica si falta el argumento o vale `undefined`, no si vale `null`. Una flecha de expresión devuelve esa expresión; con llaves se necesita `return`. Los paréntesis de `({ ... })` distinguen un objeto devuelto de un bloque.

Sin `return`, el resultado es `undefined`: mostrar algo con `console.log` no sustituye devolverlo.

## Parámetros, contratos y ámbito

JavaScript no tiene sobrecarga por número o tipo de argumentos. Usa valores por defecto o un objeto de opciones cuando el contrato crezca. Las variables `let` y `const` tienen ámbito de bloque; `var` tiene ámbito de función, permite lecturas previas como `undefined` y se debe evitar. Acceder a `let`/`const` antes de inicializarlas lanza `ReferenceError` (zona temporal muerta).

```js
const nombre = "Exterior";
if (true) {
  const nombre = "Interior";
  console.log(nombre); // Interior
}
console.log(nombre); // Exterior
```

Una función fiable no depende sin necesidad de variables globales y deja explícito qué entrada espera y qué salida da.

## Closures: estado conservado

Una función creada dentro de otra conserva acceso al ámbito donde nació incluso cuando la exterior terminó. Eso es un _closure_: conserva las variables, no una fotografía inmutable.

```js
function crearContador() {
  let cuenta = 0;
  return () => {
    cuenta++;
    return cuenta;
  };
}

const siguiente = crearContador();
console.log(siguiente()); // 1
console.log(siguiente()); // 2
console.log(crearContador()()); // 1: contador distinto
```

Es la base de estado privado sencillo, manejadores de eventos y callbacks. La variable `cuenta` sigue siendo la misma para `siguiente`.

## Callbacks

Un callback es una función entregada para que otra la invoque; no significa necesariamente asincronía.

```js
function aplicar(valor, operacion) {
  return operacion(valor);
}
console.log(aplicar(5, (numero) => numero * 3)); // 15
```

Se pasa `guardar`, no `guardar()`: la segunda forma la ejecuta inmediatamente y entrega su resultado. Arrays y eventos usan callbacks; los contratos concretos se desarrollan en los temas 09 y 18.

## `this`: depende de la llamada

A diferencia de Java, una función normal determina `this` por cómo se invoca.

```js
const jugador = {
  nombre: "Luna",
  saludar() {
    return `Hola, ${this.nombre}`;
  },
};

console.log(jugador.saludar()); // Hola, Luna
const saludar = jugador.saludar.bind(jugador);
console.log(saludar()); // Hola, Luna
```

Al extraer `jugador.saludar` se pierde el receptor; en modo estricto una llamada suelta tiene `this === undefined`. `bind` fija el receptor. Una flecha **no crea** su propio `this`: hereda el exterior. Por ello no sirve como método si esperas que `this` sea el objeto contenedor; en eventos suele ser más claro usar `evento.currentTarget`.

Los errores y la recuperación se estudian de forma separada en el tema 14.
