# Consola

[Ejercicios](../Ejercicios/15-consola.md)

**Prerrequisitos:** funciones, arrays y objetos (temas 08–11). La consola del navegador y la salida de Node sirven para observar programas. Son una ayuda de desarrollo, no la interfaz final ni una garantía de que un dato se haya guardado.

## Mensajes y datos estructurados

```js
const productos = [
  { nombre: "Mapa", precio: 12 },
  { nombre: "Poción", precio: 5 }
];

console.log("Productos:", productos.length); // Productos: 2
console.info("Datos cargados");
console.warn("El stock no está actualizado");
console.error("No se pudo guardar");
console.table(productos);
```

`log` es general; `info`, `warn` y `error` comunican intención y muchos entornos los muestran con estilos o filtros distintos. `table` presenta arrays de objetos o mapas de valores como una tabla; para estructuras enormes puede ser lenta o truncarse. Los detalles visuales y filtros cambian entre navegador y Node.

No construyas texto manualmente si el entorno puede inspeccionar el objeto. En herramientas de desarrollo un objeto mostrado puede verse con su estado **posterior** si se expande más tarde; para una instantánea simple puedes registrar `{ ...objeto }`, sabiendo que solo es copia superficial.

## Agrupar y medir

```js
console.group("Cálculo de pedido");
console.log("Subtotal", 17);
console.groupCollapsed("Detalle");
console.log("Impuestos", 3.57);
console.groupEnd();
console.groupEnd();

console.time("ordenar");
[20, 3, 100].toSorted((a, b) => a - b);
console.timeEnd("ordenar"); // ordenar: ... ms (la cifra depende del equipo)
```

`group` abre una sección; `groupCollapsed` intenta abrirla plegada; cada uno requiere su `groupEnd`. `time(etiqueta)` inicia un temporizador y `timeEnd(etiqueta)` lo informa y lo elimina. Miden una ejecución concreta, no sustituyen una medición controlada de rendimiento; la cifra y precisión dependen del entorno.

## Afirmaciones, contadores y traza

```js
function descontarStock(stock, cantidad) {
  console.assert(Number.isInteger(cantidad) && cantidad > 0, "cantidad inválida", { cantidad });
  console.count("descontarStock");
  if (cantidad > stock) {
    console.trace("stock insuficiente");
    return stock;
  }
  return stock - cantidad;
}

descontarStock(2, 1); // contador: 1
descontarStock(2, 3); // contador: 2 y pila de llamadas
console.countReset("descontarStock");
```

`assert` solo informa cuando la condición es falsy: **no lanza ni detiene** el programa. Conserva la validación real para que el contrato se cumpla. `count` cuenta por etiqueta; `countReset` reinicia. `trace` registra la pila de llamadas actual, útil para descubrir quién llegó a un punto, pero puede producir mucho ruido.

`console.clear()` solicita limpiar la salida; las herramientas pueden ignorarlo o conservar el historial. No lo uses para esconder fallos. Quita o protege trazas ruidosas antes de entregar una interfaz, y no registres contraseñas, tokens ni datos personales. El tema 16 organiza la salida de código repartido en módulos.