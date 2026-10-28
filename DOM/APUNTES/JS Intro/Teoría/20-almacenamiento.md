# Almacenamiento en el navegador

[Ejercicios: almacenamiento](../Ejercicios/20-almacenamiento.md)

**Prerrequisitos:** temas 01–19. Persistir una preferencia no convierte al navegador en una base de datos de servidor ni en un lugar seguro para secretos.

## Duración, alcance y límites

| Mecanismo | Duración y alcance | Uso inicial |
|---|---|---|
| Variable en memoria | Hasta recargar o cerrar el documento | Estado temporal de la interfaz |
| `sessionStorage` | Sesión de una pestaña, separado por origen; sobrevive a recargas | Datos temporales de esa sesión |
| `localStorage` | Entre sesiones, por origen, hasta borrado o retirada del navegador | Preferencias pequeñas |

El origen incluye protocolo, host y puerto. Cambiar de `http://localhost:8000` a otro puerto crea otro almacenamiento; eso no borra la clave anterior. En las herramientas de desarrollo, **Aplicación / Almacenamiento** permite inspeccionar, modificar o borrar una clave para probar recuperación.

`getItem` devuelve un string o `null`; `setItem` solo guarda texto y `removeItem` borra una clave. No uses `clear()` para una preferencia: eliminaría todas las claves de ese origen. Estas APIs son síncronas y pueden fallar por política de privacidad o cuota; para datos grandes o consultas estructuradas existe IndexedDB.

## Serializar, validar y recuperar

Guardar un objeto directamente lo transforma en `"[object Object]"`. Para arrays y objetos usa JSON. Como los datos locales pueden estar corruptos o venir de una versión anterior, valida también al leer.

Guarda este bloque en `preferencias.js`; es un módulo ES. Para utilizarlo, importa sus funciones desde un `app.js` cargado con `type="module"`, como en el [tema 16](16-modulos.md).

```js
const CLAVE = "dwcc.preferencias.v1";

export function cargarTema() {
  let texto;
  try {
    texto = localStorage.getItem(CLAVE);
  } catch {
    throw new Error("No se pudo leer el almacenamiento local.");
  }
  if (texto === null) return "claro";

  let datos;
  try {
    datos = JSON.parse(texto);
  } catch {
    throw new Error("Las preferencias guardadas están corruptas.");
  }
  if (datos === null || typeof datos !== "object" ||
      !["claro", "oscuro"].includes(datos.tema)) {
    throw new Error("Las preferencias guardadas no tienen formato válido.");
  }
  return datos.tema;
}

export function guardarTema(tema) {
  if (!["claro", "oscuro"].includes(tema)) {
    throw new Error("Tema no válido.");
  }
  localStorage.setItem(CLAVE, JSON.stringify({ tema }));
}
```

Una comprobación pequeña desde `app.js`, sin construir el catálogo:

```js
import { cargarTema, guardarTema } from "./preferencias.js";

try {
  guardarTema("oscuro");
  console.log(cargarTema()); // oscuro
} catch (error) {
  console.error(error.message);
}
```

Después prueba la lectura sin guardar antes: `cargarTema()` debe recuperar el valor tras recargar. Si borras la clave, devuelve `"claro"`; si escribes JSON roto en ella, informa del error. Este ejemplo demuestra el almacenamiento: no cambia los estilos de la página.

Trata el almacenamiento como una dependencia que puede fallar. Si se actualiza el estado visible antes de `setItem` y esta operación lanza, la interfaz puede afirmar falsamente que guardó algo. Calcula el nuevo estado, intenta guardarlo y solo entonces confírmalo o aplícalo como persistido.

Un `Set` tampoco se serializa como su lista de elementos: `JSON.stringify(new Set([1, 2]))` da `{}`. Convierte con `[...set]` al guardar y reconstruye con `new Set(array)` después de validar los elementos.

## No es una caja fuerte

No guardes contraseñas, secretos ni tokens de sesión en `localStorage` o `sessionStorage`. Cualquier script que pueda ejecutarse en el mismo origen puede leerlos; una vulnerabilidad XSS agrava ese riesgo. El cliente tampoco puede decidir autorizaciones: esas decisiones y validaciones pertenecen al servidor.

Para practicar persistencia segura a nivel de interfaz, validación de datos y un error de guardado sin falso éxito, sigue el [proyecto de catálogo con favoritos](../Proyectos/02-catalogo-favoritos.md). No necesitas montarlo para completar los ejercicios de este tema.
