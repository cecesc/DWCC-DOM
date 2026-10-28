# Set y Map

[Ejercicios](../Ejercicios/10-set-map.md)

**Prerrequisitos:** arrays, bucles y funciones (temas 07–09). Usa un `Set` para valores únicos y un `Map` para asociaciones dinámicas clave–valor. Para una entidad con propiedades conocidas, usa un objeto (tema 11).

## `Set`: pertenencia sin duplicados

```js
const etiquetas = new Set(["oferta", "nuevo", "oferta"]);
etiquetas.add("destacado");
etiquetas.add("nuevo"); // no añade un duplicado
console.log(etiquetas.size); // 3
console.log(etiquetas.has("oferta")); // true
console.log(etiquetas.delete("nuevo")); // true: se eliminó
console.log(etiquetas.delete("ausente")); // false
console.log([...etiquetas]); // ["oferta", "destacado"]
etiquetas.clear();
console.log(etiquetas.size); // 0
```

`add` devuelve el propio conjunto, útil para encadenar pero no para obtener tamaño. Convierte un array en únicos con `new Set(array)` y vuelve a array con `[...set]` o `Array.from(set)`. La igualdad de objetos es por identidad: dos literales iguales son objetos distintos.

```js
console.log(new Set([{ id: 1 }, { id: 1 }]).size); // 2
```

Recórrelo con `for...of`. Su `forEach` llama `callback(valor, valor, conjunto)`: el segundo valor se repite para compatibilidad con `Map`; no es un índice.

## `Map`: claves de cualquier tipo

```js
const existencias = new Map([["mapa", 2], ["poción", 5]]);
existencias.set("llave", 1);
console.log(existencias.get("mapa")); // 2
console.log(existencias.get("escudo")); // undefined
console.log(existencias.has("escudo")); // false
console.log(existencias.size); // 3
console.log(existencias.delete("llave")); // true

for (const [nombre, unidades] of existencias) {
  console.log(`${nombre}: ${unidades}`);
}
console.log([...existencias.keys()]); // ["mapa", "poción"]
console.log([...existencias.values()]); // [2, 5]
console.log([...existencias.entries()]); // [["mapa", 2], ["poción", 5]]
existencias.clear();
```

`get` devuelve `undefined` tanto para una clave ausente como para una clave cuyo valor guardado es `undefined`; si importa distinguirlas, consulta primero `has`. `set` puede sobrescribir una clave existente y conserva el orden de inserción. `delete` devuelve si existía; `clear` borra todas.

Las claves pueden ser objetos, funciones o números, pero los objetos se buscan por identidad:

```js
const usuario = { id: 1 };
const permisos = new Map([[usuario, "editar"]]);
console.log(permisos.get(usuario)); // editar
console.log(permisos.get({ id: 1 })); // undefined
```

El `forEach` de `Map` recibe `(valor, clave, mapa)`, no `(valor, índice)`. Para procesar pares y poder usar `break`, prefiere `for (const [clave, valor] of mapa)`.

## Decidir entre objeto, Map y Set

- Objeto: campos de una entidad (`producto.nombre`), serializable con JSON.
- `Map`: tabla cuya clave es dinámica o no es string; dispone de `size` y no confunde claves con el prototipo.
- `Set`: pertenencia y eliminación de duplicados.

Ni `Map` ni `Set` se serializan directamente con `JSON.stringify`; conviértelos a arrays y define qué representación necesita el consumidor.