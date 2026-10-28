# Módulos

[Ejercicios](../Ejercicios/16-modulos.md)

**Prerrequisitos:** funciones, clases y consola (temas 08, 13 y 15). Un módulo es un archivo con dependencias y exportaciones explícitas. Separa responsabilidades sin crear una clase o un archivo por cada función.

## Exports con nombre y default

**`calculos.js`**

```js
export const IVA = 0.21;

export function calcularTotal(productos) {
  return productos.reduce((total, producto) => total + producto.precio, 0);
}

export class Carrito {
  #productos = [];
  agregar(producto) {
    this.#productos.push(producto);
  }
  get total() {
    return calcularTotal(this.#productos);
  }
}
```

**`formato.js`**

```js
export default function euros(cantidad) {
  return `${cantidad.toFixed(2)} €`;
}
```

**`app.js`**

```js
import euros from "./formato.js";
import { IVA as tipoIva, calcularTotal, Carrito } from "./calculos.js";

const carrito = new Carrito();
carrito.agregar({ nombre: "Mapa", precio: 12 });
console.log(euros(carrito.total)); // 12.00 €
console.log(tipoIva, calcularTotal([{ precio: 5 }])); // 0.21 5
```

Los exports con nombre se importan entre llaves y deben coincidir, salvo alias con `as`. Hay como máximo un `default` por módulo y se importa sin llaves con el nombre local que elijas. Una exportación debe ser parte del contrato público; no exportes detalles solo por comodidad.

Las variables de un módulo no se convierten en globales de `window`. Un módulo compartido se evalúa una vez por URL dentro del documento y sus imports comparten ese estado; no construyas estado global mutable sin una razón clara.

## Ejemplo de navegador: archivos y HTTP

**`index.html`**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Módulos</title>
    <script type="module" src="./app.js"></script>
  </head>
  <body><h1>Consulta la consola</h1></body>
</html>
```

En el navegador, escribe las rutas relativas con `./` o `../` y la extensión `.js`. No abras el ejemplo como `file://`: sírvelo por HTTP. En una carpeta de proyecto con una versión de Node compatible con el Vite que vayas a instalar:

```bash
npm init -y
npm install --save-dev vite
npm pkg set scripts.dev="vite"
npm run dev
```

Abre la dirección local mostrada. `package.json` declara scripts y dependencias; `package-lock.json` fija las versiones resueltas; `node_modules` es regenerable y no se versiona. Un servidor HTTP del aula también basta para módulos sin dependencias. El navegador no resuelve por sí solo `import "nombre-paquete"`; una herramienta de construcción o mapa de importaciones debe resolverlo.

Detén el servidor con Ctrl+C. `npm install` instala las dependencias y puede actualizar el lockfile; `npm ci` reproduce el lockfile y exige que concuerde con `package.json`. Conserva `package-lock.json` en el control de versiones, no `node_modules`.

Para actividades que necesitan un **404 real** al pedir un archivo inexistente, usa un servidor estático del aula sin redirección a `index.html`. Si dispones de Python 3, puedes ejecutar `python3 -m http.server 8000 --bind 127.0.0.1` desde la carpeta y abrir `http://127.0.0.1:8000`. Vite puede devolver el HTML de la aplicación para ciertas rutas inexistentes; en ese caso verías un error de contenido, no necesariamente un 404.

También puedes importar todo el módulo como un objeto de espacio de nombres: `import * as herramientas from "./calculos.js"` deja disponibles `herramientas.calcularTotal` y `herramientas.IVA`. Es útil cuando prefieres agrupar importaciones relacionadas en lugar de listar nombres uno a uno.

## Ejecutar ESM en Node y contraste CommonJS

Node interpreta `.mjs` como módulo ECMAScript. Para archivos `.js`, añade `"type": "module"` a `package.json`. Esta configuración de Node no sustituye `type="module"` del HTML.

Código heredado de Node puede usar CommonJS:

**`sistema.cjs`**

```js
const os = require("node:os");
console.log(os.platform());
```

`node:os` es un módulo **incorporado de Node**, no un paquete instalado desde npm. CommonJS usa `require` y `module.exports`; no mezcles sus reglas con ESM en el mismo archivo sin conocer la interoperabilidad. Para código nuevo del curso, usa ESM.

Los temas 17–20 aplican módulos a DOM, eventos, datos asíncronos y almacenamiento. Divide cuando aparezca una responsabilidad clara: por ejemplo, datos, interfaz y persistencia.