# Desestructuración y spread

[Ejercicios](../Ejercicios/12-desestructuracion-spread.md)

**Prerrequisitos:** arrays y objetos (temas 09 y 11). La desestructuración extrae valores; rest los reúne al recibir; spread los expande al crear o llamar. Parecen similares (`...`), pero resuelven problemas opuestos.

## Extraer de objetos

```js
const producto = {
  id: 1,
  nombre: "Mapa",
  precio: 12,
  proveedor: { nombre: "Norte", ciudad: "León" }
};

const { nombre, precio: euros, stock = 0 } = producto;
const { proveedor: { ciudad } } = producto;
const { id, ...datosPublicos } = producto;
console.log(nombre, euros, stock, ciudad); // Mapa 12 0 León
console.log(datosPublicos.nombre); // Mapa
```

`precio: euros` asigna la propiedad `precio` a una variable llamada `euros`. Un valor por defecto solo se usa si el resultado es `undefined`, no para `null`, `0` ni `""`. La parte `...datosPublicos` recoge las propiedades restantes en un **objeto nuevo** y debe ir al final.

La desestructuración anidada falla si la base intermedia es `undefined` o `null`. Para una entrada opcional, declara un valor por defecto en el nivel correspondiente:

```js
function ciudadDe({ proveedor = {} } = {}) {
  return proveedor.ciudad ?? "Sin ciudad";
}
console.log(ciudadDe()); // Sin ciudad
```

No uses ese patrón para ocultar que un dato obligatorio está mal formado: valida o lanza un error cuando el contrato lo exija.

## Extraer de arrays y omitir posiciones

```js
const coordenadas = [40.4, -3.7, 650];
const [latitud, longitud, , cuarta = "sin dato"] = coordenadas;
const [primero, ...resto] = ["mapa", "poción", "llave"];
console.log(latitud, longitud, cuarta); // 40.4 -3.7 sin dato
console.log(primero, resto); // mapa ["poción", "llave"]
```

La posición determina la asignación. La coma sin nombre omite un elemento. El rest de array produce un array nuevo con las posiciones restantes; también debe ser el último elemento. Si falta una posición, el valor es `undefined` salvo que haya valor por defecto.

## Spread: expandir y combinar

Spread expande un iterable en un array o argumentos, y las propiedades propias enumerables de un objeto en otro objeto.

```js
const base = ["mapa", "poción"];
const completo = ["brújula", ...base, "llave"];
const copia = [...base];
console.log(completo); // ["brújula", "mapa", "poción", "llave"]
console.log(Math.max(...[3, 8, 2])); // 8

const porDefecto = { moneda: "EUR", stock: 0 };
const recibido = { nombre: "Mapa", stock: 3 };
const producto = { ...porDefecto, ...recibido, disponible: true };
console.log(producto); // { moneda: "EUR", stock: 3, nombre: "Mapa", disponible: true }
```

En objetos, la propiedad situada más a la derecha gana. En arrays, spread no elimina duplicados. En ambos casos la copia es superficial: los objetos anidados siguen compartidos. Spread no convierte por sí mismo un objeto en seguro ni valida su forma.

## Rest en parámetros frente a spread al llamar

```js
function sumar(...numeros) { // rest: reúne argumentos en un array
  return numeros.reduce((total, numero) => total + numero, 0);
}
const valores = [4, 6, 10];
console.log(sumar(...valores)); // 20: spread: expande el array
```

No confundas el rest de una función con el objeto especial `arguments`: rest es un array real y funciona también en funciones flecha. La siguiente ficha usa estas técnicas con clases; la pareja de ejercicios practica las combinaciones sin convertirlas en una solución completa.