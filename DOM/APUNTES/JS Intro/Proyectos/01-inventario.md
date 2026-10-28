# Proyecto 01. Inventario de una tienda

[Teoría de módulos](../Teoría/16-modulos.md) · [Siguiente proyecto: catálogo en el navegador](02-catalogo-favoritos.md)

**Modalidad:** proyecto para resolver, sin solución incluida. Los datos de partida no son una implementación.

**Prerrequisitos:** temas 01–16. No necesita DOM, servidor, peticiones de red ni almacenamiento persistente.

**Objetivo:** construir un programa que procese movimientos de inventario, rechace operaciones inválidas y genere un informe. Aquí se combinan decisiones, recorridos, funciones, arrays, objetos, `Map`, `Set`, errores y módulos; no se trata de escribir veinte demostraciones aisladas.

## 1. Preparar el proyecto

Trabaja con una versión de Node con soporte de módulos ES. Crea esta estructura:

```text
inventario/
  package.json
  datos.js
  inventario.js
  app.js
```

El archivo `package.json` debe contener:

```json
{
  "name": "inventario-clase",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

No hay dependencias que instalar. Ejecuta con `npm start` o `node app.js` desde esa carpeta. `datos.js` exportará las entradas; `inventario.js` contendrá las operaciones; `app.js` coordinará el procesamiento y mostrará el informe.

## 2. Datos de partida

Guarda estas exportaciones en `datos.js`:

```js
export const productos = [
  { id: "mapa", nombre: "Mapa", precio: 12, stock: 3, etiquetas: ["exploracion", "papel"] },
  { id: "pocion", nombre: "Poción", precio: 5, stock: 4, etiquetas: ["consumible"] },
  { id: "llave", nombre: "Llave", precio: 8, stock: 1, etiquetas: ["exploracion", "metal"] }
];

