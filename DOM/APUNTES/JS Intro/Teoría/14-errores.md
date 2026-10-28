# Errores

[Ejercicios](../Ejercicios/14-errores.md)

**Prerrequisitos:** funciones y clases (temas 08 y 13). Los errores representan que no se puede continuar cumpliendo un contrato; no son valores ordinarios como “no hay resultados”. JavaScript no tiene excepciones verificadas: decide explícitamente dónde recuperar y dónde dejar que el fallo suba.

## Lanzar, capturar y finalizar

```js
function dividir(a, b) {
  if (b === 0) throw new RangeError("El divisor no puede ser cero");
  return a / b;
}

try {
  console.log(dividir(10, 0));
} catch (error) {
  console.error(error.message); // El divisor no puede ser cero
} finally {
  console.log("Operación terminada");
}
```

`throw` interrumpe el flujo normal. `catch` recibe el valor lanzado (por convención, un `Error`) y `finally` se ejecuta tanto si hay resultado como si hay fallo. Sin la comprobación, `10 / 0` da `Infinity`: no lanza solo.

Captura donde exista una decisión útil: mostrar un mensaje, restaurar estado o añadir contexto. No captures para ocultar silenciosamente el error.

## Errores del lenguaje y clasificación

- `TypeError`: operación incompatible con el tipo, por ejemplo llamar algo que no es función.
- `SyntaxError`: código que ni siquiera puede analizarse; ocurre antes de ejecutar ese archivo.
- `ReferenceError`: nombre no declarado o acceso en la zona temporal muerta.
- `RangeError`: valor fuera del intervalo admitido, útil para contratos numéricos.

```js
try {
  const datos = null;
  console.log(datos.nombre);
} catch (error) {
  console.log(error instanceof TypeError); // true
  console.log(error.name); // TypeError
}
```

`instanceof` comprueba la cadena de prototipos y permite distinguir el error propio que se puede resolver del que debe propagarse. `SyntaxError` no se suele capturar con un `try` situado en el mismo archivo: el motor debe entender todo el archivo antes de ejecutar el `try`.

## Error propio con contexto

```js
class ValidacionError extends Error {
  constructor(campo, mensaje) {
    super(mensaje);
    this.name = "ValidacionError";
    this.campo = campo;
  }
}

function leerCantidad(texto) {
  const numero = Number(texto);
  if (texto.trim() === "" || !Number.isInteger(numero) || numero < 0) {
    throw new ValidacionError("cantidad", "Introduce un entero no negativo");
  }
  return numero;
}

try {
  leerCantidad("-2");
} catch (error) {
  if (error instanceof ValidacionError) {
    console.error(`${error.campo}: ${error.message}`);
  } else {
    throw error; // no convertir un fallo inesperado en dato inválido
  }
}
```

Llamar a `super(mensaje)` inicializa `message` y la infraestructura de `Error`. Mantén el error específico para quien puede actuar sobre él; no inventes una jerarquía de clases de error sin decisiones diferenciadas.

## Trampas

- `throw "mensaje"` funciona, pero pierde `name`, `stack` y clasificación: lanza `new Error(...)` o una subclase.
- `catch {}` es válido si de verdad no necesitas el error; casi siempre necesitarás registrar o decidir algo.
- `console.error` no relanza: solo informa. Para propagar, usa `throw error`.
- El tema 19 muestra `try`/`catch` alrededor de `await`; no uses un bucle para esperar una promesa.

La pareja de ejercicios plantea contratos y recuperaciones, no respuestas completas.