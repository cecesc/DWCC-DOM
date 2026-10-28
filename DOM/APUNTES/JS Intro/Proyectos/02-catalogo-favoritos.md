# Proyecto: catálogo con favoritos

[Teoría: DOM](../Teoría/17-dom.md) · [Teoría: eventos y formularios](../Teoría/18-eventos-formularios.md) · [Teoría: asincronía y JSON](../Teoría/19-asincronia-json.md) · [Teoría: almacenamiento](../Teoría/20-almacenamiento.md)

**Prerrequisitos:** temas 01–20. Construirás una aplicación sin framework que carga un catálogo JSON local, filtra por nombre y conserva favoritos. Es un proyecto guiado y completo: copia los archivos como se indican antes de hacer las pruebas.

## Objetivos

- Cargar y validar datos recibidos por HTTP.
- Mantener el estado de productos y favoritos separado del DOM.
- Distinguir carga, catálogo vacío, búsqueda sin coincidencias y error.
- Filtrar localmente sin una segunda petición.
- Guardar favoritos solo tras un guardado correcto y recuperarse de almacenamiento corrupto.
- Usar texto seguro, botones accesibles y foco de teclado estable.

## Preparación y estructura exacta

Crea esta carpeta. Esta versión usa un servidor estático local; por tanto `productos.json` está junto a `index.html`, y `./productos.json` es su URL. No abras `index.html` con `file://`.

```text
catalogo-favoritos/
├── index.html
├── app.js
├── api.js
├── almacenamiento.js
└── productos.json
```

Si dispones de Python 3, inicia este servidor HTTP local desde `catalogo-favoritos/`:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8000` y detén el servidor con Ctrl+C al terminar. Si el aula usa otro servidor estático, sirve esta misma carpeta como raíz. Con Vite, sigue la [preparación del tema 16](../Teoría/16-modulos.md) y mueve `productos.json` a `public/productos.json`: Vite expone `public` en la raíz y el código conserva la URL `./productos.json`. Usa siempre el mismo origen para comprobar los favoritos.

## Etapa 1: la página y los datos de prueba

Crea `index.html`. El script es un módulo: por ello admite imports y se ejecuta después de que el documento se haya analizado. `role="status"` anuncia los cambios sin desplazar el foco.

**`index.html`**
```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Catálogo con favoritos</title>
  <script type="module" src="./app.js"></script>
</head>
<body>
  <h1>Catálogo</h1>
  <label for="busqueda">Buscar por nombre</label>
  <input id="busqueda" type="search" disabled>
  <button id="recargar" type="button">Recargar catálogo</button>
  <p id="estado" role="status"></p>
  <p id="aviso" role="status"></p>
  <ul id="productos"></ul>
