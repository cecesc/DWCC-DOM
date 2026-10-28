# 02. Variables

[Ejercicios](../Ejercicios/02-variables.md)

## `var`, `let` y `const` no son tipos de datos

Es habitual oír «tipos de variables», pero `var`, `let` y `const` son **formas de declarar** un nombre en JavaScript; no describen el tipo del valor. El valor puede ser un texto, un número o cualquier otro tipo que veremos con detalle en la siguiente lección.

Piensa en el nombre como una etiqueta del inventario de una tienda: la declaración decide cómo se puede usar la etiqueta, mientras que el valor es lo que la etiqueta señala.

```js
const productoDestacado = "mapa del tesoro";
console.log(productoDestacado);
```
```text
mapa del tesoro
```

En código nuevo preferimos `const` y `let`. `var` sigue existiendo porque muchos programas antiguos lo usan, así que conviene entender sus diferencias.

## Declarar, inicializar y reasignar

**Declarar** introduce un nombre en su ámbito. **Inicializar** establece su valor inicial. **Reasignar** cambia el valor asociado a ese nombre. El signo `=` hace una asignación; no pregunta si dos valores son iguales.

```js
let monedas;
monedas = 5;
console.log(monedas);
monedas = 12;
console.log(monedas);
```
```text
5
12
```

Al ejecutarse `let monedas;`, la variable queda inicializada con `undefined`, que indica aquí que no hemos proporcionado un valor. `monedas = 5;` le asigna después un número y `monedas = 12;` vuelve a cambiarlo. Puedes declarar y proporcionar un valor en la misma línea, como `let monedas = 5;`: suele ser más claro cuando ya conoces el dato.

## `const`: la opción habitual

Usa `const` cuando no planeas reasignar el nombre. Es una buena elección por defecto: comunica que la etiqueta no va a apuntar a otra cosa y evita reasignaciones accidentales.

```js
const nombreTienda = "Pixel y Papel";
console.log(nombreTienda);
```
```text
Pixel y Papel
```

Una constante debe inicializarse al declararla. Después no puedes hacer que `nombreTienda` apunte a otro valor. Si intentaras reasignarla, JavaScript produciría un error; este fragmento está en texto para no ejecutar código roto:

```text
const nombreTienda = "Pixel y Papel";
nombreTienda = "Nivel Extra"; // TypeError
```

`const` no significa «el valor jamás cambia» en todos los sentidos. Cuando el valor es un objeto, la constante protege el nombre, no congela las propiedades del objeto. Aquí cambia la propiedad `monedas`, pero no se reasigna `inventario`.

```js
const inventario = { monedas: 3 };
inventario.monedas = 4;
console.log(inventario.monedas);
```
```text
4
```

Para impedir cambios en las propiedades se necesitarían otras herramientas; `const` por sí sola no las bloquea.

## `let`: cuando el valor debe cambiar

Usa `let` si sabes que el nombre tendrá otro valor más adelante. Por ejemplo, los puntos de una partida cambian al superar una prueba.

```js
let puntos = 0;
puntos = puntos + 100;
console.log(puntos);
```
```text
100
```

No declares con `let` solo por costumbre. Si `puntos` no fuera a cambiar, `const` expresaría mejor la intención.

## `var`: una declaración histórica

Antes de que existieran `let` y `const`, JavaScript usaba `var`. Puede reasignarse como `let`, pero tiene reglas que suelen causar confusión. Por eso, en código actual preferimos `const` o `let`.

Una diferencia importante es el alcance. Un bloque es el código entre llaves, como el de un `if`. `let` y `const` viven dentro del bloque donde se declaran; `var` no crea ese límite y tiene ámbito de función. En estas lecciones, sin funciones alrededor, una `var` declarada dentro de un bloque queda disponible fuera de él.

```js
var zonaActual = "entrada";
{
  var zonaActual = "sala secreta";
  console.log(zonaActual);
}
console.log(zonaActual);
```
```text
sala secreta
sala secreta
```

Además, `var` permite redeclarar un mismo nombre en el mismo ámbito. `let` y `const` no lo permiten, y esa restricción detecta antes muchos descuidos.

```js
var mensajeOferta = "Dos pociones";
var mensajeOferta = "Tres pociones";
console.log(mensajeOferta);
```
```text
Tres pociones
```

Con `let` o `const`, repetir una declaración del mismo nombre en el mismo ámbito daría un `SyntaxError`. Por claridad y seguridad, declara con `const` si no hay reasignación y con `let` si la hay; reserva `var` para leer o mantener código antiguo.

## Alcance de bloque con `let` y `const`

El alcance responde a una pregunta sencilla: «¿en qué parte del programa puedo usar este nombre?». Las llaves pueden crear un bloque. Un nombre declarado con `let` o `const` dentro de ese bloque no está disponible después de la llave de cierre.

```js
const jugadorPrincipal = "Nora";
{
  const jugadorInvitado = "Teo";
  console.log(jugadorPrincipal);
  console.log(jugadorInvitado);
}
console.log(jugadorPrincipal);
```
```text
Nora
Teo
Nora
```

No hay un último `console.log(jugadorInvitado)` porque estaría fuera de su alcance y provocaría un error. Este caso se escribe como texto para mostrar la idea sin ejecutar un programa inválido:

```text
{
  let clavePuerta = "luna";
}
console.log(clavePuerta); // ReferenceError
```

Limitar el alcance evita que nombres temporales se usen por accidente en otras partes del programa.

## Nombres claros y `camelCase`

Un buen nombre explica qué representa el valor. En JavaScript es común escribir la primera palabra en minúscula y unir las siguientes con mayúscula: se llama `camelCase`.

```js
const nombreCliente = "Lucía";
let totalCarrito = 2;
totalCarrito = totalCarrito + 1;
console.log(nombreCliente);
console.log(totalCarrito);
```
```text
Lucía
3
```

Evita nombres vagos como `x` cuando puedes escribir `vidasRestantes` o `precioFinal`. Los nombres no pueden comenzar por un número ni contener espacios. También evita palabras reservadas del lenguaje, como `const` o `let`.

## Elevación y zona temporal muerta

JavaScript procesa las declaraciones antes de ejecutar las instrucciones. A este comportamiento se le llama **elevación** o *hoisting*. No es correcto decir que `let` y `const` «no se elevan»: sus declaraciones también se registran, pero el nombre queda en la **zona temporal muerta** (TDZ, por sus siglas en inglés) desde el inicio del bloque hasta su declaración.

Con `var`, el nombre existe antes de la línea de declaración y su valor inicial es `undefined`.

```js
console.log(recompensa);
var recompensa = 50;
console.log(recompensa);
```
```text
undefined
50
```

Con `let` y `const`, acceder al nombre antes de declararlo da un `ReferenceError`. La TDZ ayuda a detectar el acceso demasiado temprano. Este ejemplo es intencionalmente inválido y no debe ejecutarse:

```text
console.log(recompensa);
let recompensa = 50; // ReferenceError: acceso antes de la declaración
```

La solución no es depender de la elevación: declara cada nombre antes de usarlo y cerca del lugar donde empieza a tener sentido.

---

Continúa con los [ejercicios de variables](../Ejercicios/02-variables.md).
