# Objetos

[Ejercicios](../Ejercicios/11-objetos.md)

**Prerrequisitos:** arrays y Set/Map (temas 09–10). Un objeto literal modela una entidad con pares clave–valor. A diferencia de Java, puede crearse y adquirir propiedades sin declarar primero una clase.

## Leer, escribir y comprobar propiedades

```js
const producto = { id: 1, nombre: "Mapa", precio: 12 };
const campo = "precio";
console.log(producto.nombre); // Mapa
console.log(producto[campo]); // 12: clave calculada
producto.stock = 4;
delete producto.stock;
console.log("nombre" in producto); // true
console.log(Object.hasOwn(producto, "toString")); // false
console.log(Object.hasOwn(producto, "precio")); // true
```

El punto sirve para un nombre literal; los corchetes para un nombre calculado. `delete` elimina la propiedad y devuelve si pudo eliminarla. Para saber si una propiedad **propia** existe, usa `Object.hasOwn`; `objeto.clave !== undefined` no distingue una clave ausente de una cuyo valor es `undefined`. `in` incluye propiedades heredadas.

`Object.keys`, `Object.values` y `Object.entries` crean arrays de propiedades propias enumerables. Evitan los problemas de `for...in`, que puede recorrer claves heredadas y no es la forma de recorrer arrays.

Este recorrido continúa el primer ejemplo y utiliza su variable `producto`. Añádelo después de ese bloque, no en un archivo vacío.

```js
for (const [clave, valor] of Object.entries(producto)) {
  console.log(`${clave}: ${valor}`);
}
// id: 1, nombre: Mapa, precio: 12
```

## Identidad, mutación y copia superficial

Las variables guardan un valor; para un objeto ese valor es una referencia. Se pasa por valor esa referencia, igual que en Java.

```js
const original = { nombre: "Luna", equipo: { color: "azul" } };
const alias = original;
const copia = { ...original };
console.log(alias === original); // true
console.log(copia === original); // false

copia.nombre = "Sol";
copia.equipo.color = "rojo";
console.log(original.nombre); // Luna
console.log(original.equipo.color); // rojo: anidado compartido
```

Spread solo copia un nivel. Para actualizar una rama sin mutar el origen, copia también esa rama: `{ ...original, equipo: { ...original.equipo, color: "verde" } }`. `structuredClone(datos)` hace una copia profunda de datos compatibles, pero no de funciones ni nodos DOM.

```js
function cambiar(persona) {
  persona.nombre = "Mar"; // muta el objeto compartido
  persona = { nombre: "Otra" }; // solo reasigna parámetro local
  return persona;
}

const persona = { nombre: "Luna" };
const resultado = cambiar(persona);
console.log(persona.nombre); // Mar: el objeto original sí se ha mutado
console.log(resultado.nombre); // Otra: la reasignación del parámetro es local
```

No compares contenido de objetos con `===`: `{ id: 1 } === { id: 1 }` es `false` porque son identidades distintas.

## Métodos y el receptor

Un método puede usar `this`, cuyo valor depende de la llamada:

```js
const contador = {
  valor: 0,
  incrementar() {
    this.valor++;
    return this.valor;
  }
};
console.log(contador.incrementar()); // 1
```

No uses una flecha como método si necesitas ese `this`; la flecha lo hereda del ámbito exterior. Consulta el tema 08 para el detalle.

## Funciones constructoras al leer código heredado

Antes de `class`, era común usar una función con `new`:

```js
function Producto(nombre, precio = 0) {
  this.nombre = nombre;
  this.precio = precio;
}
Producto.prototype.etiqueta = function () {
  return `${this.nombre}: ${this.precio} €`;
};

const mapa = new Producto("Mapa", 12);
console.log(mapa.etiqueta()); // Mapa: 12 €
```

Con `new`, `this` es la nueva instancia y `Producto.prototype` comparte métodos. Es conocimiento para entender proyectos existentes; para código nuevo usa objetos sencillos o `class` cuando estado y comportamiento justifican la abstracción (tema 13). El tema 12 separa desestructuración y spread.