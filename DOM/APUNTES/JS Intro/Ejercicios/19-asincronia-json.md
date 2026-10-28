# Asincronía, JSON y peticiones HTTP

[Teoría: asincronía y JSON](../Teoría/19-asincronia-json.md)

**Prerrequisitos:** temas 01–18. Sirve los archivos por HTTP con un servidor estático **sin fallback a `index.html`**, para que una ruta inexistente produzca un 404 real. Por ejemplo, si tienes Python 3: `python3 -m http.server 8000 --bind 127.0.0.1`, y abre `http://127.0.0.1:8000`. No uses `file://`. Todas las actividades usan fixtures locales, no servicios externos.

Crea estos fixtures junto al HTML para las actividades que los pidan:

**`productos.json`**
```json
[
  { "id": 1, "nombre": "Mapa", "precio": 12 },
  { "id": 2, "nombre": "Poción", "precio": 5 }
]
```

**`vacio.json`**
```json
[]
```

Este fixture es **inválido intencionalmente**: la coma final debe provocar un error al analizarlo, no debes corregirla para la actividad 5.

**`roto.json`**
```json
[{ "id": 1, "nombre": "Mapa", }]
```

## 1. Orden del event loop

Escribe un programa con dos `console.log` síncronos, un `Promise.resolve().then(...)` y un `setTimeout(..., 0)`. Predice el orden antes de ejecutarlo y compáralo con Consola.

**Resultado esperado:** primero salen los dos mensajes síncronos, después la continuación de la promesa y al final el temporizador. Explica por qué cero milisegundos no significa ejecución inmediata.

## 2. Secuencia frente a conjunto

Crea una función async que devuelva un valor tras un pequeño temporizador. Obtén los dobles de `[1, 2, 3]` una vez con `for...of` y `await`, y otra con `Promise.all` y `map`.

**Resultado esperado:** ambas listas tienen los mismos valores y orden. Señala qué forma escogerías si cada petición dependiera de la anterior y cuál si fueran independientes.

## 3. JSON válido no siempre es dato válido

Analiza en un `try/catch` los textos `"{\"nombre\":\"Mapa\"}"`, `"{nombre: Mapa}"` y `"[\"Mapa\", \"Llave\"]"`. Para el que se analiza como array, añade una comprobación de contrato que exija productos con id entero positivo, nombre no vacío y precio no negativo.

**Resultado esperado:** el segundo texto da un error de sintaxis; el tercero se analiza pero se rechaza por el contrato de productos.

## 4. Cargar un fixture y mostrar estados

Construye una página con un botón `Cargar`, un `role="status"` y una lista. Al cargar `productos.json`, muestra primero `Cargando…`, comprueba `response.ok`, analiza el JSON y pinta los nombres mediante `textContent`.

**Resultado esperado:** se muestran los dos productos. Si cargas `vacio.json`, el estado es `No hay productos`, no un error. Desactiva el botón mientras haya una petición en curso.

## 5. HTTP, cuerpo inválido y recuperación

Prueba la misma interfaz con una ruta inexistente y con `roto.json`. Captura los errores en la interfaz, no solo en consola, y vuelve a habilitar el botón en todos los casos.

**Resultado esperado:** la ruta inexistente comunica el estado HTTP; el JSON roto comunica un error de datos; después de cada fallo puedes volver a cargar el fixture correcto. No confundas ninguno con el estado vacío.

## 6. Cancelar una petición obsoleta

Añade un botón `Cancelar` que use `AbortController` para abortar una carga iniciada. Puedes ralentizar la respuesta en las herramientas de Red para observarlo.

**Resultado esperado:** la cancelación esperada no se muestra como error de catálogo y los controles vuelven a un estado utilizable. Explica por qué `mode: "no-cors"` no sería una solución para una API de otro origen.