</body>
</html>
```

Crea el fixture local. Sus datos son deliberadamente pequeños y reproducibles; no hay servicio externo del que depender.

**`productos.json`**
```json
[
  { "id": 1, "nombre": "Mapa", "precio": 12 },
  { "id": 2, "nombre": "Poción", "precio": 5 },
  { "id": 3, "nombre": "Llave", "precio": 8 }
]
```

## Etapa 2: módulo de red y contrato de productos

Crea `api.js`. `fetch` rechaza por problemas de red, pero una respuesta HTTP 404 o 500 suele resolver su promesa: por eso se verifica `respuesta.ok`. Que JSON se pueda analizar tampoco garantiza que sea un catálogo aceptable; se validan tipo, id, nombre, precio e ids repetidos antes de devolver datos al resto de la aplicación.

**`api.js`**
```js
export async function cargarProductos(url = "./productos.json") {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el catálogo (HTTP ${respuesta.status}).`);
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error("El catálogo debe ser un array.");
  }

  const ids = new Set();
  for (const producto of datos) {
    if (
      producto === null || typeof producto !== "object" ||
      !Number.isSafeInteger(producto.id) || producto.id <= 0 ||
      typeof producto.nombre !== "string" || producto.nombre.trim() === "" ||
      !Number.isFinite(producto.precio) || producto.precio < 0 ||
      ids.has(producto.id)
    ) {
      throw new Error("El catálogo contiene un producto inválido o un id repetido.");
    }
    ids.add(producto.id);
  }
  return datos;
}
```

## Etapa 3: módulo de persistencia

Crea `almacenamiento.js`. El navegador guarda strings, así que el `Set` se transforma primero en array. Al leer, JSON corrupto o valores de otra versión se rechazan: no se supone que los datos de `localStorage` sean fiables. Estas APIs pueden lanzar por cuota o políticas del navegador, y no sirven para guardar secretos.

**`almacenamiento.js`**
```js
const CLAVE = "dwcc.catalogo.favoritos";

export function cargarFavoritos() {
  const texto = localStorage.getItem(CLAVE);
  if (texto === null) return new Set();
  const datos = JSON.parse(texto);
  if (
    !Array.isArray(datos) ||
    !datos.every(id => Number.isSafeInteger(id) && id > 0)
  ) {
    throw new Error("Los favoritos guardados no tienen un formato válido.");
  }
  return new Set(datos);
}

export function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE, JSON.stringify([...favoritos]));
}
```

## Etapa 4: estado, renderizado y acciones

Crea `app.js`. La búsqueda es local y distingue acentos de forma deliberada: `poción` y `pocion` no son iguales aquí. El renderizado usa `textContent`, no `innerHTML`, de modo que un nombre recibido como `<b>Mapa</b>` se muestra como texto. La delegación de eventos permite un único manejador de favoritos, aunque los botones se creen después.

**`app.js`**
```js
import { cargarProductos } from "./api.js";
import { cargarFavoritos, guardarFavoritos } from "./almacenamiento.js";

const campo = document.querySelector("#busqueda");
const recargar = document.querySelector("#recargar");
const estado = document.querySelector("#estado");
const aviso = document.querySelector("#aviso");
const lista = document.querySelector("#productos");
const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR"
});

let productos = [];
let favoritos = new Set();
try {
  favoritos = cargarFavoritos();
} catch (error) {
  aviso.textContent = "No se pudieron recuperar los favoritos. Puedes continuar sin ellos.";
  console.error(error);
}

function renderizar() {
  const consulta = campo.value.trim().toLocaleLowerCase("es");
  const visibles = productos.filter(producto =>
    producto.nombre.toLocaleLowerCase("es").includes(consulta)
  );
  lista.replaceChildren();
  for (const producto of visibles) {
    const elemento = document.createElement("li");
    const texto = document.createElement("span");
    texto.textContent = `${producto.nombre} — ${euros.format(producto.precio)} `;
    const boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.id = String(producto.id);
    boton.textContent = `Favorito: ${producto.nombre}`;
    boton.setAttribute("aria-pressed", String(favoritos.has(producto.id)));
    elemento.append(texto, boton);
    lista.append(elemento);
  }
  estado.textContent = productos.length === 0
    ? "El catálogo está vacío."
    : visibles.length === 0
      ? "No hay coincidencias."
      : `${visibles.length} productos encontrados.`;
}

async function iniciar() {
  campo.disabled = true;
  recargar.disabled = true;
  lista.replaceChildren();
  estado.textContent = "Cargando catálogo…";
  try {
    productos = await cargarProductos();
    renderizar();
    campo.disabled = false;
  } catch (error) {
    productos = [];
    estado.textContent = "No se pudo cargar el catálogo. Pulsa Recargar catálogo para volver a intentarlo.";
    console.error(error);
  } finally {
    recargar.disabled = false;
  }
}

campo.addEventListener("input", renderizar);
recargar.addEventListener("click", iniciar);
lista.addEventListener("click", evento => {
  if (!(evento.target instanceof Element)) return;
  const boton = evento.target.closest("button[data-id]");
  if (!boton || !lista.contains(boton)) return;
  const id = Number(boton.dataset.id);
  if (!productos.some(producto => producto.id === id)) return;

  const nuevos = new Set(favoritos);
  if (nuevos.has(id)) nuevos.delete(id);
  else nuevos.add(id);

  try {
    guardarFavoritos(nuevos);
    favoritos = nuevos;
    boton.setAttribute("aria-pressed", String(favoritos.has(id)));
    aviso.textContent = favoritos.has(id) ? "Favorito guardado." : "Favorito eliminado.";
  } catch (error) {
    aviso.textContent = "No se pudo guardar el cambio de favoritos.";
    console.error(error);
  }
});

iniciar();
```

La interfaz representa cuatro estados distintos: durante la petición dice `Cargando catálogo…`; `[]` da catálogo vacío; una búsqueda que no encuentra resultados da `No hay coincidencias`; y red, HTTP o JSON inválido da error. No presentar una avería como vacío permite a la persona actuar correctamente.

Al pulsar un favorito se calcula un `Set` nuevo y se intenta guardar antes de modificar `favoritos` o comunicar éxito. Si falla `localStorage`, no hay falso éxito. Al actualizar solo el `aria-pressed` del botón, en vez de reconstruir la lista, el foco de teclado se conserva. El botón tiene un nombre estable y `aria-pressed` expone su estado; los mensajes de confirmación se anuncian por `role="status"`.

## Prueba manual guiada

| Escenario | Resultado que debe observarse |
|---|---|
| Abrir con el JSON incluido | Tres productos, precio en euros y tres botones de favorito. |
| Buscar `MAP` | Solo Mapa; al borrar la búsqueda vuelven los tres. |
| Buscar un término inexistente | `No hay coincidencias.`, no un error. |
| Marcar Mapa y recargar | Su botón conserva `aria-pressed="true"`. |
| Volver a pulsar Mapa y recargar | Se desmarca y el cambio persiste. |
| Sustituir temporalmente el JSON por `[]` | `El catálogo está vacío.` |
| Repetir un id o romper el JSON | Error de carga, nunca una lista parcial. |
| Renombrar `productos.json`, recargar y restaurarlo | Hay error; restaurar y pulsar Recargar permite recuperar la aplicación. |
| Poner `texto roto` en la clave de favoritos de DevTools | Aparece aviso de recuperación y el catálogo sigue utilizable. |
| Cambiar un nombre por `<b>Mapa</b>` | Se ven las etiquetas como texto, sin crear HTML. |
| Navegar con Tab hasta un favorito y pulsarlo | El foco se conserva en ese botón y cambia `aria-pressed`. |

Para depurar, usa Red para observar estado, cuerpo y duración. Un breakpoint tras `await cargarProductos()` permite inspeccionar los datos; otro en el manejador de la lista permite seguir el nuevo `Set` antes del guardado.

## Retos adicionales (sin solución)

1. Añade un filtro por precio máximo sin enviar una petición nueva y conserva el estado vacío frente a «sin coincidencias».
2. Añade un botón que muestre solo favoritos y un mensaje accesible con el número de resultados.
3. Implementa una búsqueda que cancele una petición anterior con `AbortController` cuando cambie el término; no muestres una cancelación como error.
4. Define una versión nueva de la clave de almacenamiento y una migración explícita desde la anterior.
5. Añade una vista de detalle usando el id validado, sin insertar el nombre con `innerHTML`.
