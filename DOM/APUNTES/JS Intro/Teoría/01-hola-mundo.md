# 01. Hola mundo

[Ejercicios](../Ejercicios/01-hola-mundo.md)

## Una conversación con el ordenador

Programar es dar instrucciones. JavaScript puede hacer que un botón reaccione, calcular los puntos de una partida o preparar un mensaje. Pero antes de montar un videojuego, vamos a conseguir que el ordenador salude.

JavaScript se ejecuta en el navegador y también fuera de él, por ejemplo con Node.js. No es lo mismo que Java: se parecen en el nombre, no son dos versiones del mismo lenguaje.

## Tu primera línea de JavaScript

```js
console.log("Hola Mundo");
```
```text
Hola Mundo
```

¡Ya tienes un programa! Parece poca cosa, pero has escrito una instrucción, la has ejecutado y has observado el resultado.

Para probarlo, abre las herramientas de desarrollo de tu navegador y entra en **Consola**. Otra opción es guardar la línea en `practica.js` y ejecutar `node practica.js` en la terminal. Si necesitas instalar Node, sigue el tutorial de [Linux](../Tutoriales/instalar-node-linux.md) o [macOS](../Tutoriales/instalar-node-macos.md).

En la consola del navegador puede aparecer también `undefined`. Es el valor que devuelve `console.log`, no parte del saludo ni un error. En estas lecciones los bloques de salida muestran los mensajes impresos, no ese valor adicional de la consola interactiva.

## Desmontamos el saludo

Piensa en `console.log` como un altavoz de depuración: te permite ver qué está pasando en tu programa.

| Pieza | Qué hace |
| --- | --- |
| `console` | Es un objeto que el entorno proporciona para trabajar con la consola. |
| `.log` | Selecciona su método para mostrar información. |
| `(...)` | Contiene lo que queremos mostrar. |
| `"Hola Mundo"` | Es un valor de texto, también llamado *string*. |
| `;` | Termina la instrucción. |

No necesitas memorizar todavía qué es un objeto o un método: iremos viéndolo. Por ahora, puedes leer la línea como «muestra este mensaje en la consola».

**La consola no es la página web.** Este mensaje aparece en las herramientas de desarrollo o en la terminal, no como un título dentro de una página.

JavaScript puede insertar automáticamente puntos y coma en muchos casos. Aquí los escribiremos para mantener un estilo consistente.

## Las comillas son el envoltorio, no el regalo

Las comillas delimitan el texto. No se imprimen, salvo que las incluyas dentro de otra cadena.

```js
console.log("Bienvenido a la taberna");
console.log('Hoy hay sopa de dragón');
console.log('El camarero dice: "Invita la casa"');
```
```text
Bienvenido a la taberna
Hoy hay sopa de dragón
El camarero dice: "Invita la casa"
```

Puedes usar comillas simples o dobles. Lo importante es cerrar con el mismo tipo con el que abriste. En la tercera línea, las comillas simples delimitan la cadena y las dobles forman parte del mensaje.

## Texto o cuenta: tú decides

```js
console.log("3 + 4");
console.log(3 + 4);
console.log("Monedas encontradas:", 3 + 4);
```
```text
3 + 4
7
Monedas encontradas: 7
```

- `"3 + 4"` es texto. El ordenador no intenta resolverlo.
- `3 + 4` es una operación. Primero calcula y luego muestra el resultado.
- La coma permite pasar varios valores a `console.log`.

Las comillas cambian lo que le estás pidiendo al programa. No es lo mismo enseñar la receta que cocinarla.

## Una instrucción después de otra

En estos programas, las instrucciones se ejecutan de arriba abajo.

```js
console.log("Abres el cofre.");
console.log("Encuentras una patata legendaria.");
console.log("La guardas por si acaso.");
```
```text
Abres el cofre.
Encuentras una patata legendaria.
La guardas por si acaso.
```

Cada llamada a `console.log` imprime una línea. Si cambias el orden del código, cambias el orden de la historia.

También puedes incluir un salto de línea dentro de una cadena con `\n`:

```js
console.log("Nivel 1\nNivel 2");
```
```text
Nivel 1
Nivel 2
```

Aunque solo hay una llamada, el mensaje ocupa dos líneas. `\n` es una secuencia de escape: representa un salto, no las letras que ves en el código.

## Comentarios: notas para tu yo del futuro

Los comentarios se leen, pero no se ejecutan. Sirven para explicar una decisión o dejar contexto.

```js
// Presentamos al enemigo antes de empezar la partida.
console.log("Ha aparecido un calcetín rebelde.");

/* Este enemigo parece inofensivo,
   pero lleva semanas desapareciendo en la lavadora. */
console.log("Preparando batalla...");
```
```text
Ha aparecido un calcetín rebelde.
Preparando batalla...
```

`//` comenta hasta el final de la línea. `/* ... */` permite un comentario de varias líneas.

Un buen comentario explica algo que el código no cuenta por sí solo. Es más útil «mostramos el precio sin envío» que «mostramos un número».

## Los errores también enseñan

JavaScript distingue mayúsculas y minúsculas. `console` no es lo mismo que `Console`.

Este código está **roto a propósito**:

```text
Console.log("Hola Mundo");
```

`Console` no está definido en los entornos que estamos usando: normalmente verás un `ReferenceError`. La corrección es escribir `console` con minúscula.

Otro ejemplo **roto a propósito**:

```text
console.log("El dragón tiene hambre);
```

Falta la comilla de cierre antes del paréntesis. Eso impide interpretar el programa y provoca un `SyntaxError`.

Cuando algo falle:

1. Lee el mensaje y busca la línea indicada.
2. Revisa nombres, comillas y paréntesis.
3. Cambia una cosa y vuelve a ejecutar.

Los mensajes exactos varían según el entorno. Un error es una pista, no una nota de tu capacidad para programar.

---

Continúa con los [ejercicios de hola mundo](../Ejercicios/01-hola-mundo.md).