export const movimientos = [
  { tipo: "venta", id: "pocion", cantidad: 2 },
  { tipo: "entrada", id: "mapa", cantidad: 1 },
  { tipo: "venta", id: "llave", cantidad: 2 },
  { tipo: "venta", id: "llave", cantidad: 1 },
  { tipo: "venta", id: "escudo", cantidad: 1 },
  { tipo: "entrada", id: "mapa", cantidad: 0 }
];
```

Las cantidades y los precios de esta práctica se eligen como enteros para centrar el trabajo en el lenguaje. No extrapoles el uso directo de decimales de `number` a una aplicación contable real.

## 3. Construir el inventario

Implementa y exporta `crearInventario(productos)`, que devuelve un `Map` con el id como clave y los datos del producto como valor.

Requisitos:

- Rechaza ids vacíos o repetidos; nombres vacíos; precios que no sean números finitos no negativos; stocks que no sean enteros no negativos; y etiquetas que no sean un array de strings no vacíos.
- Si la entrada no es un array o un producto no es un objeto válido, informa del error, no construyas un inventario parcial como resultado correcto.
- El estado del inventario no debe modificar los objetos de `productos` cuando cambies su stock.
- Las etiquetas solo se leen en este proyecto. Justifica qué niveles necesitas copiar y por qué no es necesario clonar indiscriminadamente todos los datos.

## 4. Aplicar movimientos sin dejar cambios a medias

Implementa y exporta `aplicarMovimiento(inventario, movimiento)`.

- Solo se admiten los tipos `entrada` y `venta`.
- El producto debe existir y `cantidad` debe ser un entero mayor que cero.
- Una entrada incrementa el stock; una venta lo reduce.
- Una venta no puede dejar stock negativo.
- **Valida antes de modificar:** si la operación falla, el inventario debe quedar igual que antes de ese movimiento.
- Devuelve el importe de una venta aceptada (`precio × cantidad`); para una entrada aceptada, devuelve `0`. Así el coordinador puede acumular ingresos sin duplicar la regla de cálculo.

Define un error propio `MovimientoError extends Error` para los movimientos rechazados. Incluye una propiedad `codigo` con uno de estos valores: `TIPO_INVALIDO`, `PRODUCTO_DESCONOCIDO`, `CANTIDAD_INVALIDA` o `STOCK_INSUFICIENTE`.

Para que el resultado sea determinista cuando haya varios problemas en un movimiento, comprueba en este orden: estructura y tipo de movimiento, existencia del producto, cantidad y stock. Un movimiento nulo o que no sea un objeto corresponde a `TIPO_INVALIDO`.

## 5. Procesar y continuar después de un rechazo

En `app.js`, recorre `movimientos` en su orden original. Cada operación depende del stock que dejaron las anteriores; no los reordenes.

- Registra aceptados y rechazados por separado, conservando la posición original (del 1 al 6).
- Ante un `MovimientoError`, registra su código y continúa con el siguiente movimiento.
- No ocultes errores de programación inesperados tratándolos como simples ventas rechazadas: vuelve a lanzar los errores que no sean de ese tipo.
- Acumula únicamente los ingresos de ventas aceptadas.
- Usa `for...of` para el procesamiento y explica qué cambiaría al intentar salir de la función coordinadora mediante un `return` dentro de `forEach`.

No uses asincronía: aquí no hay operaciones de red ni esperas que la justifiquen.

## 6. Generar el informe

Implementa funciones que permitan obtener:

1. Productos y stock final, en el orden de los productos de entrada.
2. Número de movimientos aceptados y rechazados.
3. Ingresos de ventas aceptadas.
4. Valor del stock restante: suma de `precio × stock`.
5. Nombres con stock menor o igual a un umbral recibido por parámetro.
6. Etiquetas únicas de todos los productos, usando un `Set` y conservando el orden de primera aparición.

Usa `map`, `filter` o `reduce` cuando expresen claramente el resultado que necesitas. No uses `map` para ejecutar acciones y descartar el array. Puedes usar `console.table` para los productos y `console.group` para separar el informe; **su aspecto exacto depende del entorno y no se evalúa como una cadena fija**.

### Resultado de referencia

Con las entradas anteriores, deben cumplirse estos resultados:

| Dato | Resultado |
|---|---|
| Stock de Mapa | `4` |
| Stock de Poción | `2` |
| Stock de Llave | `0` |
| Movimientos aceptados | `3`: posiciones 1, 2 y 4 |
| Movimientos rechazados | `3`: posiciones 3, 5 y 6 |
| Código del rechazo 3 | `STOCK_INSUFICIENTE` |
| Código del rechazo 5 | `PRODUCTO_DESCONOCIDO` |
| Código del rechazo 6 | `CANTIDAD_INVALIDA` |
| Ingresos por ventas | `18` |
| Valor del stock restante | `58` |
| Stock bajo con umbral `1` | `["Llave"]` |
| Etiquetas únicas | `["exploracion", "papel", "consumible", "metal"]` |
| Stock del array original `productos` | Sigue siendo `3`, `4`, `1` |

Los textos de tus mensajes pueden variar; estos datos y reglas, no.

## 7. Comprobar límites, no solo el ejemplo correcto

Antes de entregar, prueba por separado:

- Inventario y movimientos vacíos: informe sin productos, cero ingresos y cero rechazos.
- Dos productos con el mismo id: error al crear el inventario, no sustitución silenciosa en el `Map`.
- Venta de exactamente todo el stock: aceptada y stock final cero.
- Venta posterior sobre ese stock agotado: rechazada sin alterar nada.
- Cantidades `-1`, `0`, `1.5` y `"2"`: rechazadas, sin conversión implícita.
- Tipo de movimiento desconocido y producto inexistente: códigos correctos según la precedencia definida.
- Un error provocado durante el procesamiento que no sea `MovimientoError`: no debe desaparecer dentro de un `catch` genérico.

## Entrega y explicación

Entrega los cuatro archivos y un informe breve con los resultados de tus comprobaciones. Debes poder explicar:

- Por qué un `Map` facilita buscar por id y qué haría con una clave repetida si no la validaras.
- Dónde se copia el estado para no mutar la entrada.
- Por qué validas antes de restar stock.
- La diferencia entre devolver un valor y mostrarlo con `console.log`.
- Qué tareas corresponden a un bucle y cuáles a una transformación de datos.

## Ampliaciones opcionales

Realízalas después de que funcione el contrato principal; no sustituyen ninguna comprobación anterior.

- Encapsula el inventario en una clase con estado privado y métodos de entrada/venta. Mantén las mismas reglas y resultados observables.
- Añade una consulta que devuelva productos ordenados por precio sin alterar el orden del inventario.
- Tras estudiar los temas 17–20, crea una interfaz para introducir movimientos y persistir el estado. Ese trabajo ya pertenece a la siguiente etapa del curso.
