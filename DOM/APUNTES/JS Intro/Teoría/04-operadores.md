# 04. Operadores

[Ejercicios](../Ejercicios/04-operadores.md)

Los operadores son símbolos que transforman valores, comparan decisiones o combinan condiciones. Con ellos puedes calcular el precio de una compra, comprobar si un jugador puede entrar a una zona o elegir un mensaje para la pantalla.

## Operaciones aritméticas

Los operadores aritméticos trabajan sobre números. `+` suma, `-` resta, `*` multiplica y `/` divide. Piensa en las monedas que gana y gasta un personaje.

```js
const monedasEncontradas = 18;
const precioDelMapa = 7;

console.log(monedasEncontradas + precioDelMapa);
console.log(monedasEncontradas - precioDelMapa);
console.log(monedasEncontradas * 2);
console.log(monedasEncontradas / 3);
```
```text
25
11
36
6
```

### Cuando `+` pega texto en vez de sumar

Con números, `+` suma. Si uno de los operandos es un string, en estos casos convierte el otro a texto y los une: eso se llama **concatenación**.

```js
const precioEscrito = "20";
console.log(precioEscrito + 5);
console.log(Number(precioEscrito) + 5);
console.log("5" - 2);
```
```text
205
25
3
```

La resta no concatena: intenta convertir los operandos a números. No supongas que todos los operadores convierten igual. Si vas a calcular con un dato recibido como texto, convierte explícitamente con `Number`.

### Restos y potencias

El operador `%` entrega el **resto** de una división. No significa porcentaje: para calcular el 15 % de un precio se multiplica por `0.15`. El resto es útil, por ejemplo, para saber si una ronda es par o si sobran fichas al repartirlas.

```js
const fichas = 17;
const jugadores = 4;

console.log(fichas % jugadores);
console.log(80 * 0.15);
```
```text
1
12
```

Aquí, después de repartir 17 fichas entre 4 jugadores, sobra 1. Un número es par si al dividirlo entre 2 el resto es `0`.

`**` eleva un número a una potencia. Una mejora que duplica su fuerza en cada nivel puede modelarse con una potencia.

```js
const fuerzaInicial = 3;
const nivelesDeMejora = 4;

console.log(fuerzaInicial ** 2);
console.log(2 ** nivelesDeMejora);
```
```text
9
16
```

## Orden de las cuentas

JavaScript respeta la precedencia habitual: primero potencias, luego multiplicaciones, divisiones y restos; al final sumas y restas. Cuando una cuenta pueda resultar ambigua para quien la lea, usa paréntesis.

```js
const precioBase = 20;
const unidades = 3;
const descuento = 5;

console.log(precioBase + unidades * descuento);
console.log((precioBase + unidades) * descuento);
console.log(2 + 3 * 4 ** 2);
```
```text
35
115
50
```

Los paréntesis cambian el orden. En una tienda, calcular primero el subtotal y después aplicar un descuento evita una cuenta distinta de la que querías expresar.

```js
const precioPorArticulo = 12;
const cantidad = 3;
const descuentoPorcentual = 0.1;

console.log(precioPorArticulo * cantidad * (1 - descuentoPorcentual));
```
```text
32.4
```

## Actualizar una variable

Una variable declarada con `let` puede cambiar. `++` suma uno y `--` resta uno. Para operar y guardar el resultado en la misma variable existen `+=`, `-=`, `*=`, `/=` y `%=`.

```js
let cofresAbiertos = 2;

cofresAbiertos++;
cofresAbiertos += 3;
cofresAbiertos *= 2;
cofresAbiertos -= 4;

console.log(cofresAbiertos);
```
```text
8
```

`puntos += 10` es una forma breve de escribir `puntos = puntos + 10`. Úsala cuando el valor anterior participa en el nuevo valor. No puedes actualizar una constante con `const` porque su enlace no se puede reasignar.

```js
let saldo = 50;

saldo /= 2;
saldo %= 7;
console.log(saldo);
```
```text
4
```

## Asignar no es comparar

El signo `=` asigna un valor a una variable. Para preguntar si dos valores son iguales, usa `===`. Para preguntar si son diferentes, usa `!==`.

```js
const apodo = "Nova";
const esNova = apodo === "Nova";
const cambioDeApodo = apodo === "Leo";

console.log(esNova);
console.log(cambioDeApodo);
console.log(apodo !== "Leo");
```
```text
true
false
true
```

