# Asincronía, JSON y peticiones HTTP

[Ejercicios: asincronía y JSON](../Ejercicios/19-asincronia-json.md)

**Prerrequisitos:** temas 01–18. El código de interfaz no debe quedarse esperando una red lenta; debe iniciar la operación, mostrar un estado de carga y continuar cuando llegue un resultado, un error o una cancelación.

## Promesas y event loop

Una promesa está pendiente, se cumple con un valor o se rechaza con un motivo. `.then` consume o transforma el resultado y `.catch` trata un rechazo. Una función `async` siempre devuelve una promesa; `await` suspende **esa función async**, no bloquea toda la página. Un rechazo de `await` se captura con `try/catch`.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B
```

Primero termina el código síncrono. Después se atienden microtareas, como continuaciones de promesas, y luego otras tareas como el temporizador. `0` no significa «ahora mismo». La red la realiza el entorno del navegador; una promesa no crea un hilo ni hace asíncrono un cálculo pesado.

## Esperar en secuencia o en paralelo

```js
async function obtenerDoble(numero) {
  return numero * 2;
}

async function comparar() {
  const secuenciales = [];
  for (const numero of [1, 2, 3]) {
    secuenciales.push(await obtenerDoble(numero));
  }
  const concurrentes = await Promise.all([1, 2, 3].map(obtenerDoble));
  console.log(secuenciales); // [2, 4, 6]
  console.log(concurrentes); // [2, 4, 6]
}

comparar();
```

`for...of` con `await` inicia una operación y espera antes de iniciar la siguiente: úsalo cuando hay dependencia o necesitas limitar el trabajo a una operación en curso. En el segundo caso, `map` invoca las funciones e inicia su trabajo; `Promise.all` espera sus promesas y conserva el orden de entrada, no el de finalización. Si una rechaza, el conjunto rechaza, pero las demás no se cancelan automáticamente.

### Por qué `forEach` no espera

Ejecuta este ejemplo por separado. Los callbacks son funciones `async`, pero `forEach` no utiliza las promesas que devuelven:

```js
async function demostrarForEach() {
  [1, 2].forEach(async valor => {
    await Promise.resolve();
    console.log(valor);
  });
  console.log("Fin de forEach");
}

demostrarForEach();
// Fin de forEach
// 1
// 2
```

Poner `await` delante de la llamada a `forEach` no la convierte en una espera del conjunto: el método devuelve `undefined`. Un `return` sigue saliendo del callback, no de la función exterior. Para secuencia usa el bucle del ejemplo anterior; para un conjunto independiente, recoge las promesas con `map` y espéralas con `Promise.all`.

## JSON es texto con una gramática

JSON no es un objeto JavaScript. Sus claves y strings usan comillas dobles; no admite comentarios, funciones, `undefined` ni comas finales.

```js
const texto = '{"nombre":"Mapa","precio":12}';
const producto = JSON.parse(texto);
console.log(producto.precio); // 12
console.log(JSON.stringify(producto)); // {"nombre":"Mapa","precio":12}
```

`JSON.parse` falla si el texto no es JSON válido. Que se analice no demuestra que tenga la forma necesaria: un array de strings no es un catálogo de productos. Valida los datos en el límite de tu aplicación antes de que lleguen al resto de su código.

## `fetch`: respuesta HTTP, cuerpo y contrato

`fetch(url)` devuelve una promesa. Un 404 o 500 normalmente **cumple** esa promesa: comprueba `respuesta.ok` (estado 200–299) antes de leer o usar el cuerpo. `respuesta.json()` también es asíncrono y consume el cuerpo; no se puede volver a leer salvo clonando la respuesta antes.

```js
async function cargarProductos(url = "./productos.json") {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el catálogo (HTTP ${respuesta.status}).`);
  }
  const datos = await respuesta.json();
  if (!Array.isArray(datos)) throw new Error("El catálogo debe ser un array.");

  const ids = new Set();
  for (const producto of datos) {
    if (
      producto === null || typeof producto !== "object" ||
      !Number.isSafeInteger(producto.id) || producto.id <= 0 ||
      typeof producto.nombre !== "string" || producto.nombre.trim() === "" ||
      !Number.isFinite(producto.precio) || producto.precio < 0 ||
      ids.has(producto.id)
    ) {
      throw new Error("Producto inválido o id repetido.");
    }
    ids.add(producto.id);
  }
  return datos;
}
```

Prueba con un fixture local reproducible servido por HTTP, por ejemplo `productos.json` junto al HTML:

```json
[
  { "id": 1, "nombre": "Mapa", "precio": 12 },
  { "id": 2, "nombre": "Poción", "precio": 5 }
]
```

No abras este ejercicio con `file://`: tanto módulos como peticiones a archivos locales requieren HTTP. Usa el servidor local explicado en el tema 16. Distingue tres clases de fallo en la interfaz: red o CORS (no hay respuesta legible), HTTP no correcto y cuerpo/contrato inválido. Un catálogo vacío es un resultado correcto, no un error.

Guarda la función en `app.js` y cárgalo mediante `<script type="module" src="./app.js"></script>`. Añade al final esta llamada para observar un resultado o un error; el `await` de nivel superior necesita un módulo:

```js
try {
  const productos = await cargarProductos();
  console.log(productos.map(producto => producto.nombre)); // ["Mapa", "Poción"]
} catch (error) {
  console.error(error.message);
}
```

Para enviar JSON a una API, esta puede exigir `method: "POST"`, `headers: { "Content-Type": "application/json" }` y `body: JSON.stringify(datos)` en las opciones de `fetch`. La URL y la autenticación dependen del contrato de la API. Un servidor de archivos estáticos no implementa ese contrato; un `204 No Content` tampoco contiene JSON que puedas analizar.

## Orígenes, CORS y cancelación

Un origen combina protocolo, host y puerto. Si una API está en otro origen, su servidor debe permitir la petición mediante **CORS**. `mode: "no-cors"` no lo arregla: produce una respuesta opaca que el programa no puede leer. No desactives la seguridad del navegador ni pongas claves secretas en JavaScript enviado al cliente.

Para cancelar una petición que se ha vuelto obsoleta, pasa la señal de un `AbortController` a `fetch` y llama a `abort()`:

Este bloque se ejecuta por separado en un módulo del navegador, con el mismo fixture local.

```js
const controlador = new AbortController();
const promesa = fetch("./productos.json", { signal: controlador.signal });
controlador.abort();

try {
  await promesa;
} catch (error) {
  if (error.name !== "AbortError") throw error;
}
```

Una cancelación esperada no debe presentarse como una avería. La aplicación completa, con carga, vacío, error, filtrado local y datos validados, está en el [proyecto de catálogo con favoritos](../Proyectos/02-catalogo-favoritos.md).
