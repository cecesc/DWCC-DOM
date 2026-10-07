# Ruleta de clase — Versión Básica (Imperativa)

Esta versión está pensada para **las primeras semanas de DWCC**, aprovechando la base de programación estructurada que los alumnos traen de **Java en 1º curso**.

---

## 🎯 Objetivo de esta versión

Evitar la sobrecarga de sintaxis moderna (`...spread`, `.map()`, `.filter()`, `.join()`) para centrarse exclusivamente en:
1. **Lógica algorítmica básica** (bucles, condiciones, arrays).
2. **La referencia en memoria** (por qué no hacer `pendientes = alumnos`).
3. **El DOM inicial** (`document.querySelector`, `textContent`, `innerHTML`).
4. **La separación Estado $\rightarrow$ Vista** (la función `pintar()`).

---

## 🧠 Estructura mental: ¿Por qué 3 arrays?

Para alguien que viene de Java, el flujo más intuitivo es el **físico**: mover elementos de una lista a otra como quien saca bolas de un bombo.

| Array | Propósito | Equivalente mental en Java |
|---|---|---|
| `alumnos` | Lista maestra inmutable con toda la clase. | `final List<String> alumnos` |
| `pendientes` | Los que aún pueden salir en la ronda. Mengua con `splice()`. | `List<String> pendientes` con `.remove(i)` |
| `historial` | Los que ya han salido en esta ronda. Crece con `push()`. | `List<String> historial` con `.add(elem)` |

---

## ⚠️ El punto clave de Java a JS: Las referencias

En Java:
```java
List<String> pendientes = alumnos; // ❌ No copia, ambas apuntan a la misma lista
```
En JavaScript ocurre exactamente lo mismo:
```javascript
let pendientes = alumnos; // ❌ Al modificar pendientes, vaciarías alumnos
```

Por eso en esta versión la copia se hace con un bucle `for` tradicional:
```javascript
function copiarAlumnosAPendientes() {
  pendientes = [];
  for (let i = 0; i < alumnos.length; i++) {
    pendientes.push(alumnos[i]);
  }
}
```

---

## 🔄 El bucle acumulador vs `.map()`

Para construir la lista `<ul>` en el DOM, se recurre al clásico acumulador de cadenas:

```javascript
let lis = "";
for (let i = 0; i < historial.length; i++) {
  lis = lis + "<li>" + historial[i] + "</li>";
}
historialEl.innerHTML = lis;
```

> **Nota para el profesor / Siguiente paso didáctico:**  
> Más adelante en el curso, este bucle y la copia manual servirán como ejemplo perfecto para presentar las ventajas de JavaScript moderno:
> - `[...alumnos]` para clonar arrays sin el bucle de copia.
> - `historial.map(n => `<li>${n}</li>`).join("")` para sustituir el acumulador de texto.
> - Deducir el historial con `alumnos.filter(...)` para prescindir del tercer array.
