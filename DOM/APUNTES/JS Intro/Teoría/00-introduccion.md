# 00. Introducción a JavaScript desde Java

Material de apoyo para quien ya programa en Java y quiere entender JavaScript: qué es, cómo se ejecuta, por qué se ve así y cómo llegó hasta aquí en treinta años.

Esta introducción presenta la ejecución, la comparación con Java, la historia y el ecosistema. La teoría detallada está organizada en los archivos numerados 01–20 de esta carpeta, cada uno enlazado con su ficha de ejercicios. Después de los fundamentos puedes resolver el [inventario](../Proyectos/01-inventario.md); al terminar los temas de navegador, continuar con el [catálogo con favoritos](../Proyectos/02-catalogo-favoritos.md).

**Cómo leerlo**

- Para situarte: capítulos 1 a 5. Para preparar el equipo, sigue los tutoriales de [Linux](../Tutoriales/instalar-node-linux.md) o [macOS](../Tutoriales/instalar-node-macos.md).
- Para consultar la evolución de la web: capítulos 6 a 11; no son requisitos para las primeras prácticas.
- Para comparar con Java: capítulos 3, 12 y 13.
- Para estudiar de forma progresiva: sigue los archivos de teoría 01–20 y sus ejercicios correspondientes, no el orden histórico de este documento.

---

## Índice