Las comparaciones de orden son `>`, `<`, `>=` y `<=`. Todas las comparaciones producen un booleano: `true` o `false`.

```js
const nivel = 8;

console.log(nivel >= 5);
console.log(nivel < 8);
console.log(nivel > 3);
console.log(nivel <= 8);
```
```text
true
false
true
true
```

Existe también `==`, pero conviene evitarlo al empezar. Intenta convertir tipos antes de comparar: por eso una cadena que contiene un número puede parecer igual a un número. `===` no hace esa conversión y comprueba tanto valor como tipo.

```js
const codigoEscrito = "7";

console.log(codigoEscrito == 7);
console.log(codigoEscrito === 7);
```
```text
true
false
```

## Condiciones lógicas

`&&` significa «y»: una condición completa solo es verdadera si ambas partes lo son. `||` significa «o»: basta con que una parte sea verdadera. `!` niega un booleano.

```js
const tieneLlave = true;
const nivelActual = 6;

console.log(tieneLlave && nivelActual >= 5);
console.log(tieneLlave || nivelActual >= 10);
console.log(!tieneLlave);
```
```text
true
true
false
```

`&&` y `||` usan cortocircuito: evalúan de izquierda a derecha y solo evalúan el segundo operando si lo necesitan. `&&` devuelve el primero si es *falsy* y, si no, devuelve el segundo. `||` devuelve el primero si es *truthy* y, si no, devuelve el segundo. Por eso no siempre producen un booleano. `!` convierte a booleano y lo niega; no es un operador de cortocircuito.

```js
const accesoConLlave = "Llave" && "Puerta abierta";
const mensajeSinMonedas = 0 || "No tienes monedas";

console.log(accesoConLlave);
console.log(mensajeSinMonedas);
```
```text
Puerta abierta
No tienes monedas
```

En el primer caso, una cadena no vacía cuenta como verdadera, así que `&&` devuelve el último valor necesario. En el segundo, `0` cuenta como falso, por lo que `||` continúa y devuelve el mensaje. Cuando solo necesitas un resultado booleano, compara de forma explícita como en `nivelActual >= 5`.

## Valores por defecto y decisiones breves

`||` puede elegir un valor alternativo cuando el de la izquierda es falso. Eso incluye `0`, `""` y `false`, que quizá sean valores válidos. `??` solo usa el valor alternativo si el primero es `null` o `undefined`; por eso suele ser más apropiado para un dato opcional.

```js
const monedasGuardadas = 0;
const nombreInvitado = null;

console.log(monedasGuardadas || 10);
console.log(monedasGuardadas ?? 10);
console.log(nombreInvitado ?? "Invitado");
```
```text
10
0
Invitado
```

El operador ternario escribe una decisión corta: `condición ? valorSiEsVerdadera : valorSiEsFalsa`. No sustituye a todas las decisiones, pero resulta claro para elegir un texto o una etiqueta sencilla.

```js
const totalCompra = 42;
const envio = totalCompra >= 40 ? "Envío gratis" : "Envío con coste";

console.log(envio);
```
```text
Envío gratis
```

## Atención con divisiones y decimales

Con valores de tipo `number`, dividir un número distinto de cero entre `0` no lanza un error: produce `Infinity` o `-Infinity`. En cambio, `0 / 0` produce `NaN`, un valor especial del tipo `number`. Son resultados que normalmente indican que debes revisar los datos de una cuenta. Esta regla no se aplica a `bigint`: dividir entre `0n` sí provoca un error.

```js
console.log(10 / 0);
console.log(-10 / 0);
console.log(0 / 0);
```
```text
Infinity
-Infinity
NaN
```

Los decimales se guardan en binario y algunas fracciones no pueden representarse exactamente. Por eso una suma aparentemente simple puede mostrar más decimales de los esperados. No compares importes decimales con `===` sin pensar en esta precisión.

```js
const precioFinal = 0.1 + 0.2;

console.log(precioFinal);
console.log(precioFinal === 0.3);
```
```text
0.30000000000000004
false
```

Para mostrar dinero al usuario podrás dar formato al número más adelante. Por ahora, conserva la idea importante: el cálculo interno puede tener una pequeña diferencia aunque la operación parezca exacta.

---

Continúa con los [ejercicios de operadores](../Ejercicios/04-operadores.md).
