# Ruleta de clase

Repasa **JS básico** (arrays, `Math.random`, `filter`/`map`/`includes`, spread, plantillas)
junto con la **fase 1 del DOM** (selectores y modificación de contenido).

## ¿Bastan dos arrays?

Sí, y es el diseño mínimo correcto:

| Array | Para qué | ¿Se modifica? |
| --- | --- | --- |
| `alumnos` | La lista completa de la clase | **No.** Es la referencia del total y de quién ha salido |
| `pendientes` | Los que todavía pueden salir | Sí (`splice` al elegir; se rellena de nuevo al agotarse) |

El **historial** no necesita un tercer array: se deriva de los otros dos.

```js
alumnos.filter((nombre) => !pendientes.includes(nombre)) // los que ya han salido
```

Con un solo array no funciona: al ir sacando nombres destruirías la lista original y
perderías el total (¿10 de cuántos?) y el historial.

> Ojo con la copia: `let pendientes = [...alumnos];` (con spread). Si escribes
> `let pendientes = alumnos;` son **el mismo array** y `splice` vaciaría también `alumnos`.

## Archivos

| Archivo | Uso |
| --- | --- |
| `index.html` | La página: marcador, escenario grande, botones e historial. |
| `estilos.css` | Estilos separados. |
| `ejercicio.js` | Tu código, con un `// TODO` por apartado (lo que abre la página). |
| `ruleta.js` | Solución completa. Cambia el `<script>` de `index.html` para comparar. |

## Apartados

1. **TODO 1** · Crear `pendientes` como **copia** de `alumnos`.
2. **TODO 2** · `yaHanSalido()` → `alumnos.filter(...)` + `pendientes.includes(...)`.
3. **TODO 3** · `elegirAlumno()` → índice al azar (`Math.random`, `Math.floor`), `splice(i, 1)`, y recargar `pendientes` si está vacío.
4. **TODO 4** · Guardar con `querySelector` las referencias a `#elegido`, `#quedan`, `#total` y `#historial`.
5. **TODO 5** · `pintar()` → `textContent` para los números e `innerHTML` + `map` + `join` para el historial.
6. **TODO 6** · `girar()` → pone el elegido en `#elegido` y repinta.
7. **TODO 7** · `reiniciar()` → ronda nueva.

La conexión de los botones (`addEventListener`) **ya viene hecha**: los eventos son del
tema siguiente, así que aquí se dan por sabidos.

## Comportamiento esperado

- `Quedan 10 de 10` al cargar, sin historial.
- Cada pulsación de **Girar** saca a alguien distinto: **no se repite nadie hasta agotar la ronda**.
- Tras 10 pulsaciones: `Quedan 0 de 10` y el historial con los 10 nombres.
- La pulsación 11 empieza ronda nueva (quedan 9 y el historial se reinicia).
- **Reiniciar** deja la ronda a cero sin tocar `alumnos`.
- Desde la consola del navegador también funciona `girar()`.

**Aviso XSS:** el historial se pinta con `innerHTML`. Aquí los nombres son de confianza
(la lista del profesor); con datos de fuera habría que usar `textContent`.

## Retos para clase

- No repetir a la misma persona en dos pulsaciones seguidas.
- Añadir un contador de "rondas" y otro de "veces que ha salido cada uno".
- Escribir el nombre elegido **letra a letra** con un temporizador.
- En lugar de `innerHTML`, construir el historial con `document.createElement` (fase siguiente).
- Sacar dos nombres a la vez (parejas) reduciendo dos veces `pendientes`.
- Leer la lista de clase desde un `<textarea>` en vez de tenerla en el código.
