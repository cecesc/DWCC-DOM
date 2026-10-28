# Condicionales

[Ejercicios](../Ejercicios/06-condicionales.md)

**Prerrequisitos:** variables, tipos, operadores y strings (temas 01–05). Los condicionales eligen una ruta; los bucles del tema siguiente repiten trabajo.

## Condiciones booleanas y valores truthy

En Java un `if` exige un `boolean`. JavaScript convierte la condición a booleano. Son *falsy*: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` y `NaN`. Todo lo demás es *truthy*, incluidos `"false"`, `"0"`, `" "`, `[]` y `{}`.

```js
const nombre = "   ";
const edad = 19;

if (nombre.trim() === "") {
  console.log("Falta el nombre");
} else if (edad < 18) {
  console.log("Acceso para menores");
} else {
  console.log("Acceso general");
}
// Falta el nombre
```

No uses `if (lista)` para preguntar si hay elementos: un array vacío es truthy. La condición correcta es `lista.length > 0`.

Al leer texto de un formulario, `"18"` sigue siendo string. Convierte solo después de validar que no está vacío: `Number("")` y `Number("   ")` producen `0`.

```js
const texto = " 24 ";
const cantidad = Number(texto);
const valida = texto.trim() !== "" && Number.isFinite(cantidad) && cantidad > 0;
console.log(valida); // true
```

Usa `===` y `!==`: no convierten tipos. `"5" == 5` es `true`, pero `"5" === 5` es `false`.

## Operadores que eligen valores

`&&` y `||` hacen cortocircuito y devuelven un operando, no necesariamente un booleano. `||` sustituye cualquier valor falsy; `??` solo sustituye `null` o `undefined`.

```js
const puntos = 0;
console.log(puntos || 10); // 10
console.log(puntos ?? 10); // 0

const edad = 20;
const tarifa = edad < 18 ? "reducida" : "general";
console.log(tarifa); // general
```

El ternario es apropiado cuando se calcula **un valor** entre dos alternativas. Para varias sentencias o varias ramas, un `if` es más legible.

## `switch` para alternativas discretas

```js
const estado = "pendiente";

switch (estado) {
  case "pendiente":
    console.log("Preparar pedido");
    break;
  case "enviado":
  case "entregado":
    console.log("Consultar seguimiento");
    break;
  default:
    console.log("Estado desconocido");
}
```

Cada `case` se compara con igualdad estricta. Sin `break`, la ejecución continúa en el siguiente caso aunque su etiqueta no coincida (*fall-through*). Agrupar etiquetas vacías es deliberado; olvidar el `break` después de una acción casi siempre es un error. Para rangos (`nota >= 5`) o condiciones distintas, prefiere `if`/`else if`.

## Guardas e invariantes

Una guarda rechaza pronto una entrada que no cumple el contrato y evita anidar condicionales. El invariante de esta función es que toda edad aceptada es un entero no negativo:

```js
function categoriaEdad(edad) {
  if (!Number.isInteger(edad) || edad < 0) {
    return "edad no válida";
  }
  if (edad < 18) return "menor";
  return "adulta";
}

console.log(categoriaEdad(16)); // menor
console.log(categoriaEdad(-1)); // edad no válida
```

Devolver un marcador es útil en una demostración; en código que no pueda continuar con seguridad, el tema 14 explica cómo lanzar un error. El tema 07 continúa con la repetición controlada.