1. [Qué es JavaScript y qué no es](#1-qué-es-javascript-y-qué-no-es)
2. [Cómo se ejecuta: de `javac` a V8](#2-cómo-se-ejecuta-de-javac-a-v8)
3. [El lenguaje frente a Java](#3-el-lenguaje-frente-a-java)
4. [Un hilo y un event loop](#4-un-hilo-y-un-event-loop)
5. [El ecosistema mínimo](#5-el-ecosistema-mínimo)
6. [Historia I — Vanilla JS (1995-2005)](#6-historia-i--vanilla-js-1995-2005)
7. [Historia II — jQuery y AJAX (2006-2010)](#7-historia-ii--jquery-y-ajax-2006-2010)
8. [Historia III — Node.js (2009)](#8-historia-iii--nodejs-2009)
9. [Historia IV — Primeras SPAs (2010-2013)](#9-historia-iv--primeras-spas-2010-2013)
10. [Historia V — Componentes (2013+)](#10-historia-v--componentes-2013)
11. [Estado actual — TypeScript, metaframeworks y edge](#11-estado-actual--typescript-metaframeworks-y-edge)
12. [Tabla de equivalencias Java ↔ JavaScript](#12-tabla-de-equivalencias-java--javascript)
13. [Trampas típicas al llegar desde Java](#13-trampas-típicas-al-llegar-desde-java)
14. [Cronología](#14-cronología)
15. [Glosario](#15-glosario)

---

## 1. Qué es JavaScript y qué no es

JavaScript es un lenguaje de programación **de tipado dinámico**, creado en 1995 para dar comportamiento a las páginas web. Los motores modernos interpretan y/o compilan el código. En el hilo principal se ejecuta una tarea de JavaScript cada vez; los entornos también permiten crear workers explícitamente. Hoy se usa en navegadores, servidores, aplicaciones móviles y programas de escritorio.

**No es Java.** Son lenguajes distintos, pero comparten parte de la sintaxis y estructuras como `if` y `for`; JavaScript recibió influencia de Java. El nombre fue una decisión de marketing de Netscape y Sun. Los puntos y coma pueden omitirse en muchas sentencias de JavaScript, no de Java.

**Datos de la historia temprana**

| Fecha | Hecho |
|---|---|
| Mayo de 1995 | Brendan Eich escribe el primer prototipo en Netscape en unos diez días |
| 1995 | Nombres sucesivos: Mocha, LiveScript y por fin JavaScript |
| Diciembre de 1995 | Llega al público con Netscape 2.0 |
| Enero de 1996 | Se publica Java 1.0; Java ya se había presentado públicamente en 1995 |
| 1996 | Microsoft clona el lenguaje como JScript en Internet Explorer 3 |
| Junio de 1997 | Se estandariza como ECMA-262: nace el nombre ECMAScript |

**ECMAScript es el estándar que define el lenguaje JavaScript.** V8, SpiderMonkey y JavaScriptCore son motores que lo implementan; Node.js es un entorno que integra V8 y APIs adicionales. “ES6” o “ES2015” identifica una edición del estándar, no una versión de Node.

Publicaciones del estándar que conviene conocer:

- **ES3 (1999):** la base que se usó durante una década.
- **ES5 (2009):** modo estricto, `JSON`, `Array.map/filter/reduce`.
- **ES6 / ES2015 (2015):** el salto grande: `let`/`const`, clases, módulos, promesas, funciones flecha.
- **Desde 2016:** una edición por año, con cambios pequeños.

**Dónde corre hoy**

- **Navegador:** V8 en Chrome y derivados, SpiderMonkey en Firefox, JavaScriptCore en Safari.
- **Servidor:** Node.js, Deno y Bun.
- **Móvil:** React Native, Ionic y el motor del propio sistema.
- **Escritorio:** Electron (VS Code, Slack) y Tauri.

Los navegadores incluyen un motor de JavaScript: puedes empezar en su consola sin instalar otro entorno.

---

## 2. Cómo se ejecuta: de `javac` a V8

### El camino en Java

```text
Hola.java  →  javac  →  Hola.class (bytecode)  →  JVM  →  JIT (HotSpot)  →  código máquina
```

Compilación obligatoria antes de ejecutar, verificación de tipos en ese paso, y una máquina virtual que interpreta el bytecode y optimiza en caliente lo que se repite.

### El camino en JavaScript

```text
hola.js  →  motor (V8, SpiderMonkey, JavaScriptCore)  →  interpretación  →  JIT  →  código máquina
```

No hay paso de compilación visible para quien programa. El motor recibe el **texto fuente** y decide sobre la marcha:

1. Lo analiza sintácticamente y lo convierte en una representación interna (bytecode propio en V8, *Ignition*).
2. Lo ejecuta interpretado, midiendo qué funciones se usan mucho.
3. Optimiza esas funciones con el compilador JIT (*TurboFan* en V8) y las convierte en código máquina.
4. Si una suposición de la optimización deja de cumplirse, vuelve atrás y desoptimiza. Eso es lo que en la jerga se llama *deopt*.

El JIT no es una rareza de JavaScript: la JVM lo lleva haciendo desde 1999. La diferencia es que Java compila antes y JS compila durante.

### El programa más pequeño de cada lenguaje

```java
// Java
public class Hola {
    public static void main(String[] args) {
        System.out.println("Hola");
    }
}
```

```js
// JavaScript
console.log("Hola");
```

No hay clase, no hay `main`, no hay `static`. El archivo se ejecuta de arriba abajo, en el orden en que está escrito. En Node se lanza con `node hola.js`.

### Qué se gana y qué se pierde

**Se gana:** no hay ciclo de compilación que esperar, el arranque es inmediato y el código se puede probar línea a línea en la consola del navegador.

**Se pierde:** los errores de tipo aparecen en ejecución y no antes. Un `undefined is not a function` es un error que el compilador de Java habría detectado en el editor. Ese hueco es exactamente el que llena TypeScript (capítulo 11).

---

## 3. El lenguaje frente a Java

### Variables y constantes

```java
// Java
final int limite = 10;
int contador = 0;
```

```js
// JavaScript
const limite = 10;   // referencia que no se reasigna
let contador = 0;    // variable reasignable
var antiguo = 1;     // forma antigua, evitarla
```

`const` en JavaScript **no congela el objeto**: impide reasignar el nombre, no modificar el contenido. Es la diferencia entre una referencia `final` y una estructura inmutable, y es fuente habitual de confusión para quien viene de Java.

```js
const lista = [];
lista.push(1);      // permitido: se modifica el contenido
lista = [2];        // error: se intenta reasignar el nombre
```

### Tipos

Java distingue tipos primitivos y de referencia; cada variable tiene un tipo estático. En JavaScript el tipo lo tiene el valor, y una variable puede recibir valores de distintos tipos. Para números se usan `number` (coma flotante de doble precisión de 64 bits) y `bigint` (enteros de precisión arbitraria).

| Necesidad | Java | JavaScript |
|---|---|---|
| Entero | `int`, `long` | `number` (sin enteros separados) |
| Decimal | `double`, `float` | `number` |
| Booleano | `boolean` | `boolean` |
| Texto | `String` | `string` |
| Ausencia de valor | `null` | `null` y `undefined` |
| Cualquier cosa | `Object` | cualquier valor |
| Entero grande | `BigInteger` | `BigInt` |

Consecuencias prácticas:

- `0.1 + 0.2` no da `0.3` en JavaScript, igual que en Java con `double`. La diferencia es que en Java puedes usar `BigDecimal` de forma natural y en JS el camino es incómodo.
- `undefined` significa "no se ha asignado nada todavía" y es lo que devuelve una propiedad que no existe. `null` es la ausencia explícita, como en Java.
- `typeof null` devuelve `"object"`. Es un error de 1995 que nunca se corrigió por compatibilidad.

### Igualdad

```java
// Java
"5".equals(5)   // false: compila; 5 se convierte en Integer
objeto1 == objeto2   // compara referencias
objeto1.equals(objeto2)  // la igualdad depende de cómo se implemente equals
```

```js
// JavaScript
"5" == 5    // true: convierte el texto a número
"5" === 5   // false: distingue tipos
```

Regla que ahorra disgustos: **usar siempre `===` y `!==`**. El `==` hace conversiones implícitas que casi nunca son lo que uno espera.

### Objetos

En Java, un objeto es una instancia de una clase definida antes. En JavaScript, un objeto es un conjunto de pares clave-valor que se puede crear en el momento:

```js
const persona = { nombre: "Ana", edad: 31 };
persona.ciudad = "Madrid";   // se añade una propiedad nueva sobre la marcha
```

Es el equivalente mental de un `Map<String, Object>` o de un `record` flexible. Las clases existen desde ES6, pero son azúcar sintáctico sobre un modelo de **prototipos**: un objeto hereda de otro objeto, no de un molde de clase. En la práctica, quien programa JS hoy casi nunca toca los prototipos a mano, y TypeScript devuelve además el concepto de interfaz.

### Funciones y `this`

Las funciones son valores: se guardan en variables, se pasan como argumento y se devuelven desde otra función.

```java
// Java, desde la versión 8
Function<Integer, Integer> doble = x -> x * 2;
```

```js
// JavaScript, desde siempre
const doble = x => x * 2;
```

La lambda de Java y la función flecha de JS se parecen, con una excepción importante: en Java, `this` siempre apunta al objeto actual y no cambia nunca; en JavaScript, `this` depende de **cómo se llama la función** salvo que se use una función flecha, que hereda el `this` de donde está escrita. Es el error clásico número uno al llegar desde Java.

### Otros detalles que sorprenden

- **No hay sobrecarga de métodos** por número o tipo de argumentos. Un nombre, una implementación; se resuelve con valores por defecto o con parámetros agrupados en un objeto.
- **Las excepciones no son verificadas.** No existe `throws` declarado, así que nada obliga a capturar un error. Es responsabilidad de quien programa.
- **Las clases no declaran visibilidad por miembro** igual que Java. Existen campos privados (`#campo`) y módulos, pero no un `private` clásico por método.
- **Módulos:** `import { leer } from "./datos.js"` (ES Modules) cumple el papel de los paquetes y el `import` de Java. En Node antiguo se usa `require()`, la variante CommonJS.

---

## 4. Un hilo y un event loop

Es el concepto que más choca cuando se llega desde Java, y el que explica por qué JavaScript se escribe como se escribe.

**En Java:** llega una petición al servidor, un hilo del *pool* la atiende, la tarea se ejecuta de principio a fin en ese hilo y el hilo queda ocupado durante toda la espera. Para atender más peticiones se añaden hilos. Si la tarea consiste en esperar una base de datos o una API externa, el hilo está bloqueado sin hacer nada útil.

**En JavaScript:** hay un solo hilo, y las esperas no lo ocupan. Cuando el código pide leer un archivo o llamar a una API, registra una tarea y **devuelve el control inmediatamente**. Cuando la operación termina, el resultado entra en una cola y el *event loop* lo ejecuta en ese mismo hilo, que mientras tanto ha estado atendiendo otras cosas.

```js
console.log("1");

fetch("https://api.ejemplo.com/datos")
  .then(respuesta => respuesta.json())
  .then(datos => console.log("3", datos));

console.log("2");
```

En pantalla aparece `1`, `2` y, más tarde, `3`. El orden no es caprichoso: el hilo nunca se quedó esperando la respuesta de la red.

**Equivalencia mental para quien viene de Java:** es como programar con `CompletableFuture` sobre un ejecutor que nunca se bloquea, solo que el estilo por defecto del lenguaje está construido alrededor de esa idea, y hoy se escribe todavía más cómodo:

```js
async function cargar() {
  const respuesta = await fetch("https://api.ejemplo.com/datos");
  const datos = await respuesta.json();
  console.log(datos);
}
```

`await` no bloquea el hilo: suspende esa función, deja el hilo libre y continúa cuando llega el resultado. Es el mismo modelo que está adoptando Java con los hilos virtuales: código con aspecto secuencial para trabajo que en realidad espera.

**Dos colas, no una.** Las promesas se resuelven en una cola de microtareas, que se vacía por completo antes de pasar a la siguiente tarea normal (los `setTimeout`, eventos y demás). Es una distinción fina, pero explica casi todos los "¿por qué se ejecuta esto antes de aquello?" que se ven en una entrevista técnica.

**El límite del modelo:** un cálculo pesado en JavaScript bloquea todo. Un bucle de varios segundos congela la pestaña y el servidor deja de atender. Las salidas existen y son dos: `Web Workers` en el navegador y `worker_threads` en Node, que son hilos reales con su propia memoria, a los que se envían mensajes.

Regla práctica: JavaScript es excelente con **mucha entrada y salida y poca CPU**; para cálculo intenso, la JVM sigue siendo mucho mejor terreno.

---

## 5. El ecosistema mínimo

La instalación y su comprobación se explican por separado en los tutoriales de [Node.js en Linux](../Tutoriales/instalar-node-linux.md) y [Node.js en macOS](../Tutoriales/instalar-node-macos.md). Aquí se conserva únicamente la comparación de herramientas con Java.

### Herramientas para más adelante

Las equivalencias siguientes solo ayudan si ya conoces esas herramientas de Java; no son requisitos de la primera clase.

| Necesidad | Mundo Java | Mundo JavaScript |
|---|---|---|
| Instalación del runtime | JDK | Node.js (o Deno, Bun) |
| Gestor de dependencias | Maven, Gradle | npm, pnpm, yarn |
| Fichero de proyecto | `pom.xml` | `package.json` |
| Dependencias instaladas | Artefactos resueltos desde el repositorio local | `node_modules` del proyecto (la caché de npm es aparte) |
| Ejecutar algo | `java -jar app.jar` | `node app.js` |
| Repositorio de paquetes | Maven Central | npm registry |
| Pruebas | JUnit | Vitest, Jest |
| Formateo y análisis | spotless, Checkstyle | Prettier, ESLint |
| Comprobación estática de tipos | parte del lenguaje | TypeScript, opcional; JavaScript mantiene sus tipos dinámicos |

`package.json` cumple dos funciones a la vez: declara dependencias y describe comandos.

```json
{
  "name": "mi-app",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^4.19.0"
  }
}
```

Con `npm install` se descargan las dependencias y con `npm run start` se ejecuta el comando. La diferencia cultural más grande con Maven no es técnica: es que en npm cualquier persona publica un paquete en un minuto, sin revisión previa. Eso da un ecosistema enorme y muy vivo, con más variabilidad de calidad.

---

## 6. Historia I — Vanilla JS (1995-2005)

**Contexto.** La web era documentos. El servidor generaba el HTML y el navegador lo mostraba. Cualquier interacción, desde validar un formulario hasta cambiar una pestaña, exigía una vuelta completa al servidor.

**El DOM a mano.** La página se representa como un árbol de objetos, el DOM (*Document Object Model*), accesible desde la variable global `document`. Cambiar algo implicaba buscarlo y modificarlo:

```js
var caja = document.getElementById("caja");
caja.style.color = "rojo";
caja.innerHTML = "Nuevo texto";
```

En Java el símil es el árbol de componentes de Swing o JavaFX: se obtiene una referencia a un nodo y se cambia su estado.

**La guerra de navegadores.** Netscape e Internet Explorer implementaban cosas distintas con nombres distintos, y el mismo código no funcionaba igual en todos. Se escribían ramas por navegador, se usaban propiedades propietarias y buena parte del trabajo consistía en averiguar qué soportaba cada uno. Microsoft ganó esa guerra y su navegador se quedó quieto durante años, lo que congeló el lenguaje: entre 1999 y 2009 apenas hubo novedades.

**Los applets.** Java intentó entrar en el navegador con applets: programas compilados que corrían dentro de la página con un plugin. Arrancaban lento, pesaban mucho y su modelo de seguridad daba problemas. No ganaron, y hoy están retirados.

**Qué dejó esta era.** El DOM como interfaz de programación sigue vigente, aunque casi nadie lo toque directamente: los frameworks actuales lo manipulan por ti. Y quedó una lección: sin un estándar que se cumpla en todos los navegadores, escribir para la web es escribir varias veces.

---

## 7. Historia II — jQuery y AJAX (2006-2010)

**jQuery (2006, John Resig).** Una librería de un solo archivo que ofrecía una forma única de buscar elementos y de manipularlos, y que internamente escondía las diferencias entre navegadores. El famoso `$` era una función que aceptaba un selector CSS y devolvía un conjunto de elementos:

```js
$("#caja").text("Nuevo texto").css("color", "rojo").fadeIn();
```

Llegó a usarse en tres de cada cuatro sitios de la lista de los más visitados, y durante años fue el primer paso obligado de cualquier proyecto web.

**AJAX.** La técnica consiste en pedir datos al servidor en segundo plano y actualizar solo la parte de la página que cambia. La pieza técnica existía desde 1999 (Microsoft la introdujo en Internet Explorer 5 como objeto ActiveX, y pasó a ser nativa en IE7), y el nombre AJAX se acuña en 2005 en un artículo de Jesse James Garrett.

```js
// Con jQuery, la forma de la época
$.get("/api/usuarios", function (usuarios) {
  $("#lista").html(usuarios.map(u => "<li>" + u.nombre + "</li>").join(""));
});
```

Los formatos: primero XML, después JSON. Hoy el heredero directo de todo esto es `fetch()`, que forma parte del lenguaje de la plataforma:

```js
const respuesta = await fetch("/api/usuarios");
const usuarios = await respuesta.json();
```

**El efecto cultural.** Gmail (2004) y Google Maps (2005) demostraron que el navegador podía sostener una aplicación de verdad. A partir de ahí, la pregunta dejó de ser "¿cómo hago mi web más bonita?" y pasó a ser "¿cómo construyo una aplicación dentro del navegador?".

**Por qué se fue.** Los navegadores se estandarizaron y adoptaron versiones modernas del lenguaje: `querySelectorAll`, `fetch`, clases, módulos. Todo lo que hacía falta, ya sin librería. jQuery sigue usándose en mucho código heredado, pero en proyectos nuevos no tiene sentido.

---

## 8. Historia III — Node.js (2009)

**La idea.** Ryan Dahl presentó Node.js en la JSConf europea de 2009. Tomó el motor V8 del navegador y lo dejó suelto en el sistema operativo, apoyado en `libuv`, una librería que gestiona el acceso a archivos y a la red sin bloquear el hilo.

El resultado fue un servidor que atiende miles de conexiones simultáneas con un solo hilo, aprovechando exactamente el modelo del capítulo 4. Es una elección distinta a la de Java, donde cada petición ocupa un hilo del pool durante toda su vida.

```js
import { createServer } from "node:http";

createServer((peticion, respuesta) => {
  respuesta.writeHead(200, { "Content-Type": "application/json" });
  respuesta.end(JSON.stringify({ estado: "ok" }));
}).listen(3000);
```

**npm (2010).** El gestor de paquetes llegó un año después y se convirtió en el mayor registro de software del mundo: más de dos millones de paquetes publicados. De aquí salen las herramientas del apartado 5 y buena parte de la cultura actual del ecosistema.

**Qué cambió para siempre.** El mismo lenguaje a los dos lados de la red: se comparten modelos, validaciones y utilidades, y el equipo puede ser uno en lugar de dos. Es la razón principal por la que JavaScript dejó de ser "el lenguaje del navegador" y pasó a ser un lenguaje generalista.

**El tradeoff, dicho claro.** Node brilla en APIs, servicios en tiempo real, herramientas de línea de comandos y flujos con mucha espera de entrada y salida. Para cálculo intenso, procesamiento por lotes o cargas muy predecibles, una JVM bien ajustada o Go siguen siendo mejores opciones, y hoy los hilos virtuales de Java estrechan esa distancia en el lado de la concurrencia.

**La descendencia.** Deno (2020), del propio Ryan Dahl, corrige decisiones de diseño que él mismo consideró errores; y Bun (2022) apuesta por la velocidad y la integración. Node sigue siendo el estándar de facto.

---

## 9. Historia IV — Primeras SPAs (2010-2013)

**La SPA.** Una *Single Page Application* carga una sola página y cambia de pantalla sin volver a pedirla. El enrutado pasa al navegador, y con él el estado de la aplicación. El servidor queda reducido a servir datos y el HTML inicial.

**El enlace bidireccional.** AngularJS (Google, 2010), Backbone y Knockout (ambos de 2010) ofrecían una idea muy atractiva: declarar en la plantilla que un campo está atado a un dato, y olvidarse de sincronizar a mano.

```html
<!-- AngularJS: el campo y el dato muestran siempre lo mismo -->
<input ng-model="usuario.nombre">
<p>Hola, {{ usuario.nombre }}</p>
```

Cambiar el dato actualizaba la pantalla, y escribir en la pantalla actualizaba el dato. Comodísimo en una pantalla pequeña.

**El límite.** AngularJS detectaba los cambios recorriendo **todas** las variables enlazadas de la aplicación en cada ciclo: el llamado *digest*. Con cientos de campos en pantalla, el coste crecía y el rendimiento se volvía difícil de predecir. Además, cualquiera podía modificar el estado desde cualquier sitio, así que cuando algo se comportaba mal resultaba complicado saber quién lo había cambiado y cuándo.

**Las tres críticas de la época**

1. La primera carga pesa mucho: hay que descargar todo el código antes de ver nada.
2. El buscador no ve el contenido que se dibuja en el cliente.
3. El estado vive en memoria, así que recargar la página lo pierde todo.

Las tres se han ido resolviendo en la década siguiente con renderizado en servidor, mejores herramientas y persistencia explícita.

---

## 10. Historia V — Componentes (2013+)

**React (2013).** Publicado por Facebook, propone dos ideas que reordenan todo lo anterior: la interfaz de usuario es una **función del estado** (`interfaz = f(estado)`) y se construye con **componentes** reutilizables.

```jsx
function Saludo({ nombre }) {
  return <p>Hola, {nombre}</p>;
}
```

Ya no se busca un elemento para cambiarle el texto. Se describe qué debe verse para unos datos concretos y la librería aplica la diferencia. En Java el equivalente conceptual sería pasar de modificar nodos de un panel a declarar el panel completo para cada estado y que el framework aplique solo los cambios.

**Virtual DOM y reconciliación.** React mantiene una copia del árbol de la interfaz en memoria, calcula el nuevo a partir del estado, los compara y aplica al DOM del navegador únicamente las diferencias. Ese trabajo es el *diffing*, y su nombre colectivo es Virtual DOM.

No es magia ni es imprescindible: Svelte (2016) y SolidJS eliminan el Virtual DOM y generan en la compilación el código que actualiza cada parte, con resultados iguales o mejores. La idea que sobrevive en todos los casos es la declarativa.

**Flujo unidireccional.** Los datos bajan hacia los componentes hijos y los eventos suben hacia los padres. Es lo que devuelve la predecibilidad perdida en la era anterior: si algo se ve mal, el problema está en los datos, no en quien tocó la pantalla.

**El resto de la familia.** Vue (2014, Evan You) combina plantillas y reactividad con una curva de entrada más suave; Angular se reescribió por completo en 2016, ya en TypeScript; Svelte apuesta por el compilador; y cada uno tiene su comunidad y sus casos de uso.

**Qué se llevó por delante.** La manipulación directa del DOM casi desapareció del código de aplicación, el enlace bidireccional quedó como mecanismo interno de algunos frameworks, y el navegador dejó de ser un lugar al que se le empujan cambios para convertirse en el destino de una descripción.

---

## 11. Estado actual — TypeScript, metaframeworks y edge

### TypeScript

Publicado por Microsoft en 2012, con Anders Hejlsberg al frente (autor también de C# y Delphi). Extiende JavaScript con comprobación estática de tipos. Un programa JavaScript puede requerir ajustes para superar esa comprobación, aunque su sintaxis sea válida.

```ts
interface Usuario {
  nombre: string;
  edad: number;
}

function saludar(usuario: Usuario): string {
  return `Hola, ${usuario.nombre}`;
}

saludar({ nombre: "Ana", edad: 31 });   // correcto
saludar({ nombre: "Ana" });             // error detectado al escribir
```

Ofrece anotaciones de tipos, interfaces, genéricos, enumeraciones, uniones e inferencia de tipos. **Las anotaciones e interfaces se borran al generar JavaScript**; no validan datos externos en ejecución. Algunas construcciones, como las enumeraciones ordinarias, sí generan código. La comprobación estática puede ejecutarse en el editor y durante la construcción del proyecto.

La adopción puede ser gradual, pero renombrar `.js` a `.ts` puede revelar errores de tipos que hay que resolver. Angular usa TypeScript por defecto desde 2016; también se usa con Next.js, Nuxt y SvelteKit. No es necesario adoptarlo por alcanzar un número concreto de archivos.

### Metaframeworks

El nombre "framework de JavaScript" ya no describe lo que hace falta para construir un sitio. Hoy se usa un metaframework que resuelve de una vez el enrutado, el renderizado y la optimización:

| Metaframework | Se apoya en |
|---|---|
| Next.js | React |
| Nuxt | Vue |
| SvelteKit | Svelte |
| Astro | cualquiera, contenido primero |

La decisión técnica que toman por ti es **dónde se genera cada parte de la página**: en el servidor antes de enviarla (mejor primera carga y mejor posición en buscadores), estáticamente al compilar (más rápido y cacheable) o en el navegador (interactivo). Antes esto se elegía a mano; ahora es una anotación en un archivo.

### Herramientas de compilación

Para que todo esto no tarde, las herramientas se reescribieron en lenguajes compilados: `esbuild` en Go y `SWC` o `Turbopack` en Rust. Compilan JavaScript, TypeScript y CSS entre diez y cien veces más rápido que las generaciones anteriores, escritas en el propio JavaScript.

### Edge

La última frontera es ejecutar el mismo código en centros de datos distribuidos, a pocos milisegundos del usuario, en lugar de en una región concreta. Cloudflare Workers, Vercel Edge y Deno Deploy son las plataformas más conocidas. Es útil para autenticación, personalización y enrutado; para trabajo pesado se sigue usando cómputo tradicional.

---

## 12. Tabla de equivalencias Java ↔ JavaScript

| Concepto | Java | JavaScript |
|---|---|---|
| Especificación | JLS | ECMAScript |
| Ejecución | `javac` + JVM + JIT | Motor con intérprete y JIT |
| Arranque | `main` | Primera línea del archivo |
| Tipos | Estáticos | Dinámicos; TypeScript añade comprobación estática |
| Números | `int`, `long`, `double`, `BigDecimal` | `number`, `BigInt` |
| Texto | `String` | `string`, con plantillas `` `Hola ${nombre}` `` |
| Colecciones | `ArrayList`, `HashMap` | `Array`, `Map`, `Set` |
| Objetos | Instancias de una clase | Pares clave-valor y prototipos |
| Herencia | Clases e interfaces | Prototipos; `class` desde ES6 |
| Funciones | Métodos y lambdas desde Java 8 | Valores, desde el primer día |
| `this` | Siempre el objeto actual | Depende de la llamada; flecha lo fija |
| Concurrencia | Hilos, pools, `CompletableFuture` | Un hilo y event loop, promesas, `async`/`await` |
| Errores | Verificados y no verificados | Todos no verificados |
| Paquetes | Paquetes y módulos del JDK | Módulos ES (`import`/`export`) |
| Dependencias | Maven, Gradle | npm, pnpm |
| Caché local | `~/.m2` | `node_modules` |
| Pruebas | JUnit | Vitest, Jest |
| Memoria | Recolector de basura | Recolector de basura |
| Estilo de escritura | Clases y capas | Funciones, módulos y componentes |

---

## 13. Trampas típicas al llegar desde Java

Este es un índice de consulta, no una segunda explicación del lenguaje. Cada tema desarrolla el comportamiento y sus ejemplos:

| Duda al llegar desde Java | Dónde estudiarla |
|---|---|
| `==` frente a `===` y conversiones implícitas | [Operadores](04-operadores.md) |
| De qué depende `this` | [Funciones](08-funciones.md#this-depende-de-la-llamada) |
| Por qué `const` no congela un objeto | [Variables](02-variables.md) |
| Valores truthy y falsy | [Condicionales](06-condicionales.md) |
| `undefined` frente a `null` | [Tipos de datos](03-tipos-de-datos.md) |
| Decimales y precisión de `number` | [Operadores](04-operadores.md) |
| Ausencia de sobrecarga por firma | [Funciones](08-funciones.md) |
| Excepciones no verificadas y recuperación | [Errores](14-errores.md) |
| Alcance de `var`, `let` y `const` | [Variables](02-variables.md) |
| Cálculo pesado en el hilo principal | [Event loop](#4-un-hilo-y-un-event-loop) |
| Mutación compartida y copias superficiales | [Objetos](11-objetos.md) |
| `forEach` no espera callbacks asíncronos | [Arrays](09-arrays.md) y [Asincronía y JSON](19-asincronia-json.md) |

---

## 14. Cronología

| Año | Hito |
|---|---|
| 1995 | Brendan Eich crea el lenguaje en Netscape en diez días |
| 1996 | JScript en Internet Explorer; empieza la guerra de navegadores |
| 1997 | Se estandariza como ECMAScript (ECMA-262) |
| 1999 | ES3; Internet Explorer 5 incluye `XMLHttpRequest` |
| 2004 | Gmail demuestra la aplicación completa en el navegador |
| 2005 | Google Maps; Jesse James Garrett acuña el término AJAX |
| 2006 | Nace jQuery |
| 2009 | ES5; Ryan Dahl presenta Node.js |
| 2010 | npm; AngularJS, Backbone y Knockout: primera generación de SPAs |
| 2012 | Microsoft publica TypeScript |
| 2013 | React llega al público |
| 2014 | Vue aparece; TypeScript 1.0 |
| 2015 | ES6 / ES2015: `let`, `const`, clases, módulos, promesas |
| 2016 | Angular se reescribe en TypeScript; nace Svelte; versiones anuales del estándar |
| 2020 | Deno, Vite y `esbuild` cambian las herramientas |
| 2022 | Bun |
| Hoy | TypeScript por defecto en proyectos nuevos, metaframeworks y ejecución en el borde de la red |

---

## 15. Glosario

- **AJAX:** pedir datos al servidor desde el navegador sin recargar la página.
- **Bundler:** herramienta que empaqueta muchos archivos en unos pocos para enviarlos al navegador (Vite, esbuild, Webpack).
- **CommonJS:** sistema de módulos antiguo de Node (`require`), sustituido por los módulos ES.
- **DOM:** representación de la página como árbol de objetos, manipulable desde código.
- **Edge:** ejecutar código en servidores distribuidos cerca del usuario.
- **ESM (módulos ES):** el sistema de módulos estándar del lenguaje (`import`/`export`).
- **Event loop:** mecanismo que ejecuta el código pendiente en un solo hilo y reparte las esperas.
- **JIT:** compilación a código máquina durante la ejecución, de las partes que más se usan.
- **Metaframework:** framework construido sobre otro que resuelve enrutado, renderizado y compilación (Next.js, Nuxt, SvelteKit).
- **npm:** gestor de paquetes y mayor registro de software del mundo.
- **Polyfill:** código que añade a un motor antiguo una función moderna que no tiene.
- **Promesa:** objeto que representa un resultado que llegará más adelante; base de `async`/`await`.
- **SPA:** aplicación de una sola página que cambia de pantalla sin recargar.
- **Transpilador:** herramienta que traduce código moderno a una versión que motores antiguos entienden.
- **Virtual DOM:** copia en memoria de la interfaz que permite calcular y aplicar solo los cambios.
- **Web Worker:** hilo real con memoria propia para sacar cálculo pesado del hilo principal.
- **Callback:** función que se entrega a otra para que la invoque; no implica asincronía.
- **Closure:** función que conserva acceso a las variables de su ámbito de creación.
- **Iterable:** valor que ofrece un protocolo de recorrido compatible con `for...of`, como un array o un `Set`.
- **Mutación:** cambio en un objeto o array existente, distinto de reasignar una variable.
- **Copia superficial:** copia que mantiene las referencias a los objetos anidados.
- **Delegación de eventos:** atender eventos de varios descendientes desde un antepasado común aprovechando su propagación.
- **JSON:** formato de texto para intercambiar datos; se convierte con `JSON.parse` y `JSON.stringify`.
- **Origen:** combinación de protocolo, host y puerto que el navegador usa como frontera de seguridad.
- **CORS:** mecanismo por el que un servidor permite al navegador acceder a respuestas desde otros orígenes.
- **XSS:** ejecución de código no confiable en una página, por ejemplo al tratar texto externo como HTML.
- **Persistencia:** conservación de datos más allá de la vida de las variables en memoria, por ejemplo entre recargas.
